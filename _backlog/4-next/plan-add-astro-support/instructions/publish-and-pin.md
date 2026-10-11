# Instructions: `publish-and-pin`

**Plan:** `add-astro-support`

**Iteration Id:** `publish-and-pin`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

RULE: This iteration has two commits with **different policies** and a **hard crew gate** between them. Read the sequencing note in the `## Changes` section before starting.

## How to Report Back to the Delegator

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-astro-support/instructions/publish-and-pin__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `publish-and-pin`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable      | Resolved Path                  | Purpose                                            |
| ------------- | ------------------------------ | -------------------------------------------------- |
| `$WORKSPACE`  | Current working directory      | Workspace root directory.                          |
| `$ROOT`       | `checkouts/workspace-tooling`  | Monorepo hosting the ESLint config package.        |
| `$WEB`        | `checkouts/noodlestan-web`     | Consumer repository pinning the published release. |
| `$PKG_ESLINT` | `$ROOT/configs/eslint-config/` | Package being released.                            |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `publish-and-pin`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Bump `@noodlestan/eslint-config` from `0.0.8` to `0.1.0`, publish it via the crew-gated `art-work publish`, then replace the local symlink in `$WEB` with the published version and confirm the pinned result matches the linked result.

## Mandatory Reading

::READ `$PKG_ESLINT/package.json` — manifest whose `version` is bumped in Step 1.

::READ `$PKG_ESLINT/_records/npm-deployment.art` — deployment record updated in Step 1.

::READ `$PKG_ESLINT/README.md` — package readme receiving the Astro support note in Step 1.

::READ `$WEB/package.json` — manifest receiving the pinned version in Step 4.

::READ `$WORKSPACE/_guide.md` — for the `art-work publish` command and its crew-approval behaviour.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` — commit message types, scopes, and format rules.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

## Operating Instructions: Setting Up

**Instructions:**

Run from `$ROOT`:

```bash
npm ci # to install dependencies.
```

RULE: Do **not** run `npm ci` in `$WEB` while the symlink from `tune-astro-rules` is in place — it would replace the link with the published `0.0.8` and silently end the live-tuning setup.

### Operating Instructions: Removing the Local Link

**Instructions:**

Run from `$WEB/node_modules/@noodlestan`, before installing the published version:

```bash
rm eslint-config
```

RULE: `node_modules/@noodlestan/eslint-config` is a **symlink** created in `tune-astro-rules`. Use `rm`, not `rm -rf` — `rm` removes the link without following it, so the package source in `$ROOT` survives.

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

This iteration is split by a crew gate. Do not treat the four steps below as one uninterrupted run.

| Step | Scope                                                                                        | Runs before the gate |
| ---- | -------------------------------------------------------------------------------------------- | -------------------- |
| 1    | Bump the version to `0.1.0`, update the deployment record and the `README.md` Astro note     | Yes                  |
| 2    | Commit `release-eslint-config` — `NOCOMMIT`, stage only                                      | Yes                  |
| 3    | **CREW GATE** — crew commits, pushes, and runs `art-work publish`                            | Crew                 |
| 4    | Remove the symlink, install the published `0.1.0`, verify parity, commit `pin-eslint-config` | No                   |

- Step 1 / 4 — Bump the version and update the record and README
- Step 2 / 4 — Stage the release changes (`release-eslint-config`, `NOCOMMIT`)
- Step 3 / 4 — Crew gate: STOP and hand back
- Step 4 / 4 — Pin the published release in `$WEB`

## Steps

### Step 1 / 4 — Bump the version and update the record and README

Bump `version` in `$PKG_ESLINT/package.json` from `0.0.8` to `0.1.0` — a minor bump for the added Astro support.

Update `$PKG_ESLINT/_records/npm-deployment.art`: record the version being released as `0.1.0` alongside the existing fields. If the record shape has no version field, add one named `**Version:**` rather than overwriting an existing field — read the file first.

Update `$PKG_ESLINT/README.md`: add the Astro support note — the `*.astro` override, its `astro-eslint-parser`, and the `test/component.astro` fixture — matching the readme's existing section style.

Verify the package is internally consistent before moving on:

```bash
cd $PKG_ESLINT && npm run lint && npm run test
```

Expected outcome: both green with the Astro fixture in the tree. A broken package at this point would publish an unusable release.

### Step 2 / 4 — Stage the release changes

#### Commit: `release-eslint-config`

**Repository:** Workspace Tooling / `$ROOT`

**Policy:** NOCOMMIT — publishing to the public registry is irreversible. Agent MUST stage the changes and hand back for crew commit and publish. Agent MUST NOT create this commit, MUST NOT push, and MUST NOT run `art-work publish`.

**Message:**

```
release(eslint-config): Publish `@noodlestan/eslint-config` with Astro support.

- Bump the version to `0.1.0`; update `_records/npm-deployment.art` and the `README.md` Astro note.
```

**Steps for this commit:**

1. Run `git status --porcelain` in `$ROOT` and confirm only the intended files changed.
2. `git add` those files. Leave them **staged and uncommitted**.
3. Do not run `npm run art-work publish`.

### Step 3 / 4 — Crew gate: STOP and hand back

STOP HERE.

Publishing is irreversible and this commit's policy is `NOCOMMIT`. The crew owns the commit, the push, and the `art-work publish` invocation.

Report back now with a BLOCKER, stating that the release is staged and awaiting crew action. Include, in the report:

- The staged file list.
- The confirmed new version of the package (`0.1.0`).
- The exact command the crew needs to run: `npm run art-work publish` from `$WORKSPACE`.
- An explicit statement that Step 4 has **not** been attempted.

RULE: Do not proceed to Step 4 in this run. `art-work publish` must complete and the package must be resolvable on the registry before `$WEB` can install `@noodlestan/eslint-config@0.1.0`. Installing an unpublished version fails, and installing the wrong version invalidates the parity check that Step 4 exists to perform.

Step 4 is executed on a **subsequent** delegation, after the crew confirms the publish succeeded.

### Step 4 / 4 — Pin the published release in `$WEB`

**Precondition:** the crew has published, and `npm view @noodlestan/eslint-config versions` from `$WORKSPACE` lists `0.1.0`. If it does not, stop and REPORT A BLOCKER.

Run the **Operating Instructions: Removing the Local Link** block from `$WEB/node_modules/@noodlestan`.

Then, from `$WEB`:

```bash
npm install --save-dev --save-exact @noodlestan/eslint-config@0.1.0
```

`--save-exact` is required: the repo pins every dependency to an exact version rather than a caret range, so an unpinned entry would be the only one in the manifest.

Verify the install replaced the symlink with a real directory:

```bash
cd $WEB && node -e "console.log(require.resolve('@noodlestan/eslint-config'))"
```

Expected outcome: a path under `$WEB/node_modules`, **not** under `checkouts/workspace-tooling`. A path in the monorepo means the symlink survived and you are still testing local source, not the release.

Confirm the pinned result matches what the linked result produced:

```bash
cd $WEB/apps/noodlestan-web && npm run lint
```

Expected outcome: clean, the same result the symlinked run produced in `tune-astro-rules`. Any difference here means the published artifact differs from the local source; REPORT A BLOCKER instead of forcing a fix.

#### Commit: `pin-eslint-config`

**Repository:** Noodlestan Web / `$WEB`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
tooling(noodlestan-web): Pin `@noodlestan/eslint-config` to the published release.

- Replace the local link with the released version; confirm `npm run lint` parity.
```

**Steps for this commit:**

1. Stage `$WEB/package.json` and `$WEB/package-lock.json`.
2. Confirm no source file is staged — the manifest and lockfile only.
3. Commit with the message above. Do not push.

---

## Final Verification

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy — for `release-eslint-config`, that means staged and **not** committed until the crew acts.
- Verify `$PKG_ESLINT/package.json` declares version `0.1.0`.
- Verify `$PKG_ESLINT/_records/npm-deployment.art` records the released version.
- Verify `$PKG_ESLINT/README.md` documents the Astro support.
- Verify the symlink `$WEB/node_modules/@noodlestan/eslint-config` has been replaced by a real installed directory inside `$WEB/node_modules`.
- Verify `@noodlestan/eslint-config` is pinned to the exact version `0.1.0` in `$WEB` `devDependencies`, with no caret range.
- Verify `npm run lint` in `$WEB/apps/noodlestan-web` passes with no new violations, matching the linked run.
- Verify `npm run art-work publish` was **not** run by the agent.
- Report according to the "How to Report Back to the Delegator" instructions.
