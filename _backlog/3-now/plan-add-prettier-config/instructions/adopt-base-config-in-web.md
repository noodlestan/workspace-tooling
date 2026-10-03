# Instructions: `adopt-base-config-in-web`

**Plan:** `add-prettier-config`

**Iteration Id:** `adopt-base-config-in-web`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-prettier-config/instructions/adopt-base-config-in-web__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `adopt-base-config-in-web`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                         | Purpose                                  |
| ------------ | ------------------------------------- | ---------------------------------------- |
| `$WORKSPACE` | Current working directory             | Workspace root directory.                |
| `$PROJECT`   | Provided with prompt                  | Monorepo holding the config package.     |
| `$WEB`       | `$WORKSPACE/checkouts/noodlestan-web` | Consumer repository adopting the config. |
| `$BASE`      | `$PROJECT/configs/prettier-config/`   | Package being linked and adopted.        |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `adopt-base-config-in-web`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Prove `@noodlestan/prettier-config` is a drop-in replacement for the hand-written `$WEB/.prettierrc`, by linking it, deleting the local config file, and confirming the repository still lints clean with zero file changes.

## Mandatory Reading

::READ `$WEB/.prettierrc` — the config being replaced. Diff it against `$BASE/src/index.json` before deleting it; they must be identical.

::READ `$BASE/src/index.json` — the canonical rules now taking over.

::READ `$BASE/src/index.cjs` — the entry point Node resolution will load via the `prettier` field.

::READ `$BASE/package.json` — its `exports` map defines what the `prettier` field resolves to.

::READ `$WEB/.prettierignore` — confirms `apps/noodlestan-web/.astro/` and generated output are excluded from the check.

::READ `$WEB/package.json` — the manifest receiving the `prettier` field.

::READ `$WEB/_guide.md` — the guide to update so it documents the `prettier` field instead of a config file.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

### Operating Instructions: Setting Up

**Instructions:**

Run from `$WEB`:

```bash
npm ci # to install dependencies.
```

### Operating Instructions: Linking the package

**Instructions:**

Run from `$WEB/node_modules/@noodlestan` so Prettier's `prettier` field resolves the local package instead of a registry copy:

```bash
rm -rf prettier-config && ln -s ../../../workspace-tooling/configs/prettier-config prettier-config
```

RULE: `rm -rf` before `ln -s` is required. `ln -s` fails when the target name already exists, and `$WEB/node_modules/@noodlestan/prettier-config` may be a real installed directory.

RULE: This symlink is a **local dev convenience only**. It is never committed — `node_modules` is not tracked — and it is removed in the `publish-and-pin` iteration in favour of the published version. Do not add `@noodlestan/prettier-config` to `$WEB/package.json` `devDependencies` in this iteration; the `prettier` field resolves through `node_modules` without a declared version.

## Changes

- Step 1 / 4 — Link the package into `$WEB`
- Step 2 / 4 — Replace `.prettierrc` with the `prettier` field
- Step 3 / 4 — Verify parity and update the guide
- Step 4 / 4 — Commit `adopt-prettier-config`

## Steps

### Step 1 / 4 — Link the package into `$WEB`

Establish the equivalence proof **before** deleting anything, so you can compare the two rule sets directly:

```bash
diff $WEB/.prettierrc $BASE/src/index.json
```

Expected outcome: no output. The two files must be byte-identical — both already list `*.mjs` in the `overrides` array. If this diff reports anything, stop and REPORT A BLOCKER with the output: the canonical rules and the consumer config have diverged and that is a defect in `$PROJECT`, not something to reconcile here.

Then link the package using the `Operating Instructions: Linking the package` block above.

Verify the link resolves:

```bash
cd $WEB && node -e "console.log(require.resolve('@noodlestan/prettier-config'))"
```

Expected outcome: a path under `checkouts/workspace-tooling/configs/prettier-config/`.

### Step 2 / 4 — Replace `.prettierrc` with the `prettier` field

Delete `$WEB/.prettierrc`:

```bash
rm $WEB/.prettierrc
```

RULE: Deleting the local config file is the point of this iteration. A surviving `.prettierrc` **shadows** the `prettier` field, so leaving it behind would make the whole adoption a no-op while appearing to succeed.

Add to `$WEB/package.json`, as a top-level key alongside `scripts`, `workspaces`, and `devDependencies`:

```json
"prettier": "@noodlestan/prettier-config"
```

Place it after the `workspaces` array, before `devDependencies`. Do not reorder any existing key and do not reformat the manifest.

RULE: Do not add `@noodlestan/prettier-config` to `devDependencies` in this iteration. It arrives with a pinned version in `publish-and-pin`, once the package is actually on the registry.

### Step 3 / 4 — Verify parity and update the guide

Run the check — not the fixer:

```bash
cd $WEB && npm run lint
```

Expected outcome:

```
Checking formatting...
All matched files use Prettier code style!
```

RULE: Use `npm run lint`, **not** `npm run lint:fix`. Because the shipped rules are identical to the old `.prettierrc`, the correct result is a clean check with **zero** files reformatted. Running `lint:fix` and committing its output would mask a divergence in `$PROJECT` behind a large formatting diff.

RULE: If `npm run lint` reports any file as needing formatting, do **not** commit the reformat. Report a BLOCKER listing the offending files. The correct fix is to correct `$BASE/src/index.json` in `$PROJECT` and re-run this iteration.

Confirm the working tree contains only the intended change:

```bash
cd $WEB && git status --porcelain
```

Expected outcome: a deleted `.prettierrc` and a modified `package.json`. Any other modified file is unexpected — investigate before proceeding.

Update `$WEB/_guide.md`: find every reference to a `.prettierrc` file or to Prettier configuration living in the repository, and replace it with a description of the `prettier` field in `package.json` that points at `@noodlestan/prettier-config`. Keep the surrounding prose structure intact; change only what the field makes false.

### Step 4 / 4 — Commit

#### Commit: `adopt-prettier-config`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
tooling(noodlestan-web): Adopt `@noodlestan/prettier-config` through the `prettier` field.

- Delete `.prettierrc` and set `prettier` in `package.json` instead.
- Re-indent `.mjs` files from spaces to tabs, now covered by the shared overrides.
- Document the `prettier` field in `_guide.md`.
```

RULE: The commit message is pre-authored. Do not rewrite it.

CONFLICT — READ CAREFULLY: The second body line claims `.mjs` files are re-indented from spaces to tabs. **This will not happen.** The repo's existing `.prettierrc` already listed `*.mjs` in its `overrides` array, so those files are already tab-indented and this adoption produces no reformatting. The message is slightly inaccurate.

Handle it this way:

1. First confirm the claim is false by running `git status --porcelain` after Step 3. If, contrary to expectation, `.mjs` files genuinely were re-indented, keep the message as-is and note the surprise in your report.
2. If confirmed that no files were reformatted, drop the second body line so the commit message does not assert a change that is not in the diff. Keep the `scaffold`-style type and the other two body lines unchanged.

An accurate commit message outranks verbatim fidelity to a pre-authored one that is demonstrably wrong about this repository. Note the deviation and your reasoning in the report.

**Steps for this commit:**

1. Stage `$WEB/.prettierrc` (deletion), `$WEB/package.json`, and `$WEB/_guide.md`.
2. Confirm the symlink is **not** staged — `node_modules` is untracked, so `git status` must not list it.
3. Commit with the message above, subject to the conflict rule. Do not push.

---

## Final Verification

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify `$WEB/.prettierrc` no longer exists.
- Verify `$WEB/package.json` contains the top-level `"prettier": "@noodlestan/prettier-config"` key and that `@noodlestan/prettier-config` is **absent** from `devDependencies`.
- Verify `npm run lint` in `$WEB` reports `All matched files use Prettier code style!`.
- Verify `git status --porcelain` in `$WEB` shows only the three intended paths and no reformatted source files.
- Verify the symlink `$WEB/node_modules/@noodlestan/prettier-config` exists and points into `checkouts/workspace-tooling/configs/prettier-config`, and that it is untracked.
- Verify `$WEB/_guide.md` no longer documents a `.prettierrc` file.
- Execute the **Verifying Step** as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
