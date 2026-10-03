# Instructions: `publish-and-pin`

**Plan:** `add-prettier-config`

**Iteration Id:** `publish-and-pin`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

RULE: This iteration has two commits with **different policies** and a **hard crew gate** between them. Read the sequencing note in the `## Changes` section before starting.

## How to Report Back to the Delegator

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-prettier-config/instructions/publish-and-pin__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `publish-and-pin`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                             | Purpose                                            |
| ------------ | ----------------------------------------- | -------------------------------------------------- |
| `$WORKSPACE` | Current working directory                 | Workspace root directory.                          |
| `$PROJECT`   | Provided with prompt                      | Monorepo holding both packages.                    |
| `$WEB`       | `$WORKSPACE/checkouts/noodlestan-web`     | Consumer repository pinning the published release. |
| `$BASE`      | `$PROJECT/configs/prettier-config/`       | Base package; staged for release.                  |
| `$ASTRO`     | `$PROJECT/configs/prettier-config-astro/` | Astro package; staged for release.                 |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `publish-and-pin`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Publish `@noodlestan/prettier-config` and `@noodlestan/prettier-config-astro` at `0.0.1`, then replace the local symlink in `$WEB` with the published version and confirm the pinned result matches the linked result.

## Mandatory Reading

::READ `$PROJECT/configs/prettier-config/package.json` — manifest whose `version` is **verified** in Step 1, not changed.

::READ `$PROJECT/configs/prettier-config/CHANGELOG.md` — changelog already carrying the `## 0.0.1` entry written during scaffolding.

::READ `$PROJECT/configs/prettier-config-astro/package.json` — manifest whose `version` is **verified** in Step 1, and whose runtime dependency on `@noodlestan/prettier-config` must keep matching the base version.

::READ `$BASE/_records/npm-deployment.art` — deployment record updated in Step 2.

::READ `$ASTRO/_records/npm-deployment.art` — deployment record updated in Step 2.

::READ `$PROJECT/README.md` — package list updated in Step 2.

::READ `$WEB/package.json` — manifest receiving the pinned version in Step 4.

::READ `$WORKSPACE/_guide.md` — for the `art-work publish` command and its crew-approval behaviour.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

### Operating Instructions: Setting Up

**Instructions:**

Run from the repository root (monorepo):

```bash
npm ci # to install dependencies.
```

### Operating Instructions: Removing the local link

**Instructions:**

Run from `$WEB/node_modules/@noodlestan`, before installing the published version:

```bash
rm prettier-config
```

RULE: `node_modules/@noodlestan/prettier-config` is a **symlink** created in `adopt-base-config-in-web`. Use `rm`, not `rm -rf` — `rm` removes the link without following it, so the package source in `$PROJECT` survives.

## Changes

This iteration is split by a crew gate. Do not treat the four steps below as one uninterrupted run.

| Step | Scope                                                                                                                  | Runs before the gate |
| ---- | ---------------------------------------------------------------------------------------------------------------------- | -------------------- |
| 1    | Verify both packages are at `0.0.1` with populated changelogs, update both deployment records and `$PROJECT/README.md` | Yes                  |
| 2    | Commit `release-prettier-configs` — `NOCOMMIT`, stage only                                                             | Yes                  |
| 3    | **CREW GATE** — crew commits, pushes, and runs `art-work publish`                                                      | Crew                 |
| 4    | Remove the symlink, install the published `0.0.1`, verify parity, commit `pin-prettier-config`                         | No                   |

- Step 1 / 4 — Verify the release state and update the records and README
- Step 2 / 4 — Stage the release changes (`release-prettier-configs`, `NOCOMMIT`)
- Step 3 / 4 — Crew gate: STOP and hand back
- Step 4 / 4 — Pin the published release in `$WEB`

## Steps

### Step 1 / 4 — Verify the release state and update the records and README

RULE: There is **no version bump in this iteration.** Both packages were created at `0.0.1` with populated `CHANGELOG.md` files in their scaffold iterations, precisely so that releasing requires no version edit. Do not change either `version` field, and do not add a `## 0.0.1` changelog entry — both already exist.

Verify the release-ready state instead:

```bash
cd $PROJECT
node -e "for (const p of ['configs/prettier-config','configs/prettier-config-astro']) { const m = require('./'+p+'/package.json'); console.log(m.name, m.version); }"
grep -c '^## 0.0.1$' configs/prettier-config/CHANGELOG.md configs/prettier-config-astro/CHANGELOG.md
```

Expected outcome: two lines reporting `@noodlestan/prettier-config 0.0.1` and `@noodlestan/prettier-config-astro 0.0.1`, and a `1` for each changelog. Anything other than that is a BLOCKER — it means a scaffold iteration left the package in a state that cannot be published.

Also confirm the Astro package's dependency still agrees with the base version:

```bash
cd $PROJECT && node -e "console.log(require('./configs/prettier-config-astro/package.json').dependencies['@noodlestan/prettier-config'])"
```

Expected outcome: `0.0.1`. A mismatch publishes a package that installs broken for consumers.

Update both `$BASE/_records/npm-deployment.art` and `$ASTRO/_records/npm-deployment.art`: record the published version `0.0.1` alongside the existing `**Canonical Name:**`, `**Registry:**`, `**Access:**`, `**Build:**`, and `**Deploy:**` fields. If the record shape has no version field, add one named `**Version:**` rather than overwriting an existing field — read the file first.

Update `$PROJECT/README.md`: add both packages to its package list, matching the entry format already used there.

Verify both manifests are internally consistent before moving on:

```bash
cd $PROJECT && npm ci && npm run lint
```

Expected outcome: clean install and `All matched files use Prettier code style!`. A broken workspace link at this point would publish an unusable package.

### Step 2 / 4 — Stage the release changes

#### Commit: `release-prettier-configs`

**Policy:** NOCOMMIT — publishing to the public registry is irreversible. Agent MUST stage the changes and hand back for crew commit and publish. Agent MUST NOT create this commit, MUST NOT push, and MUST NOT run `art-work publish`.

**Message:**

```
release(workspace-tooling): Publish `prettier-config` and `prettier-config-astro` 0.0.1.

- Both packages were scaffolded at `0.0.1` with populated changelogs; run `npm run art-work publish` after crew approval.
- Update both `_records/npm-deployment.art` records and the `$PROJECT/README.md` package list.
```

**Steps for this commit:**

1. Run `git status --porcelain` in `$PROJECT` and confirm only the intended files changed.
2. `git add` those files. Leave them **staged and uncommitted**.
3. Do not run `npm run art-work publish`.

### Step 3 / 4 — Crew gate: STOP and hand back

STOP HERE.

Publishing is irreversible and this commit's policy is `NOCOMMIT`. The crew owns the commit, the push, and the `art-work publish` invocation.

Report back now with a BLOCKER, stating that the release is staged and awaiting crew action. Include, in the report:

- The staged file list.
- The confirmed versions of both packages.
- The exact command the crew needs to run: `npm run art-work publish` from `$WORKSPACE`.
- An explicit statement that Step 4 has **not** been attempted.

RULE: Do not proceed to Step 4 in this run. `art-work publish` must complete and the packages must be resolvable on the registry before `$WEB` can install `@noodlestan/prettier-config@0.0.1`. Installing an unpublished version fails, and installing the wrong version invalidates the parity check that Step 4 exists to perform.

Step 4 is executed on a **subsequent** delegation, after the crew confirms the publish succeeded.

### Step 4 / 4 — Pin the published release in `$WEB`

**Precondition:** the crew has published, and `npm view @noodlestan/prettier-config versions` from `$WORKSPACE` lists `0.0.1`. If it does not, stop and REPORT A BLOCKER.

Run the `Operating Instructions: Removing the local link` block from `$WEB/node_modules/@noodlestan`.

Then, from `$WEB`:

```bash
npm install --save-dev --save-exact @noodlestan/prettier-config@0.0.1
```

`--save-exact` is required: the repo pins every dependency to an exact version rather than a caret range, so an unpinned entry would be the only one in the manifest.

Verify the install replaced the symlink with a real directory:

```bash
cd $WEB && node -e "console.log(require.resolve('@noodlestan/prettier-config'))"
```

Expected outcome: a path under `$WEB/node_modules`, **not** under `checkouts/workspace-tooling`. A path in the monorepo means the symlink survived and you are still testing local source, not the release.

Confirm the pinned result matches what the linked result produced:

```bash
cd $WEB && npm run lint
```

Expected outcome: `All matched files use Prettier code style!` — the same clean result the symlinked run produced in `adopt-base-config-in-web`. Any formatting difference here means the published artifact differs from the local source; REPORT A BLOCKER instead of running `lint:fix`.

#### Commit: `pin-prettier-config`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
tooling(noodlestan-web): Pin `@noodlestan/prettier-config` to the published release.

- Replace the local link with the released version.
- Confirm `npm run lint` matches the linked run.
```

**Steps for this commit:**

1. Stage `$WEB/package.json` and `$WEB/package-lock.json`.
2. Confirm no source file is staged — the manifest and lockfile only.
3. Commit with the message above. Do not push.

---

## Final Verification

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy — for `release-prettier-configs`, that means staged and **not** committed.
- Verify neither package's `version` was changed by this iteration, and that both remain `0.0.1`.
- Verify both packages have a `CHANGELOG.md` carrying a `## 0.0.1` entry, written during scaffolding rather than here.
- Verify the Astro package's dependency on the base package is `0.0.1`.
- Verify both `_records/npm-deployment.art` files record the published version.
- Verify `$PROJECT/README.md` lists both packages.
- Verify the symlink `$WEB/node_modules/@noodlestan/prettier-config` has been replaced by a real installed directory inside `$WEB/node_modules`.
- Verify `@noodlestan/prettier-config` is pinned to the exact version `0.0.1` in `$WEB` `devDependencies`, with no caret range.
- Verify `npm run lint` in `$WEB` passes with no reformatted files, matching the linked run.
- Verify `npm run art-work publish` was **not** run by the agent.
- Report according to the "How to Report Back to the Delegator" instructions.
