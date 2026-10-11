# Plan: Distribute ADRs as a Package

**ID:** `distribute-adrs-as-a-package`

**Status:** `DRAFT`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Tooling ADRs live buried in individual repositories, so no project outside their host repository can discover or adopt them.

**Description:** Plan record with 3 iterations spanning the ADR corpus of `Project: Noodlestan Workspace Tooling` and a new `Package: Tooling ADRs`: classify every decision as consumer-facing, internal, or split; scaffold `@noodlestan/tooling-adrs` with README usage and install instructions while reducing this repository's own ADRs to an internal minimum; and audit every checkout's `knowledge/` footprint. This plan assumes `Plan: Rename Architecture to Knowledge` has already run — every ADR directory is already named `knowledge/`, and every path in this plan speaks only of `knowledge/`. Adoption lives in `Plan: Adopt Tooling Decisions`. All iterations are `DRAFT`.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable             | Resolved Path                             | Purpose                                                     |
| -------------------- | ----------------------------------------- | ----------------------------------------------------------- |
| `$WORKSPACE`         | Current working directory                 | Workspace root directory.                                   |
| `$DOMAINS`           | `$WORKSPACE/.agents/domains`              | Domain resources directory.                                 |
| `$WORKSPACE_TOOLING` | `$WORKSPACE/checkouts/workspace-tooling`  | Hosts this plan, the ADR corpus, and the new package.       |
| `$CHECKOUTS`         | `$WORKSPACE/checkouts`                    | All managed checkouts scanned by the audit.                 |
| `$CONVENTIONS`       | `$WORKSPACE/checkouts/conventions`        | Package scaffold source and one of the ADR corpora scanned. |
| `$ADRS`              | `$WORKSPACE_TOOLING/knowledge/adr`        | The ADR groups to classify and reduce.                      |
| `$PACKAGE`           | `$WORKSPACE_TOOLING/configs/tooling-adrs` | The planned `@noodlestan/tooling-adrs` package.             |

## Summary

Classify each tooling ADR decision as consumer-facing, internal, or a split, then publish the consumer-facing ones as `@noodlestan/tooling-adrs` while this repository keeps only its internal decisions. Audit every checkout's `knowledge/` footprint so adoption has a per-repository migration map.

Scope is `Project: Noodlestan Workspace Tooling` and the new package; upstream is the ADR corpora in this plan's host repository and in three sibling repositories, all already living under `knowledge/`.

## Attachments

- `./plan__adr-classification.md` (Planned) — decision-by-decision mapping produced by Iteration: Classify Decisions.
- `./plan__project-migration.md` (Planned) — per-checkout `knowledge/` findings from Iteration: Audit Project ADRs.

## Context

### Upstream Work

| Kind      | Path                                                                                                                                    | Role                                                                                                                                                            |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Milestone | `$WORKSPACE_TOOLING/_roadmap/3-now/milestone-tooling-one/milestone.md`                                                                  | Carries the `Distribute Tooling Decisions` placeholder this plan fills; its `Adopt Tooling Decisions` placeholder is filled by `Plan: Adopt Tooling Decisions`. |
| ADRs      | `$ADRS`                                                                                                                                 | The decisions classified, published, and reduced by this plan.                                                                                                  |
| ADRs      | `$CHECKOUTS/art-work/cli/work/knowledge/adr`, `$CHECKOUTS/art-md/cli/bin/knowledge/adr`, `$CHECKOUTS/conventions/knowledge/records/adr` | How sibling repositories already group their ADRs — inputs to Classify Decisions.                                                                               |

### Required Skills

- `write-plan` — Generates plans from sources and context. Required for Drafting, Planning.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Planning.

### Domains

| Domain / Path                                 | Description                                                                |
| --------------------------------------------- | -------------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md`       | Planning lifecycle for contextualising, drafting, and planning iterations. |
| Domain: Work `$DOMAINS/work/index.md`         | Work item abstractions, workflows, and operating instructions.             |
| Domain: Packages `$DOMAINS/packages/index.md` | Package, script, dependency, and NPM deployment structures.                |
| Domain: Commits `$DOMAINS/commits/index.md`   | Commit blueprint and policy types used when executing this plan.           |

### Resource Kinds in Scope

| Kind    | Domain   | Structure Record Path                      |
| ------- | -------- | ------------------------------------------ |
| Project | Projects | `$DOMAINS/projects/structures/project.art` |
| Package | Packages | `$DOMAINS/packages/structures/package.art` |
| Plan    | Plans    | `$DOMAINS/plans/structures/plan.art`       |

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
| Executing Work / Verifying Step `$DOMAINS/work/workflows/executing-work/verifying-step/operation.art`                     | Run package lint and test for one iteration.       |
| Executing Work / Verifying Completion `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`         | Run the monorepo CI gate before completion.        |

### Knowledge

::READ `$ADRS/distribution.md` (ADR) — Distribution decisions, one of the groups expected to feed the consumer-facing package. Relevant for Planning Work Item, Executing Work Step.

::READ `$ADRS/shared-config.md` (ADR) — Shared config decisions covering the rules consumers inherit. Relevant for Planning Work Item, Executing Work Step.

::READ `$ADRS/build-model.md` (ADR) — Build model decisions mixing wrapper internals with the consumer config contract. Relevant for Planning Work Item, Executing Work Step.

::READ `$WORKSPACE_TOOLING/_guide.md` (Guide) — Repository layout, records management, and `npm run ci` verification. Relevant for Planning Work Item, Verifying Completion.

::READ `$CONVENTIONS/packages/typescript` (Scaffold) — The package layout copied for `Package: Tooling ADRs`. Relevant for Executing Work Step.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Commit types, scopes, and format rules for all iterations in this plan.

## Scope

Changes in 1 config package created and reduced: decisions are classified, then published as a package, while checkouts are scanned read-only to feed `Plan: Adopt Tooling Decisions`.

### (Scope) Project: Noodlestan Workspace Tooling

**Record:** `$WORKSPACE_TOOLING/_records/project.art`

**Role:** — Owns the ADR corpus, hosts the new package and this plan. Changes required.

**Partial:**

- `owner` — Project: Noodlestan Management
- `path` — `$WORKSPACE_TOOLING/`
- `resources` — includes the planned Package: Tooling ADRs

**Changes:**

- Publish the consumer-facing decisions as `Package: Tooling ADRs`, and reduce `$ADRS` to the internal minimum (Iteration: Create ADR Package).

### (Scope) Package: Tooling ADRs (Planned)

**Record:** `$PACKAGE/_records/package.art` (planned)

**Role:** — Publishes the consumer-facing tooling decisions as `@noodlestan/tooling-adrs`. Changes required.

**Partial:**

- `owner` — Project: Noodlestan Workspace Tooling
- `path` — `configs/tooling-adrs/`
- `canonicalName` — `@noodlestan/tooling-adrs`

**Changes:**

- Scaffold from `$CONVENTIONS/packages/typescript` with every convention-specific mention removed.
- Create the consumer ADRs grouped per the classification attachment, the package index, a minimal `_guide.md`, the `0.0.1` `CHANGELOG.md`, and a minimal `README.md` with usage and install instructions.
- Ship the ADRs alongside `README.md` and `LICENSE` through the `files` allow-list in `package.json`.

**Dependencies:**

- None — `Plan: Rename Architecture to Knowledge` must have renamed `$ADRS` before this plan executes.

## Execution Context

Execution is coordinated from `$WORKSPACE`. Classification and audit run as read-only worker delegations producing plan attachments, which stay uncommitted for the planner; package work runs in `$WORKSPACE_TOOLING`.

---

## Items:

| Iteration / Instructions      | Status  |
| ----------------------------- | ------- |
| Iteration: Classify Decisions | `DRAFT` |
| Iteration: Create ADR Package | `DRAFT` |
| Iteration: Audit Project ADRs | `DRAFT` |

### Iteration: Classify Decisions

**Id:** `classify-decisions`

**Status:** `DRAFT`

**Purpose:** Decide, decision by decision, what becomes a public consumer-facing ADR, what stays internal, and what must be split.

**Description:** A worker first scans `$CHECKOUTS/art-work/cli/work/knowledge/adr`, `$CHECKOUTS/art-md/cli/bin/knowledge/adr`, and `$CHECKOUTS/conventions/knowledge/records/adr` to understand how repositories currently classify their ADRs — art-work, for example, groups related decisions under `distribution`. Then, for each group in `$ADRS` and each decision within it, the worker classifies the decision as one of: applies to consumers; can apply to consumers after rewording, retitling, or regrouping; must be split into a consumer side and a tooling side; or applies only to tooling. The result is recorded in the classification attachment.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Scan the three sibling ADR corpora and summarise their grouping conventions.
- For every group in `$ADRS`, and every decision in each group, choose one classification: applies to consumers / can apply to consumers (needs rewording, retitle, or regroup) / must be split into consumer side and tooling side / applies only to tooling.
- Write `./plan__adr-classification.md` with one row per decision and the columns: `original group`, `original name`, `consumer?`, `consumer group`, `consumer name`, `internal?`, `internal group`, `internal name`.
- Expected consumer groups are `distribution`, `tooling`, and `dependencies`; propose another group when a decision does not fit any of the three.
- Leave the attachment uncommitted for the planner.

**Dependencies:**

- None.

### Iteration: Create ADR Package

**Id:** `create-adr-package`

**Status:** `DRAFT`

**Purpose:** Ship the consumer-facing decisions as an installable package, and reduce this repository's own ADRs to the internal minimum.

**Description:** Scaffold `$PACKAGE` by copying `$CONVENTIONS/packages/typescript` and removing every convention-specific mention. Generate the consumer ADRs grouped per the classification attachment, create the package index, a minimal `_guide.md`, the `0.0.1` `CHANGELOG.md`, and a minimal `README.md` with usage and install instructions, and make `package.json` publish the ADR files along with `README` and `LICENSE`. Then reduce `$ADRS` to a minimum: only internal decisions remain, reworded where the split requires it — that may leave as few as two files.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Copy `$CONVENTIONS/packages/typescript` to `$PACKAGE`, stripping all convention-specific content from every file.
- Create the consumer-facing ADRs, grouped per `./plan__adr-classification.md`.
- Create the consumer package index and a minimal `_guide.md`.
- Create `$PACKAGE/CHANGELOG.md` with the `0.0.1` entry.
- Create a minimal `$PACKAGE/README.md` with usage and install instructions.
- Ensure `package.json` `files` publishes the ADR files together with `README` and `LICENSE`.
- Reduce `$ADRS` to the internal decisions only, rewording where necessary; this may leave just a few files.
- Run `npm run lint` and `npm run ci` in `$WORKSPACE_TOOLING`.

**Dependencies:**

- Iteration: Classify Decisions.

### Iteration: Audit Project ADRs

**Id:** `audit-project-adrs`

**Status:** `DRAFT`

**Purpose:** Establish which repositories already host decision records and which must start hosting them, feeding adoption.

**Description:** Scan every checkout for `knowledge/` at the repository root and `knowledge/` inside packages; read the monorepo- and package-level ADRs relevant to `tooling`, `dependencies`, `build`, and `distribution`; and write the findings to the project-migration attachment for `Plan: Adopt Tooling Decisions`. A monorepo without a root `knowledge/` is a finding, not an exclusion: it must start having one so that it can host and advertise the tooling ADRs.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Scan every checkout under `$CHECKOUTS` for `knowledge/` at the root and for `knowledge/` inside packages.
- Read the monorepo- and package-level ADRs relevant to `tooling`, `dependencies`, `build`, and `distribution`.
- Write `./plan__project-migration.md` with per-checkout findings: what exists, what is redundant against the shared package, and what must be created; the attachment feeds `Plan: Adopt Tooling Decisions`.
- Record every monorepo lacking a root `knowledge/` as needing one, so it can host and advertise the tooling ADRs.
- Leave the attachment uncommitted for the planner.

**Dependencies:**

- None.

## Work

### Next

Draft complete. Run **Plan Iterations** to add commit blueprints and move the iterations to `PLANNING`, then **Write Instructions** to generate the three self-contained instruction files. Execute in order: classify the decisions, create the package, audit the checkouts. The directory rename and the ecosystem adoption live in their own plans.

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
npm run ci # to verify the build is green before starting.
```

### Verifying Step

**Purpose:** Verify the changes produced by one iteration. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-step/operation.art`.

**Instructions:** (From `$WORKSPACE_TOOLING/_guide.md`)

Run from `$WORKSPACE_TOOLING`:

```bash
npm run lint # prettier and eslint issues.
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

- **Non-tooling decision content** — subject-matter decisions (features, products, components) stay in their own repositories; only shared tooling, build, distribution, and dependency decisions are redistributed.
- **Authoring new consumer ADRs** — packages gain adoption lines in `Plan: Adopt Tooling Decisions`; writing their own decision records remains each repository's own work.
- **Directory renames and ecosystem adoption** — delivered by `Plan: Rename Architecture to Knowledge` and `Plan: Adopt Tooling Decisions`.

### Evidence

- Every decision in `$ADRS` has exactly one row in the classification attachment, mapped to a consumer target, an internal target, or both.
- `@noodlestan/tooling-adrs` installs with its ADRs, index, `_guide.md`, `CHANGELOG.md`, README, and LICENSE shipped by the `files` allow-list.
- `$ADRS` holds only internal decisions after the reduction.

### Findings

- None.

### Decisions

- **The package lives in `configs/`** — the existing `configs/*` workspace glob already covers it; no root manifest change is needed.
- **Classification precedes the package** — `./plan__adr-classification.md` is the single source for the consumer rewrite.

### Knowledge to Update

- `$ADRS/` — reduced to the internal minimum by Iteration: Create ADR Package.
- `$WORKSPACE_TOOLING/_guide.md` — list the new package once it exists.
- `$PACKAGE/README.md`, `$PACKAGE/_guide.md`, `$PACKAGE/CHANGELOG.md` — created by Iteration: Create ADR Package.

### Follow Ups

- **Publish `0.0.1`** — the README's install instructions only resolve after `npm run art-work publish`; publishing is deliberately not part of these iterations.

### Feedback

- None.
