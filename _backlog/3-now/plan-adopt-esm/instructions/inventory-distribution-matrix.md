# Instructions: `inventory-distribution-matrix`

**Plan:** `adopt-esm`

**Iteration Id:** `inventory-distribution-matrix`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-adopt-esm/instructions/inventory-distribution-matrix__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `inventory-distribution-matrix`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                                                      | Purpose                                       |
| ------------ | ------------------------------------------------------------------ | --------------------------------------------- |
| `$WORKSPACE` | Current working directory                                          | Workspace root directory.                     |
| `$PROJECT`   | `checkouts/workspace-tooling`                                      | Hosts `@noodlestan/tsconfig` and this plan.   |
| `$TSCONFIG`  | `$PROJECT/configs/tsconfig`                                        | The `@noodlestan/tsconfig` package.           |
| `$CHECKOUTS` | `$WORKSPACE/checkouts`                                             | All managed consumer checkouts scanned here.  |
| `$MATRIX`    | `$PROJECT/_backlog/3-now/plan-adopt-esm/plan__adopt-esm-matrix.md` | The migration matrix this iteration produces. |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `inventory-distribution-matrix`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Produce the authoritative distribution migration matrix — the list of every `tsconfig.json` under `$CHECKOUTS` that must move, its target config, its required changes, and its migration batch — before any package changes are made. The matrix is both the to-do list and the effort estimate for the plan.

## Mandatory Reading

::READ `$PROJECT/_backlog/3-now/plan-adopt-esm/plan.md` — the parent plan: scope, batches, and the commit blueprint for this iteration.

::READ `$PROJECT/architecture/adr/distribution.md` — Node-compatible ESM, compiled JS, declarations, and the TypeScript-source exemption; classifies every package this plan migrates.

::READ `$PROJECT/architecture/adr/shared-config.md` — the `esbuild` and `vite` consumer kinds, the `monorepo` and `workspace` root presets, and the no-project-references rule.

::READ `$PROJECT/architecture/design/typescript.md` — the preset table, variant extension rules, and consumer-owned declaration emit.

::READ `$TSCONFIG/_guide.md` — package layout and the current status of each preset.

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

## Changes

- Step 1 / 6 — Scan every `tsconfig.json` under `$CHECKOUTS` and record its preset
- Step 2 / 6 — Classify each package's consumers
- Step 3 / 6 — Choose the target config and list required changes
- Step 4 / 6 — Assign each row a migration batch
- Step 5 / 6 — Write `$MATRIX` with the table and per-batch counts
- Step 6 / 6 — Commit `matrix`

## Steps

### Step 1 / 6 — Scan every `tsconfig.json` under `$CHECKOUTS`

Run from `$WORKSPACE`:

```bash
find $CHECKOUTS -name tsconfig.json -not -path '*/node_modules/*' -not -path '*/dist/*'
```

For each file, record one row with:

- **Checkout** — the top-level directory under `$CHECKOUTS`.
- **Package** — the directory containing the `tsconfig.json`, relative to the checkout.
- **Current preset** — the `extends` value, or `hardcoded` when the file declares `compilerOptions` without extending.
- **Variant** — the extended file name, e.g. `tsconfig-vite-solid.json`.

RULE: The scan is authoritative. The parent plan's `## Findings` holds a prior estimate (10 `cli/` rows, 26 `libs/` rows, and the split repository roots) — check your totals against it, but never substitute it for the scan.

### Step 2 / 6 — Classify each package's consumers

For each row read the package `package.json` and its build setup, and classify the consumers:

| Consumers | Signal                                                                                  |
| --------- | --------------------------------------------------------------------------------------- |
| `Node`    | a `bin`, a `build` script running `esbuild-cli`, or a `dist` entry in `exports`/`files` |
| `bundler` | a `main`/`module` pointing at `.ts` source, or a `build` script running `vite build`    |
| `app`     | extends `astro/tsconfigs/*`, or is an application root                                  |
| `root`    | a repository root `tsconfig.json`                                                       |

RULE: Classify by consumers, not by folder. `art-lib/libs/fs-records` extends the `cli/` preset while living under `libs/`; its consumers decide its target.

### Step 3 / 6 — Choose the target config and list required changes

Map consumers to a target config:

| Consumers | Target config                                                          |
| --------- | ---------------------------------------------------------------------- |
| `Node`    | `@noodlestan/tsconfig/esbuild/tsconfig.json` (or the `-solid` variant) |
| `bundler` | `@noodlestan/tsconfig/vite/tsconfig.json` (or the `-solid` variant)    |
| `root`    | `@noodlestan/tsconfig/monorepo/tsconfig.json`                          |
| `app`     | none — record the row and exclude it from the migration batches        |

List each row's required changes from this vocabulary:

- `preset swap` — replace the `extends` value.
- `type module` — add `"type": "module"` to the package `package.json`.
- `js extensions` — rename relative imports to explicit `.js`.
- `build.config.mjs` — add or align a consumer-owned build config.
- `declaration emit` — `postBuildPlugin` running `tsc --emitDeclarationOnly`.
- `root cleanup` — drop the compiler options `monorepo/` now owns; keep `include`, `exclude`, and `rootDir`.

Every `esbuild/` row needs `preset swap`, `type module`, `js extensions`, `build.config.mjs`, and `declaration emit`; every `vite/` row needs `preset swap` only; every `monorepo/` row needs `preset swap` and `root cleanup`.

### Step 4 / 6 — Assign each row a migration batch

Assign each row to exactly one batch:

| Batch                        | Rows                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `clis`                       | current preset `cli/tsconfig.json` → `esbuild/`                                       |
| `vite renames`               | current preset `libs/tsconfig-vite.json` or `libs/tsconfig-vite-solid.json` → `vite/` |
| `vite to esbuild migrations` | current preset `libs/tsconfig-vite-node.json` → `esbuild/`                            |
| `monorepo roots`             | repository root configs extending `workspace/` or hardcoded → `monorepo/`             |

`config cleanup` is not a row classification — it closes the plan once the other four batches are empty.

RULE: When a row's consumer classification implies a different target than its current preset, the consumer classification wins; record the discrepancy in the report.

### Step 5 / 6 — Write `$MATRIX`

Create `$MATRIX` with these sections:

```md
# Distribution Migration Matrix

## Matrix

| Checkout | Package | Current preset | Consumers | Target config | Required changes | Batch | Status |
| -------- | ------- | -------------- | --------- | ------------- | ---------------- | ----- | ------ |

## Batch Summary

| Batch | Rows | Checkouts |
| ----- | ---- | --------- |

## Excluded

| Checkout | Package | Reason |
| -------- | ------- | ------ |
```

- Every scanned `tsconfig.json` appears exactly once in `## Matrix`, with `Status` set to `TODO`.
- `## Batch Summary` counts rows per batch and lists the distinct checkouts each batch touches.
- `## Excluded` lists the `app` rows (Astro configs and application roots) and any config not extending `@noodlestan/tsconfig`, each with a reason.

### Step 6 / 6 — Commit

#### Commit: `matrix`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
plan(adopt-esm): Add the distribution migration matrix.

- Inventory every `tsconfig.json` under `$CHECKOUTS` and record its preset and consumers.
- Classify each row by consumer build tool and assign it a migration batch.
```

**Steps for this commit:**

1. Stage `$MATRIX`.
2. Commit with the message above. Do not push.

---

## Final Verification

- Verify every `tsconfig.json` under `$CHECKOUTS` (excluding `node_modules`) resolves to exactly one `## Matrix` row.
- Verify every row carries a consumers classification, a target config, required changes, and a batch.
- Verify the per-batch counts in `## Batch Summary` sum to the `## Matrix` row count.
- Verify no `app` row is assigned a migration batch and every `app` row appears in `## Excluded`.
- Verify the commit was executed and not pushed, per its `NOPUSH` policy.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
