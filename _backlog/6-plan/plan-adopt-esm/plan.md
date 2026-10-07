# Plan: Adopt ESM

**ID:** `adopt-esm`

**Status:** `DRAFT`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Published Noodlestan packages still extend the transitional `cli/` and `libs/` tsconfig presets and ship module semantics that do not satisfy `architecture/adr/distribution.md` — Node-compatible ESM, compiled output, and declarations for Node-consumed packages; TypeScript source for bundler-consumed libraries.

**Description:** Plan record with 6 draft iterations, spanning `Package: TS Config` in `$PROJECT` and the consumer checkouts enumerated by its inventory iteration, executed from `$WORKSPACE`.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path                 | Purpose                                               |
| ------------ | ----------------------------- | ----------------------------------------------------- |
| `$WORKSPACE` | Current working directory     | Workspace root directory.                             |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains`  | Domain resources directory.                           |
| `$PROJECT`   | `checkouts/workspace-tooling` | Hosts `@noodlestan/tsconfig` and this plan.           |
| `$TSCONFIG`  | `$PROJECT/configs/tsconfig`   | The `@noodlestan/tsconfig` package.                   |
| `$CHECKOUTS` | `$WORKSPACE/checkouts`        | All managed consumer checkouts migrated by this plan. |
| `$ROADMAP`   | `$PROJECT/_roadmap`           | Roadmap holding the coordinating milestone.           |

## Summary

Adopt the distribution ADR across the ecosystem by classifying every package by its consumers, migrating each off the transitional `cli/` and `libs/` presets onto the `esbuild/` or `vite/` config chosen according to consumer build tool, and removing the transitional presets once no consumer extends them.

Scope is `Package: TS Config` plus the consumer checkouts enumerated by the inventory iteration; upstream is the distribution and shared-config ADRs and the delivered `build.config.mjs` contract.

## Attachments

- `./plan-adopt-esm__matrix.md` (Matrix) — Distribution migration matrix produced by Iteration: Inventory Distribution Matrix.

## Context

### Upstream Work

| Kind                | Path                                                               | Role                                                                                                                          |
| ------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| ADR                 | `$PROJECT/architecture/adr/distribution.md`                        | The decisions this plan adopts: Node-compatible ESM, compiled JS, declarations, TS-source exemption.                          |
| ADR                 | `$PROJECT/architecture/adr/shared-config.md`                       | Scopes TSConfig to consumer build tool — `esbuild` or `vite`, plus the `workspace` convenience preset; decision is `Adopted`. |
| Plan                | `$PROJECT/_backlog/1-done/plan-externalize-esbuild-config/plan.md` | `DONE`; delivered the `build.config.mjs` contract and declaration-emit ownership this plan builds on.                         |
| Milestone           | `$ROADMAP/3-now/milestone-tooling-one/milestone.md`                | Coordinates this plan with the other tooling plans.                                                                           |
| Uncommitted changes | `git status` in `$PROJECT`                                         | The unstaged `configs/tsconfig/esbuild/` and `configs/tsconfig/vite/` presets are this plan's starting material.              |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                                        | Description                                                                        |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain: Plans `.agents/domains/plans/index.md`       | Planning lifecycle for contextualising, drafting, planning, and integrating plans. |
| Domain: Work `.agents/domains/work/index.md`         | Work item abstractions, workflows, and operating instructions.                     |
| Domain: Packages `.agents/domains/packages/index.md` | Package, script, dependency, and NPM deployment structures.                        |
| Domain: Commits `.agents/domains/commits/index.md`   | Commit blueprint and policy types used when executing this plan.                   |

### Resource Kinds in Scope

| Kind       | Domain       | Structure Record Path                             |
| ---------- | ------------ | ------------------------------------------------- |
| Project    | Projects     | `$DOMAINS/projects/structures/project.art`        |
| Repository | Repositories | `$DOMAINS/repositories/structures/repository.art` |
| Package    | Packages     | `$DOMAINS/packages/structures/package.art`        |
| Plan       | Plans        | `$DOMAINS/plans/structures/plan.art`              |

### Workflows

| Workflow / Path                                                                | Purpose                                                                       |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Workflow: Planning Work `$DOMAINS/work/workflows/planning-work/workflow.art`   | Create and manage work items lifecycle, collecting operational instructions.  |
| Workflow: Executing Work `$DOMAINS/work/workflows/executing-work/workflow.art` | Organize work execution to produce completed, verified outcomes and feedback. |

### Workflow Operations

| Workflow / Operation / Path                                                                                               | Purpose                                                    |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Planning Work / Contextualizing Work Item `$DOMAINS/work/workflows/planning-work/contextualizing-work-item/operation.art` | Collect upstream sources, scope, and context.              |
| Planning Work / Drafting Work Item `$DOMAINS/work/workflows/planning-work/drafting-work-item/operation.art`               | Generate the work item record and its iterations.          |
| Planning Work / Planning Work Item `$DOMAINS/work/workflows/planning-work/planning-work-item/operation.art`               | Refine iterations, changes, and commit blueprints.         |
| Planning Work / Writing Commit Message `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`       | Write standardized commit messages.                        |
| Planning Work / Validating Work Item `$DOMAINS/work/workflows/planning-work/validating-work-item/operation.art`           | Check integrity before execution.                          |
| Executing Work / Setting Up `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`                             | Install dependencies in `$PROJECT` and consumer checkouts. |
| Executing Work / Executing Work Step `$DOMAINS/work/workflows/executing-work/executing-work-step/operation.art`           | Carry out one iteration's changes.                         |
| Executing Work / Verifying Step `$DOMAINS/work/workflows/executing-work/verifying-step/operation.art`                     | Run package lint and test for one iteration.               |
| Executing Work / Verifying Completion `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`         | Run the monorepo CI gate before completion.                |

### Knowledge

::READ `$PROJECT/architecture/adr/distribution.md` (ADR) — Node-compatible ESM, compiled JS, declarations, and the TypeScript-source exemption; classifies every package this plan migrates. Relevant for Planning Work Item, Executing Work Step.

::READ `$PROJECT/architecture/adr/shared-config.md` (ADR) — TSConfig is scoped to consumer build tool: `esbuild` or `vite`, plus a `workspace` convenience preset for workspaces; transitional `cli/` and `libs/` presets stay published until consumers migrate. Relevant for Planning Work Item, Executing Work Step.

::READ `$PROJECT/architecture/design/typescript.md` (Design) — Preset table, variant extension rules, and consumer-owned declaration emit. Relevant for Planning Work Item, Executing Work Step.

::READ `$TSCONFIG/_guide.md` (Guide) — Package layout, current status of `cli/`, `libs/`, and `workspace/`, verification commands. Relevant for Executing Work Step, Verifying Step.

::READ `$PROJECT/_guide.md` (Guide) — Repository layout, records management, and `npm run ci` verification. Relevant for Planning Work Item, Setting Up, Verifying Completion.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Commit message types, scopes, and format rules for all iterations in this plan.

## Scope

Changes in 1 package and every consumer checkout that extends a transitional preset: the inventory iteration fixes the authoritative list first, then the migration batches change one checkout at a time, and the last batch retires the transitional presets.

### (Scope) Project: Noodlestan Workspace Tooling

**Record:** `$PROJECT/_records/project.art`

**Role:** — Owns `Package: TS Config` and the architecture decisions being adopted.

**Partial:**

- `owner` — Project: Noodlestan Management
- `path` — `$PROJECT/`
- `resources` — includes Package: TS Config

**Changes:**

- Land the `esbuild/` and `vite/` configs and retire the transitional presets from `Package: TS Config`.
- Record adoption progress in the distribution migration matrix.

### (Scope) Package: TS Config

**Record:** `$TSCONFIG/_records/package.art`

**Role:** — Changes required. The package whose presets every consumer migration reads from.

**Partial:**

- `owner` — Project: Artificial
- `path` — `configs/tsconfig/`
- `canonicalName` — `@noodlestan/tsconfig`
- `files` — `esbuild`, `vite`, `cli`, `libs`, `workspace`

**Changes:**

- Commit the unstaged `esbuild/` and `vite/` presets.
- Keep `cli/` and `libs/` published while any matrix row still extends them; remove them from `files` only when the matrix clears. `workspace/` stays published as the convenience preset for workspaces.
- Update `CHANGELOG.md`, `_guide.md`, and `README.md` per batch; bump a major version when presets are removed.

### (Scope) Consumer Checkouts: Transitional Preset Packages

**Record:** Each checkout's `_records/repository.art` under `$CHECKOUTS` — the exact set is fixed by Iteration: Inventory Distribution Matrix.

**Role:** — Changes required. Every package extending a transitional preset moves to the config chosen for its consumer build tool.

**Changes:**

- Replace `extends` with `@noodlestan/tsconfig/esbuild/...` or `@noodlestan/tsconfig/vite/...` per the matrix's target config.
- For `esbuild/` migrations: declare `"type": "module"`, add explicit `.js` extensions to relative imports, and add a consumer-owned `build.config.mjs` with declaration emit through `postBuildPlugin`.
- For `vite/` migrations: swap the preset only; module semantics do not change.
- Verify each checkout with its own lint, test, and build before committing it.

**Operations:**

- Run `npm run ci` in each migrated checkout before its commit.

**Dependencies:**

- Iteration: Ship Consumer Configs must have landed the target presets in `$TSCONFIG`.

## Execution Context

Execution occurs from `$WORKSPACE/`. Work in `$PROJECT` runs on branch `main`; consumer migrations run per checkout on branch `adopt-esm`, one complete checkout per commit. Package work is confined to `$TSCONFIG`; the remaining work is distributed across the checkouts enumerated by the inventory iteration.

---

## Items:

| Iteration / Instructions                 | Status  |
| ---------------------------------------- | ------- |
| Iteration: Inventory Distribution Matrix | `DRAFT` |
| Iteration: Ship Consumer Configs         | `DRAFT` |
| Iteration: Migrate Clis                  | `DRAFT` |
| Iteration: Rename Vite Configs           | `DRAFT` |
| Iteration: Migrate Vite to Esbuild       | `DRAFT` |
| Iteration: Config Cleanup                | `DRAFT` |

### Iteration: Inventory Distribution Matrix

**Id:** `inventory-distribution-matrix`

**Status:** `DRAFT`

**Purpose:** Produce the authoritative list of what migrates, to which config, in which batch, before any package changes.

**Description:** Scan every `tsconfig.json` under `$CHECKOUTS` (excluding `node_modules`), record its `extends`, the package's consumers, the ADR-scoped config, and the required changes, and write the result to the plan attachment `./plan-adopt-esm__matrix.md`. Classification follows consumer build tool, not the folder: Node-consumed packages use `esbuild/`; bundler-consumed packages use `vite/`; `workspace/` roots and `astro/tsconfigs/*` app configs are recorded but left out of the migration batches.

**Changes:**

- Scan `$CHECKOUTS` for `extends` values matching `@noodlestan/tsconfig/{cli,libs,workspace}/...` and record checkout, package path, current preset, and preset variant.
- Classify each package's consumers from its `package.json` and build setup: Node-consumed (needs compiled ESM), bundler-consumed (TS-source distribution), or app/root.
- Choose the target config per row (`esbuild/` or `vite/`) and list the required changes: preset swap only, `"type": "module"`, `.js` extension renames, `build.config.mjs`, declaration emit.
- Assign each migrating row one of the three migration batches: `clis` (extends `cli/`), `vite renames` (`libs/` → `vite/`), or `vite to esbuild migrations` (`libs/` → `esbuild/`). The fourth batch, `config cleanup`, is not a row classification — it closes the plan once the other three are empty.
- Write `./plan-adopt-esm__matrix.md` with the full matrix and a per-batch summary count.

**Dependencies:**

- None.

### Iteration: Ship Consumer Configs

**Id:** `ship-consumer-configs`

**Status:** `DRAFT`

**Purpose:** Land the `esbuild/` and `vite/` config material currently sitting unstaged in `$TSCONFIG`.

**Description:** Commit the four new preset files, confirm the package still ships all presets its consumers need, and align the package knowledge with the shared-config ADR's consumer-build-tool scoping.

**Changes:**

- Commit `$TSCONFIG/esbuild/tsconfig.json`, `$TSCONFIG/esbuild/tsconfig-solid.json`, `$TSCONFIG/vite/tsconfig.json`, and `$TSCONFIG/vite/tsconfig-solid.json`.
- Confirm `files` in `$TSCONFIG/package.json` still lists every preset directory the matrix references.
- Update `$TSCONFIG/CHANGELOG.md` with an `Added` entry for the `esbuild/` and `vite/` configs, noting `cli/` and `libs/` as transitional.
- Update `$TSCONFIG/_guide.md` and `$PROJECT/architecture/design/typescript.md` so both describe the same consumer-build-tool table as the shared-config ADR.
- Run `$TSCONFIG` `npm run lint` and the monorepo `npm run ci`.

**Dependencies:**

- None.

### Iteration: Migrate Clis

**Id:** `migrate-clis`

**Status:** `DRAFT`

**Purpose:** Execute the `clis` batch — every package extending `cli/tsconfig.json` moves to the `esbuild/` config.

**Description:** For every matrix row in the `clis` batch, flip `extends` to `@noodlestan/tsconfig/esbuild/tsconfig.json`, then make the package satisfy Node-compatible ESM: `"type": "module"`, explicit `.js` relative-import extensions, and a `build.config.mjs` declaring the `esm` target with declaration emit. Migrate one checkout per commit and verify it before moving on.

**Changes:**

- Per matrix row: replace the `extends` value, add `"type": "module"` to the package `package.json`, and rename relative imports to `.js`.
- Per package: add or align `build.config.mjs` (`common` plus `esm` target, explicit `external`, `postBuildPlugin` for `tsc --emitDeclarationOnly`) following the contract delivered by `Plan: Externalize Esbuild Config`.
- Per checkout: run lint, tests, and build; commit the complete checkout on branch `adopt-esm`.
- Update the matrix row status and batch counters as checkouts land.

**Dependencies:**

- Iteration: Inventory Distribution Matrix.
- Iteration: Ship Consumer Configs.

### Iteration: Rename Vite Configs

**Id:** `rename-vite-configs`

**Status:** `DRAFT`

**Purpose:** Execute the `vite renames` batch — `libs/` packages consumed by a bundler move to the `vite/` config.

**Description:** For every matrix row in the `vite renames` batch, replace `extends` with `@noodlestan/tsconfig/vite/tsconfig.json` (or the `-solid` variant) and confirm type-checking is unchanged. Both configs use `ESNext` module semantics with `bundler` resolution, so this is a preset swap: no module-format changes ride along. One checkout per commit, matrix updated as rows land.

**Changes:**

- Per matrix row: replace the `extends` value with the matching `vite/` config; run type-check and lint.
- Confirm the diff contains only the preset swap; any module-format fallout means the row was classified wrong — return it to the inventory for reclassification.
- Commit the complete checkout on branch `adopt-esm` and update the matrix row.

**Dependencies:**

- Iteration: Inventory Distribution Matrix.
- Iteration: Ship Consumer Configs.

### Iteration: Migrate Vite to Esbuild

**Id:** `migrate-vite-to-esbuild`

**Status:** `DRAFT`

**Purpose:** Execute the `vite to esbuild migrations` batch — Node-consumed `libs/` packages move to the `esbuild/` config, piloted on one package first.

**Description:** These migrations flip module resolution from `bundler` to `NodeNext`, so they surface `.js` extension gaps, extensionless-import breakage, and missing build configuration. Pilot the batch on one package — the `libs/tsconfig-vite-node.json` rows are the strongest candidates — turn every step that was needed into a recipe, then replay the recipe across the remaining rows. Gaps the recipe does not cover escalate to a re-pilot.

**Changes:**

- Select the pilot package from the matrix and record why it was selected.
- Pilot: flip `extends` to `esbuild/tsconfig.json`; fix every resulting NodeNext error: explicit `.js` extensions, `"type": "module"`, `verbatimModuleSyntax` import shape; add `build.config.mjs` with the `esm` target, explicit `external`, and declaration emit; confirm `dist` output and `.d.ts` files are produced; verify consumers of the pilot still resolve it.
- Write the recipe — ordered steps, commands, expected failure modes — into the plan attachment `./plan-adopt-esm__matrix.md` under a `## Recipe` section.
- Replay the recipe per remaining row; escalate to a re-pilot if a package needs steps the recipe does not cover.
- Update the matrix after every checkout until all `vite to esbuild migrations` rows are `DONE`.

**Dependencies:**

- Iteration: Inventory Distribution Matrix.
- Iteration: Ship Consumer Configs.
- Iteration: Migrate Clis.

### Iteration: Config Cleanup

**Id:** `config-cleanup`

**Status:** `DRAFT`

**Purpose:** Execute the `config cleanup` batch — stop shipping the presets the ecosystem has migrated away from.

**Description:** Once the matrix shows zero rows extending `cli/` and `libs/`, remove those directories from `$TSCONFIG`, bump a major version, and record the retirement in the package and architecture knowledge. This is the only iteration that publishes a breaking `@noodlestan/tsconfig` release.

**Changes:**

- Confirm with a final scan that no `tsconfig.json` outside `$TSCONFIG` extends `cli/` or `libs/`.
- Delete `$TSCONFIG/cli/` and `$TSCONFIG/libs/` only; remove them from `files` in `$TSCONFIG/package.json` and from `$TSCONFIG/_records/package.art`.
- Add a major `CHANGELOG.md` entry recording the removal and the config that replaces each preset.
- Update `$TSCONFIG/_guide.md`, `$PROJECT/architecture/design/typescript.md`, and `$PROJECT/README.md`; bump the package major version for release.

**Dependencies:**

- Iteration: Migrate Clis.
- Iteration: Rename Vite Configs.
- Iteration: Migrate Vite to Esbuild.

## Work

### Next

All 6 iterations are `DRAFT`. Run **Plan Iterations** (`plan more`) to refine purposes, changes, and commit blueprints, then **Write Instructions** to produce delegatable instruction files.

### Blockers

- None.

---

## Operating Instructions

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write the message following: `{Type}({Scope}): {Description}.` max 120 chars, optionally followed by up to 3 bullet points, max 100 chars each.
3. Use only values of `Type`, `Scope`, and valid `Type–Scope` associations defined there, along with examples, and rules.

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`.

**Instructions:** (From `$PROJECT/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
npm run ci # to verify the build is green before starting.
```

Do NOT run `npm install` inside `$PROJECT` — a local `node_modules` there shadows the monorepo resolution.

**Instructions:** (From `$CHECKOUTS` per migrated checkout)

```bash
npm ci # in the consumer checkout before migrating its packages.
```

### Verifying Step

**Purpose:** Verify the changes produced by one iteration. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-step/operation.art`.

**Instructions:** (From `$TSCONFIG/_guide.md`)

Run from `$TSCONFIG`:

```bash
npm run lint # to report prettier and eslint issues.
npm run test # to run all tests.
```

**Instructions:** (Per migrated consumer checkout)

Run from the checkout root:

```bash
npm run lint && npm run test && npm run build # per checkout; type-check must pass under the new preset.
```

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`.

**Instructions:** (From `$PROJECT/_guide.md`)

Runs automatically on the pre-commit hook, from the `$WORKSPACE` root:

```bash
npm run ci # lint, test and build
```

---

## Coordination

### Not In Scope

- **`workspace/` roots** — the inventory records roots extending `workspace/tsconfig.json`; `workspace` stays as the supported convenience preset for workspaces per the shared-config ADR, and roots do not shape distribution.
- **App and Astro configs** — configs extending `astro/tsconfigs/*` are app-owned, not `@noodlestan/tsconfig` consumers.
- **Prettier adoption** — every repository adopts `@noodlestan/prettier-config` under `Plan: Adopt Prettier Config`.
- **Feature changes in consumer packages** — this plan changes distribution shape only; no API or behaviour work rides along.

### Evidence

- **Matrix complete** — every `tsconfig.json` under `$CHECKOUTS` (excluding `node_modules`) resolves to a row with a chosen config and a batch.
- **No transitional extends remain** — a scan for `tsconfig/cli` and `tsconfig/libs` outside `$TSCONFIG` returns zero matches.
- **Node loads migrated output** — for each migrated `esbuild/` package, plain `node` loads its built entry without a loader flag, and `.d.ts` files exist next to the bundle.
- **CI green per checkout** — `npm run ci` passes in every migrated checkout and in `$PROJECT`.

### Findings

- **The planning scan found 10 packages extending `cli/tsconfig.json` across 6 checkouts** — no-comply, purrception, art-md, art-work, art-js, and art-lib; the inventory iteration is the authority.
- **26 packages extend `libs/*` across 6 checkouts** — no-comply (8, including `apps/standard-ui-demo`), art-md (5), purrtrait (5), purrpose (3), art-js (3), purrception (2).
- **`libs/` splits three ways** — `tsconfig-vite.json` (9 packages), `tsconfig-vite-solid.json` (9), `tsconfig-vite-node.json` (8: art-md ×5, art-js ×3). The `vite-node` rows are Node-consumed libraries and the strongest `esbuild/` candidates — they form the `vite to esbuild migrations` batch.
- **Folder location does not decide the batch** — `art-lib/libs/fs-records` extends the `cli/` preset while living under `libs/`; classification must come from consumers, not paths.
- **`libs/` → `vite/` is largely a rename** — both use `ESNext`/`bundler` resolution, so the semantic risk concentrates in the `vite to esbuild migrations` batch's flip to `NodeNext`.
- **Declaration emit is consumer-owned** — since `Plan: Externalize Esbuild Config` removed the emit presets, every `esbuild/` package needs `build.config.mjs` plus `postBuildPlugin` running `tsc --emitDeclarationOnly`.

### Decisions

- **Classify by consumers, not folders** — Node-consumed packages use the `esbuild/` config; bundler-consumed packages use the `vite/` config, chosen according to consumer build tool.
- **Inventory before migration** — no package changes until the matrix exists; it is both the to-do list and the effort estimate.
- **Pilot the `vite to esbuild migrations` batch before rolling it out** — one `libs/` → `esbuild/` migration first; its recipe is replayed by the rest of the batch, and gaps escalate to a re-pilot.
- **One complete checkout per commit** — each migration commit is independently verifiable and revertable.
- **Transitional presets stay published until the matrix clears** — removal is a breaking release, not a prerequisite.

### Knowledge to Update

- `$TSCONFIG/CHANGELOG.md` — `esbuild/` and `vite/` configs added; transitional presets retired with a major entry.
- `$TSCONFIG/_guide.md` — layout and consumer-build-tool table after removal.
- `$PROJECT/architecture/design/typescript.md` — drop the transitional preset rows; match the shared-config ADR's consumer-build-tool scoping.
- `$PROJECT/README.md` — preset guidance for new packages.

### Follow Ups

- **Declaration-emit preset** — decide whether `Plan: Externalize Esbuild Config`'s follow-up ships a documented `tsc --emitDeclarationOnly` preset or stays a recipe; the pilot step of the `vite to esbuild migrations` batch feeds this decision.
- **Major release of `@noodlestan/tsconfig`** — publish the breaking version produced by the `config cleanup` batch.

### Feedback

- None.
