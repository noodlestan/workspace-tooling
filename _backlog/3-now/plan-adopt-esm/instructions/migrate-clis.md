# Instructions: `migrate-clis`

**Plan:** `adopt-esm`

**Iteration Id:** `migrate-clis`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-adopt-esm/instructions/migrate-clis__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `migrate-clis`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                                                      | Purpose                                                |
| ------------ | ------------------------------------------------------------------ | ------------------------------------------------------ |
| `$WORKSPACE` | Current working directory                                          | Workspace root directory.                              |
| `$PROJECT`   | `checkouts/workspace-tooling`                                      | Hosts `@noodlestan/tsconfig` and the plan.             |
| `$TSCONFIG`  | `$PROJECT/configs/tsconfig`                                        | The `@noodlestan/tsconfig` package.                    |
| `$CHECKOUTS` | `$WORKSPACE/checkouts`                                             | All managed consumer checkouts.                        |
| `$MATRIX`    | `$PROJECT/_backlog/3-now/plan-adopt-esm/plan__adopt-esm-matrix.md` | The migration matrix produced by Iteration: Inventory. |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `migrate-clis`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Execute the `clis` batch: every package currently extending `@noodlestan/tsconfig/cli/tsconfig.json` moves onto the `esbuild/` config and satisfies the distribution ADR's Node-compatible ESM contract — compiled ESM output, explicit `.js` relative imports, and consumer-owned declaration emit.

## Mandatory Reading

::READ `$PROJECT/_backlog/3-now/plan-adopt-esm/plan.md` — the parent plan: scope, batches, and the commit blueprint for this iteration.

::READ `$MATRIX` — the authoritative list of `clis` rows to migrate, produced by Iteration: Inventory Distribution Matrix.

::READ `$PROJECT/architecture/adr/distribution.md` — Node-compatible ESM, compiled JS, declarations, and the TypeScript-source exemption.

::READ `$PROJECT/architecture/adr/shared-config.md` — the `esbuild` consumer kind, strictness block, and no-project-references rule.

::READ `$PROJECT/architecture/design/typescript.md` — the `esbuild/` preset, its `-solid` variant, and consumer-owned declaration emit.

::READ `$TSCONFIG/_guide.md` — package layout and preset status.

::READ `$PROJECT/cli/esbuild-cli/README.md` — the `build.config.mjs` contract: `common` / `esm` shape, option defaults, and the `postBuildPlugin` / `copyStaticFilesPlugin` plugin reference.

::READ `$CHECKOUTS/art-work/cli/work/build.config.mjs` — a live consumer config already on the aligned `common` / `esm` shape.

::READ `$PROJECT/_guide.md` — repository layout, records management, and `npm run ci`.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` — commit message types, scopes, and format rules.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

### Operating Instructions: Setting Up

**Instructions:**

Run from `$WORKSPACE`:

```bash
npm ci # to install dependencies.
npm run ci # to verify the build is green before starting.
```

**Instructions:** (Per migrated checkout, from the checkout root)

```bash
npm ci # in the consumer checkout before migrating its packages.
git switch adopt-esm || git switch -c adopt-esm
```

### Operating Instructions: Verifying Step

**Instructions:** (Per migrated checkout, from the checkout root)

```bash
npm run lint && npm run test && npm run build # type-check must pass under the new preset.
```

## Changes

- Step 1 / 6 — Read `$MATRIX` and enumerate the `clis` rows
- Step 2 / 6 — Per row: flip `extends` to `esbuild/` and declare `"type": "module"`
- Step 3 / 6 — Per row: add explicit `.js` extensions to relative imports
- Step 4 / 6 — Per row: add or align `build.config.mjs` with declaration emit
- Step 5 / 6 — Per row: verify with the checkout's lint, test, and build
- Step 6 / 6 — Commit each row (`migrate-clis`)

## Steps

### Step 1 / 6 — Enumerate the `clis` rows

Open `$MATRIX` and list every row in the `clis` batch. Each row names a checkout and a package path, and every row targets `@noodlestan/tsconfig/esbuild/tsconfig.json`. Work the rows one at a time, one complete checkout per commit.

For each row's checkout, run the "Setting Up" instruction above to install dependencies and switch to branch `adopt-esm` before touching files.

### Step 2 / 6 — Flip the preset and declare ESM (per row)

In `{package}/tsconfig.json`, replace the `extends` value:

```json
"extends": "@noodlestan/tsconfig/esbuild/tsconfig.json"
```

Keep the package's own `include` and `exclude`. Drop any `compilerOptions` entry that only restates the preset's strictness block.

In `{package}/package.json`, add `"type": "module"` next to `version` and `private`.

### Step 3 / 6 — Add explicit `.js` extensions (per row)

`esbuild/` uses `NodeNext` resolution, so every relative import must carry an explicit `.js` extension. Surface the errors first:

```bash
cd $CHECKOUTS/{checkout} && npx tsc -p {package}/tsconfig.json --noEmit
```

Fix each `TS2307` / `TS2835` error by renaming the relative specifier to `.js` — e.g. `./config/index` → `./config/index.js`. Preserve `verbatimModuleSyntax`: use `import type` for type-only imports.

RULE: Add `.js` only to relative specifiers. Never add an extension to bare package imports (e.g. `commander`) or to JSON imports.

### Step 4 / 6 — Add or align `build.config.mjs` (per row)

The consumer owns build configuration. Add `{package}/build.config.mjs` following the `common` / `esm` contract:

```js
import { readFileSync } from 'node:fs';

import { postBuildPlugin } from '@noodlestan/esbuild/plugins';

const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

export default {
  common: {
    bundle: true,
    tsconfig: 'tsconfig.build.json',
    entryPoints: ['src/index.ts'],
    external: ['commander'],
    define: { __BUILD_VERSION__: JSON.stringify(version) },
  },
  esm: {
    plugins: [
      postBuildPlugin({
        command: 'tsc',
        args: ['--project', 'tsconfig.types.json'],
        target: 'esm',
      }),
    ],
  },
};
```

- `entryPoints` is mandatory and must list every public entry of the package.
- `external` must list every runtime dependency the package must not bundle.
- `postBuildPlugin` runs declaration emit. Add `{package}/tsconfig.build.json` if absent:

  ```json
  {
    "extends": "./tsconfig.json",
    "compilerOptions": { "rootDir": "src/", "outDir": "dist/" },
    "include": ["src/"]
  }
  ```

  and `{package}/tsconfig.types.json` if absent:

  ```json
  {
    "extends": "./tsconfig.build.json",
    "compilerOptions": { "emitDeclarationOnly": true },
    "include": ["src/"]
  }
  ```

- Align the package `scripts` so the build runs through the CLI: `"build": "esbuild-cli"`, `"dev": "esbuild-cli-watch"`, `"build:clean": "rm -rf dist"`. Keep `lint`, `test`, and `ci` unchanged.

RULE: `$CHECKOUTS/art-work/cli/work/build.config.mjs` is the reference shape. Mirror it; do not invent new keys.

### Step 5 / 6 — Verify each row

Run the "Verifying Step" instruction above from the checkout root. Then confirm the output:

```bash
ls $CHECKOUTS/{checkout}/{package}/dist
node $CHECKOUTS/{checkout}/{package}/dist/{entry}.mjs
```

Expected outcome: the ESM bundle and the `.d.ts` files sit side by side in `dist/`, and plain `node` loads the built entry without a loader flag. `{entry}` is the `.mjs` produced for one of the package's `entryPoints` — substitute a real one from the `ls` output. A missing `.d.ts` means `postBuildPlugin` did not run — fix `tsconfig.types.json` before committing.

### Step 6 / 6 — Commit each row

One commit per matrix row, per the blueprint below. As each row lands, update its `Status` in `$MATRIX` to `DONE` (the matrix lives in `$PROJECT`; leave that edit for the planner to commit, do not commit it from the checkout).

#### Commit: `migrate-clis`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
migrate({checkout}): Move the `clis` batch to `@noodlestan/tsconfig/esbuild`.

- Replace the `cli/` preset with the `esbuild/` config and declare `"type": "module"`.
- Add explicit `.js` import extensions and a consumer-owned `build.config.mjs`.
```

**Steps for this commit:**

1. From `$CHECKOUTS/{checkout}`, stage every file changed in Steps 2–4 for this row.
2. Confirm the staged set is the complete checkout change and nothing else.
3. Commit with the message above. Do not push.
4. Update the row's `Status` in `$MATRIX` to `DONE`.

---

## Final Verification

- Verify every `clis` row in `$MATRIX` is `DONE` and committed on branch `adopt-esm`.
- Verify each migrated package extends `@noodlestan/tsconfig/esbuild/tsconfig.json`, declares `"type": "module"`, and has no extensionless relative import.
- Verify each migrated package ships a `build.config.mjs` and that `dist/` contains both the ESM bundle and the `.d.ts` files.
- Verify plain `node` loads each built entry without a loader flag.
- Verify the commits were executed and not pushed, per the `NOPUSH` policy.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
