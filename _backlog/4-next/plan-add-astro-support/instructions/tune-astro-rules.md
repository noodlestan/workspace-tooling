# Instructions: `tune-astro-rules`

**Plan:** `add-astro-support`

**Iteration Id:** `tune-astro-rules`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

RULE: Never commit an `.astro` file in `$WEB` to silence a rule that the shared config should express. Config gaps are fixed in `$PKG_ESLINT` and committed there; project defects are fixed in `$WEB` and committed there.

## How to Report Back to the Delegator

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-astro-support/instructions/tune-astro-rules__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `tune-astro-rules`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable      | Resolved Path                  | Purpose                                        |
| ------------- | ------------------------------ | ---------------------------------------------- |
| `$WORKSPACE`  | Current working directory      | Workspace root directory.                      |
| `$ROOT`       | `checkouts/workspace-tooling`  | Monorepo hosting the ESLint config package.    |
| `$WEB`        | `checkouts/noodlestan-web`     | Astro consumer used to live-tune the override. |
| `$PKG_ESLINT` | `$ROOT/configs/eslint-config/` | Package receiving the Astro ESLint override.   |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `tune-astro-rules`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Link the locally-built `@noodlestan/eslint-config` into `$WEB`, surface every conflict between the shared Astro rules and `apps/noodlestan-web`, and resolve each finding as either a config gap in `$PKG_ESLINT` or a project defect in `$WEB` — one commit per repository, on `main`, `NOPUSH`.

## Mandatory Reading

::READ `$PKG_ESLINT/src/config/astro.cjs` — the override being tuned; every config gap lands here.

::READ `$PKG_ESLINT/src/index.cjs` — override registration order and `ignorePatterns`.

::READ `$PKG_ESLINT/_guide.md` — package layout and the `npm run lint` / `npm run test` verification pair.

::READ `$ROOT/_guide.md` — repository layout and `npm run ci` verification.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` — commit message types, scopes, and format rules.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

## Operating Instructions

### Operating Instructions: Setting Up

**Instructions:**

Run from `$ROOT`:

```bash
npm ci # to install dependencies.
```

### Operating Instructions: Linking the Local Package

**Instructions:**

Run from `$WEB/node_modules/@noodlestan`:

```bash
rm -rf eslint-config && ln -s ../../../workspace-tooling/configs/eslint-config eslint-config
```

RULE: After linking, do **not** run `npm ci` or `npm install` in `$WEB` — either command replaces the symlink with the published package and silently ends the live-tuning setup. The link is removed deliberately in the `publish-and-pin` iteration.

### Operating Instructions: Writing Commit Message

**Instructions:**

Commit message pattern: `{Type}({Scope}): {Description}.` max 120 chars, optionally followed by up to 3 bullet points, max 100 chars each.

Allowed values for commit Type, Scope, and valid Type–Scope associations are defined in `$WORKSPACE/knowledge/conventions/writing-commit-message.art`, along with examples, and rules.

RULE: Do not invent commit types or scopes or assume a combination is valid. Always read the "Writing Commit Message" guide first.

### Operating Instructions: Verifying Step

**Instructions:**

Run from `$PKG_ESLINT`:

```bash
npm run lint # to report other issues (prettier, eslint)
npm run test # to run all tests
```

Run from `$WEB/apps/noodlestan-web` to confirm the live-test consumer is clean:

```bash
npm run lint # prettier, eslint and tsc
```

### Operating Instructions: Verifying Completion

**Instructions:**

Runs automatically on pre-commit hook, from `$ROOT`:

```bash
npm run ci # lint, test and build
```

---

## Changes

- Step 1 / 4 — Link `@noodlestan/eslint-config` into `$WEB`
- Step 2 / 4 — Lint and classify every violation
- Step 3 / 4 — Fix config gaps in `$PKG_ESLINT`
- Step 4 / 4 — Fix project defects in `$WEB`

## Steps

### Step 1 / 4 — Link `@noodlestan/eslint-config` into `$WEB`

Run the **Operating Instructions: Linking the Local Package** block.

Verify the link resolves to the monorepo source, not an installed copy:

```bash
cd $WEB && node -e "console.log(require.resolve('@noodlestan/eslint-config'))"
```

Expected outcome: a path under `checkouts/workspace-tooling`. A path inside `$WEB/node_modules` means the symlink did not take — REPORT A BLOCKER.

### Step 2 / 4 — Lint and classify every violation

Run from `$WEB/apps/noodlestan-web`:

```bash
npm run lint
```

Record every reported `.astro` violation as one of two classes:

| Class          | Signature                                                                         | Resolved in              |
| -------------- | --------------------------------------------------------------------------------- | ------------------------ |
| Config gap     | a rule the shared config should express, or a parser/`project` resolution failure | Step 3, in `$PKG_ESLINT` |
| Project defect | a genuine violation of a correctly-expressed rule                                 | Step 4, in `$WEB`        |

Confirm `parserOptions.project` resolves for `.astro` files, given that the Solid and TypeScript overrides assume a CWD-relative `./tsconfig.json` — a resolution crash is a config gap, not a defect.

RULE: A violation with no corresponding rule in the shared config, or a crash before rules run, is always a config gap. Do not fix it in `$WEB`.

### Step 3 / 4 — Fix config gaps in `$PKG_ESLINT`

For each config gap from Step 2, adjust `$PKG_ESLINT/src/config/astro.cjs` — prefer the `rules` block; change `parser`, `parserOptions`, or registration order only when the gap is structural.

After each adjustment:

```bash
cd $PKG_ESLINT && npm run lint && npm run test # package must stay green
cd $WEB/apps/noodlestan-web && npm run lint    # consumer converges
```

Expected outcome: the package verification pair stays green, and the consumer's config-gap violations disappear one by one. If closing a gap re-introduces violations in non-`.astro` files, the override is shadowing another override — fix the registration order in `src/index.cjs`.

When no config gap remains, commit the tuning:

#### Commit: `tune-astro-rules-config`

**Repository:** Workspace Tooling / `$ROOT`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
fix(eslint-config): Tune the Astro override against `noodlestan-web`.

- Adjust `src/config/astro.cjs` for the config gaps surfaced by live linting.
```

1. Stage every file changed under `$PKG_ESLINT`.
2. Confirm no `$WEB` file is staged.
3. Commit with the message above. Do not push.

### Step 4 / 4 — Fix project defects in `$WEB`

For each project defect from Step 2, fix the offending source in `$WEB/apps/noodlestan-web/src/**/*.astro`. Do not weaken or disable the shared rules to make a defect pass.

Re-run from `$WEB/apps/noodlestan-web` until clean:

```bash
npm run lint
```

Expected outcome: zero `.astro` violations — every remaining finding was either a config gap (now closed in Step 3) or a defect (now fixed here).

Commit the defect fixes:

#### Commit: `tune-astro-rules-defects`

**Repository:** Noodlestan Web / `$WEB`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
fix(noodlestan-web): Fix Astro lint defects surfaced by the shared config.

- Correct `*.astro` sources in `apps/noodlestan-web/src` flagged by the tuned override.
```

1. Stage the `*.astro` source fixes only — no manifest or lockfile changes belong in this commit.
2. Commit with the message above. Do not push.

---

## Final Verification

- Verify that commits have been executed and not pushed, according to the `NOPUSH` policy — one commit in `$ROOT`, one in `$WEB`.
- Verify `npm run lint` and `npm run test` pass in `$PKG_ESLINT` with the tuned `src/config/astro.cjs`.
- Verify `npm run lint` passes in `$WEB/apps/noodlestan-web` with zero `.astro` violations.
- Verify the symlink `$WEB/node_modules/@noodlestan/eslint-config` still points at `$PKG_ESLINT` — the `publish-and-pin` iteration replaces it; do not remove it here.
- Verify no shared rule was weakened in `$WEB` to silence a violation.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
