# Sub-Agent REPORT (agent-worker)

**Plan:** `add-prettier-config`

**Iteration Id:** `scaffold-prettier-config-astro`

**Outcome:** `COMPLETED`

## Evidence

### Changes

Anchored on **## Goals**: create `@noodlestan/prettier-config-astro`, a thin package that re-exports the base Prettier rules and adds `*.astro` support, so Astro consumers get one `prettier` field instead of a local config file plus a separately declared plugin.

| Step                                                                       | Outcome                                                                                 |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Operating Instructions: Setting Up** (`npm ci` from `$PROJECT`)          | `PASS` — dependencies installed                                                         |
| **Step 1 / 4** — package manifest and license                              | `DONE` — `package.json`, `LICENSE-MIT`                                                  |
| **Step 2 / 4** — config entry points                                       | `DONE` — `src/index.cjs`, `src/index.json`                                              |
| **Step 3 / 4** — records, guide, README, changelog, fixture, registrations | `DONE` — 10 new package files, 2 registrations                                          |
| **Step 4 / 4** — `npm ci`                                                  | `PASS` — required one `npm install` first to register the new workspace in the lockfile |
| **Step 4 / 4** — `npm run lint:fix`, then `npm run lint`                   | `PASS` — `All matched files use Prettier code style!`                                   |
| **Step 4 / 4** — `npx prettier test/component.astro -c` from `$PKG`        | `PASS` — `All matched files use Prettier code style!`                                   |
| **Step 4 / 4** — `node -e "…require('./src/index.cjs')…"`                  | `PASS` — `100 2 [ 'prettier-plugin-astro' ]`                                            |
| **Step 4 / 4** — `npm run ci` at `$PROJECT`                                | `PASS` — `turbo run ci` `5 successful, 5 total`                                         |
| **Step 4 / 4** — commit `scaffold-prettier-config-astro`                   | `DONE` — committed, policy `NOPUSH`, nothing pushed                                     |

One unplanned repair was required, and it is the substantive finding of this iteration: see **Deviation 1** below. The instruction's diagnosis of the failure (`"the `plugins` entry is missing or the plugin is not installed"`) was wrong on both counts — both were already correct — and the real cause was that Prettier never loaded the package's own config for the fixture.

#### Files changed

| File                                                        | Description                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `configs/prettier-config-astro/package.json`                | Manifest at `0.0.1`: `main`, `exports` (`.`, `./json`, `./package.json`), `files`, `publishConfig.access: public`, `private: false`; `@noodlestan/prettier-config` pinned to `0.0.1` as a runtime dependency, `prettier` and `prettier-plugin-astro` as peers, `prettier-plugin-astro` also as a dev dependency. Plus the `"prettier": "./src/index.cjs"` field — see **Deviation 1**. |
| `configs/prettier-config-astro/LICENSE-MIT`                 | Copied from `$BASE/LICENSE-MIT`.                                                                                                                                                                                                                                                                                                                                                       |
| `configs/prettier-config-astro/src/index.cjs`               | Requires `@noodlestan/prettier-config/json`, spreads the base rules, declares `plugins: ['prettier-plugin-astro']`, and **concatenates** the base `overrides` with the appended `*.astro` entry.                                                                                                                                                                                       |
| `configs/prettier-config-astro/src/index.json`              | The Astro-only delta: `plugins` plus the single `*.astro` override. Deliberately not a complete config.                                                                                                                                                                                                                                                                                |
| `configs/prettier-config-astro/_records/package.art`        | `## Package: Prettier Config Astro` mirroring `$BASE` field-for-field; `Runtime` → `Package: Prettier Config`, `Peer` → Prettier + Prettier Plugin Astro, `Dev` → Prettier Plugin Astro, `Scripts` → the shared `Package Script Set: Prettier Config Scripts`.                                                                                                                         |
| `configs/prettier-config-astro/_records/npm-deployment.art` | `## NPM Package Deployment: Prettier Config Astro`, mirroring the base record; `**Build:**` and `**Deploy:**` kept identical.                                                                                                                                                                                                                                                          |
| `configs/prettier-config-astro/_guide.md`                   | Package guide: title, purpose sentence, `## Recommended Reading`, `## Package Layout`, `## Records Management`, `## Operating Instructions` with `Setting Up` and `Verifying Step` only.                                                                                                                                                                                               |
| `configs/prettier-config-astro/README.md`                   | Consumer adoption: the `prettier` field snippet, the peer-dependency guarantee for `prettier-plugin-astro`, and the `./json` subpath flagged as a partial Astro-only delta.                                                                                                                                                                                                            |
| `configs/prettier-config-astro/CHANGELOG.md`                | Populated `## 0.0.1` / `### Added` entry. Excluded from `files` and from `**Files:**`, matching `@noodlestan/tsconfig`.                                                                                                                                                                                                                                                                |
| `configs/prettier-config-astro/test/component.astro`        | Fixture with `---` frontmatter fences, an expression-mapped list, a `<script>` block and a scoped `<style>` block.                                                                                                                                                                                                                                                                     |
| `_records/dependencies/project-lint.art`                    | Appended `## Package Dependency: Prettier Plugin Astro` (`prettier-plugin-astro`, `1.1.0`).                                                                                                                                                                                                                                                                                            |
| `package.json`                                              | Added `"prettier-plugin-astro": "1.1.0"` to the root `devDependencies` next to `prettier`. The `workspaces` array is untouched.                                                                                                                                                                                                                                                        |
| `package-lock.json`                                         | Registered `configs/prettier-config-astro`, the `node_modules/@noodlestan/prettier-config-astro` link, and the `prettier-plugin-astro` tree.                                                                                                                                                                                                                                           |

#### Verification evidence

| Check                                                                           | Command                                                                                                  | Result                                                                                        |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Repository-wide CI                                                              | `npm run ci` at `$PROJECT`                                                                               | `PASS` — `turbo run ci` `5 successful, 5 total`, incl. `@noodlestan/prettier-config-astro:ci` |
| Repository-wide lint                                                            | `npm run lint`                                                                                           | `PASS` — `All matched files use Prettier code style!`                                         |
| New package lint (Verifying Step)                                               | `npm run lint` from `$PKG`                                                                               | `PASS` — `All matched files use Prettier code style!`                                         |
| New package test (Verifying Step)                                               | `npm run test` from `$PKG`                                                                               | `PASS` — `no tests yet`                                                                       |
| Astro parser resolves and the fixture is canonical                              | `npx prettier test/component.astro -c` from `$PKG`                                                       | `PASS` — `All matched files use Prettier code style!` (exit 0)                                |
| Base rules spread, not clobbered                                                | `node -e "const c=require('./src/index.cjs'); console.log(c.printWidth, c.overrides.length, c.plugins)"` | `PASS` — `100 2 [ 'prettier-plugin-astro' ]`                                                  |
| Base `overrides` entry survives the spread                                      | `JSON.stringify(c.overrides[0].files)`                                                                   | `PASS` — `*.js,*.cjs,*.mjs,*.mts,*.ts,*.tsx`                                                  |
| `*.astro` override appended, not replaced                                       | `JSON.stringify(c.overrides[1])`                                                                         | `PASS` — `{"files":["*.astro"],"options":{"useTabs":true,"parser":"astro"}}`                  |
| `plugins` entry present                                                         | `JSON.stringify(c.plugins)`                                                                              | `PASS` — `["prettier-plugin-astro"]`                                                          |
| `src/index.cjs` requires the base `./json` subpath rather than inlining rules   | source inspection                                                                                        | `PASS` — `require('@noodlestan/prettier-config/json')`                                        |
| Runtime dependency pinned exactly, so the workspace link wins over the registry | `pkg.dependencies['@noodlestan/prettier-config']`                                                        | `PASS` — `0.0.1` (no `^`)                                                                     |
| `npm ci` succeeds and links both packages from the local workspace              | `npm ci && npm ls @noodlestan/prettier-config`                                                           | `PASS` — `@noodlestan/prettier-config@0.0.1 -> ./configs/prettier-config`                     |
| Plugin resolvable in `$PKG`                                                     | `node -p "require('./node_modules/prettier-plugin-astro/package.json').version"`                         | `PASS` — `1.1.0`                                                                              |
| Plugin is both a peer and a dev dependency                                      | manifest inspection                                                                                      | `PASS` — `peerDependencies` and `devDependencies` both carry it                               |
| Root `devDependencies` gained only the plugin; `workspaces` unchanged           | `git diff -- package.json`                                                                               | `PASS` — 1 insertion; `["cli/*","configs/*"]` intact                                          |
| `Package Dependency: Prettier Plugin Astro` recorded                            | `grep` on `_records/dependencies/project-lint.art`                                                       | `PASS` — `prettier-plugin-astro`, `**Version:** 1.1.0`                                        |
| `CHANGELOG.md` populated and excluded from the published tarball                | `grep` on the changelog, the manifest, and `package.art`                                                 | `PASS` — `## 0.0.1` / `### Added` present; 0 matches in `files` and in `**Files:**`           |
| `README.md` warns that `./json` is an Astro-only delta                          | `grep` on `README.md`                                                                                    | `PASS` — `partial Astro-only delta`                                                           |
| `package.art` mirrors the base record field-for-field                           | field-by-field comparison against `$BASE/_records/package.art`                                           | `PASS` — only the 6 differences the instruction lists                                         |

#### Commits

| Commit                                                                                           | Policy   | Pushed              |
| ------------------------------------------------------------------------------------------------ | -------- | ------------------- |
| `scaffold(prettier-config-astro): Create \`@noodlestan/prettier-config-astro\` for Astro files.` | `NOPUSH` | No — `NO` by policy |

One commit, carrying the 12 implementation files plus this report. The commit message is pre-authored and was used verbatim.

### Deviations and judgement calls

1. **`"prettier": "./src/index.cjs"` was added to `$PKG/package.json` — the one unplanned change.** The prescribed check `npx prettier test/component.astro -c` from `$PKG` failed with `No parser could be inferred for file …/test/component.astro`. The instruction attributes this to _"the `plugins` entry is missing or the plugin is not installed — fix it before committing"_, but both were already correct: `src/index.cjs` declares `plugins: ['prettier-plugin-astro']` and `prettier-plugin-astro@1.1.0` was installed and resolvable. The real cause, proven with `npx prettier --find-config-path test/component.astro` → `../../.prettierrc`, is that **Prettier resolved the monorepo root `.prettierrc` for the fixture and therefore never loaded the package's own config**. The root `.prettierrc` declares no `plugins` and no `*.astro` entry, so the `astro` parser was unavailable. Repairing it therefore requires wiring the package's config into Prettier's resolution, and the minimal in-scope way is the `prettier` field on the package itself — the exact mechanism both READMEs document for consumers. This was chosen over the two alternatives because it touches a file the instruction already told me to author, adds one field, ships no stray file, and leaves the root `.prettierrc` untouched. Side benefit: before this change the root `prettier . -c` silently **skipped** `test/component.astro` entirely (no `.astro` extension support without a loaded plugin), so the fixture was never linted at all; afterwards the root lint picks it up and `npm run lint:fix` reformatted it.

2. **The alternative repair — editing `$PROJECT/.prettierrc` — was rejected.** Adding `plugins` and an `*.astro` override to the root config would also have made the fixture format, but `$PROJECT/.prettierrc` is neither in the instruction's `## Mandatory Reading`, nor in `## Changes`, nor in Final Verification. Modifying it would have silently changed the formatting rules of every package in the monorepo.

3. **`npm install` was run before `npm ci`.** The prescribed Step 4.1 `npm ci` failed with `EUSAGE` — `Missing: @noodlestan/prettier-config-astro@0.0.1 from lock file` — because a new workspace package cannot be added by `ci` alone. One `npm install` registered it, after which `npm ci` succeeds cleanly. `package-lock.json` is therefore part of the commit; `$PROJECT/package.json` itself gained exactly the one `devDependencies` entry the instruction authorised.

4. **`src/index.cjs` is tab-indented, not 2-space indented as in the instruction snippet.** The monorepo root `.prettierrc` overrides `*.cjs` with `useTabs: true`, so `npm run lint:fix` rewrote the file's indentation. Content is otherwise byte-identical to the snippet.

5. **`**Status:** DEPLOYED` recorded, as instructed.** The package has never been published; the RULE to mirror the sibling record was followed verbatim. The factual note is that the `publish-and-pin` iteration performs the first actual publication.

6. **`CHANGELOG.md` is not in `files` and not in `**Files:**`,** per the instruction's RULE and matching `@noodlestan/tsconfig`. It is nevertheless committed to the repository, matching that same precedent.

7. **`_records/*.art` files are not Prettier-formatted.** Prettier infers no parser for `.art`, so `prettier . -c` skips them; they were written by hand in the sibling's exact format and ordering.

8. **No `### Operating Instructions: Verifying Completion` section** was added to `_guide.md`, per the instruction's RULE.

### Feedback

_No `DIRECTIVE FEEDBACK:` accompanied this delegation, so this section is informational only._

#### For the planner

- **The Step 2 "three load-bearing things" list is correct but incomplete**, and the omission is what cost this iteration a debugging cycle. It correctly explains that `plugins` must be declared and that `overrides` must be concatenated, but it never states that the package's own config must be reachable by Prettier's config resolution for either to matter. The failure mode is silent in one direction and loud in the other: the root `prettier . -c` passes either way (it just skips `.astro`), so only the explicit `npx prettier test/component.astro -c` check exposes it.
- **The prescribed repair path in Step 4.3 was a dead end.** "the `plugins` entry is missing or the plugin is not installed" enumerates two causes that were both false. A third cause — config resolution — would have saved the detour.
- **If the intent is for `$PKG` to be self-linting, say so explicitly** and include the `prettier` field in the Step 1 `package.json` block. If instead the intent is for `$PKG` to lint against the monorepo root rules like `@noodlestan/prettier-config` does, then the prescribed Astro check cannot work as written and the fixture needs an explicit `--config` or `--plugin` flag.
- **The `package-lock.json` gap recurs.** Step 4.1 prescribes `npm ci` for a change that adds a workspace package and a new dependency, which is exactly the case `ci` refuses. `npm install` first would be a better default in future scaffolding instructions.
- **`**Version:**`on the new`Package Dependency: Prettier Plugin Astro`record and the`peerDependencies`range`^1.1.0` are consistent** — the dev dependency is pinned at `1.1.0` and the lockfile resolved `1.1.0`. No action needed.

#### For the technical writers

- **The `_records/npm-deployment.art` `**Status:** DEPLOYED` for an unpublished package is a documentation trap** that has now been reproduced across two sibling records. Consider a `PLANNED` or `UNPUBLISHED` status for freshly scaffolded packages, with `publish-and-pin` flipping it, so the record is never factually wrong at rest.
- **Two sibling config packages now resolve Prettier differently**: `@noodlestan/prettier-config` lints its fixtures against `$PROJECT/.prettierrc` (which is why `test/example.mjs` is space-indented — `$PROJECT/.prettierrc` omits `*.mjs` from its overrides), while `@noodlestan/prettier-config-astro` lints its fixture against its own config. That asymmetry is invisible from either package alone. Worth a line in the plan's Findings, and possibly a decision in a follow-up.
- **`$PROJECT/.prettierrc` and `@noodlestan/prettier-config` have already drifted** — the root config omits `*.mjs` from its `overrides` `files` array. The plan's own Decision record notes the root config also differs on `tabWidth` in an earlier draft. The Astro package now loads its own rules while the base package does not, which makes that drift easier to trip over.

#### For the crew

- `npm ci` cannot add a workspace package or a new dependency; run `npm install` first when scaffolding one.
- `prettier-plugin-astro@1.1.0` pulls `@astrojs/compiler-rs` with per-platform native bindings (10 optional packages in the lockfile, ~9 installed locally). The install is fast and clean on `darwin-arm64`, but the tree is noticeably larger than the current one — worth knowing before the nine consumer migrations.
- The root `npm run ci` gate picks up the new package automatically through the existing `configs/*` glob and turbo; no manual registration was needed for the CI wiring.
