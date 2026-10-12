# Plan: Rename Architecture to Knowledge

**ID:** `rename-architecture-to-knowledge`

**Status:** `DONE`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Rehome ADR directories under `knowledge/` everywhere, so `architecture` stops meaning only decision records.

**Description:** Plan record with 1 iteration spanning every repository that contains an `architecture/` directory at the root or in a package, plus the workspace agent context: rename each directory to `knowledge/`, update the affected `_guide.md` files, rewrite every live `architecture/` reference under `_backlog/` and `_roadmap/` except documents under `0-archive` and `1-done`, and in `$WORKSPACE/.agents` replace `architecture/` references with `knowledge/` and the phrase `architecture reference` with `knowledge base`. This plan runs before `Plan: Distribute ADRs as a Package` and `Plan: Adopt Tooling Decisions`, so every downstream plan speaks only of `knowledge/`. The single iteration is `DRAFT`.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable             | Resolved Path                            | Purpose                                                                         |
| -------------------- | ---------------------------------------- | ------------------------------------------------------------------------------- |
| `$WORKSPACE`         | Current working directory                | Workspace root directory.                                                       |
| `$DOMAINS`           | `$WORKSPACE/.agents/domains`             | Agent context directory holding `architecture/` references to replace.          |
| `$SKILLS`            | `$WORKSPACE/.agents/skills`              | Agent context directory holding `architecture/` references to replace.          |
| `$WORKSPACE_TOOLING` | `$WORKSPACE/checkouts/workspace-tooling` | Hosts this plan; its root `architecture/` directory is the largest rename.      |
| `$CHECKOUTS`         | `$WORKSPACE/checkouts`                   | Every managed repository that contains `architecture/` at root or in a package. |

## Summary

Rename every `architecture/` directory to `knowledge/` across all checkouts and rewire every live reference — guides, plans, milestones, attachments, and the workspace agent context — while archives keep their historical wording untouched.

Scope is every checkout containing `architecture/`, this plan's host repository, and `$WORKSPACE/.agents`; upstream is none — this plan runs first, before the tooling-ADR plans.

## Attachments

None.

## Context

### Upstream Work

| Kind | Path                                                                                                                                             | Role                                                                                |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| ADRs | `$WORKSPACE_TOOLING/architecture/`                                                                                                               | The directory renamed by this plan; every other rename follows the same rule.       |
| ADRs | `$CHECKOUTS/art-work/cli/work/architecture/adr`, `$CHECKOUTS/art-md/cli/bin/architecture/adr`, `$CHECKOUTS/conventions/architecture/records/adr` | Sibling corpora renamed by the same rule, so downstream scans address `knowledge/`. |

### Required Skills

- `write-plan` — Generates plans from sources and context. Required for Drafting, Planning.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Planning.

### Domains

| Domain / Path                                         | Description                                                                |
| ----------------------------------------------------- | -------------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md`               | Planning lifecycle for contextualising, drafting, and planning iterations. |
| Domain: Work `$DOMAINS/work/index.md`                 | Work item abstractions, workflows, and operating instructions.             |
| Domain: Repositories `$DOMAINS/repositories/index.md` | Repository records and layout conventions.                                 |
| Domain: Commits `$DOMAINS/commits/index.md`           | Commit blueprint and policy types used when executing this plan.           |

### Resource Kinds in Scope

| Kind       | Domain       | Structure Record Path                             |
| ---------- | ------------ | ------------------------------------------------- |
| Repository | Repositories | `$DOMAINS/repositories/structures/repository.art` |
| Project    | Projects     | `$DOMAINS/projects/structures/project.art`        |
| Workspace  | Workspaces   | `$DOMAINS/workspaces/structures/workspace.art`    |
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
| Executing Work / Setting Up `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`                             | Install dependencies in the workspace.             |
| Executing Work / Executing Work Step `$DOMAINS/work/workflows/executing-work/executing-work-step/operation.art`           | Carry out one iteration's changes.                 |
| Executing Work / Verifying Step `$DOMAINS/work/workflows/executing-work/verifying-step/operation.art`                     | Run lint for one iteration.                        |
| Executing Work / Verifying Completion `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`         | Run the monorepo CI gate before completion.        |

### Knowledge

::READ `$WORKSPACE_TOOLING/_guide.md` (Guide) — Repository layout, records management, and `npm run ci` verification. Relevant for Planning Work Item, Verifying Completion.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Commit types, scopes, and format rules for all iterations in this plan.

## Scope

Changes in every repository that contains an `architecture/` directory, and in the workspace agent context. One complete checkout per commit.

### (Scope) Project: Noodlestan Workspace Tooling

**Record:** `$WORKSPACE_TOOLING/_records/project.art`

**Role:** — Hosts this plan; its root `architecture/` directory is renamed and its live references rewired. Changes required.

**Partial:**

- `owner` — Project: Noodlestan Management
- `path` — `$WORKSPACE_TOOLING/`

**Changes:**

- Rename the root `architecture/` directory to `knowledge/` and update `$WORKSPACE_TOOLING/_guide.md`.
- Update every live `architecture/` reference under `_backlog/` and `_roadmap/` except documents under `0-archive` and `1-done`.

### (Scope) Workspace: Agent Context

**Record:** `$WORKSPACE/_records/workspace.art`

**Role:** — Holds `.agents` context files that reference `architecture/`. Changes required.

**Changes:**

- In `$DOMAINS` and `$SKILLS`, replace references to `architecture/` with `knowledge/`, and `architecture reference` with `knowledge base`.

### (Scope) Consumer Checkouts: Directory Rename

**Record:** Each checkout's `_records/repository.art` under `$CHECKOUTS` containing `architecture/` at the root or in a package.

**Role:** — Changes required. Rename the directory and rewire live references.

**Changes:**

- Rename each `architecture/` directory to `knowledge/` and update the repository or package `_guide.md`.
- Update every live `architecture/` reference under `_backlog/` and `_roadmap/` except documents under `0-archive` and `1-done`.
- One complete checkout per commit on `main`; commits are `NOPUSH`.

**Dependencies:**

- None — this plan runs before `Plan: Distribute ADRs as a Package` and `Plan: Adopt Tooling Decisions`.

## Execution Context

Execution is coordinated from `$WORKSPACE`; changes run per checkout on `main`, one complete checkout per commit, with a `NOPUSH` policy. The `.agents` changes land as their own commit in the workspace meta-repository.

---

## Items:

| Iteration / Instructions                    | Status |
| ------------------------------------------- | ------ |
| Iteration: Rename Architecture to Knowledge | `DONE` |

### Iteration: Rename Architecture to Knowledge

**Id:** `rename-architecture-to-knowledge`

**Status:** `DONE`

**Report:** `./plan-rename-architecture-to-knowledge/instructions/rename-architecture-to-knowledge__report.md`

**Delegations:**

| Timestamp  | Worker         | Instructions                                                                               | Mode          | Status |
| ---------- | -------------- | ------------------------------------------------------------------------------------------ | ------------- | ------ |
| 2026-10-12 | `agent-worker` | `./plan-rename-architecture-to-knowledge/instructions/rename-architecture-to-knowledge.md` | `interactive` | `DONE` |

**Purpose:** Rehome ADR directories under `knowledge/` everywhere, so `architecture` stops meaning only decision records.

**Description:** In every repository that contains `architecture/` at the root or in a package: rename the directory to `knowledge/`, update the `_guide.md`, and update every `architecture/` reference in plans, milestones, attachments, and other artefacts under `_backlog/` and `_roadmap/` — except documents under `0-archive` and `1-done`. In `$DOMAINS` and `$SKILLS`, replace `architecture/` references with `knowledge/` and the phrase `architecture reference` with `knowledge base`.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Scan every repository under `$CHECKOUTS` plus `$WORKSPACE_TOOLING` for `architecture/` at the root and inside packages; rename each directory to `knowledge/` and update the repository or package `_guide.md`.
- Scan `_backlog/`, `_roadmap/`, and other live artefacts for `architecture/` references and update all except documents under `0-archive` and `1-done`.
- In `$DOMAINS` and `$SKILLS`, replace `architecture/` with `knowledge/`, and `architecture reference` with `knowledge base`.
- One complete checkout per commit, on `main`, `NOPUSH`; the `.agents` changes land as one commit in the workspace meta-repository.

**Commits:**

| ID                              | Repository / Checkout / Branch                   | Policy   | Hash                            | Status      |
| ------------------------------- | ------------------------------------------------ | -------- | ------------------------------- | ----------- |
| `rename-architecture-knowledge` | Each checkout / `$CHECKOUTS/{checkout}` / `main` | `NOPUSH` | 10 commits — see Commit section | `COMMITTED` |
| `rename-architecture-agents`    | Workspace / `$WORKSPACE` / `main`                | `NOPUSH` | `5e6d3a3`                       | `COMMITTED` |

##### Commit: `rename-architecture-knowledge`

**Repository:** Each checkout containing `architecture/` (one commit per checkout)

**Status:** `COMMITTED` — not pushed, per `NOPUSH`. One commit per renamed checkout:

| Checkout            | Hash      |
| ------------------- | --------- |
| `art-domains`       | `1d0e30b` |
| `art-js`            | `7b6374f` |
| `art-lib`           | `e319623` |
| `art-md`            | `2895f8b` |
| `art-work`          | `4064600` |
| `conventions`       | `53ac891` |
| `no-comply`         | `117522d` |
| `noodlestan-web`    | `a0c33a0` |
| `ops`               | `608ebc3` |
| `workspace-tooling` | `8fb557c` |

**Message:**

```
renames({checkout}): Rename `architecture/` to `knowledge/`.

- Rename the directory and update the `_guide.md`.
- Update live `_backlog/` and `_roadmap/` references; archives stay verbatim.
```

##### Commit: `rename-architecture-agents`

**Repository:** Noodlestan Workspace (meta-repository)

**Status:** `COMMITTED` — not pushed, per `NOPUSH`. Hash: `5e6d3a3`.

**Message:**

```
renames(rename-architecture-to-knowledge): Point `.agents` at `knowledge/`.

- Replace `architecture/` references with `knowledge/` in domains and skills.
- Replace `architecture reference` with `knowledge base`.
```

**Dependencies:**

- None.

## Work

### Next

- None — the plan is `DONE`. Downstream work continues in `Plan: Distribute ADRs as a Package` and `Plan: Adopt Tooling Decisions`, which now address `knowledge/` only.

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
npm run lint # where present; must pass after renames and reference updates.
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

- **Archive rewriting** — documents under `_backlog/0-archive`, `_backlog/1-done`, and sibling archives keep their historical `architecture/` references verbatim.
- **Decision content** — no ADR text is rewritten here; rewording belongs to `Plan: Distribute ADRs as a Package`.
- **Adoption wording** — the `## Decision Records` sections belong to `Plan: Adopt Tooling Decisions`.

### Evidence

- No `architecture/` directory remains at any repository root or package.
- `$DOMAINS` and `$SKILLS` hold no `architecture/` references and no occurrence of the phrase `architecture reference`.
- Every affected `_guide.md` points at `knowledge/`, and no live artefact under `_backlog/` or `_roadmap/` outside the archives references `architecture/`.
- Delivered: 10 checkouts renamed (44 directories via `git mv`), 11 `NOPUSH` commits on `main`, none pushed; every repository sits 1 commit ahead of `origin/main`.
- Per-checkout `npm run lint` and workspace `npm run ci` pass; archives (`0-archive`, `1-done`) and this plan's own directory were untouched in every commit.
- Worker report: `./plan-rename-architecture-to-knowledge/instructions/rename-architecture-to-knowledge__report.md`.

### Findings

- None.

### Decisions

- **Archives are exempt from reference rewrites** — history stays verbatim so past plans remain readable.
- **The rename runs first** — downstream plans address `knowledge/` only, so no plan carries pre-rename paths.

### Knowledge to Update

- `$WORKSPACE_TOOLING/_guide.md` — path references to the renamed directory.
- `$WORKSPACE/.agents/domains` and `$WORKSPACE/.agents/skills` — `knowledge/` and `knowledge base` wording.

### Follow Ups

- None.

### Feedback

Worker judgment calls worth noting (full detail in the report):

- `art-md` — two live CHANGELOG release bullets referenced `architecture/api.md`; reworded to `knowledge/api.md` since they sit outside the exempt archive paths. Flag if historical release notes should stay verbatim.
- `.agents` — two illustrative examples could not be replaced literally (`instructions.tart` had a doubly-nested `knowledge/architecture/` path; `compose-work-context.art` had `architecture/` beside `knowledge/` — duplicate removed).
- `.agents` — "an architecture reference" → "a knowledge base", with the article adjusted to "a" for grammar.
- `noodlestan-web` — the prose "does not maintain a dedicated architecture reference" in `apps/noodlestan-web/_guide.md` was left as-is: not a path reference, and the phrase replacement is mandated only for `.agents`.
- Stale `node_modules` in `art-js`, `art-lib`, `no-comply`, and `workspace-tooling` broke pre-commit CI hooks; each repaired with `npm ci` in the checkout. No `--no-verify` used, no lockfile modified.
