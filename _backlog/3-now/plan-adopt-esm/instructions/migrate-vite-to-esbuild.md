# Instructions: `migrate-vite-to-esbuild`

**Plan:** `adopt-esm`

**Iteration Id:** `migrate-vite-to-esbuild`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-adopt-esm/instructions/migrate-vite-to-esbuild__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `migrate-vite-to-esbuild`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                                                      | Purpose                                                       |
| ------------ | ------------------------------------------------------------------ | ------------------------------------------------------------- |
| `$WORKSPACE` | Current working directory                                          | Workspace root directory.                                     |
| `$PROJECT`   | `checkouts/workspace-tooling`                                      | Hosts `@noodlestan/tsconfig` and the plan.                    |
| `$TSCONFIG`  | `$PROJECT/configs/tsconfig`                                        | The `@noodlestan/tsconfig` package.                           |
| `$CHECKOUTS` | `$WORKSPACE/checkouts`                                             | All managed consumer checkouts.                               |
| `$MATRIX`    | `$PROJECT/_backlog/3-now/plan-adopt-esm/plan__adopt-esm-matrix.md` | The migration matrix; this iteration appends its recipe here. |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `migrate-vite-to-esbuild`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Execute the `vite to esbuild migrations` batch by piloting one Node-consumed `libs/` package from the `vite`/`bundler` world onto the `esbuild/` config, turning every step the pilot needed into a written recipe, and replaying that recipe across the remaining rows. This is the batch where module resolution flips from `bundler` to `NodeNext`, so it is piloted before being rolled out.

## Mandatory Reading

::READ `$PROJECT/_backlog/3-now/plan-adopt-esm/plan.md` — the parent plan: scope, batches, and the commit blueprint for this iteration.

::READ `$MATRIX` — the authoritative list of `vite to esbuild migrations` rows, produced by Iteration: Inventory Distribution Matrix.

::READ `$PROJECT/architecture/adr/distribution.md` — Node-compatible ESM, compiled JS, declarations, and the TypeScript-source exemption.

::READ `$PROJECT/architecture/adr/shared-config.md` — the `esbuild` consumer kind, strictness block, and no-project-references rule.

::READ `$PROJECT/architecture/design/typescript.md` — the `esbuild/` preset, its `-solid` variant, and consumer-owned declaration emit.

::READ `$PROJECT/cli/esbuild-cli/README.md` — the `build.config.mjs` contract: `common` / `esm` shape, option defaults, and the `postBuildPlugin` reference.

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

- Step 1 / 6 — Select the pilot package from `$MATRIX`
- Step 2 / 6 — Migrate the pilot package onto `esbuild/`
- Step 3 / 6 — Write the recipe into `$MATRIX`
- Step 4 / 6 — Commit the pilot
- Step 5 / 6 — Replay the recipe across the remaining rows
- Step 6 / 6 — Escalate recipe gaps to a re-pilot

## Steps

### Step 1 / 6 — Select the pilot package

Open `$MATRIX` and list every row in the `vite to esbuild migrations` batch. Select one pilot row and record why it was chosen. Prefer a package whose consumers are unambiguously Node, whose public surface is the smallest in the batch, and whose test suite exercises its public entry points.

RULE: These rows currently extend `libs/tsconfig-vite-node.json` and resolve imports with `bundler` resolution, so the pilot is the first package to face `NodeNext`. It is deliberately one package, not the batch.

### Step 2 / 6 — Migrate the pilot package

Migrate the pilot exactly as a `clis` row would be migrated, and record every step that was actually needed:

1. In `{package}/tsconfig.json`, set `"extends": "@noodlestan/tsconfig/esbuild/tsconfig.json"`; keep the package's `include` and `exclude`.
2. In `{package}/package.json`, add `"type": "module"` and switch the build scripts to `"build": "esbuild-cli"`, `"dev": "esbuild-cli-watch"`, `"build:clean": "rm -rf dist"`.
3. Add `{package}/build.config.mjs` on the `common` / `esm` shape, with `entryPoints`, explicit `external`, and `postBuildPlugin({ command: 'tsc', args: ['--project', 'tsconfig.types.json'], target: 'esm' })`.
4. Add `{package}/tsconfig.build.json` and `{package}/tsconfig.types.json` if absent.
5. Resolve every `NodeNext` error surfaced by:

   ```bash
   cd $CHECKOUTS/{checkout} && npx tsc -p {package}/tsconfig.json --noEmit
   ```

   Typical failures: missing `.js` relative-import extensions, extensionless imports that `bundler` tolerated, and `verbatimModuleSyntax` type-only imports that must become `import type`.

6. Run the "Verifying Step" instruction above, then confirm `dist/` holds the ESM bundle and its `.d.ts` files, and that plain `node` loads the built entry without a loader flag.

RULE: Record each fix you applied — the command, the failure mode, and the resolution — as you go. Those notes become the recipe; a step you skip silently will re-appear in the next row.

### Step 3 / 6 — Write the recipe into `$MATRIX`

Append a `## Recipe` section to `$MATRIX`, written from the pilot's actual steps:

```md
## Recipe

1. <ordered step> — <command> — <expected failure mode and resolution>
2. ...
```

RULE: The recipe must be executable by a reader who has only `$MATRIX` and this instructions file. Every command and every expected failure mode must be present; omit nothing the pilot needed.

### Step 4 / 6 — Commit the pilot

Commit the pilot row per the blueprint below, then set its `Status` in `$MATRIX` to `DONE` (leave that edit for the planner to commit).

#### Commit: `migrate-vite-to-esbuild`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
migrate({checkout}): Move the `vite to esbuild` batch to `NodeNext`.

- Flip `extends` to the `esbuild/` config and resolve the `NodeNext` errors.
- Add the consumer-owned `build.config.mjs` with declaration emit.
```

**Steps for this commit:**

1. From `$CHECKOUTS/{checkout}`, stage every file changed in Step 2.
2. Commit with the message above. Do not push.
3. Update the pilot row's `Status` in `$MATRIX` to `DONE`.

### Step 5 / 6 — Replay the recipe across the remaining rows

For each remaining `vite to esbuild migrations` row, apply the `## Recipe` in order, one checkout per commit:

1. Switch the checkout to branch `adopt-esm` and run the "Setting Up" instruction.
2. Apply the recipe; run the "Verifying Step" instruction.
3. Commit the row per the blueprint above, then set its `Status` in `$MATRIX` to `DONE`.

RULE: Do not deviate from the recipe to make a package pass. If a package needs a step the recipe does not cover, stop and go to Step 6.

### Step 6 / 6 — Escalate recipe gaps to a re-pilot

When a row needs a step the recipe does not cover:

1. Stop replaying.
2. Re-pilot that package as in Step 2, recording the new step.
3. Append the new step to the `## Recipe` in `$MATRIX`.
4. Resume the replay from Step 5.

RULE: Report a BLOCKER instead of improvising if a row cannot be made to pass after a re-pilot, or if its consumers no longer resolve the package.

---

## Final Verification

- Verify every `vite to esbuild migrations` row in `$MATRIX` is `DONE` and committed on branch `adopt-esm`.
- Verify `$MATRIX` carries a `## Recipe` section covering every step the batch needed, including any re-pilot additions.
- Verify each migrated package extends `@noodlestan/tsconfig/esbuild/tsconfig.json`, declares `"type": "module"`, and has no extensionless relative import.
- Verify each migrated package ships a `build.config.mjs` and that `dist/` contains both the ESM bundle and the `.d.ts` files.
- Verify plain `node` loads each built entry without a loader flag, and that each package's consumers still resolve it.
- Verify the commits were executed and not pushed, per the `NOPUSH` policy.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
