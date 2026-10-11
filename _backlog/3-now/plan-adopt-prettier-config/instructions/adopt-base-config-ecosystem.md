# Instructions: `adopt-base-config-ecosystem`

**Plan:** `adopt-prettier-config`

**Iteration Id:** `adopt-base-config-ecosystem`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-adopt-prettier-config/instructions/adopt-base-config-ecosystem__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `adopt-base-config-ecosystem`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable          | Resolved Path                                                                              | Purpose                                                          |
| ----------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `$WORKSPACE`      | Current working directory                                                                  | Workspace root directory.                                        |
| `$PROJECT`        | `checkouts/workspace-tooling`                                                              | Hosts both config packages and this plan.                        |
| `$PRETTIER`       | `$PROJECT/configs/prettier-config`                                                         | `@noodlestan/prettier-config` — the base rules.                  |
| `$PRETTIER_ASTRO` | `$PROJECT/configs/prettier-config-astro`                                                   | `@noodlestan/prettier-config-astro` — the Astro-augmented rules. |
| `$WEB`            | `$WORKSPACE/checkouts/noodlestan-web`                                                      | Pilot consumer; adoption already proven there.                   |
| `$CHECKOUTS`      | `$WORKSPACE/checkouts`                                                                     | All managed checkouts adopted by this plan.                      |
| `$MATRIX`         | `$PROJECT/_backlog/3-now/plan-adopt-prettier-config/plan-adopt-prettier-config__matrix.md` | The adoption matrix and commit log.                              |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `adopt-base-config-ecosystem`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Replace every repository's hand-written Prettier config with the published `@noodlestan/prettier-config@0.1.0`, and install `@noodlestan/prettier-config-astro@0.1.0` in the one Astro application package that has not adopted it yet (`artificials/apps/art-md-web`). One complete checkout per commit, on `main`, `NOPUSH`.

## Mandatory Reading

::READ `$MATRIX` — the authoritative adoption list, the expected diff per checkout, and the commit log to fill in.

::READ `$PRETTIER/_guide.md` — package layout, rules, and the `prettier` field adoption recipe.

::READ `$PRETTIER_ASTRO/_guide.md` — the Astro-augmented package and its base-package spread.

::READ `$PROJECT/_guide.md` — repository layout and `npm run ci` verification.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` — commit message types, scopes, and format rules.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

## Operating Instructions

### Operating Instructions: Setting Up

**Instructions:**

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies, including the workspace config packages.
npm run ci # to verify the build is green before starting.
```

### Operating Instructions: Writing Commit Message

**Instructions:**

Commit message pattern: `{Type}({Scope}): {Description}.` max 120 chars, optionally followed by up to 3 bullet points, max 100 chars each.

Allowed values for commit Type, Scope, and valid Type–Scope associations are defined in `$WORKSPACE/knowledge/conventions/writing-commit-message.art`, along with examples, and rules.

RULE: Do not invent commit types or scopes or assume a combination is valid. Always read the "Writing Commit Message" guide first.

### Operating Instructions: Verifying Step

**Instructions:**

Run from each adopted checkout root:

```bash
npm run lint # must pass; the diff may contain only the expected *.mjs re-indent.
```

### Operating Instructions: Verifying Completion

**Instructions:**

Runs automatically on the pre-commit hook, from the `$WORKSPACE` root:

```bash
npm run ci # lint, test and build
```

---

## Changes

- Step 1 / 1 — Adopt in every matrix checkout (one commit per checkout)

## Steps

### Step 1 / 1 — Adopt in every matrix checkout

For each `{checkout}` row in `$MATRIX` with status `TODO`, in matrix order, run the **Adoption Workflow** below, then record the outcome in the matrix. One complete checkout per commit.

#### Adoption Workflow — per `{checkout}`

| #   | On                                                                      | Do                                                                                                                                                                                                 | Expected                                                                       |
| --- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 1   | `$CHECKOUTS/{checkout}`                                                 | `npm ci`                                                                                                                                                                                           | clean tree on `main`                                                           |
| 2   | checkout root                                                           | `npm install -D @noodlestan/prettier-config@0.1.0` — installs or updates the dependency, rewriting `package.json` and `package-lock.json`; for `conventions` this updates the existing `0.0.1` dep | dep at `0.1.0`; lock rewritten; both files ride along in the commit            |
| 3   | checkout root                                                           | delete `.prettierrc*`; add `"prettier": "@noodlestan/prettier-config"` to the root `package.json`                                                                                                  | no hand-written config remains                                                 |
| 4   | _only if the checkout has an Astro application package — `artificials`_ | in `apps/art-md-web`: `npm install -D @noodlestan/prettier-config-astro@0.1.0`, and add `"prettier": "@noodlestan/prettier-config-astro"` to its `package.json`                                    | Astro variant installed at the application package, never at the monorepo root |
| 5   | checkout root                                                           | `npm run lint:fix`                                                                                                                                                                                 | passes; diff = only the expected `*.mjs` re-indent (tabs)                      |
| 6   | checkout                                                                | stage every file changed for this checkout and commit with the message below; do **not** push                                                                                                      | `NOPUSH` commit on `main`                                                      |
| 7   | `$MATRIX`                                                               | set the row to `DONE` and record the commit hash in the Commit Log                                                                                                                                 | the matrix edit stays uncommitted for the planner                              |

#### Commit Messages

Standard — every checkout:

```
configs({checkout}): Adopt @noodlestan/prettier-config.

- Replace the hand-written `.prettierrc` with the `prettier` field.
- Add the dependency and apply the `*.mjs` re-indent from `npm run lint:fix`.
```

App-involved — `artificials` only; the same commit also adopts the Astro variant:

```
configs(artificials): Adopt @noodlestan/prettier-config and the Astro variant.

- Replace the root `.prettierrc` with the `prettier` field.
- Set `@noodlestan/prettier-config-astro` in `apps/art-md-web`.
```

RULE: One complete checkout per commit. Do not batch checkouts into a single commit.

RULE: If `npm run lint:fix` produces any change beyond the expected `*.mjs` re-indent, stop and REPORT A BLOCKER with the offending files.

---

## Final Verification

- Verify that commits have been executed and not pushed, according to the `NOPUSH` policy.
- Verify every matrix row is `DONE` and the Commit Log holds a hash for each of the 16 checkouts.
- Verify every checkout root `package.json` carries `"prettier": "@noodlestan/prettier-config"` at `0.1.0` and no `.prettierrc*` remains.
- Verify `artificials/apps/art-md-web/package.json` carries `"prettier": "@noodlestan/prettier-config-astro"`.
- Verify `npm run lint` passes in every adopted checkout.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
