# Prettier Adoption Matrix

Produced by `Iteration: Inventory Prettier Configs`; consumed by `Iteration: Adopt Base Config Ecosystem`. All 17 checkouts under `$CHECKOUTS` are in scope — inventory decides the variant and the expected diff, never whether to adopt.

## Method

- Base rules read from `$PRETTIER/src/index.cjs`, the shipped entry point (the iteration's Changes name `src/index.json`, which does not exist).
- Every hand-written `.prettierrc` carries the same top-level options as the base — `useTabs: false`, `printWidth: 100`, `tabWidth: 2`, `semi: true`, `singleQuote: true`, `trailingComma: "all"`, `arrowParens: "avoid"`. Their only rules delta is the override file list, which omits `*.mjs`. Shorthand `+*.mjs` in the matrix means: the base adds `*.mjs` to the JS/TS `useTabs: true` override, so previously space-indented `*.mjs` files re-indent to tabs.
- Per checkout, two dry runs with the checkout's own Prettier `3.8.4`, neither writing anything: `prettier . -l` under the current config, and `prettier . -l --config $PRETTIER/src/index.cjs` simulating the post-adoption config. The expected adoption diff is the second run, minus files another resolved config keeps (see `workspace-tooling`).
- Counts cover lint-visible files only; `.prettierignore` (`dist/`, `env.d.ts`, `.coverage/`) applies, so generated `dist/` copies of `*.mjs` are excluded.
- Expected adoption diff = files rewritten by `npm run lint:fix` after the config swap. The swap itself also deletes `.prettierrc` and edits `package.json` and `package-lock.json`.
- Today, every checkout passes `prettier . -c` under its current config except `workspace-tooling` (pre-existing `plan.md` drift).

## Flags

| Flag      | Meaning                                                                                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `MJS×n`   | Adoption re-indents `n` `*.mjs` files — expected output, accepted as correct.                                                |
| `ART×n`   | `n` `*.art`/`*.tart` files get first-time markdown formatting under base `0.1.0` — expected output, accepted as correct.     |
| `ASTRO×n` | `n` `*.astro` files get first-time formatting when the Astro variant lands — a wider diff to judge, never absorbed silently. |
| `DRIFT`   | Pre-existing formatting drift outside the `*.mjs` re-indent — a wider diff to judge, never absorbed silently.                |
| `OPS`     | `ops` relies on the `*.art`/`*.tart` → `parser: "markdown"` override, absent from base `0.0.1`; lands in base `0.1.0`.       |
| `WIRE`    | Dependency present but unwired — adoption is a config swap plus the dependency update.                                       |

## Base Config — Monorepo Roots

Every monorepo root adopts `@noodlestan/prettier-config` via the `prettier` field.

| Checkout          | Current config path     | Rules delta vs base       | `prettier` field              | `@noodlestan/prettier-config` dep | Expected adoption diff                                                               | Flags               | Status |
| ----------------- | ----------------------- | ------------------------- | ----------------------------- | --------------------------------- | ------------------------------------------------------------------------------------ | ------------------- | ------ |
| art-domains       | `.prettierrc` (root)    | `+*.mjs`                  | NONE                          | NONE                              | none — no tracked `*.mjs`                                                            | —                   | DONE   |
| art-js            | `.prettierrc` (root)    | `+*.mjs`                  | NONE                          | NONE                              | re-indent 7 `*.mjs` (all `build.config.mjs`)                                         | `MJS×7`             | DONE   |
| art-lib           | `.prettierrc` (root)    | `+*.mjs`                  | NONE                          | NONE                              | re-indent 1 `*.mjs` (`libs/fs-records/build.config.mjs`)                             | `MJS×1`             | DONE   |
| art-md            | `.prettierrc` (root)    | `+*.mjs`                  | NONE                          | NONE                              | re-indent 7 `*.mjs` (all `build.config.mjs`) + 3 `*.art` first-format                | `MJS×7`, `ART×3`    | DONE   |
| art-work          | `.prettierrc` (root)    | `+*.mjs`                  | NONE                          | NONE                              | re-indent 1 `*.mjs` (`cli/work/build.config.mjs`)                                    | `MJS×1`             | DONE   |
| artificials       | `.prettierrc` (root)    | `+*.mjs`                  | NONE                          | NONE                              | re-indent 1 `*.mjs` (`astro.config.mjs`); plus 12 `*.astro` first-format in the app  | `MJS×1`, `ASTRO×12` | DONE   |
| artisans          | `.prettierrc` (root)    | `+*.mjs`                  | NONE                          | NONE                              | none — no tracked `*.mjs`                                                            | —                   | DONE   |
| conventions       | `.prettierrc` (root)    | `+*.mjs`                  | NONE                          | `0.0.1` (present, unwired)        | none — no tracked `*.mjs`; dependency update `0.0.1` → `0.1.0`                       | `WIRE`              | DONE   |
| management        | `.prettierrc` (root)    | `+*.mjs`                  | NONE                          | NONE                              | none — no tracked `*.mjs`                                                            | —                   | DONE   |
| no-comply         | `.prettierrc` (root)    | `+*.mjs`                  | NONE                          | NONE                              | re-indent 2 `*.mjs` (both `build.config.mjs`)                                        | `MJS×2`             | DONE   |
| noodlestan-web    | `package.json#prettier` | none — adopted            | `@noodlestan/prettier-config` | `0.0.1`                           | none — already adopted; verified clean                                               | —                   | DONE   |
| ops               | `.prettierrc` (root)    | `+*.mjs`; `art/tart` only | NONE                          | NONE                              | none — config swap only; base `0.1.0` must carry the `*.art`/`*.tart` override first | `OPS`               | DONE   |
| purrception       | `.prettierrc` (root)    | `+*.mjs`                  | NONE                          | NONE                              | re-indent 4 `*.mjs` (all `build.config.mjs`)                                         | `MJS×4`             | DONE   |
| purrfect          | `.prettierrc` (root)    | `+*.mjs`                  | NONE                          | NONE                              | none — no tracked `*.mjs`                                                            | —                   | DONE   |
| purrpose          | `.prettierrc` (root)    | `+*.mjs`                  | NONE                          | NONE                              | none — no tracked `*.mjs`                                                            | —                   | DONE   |
| purrtrait         | `.prettierrc` (root)    | `+*.mjs`                  | NONE                          | NONE                              | none — no tracked `*.mjs`                                                            | —                   | DONE   |
| workspace-tooling | `.prettierrc` (root)    | `+*.mjs` (root)           | NONE                          | NONE                              | re-indent 9 `*.mjs` under `cli/esbuild-cli/` + rewrite of pre-existing `plan.md`     | `MJS×9`, `DRIFT`    | DONE   |

Nested configuration found during the scan, outside the root rows:

- `$PROJECT/configs/eslint-config/.prettierrc` — divergent (`tabWidth: 4`, 2-space `*.md`/`*.json`/`*.html` overrides, no `useTabs`). It is the nearest config for its own 15 files (`prettier --find-config-path` resolves to it), so a forced base-config check lists them but root adoption does **not** rewrite them. Retained inside a config package; a pre-existing divergence to judge, not absorbed.

## Astro Variant — Application Packages

`@noodlestan/prettier-config-astro` is installed directly in packages that are Astro applications, never at a monorepo root; every monorepo root adopts the base config.

| Application package                  | Current config path         | `prettier` field                    | `@noodlestan/prettier-config-astro` dep | Expected adoption diff                                               | Status |
| ------------------------------------ | --------------------------- | ----------------------------------- | --------------------------------------- | -------------------------------------------------------------------- | ------ |
| `noodlestan-web/apps/noodlestan-web` | `package.json#prettier`     | `@noodlestan/prettier-config-astro` | `0.0.1`                                 | none — already adopted; 19 `*.astro` verified clean                  | DONE   |
| `artificials/apps/art-md-web`        | NONE (no config, no plugin) | NONE                                | NONE                                    | first-format 12 tracked `*.astro` — wider diff to judge (`ASTRO×12`) | DONE   |

## Per-Checkout Adoption Commands

Replay per checkout after both packages are published at `0.1.0` (Recipe steps 1–5; the commit itself is Recipe step 5). `{checkout}` is instantiated below; the expected diff comes from the matrix row.

- `art-domains` — `cd $CHECKOUTS/art-domains && npm ci && npm install -D --save-exact @noodlestan/prettier-config@0.1.0 && rm .prettierrc && npm pkg set prettier="@noodlestan/prettier-config" && npm run lint:fix`
- `art-js` — `cd $CHECKOUTS/art-js && npm ci && npm install -D --save-exact @noodlestan/prettier-config@0.1.0 && rm .prettierrc && npm pkg set prettier="@noodlestan/prettier-config" && npm run lint:fix`
- `art-lib` — `cd $CHECKOUTS/art-lib && npm ci && npm install -D --save-exact @noodlestan/prettier-config@0.1.0 && rm .prettierrc && npm pkg set prettier="@noodlestan/prettier-config" && npm run lint:fix`
- `art-md` — `cd $CHECKOUTS/art-md && npm ci && npm install -D --save-exact @noodlestan/prettier-config@0.1.0 && rm .prettierrc && npm pkg set prettier="@noodlestan/prettier-config" && npm run lint:fix`
- `art-work` — `cd $CHECKOUTS/art-work && npm ci && npm install -D --save-exact @noodlestan/prettier-config@0.1.0 && rm .prettierrc && npm pkg set prettier="@noodlestan/prettier-config" && npm run lint:fix`
- `artificials` — root base config plus the Astro variant in the app, one commit: `cd $CHECKOUTS/artificials && npm ci && npm install -D --save-exact @noodlestan/prettier-config@0.1.0 && rm .prettierrc && npm pkg set prettier="@noodlestan/prettier-config" && npm install -D --save-exact -w apps/art-md-web @noodlestan/prettier-config-astro@0.1.0 && npm pkg set -w apps/art-md-web prettier="@noodlestan/prettier-config-astro" && npm run lint:fix`
- `artisans` — `cd $CHECKOUTS/artisans && npm ci && npm install -D --save-exact @noodlestan/prettier-config@0.1.0 && rm .prettierrc && npm pkg set prettier="@noodlestan/prettier-config" && npm run lint:fix`
- `conventions` — `cd $CHECKOUTS/conventions && npm ci && npm install -D --save-exact @noodlestan/prettier-config@0.1.0 && rm .prettierrc && npm pkg set prettier="@noodlestan/prettier-config" && npm run lint:fix` — the install updates the existing `0.0.1` dep (`WIRE` resolved).
- `management` — `cd $CHECKOUTS/management && npm ci && npm install -D --save-exact @noodlestan/prettier-config@0.1.0 && rm .prettierrc && npm pkg set prettier="@noodlestan/prettier-config" && npm run lint:fix`
- `no-comply` — `cd $CHECKOUTS/no-comply && npm ci && npm install -D --save-exact @noodlestan/prettier-config@0.1.0 && rm .prettierrc && npm pkg set prettier="@noodlestan/prettier-config" && npm run lint:fix`
- `ops` — `cd $CHECKOUTS/ops && npm ci && npm install -D --save-exact @noodlestan/prettier-config@0.1.0 && rm .prettierrc && npm pkg set prettier="@noodlestan/prettier-config" && npm run lint:fix` — only after base `0.1.0` ships the `*.art`/`*.tart` override, else its 4 `.art` files lose markdown formatting (`OPS`).
- `purrception` — `cd $CHECKOUTS/purrception && npm ci && npm install -D --save-exact @noodlestan/prettier-config@0.1.0 && rm .prettierrc && npm pkg set prettier="@noodlestan/prettier-config" && npm run lint:fix`
- `purrfect` — `cd $CHECKOUTS/purrfect && npm ci && npm install -D --save-exact @noodlestan/prettier-config@0.1.0 && rm .prettierrc && npm pkg set prettier="@noodlestan/prettier-config" && npm run lint:fix`
- `purrpose` — `cd $CHECKOUTS/purrpose && npm ci && npm install -D --save-exact @noodlestan/prettier-config@0.1.0 && rm .prettierrc && npm pkg set prettier="@noodlestan/prettier-config" && npm run lint:fix`
- `purrtrait` — `cd $CHECKOUTS/purrtrait && npm ci && npm install -D --save-exact @noodlestan/prettier-config@0.1.0 && rm .prettierrc && npm pkg set prettier="@noodlestan/prettier-config" && npm run lint:fix`
- `workspace-tooling` — run **last**, after the publish and every other checkout: `cd $CHECKOUTS/workspace-tooling && npm ci && npm install -D --save-exact @noodlestan/prettier-config@0.1.0 && rm .prettierrc && npm pkg set prettier="@noodlestan/prettier-config" && npm run lint:fix` — root `.prettierrc` only; `configs/eslint-config/.prettierrc` stays; the flagged `plan.md` rewrite must be judged before its commit (`DRIFT`).
- `noodlestan-web` — no adoption commands; already adopted. Verify with `npm run lint` only.

## Batch Summary

| Batch           | Rows | Checkouts                                                                                                                                                                     |
| --------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| already adopted | 1    | noodlestan-web                                                                                                                                                                |
| to adopt        | 16   | art-domains, art-js, art-lib, art-md, art-work, artificials, artisans, conventions, management, no-comply, ops, purrception, purrfect, purrpose, purrtrait, workspace-tooling |

## Excluded

| Checkout | Reason                                                                              |
| -------- | ----------------------------------------------------------------------------------- |
| (none)   | All 17 checkouts under `$CHECKOUTS` carry a Prettier config; every one is in scope. |

## Commit Log

Capture the commit hash per checkout as the adoption iteration runs. One commit per checkout, on `main`, `NOPUSH`.

| Checkout          | Commit hash | Status |
| ----------------- | ----------- | ------ |
| art-domains       | 26b4a77     | DONE   |
| art-js            | ee775a9     | DONE   |
| art-lib           | f029b44     | DONE   |
| art-md            | ee4691a     | DONE   |
| art-work          | 06e5077     | DONE   |
| artificials       | 426f5be     | DONE   |
| artisans          | 4bd42af     | DONE   |
| conventions       | 7108784     | DONE   |
| management        | 6f2c2da     | DONE   |
| no-comply         | af3e838     | DONE   |
| ops               | 49982ac     | DONE   |
| purrception       | a810da7     | DONE   |
| purrfect          | a287d30     | DONE   |
| purrpose          | be089c5     | DONE   |
| purrtrait         | c84910b     | DONE   |
| workspace-tooling | 8d5d0c2     | DONE   |

## Recipe

Replay once per checkout, one commit per checkout on branch `main` with a `NOPUSH` policy. `{checkout}` comes from the matrix; the instantiated command sequences are listed under Per-Checkout Adoption Commands.

1. Setup the checkout — `cd $CHECKOUTS/{checkout} && npm ci` — expected: a clean tree on `main`.
2. Authorised dependency bump — `npm install -D --save-exact @noodlestan/prettier-config@0.1.0` (checkout root) — expected: installs or updates the dependency and rewrites `package.json` and `package-lock.json`; rides along in the same commit. For `conventions` this updates the existing `0.0.1` dep.
3. Config swap — delete `.prettierrc*` and add `"prettier": "@noodlestan/prettier-config"` to the checkout root `package.json`.
4. Lint — `npm run lint:fix` — expected: passes; the diff contains the expected `*.mjs` re-indent (tabs) plus any first-time `*.art`/`*.tart` markdown formatting under base `0.1.0` (a missing final newline is correct output). Anything wider is a defect in `$PROJECT` or a pre-existing divergence to judge, never absorbed silently.
5. Commit — stage every file changed for the checkout's row, commit with the iteration blueprint message, and do **not** push (`NOPUSH`); then record the hash in the Commit Log and set the row to `DONE` (that edit stays uncommitted for the planner).

### Astro application packages

For `artificials`, the same commit also adopts the Astro variant in `apps/art-md-web`:

1. `npm install -D --save-exact -w apps/art-md-web @noodlestan/prettier-config-astro@0.1.0` (from the checkout root).
2. `npm pkg set -w apps/art-md-web prettier="@noodlestan/prettier-config-astro"`.
3. `npm run lint:fix` from the checkout root — expect the 12 tracked `*.astro` first-format alongside the `*.mjs` re-indent; judge the `*.astro` output, never absorb it silently.

`noodlestan-web/apps/noodlestan-web` is already adopted and is verified, not re-migrated.

### Outcome for `ops` (RESOLVED)

`ops/.prettierrc` carries an extra override for `*.art`/`*.tart` (`parser: "markdown"`) that the shipped base rules do **not** include — 4 tracked `.art` files depend on it. Adopting base `0.0.1` would silently drop that override. **Resolved in favour of the ecosystem**: `Iteration: Publish Art Tart Override` lifts the override into the base package and publishes `0.1.0`, so `ops` adopts the base config without losing it. Expected diff unchanged: config swap only, no file rewrites (`ops` has no tracked `*.mjs`).

### Outcome for `conventions` (PARTIAL)

`conventions` already declares `@noodlestan/prettier-config@0.0.1` in `devDependencies` but has **no** `prettier` field and still carries a hand-written `.prettierrc`. The dependency is present but unwired. Adoption here is a config swap plus a dependency update to `0.1.0`; expected formatting diff is none (no tracked `*.mjs`).

### Outcome for `workspace-tooling` (DRIFT + NESTED)

Two findings, both pre-existing divergences to judge:

1. `_backlog/3-now/plan-adopt-prettier-config/plan.md` already fails `prettier . -c` today — the uncommitted `WORKING` status edits left the Items table unaligned. Root adoption's `lint:fix` would rewrite it, which is wider than the expected `*.mjs` re-indent. It must be judged (or the plan file reformatted by its owner) before the checkout's adoption commit.
2. `configs/eslint-config/.prettierrc` stays — it is the nearest config for its 15 files, so root adoption re-indents only the 9 `*.mjs` under `cli/esbuild-cli/`. Two of the 11 tracked `*.mjs` need no change: `src/plugins/index.mjs` (no indentation) and `configs/prettier-config/test/example.mjs` (already base-formatted via that package's own `prettier` field).

### Outcome for `artificials` (ASTRO FIRST-FORMAT)

The checkout has no `prettier-plugin-astro` and no app-level config, so its 12 tracked `*.astro` files are never formatted today — `prettier . -c` skips them (no parser). Adopting the Astro variant in `apps/art-md-web` parses them for the first time; the resulting rewrite is a wider diff to judge before the commit, alongside the single `astro.config.mjs` re-indent.

### Outcome for `noodlestan-web` (ALREADY ADOPTED)

`noodlestan-web` is the pilot consumer: root `prettier` field set to `@noodlestan/prettier-config`, dependency pinned at `0.0.1`; its Astro application package `apps/noodlestan-web` sets `@noodlestan/prettier-config-astro` with `prettier-plugin-astro` installed. Verified clean under the current config and under the base config — no re-indent pending. Verified, not re-migrated; upgrading both pins to `0.1.0` is a deliberate follow-up.
