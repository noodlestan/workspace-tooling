# Plan: Adopt Own Configs

**ID:** `adopt-own-configs`

**Status:** `DRAFT`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** The workspace-tooling monorepo publishes `@noodlestan/eslint-config`, `@noodlestan/prettier-config`, `@noodlestan/prettier-config-astro`, `@noodlestan/tsconfig`, and `@noodlestan/esbuild`, yet it still hand-writes its own ESLint, Prettier, and TypeScript configuration — so the packages are never exercised the way their consumers exercise them, and drift between the shipped rules and the rules the monorepo runs goes unnoticed.

**Description:** Plan record spanning `Project: Noodlestan Workspace Tooling`, `Repository: Workspace Tooling`, and all 5 packages, executed from `$PROJECT`. Implements `ADR: Self-Consumption` and `ADR: Internal Dependencies`.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path                 | Purpose                                                 |
| ------------ | ----------------------------- | ------------------------------------------------------- |
| `$WORKSPACE` | Current working directory     | Workspace root directory.                               |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains`  | Domain resources directory.                             |
| `$PROJECT`   | `checkouts/workspace-tooling` | Monorepo that hosts the packages and this plan.         |
| `$CONFIGS`   | `$PROJECT/configs`            | The four configuration packages.                        |
| `$CLI`       | `$PROJECT/cli/esbuild-cli`    | `@noodlestan/esbuild` package.                          |
| `$ADRS`      | `$PROJECT/architecture/adr`   | Decision records captured and implemented by this plan. |

## Summary

Make the workspace-tooling monorepo consume its own published packages. The root and every package adopt the shared ESLint, Prettier, and TypeScript configuration where it applies; internal dependencies switch to a wildcard range so the local workspace copy is always the one consumed; targets that have nothing to consume are recorded as gaps; and, because a workspace link does not exercise the `files` allow-list, the published tarballs are validated separately.

Scope is `Project: Noodlestan Workspace Tooling`, `Repository: Workspace Tooling`, and all 5 packages; upstream is the self-consumption and internal-dependencies ADRs and the coordinating milestone.

## Attachments

- `./plan-adopt-own-configs__matrix.md` (Matrix) — Per-target internal-consumption matrix produced by Iteration: Inventory Internal Consumption.

## Context

### Upstream Work

| Kind      | Path                                                            | Role                                                                                                                                 |
| --------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| ADR       | `$ADRS/self-consumption.md`                                     | `Proposed`. The repository consumes its own packages by name; entry points are validated, the `files` allow-list is not.             |
| ADR       | `$ADRS/internal-dependencies.md`                                | `Proposed`. Internal dependencies use a wildcard range so npm workspaces always links the local copy.                                |
| ADR       | `$ADRS/shared-config.md`                                        | `Adopted`. ESLint config as a single package; Prettier as ESLint rule plus standalone check; TSConfig scoped to consumer build tool. |
| Milestone | `$PROJECT/_roadmap/3-now/milestone-tooling-one/milestone.md`    | `WORKING`. Coordinates this plan with the other tooling plans.                                                                       |
| Plan      | `$PROJECT/_backlog/4-next/plan-adopt-prettier-config/plan.md`   | `DRAFT`. `$PROJECT` root Prettier adoption moves from that plan to this one; the consumer-repository adoption stays there.           |
| Plan      | `$PROJECT/_backlog/0-archive/2026-10-10-plan-adopt-esm/plan.md` | `DONE`. Owns the `@noodlestan/tsconfig` presets this plan consumes.                                                                  |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Planning.

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

| Workflow / Operation / Path                                                                                               | Purpose                                                  |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Planning Work / Contextualizing Work Item `$DOMAINS/work/workflows/planning-work/contextualizing-work-item/operation.art` | Collect upstream sources, scope, and context.            |
| Planning Work / Drafting Work Item `$DOMAINS/work/workflows/planning-work/drafting-work-item/operation.art`               | Generate the work item record and its iterations.        |
| Planning Work / Planning Work Item `$DOMAINS/work/workflows/planning-work/planning-work-item/operation.art`               | Refine iterations, changes, and commit blueprints.       |
| Planning Work / Writing Commit Message `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`       | Write standardized commit messages.                      |
| Planning Work / Validating Work Item `$DOMAINS/work/workflows/planning-work/validating-work-item/operation.art`           | Check integrity before execution.                        |
| Executing Work / Setting Up `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`                             | Install dependencies in `$PROJECT`.                      |
| Executing Work / Executing Work Step `$DOMAINS/work/workflows/executing-work/executing-work-step/operation.art`           | Carry out one iteration's changes.                       |
| Executing Work / Verifying Step `$DOMAINS/work/workflows/executing-work/verifying-step/operation.art`                     | Run package lint and packaging checks for one iteration. |
| Executing Work / Verifying Completion `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`         | Run the monorepo CI gate before completion.              |

### Knowledge

::READ `$ADRS/self-consumption.md` (ADR) — Consume published packages by name via the workspace link; entry points validated, `files` not. Relevant for Planning Work Item, Executing Work Step.

::READ `$ADRS/internal-dependencies.md` (ADR) — Internal dependencies use a wildcard range so the local workspace copy is always linked. Relevant for Executing Work Step.

::READ `$ADRS/shared-config.md` (ADR) — ESLint config as one package; Prettier as ESLint rule plus standalone check; TSConfig scoped to consumer build tool. Relevant for Planning Work Item.

::READ `$PROJECT/_guide.md` (Guide) — Repository layout, records management, and `npm run ci` verification. Relevant for Planning Work Item, Setting Up, Verifying Completion.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Commit message types, scopes, and format rules for all iterations in this plan.

## Scope

The whole monorepo: the root and all 5 packages adopt each shared config where it applies. Application is selective — the ESLint monolith contributes its JavaScript rules to the packages that contain JavaScript, and not to the JSON-only or preset-only packages; Prettier resolves by walking up, so the root config governs every package. Where a target has nothing to consume, the gap is recorded, not forced.

### (Scope) Project: Noodlestan Workspace Tooling

**Record:** `$PROJECT/_records/project.art`

**Role:** — Owns all 5 packages and adopts the shared configs itself.

**Partial:**

- `owner` — Project: Noodlestan Management
- `path` — `$PROJECT/`
- `resources` — Package: ESLint Config, Package: Prettier Config, Package: Prettier Config Astro, Package: TS Config, Package: ESBuild CLI

**Changes:**

- Replace the root `.prettierrc` with the `prettier` field pointing at `@noodlestan/prettier-config`.
- Replace the root `tsconfig.json` with one extending `@noodlestan/tsconfig/monorepo`.
- Switch internal `devDependencies` to a wildcard range and add the missing internal packages.

### (Scope) Repository: Workspace Tooling

**Record:** `$PROJECT/_records/repository.art`

**Role:** — Hosts this plan, the packages, and the ADRs it implements. Changes required.

**Partial:**

- `owner` — Project: Noodlestan Workspace Tooling
- `path` — `$PROJECT/`
- `workspaces` — `cli/*`, `configs/*`

**Changes:**

- Add a packaging check to the repository verification so the `files` allow-list is exercised.
- Update `README.md`, `_guide.md`, and `architecture/index.md`.

### (Scope) Configuration Packages

| Package               | Record                                                | Role                                                                             |
| --------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------- |
| ESLint Config         | `$CONFIGS/eslint-config/_records/package.art`         | Consumes its own export; drops the divergent `.prettierrc`; adds an ESLint step. |
| Prettier Config       | `$CONFIGS/prettier-config/_records/package.art`       | Consumes the root Prettier config; gains an ESLint check over its `.cjs` source. |
| Prettier Config Astro | `$CONFIGS/prettier-config-astro/_records/package.art` | Consumes the root Prettier config; gains an ESLint check over its `.cjs` source. |
| TS Config             | `$CONFIGS/tsconfig/_records/package.art`              | Preset-only package: likely nothing to consume; record the gap.                  |

**Changes:**

- Align each package's `tsconfig.json` (where present) with an `@noodlestan/tsconfig` preset.
- Remove package-local Prettier overrides so every package inherits the root config.
- Add an ESLint step to packages that contain JavaScript but currently lint with Prettier alone.

### (Scope) Package: ESBuild CLI

**Record:** `$CLI/_records/package.art`

**Role:** — Already inherits the root ESLint and Prettier config; verify only.

**Partial:**

- `owner` — Project: Noodlestan Workspace Tooling
- `path` — `cli/esbuild-cli/`

**Changes:**

- Confirm `eslint --ext .mjs .` resolves the root `.eslintrc.js` and that no package-local config is needed.

## Execution Context

Execution occurs from `$PROJECT/` on branch `main` (or a dedicated branch). All targets are inside the one repository, so each iteration is one complete commit; the packaging check added by this plan runs in the same `npm run ci` gate the pre-commit hook already uses.

---

## Items:

| Iteration / Instructions                  | Status  |
| ----------------------------------------- | ------- |
| Iteration: Inventory Internal Consumption | `DRAFT` |
| Iteration: Switch Internal Dependencies   | `DRAFT` |
| Iteration: Adopt Monorepo TSConfig        | `DRAFT` |
| Iteration: Adopt Prettier Internally      | `DRAFT` |
| Iteration: Adopt ESLint Internally        | `DRAFT` |
| Iteration: Validate Published Files       | `DRAFT` |
| Iteration: Verify and Document            | `DRAFT` |

### Iteration: Inventory Internal Consumption

**Id:** `inventory-internal-consumption`

**Status:** `DRAFT`

**Purpose:** Fix the authoritative list of what each root and package consumes, and record the gaps before changing anything.

**Description:** Scan `$PROJECT` root and every package (`$CLI`, `$CONFIGS/*`) for its current ESLint, Prettier, and TypeScript configuration; determine which published package should apply; record the expected change; and record every target that has nothing to consume as a gap.

**Changes:**

- Record per target: current config files, the shared package that applies, and the expected change.
- Record gaps where a target has nothing to consume — an Astro project for the Astro configs, a Node-targeted library build for the `esbuild` preset, a Vite library for the `vite` preset — as findings for follow-up.
- Write `./plan-adopt-own-configs__matrix.md` with the full matrix and a per-target summary.

**Dependencies:**

- None.

### Iteration: Switch Internal Dependencies

**Id:** `switch-internal-dependencies`

**Status:** `DRAFT`

**Purpose:** Make every internal dependency always resolve to the local workspace package.

**Description:** Implement `ADR: Internal Dependencies`. Replace hard pins with a wildcard range and add the internal dependencies the adoption iterations need.

**Changes:**

- In root `package.json` `devDependencies`, set `@noodlestan/eslint-config` to `"*"`; add `@noodlestan/prettier-config` and `@noodlestan/tsconfig` at `"*"`.
- Add an internal dependency in each package that consumes a sibling.
- Run `npm install` and confirm every `node_modules/@noodlestan/*` entry resolves to the local `configs/*` or `cli/*` path, not a registry copy.

**Dependencies:**

- None.

### Iteration: Adopt Monorepo TSConfig

**Id:** `adopt-monorepo-tsconfig`

**Status:** `DRAFT`

**Purpose:** Type-check the monorepo and its packages with the presets it ships.

**Description:** Replace the hand-written root `tsconfig.json` with one extending `@noodlestan/tsconfig/monorepo`, and align the config packages' own `tsconfig.json` files with the applicable preset.

**Changes:**

- Replace `$PROJECT/tsconfig.json` with one extending `@noodlestan/tsconfig/monorepo/tsconfig.json`, keeping the existing `include` and `exclude`.
- Point `$CONFIGS/eslint-config/tsconfig.json` and `test/tsconfig.json` at the applicable preset; where none fits a CJS tooling package, record the gap rather than forcing a mismatch.
- Confirm the root `npm run ci` still passes.

**Dependencies:**

- Iteration: Switch Internal Dependencies.

### Iteration: Adopt Prettier Internally

**Id:** `adopt-prettier-internally`

**Status:** `DRAFT`

**Purpose:** Format the monorepo from the package it ships.

**Description:** Point the root at `@noodlestan/prettier-config` and remove the divergent package-local config. Prettier resolves configuration by walking up from each file, so the root config governs every package without per-package adoption.

**Changes:**

- Replace `$PROJECT/.prettierrc` with `"prettier": "@noodlestan/prettier-config"` in the root `package.json`; delete the root `.prettierrc`.
- Delete `$CONFIGS/eslint-config/.prettierrc` so the package inherits the root config; accept the resulting re-indent as correct output.
- Run `npm run lint:fix`; accept the documented `*.mjs` re-indent; stop and report any other diff as a defect.
- Coordinate: remove `$PROJECT` from `Plan: Adopt Prettier Config` (`$PROJECT/_backlog/4-next/plan-adopt-prettier-config/plan.md`).

**Dependencies:**

- Iteration: Switch Internal Dependencies.

### Iteration: Adopt ESLint Internally

**Id:** `adopt-eslint-internally`

**Status:** `DRAFT`

**Purpose:** Lint every package that contains JavaScript with the shared config.

**Description:** The root `.eslintrc.js` already spreads `@noodlestan/eslint-config`; legacy `eslintrc` cascades, so packages inherit it. Add an ESLint step only to the packages that contain JavaScript and currently lint with Prettier alone.

**Changes:**

- Confirm `$CLI`'s `eslint --ext .mjs .` resolves the root config, so no package-local ESLint config is needed.
- Add an ESLint step to the `lint` and `ci` scripts of packages that contain JavaScript but do not lint it (for example `$CONFIGS/prettier-config/src/index.cjs` and `$CONFIGS/prettier-config-astro/src/index.cjs`).
- Skip the JSON-only and preset-only packages and record why; keep `$CONFIGS/eslint-config/.eslintrc.cjs` as that package's self-reference.
- Confirm the JavaScript rules apply to the `.cjs` sources.

**Dependencies:**

- Iteration: Switch Internal Dependencies.

### Iteration: Validate Published Files

**Id:** `validate-published-files`

**Status:** `DRAFT`

**Purpose:** Close the gap self-consumption cannot cover — the contents of the published tarball.

**Description:** Because the workspace link does not exercise the `files` allow-list, pack each package and inspect what would be published; then add the check to the repository's verification.

**Changes:**

- Run `npm pack --dry-run` in each of the 5 packages and compare the file list against the package's entry points and `files`.
- Fix `files` where an essential file is missing or an unwanted file is included.
- Add a packaging check (for example `publint` or `npm pack --dry-run` per workspace) to the repository verification so future drift is caught.

**Dependencies:**

- Iteration: Adopt Monorepo TSConfig.
- Iteration: Adopt Prettier Internally.
- Iteration: Adopt ESLint Internally.

### Iteration: Verify and Document

**Id:** `verify-and-document`

**Status:** `DRAFT`

**Purpose:** Make the internal adoption reproducible and recorded.

**Description:** Update the repository knowledge and records, and confirm the gate is green.

**Changes:**

- Update `$PROJECT/_guide.md`, `$PROJECT/README.md`, and `architecture/index.md` to describe self-consumption and the packaging check.
- Update the `_records` for every package whose dependencies or config changed.
- Run `npm run ci` from `$PROJECT` and confirm it is green.

**Dependencies:**

- Iteration: Validate Published Files.

## Work

### Next

All 7 iterations are `DRAFT`. Run **Plan Iterations** (`plan more`) to refine purposes, changes, and commit blueprints, then **Write Instructions** to produce delegatable instruction files.

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

Run from the `$PROJECT` root:

```bash
npm ci # to install dependencies, including the local workspace config packages.
npm run ci # to verify the build is green before starting.
```

### Verifying Step

**Purpose:** Verify the changes produced by one iteration. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-step/operation.art`.

**Instructions:** (From `$PROJECT/_guide.md`)

Run from the `$PROJECT` root:

```bash
npm run lint # prettier and eslint over the root and every package.
npm run ci # turbo run ci across every package.
```

**Instructions:** (Packaging check, per package)

Run from each package directory to exercise the `files` allow-list the workspace link does not:

```bash
npm pack --dry-run # inspect the tarball contents against the entry points and `files`.
```

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`.

**Instructions:** (From `$PROJECT/_guide.md`)

Runs automatically on the pre-commit hook, from the `$PROJECT` root:

```bash
npm run ci # lint, test and build
```

---

## Coordination

### Not In Scope

- **Consumer-repository adoption** — `Plan: Adopt Prettier Config` and `Plan: Adopt ESM` migrate the consumer checkouts; this plan only takes `$PROJECT` root Prettier adoption back from the former.
- **Build self-consumption** — no package in this repository builds through `@noodlestan/esbuild` (the four config packages ship source or JSON, and `esbuild-cli` is the wrapper itself), so there is no build path to consume. Revisit when a package here builds.
- **New tooling packages** — gaps found by the inventory are recorded as follow-ups; creating the missing package (for example an Astro or Vite consumer fixture) is separate work.
- **ESLint flat config migration** — the packages stay on the legacy `.eslintrc` shape per `ADR: Shared Configuration`.

### Evidence

- **The monorepo runs the rules it ships** — root Prettier, ESLint, and TypeScript config resolve to `@noodlestan/*` packages, verifiably by `npm run lint` and a resolved-config dump.
- **Internal dependencies are local** — every `node_modules/@noodlestan/*` entry is a symlink into `configs/*` or `cli/*` after `npm install`.
- **Published tarballs are complete** — `npm pack --dry-run` for each package lists every file its entry points require.
- **The gate is green** — `npm run ci` passes from `$PROJECT`.

### Findings

- **A workspace link validates entry points, not `files`** — resolution goes through `package.json`, so `main`, `exports`, the `prettier` field, and `types` are exercised; the symlink exposes the whole directory, so the `files` allow-list is not.
- **A hard version pin silently breaks self-consumption** — the root pins `@noodlestan/eslint-config` at `0.0.8`; the next bump would resolve the registry copy instead of the local one.
- **Prettier resolves by walking up** — a root `prettier` field governs every package, so per-package Prettier adoption is unnecessary.
- **Legacy `eslintrc` cascades** — a root `.eslintrc.js` governs every package that does not declare its own, so only packages with JavaScript and no lint step need a change.
- **Two divergent rule sets exist today** — the root `.prettierrc` (tabs for the JS family) versus `configs/eslint-config/.prettierrc` (`tabWidth: 4`); the shared package follows the root rules, so removing the package-local file re-indents.

### Decisions

- **Consume by name, never by relative path** — the package boundary (`exports`, `prettier`, `files`) is the thing under test.
- **Internal dependencies use a wildcard range** — the local workspace copy is always the one consumed; see `ADR: Internal Dependencies`.
- **Application is selective** — a package consumes only the config that applies to its files; a target with nothing to consume yields a recorded gap.
- **Packaging is verified separately** — because the link cannot exercise `files`, the repository verification packs each package.
- **`$PROJECT` root Prettier adoption moves here** — from `Plan: Adopt Prettier Config`, so one plan owns the root migration.

### Knowledge to Update

- `$PROJECT/architecture/index.md` — register the self-consumption and internal-dependencies ADRs.
- `$PROJECT/_guide.md` — describe self-consumption and the packaging check.
- `$PROJECT/README.md` — consumer and maintainer guidance for the local link.
- Package `_records` — reflect changed dependencies and scripts.

### Follow Ups

- **Record the gaps the inventory finds** — a missing tooling package for a repository shaped like this one is its own plan.
- **Build self-consumption** — revisit when a package in this repository builds through `@noodlestan/esbuild`.
- **CI packaging gate** — promote `npm pack --dry-run`/`publint` from a manual check to a required step.

### Feedback

- None.
