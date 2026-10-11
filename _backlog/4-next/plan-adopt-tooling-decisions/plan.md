# Plan: Adopt Tooling Decisions

**ID:** `adopt-tooling-decisions`

**Status:** `DRAFT`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Every applicable repository advertises and adopts the shared tooling decisions, instead of each one re-deciding them locally.

**Description:** Plan record with 1 iteration spanning every consumer checkout and `Project: Noodlestan Workspace Tooling` itself: apply the first matching adoption rule per repository — create a root `knowledge/index.md` when missing, add the `## Decision Records` paragraph adopting `@noodlestan/tooling-adrs`, drop redundant package-level ADRs, and add package adoption lines pointing at the monorepo index. This plan assumes `Plan: Rename Architecture to Knowledge` has already run and `Plan: Distribute ADRs as a Package` has already published the package; every path in this plan speaks only of `knowledge/`. The single iteration is `DRAFT`.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable             | Resolved Path                            | Purpose                                                               |
| -------------------- | ---------------------------------------- | --------------------------------------------------------------------- |
| `$WORKSPACE`         | Current working directory                | Workspace root directory.                                             |
| `$DOMAINS`           | `$WORKSPACE/.agents/domains`             | Domain resources directory.                                           |
| `$WORKSPACE_TOOLING` | `$WORKSPACE/checkouts/workspace-tooling` | Hosts this plan and the published `@noodlestan/tooling-adrs` package. |
| `$CHECKOUTS`         | `$WORKSPACE/checkouts`                   | Every applicable repository adopting the shared decisions.            |

## Summary

Apply one ordered set of adoption rules to every applicable repository, so each one either hosts the shared decisions by reference or drops the local duplicates. The findings that decide which rule fires per checkout come from `Plan: Distribute ADRs as a Package`.

Scope is every consumer checkout plus this plan's host repository; upstream is the published package and the renamed `knowledge/` directories.

## Attachments

None.

## Context

### Upstream Work

| Kind | Path                                                                               | Role                                                                                                               |
| ---- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Plan | `$WORKSPACE_TOOLING/_backlog/4-next/plan-distribute-adrs-as-a-package/plan.md`     | `DRAFT`; provides the `@noodlestan/tooling-adrs` package and the `./plan__project-migration.md` adoption findings. |
| Plan | `$WORKSPACE_TOOLING/_backlog/4-next/plan-rename-architecture-to-knowledge/plan.md` | `DRAFT`; every repository's ADR directory is already named `knowledge/` before this plan executes.                 |

### Required Skills

- `write-plan` — Generates plans from sources and context. Required for Drafting, Planning.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Planning.

### Domains

| Domain / Path                                         | Description                                                                |
| ----------------------------------------------------- | -------------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md`               | Planning lifecycle for contextualising, drafting, and planning iterations. |
| Domain: Work `$DOMAINS/work/index.md`                 | Work item abstractions, workflows, and operating instructions.             |
| Domain: Repositories `$DOMAINS/repositories/index.md` | Repository records and adoption conventions.                               |
| Domain: Commits `$DOMAINS/commits/index.md`           | Commit blueprint and policy types used when executing this plan.           |

### Resource Kinds in Scope

| Kind       | Domain       | Structure Record Path                             |
| ---------- | ------------ | ------------------------------------------------- |
| Repository | Repositories | `$DOMAINS/repositories/structures/repository.art` |
| Plan       | Plans        | `$DOMAINS/plans/structures/plan.art`              |

### Workflows

| Workflow / Path                                                                | Purpose                                                                       |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Workflow: Planning Work `$DOMAINS/work/workflows/planning-work/workflow.art`   | Create and manage work items, collecting operational instructions.            |
| Workflow: Executing Work `$DOMAINS/work/workflows/executing-work/workflow.art` | Organize work execution to produce completed, verified outcomes and feedback. |

### Workflow Operations

| Workflow / Operation / Path                                                                                               | Purpose                                            |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Planning Work / Contextualizing Work Item `$DOMAINS/work/workflows/planning-work/contextualizing-work-item/operation.art` | Collect upstream sources, scope, and context.      |
| Planning Work / Drafting Work Item `$DOMAINS/work/workflows/planning-work/drafting-work-item/operation.art`               | Generate the work item record and its iterations.  |
| Planning Work / Planning Work Item `$DOMAINS/work/workflows/planning-work/planning-work-item/operation.art`               | Refine iterations, changes, and commit blueprints. |
| Planning Work / Writing Commit Message `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`       | Write standardized commit messages.                |
| Planning Work / Validating Work Item `$DOMAINS/work/workflows/planning-work/validating-work-item/operation.art`           | Check integrity before execution.                  |
| Executing Work / Setting Up `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`                             | Install dependencies in checkouts.                 |
| Executing Work / Executing Work Step `$DOMAINS/work/workflows/executing-work/executing-work-step/operation.art`           | Carry out one iteration's changes.                 |
| Executing Work / Verifying Step `$DOMAINS/work/workflows/executing-work/verifying-step/operation.art`                     | Run lint for one iteration.                        |
| Executing Work / Verifying Completion `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`         | Run the monorepo CI gate before completion.        |

### Knowledge

::READ `$WORKSPACE_TOOLING/_guide.md` (Guide) — Repository layout, records management, and `npm run ci` verification. Relevant for Planning Work Item, Verifying Completion.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Commit types, scopes, and format rules for all iterations in this plan.

## Scope

Changes in every applicable repository: adoption wording added, redundant local ADRs removed, indexes updated. One complete checkout per commit.

### (Scope) Consumer Checkouts: ADR Adoption

**Record:** Each checkout's `_records/repository.art` under `$CHECKOUTS` — the exact set is fixed by `./plan__project-migration.md` from `Plan: Distribute ADRs as a Package`.

**Role:** — Changes required. Every repository advertises adoption of the shared tooling decisions, or drops its local duplicates of them.

**Changes:**

- If the root has no `knowledge/`, create `knowledge/index.md` with a `## ADR` section only.
- If no `knowledge/adr` directory exists, add a `## Decision Records` section stating that the monorepo and every package in it adopt the decisions from `@noodlestan/tooling-adrs`.
- If a package's `knowledge/adr` contains redundant `tooling`, `build`, `distribution`, or `dependencies` decisions, remove them and update the ADR index.
- If a package's `knowledge/index.md` exists and the monorepo's tooling ADRs are relevant for it, add a line under `## Decision Records` stating the package adopts all decisions listed in the monorepo `knowledge/index.md`.
- One complete checkout per commit on `main`; commits are `NOPUSH`.

**Dependencies:**

- `Plan: Distribute ADRs as a Package` — `@noodlestan/tooling-adrs` must exist and the adoption findings must be recorded.
- `Plan: Rename Architecture to Knowledge` — every ADR directory must already be named `knowledge/`, so the rules match the tree they edit.

### (Scope) Project: Noodlestan Workspace Tooling

**Record:** `$WORKSPACE_TOOLING/_records/project.art`

**Role:** — The same adoption rules apply to this plan's host repository. Changes required.

**Partial:**

- `owner` — Project: Noodlestan Management
- `path` — `$WORKSPACE_TOOLING/`

**Changes:**

- Apply the same first-matching rule to this repository's root and its packages.

## Execution Context

Execution is coordinated from `$WORKSPACE`; changes run per checkout on `main`, one complete checkout per commit, with a `NOPUSH` policy.

---

## Items:

| Iteration / Instructions      | Status  |
| ----------------------------- | ------- |
| Iteration: Adopt Tooling ADRs | `DRAFT` |

### Iteration: Adopt Tooling ADRs

**Id:** `adopt-tooling-adrs`

**Status:** `DRAFT`

**Purpose:** Every applicable repository advertises and adopts the shared tooling decisions.

**Description:** In every applicable repository apply the first matching rule: if the root has no `knowledge/`, create one containing `knowledge/index.md` with a `## ADR` section only; if no `knowledge/adr` directory exists, add a `## Decision Records` section stating that the monorepo and every package in it adopt the decisions from `@noodlestan/tooling-adrs`; if a package's `knowledge/adr` contains redundant `tooling`, `build`, `distribution`, or `dependencies` decisions, remove them and update the ADR index; and if a package's `knowledge/index.md` exists and the monorepo's tooling ADRs are relevant to that package, add a line under `## Decision Records` stating that the package adopts all decisions listed in the monorepo `knowledge/index.md`. The rules fire in order, so each repository is edited once.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- If a checkout has no `knowledge/` at the root, create `knowledge/index.md` with a `## ADR` section only.
- If no `knowledge/adr` directory exists, add a `## Decision Records` section stating that the monorepo and every package in it adopt the decisions from `@noodlestan/tooling-adrs`.
- If a package's `knowledge/adr` contains redundant `tooling`, `build`, `distribution`, or `dependencies` decisions, remove them and update the ADR index.
- If a package's `knowledge/index.md` exists and the monorepo's tooling ADRs are relevant for it, add a line under `## Decision Records` stating the package adopts all decisions listed in the monorepo `knowledge/index.md`.
- One complete checkout per commit, on `main`, `NOPUSH`.

**Dependencies:**

- `Plan: Distribute ADRs as a Package` — Iteration: Create ADR Package.
- `Plan: Rename Architecture to Knowledge`.

## Work

### Next

Draft complete. Run **Plan Iterations** to add commit blueprints and move the iteration to `PLANNING`, then **Write Instructions** to generate the self-contained instruction file. Execute after `Plan: Distribute ADRs as a Package` and `Plan: Rename Architecture to Knowledge`.

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

**Instructions:** (From `$WORKSPACE_TOOLING/_guide.md`)

Run from `$WORKSPACE`:

```bash
npm ci # to install dependencies.
```

### Verifying Step

**Purpose:** Verify the changes produced by one iteration. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-step/operation.art`.

**Instructions:** (Per edited checkout)

Run from the checkout root:

```bash
npm run lint # where present; must pass after adoption edits.
```

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`.

**Instructions:** (From `$WORKSPACE_TOOLING/_guide.md`)

Runs automatically on the pre-commit hook, from `$WORKSPACE`:

```bash
npm run ci # lint, test and build
```

---

## Coordination

### Not In Scope

- **Publishing the package** — adoption references `@noodlestan/tooling-adrs` by name; publishing belongs to `Plan: Distribute ADRs as a Package`.
- **Non-tooling decision content** — subject-matter decisions stay in their own repositories.
- **Authoring new consumer ADRs** — packages gain adoption lines; writing their own decision records remains each repository's own work.

### Evidence

- Every applicable repository carries the `## Decision Records` adoption wording, or the root `knowledge/index.md` that hosts it.
- No package-level `knowledge/adr` retains a redundant `tooling`, `build`, `distribution`, or `dependencies` decision.
- Each adoption commit's diff contains only the wording, index, and redundancy changes for one checkout.

### Findings

- None.

### Decisions

- **Adoption applies the first matching rule per repository** — the repository's root state decides the branch, so each checkout is edited once.

### Knowledge to Update

- `$WORKSPACE_TOOLING/_guide.md` — adoption note, if the documented layout changes.

### Follow Ups

- **Publish `0.0.1`** — the install instructions adopted repositories read only resolve after `npm run art-work publish`.

### Feedback

- None.
