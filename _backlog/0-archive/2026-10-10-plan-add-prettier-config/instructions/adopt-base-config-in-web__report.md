# Sub-Agent REPORT (agent-worker)

**Plan:** `add-prettier-config`

**Iteration Id:** `adopt-base-config-in-web`

**Outcome:** `COMPLETED`

## Evidence

### Changes

Anchored on **## Goals**: prove `@noodlestan/prettier-config` is a drop-in replacement for the hand-written `$WEB/.prettierrc` by linking it, deleting the local config file, and confirming the repository still lints clean with zero file changes. **The equivalence proof held.** The two rule sets are byte-identical (`sha256 39c28bb1…` on both files), `npm run lint` reported `All matched files use Prettier code style!` on the first run after adoption, and no source file was reformatted.

| Step                                                                        | Outcome                                                                                                  |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Operating Instructions: Setting Up** — `npm ci` from `$WEB`               | `PASS` — `added 760 packages`, no lockfile change                                                        |
| **Step 1 / 4** — `diff $WEB/.prettierrc $BASE/src/index.json`               | `PASS` — no output; both files `sha256 39c28bb15b18cdf966bda48f10c5c523fa364d5b7c04f9e4da280acb4d37c4ab` |
| **Step 1 / 4** — `rm -rf prettier-config && ln -s …`                        | `DONE` — symlink in place (no prior installed copy to clobber)                                           |
| **Step 1 / 4** — `node -e "require.resolve('@noodlestan/prettier-config')"` | `PASS` — `…/checkouts/workspace-tooling/configs/prettier-config/src/index.cjs`                           |
| **Step 2 / 4** — delete `$WEB/.prettierrc`                                  | `DONE` — file absent                                                                                     |
| **Step 2 / 4** — add the `prettier` field to `$WEB/package.json`            | `DONE` — 1 insertion, no reformat; not added to `devDependencies`                                        |
| **Step 3 / 4** — `npm run lint`                                             | `PASS` — `All matched files use Prettier code style!`, exit 0, zero files reformatted                    |
| **Step 3 / 4** — `git status --porcelain`                                   | `PASS` — exactly `D .prettierrc`, `M package.json`, `M _guide.md`; no source file touched                |
| **Step 3 / 4** — update `$WEB/_guide.md`                                    | `DONE` — new `## Formatting` section, see **Deviation 2**                                                |
| **Step 4 / 4** — commit `adopt-prettier-config`                             | `COMMITTED` — `342054f`, policy `NOPUSH`, nothing pushed, see **Deviation 4** for the branch             |

`npm run lint:fix` was deliberately **never run**, per the RULE. Because it was not run, the clean check is real evidence of equivalence rather than the residue of a rewrite.

#### Files changed

| File           | Description                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `package.json` | Added the top-level `"prettier": "@noodlestan/prettier-config"` key, immediately after the `workspaces` array. No existing key reordered, no `devDependencies` entry added, no reformat.   |
| `_guide.md`    | Added a `## Formatting` section documenting the `prettier` field and the shared `@noodlestan/prettier-config` package, plus the `.prettierignore` reference. No surrounding prose altered. |
| `.prettierrc`  | Deleted. Replaced by the `prettier` field resolution described above.                                                                                                                      |

#### Verification evidence

| Check                                                           | Command                                                                    | Result                                                                                                                                                                                        |
| --------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parity of the two rule sets (Step 1 gate)                       | `diff $WEB/.prettierrc $BASE/src/index.json`                               | `PASS` — empty, exit 0                                                                                                                                                                        |
| Parity, cryptographic                                           | `shasum -a 256` on both files                                              | `PASS` — identical `39c28bb1…`                                                                                                                                                                |
| Package resolves through the link (Step 1 gate)                 | `node -e "require.resolve('@noodlestan/prettier-config')"`                 | `PASS` — `…/checkouts/workspace-tooling/configs/prettier-config/src/index.cjs`                                                                                                                |
| Config actually loaded, not Prettier defaults                   | `npx prettier --find-config-path apps/noodlestan-web/src/…/PageLayout.tsx` | `PASS` — `package.json` (not a `.prettierrc`)                                                                                                                                                 |
| The linked package's `overrides` reach Prettier                 | `require('prettier').resolveConfig('…/PageLayout.tsx')`                    | `PASS` — `useTabs: true, printWidth: 100, tabWidth: 2, semi: true, singleQuote: true, trailingComma: "all", arrowParens: "avoid"` — `useTabs` arrives only via the package's `*.tsx` override |
| Zero reformatting (the iteration's whole point)                 | `npm run lint`                                                             | `PASS` — `All matched files use Prettier code style!`, exit 0                                                                                                                                 |
| Working tree limited to the intended change                     | `git status --porcelain`                                                   | `PASS` — ` D .prettierrc`, ` M _guide.md`, ` M package.json`                                                                                                                                  |
| `.prettierrc` gone (Final Verification)                         | `ls .prettierrc`                                                           | `PASS` — `No such file or directory`                                                                                                                                                          |
| `prettier` field present, package **not** in `devDependencies`  | `node -e` over the manifest                                                | `PASS` — `prettier: "@noodlestan/prettier-config"`, `in devDependencies: false`                                                                                                               |
| Existing key order preserved                                    | `node -e "Object.keys(require('./package.json'))"`                         | `PASS` — `…,packageManager,workspaces,prettier,engines,scripts,devDependencies`                                                                                                               |
| Symlink exists, points into `workspace-tooling`, untracked      | `readlink` + `git check-ignore -v` + `git ls-files --error-unmatch`        | `PASS` — `../../../workspace-tooling/configs/prettier-config`; matched by `.gitignore:20:node_modules/`; not tracked                                                                          |
| Guide no longer documents a `.prettierrc`                       | `grep -c prettierrc _guide.md`                                             | `PASS` — `0`                                                                                                                                                                                  |
| Repository CI gate (Verifying Completion, per `$WEB/_guide.md`) | `npm run ci` from `$WEB`                                                   | `PASS` — `prettier . -c` clean, `eslint .`, `tsc --noEmit`, `astro build` 2 pages, `test` `none yet`; `turbo run ci` `1 successful, 1 total`                                                  |
| Same gate, re-run unattended by the hook                        | `git commit`                                                               | `PASS` — lefthook `0-clean`, `1-extract`, `2-ci` all `✔️`, no `--no-verify` used                                                                                                              |

#### Commits

| Commit                                                                                           | Repository              | Branch | Policy   | Pushed              |
| ------------------------------------------------------------------------------------------------ | ----------------------- | ------ | -------- | ------------------- |
| `tooling(noodlestan-web): Adopt \`@noodlestan/prettier-config\` through the \`prettier\` field.` | Noodlestan Web (`$WEB`) | `main` | `NOPUSH` | No — `NO` by policy |

One commit, three files, 11 insertions and 17 deletions. Nothing was pushed. The full hash is `342054f31e1df88091d06b416dff70ccab863c81`. This report is **not** part of that commit: the instruction prescribes staging only `.prettierrc`, `package.json`, and `_guide.md`, and the report belongs to `$PROJECT`. It is left uncommitted for the delegator to stage.

### Deviations and judgement calls

1. **The `.mjs` body line was dropped from the commit message, as the instruction's CONFLICT rule directed.** The claim _"Re-indent `.mjs` files from spaces to tabs, now covered by the shared overrides"_ is **false** for this repository, confirmed before committing: after Step 3 the working tree held exactly the three intended paths and not a single `.mjs` file. `$WEB`'s deleted `.prettierrc` already listed `*.mjs` in `overrides`, and the shipped `src/index.json` lists it too. The remaining message is byte-identical to the commit message authored in `plan.md` (which carries only those two body lines), so this is not a deviation from the plan — only from the instruction's copy of it. Type, scope, description, and both surviving bullet points are unchanged.

2. **`$WEB/_guide.md` contained no reference to a `.prettierrc` to replace, so the update is an addition.** The instruction's Step 3 says to _"find every reference to a `.prettierrc` file or to Prettier configuration living in the repository, and replace it"_; a search across the whole repository (including `.vscode/`, `_records/`, `README.md`, and both `package.json` files) found zero such references. Yet the same instruction stages `_guide.md` and the pre-authored commit message asserts _"Document the `prettier` field in `_guide.md`"_, so the file had to change. I added a single `## Formatting` section between `## Records Management` and `## Workflows`, keeping surrounding prose untouched, describing the `prettier` field, the package it points at, and the surviving `.prettierignore`. Flagging it because the instruction presumed a replacement where the repository only ever had an omission.

3. **The `prettier` key was placed immediately after the `workspaces` array**, i.e. before `engines`, following the instruction literally (_"Place it after the `workspaces` array, before `devDependencies`"_). Any position between those two keys satisfies the stated constraint; this one is the strict reading.

4. **The commit landed on `main`, not on `add-prettier-config`.** The plan's commit blueprint table names branch `add-prettier-config` for `$WEB`, but `$WEB` is on `main` and has no such branch; the delegation context confirmed both checkouts sit on `main`, and the two `$PROJECT` commits from the previous iterations are likewise on `main` despite the same blueprint wording. The instruction file itself never mentions a branch, so no branch was created and the commit went to `main` — `$WEB` is now `main...origin/main [ahead 1]`. **Reversible only by the delegator**: if the blueprint's branch name was meant literally, this commit needs to be moved with `git branch add-prettier-config && git reset --hard origin/main` or equivalent before integration. No equivalent note exists for `$PROJECT`, whose 8 unpushed commits already sit on `main`.

5. **`npm run ci` was run manually at `$WEB` before committing**, in addition to the hook's own run. The instruction's Final Verification asks for the _Verifying Step_ _"as defined in the 'Operating Instructions' section"_, but that section defines only `Setting Up` and `Linking the package` — no Verifying Step. `$WEB/_guide.md` defines `Verifying Completion` as `npm run ci` on the pre-commit hook, and the plan's Verifying Step prescribes `npm run lint` plus `npm run test`; `$WEB` has no `test` script and its `ci` already chains lint, build, and test through turbo. Running it up front meant a failure would surface as evidence rather than as a blocked commit.

6. **The report is uncommitted.** Per the delegation context, and because the instruction's single commit prescribes three paths, the report file is written next to the instruction and left for the delegator to stage in `$PROJECT`.

## Blockers (if any)

None. The equivalence gate that this iteration exists to run passed on the first attempt, with zero reformatting and no divergence between `$WEB/.prettierrc` and `$BASE/src/index.json`.

## Feedback

_No `DIRECTIVE FEEDBACK:` accompanied this delegation, so this section is informational only._

### For the planner

- **The CONFLICT rule worked exactly as intended.** Flagging a demonstrably false line in a pre-authored commit message — with the precise check to run before deciding — let the worker resolve it without a round trip. Worth keeping as a pattern.
- **`$WEB/_guide.md` never documented the Prettier configuration at all**, so _"update the guide to replace the `.prettierrc` reference"_ could only ever have been satisfied as an addition. If future iterations reference guide edits, a quick `grep` for the file the change deletes would turn several such instructions from rewrites into no-ops.
- **The branch name in the commit blueprint tables is stale.** `plan.md` records `add-prettier-config` for `$WEB`, but every commit so far — including `$PROJECT`'s two — is on `main`. Either the blueprint should say `main`, or the instructions should say _"create and check out branch `add-prettier-config` first"_. Right now a worker following the plan table and a worker following the delegation prompt reach different repositories' histories.
- **`$PROJECT`'s `plan-add-prettier-config` instruction at step 3 for a future iteration would be cheaper if it named the check** that proves config resolution rather than merely lint success. A clean `npm run lint` is also what you get from Prettier falling back to defaults in some setups; `--find-config-path` plus a `resolveConfig()` dump is what proves the _shared_ rules loaded.

### For the technical writers

- **`$WEB/_guide.md` gained a `## Formatting` section that has no counterpart in the repo's other docs.** The `.prettierignore` file it now mentions was previously undocumented; the ignore policy remains per-repository and is listed as explicitly out of scope in the plan's Coordination section. Worth deciding whether the `## Formatting` section should also state that the _rules_ are shared while the _ignore list_ is not.
- **The plan's Findings claim `$PROJECT/.prettierrc` omits `*.mjs` from its `overrides`.** Worth double-checking against the current file, because `$WEB`'s copy does include it and the plan's whole equivalence argument rests on the two shipped configs being byte-identical to the consumer's. It holds for `$WEB` — verified by hash — but the plan text reads as though a single Prettier rule set is canonical across the workspace, and it is not.
- **The commit message body in `plan.md` was already correct** (two bullets, no `.mjs` claim), while the instruction file's copy carried the false third bullet. When an instruction quotes a commit message that differs from the plan's, the plan is probably the later, corrected version — worth a rule, since "the commit message is pre-authored, do not rewrite it" points the other way.

### For the crew

- **Adopting the config in `$WEB` was a two-line change plus one symlink, and produced no reformatting.** The nine remaining consumer migrations should behave the same way wherever their `.prettierrc` matches the shipped rules — and should be quick to detect where it does not, since `npm run lint` fails loudly rather than rewriting.
- **`rm -rf … && ln -s …` into `node_modules/@noodlestan` is a safe and reversible live-test technique.** `npm ci` restores or removes the entry on its own, `node_modules/` is ignored, and nothing about the swap is visible in `git status`. The one sharp edge is that a stale symlink silently changes behaviour on the next `prettier` run, so `publish-and-pin` should replace it deliberately rather than by `npm install`.
