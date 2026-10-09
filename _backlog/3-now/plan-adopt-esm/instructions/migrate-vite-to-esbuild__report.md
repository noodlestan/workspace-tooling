# Sub-Agent REPORT (#producer)

**Plan:** `adopt-esm`

**Iteration Id:** `migrate-vite-to-esbuild`

**Outcome:** `BLOCKER`

## Evidence

### Changes

Goal: execute the `vite to esbuild` batch — every package extending `@noodlestan/tsconfig/libs/tsconfig-vite.json` / `tsconfig-vite-node.json` moves onto `@noodlestan/tsconfig/esbuild/tsconfig.json` (`NodeNext`), dropping the orphaned Vite build configs for a consumer-owned `build.config.mjs` with declaration emit, per the distribution ADR's Node ESM contract. 10 of 11 rows are delivered as one commit per checkout on branch `adopt-esm`, none pushed; 1 row is blocked.

| Checkout    | `vite to esbuild` row(s)                                               | Outcome | Commit    |
| ----------- | ---------------------------------------------------------------------- | ------- | --------- |
| art-md      | `libs/codec` (pilot)                                                   | DONE    | `a0036d4` |
| art-md      | `libs/constructs`, `libs/parser`, `libs/primitives`, `libs/serializer` | DONE    | `0dfc4b8` |
| art-js      | `libs/bundler`, `libs/program`, `libs/validator`                       | DONE    | `0cd562b` |
| purrception | `libs/lang-ts`, `libs/primitives`                                      | DONE    | `8a86e92` |
| no-comply   | `libs/meta`                                                            | BLOCKED | —         |

The migration recipe is documented as `## Recipe` (12 ordered steps, each with its expected failure modes) plus an `### Outcome for no-comply/libs/meta (BLOCKED)` note in `$PROJECT/_backlog/3-now/plan-adopt-esm/plan__adopt-esm-matrix.md`. Verified end-state per committed checkout: lefthook `clean` → `extract` → `ci` green on each commit, `npx tsc -p {package}/tsconfig.json --noEmit` clean, `dist/` holds the ESM bundle beside its `.d.ts`, and plain `node {package}/dist/index.mjs` loads and exits 0 (no loader flag). Dependency bump `@noodlestan/tsconfig@^0.2.0` + `@noodlestan/esbuild@^0.1.0` applied at each checkout root (None needed the 0.0.13 esbuild bump besides no-comply). Recipe rule for `external` (workspace siblings bundled, only real npm runtime packages external) was validated in the pilot: no batch package has npm runtime deps, so `external: []` everywhere except `libs/meta` (see Blockers). Matrix updated: 10 rows `DONE`, `no-comply/libs/meta` left `TODO` — matrix edit left uncommitted for the planner.

#### Files changed

- `$CHECKOUTS/art-md` — `libs/codec` (pilot): preset flip to `esbuild`, `dev`/`build` scripts swapped `vite build*` → `esbuild-cli-watch` / `esbuild-cli`, new consumer-owned `build.config.mjs` + `tsconfig.build.json` + `tsconfig.types.json`, `git rm vite.config.ts tsconfig.vite.json` (kept `vitest.config.ts`); root `package.json`/`package-lock.json` dep bumps. `libs/constructs`, `libs/parser`, `libs/primitives`, `libs/serializer`: same row recipe; `.js` extensions finalized across their sources (partially started under the `clis` iteration), and a deep `@art-md/primitives/src/test/helpers` subpath import rewritten to the `…/helpers/index.js` path (NodeNext has neither directory nor extensionless package-subpath resolution).
- `$CHECKOUTS/art-js` — `libs/bundler`, `libs/program`, `libs/validator`: row recipe (preset flip, scripts, `build.config.mjs`/`tsconfig.build.json`/`tsconfig.types.json`, `git rm vite/tsconfig.vite` pairs); all three are placeholder single-file packages with no deps (`external: []`, vitest `passWithNoTests`); root dep bumps.
- `$CHECKOUTS/purrception` — `libs/primitives` and `libs/lang-ts`: row recipe; sources already carried `.js` extensions (from the `clis` iteration); `@purrception/primitives` is a workspace bundle dep of `lang-ts` and stays out of `external`; root dep bump (`tsconfig` → `^0.2.0`). Checkout-wide `npm run ci` also exercised the two already-migrated `cli/*` consumers of these libs.
- `$CHECKOUTS/no-comply` — `libs/meta` row recipe applied (preset flip, scripts, build configs, `git rm vite.config.ts tsconfig.vite.json`, manifest bump `esbuild 0.0.13` → `^0.1.0`) and verified as far as possible, then left **uncommitted** (see Blockers) alongside the checkout's pre-existing uncommitted state (`libs/solid-accessibility` preset swap, manifest bump).

#### Scope decisions (for delegator ratification)

- Pilot re-pilot: `art-md/libs/codec` was migrated first, then replayed onto the remaining four art-md rows; the pilot validated the `external`/`declare` recipe shape (bundling workspace siblings, npm-only `external`), recorded as recipe step 5.
- Verification follows the `clis` precedent: the runnable form of the instruction's verifying step is checkout-root `npm run ci` (checkout roots have no `test`/`build` scripts), which is also exactly what the pre-commit hook runs after `clean` and `extract`.

## Blockers (if any)

**no-comply / `libs/meta` — cannot be migrated within this instruction's scope.**

A passing commit for this row is impossible from `$CHECKOUTS/no-comply`, on two independent grounds:

1. `npm run ci` fails at baseline (before any change) on `cli/meta-extract`: `tsconfig.esm.json` still extends the removed `@noodlestan/tsconfig/cli/tsconfig.esm.json` (`TS6053`), plus cascading `TS1259` errors from `@purrception/lang-ts-extract` `dist/cjs/*.d.ts`. `cli/meta-extract` is out of this batch's scope (`clis` row, and delegated as not-to-migrate-now); its removal of the presets was authorized only to be reported. The pre-commit `ci` step therefore blocks every commit, independent of `libs/meta` quality.
2. With the row recipe applied, `npx tsc -p libs/meta/tsconfig.json --noEmit` reports 163 errors. 126 are in-scope extensionless-path fixes (`95× TS2835`, `31× TS2834`) in `libs/meta` sources, but 36 originate in the published artifacts: `node_modules/@purrception/lang-ts/src/index.ts` (and `@purrception/primitives`) ships extensionless re-exports, so every member imported from them collapses (`TS2305`/`TS18046` — `'@purrception/primitives' has no exported member 'EntityDataBase'`, `'…/lang-ts' has no exported member 'ComponentDeclaration'`), and meta's re-export entry points fail. This matches the recipe step 7 `TS2305` escalate case and the `clis` iteration's documented blocker for the same published artifacts.

No in-scope remedy: `node_modules` is not editable/committable, the instruction authorizes bumps only for `@noodlestan/*`, both published `@purrception` packages would need `.js`-extended sources plus a valid publish, and `cli/meta-extract` must be migrated in a later iteration (its `tsconfig.esm.json`/`tsconfig.cjs.json` extends simply need catching up to the `cli/` preset that is already `esbuild`-based). `npm run build` (`esbuild-cli`) fails at declaration emit (exit 2), consistent with the type-check finding.

Working state left behind: branch `adopt-esm` with dependencies installed; `libs/meta` recipe changes uncommitted (preset flip, `esbuild-cli*` scripts, `build.config.mjs`/`tsconfig.build.json`/`tsconfig.types.json`, deleted `vite.config.ts`/`tsconfig.vite.json`, manifest bump `esbuild 0.0.13` → `^0.1.0`); pre-existing uncommitted checkout state untouched; matrix row left `TODO` with the block documented in the matrix. Evidence captured in this report and in the matrix note; nothing to un-land. Remediation path: apply the row recipe again once purrception publishes `.js`-extended NodeNext-valid `@purrception/primitives` / `@purrception/lang-ts`, and once `cli/meta-extract` is realigned in its own iteration.
