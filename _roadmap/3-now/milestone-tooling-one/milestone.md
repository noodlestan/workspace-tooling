# Milestone: Tooling One

**ID:** `tooling-one`

**Status:** `WORKING`

**Template:** `$DOMAINS/milestones/templates/milestone.tart`

**Skill:** `write-milestone`

**Purpose:** Make Noodlestan's build, TypeScript distribution, and formatting configuration a set of published packages that every repository adopts, instead of hand-written per-repo defaults.

**Description:** Milestone record coordinating the tooling configuration story across `$WORKSPACE` checkouts: Establish Baseline, where consumers own their build configuration; Add More Configs, where the shared config packages are published; Adopt in Ecosystem, where every checkout adopts them.

## Mandatory Reading

::READ `$DOMAINS/milestones/structures/milestone.art` (Structure) — Defines the milestone structure and nested types.

---

## Path Variables

| Variable     | Resolved Path                 | Purpose                                              |
| ------------ | ----------------------------- | ---------------------------------------------------- |
| `$WORKSPACE` | Current working directory     | Workspace root directory.                            |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains`  | Domain resources directory.                          |
| `$PROJECT`   | `checkouts/workspace-tooling` | Hosts the configuration packages and this milestone. |
| `$CHECKOUTS` | `$WORKSPACE/checkouts`        | All managed checkouts adopting the configuration.    |

## Summary

Deliver the tooling configuration story end to end: the build config contract is already externalised (`DONE`), the Prettier config packages are published and pinned in the pilot consumer with ecosystem adoption still open (`WORKING`), and the ecosystem-wide adoption of Node-compatible ESM distribution is underway (`WORKING`), shipping `@noodlestan/tsconfig@0.2.0` with the new presets.

Scope is `Project: Noodlestan Workspace Tooling` with its configuration packages and every consumer checkout; upstream is the distribution, shared-config, and build ADRs in `$PROJECT/knowledge/`.

## Context

### Upstream Work

| Kind    | Path                                      | Role                                                                                                |
| ------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ADR     | `$PROJECT/knowledge/adr/distribution.md`  | The distribution decisions being adopted across the ecosystem.                                      |
| ADR     | `$PROJECT/knowledge/adr/shared-config.md` | TSConfig scoped to consumer build tool, Prettier enforcement, config shipped as versioned packages. |
| ADR     | `$PROJECT/knowledge/adr/build-model.md`   | Build toolchain decisions behind the externalised build config contract.                            |
| Backlog | `$PROJECT/_backlog/backlog.art`           | Holds the plan items this milestone coordinates.                                                    |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `write-milestone` — Writes milestones from roadmaps and backlogs. Required for Planning Work Item.
- `render-template` — Renders milestone and plan artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                                 | Description                                                            |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md`       | Planning lifecycle for contextualising, drafting, and executing plans. |
| Domain: Roadmaps `$DOMAINS/roadmaps/index.md` | Roadmaps and milestone coordination.                                   |
| Domain: Work `$DOMAINS/work/index.md`         | Work item abstractions, workflows, and operating instructions.         |

### Resource Kinds in Scope

| Kind    | Domain   | Structure Record Path                      |
| ------- | -------- | ------------------------------------------ |
| Project | Projects | `$DOMAINS/projects/structures/project.art` |
| Package | Packages | `$DOMAINS/packages/structures/package.art` |
| Plan    | Plans    | `$DOMAINS/plans/structures/plan.art`       |

### Workflows

| Workflow / Path                                                                | Purpose                                                                       |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Workflow: Planning Work `$DOMAINS/work/workflows/planning-work/workflow.art`   | Create and manage work items lifecycle, collecting operational instructions.  |
| Workflow: Executing Work `$DOMAINS/work/workflows/executing-work/workflow.art` | Organize work execution to produce completed, verified outcomes and feedback. |

### Workflow Operations

| Workflow / Operation / Path                                                                                               | Purpose                                            |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Planning Work / Contextualizing Work Item `$DOMAINS/work/workflows/planning-work/contextualizing-work-item/operation.art` | Collect upstream sources, scope, and context.      |
| Planning Work / Planning Work Item `$DOMAINS/work/workflows/planning-work/planning-work-item/operation.art`               | Refine iterations, changes, and commit blueprints. |
| Planning Work / Validating Work Item `$DOMAINS/work/workflows/planning-work/validating-work-item/operation.art`           | Check integrity before execution.                  |
| Executing Work / Verifying Completion `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`         | Run the monorepo CI gate before completion.        |

### Knowledge

::READ `$PROJECT/knowledge/adr/distribution.md` (ADR) — Node-compatible ESM, compiled JS, declarations, and the TypeScript-source exemption. Relevant for Planning Work Item, Verifying Completion.

::READ `$PROJECT/knowledge/adr/shared-config.md` (ADR) — Consumer-build-tool TSConfig scoping, Prettier as ESLint rule plus standalone check, config as versioned package. Relevant for Planning Work Item.

::READ `$PROJECT/_guide.md` (Guide) — Repository layout, records management, and `npm run ci` verification. Relevant for Setting Up, Verifying Completion.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Commit message types, scopes, and rules for all work under this milestone.

## Scope

### (Scope) Project: Noodlestan Workspace Tooling

**Record:** `$PROJECT/_records/project.art`

**Role:** — Hosts this milestone, the configuration packages, and all four plan items.

**Partial:**

- `owner` — Project: Noodlestan Management
- `path` — `$PROJECT/`
- `resources` — Package: ESBuild CLI, Package: TS Config, Package: Prettier Config, Package: Prettier Config Astro

**Changes:**

- Deliver the four plans through their iterations.

### (Scope) Configuration Packages

The packages that carry the configuration to the ecosystem.

| Package               | Record                                                        | Carries                                                                                             |
| --------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| TS Config             | `$PROJECT/configs/tsconfig/_records/package.art`              | `esbuild` / `vite` configs; `monorepo` root preset; transitional `cli`, `libs`; legacy `workspace`. |
| Prettier Config       | `$PROJECT/configs/prettier-config/_records/package.art`       | Canonical base formatting rules.                                                                    |
| Prettier Config Astro | `$PROJECT/configs/prettier-config-astro/_records/package.art` | Astro-augmented formatting rules.                                                                   |
| ESBuild CLI           | `$PROJECT/cli/esbuild-cli/_records/package.art`               | The `build.config.mjs` consumer contract.                                                           |

**Changes:**

- Publish the Prettier packages at `0.0.1` and `@noodlestan/tsconfig@0.2.0` with the new presets; retire the transitional tsconfig presets once consumers migrate.

### (Scope) Consumer Checkouts

| Repository        | Record                                                   | Status |
| ----------------- | -------------------------------------------------------- | ------ |
| Art JS            | `$WORKSPACE/_records/repositories/art-js.art`            | -      |
| Art Lib           | `$WORKSPACE/_records/repositories/art-lib.art`           | -      |
| Art MD            | `$WORKSPACE/_records/repositories/art-md.art`            | -      |
| Art Work          | `$WORKSPACE/_records/repositories/art-work.art`          | -      |
| Artificials       | `$WORKSPACE/_records/repositories/artificials.art`       | -      |
| Artisans          | `$WORKSPACE/_records/repositories/artisans.art`          | -      |
| No Comply         | `$WORKSPACE/_records/repositories/no-comply.art`         | -      |
| Noodlestan Web    | `$WORKSPACE/_records/repositories/noodlestan-web.art`    | -      |
| Purrception       | `$WORKSPACE/_records/repositories/purrception.art`       | -      |
| Purrfect          | `$WORKSPACE/_records/repositories/purrfect.art`          | -      |
| Purrpose          | `$WORKSPACE/_records/repositories/purrpose.art`          | -      |
| Purrtrait         | `$WORKSPACE/_records/repositories/purrtrait.art`         | -      |
| Workspace Tooling | `$WORKSPACE/_records/repositories/workspace-tooling.art` | -      |

**Changes:**

- Replace hand-written Prettier configs with the published base package; migrate transitional tsconfig extends to the `esbuild/` or `vite/` config chosen according to consumer build tool; move repository roots onto the `monorepo/` preset.

## Execution Context

Execution is coordinated from `$WORKSPACE`. All plan work runs in `$PROJECT` or in the consumer checkouts under `$CHECKOUTS`, one complete checkout per commit; publishing happens from `$PROJECT` through `npm run art-work publish` at crew-gated iterations.

---

## Phases

| Index | Name               | Status    |
| ----- | ------------------ | --------- |
| 1     | Establish Baseline | `DONE`    |
| 2     | Add More Configs   | `WORKING` |
| 3     | Adopt in Ecosystem | `WORKING` |

### Phase: 1 — Establish Baseline

**Goal:** Consumers own their build configuration.

**Description:** Replace `esbuild-cli`'s unoverridable baked-in defaults with an explicit, consumer-owned `build.config.mjs`, and drop the emit-only tsconfig presets so declaration emit becomes the consumer's concern.

**Status:** `DONE`

**Dependencies:**

- None.

### Phase: 2 — Add More Configs

**Goal:** Every shared config package exists and is published.

**Description:** Finish and publish `@noodlestan/prettier-config` and `@noodlestan/prettier-config-astro`, and pin the pilot consumer to the released versions.

**Status:** `WORKING`

**Dependencies:**

- Phase 1 — Establish Baseline delivered the versioned-package pattern this phase reuses.

### Phase: 3 — Adopt in Ecosystem

**Goal:** Every consumer checkout adopts the published configs.

**Description:** Adopt the published configs across every checkout, including the tooling repository itself: replace hand-written or missing Prettier configs with the `prettier` field, inventory the ecosystem's packages and migrate them off the transitional `cli/` and `libs/` tsconfig presets onto `esbuild/` or `vite/` according to consumer build tool, move repository roots onto `monorepo/`, and retire the transitional presets once nothing extends them. Accept the documented `*.mjs` re-indent as correct output.

**Status:** `WORKING`

**Dependencies:**

- Phase 2 — Add More Configs publishes the config packages this phase consumes.
- Phase 1 — Establish Baseline: migrated `esbuild/` packages need the `build.config.mjs` contract and consumer-owned declaration emit.

---

## Items:

| Phase | Resource / Record                                                                                                 | Status    |
| ----- | ----------------------------------------------------------------------------------------------------------------- | --------- |
| 1     | Plan: Externalize Esbuild Config `$PROJECT/_backlog/0-archive/2026-10-10-plan-externalize-esbuild-config/plan.md` | `DONE`    |
| 1     | Plan: Publish Tool Index                                                                                          | -         |
| 2     | Plan: Add Prettier Config `$PROJECT/_backlog/0-archive/2026-10-10-plan-add-prettier-config/plan.md`               | `DONE`    |
| 2     | Plan: Add Astro Support `$PROJECT/_backlog/4-next/plan-add-astro-support/plan.md`                                 | `DRAFT`   |
| 2     | Plan: Rename Architecture to Knowledge `$PROJECT/_backlog/1-done/plan-rename-architecture-to-knowledge/plan.md`   | `DONE`    |
| 2     | Plan: Distribute ADRs as a Package `$PROJECT/_backlog/4-next/plan-distribute-adrs-as-a-package/plan.md`           | `DRAFT`   |
| 2     | Plan: Support for multi builds in esbuild-cli                                                                     | `DRAFT`   |
| 3     | Plan: Adopt Own Configs `$PROJECT/_backlog/4-next/plan-adopt-own-configs/plan.md`                                 | `WORKING` |
| 3     | Plan: Adopt ESM `$PROJECT/_backlog/0-archive/2026-10-10-plan-adopt-esm/plan.md`                                   | `DONE`    |
| 3     | Plan: Adopt Prettier Config `$PROJECT/_backlog/1-done/plan-adopt-prettier-config/plan.md`                         | `DONE`    |
| 3     | Plan: Adopt Tooling Decisions `$PROJECT/_backlog/4-next/plan-adopt-tooling-decisions/plan.md`                     | `DRAFT`   |

## Work

### Next

`Plan: Adopt ESM` is `DONE` — `@noodlestan/tsconfig@0.2.1` ships the `esbuild/`, `vite/`, and `monorepo/` presets, all 47 matrix rows migrated, and all 12 consumer `adopt-esm` branches merged to `main`. `Plan: Adopt Prettier Config` is now `PLANNING` (moved to `3-now`); run **Write Instructions** for it, and run **Plan Iterations** on `Plan: Add Astro Support` to refine its draft iterations.

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

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`.

**Instructions:** (From `$PROJECT/_guide.md`)

Runs automatically on the pre-commit hook, from the `$WORKSPACE` root:

```bash
npm run ci # lint, test and build
```

Milestone-level evidence: both Prettier packages published at `0.0.1`, no `.prettierrc*` outside the config packages, no `extends` on transitional tsconfig presets outside `$PROJECT/configs/tsconfig`, and `npm run ci` green in every adopting checkout.

---

## Coordination

### Not In Scope

- **Astro rollout in apps** — `Plan: Add Astro Support` consumes `@noodlestan/prettier-config-astro`.
- **`.prettierignore` policy** — a shared ignore convention stays open from `Plan: Add Prettier Config`.
- **Consumer feature work** — this milestone changes how configuration is distributed, not what repositories build.

### Evidence

- **Build config owned by consumers** — delivered at `838dfc1`..`afc7bb5`; missing `build.config.mjs` fails loudly, and plain `node` loads the emitted bundle.
- **Prettier packages published and pinned** — both packages released at `0.0.1` (`e6105b9`, `3afa85a`), and the pilot consumer pinned at `2261e07` in `$WEB`.
- **Adoption is provable per repository** — each adoption commit's diff contains only the expected `*.mjs` re-indent, and lint passes afterwards.
- **Presets retired safely** — a final scan finds zero `tsconfig/cli` and `tsconfig/libs` extends outside the package itself.

### Findings

- **Scale of the ESM migration** — the planning scan found 10 packages extending `cli/` across 6 checkouts and 26 packages extending `libs/` across 6 checkouts; the `vite to esbuild migrations` batch is the 8 `libs/tsconfig-vite-node.json` packages that must flip to `NodeNext`.
- **Repository roots are split** — some consumer roots extend `workspace/` while others hardcode their compiler options; all move to `monorepo/`.
- **Scale of the Prettier migration** — the upstream plan recorded 9 consumer repositories plus `$PROJECT` itself; only `$WEB` has adopted.
- **The `*.mjs` re-indent is accepted impact** — proven byte-identical in `$WEB`, but every other repository will see the diff and must treat it as correct output.

### Decisions

- **All repositories adopt Prettier** — inventory decides variant and expected diff, never whether to adopt.
- **ESM adoption is classified per package by its consumers** — Node-consumed packages use the `esbuild/` config; bundler-consumed packages use the `vite/` config, chosen according to consumer build tool.
- **Pilot the `vite to esbuild migrations` batch before rolling it out** — one `libs/` → `esbuild/` migration proves the recipe for the rest.
- **One complete checkout per commit** — every migration commit is independently verifiable and revertable.
- **Configuration ships as versioned packages** — a rule change is a package version, not a multi-repo edit.

### Knowledge to Update

- `$PROJECT/configs/tsconfig/CHANGELOG.md` — `esbuild/` and `vite/` configs added, transitional presets retired.
- `$PROJECT/README.md` — package list and consumer adoption recipes for both config families.

### Follow Ups

- Adopt `@noodlestan/prettier-config-astro` in Astro repositories via `Plan: Add Astro Support`.
- Decide the shared `.prettierignore` convention across repositories.

### Feedback

- None.
