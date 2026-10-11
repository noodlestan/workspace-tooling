# Instructions: `rename-architecture-to-knowledge`

**Plan:** `rename-architecture-to-knowledge`

**Iteration Id:** `rename-architecture-to-knowledge`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-rename-architecture-to-knowledge/instructions/rename-architecture-to-knowledge__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `rename-architecture-to-knowledge`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable             | Resolved Path                            | Purpose                                                                         |
| -------------------- | ---------------------------------------- | ------------------------------------------------------------------------------- |
| `$WORKSPACE`         | Current working directory                | Workspace root directory; hosts `.agents` and this run's commits.               |
| `$DOMAINS`           | `$WORKSPACE/.agents/domains`             | Agent context directory holding `architecture/` references to replace.          |
| `$SKILLS`            | `$WORKSPACE/.agents/skills`              | Agent context directory holding `architecture/` references to replace.          |
| `$WORKSPACE_TOOLING` | `$WORKSPACE/checkouts/workspace-tooling` | Hosts this plan; its root `architecture/` directory is the largest rename.      |
| `$CHECKOUTS`         | `$WORKSPACE/checkouts`                   | Every managed repository that contains `architecture/` at root or in a package. |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `rename-architecture-to-knowledge`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Rename every `architecture/` directory to `knowledge/` across all checkouts that have one, rewire every live reference outside the archives, and reword the workspace agent context — one `NOPUSH` commit per checkout, plus one meta-repository commit for `.agents`. This plan runs before the tooling-ADR plans, which address `knowledge/` only.

## Mandatory Reading

::READ `$WORKSPACE_TOOLING/_guide.md` — repository layout, records management, and `npm run ci` verification.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` — commit message types, scopes, and format rules.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

## Operating Instructions

### Operating Instructions: Setting Up

**Instructions:**

Run from `$WORKSPACE`:

```bash
npm ci # to install dependencies.
```

### Operating Instructions: Writing Commit Message

**Instructions:**

Commit message pattern: `{Type}({Scope}): {Description}.` max 120 chars, optionally followed by up to 3 bullet points, max 100 chars each.

Allowed values for commit Type, Scope, and valid Type–Scope associations are defined in `$WORKSPACE/knowledge/conventions/writing-commit-message.art`, along with examples, and rules.

RULE: Do not invent commit types or scopes or assume a combination is valid. Always read the "Writing Commit Message" guide first.

### Operating Instructions: Verifying Step

**Instructions:**

Run from each edited checkout root:

```bash
npm run lint # where present; must pass after renames and reference updates.
```

### Operating Instructions: Verifying Completion

**Instructions:**

Runs automatically on the pre-commit hook, from `$WORKSPACE`:

```bash
npm run ci # lint, test and build
```

---

## Changes

- Step 1 / 3 — Rename in every repository containing `architecture/`
- Step 2 / 3 — Rewire `.agents` in the workspace meta-repository
- Step 3 / 3 — Verify completion

## Steps

### Step 1 / 3 — Rename in every repository containing `architecture/`

For each `{checkout}` in `$CHECKOUTS`, run the **Rename Workflow** below — skip checkouts whose scan finds nothing. `$WORKSPACE_TOOLING` is one of the `{checkout}` targets.

#### Rename Workflow — per `{checkout}`

| #   | On                                             | Do                                                                                            | Expected                                                         |
| --- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 1   | checkout root                                  | scan: `find . -type d -name architecture -not -path '*/node_modules/*' -not -path '*/.git/*'` | directories listed at the root or inside a package; stop if none |
| 2   | each found directory                           | `git mv architecture knowledge`                                                               | git records the rename                                           |
| 3   | root and owning-package `_guide.md`            | replace `architecture/` with `knowledge/`                                                     | guide points at `knowledge/`                                     |
| 4   | `_backlog/`, `_roadmap/`, other live artefacts | replace `architecture/` references with `knowledge/`                                          | zero stale references outside the exempt paths — see RULES below |
| 5   | checkout root                                  | `npm run lint` (where present)                                                                | passes                                                           |
| 6   | checkout                                       | stage everything changed for this checkout and commit with the message below; do **not** push | `NOPUSH` commit on `main`                                        |

#### Commit: `rename-architecture-knowledge`

**Repository:** Each checkout containing `architecture/` (one commit per checkout)

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
renames({checkout}): Rename `architecture/` to `knowledge/`.

- Rename the directory and update the `_guide.md`.
- Update live `_backlog/` and `_roadmap/` references; archives stay verbatim.
```

RULE: One complete checkout per commit. Do not batch checkouts into a single commit.

RULE: Documents under `_backlog/0-archive/` and `_backlog/1-done/` keep their historical `architecture/` references verbatim — never edit them. The same exemption applies to this plan's own directory, `plan-rename-architecture-to-knowledge/`, which records the rename itself; leave its files untouched.

RULE: If a reference cannot be reworded safely — for example, a verbatim quote of historical content outside the exempt paths — stop and REPORT A BLOCKER with the offending file.

### Step 2 / 3 — Rewire `.agents` in the workspace meta-repository

1. Scan `$DOMAINS` and `$SKILLS` for `architecture/` and replace each reference with `knowledge/`.
2. Replace the phrase `architecture reference` with `knowledge base` in both directories.
3. Re-scan both directories: zero `architecture/` references and zero occurrences of `architecture reference` remain.

#### Commit: `rename-architecture-agents`

**Repository:** Noodlestan Workspace (meta-repository)

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
renames(rename-architecture-to-knowledge): Point `.agents` at `knowledge/`.

- Replace `architecture/` references with `knowledge/` in domains and skills.
- Replace `architecture reference` with `knowledge base`.
```

1. Stage the changed files under `$WORKSPACE/.agents`.
2. Commit with the message above. Do not push.

### Step 3 / 3 — Verify completion

- Confirm no `architecture/` directory remains at any repository root or package under `$CHECKOUTS` (outside `node_modules` and the exempt archive paths).
- Confirm `$DOMAINS` and `$SKILLS` hold no `architecture/` references and no phrase `architecture reference`.
- Confirm every affected `_guide.md` points at `knowledge/`, and no live artefact under `_backlog/` or `_roadmap/` outside the exemptions references `architecture/`.
- Confirm one `NOPUSH` commit exists per renamed checkout, plus the `.agents` commit in the meta-repository.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.

---

## Final Verification

- Verify that commits have been executed and not pushed, according to the `NOPUSH` policy.
- Verify every renamed checkout committed its complete rename — directory, guides, and live references — in one commit.
- Verify archives under `0-archive` and `1-done`, and this plan's own directory, are byte-for-byte untouched.
- Verify the meta-repository commit covers only `$WORKSPACE/.agents/domains` and `$WORKSPACE/.agents/skills`.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
