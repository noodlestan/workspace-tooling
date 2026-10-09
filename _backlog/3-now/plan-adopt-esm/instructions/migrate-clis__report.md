# Sub-Agent REPORT (#producer)

**Plan:** `adopt-esm`

**Iteration Id:** `migrate-clis`

**Outcome:** `BLOCKER`

## Evidence

### Changes

Goal: execute the `clis` batch — every package extending `@noodlestan/tsconfig/cli/tsconfig.json` moves onto `@noodlestan/tsconfig/esbuild/tsconfig.json` with the distribution ADR's Node-compatible ESM contract (compiled ESM, explicit `.js` relative imports, consumer-owned declaration emit through `postBuildPlugin`). 9 of 10 rows are delivered as one commit per checkout on branch `adopt-esm`, none pushed; 1 row is blocked.

| Checkout    | `clis` row(s)                              | Outcome | Commit    |
| ----------- | ------------------------------------------ | ------- | --------- |
| art-js      | `cli/bin`, `cli/dev-server`, `cli/watcher` | DONE    | `855ce09` |
| art-lib     | `libs/fs-records`                          | DONE    | `dc63ebc` |
| art-md      | `cli/bin`, `cli/codec-tests`               | DONE    | `8b794bb` |
| art-work    | `cli/work`                                 | DONE    | `236be6b` |
| no-comply   | `cli/meta-extract`                         | BLOCKED | —         |
| purrception | `cli/lang-ts-extract`, `cli/source-fs`     | DONE    | `76ba92b` |

Verification per committed checkout: `npm run ci` green (lefthook ran `clean` → `extract` → `ci` on each commit), `npx tsc -p {package}/tsconfig.json --noEmit` clean, `dist/` contains the ESM bundle beside its `.d.ts`, and plain `node dist/{entry}.mjs` loads without a loader flag. Dependency bumps limited to `@noodlestan/tsconfig@^0.2.0` (all five) and `@noodlestan/esbuild@^0.1.0` (art-js, art-lib, purrception). Matrix updated: 9 `clis` rows `DONE`, 1 `TODO` — matrix edit left uncommitted for the planner. The pre-existing uncommitted `$PROJECT` plan edit and `art-js` root `tsconfig.json` (monorepo roots batch) remain untouched/uncommitted.

#### Files changed

- `$CHECKOUTS/art-js` — three `cli/*` packages: preset flip, `"type": "module"`, `.js` extensions, `build.config.mjs` + `tsconfig.build.json` + `tsconfig.types.json`, exports aligned to `{types, import}`; root `package.json`/`package-lock.json` dep bumps.
- `$CHECKOUTS/art-lib` — `libs/fs-records`: same row recipe; root dep bumps.
- `$CHECKOUTS/art-md` — `cli/bin` and `cli/codec-tests`: row recipe plus codec-tests gained its first real build (entries `scripts/test-parser.ts`, `scripts/test-serializer.ts`); `.js` extensions applied across `libs/codec`, `libs/constructs`, `libs/parser`, `libs/primitives`, `libs/serializer` (their sources are pulled into the cli programs via `main: ./src/index.ts`); one deep src import in `libs/constructs` rewritten to the `@art-md/primitives` package entry; `codec-tests/scripts/test/constants.ts` fixtures path made package-root-relative (bundle now sits at `dist/` instead of `dist/esm/`); root dep bumps.
- `$CHECKOUTS/art-work` — `cli/work`: preset flip, `.js` extensions; `simple-git` default imports converted to named imports (namespace-shape under NodeNext); five `load*Records` sources annotated `FSRecordFile[]` and two `content: string` annotations (published `@art-lib/fs-records@0.0.11` d.ts uses extensionless re-exports, so its types degrade under NodeNext); root dep bump.
- `$CHECKOUTS/purrception` — `cli/lang-ts-extract` and `cli/source-fs`: row recipe (dual `exports`/`module`/`main` collapsed to ESM, `build:types:*` scripts and `tsconfig.esm/cjs.json` removed, consumer-owned `build.config.mjs` with `external: ['typescript']` / `['chokidar', 'perfect-debounce']`); `.js` extensions across `libs/primitives` and `libs/lang-ts`; stale intra-repo pins aligned `0.0.11` → `0.0.12` in `cli/lang-ts-extract`, `cli/source-fs`, `libs/lang-ts` (exact pins forced nested registry copies of broken artifacts instead of workspace links); root dep bumps.

#### Scope decisions (for delegator ratification)

- `.js` extensions were applied to sibling packages outside the `clis` rows wherever a row's `NodeNext` program reached into them (art-md `libs/*`, purrception `libs/*`); bundler-mode packages accept `.js` so later rows keep passing their own lint. The `vite renames` rows for those packages now have a partial diff (extension renames already committed under this iteration's message).
- art-work's type annotations are accuracy fixes, not strictness weakening: they name the real domain types and self-heal once `@art-lib/fs-records` publishes NodeNext-valid declarations.
- purrception's `0.0.11` → `0.0.12` pin alignment is a dependency change beyond the two authorized `@noodlestan` bumps; it was required because local workspace versions are `0.0.12` and the exact pins defeated workspace linking.

## Blockers (if any)

**no-comply / `cli/meta-extract` — cannot be migrated within this instruction's scope.**

After flipping the preset and codemodding the row, `npx tsc -p cli/meta-extract/tsconfig.json --noEmit` reports 217 errors (`143× TS2305`, `50× TS7006`, `14× TS2339`, `6× TS2834`, `4× TS2835`). Baseline under the `cli/` preset is clean (`tsc` = 0), so the row itself is correctly prepared; the residue comes from published artifacts that are not NodeNext-consumable:

1. `@purrception/primitives` and `@purrception/lang-ts` distribute TS source (`main: ./src/index.ts`) with extensionless relative imports — errors surface inside `node_modules/…/src/index.ts`, and their re-export chains collapse (downstream `TS2305` "no exported member").
2. `@purrception/source-fs@0.0.11` and `@purrception/lang-ts-extract@0.0.11` ship d.ts files whose internal re-exports are extensionless (`export * from './contexts'` etc.) — under `NodeNext` they resolve to nothing, so every exported member disappears from the consumer's view.
3. No in-scope remedy exists: `node_modules` is not editable/committable, the instruction authorizes bumps only for `@noodlestan/*`, and the local fixes (adding `.js` to purrception's sources, regenerating declarations) belong to the purrception checkouts' own rows — and still require an intact publish, which does not exist: npm has `0.0.12`, but it has the same extensionless shape, and the `@purrception/source-fs@0.0.12` / `lang-ts-extract@0.0.12` tarballs contain no `dist/` at all (broken publish).

Working state left behind: branch `adopt-esm` created with dependencies installed; working tree reverted to clean `HEAD` (baseline `tsc` = 0); matrix row left `TODO`. Evidence captured in this report; nothing to un-land.

Remediation path: purrception adds `.js` extensions to `libs/primitives`/`libs/lang-ts` sources, regenerates declarations from the extended sources, and publishes a complete release (`dist/` included); after that this row can run exactly as written with no code changes anticipated beyond the row recipe.
