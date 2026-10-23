# Plan: Support for multi builds in esbuild-cli

**Id:** `add-esbuild-cli-multi-build`

**Status:** `DRAFT`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Support building different targets from within a package.

**Description:** Refactor esbuild-cli config and runner (both watch and build entry points) so that instead of supporting exactly one 'esm' and one 'cjs' build, it supports a list of targets.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path                            | Purpose                                                  |
| ------------ | ---------------------------------------- | -------------------------------------------------------- |
| `$WORKSPACE` | Current working directory                | Workspace root directory.                                |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains`             | Domain resources directory.                              |
| `$ROOT`      | `$WORKSPACE/checkouts/workspace-tooling` | Monorepo root hosting this plan and the config packages. |
| `$PROJECT`   | `$ROOT`                                  | Workspace tooling project.                               |

## Summary

Refactor `@noodlestan/esbuild` to support multiple build targets. Update config loading, build/watch runners, and documentation to use a `targets` array (while maintaining backward compatibility where reasonable), and update the design knowledge to match.

## Context

### Upstream Work

| Kind      | Path                                                      | Role                                                                     |
| --------- | --------------------------------------------------------- | ------------------------------------------------------------------------ |
| Milestone | `$ROOT/_roadmap/3-now/milestone-tooling-one/milestone.md` | Coordinates tooling configuration work across the ecosystem.             |
| ADR       | `$ROOT/knowledge/adr/build-model.md`                      | Build toolchain decisions behind the externalised build config contract. |
| ADR       | `$ROOT/knowledge/adr/distribution.md`                     | Distribution decisions for Node-compatible outputs.                      |

### Required Skills

- `write-plan` — Generates plans from sources and context.
- `render-template` — Renders plan and instruction artefacts.

### Domains

| Domain / Path                           | Description                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md` | Planning lifecycle for contextualising, drafting, planning, and integrating plans. |
| Domain: Work `$DOMAINS/work/index.md`   | Work item abstractions, workflows, and operating instructions.                     |

### Resource Kinds in Scope

| Kind    | Domain   | Structure Record Path                      |
| ------- | -------- | ------------------------------------------ |
| Project | Projects | `$DOMAINS/projects/structures/project.art` |
| Package | Packages | `$DOMAINS/packages/structures/package.art` |
| Plan    | Plans    | `$DOMAINS/plans/structures/plan.art`       |

### Workflows

| Workflow / Path                                                                | Purpose                                                                       |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Workflow: Planning Work `$DOMAINS/work/workflows/planning-work/workflow.art`   | Create and manage work items lifecycle.                                       |
| Workflow: Executing Work `$DOMAINS/work/workflows/executing-work/workflow.art` | Organize work execution to produce completed, verified outcomes and feedback. |

### Workflow Operations

| Workflow / Operation / Path                                                                                               | Purpose                                            |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Planning Work / Contextualizing Work Item `$DOMAINS/work/workflows/planning-work/contextualizing-work-item/operation.art` | Collect upstream sources, scope, and context.      |
| Planning Work / Planning Work Item `$DOMAINS/work/workflows/planning-work/planning-work-item/operation.art`               | Refine iterations, changes, and commit blueprints. |
| Planning Work / Validating Work Item `$DOMAINS/work/workflows/planning-work/validating-work-item/operation.art`           | Check integrity before execution.                  |
| Executing Work / Setting Up `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`                             | Install dependencies.                              |
| Executing Work / Executing Work Step `$DOMAINS/work/workflows/executing-work/executing-work-step/operation.art`           | Carry out changes.                                 |
| Executing Work / Verifying Step `$DOMAINS/work/workflows/executing-work/verifying-step/operation.art`                     | Run lint/tests.                                    |
| Executing Work / Verifying Completion `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`         | Run the monorepo CI gate before completion.        |

### Knowledge

::READ `$ROOT/cli/esbuild-cli/README.md` (Guide) — Current API and usage patterns.
::READ `$ROOT/cli/esbuild-cli/_guide.md` (Guide) — Package overview and conventions.
::READ `$ROOT/knowledge/design/build.md` (Guide) — Build design (to be updated).
::READ `$ROOT/cli/esbuild-cli/src/helpers/loadConfig.mjs` (Source) — Current config loading logic.
::READ `$ROOT/cli/esbuild-cli/bin/build.mjs` (Source) — Build entry point.
::READ `$ROOT/cli/esbuild-cli/bin/watch.mjs` (Source) — Watch entry point.

## Scope

### (Scope) Package: ESBuild CLI

**Record:** `$ROOT/cli/esbuild-cli/_records/package.art`

**Role:** — Package to be modified.

**Partial:**

- `owner` — Project: Noodlestan Workspace Tooling
- `path` — `$ROOT/cli/esbuild-cli/`

**Changes:**

- Refactor config loading to support a list of targets (e.g., `targets` array) with per-target configuration, while maintaining backward compatibility for `cjs`/`esm` keys if possible.
- Refactor build and watch entry points to iterate over all configured targets.
- Update build logic to handle arbitrary targets.
- Update README and design docs.
- Ensure plugins and existing behavior remain compatible where possible.

### (Scope) Knowledge: Design

**Record:** `$ROOT/knowledge/design/build.md`

**Role:** — Update to reflect multi-target support.

**Changes:**

- Update command surface, config contract, and execution model to describe multiple targets.

## Work

### Next

Create implementation plan iterations for the refactoring work.

### Blockers

None.

## Coordination

### Not In Scope

- Breaking changes to plugin APIs unless strictly necessary.
- Major restructuring beyond what's needed for multi-target support.

### Evidence

- Existing build/watch logic reviewed.
- Config loading structure understood.

### Findings

- Current implementation hardcodes `cjs` and `esm` keys.
- Need to generalize to support arbitrary targets.

### Decisions

- Support both `targets` array and legacy `cjs`/`esm` for backward compatibility.

### Knowledge to Update

- `$ROOT/knowledge/design/build.md` — updated to reflect multi-target model.

### Follow Ups

None.

### Feedback

None.
