# Plan: Adopt Prettier Config

**ID:** `adopt-prettier-config`

**Status:** `DRAFT`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** The two Prettier config packages are scaffolded but their release artefacts are still unstaged and unpublished, and every Noodlestan repository except `$WEB` still hand-writes — or simply lacks — its own Prettier config.

**Description:** Plan record with 4 draft iterations spanning `Package: Prettier Config`, `Package: Prettier Config Astro`, and every consumer checkout, executed from `$WORKSPACE`.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable          | Resolved Path                            | Purpose                                                          |
| ----------------- | ---------------------------------------- | ---------------------------------------------------------------- |
| `$WORKSPACE`      | Current working directory                | Workspace root directory.                                        |
| `$DOMAINS`        | `$WORKSPACE/.agents/domains`             | Domain resources directory.                                      |
| `$PROJECT`        | `checkouts/workspace-tooling`            | Hosts both config packages and this plan.                        |
| `$PRETTIER`       | `$PROJECT/configs/prettier-config`       | `@noodlestan/prettier-config` — the base rules.                  |
| `$PRETTIER_ASTRO` | `$PROJECT/configs/prettier-config-astro` | `@noodlestan/prettier-config-astro` — the Astro-augmented rules. |
| `$WEB`            | `$WORKSPACE/checkouts/noodlestan-web`    | Pilot consumer; adoption already proven there.                   |
| `$CHECKOUTS`      | `$WORKSPACE/checkouts`                   | All managed checkouts adopted by this plan.                      |
| `$ROADMAP`        | `$PROJECT/_roadmap`                      | Roadmap holding the coordinating milestone.                      |

## Summary

Land both Prettier config packages' release artefacts, let `Plan: Add Prettier Config` publish them at `0.0.1` and pin the pilot consumer, then replace every repository's hand-written or missing Prettier config with the `prettier` field pointing at `@noodlestan/prettier-config`.

Scope is both config packages, `$PROJECT` itself, and the consumer checkouts enumerated by the inventory iteration; upstream is `Plan: Add Prettier Config`, which delivered the packages and the proven `$WEB` pilot.

## Attachments

- `./plan-adopt-prettier-config__matrix.md` (Matrix) — Per-repository Prettier adoption matrix produced by Iteration: Inventory Prettier Configs.

## Context

### Upstream Work

| Kind                | Path                                                       | Role                                                                                                                                                                                                                          |
| ------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plan                | `$PROJECT/_backlog/3-now/plan-add-prettier-config/plan.md` | `WORKING`; created both packages and proved the base config in `$WEB`; owns publishing `0.0.1` and pinning `$WEB` through its `publish-and-pin` iteration — this plan lands the release artefacts that iteration needs first. |
| ADR                 | `$PROJECT/architecture/adr/shared-config.md`               | Prettier as both an ESLint rule and a standalone check; config ships as a versioned package.                                                                                                                                  |
| Milestone           | `$ROADMAP/3-now/milestone-tooling-one/milestone.md`        | Coordinates this plan with the other tooling plans.                                                                                                                                                                           |
| Uncommitted changes | `git status` in `$PROJECT`                                 | The unstaged CHANGELOG, `files`, and fixture changes are this plan's release material.                                                                                                                                        |

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
| Executing Work / Pushing To Remote `$DOMAINS/work/workflows/executing-work/pushing-to-remote/operation.art`               | Push per-repository adoption commits.                      |

### Knowledge

::READ `$PROJECT/architecture/adr/shared-config.md` (ADR) — One formatting source of truth, two enforcement points, config published as a versioned package. Relevant for Planning Work Item.

::READ `$PRETTIER/_guide.md` (Guide) — Package layout, rules, and the `prettier` field adoption recipe consumers follow. Relevant for Executing Work Step, Verifying Step.

::READ `$PRETTIER_ASTRO/_guide.md` (Guide) — Astro-augmented package layout and its base-package spread. Relevant for Executing Work Step.

::READ `$PROJECT/_guide.md` (Guide) — Repository layout, records management, and `npm run ci` verification. Relevant for Planning Work Item, Setting Up, Verifying Completion.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Commit message types, scopes, and format rules for all iterations in this plan.

## Scope

Changes in 2 packages and every checkout under `$CHECKOUTS`: the release artefacts land first, upstream publishes and pins, the inventory fixes the adoption list, and each repository adopts the base config with one complete commit.

### (Scope) Project: Noodlestan Workspace Tooling

**Record:** `$PROJECT/_records/project.art`

**Role:** — Owns both packages and adopts the base config itself.

**Partial:**

- `owner` — Project: Noodlestan Management
- `path` — `$PROJECT/`
- `resources` — includes Package: Prettier Config, Package: Prettier Config Astro

**Changes:**

- Land both packages' release artefacts (changelogs, `files`, fixture) for upstream's `publish-and-pin` to publish.
- Replace the root `$PROJECT/.prettierrc` with the `prettier` field, accepting the documented `*.mjs` re-indent.

### (Scope) Package: Prettier Config

**Record:** `$PRETTIER/_records/package.art`

**Role:** — Changes required. Holds the canonical rules; release artefacts are unstaged.

**Partial:**

- `owner` — Project: Noodlestan Workspace Tooling
- `path` — `configs/prettier-config/`
- `canonicalName` — `@noodlestan/prettier-config`
- `deployment` — NPM Package Deployment: Prettier Config

**Changes:**

- Land the rewritten `CHANGELOG.md` `0.0.1` entry describing the shipped rules and both entry points.
- Confirm `test/example.mjs` is formatted by the package's own rules (tabs in the `*.mjs` override) and that the `ci` script leaves fixtures unchanged.

### (Scope) Package: Prettier Config Astro

**Record:** `$PRETTIER_ASTRO/_records/package.art`

**Role:** — Changes required. Release artefacts are unstaged.

**Partial:**

- `owner` — Project: Noodlestan Workspace Tooling
- `path` — `configs/prettier-config-astro/`
- `canonicalName` — `@noodlestan/prettier-config-astro`
- `deployment` — NPM Package Deployment: Prettier Config Astro

**Changes:**

- Land the rewritten `CHANGELOG.md` `0.0.1` entry describing the Astro override, the base spread, and the peer dependency.
- Drop `_guide.md` from `files` in `package.json`, and confirm whether the base package should match.

### (Scope) Consumer Checkouts: Prettier Adoption

**Record:** Each checkout's `_records/repository.art` under `$CHECKOUTS` — the exact set is fixed by Iteration: Inventory Prettier Configs; the upstream plan recorded 9 consumer repositories, plus `$PROJECT` itself.

**Role:** — Changes required. Every repository drops its hand-written config — or gains one it never had.

**Changes:**

- Replace `.prettierrc*` with `"prettier": "@noodlestan/prettier-config"` in the checkout's `package.json`; add the dependency in the root `devDependencies`.
- Run `npm run lint` and accept the expected `*.mjs` re-indent as correct output; anything beyond it is a defect in `$PROJECT`.
- One complete checkout per commit on branch `adopt-prettier-config`.

**Operations:**

- Run `npm run lint` in each checkout after adoption, before its commit.

**Dependencies:**

- Upstream `Plan: Add Prettier Config` must have published `0.0.1` through its `publish-and-pin` iteration.

## Execution Context

Execution occurs from `$WORKSPACE/`. Package work runs in `$PROJECT` on branch `main`; ecosystem adoption runs per checkout on branch `adopt-prettier-config`, one complete checkout per commit. `$WEB` is already migrated by the upstream plan and is verified, not re-migrated.

---

## Items:

| Iteration / Instructions               | Status  |
| -------------------------------------- | ------- |
| Iteration: Finalise Release Artefacts  | `DRAFT` |
| Iteration: Inventory Prettier Configs  | `DRAFT` |
| Iteration: Adopt Base Config Ecosystem | `DRAFT` |
| Iteration: Document Adoption           | `DRAFT` |

### Iteration: Finalise Release Artefacts

**Id:** `finalise-release-artefacts`

**Status:** `DRAFT`

**Purpose:** Turn the unstaged polish into committed, publish-ready release artefacts.

**Description:** Land the four modified files: the rewritten `CHANGELOG.md` in both packages, the `files` change dropping `_guide.md` from the Astro package, and `test/example.mjs` re-indented to tabs by the shipped rules. This iteration changes no rules — it only makes the release description and fixtures match what the packages actually ship.

**Changes:**

- Commit `$PRETTIER/CHANGELOG.md` with the rewritten `0.0.1` prose covering base rules, tab override, and both entry points.
- Commit `$PRETTIER_ASTRO/CHANGELOG.md` with the rewritten `0.0.1` prose covering the Astro override, base spread, and peer dependency.
- Commit `$PRETTIER_ASTRO/package.json` with `_guide.md` removed from `files`; confirm whether `$PRETTIER/package.json` should match and align or record the reason.
- Commit `$PRETTIER/test/example.mjs` re-indented to tabs; run `npm run ci` in both packages and confirm the fixtures are unchanged by a second run.

**Dependencies:**

- None.

### Iteration: Inventory Prettier Configs

**Id:** `inventory-prettier-configs`

**Status:** `DRAFT`

**Purpose:** Fix the authoritative adoption list and the expected diff per repository before changing any of them.

**Description:** Scan every checkout under `$CHECKOUTS` for its current Prettier setup — hand-written `.prettierrc*`, a `prettier` field, an ESLint-carried config, or nothing — plus whether Astro files exist and how far the current formatting is from the shipped rules. All repositories adopt; the inventory only decides variant and expected diff.

**Changes:**

- Record per checkout: current config path, its rules delta against `$PRETTIER/src/index.json`, presence of `.astro` files, and expected adoption diff.
- Flag every checkout where adoption re-indents `*.mjs`, and flag any wider diff as a pre-existing divergence to be judged, not silently absorbed.
- Write `./plan-adopt-prettier-config__matrix.md` with the full matrix and per-checkout adoption commands.
- Mark `$WEB` as already adopted.

**Dependencies:**

- None.

### Iteration: Adopt Base Config Ecosystem

**Id:** `adopt-base-config-ecosystem`

**Status:** `DRAFT`

**Purpose:** Replace every repository's config with the published base package.

**Description:** For each matrix row, swap the hand-written config for `"prettier": "@noodlestan/prettier-config"`, run the repo's lint, accept the documented `*.mjs` re-indent, and commit the complete checkout. `$PROJECT` itself goes last so the root migration is validated against every package already published.

**Changes:**

- Per checkout: delete `.prettierrc*`, add the `prettier` field and the `devDependencies` entry, run `npm run lint`, inspect the diff.
- Treat `*.mjs` re-indentation as correct output; stop and report any other change as a defect in `$PROJECT`.
- Migrate `$PROJECT` root last: replace `$PROJECT/.prettierrc`, accepting the re-indent of the `.mjs` files under `cli/esbuild-cli/`.
- Commit one checkout at a time on branch `adopt-prettier-config`; update the matrix row after each.

**Dependencies:**

- Iteration: Finalise Release Artefacts — the release artefacts must be committed before upstream can publish them.
- `Plan: Add Prettier Config` — Iteration: Publish and Pin must have published `0.0.1`.
- Iteration: Inventory Prettier Configs.

### Iteration: Document Adoption

**Id:** `document-adoption`

**Status:** `DRAFT`

**Purpose:** Make the adoption recipe reproducible for the next repository added to the ecosystem.

**Description:** Record the recipe — the `prettier` field, the dependency, the expected diff, and the lint command — in the package guide and the project README, and close the matrix.

**Changes:**

- Update `$PRETTIER/_guide.md` and `$PROJECT/README.md` with the consumer adoption recipe and the `*.mjs` re-indent expectation.
- Update `$PRETTIER_ASTRO/_guide.md` with when a repository reaches for the Astro variant.
- Confirm every matrix row is `DONE` and no `.prettierrc*` remains outside the config packages.

**Dependencies:**

- Iteration: Adopt Base Config Ecosystem.

## Work

### Next

All 4 iterations are `DRAFT`. Run **Plan Iterations** (`plan more`) to refine purposes, changes, and commit blueprints, then **Write Instructions** to produce delegatable instruction files. Sequencing: land the release artefacts, let upstream's `publish-and-pin` publish and pin, then adopt.

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
npm ci # to install dependencies, including the workspace config packages.
npm run ci # to verify the build is green before starting.
```

### Verifying Step

**Purpose:** Verify the changes produced by one iteration. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-step/operation.art`.

**Instructions:** (From `$PRETTIER/_guide.md`)

Run from each package directory:

```bash
npm run lint # prettier and eslint issues.
npm run test # package fixtures must be unchanged by a clean run.
```

**Instructions:** (Per adopted consumer checkout)

Run from the checkout root:

```bash
npm run lint # must pass; the diff may contain only the expected *.mjs re-indent.
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

- **Astro config rollout** — `Plan: Add Astro Support` is the consumer of `@noodlestan/prettier-config-astro`; this plan only lands its release artefacts.
- **`.prettierignore` policy** — a shared ignore file is a separate concern inherited as open from the upstream plan.
- **ESLint config adoption** — `@noodlestan/eslint-config` distribution is separate work.
- **ESM migration** — module-format work across the ecosystem belongs to `Plan: Adopt ESM`.

### Evidence

- **Release artefacts match the shipped rules** — after `Finalise Release Artefacts`, both package `ci` scripts pass twice in a row with no diff.
- **Adopters run on released versions** — every adopted checkout installs `@noodlestan/prettier-config` at `0.0.1` from npm, not a symlink.
- **Adoption diffs are explainable** — every per-checkout diff contains only the expected `*.mjs` re-indent; anything else is reported as a defect in `$PROJECT`.
- **No hand-written configs remain** — a scan for `.prettierrc*` outside the config packages returns zero matches.

### Findings

- **The `*.mjs` re-indent is proven in `$WEB`** — its config already matched the shipped rules byte-for-byte; every other repository must expect the diff as correct output.
- **Two divergent rule sets predate the packages** — `$WEB/.prettierrc` (tabs for JS-family) versus `$PROJECT/configs/eslint-config/.prettierrc` (`tabWidth: 4` with 2-space overrides); the shipped rules follow `$WEB`, so adopting in `$PROJECT` re-indents rather than being a no-op.
- **Prettier resolves config by walking up from the file** — a package's own config is only used if its `package.json` carries the `prettier` field; the root config otherwise wins.

### Decisions

- **All repositories adopt** — inventory decides the variant and the expected diff, never whether to adopt.
- **Release artefacts land before publish** — changelogs and fixtures are committed before upstream's publish run; nothing is back-filled after `npm run art-work publish`.
- **Publishing stays upstream** — `Plan: Add Prettier Config`'s `publish-and-pin` runs the release; this plan lands the release artefacts first and adopts after, so no file and no npm gate is worked by both plans.
- **One complete checkout per commit** — adoption commits are independently verifiable and revertable.
- **The `*.mjs` re-indent is correct output** — a wider diff stops the migration and is judged as a defect in `$PROJECT` or a pre-existing divergence, never absorbed silently.

### Knowledge to Update

- `$PRETTIER/CHANGELOG.md` and `$PRETTIER_ASTRO/CHANGELOG.md` — final `0.0.1` release notes.
- `$PRETTIER/_guide.md` — consumer adoption recipe and expected diff.
- `$PRETTIER_ASTRO/_guide.md` — when a repository reaches for the Astro variant.
- `$PROJECT/README.md` — package list and adoption instructions for new repositories.
- `$PROJECT/_guide.md` — Prettier row in the projects table if adoption changes the documented layout.

### Follow Ups

- **Shared ignore convention** — decide a single `.prettierignore` policy across repositories, still open from the upstream plan.
- **Version bumps after `0.0.1`** — rule changes ship as new versions; adopters upgrade deliberately per the shared-config ADR.
- **Astro variant adoption** — tracked by `Plan: Add Astro Support` in `$PROJECT/_backlog/4-next/plan-add-astro-support/plan.md`.

### Feedback

- None.
