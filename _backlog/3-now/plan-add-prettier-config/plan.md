# Plan: Add Prettier Config

**Id:** `add-prettier-config`

**Status:** `WORKING`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Noodlestan's Prettier formatting rules are duplicated, hand-edited, and divergent in every consumer repository because `@noodlestan/eslint-config` never shipped them.

**Description:** Create 2 new publishable packages — `Package: Prettier Config` holding the base rules, and `Package: Prettier Config Astro` holding the Astro-augmented rules — and adopt the base one in `Repository: Noodlestan Web` as the live-test consumer.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path                         | Purpose                                                        |
| ------------ | ------------------------------------- | -------------------------------------------------------------- |
| `$WORKSPACE` | Current working directory             | Workspace root directory.                                      |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains`          | Domain resources directory.                                    |
| `$PROJECT`   | Provided with prompt                  | Monorepo root hosting this plan and the new config packages.   |
| `$WEB`       | `$WORKSPACE/checkouts/noodlestan-web` | Consumer repository used to live-test and then pin the config. |

## Summary

Add 2 Prettier config packages to `$PROJECT/configs/` so formatting rules stop being copy-pasted per repository, then prove the base package in `$WEB`.

## Attachments

None.

## Context

### Upstream Work

| Kind    | Path                                                      | Role                                                            |
| ------- | --------------------------------------------------------- | --------------------------------------------------------------- |
| Plan    | `$PROJECT/_backlog/4-next/plan-add-astro-support/plan.md` | Downstream plan; consumes these packages. Blocked by this plan. |
| Project | `$PROJECT/_records/project.art`                           | Owns the packages created here.                                 |

### Required Skills

- `write-plan` — Generates plans from sources and context. Required for Drafting, Planning.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Planning.

### Domains

| Domain / Path                                 | Description                                                                        |
| --------------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md`       | Planning lifecycle for contextualising, drafting, planning, and integrating plans. |
| Domain: Work `$DOMAINS/work/index.md`         | Work item abstractions, workflows, and operating instructions.                     |
| Domain: Packages `$DOMAINS/packages/index.md` | Package, script, dependency, and NPM deployment structures.                        |
| Domain: Commits `$DOMAINS/commits/index.md`   | Commit blueprint and policy types used when executing this plan.                   |

### Resource Kinds in Scope

| Kind       | Domain       | Structure Record Path                             |
| ---------- | ------------ | ------------------------------------------------- |
| Project    | Projects     | `$DOMAINS/projects/structures/project.art`        |
| Repository | Repositories | `$DOMAINS/repositories/structures/repository.art` |
| Package    | Packages     | `$DOMAINS/packages/structures/package.art`        |
| Plan       | Plans        | `$DOMAINS/plans/structures/plan.art`              |

### Workflows

| Workflow / Path                                                                | Purpose                                                                       |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Workflow: Planning Work `$DOMAINS/work/workflows/planning-work/workflow.art`   | Create and manage work items lifecycle, collecting operational instructions.  |
| Workflow: Executing Work `$DOMAINS/work/workflows/executing-work/workflow.art` | Organize work execution to produce completed, verified outcomes and feedback. |

### Workflow Operations

| Workflow / Operation / Path                                                                                               | Purpose                                            |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Planning Work / Contextualizing Work Item `$DOMAINS/work/workflows/planning-work/contextualizing-work-item/operation.art` | Collect upstream sources, scope, and context.      |
| Planning Work / Drafting Work Item `$DOMAINS/work/workflows/planning-work/drafting-work-item/operation.art`               | Generate the work item record and its iterations.  |
| Planning Work / Planning Work Item `$DOMAINS/work/workflows/planning-work/planning-work-item/operation.art`               | Refine iterations, changes, and commit blueprints. |
| Planning Work / Writing Commit Message `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`       | Write standardized commit messages.                |
| Planning Work / Validating Work Item `$DOMAINS/work/workflows/planning-work/validating-work-item/operation.art`           | Check integrity before execution.                  |
| Executing Work / Setting Up `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`                             | Install dependencies in `$PROJECT`.                |
| Executing Work / Executing Work Step `$DOMAINS/work/workflows/executing-work/executing-work-step/operation.art`           | Carry out one iteration's changes.                 |
| Executing Work / Verifying Step `$DOMAINS/work/workflows/executing-work/verifying-step/operation.art`                     | Run package lint and test for one iteration.       |
| Executing Work / Verifying Completion `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`         | Run the monorepo CI gate before completion.        |
| Executing Work / Finalizing Execution `$DOMAINS/work/workflows/executing-work/finalizing-execution/operation.art`         | Publish versions and update records.               |

### Knowledge

::READ `$PROJECT/_guide.md` (Guide) — Monorepo layout, projects table, records management, setting up and verifying completion. Relevant for Planning Work Item, Setting Up, Verifying Completion.

::READ `$PROJECT/configs/eslint-config/_guide.md` (Guide) — Package layout and records pattern to mirror for the new config packages. Relevant for Drafting Work Item, Executing Work Step.

::READ `$PROJECT/configs/eslint-config/_records/package.art` (Record) — Package record shape to mirror. Relevant for Drafting Work Item, Executing Work Step.

::READ `$PROJECT/_records/dependencies/project-lint.art` (Record) — Existing lint dependency set, extended with the Prettier plugins. Relevant for Planning Work Item, Executing Work Step.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Commit types, scopes, and rules. Relevant for Writing Commit Message.

::READ `$DOMAINS/packages/structures/package.art` (Structure) — Package record fields, including `Files`, `Dependencies`, `Scripts`, and `Deployment`. Relevant for Drafting Work Item, Executing Work Step.

## Scope

2 packages created under `$PROJECT/configs/`, 1 monorepo record and guide update, 1 consumer repository migrated off its hand-written Prettier config.

### (Scope) Project: Noodlestan Workspace Tooling

**Record:** `$PROJECT/_records/project.art`

**Role:** — Owns the packages created by this plan.

**Partial:**

- `owner` — Project: Noodlestan Management
- `path` — `$PROJECT/`
- `resources` — currently Package: ESBuild CLI, Package: ESLint Config, Package: TS Config

**Changes:**

- Add `Package: Prettier Config` and `Package: Prettier Config Astro` to `resources`.

### (Scope) Repository: Workspace Tooling

**Record:** `$PROJECT/_records/repository.art`

**Role:** — Hosts this plan and both new packages. Changes required.

**Partial:**

- `owner` — Project: Noodlestan Workspace Tooling
- `path` — `$PROJECT/`
- `workspaces` — `cli/*`, `configs/*` — already covers `$PROJECT/configs/prettier-config*`

**Changes:**

- Add `_backlog/` state directories `0-archive` through `9-inbox`, with `3-now/` and `4-next/` holding the plans.
- Create `$PROJECT/configs/prettier-config/` and `$PROJECT/configs/prettier-config-astro/`.
- Extend `$PROJECT/_records/dependencies/project-lint.art` with the Prettier plugin dependencies.
- Update `$PROJECT/_guide.md` projects table and `$PROJECT/README.md`.
- Add `prettier-plugin-astro` to the root `devDependencies` so the monorepo's own `prettier . -c` can parse `.astro` fixtures.

**Operations:**

- Run `npm ci` at `$PROJECT` after the workspace globs pick up the new packages.
- Run `npm run ci` at `$PROJECT` before completion.

### (Scope) Package: Prettier Config

**Record:** To be created at `$PROJECT/configs/prettier-config/_records/package.art`.

**Role:** — Created by this plan. Ships the base formatting rules for every Noodlestan repository.

**Partial:**

- `owner` — Project: Noodlestan Workspace Tooling
- `path` — `$PROJECT/configs/prettier-config/`
- `canonicalName` — `@noodlestan/prettier-config`
- `deployment` — NPM Package Deployment: Prettier Config
- `dependencies` — `prettier` as peer only; no runtime dependencies

**Changes:**

- Create `package.json` with `main`, `exports` map, `files`, `private: false`, and `ci` scripts.
- Create `src/index.json` (the canonical rules) and `src/index.cjs` (the same rules, requiring the JSON) so both ESM and CJS consumers resolve.
- Create `_guide.md`, `README.md`, `LICENSE-MIT`, `_records/package.art`, `_records/npm-deployment.art`.
- Create `test/` fixtures covering `.ts`, `.md`, `.json`, and `.html` formatting.

**Operations:**

- Bump minor version and publish with `npm run art-work publish`.

**Dependencies:**

- None.

### (Scope) Package: Prettier Config Astro

**Record:** To be created at `$PROJECT/configs/prettier-config-astro/_records/package.art`.

**Role:** — Created by this plan. Extends the base rules with Astro parsing.

**Partial:**

- `owner` — Project: Noodlestan Workspace Tooling
- `path` — `$PROJECT/configs/prettier-config-astro/`
- `canonicalName` — `@noodlestan/prettier-config-astro`
- `deployment` — NPM Package Deployment: Prettier Config Astro
- `dependencies` — `@noodlestan/prettier-config`, `prettier-plugin-astro`

**Changes:**

- Create `package.json` depending on `Package: Prettier Config` and on `prettier-plugin-astro`.
- Create `src/index.json` spreading the base rules and adding an `overrides` entry for `*.astro` with `parser: astro`, plus `*.md` and `*.mdx` entries.
- Create `_guide.md`, `README.md`, `LICENSE-MIT`, `_records/package.art`, `_records/npm-deployment.art`.
- Create `test/component.astro` fixture proving the Astro parser is applied.

**Operations:**

- Bump minor version and publish with `npm run art-work publish`.

**Dependencies:**

- `Package: Prettier Config` must exist first; the Astro config spreads its rules.
- None.

### (Scope) Repository: Noodlestan Web

**Record:** `$WEB/_records/repository.art`

**Role:** — Live-test consumer. Proves the base package produces no unexpected reformatting before the Astro package exists.

**Partial:**

- `owner` — Project: Noodlestan Web
- `path` — `$WEB/`

**Changes:**

- Link `@noodlestan/prettier-config` into `$WEB/node_modules/@noodlestan/` for live testing.
- Replace `$WEB/.prettierrc` with a `prettier` field in `$WEB/package.json` pointing at `@noodlestan/prettier-config`.
- Run `npm run lint:fix` and confirm the resulting diff contains only the `.mjs` extension now covered by the `overrides` list.

**Dependencies:**

- None.

## Execution Context

Execution is coordinated from `$WORKSPACE`. Monorepo work runs in `$PROJECT` on a feature branch; consumer verification runs in `$WEB`. Packages are published from `$PROJECT` before `$WEB` pins released versions in place of the local link.

---

## Items:

| Iteration / Instructions                                                                                            | Status    |
| ------------------------------------------------------------------------------------------------------------------- | --------- |
| Iteration: Scaffold Prettier Config `plan-add-prettier-config/instructions/scaffold-prettier-config.md`             | `DONE`    |
| Iteration: Scaffold Prettier Config Astro `plan-add-prettier-config/instructions/scaffold-prettier-config-astro.md` | `DONE`    |
| Iteration: Adopt Base Config in Noodlestan Web `plan-add-prettier-config/instructions/adopt-base-config-in-web.md`  | `DONE`    |
| Iteration: Publish and Pin `plan-add-prettier-config/instructions/publish-and-pin.md`                               | `WORKING` |

### Iteration: Scaffold Prettier Config

**Id:** `scaffold-prettier-config`

**Status:** `DONE`

**Purpose:** Create the base Prettier config package holding the canonical rules.

**Description:** Create `$PROJECT/configs/prettier-config/` following the layout of `$PROJECT/configs/eslint-config/`: `package.json`, `src/index.json`, `src/index.cjs`, `test/` fixtures, `_guide.md`, `README.md`, `LICENSE-MIT`, `CHANGELOG.md`, and `_records/`. The package is created directly at `0.0.1` — the version it will first be published as — with `CHANGELOG.md` already carrying a populated `## 0.0.1` entry, so nothing has to be back-filled or bumped at release time. Register the package in `$PROJECT/_records/project.art` and in the Projects table of `$PROJECT/_guide.md`. The existing `configs/*` workspace glob already includes it, and the root already depends on `prettier`, so `$PROJECT/package.json` needs no edit at all.

**Instructions:** `./plan-add-prettier-config/instructions/scaffold-prettier-config.md`

**Report:** `./plan-add-prettier-config/instructions/scaffold-prettier-config__report.md`

**Changes:**

- Create `$PROJECT/configs/prettier-config/package.json` at version `0.0.1`, with `exports` for `.`, `./json`, and a `files` list covering `src`, `_guide.md`, `README.md`, `LICENSE-MIT`. `CHANGELOG.md` is deliberately excluded from `files`, matching `@noodlestan/tsconfig`.
- Create `$PROJECT/configs/prettier-config/src/index.json` holding the canonical base rules verbatim, as recorded in the Decisions section.
- Create `$PROJECT/configs/prettier-config/src/index.cjs` requiring the JSON, so CJS consumers and `.prettierrc.cjs` consumers work.
- Create `$PROJECT/configs/prettier-config/_records/package.art` and `$PROJECT/configs/prettier-config/_records/npm-deployment.art`.
- Create `$PROJECT/configs/prettier-config/_guide.md` and `README.md` documenting the `prettier` field usage in a consumer `package.json`.
- Create `$PROJECT/configs/prettier-config/CHANGELOG.md` with a populated `## 0.0.1` / `### Added` entry describing the shipped rules and the `./json` export.
- Create `$PROJECT/configs/prettier-config/test/` fixtures for `.ts`, `.mjs`, `.md`, `.json`, and `.html` and a `ci` script that formats them.

**Dependencies:**

- None.

#### Commits:

| ID                         | Repository / Checkout / Branch                         | Policy   | Hash      | Status      |
| -------------------------- | ------------------------------------------------------ | -------- | --------- | ----------- |
| `scaffold-prettier-config` | Workspace Tooling / `$PROJECT` / `add-prettier-config` | `NOPUSH` | `838dfc1` | `COMMITTED` |

##### Commit: `scaffold-prettier-config`

**Repository:** Workspace Tooling

**Message:**

```
scaffold(prettier-config): Create `@noodlestan/prettier-config` with the base formatting rules.

- Add `src/index.json` and `src/index.cjs` carrying the canonical base rules.
- Add `test/` fixtures for `.ts`, `.mjs`, `.md`, `.json`, and `.html` with a `ci` script.
- Register `Package: Prettier Config` in `$PROJECT/_records/project.art` and `$PROJECT/_guide.md`.
```

### Iteration: Scaffold Prettier Config Astro

**Id:** `scaffold-prettier-config-astro`

**Status:** `DONE`

**Purpose:** Create the Astro-augmented Prettier config package.

**Description:** Create `$PROJECT/configs/prettier-config-astro/` that depends on `@noodlestan/prettier-config` and on `prettier-plugin-astro`, spreads the base rules unchanged, and appends a second `overrides` entry for `*.astro` setting `useTabs: true` alongside `parser: astro`. Prettier merges every matching `overrides` entry in order, so the appended entry adds Astro options without disturbing the base entries. Keeping the plugin in a separate package means non-Astro consumers never install it. Add `Package Dependency: Prettier Plugin Astro` to `$PROJECT/_records/dependencies/project-lint.art`.

Two constraints shape the implementation. Prettier 3 removed plugin auto-search from `node_modules`, so the config must declare `plugins: ["prettier-plugin-astro"]` explicitly; without that entry the `astro` parser cannot be resolved and `.astro` files fail to format. And JSON cannot spread, so the Astro entry point is a `.cjs` that requires the base package's `./json` subpath, spreads it, and concatenates `overrides` — which keeps the base rules in exactly one place instead of duplicating them.

**Instructions:** `./plan-add-prettier-config/instructions/scaffold-prettier-config-astro.md`

**Report:** `./plan-add-prettier-config/instructions/scaffold-prettier-config-astro__report.md`

**Changes:**

- Create `$PROJECT/configs/prettier-config-astro/package.json` depending on `Package: Prettier Config` and on `prettier-plugin-astro` as a peer.
- Create `$PROJECT/configs/prettier-config-astro/src/index.cjs` requiring `@noodlestan/prettier-config/json`, spreading the base rules, adding `plugins: ["prettier-plugin-astro"]`, and appending an `overrides` entry for `*.astro` with `useTabs: true` and `parser: astro`.
- Create `$PROJECT/configs/prettier-config-astro/src/index.json` carrying only the Astro-specific delta, for consumers that prefer a static JSON config.
- Add `Package Dependency: Prettier Plugin Astro` to `$PROJECT/_records/dependencies/project-lint.art`.
- Add `prettier-plugin-astro` to the root `devDependencies` in `$PROJECT/package.json` so the monorepo's own `prettier . -c` resolves the plugin declared by the fixture config.
- Create `$PROJECT/configs/prettier-config-astro/_records/package.art` and `_records/npm-deployment.art`, `_guide.md`, `README.md`.
- Create `$PROJECT/configs/prettier-config-astro/CHANGELOG.md` with a populated `## 0.0.1` / `### Added` entry describing the `*.astro` override and the `prettier-plugin-astro` peer dependency.
- Create `$PROJECT/configs/prettier-config-astro/test/component.astro` fixture and a `ci` script proving the Astro parser is applied.

**Dependencies:**

- Iteration: Scaffold Prettier Config.

#### Commits:

| ID                               | Repository / Checkout / Branch                         | Policy   | Hash      | Status      |
| -------------------------------- | ------------------------------------------------------ | -------- | --------- | ----------- |
| `scaffold-prettier-config-astro` | Workspace Tooling / `$PROJECT` / `add-prettier-config` | `NOPUSH` | `bb136f8` | `COMMITTED` |

##### Commit: `scaffold-prettier-config-astro`

**Repository:** Workspace Tooling

**Message:**

```
scaffold(prettier-config-astro): Create `@noodlestan/prettier-config-astro` for Astro files.

- Add a `*.astro` override with `useTabs: true` and `parser: astro` on top of the base rules.
- Add `prettier-plugin-astro` to the dependency set and to the root `devDependencies`.
- Add `test/component.astro` fixture and package records.
```

### Iteration: Adopt Base Config in Noodlestan Web

**Id:** `adopt-base-config-in-web`

**Status:** `DONE`

**Purpose:** Prove the base package is a drop-in replacement for the hand-written `$WEB/.prettierrc`.

**Description:** Link the package into `$WEB/node_modules/@noodlestan/`, replace `$WEB/.prettierrc` with a `prettier` field in `$WEB/package.json`, run `npm run lint`, and confirm a clean result. The shipped base rules are byte-identical to the `$WEB` hand-written `.prettierrc` — both already list `*.mjs` in the `overrides` array — so adopting the package must produce **zero** file changes and `All matched files use Prettier code style!` on the first run. Any diff at all means the shipped package is not equivalent and must be corrected in `$PROJECT`, never papered over in `$WEB`.

**Instructions:** `./plan-add-prettier-config/instructions/adopt-base-config-in-web.md`

**Report:** `./plan-add-prettier-config/instructions/adopt-base-config-in-web__report.md`

**Changes:**

- Link the package into `$WEB` for live testing, from `$WEB/node_modules/@noodlestan`:

  ```bash
  rm -rf prettier-config && ln -s ../../../workspace-tooling/configs/prettier-config prettier-config
  ```

- Delete `$WEB/.prettierrc` and add `"prettier": "@noodlestan/prettier-config"` to `$WEB/package.json`.
- Declare `@noodlestan/prettier-config` in the `$WEB` root `devDependencies` only in `publish-and-pin`; while the symlink stands the `prettier` field resolves it without a declared version.
- Run `npm run lint` in `$WEB` and confirm it passes with an empty diff; run `lint:fix` only if it does not, and treat any resulting change as a defect in `$PROJECT`.
- Update `$WEB/_guide.md` to document the `prettier` field instead of a `.prettierrc` file.

**Dependencies:**

- Iteration: Scaffold Prettier Config.

#### Commits:

| ID                      | Repository / Checkout / Branch                  | Policy   | Hash      | Status      |
| ----------------------- | ----------------------------------------------- | -------- | --------- | ----------- |
| `adopt-prettier-config` | Noodlestan Web / `$WEB` / `add-prettier-config` | `NOPUSH` | `342054f` | `COMMITTED` |

##### Commit: `adopt-prettier-config`

**Repository:** Noodlestan Web

**Message:**

```
tooling(noodlestan-web): Adopt `@noodlestan/prettier-config` through the `prettier` field.

- Delete `.prettierrc` and set `prettier` in `package.json` instead.
- Document the `prettier` field in `_guide.md`.
```

### Iteration: Publish and Pin

**Id:** `publish-and-pin`

**Status:** `WORKING`

**Purpose:** Publish both packages and replace the local link in `$WEB` with released versions.

**Description:** Both packages are already at `0.0.1` with a populated `CHANGELOG.md`, having been created at that version, so this iteration performs no version bump. Run `npm run art-work publish` from `$WORKSPACE` after crew approval, then in `$WEB` drop the symlink, install the released `@noodlestan/prettier-config` version, and re-run `npm run lint` to confirm the pinned result matches the linked result. Update the NPM Deployment records and `$PROJECT/README.md`.

**Instructions:** `./plan-add-prettier-config/instructions/publish-and-pin.md`

**Changes:**

- Confirm both new `package.json` files declare `0.0.1` and that both `CHANGELOG.md` files carry a `## 0.0.1` entry; this is a verification step, not a bump.
- Run `npm run art-work publish` from `$WORKSPACE`.
- Remove the `$WEB/node_modules/@noodlestan/prettier-config` symlink and add `"@noodlestan/prettier-config": "0.0.1"` to the `$WEB` root `devDependencies`.
- Re-run `npm run lint` in `$WEB` and confirm parity with the linked run.
- Update both `_records/npm-deployment.art` records and the `$PROJECT/README.md` package list.

**Dependencies:**

- Iteration: Adopt Base Config in Noodlestan Web.
- Iteration: Scaffold Prettier Config Astro.

#### Commits:

| ID                         | Repository / Checkout / Branch                         | Policy     | Hash  | Status     |
| -------------------------- | ------------------------------------------------------ | ---------- | ----- | ---------- |
| `release-prettier-configs` | Workspace Tooling / `$PROJECT` / `add-prettier-config` | `NOCOMMIT` | (TBD) | `AUTHORED` |
| `pin-prettier-config`      | Noodlestan Web / `$WEB` / `add-prettier-config`        | `NOPUSH`   | (TBD) | `AUTHORED` |

##### Commit: `release-prettier-configs`

**Repository:** Workspace Tooling

**Message:**

```
release(workspace-tooling): Publish `prettier-config` and `prettier-config-astro` 0.0.1.

- Both packages were scaffolded at `0.0.1` with populated changelogs; run `npm run art-work publish` after crew approval.
- Update both `_records/npm-deployment.art` records and the `$PROJECT/README.md` package list.
```

**Policy:** `NOCOMMIT` — publishing to the public registry is irreversible; stage the changes and hand back for crew commit and publish.

##### Commit: `pin-prettier-config`

**Repository:** Noodlestan Web

**Message:**

```
tooling(noodlestan-web): Pin `@noodlestan/prettier-config` to the published release.

- Replace the local link with the released version.
- Confirm `npm run lint` matches the linked run.
```

## Work

### Next

Iterations `scaffold-prettier-config`, `scaffold-prettier-config-astro`, and `adopt-base-config-in-web` are `DONE`, at `838dfc1`, `bb136f8`, and `342054f` (none pushed). Next move is to delegate `publish-and-pin` to `agent-worker`, which stops at its crew gate.

## Operating Instructions

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write a message following: `{Type}({Scope}): {Description}.` max 120 chars, optionally followed by up 3 bullet points, max 100 chars each.
3. Use only values of `Type`, `Scope`, and valid `Type–Scope` associations defined there, along with examples, and rules.

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`.

**Instructions:** (From `$PROJECT/_guide.md`)

Run from `$PROJECT`:

```bash
npm ci # to install dependencies, including the new workspace packages.
```

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from `$WEB/node_modules/@noodlestan` before live-testing, so the `prettier` field resolves the local package:

```bash
rm -rf prettier-config && ln -s ../../../workspace-tooling/configs/prettier-config prettier-config
```

### Verifying Step

**Purpose:** Verify the changes produced by one iteration. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-step/operation.art`.

**Instructions:** (From `$PROJECT/configs/eslint-config/_guide.md`)

Run from the package directory:

```bash
npm run lint # to report other issues (prettier, eslint)
npm run test # to run all tests
```

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`.

**Instructions:** (From `$PROJECT/_guide.md`)

Runs automatically on pre-commit hook, from `$PROJECT`:

```bash
npm run ci # lint, test and build
```

---

## Coordination

### Not In Scope

- **Astro ESLint support** — Handled by `Plan: Add Astro Support` in `$PROJECT/_backlog/4-next/`.
- **Adopting the config in other consumers** — The 9 repositories listed under `Consumers` in `$PROJECT/_records/repository.art` each need their own plan and migration pass.
- **Prettier ignore policy** — A shared `.prettierignore` is a separate concern; this plan only defines formatting rules.

### Evidence

- `$PROJECT/configs/prettier-config/test/` and `$PROJECT/configs/prettier-config-astro/test/` are unchanged by their own `ci` scripts after a clean run.
- In `$WEB`, after replacing `.prettierrc`, `npm run lint` passes with **zero** files reformatted, because the shipped rules are byte-identical to the config they replaced. A non-empty diff is a defect in `$PROJECT`.

### Findings

- **A package's own Prettier config is not used to lint itself by default** — `prettier` resolves config by walking up from the file, so `$PROJECT/.prettierrc` wins over `configs/prettier-config-astro/src/index.cjs` unless the `prettier` field points at it. `configs/prettier-config/` still lints its fixtures against the root config; `configs/prettier-config-astro/` lints against its own. That asymmetry is invisible from either package alone.
- **The shipped rules and `$PROJECT/.prettierrc` already diverge on `*.mjs`** — the root config omits `*.mjs` from its tab override, the shipped base rules include it. Adding the `prettier` field to `configs/prettier-config/package.json` made each package lint against its own config and surfaced this at once. Impact on migration is accepted and tracked under `## Follow Ups`.
- **`npm ci` cannot add a workspace package or a new dependency** — it fails with `EUSAGE` on a missing lockfile entry. Scaffolding iterations need `npm install` first, then `npm ci`.

- **Prettier config was never shipped** — `files` in `$PROJECT/configs/eslint-config/package.json` covers `src`, `.eslintrc.cjs`, `README.md`, and `LICENSE-MIT` only. The `.prettierrc` sitting next to it is excluded from the published tarball, which is why every consumer hand-writes its own and why they drifted apart.
- **Two divergent rule sets existed** — `$WEB/.prettierrc` used `tabWidth: 2` with `useTabs: true` for JS-family files; `$PROJECT/configs/eslint-config/.prettierrc` used `tabWidth: 4` with 2-space overrides for `md`, `json`, and `html`. Publishing the second verbatim would have re-indented every consumer.

### Decisions

- **Canonical base rules are byte-identical to `$WEB`'s existing `.prettierrc`** — `useTabs: false`, `printWidth: 100`, `tabWidth: 2`, `semi: true`, `singleQuote: true`, `trailingComma: "all"`, `arrowParens: "avoid"`, with `overrides` setting `useTabs: true` for `["*.js", "*.cjs", "*.mjs", "*.mts", "*.ts", "*.tsx"]`. Both files already list `*.mjs`, so adopting the package is provably a no-op on formatting — which is what makes it a trustworthy drop-in. The rules were lifted from `$WEB` rather than from `$PROJECT/configs/eslint-config/.prettierrc`, which uses `tabWidth: 4` with 2-space overrides for `md`, `json`, and `html` and would have re-indented every consumer.
- **Two packages, not one** — The base rules and the Astro-augmented rules ship separately so that non-Astro consumers never install `prettier-plugin-astro`, and so the Astro variant can evolve independently.
- **JSON plus CJS entry points** — Prettier resolves a `prettier` config field through Node resolution, so the package ships both `index.json` and `index.cjs` to work for ESM and CJS consumers without a build step.

### Knowledge to Update

- `$PROJECT/_guide.md` — add both packages to the Projects table. The backlog pointer at `_backlog/` is already recorded.
- `$PROJECT/_records/project.art` — add `Package: Prettier Config` and `Package: Prettier Config Astro` to `resources`.
- `$PROJECT/README.md` — document both packages and how a consumer adopts them.

### Follow Ups

- **ACCEPTED IMPACT — adopting `@noodlestan/prettier-config` re-indents every `*.mjs` file from 2 spaces to tabs.** The shipped base rules put `*.mjs` in the `useTabs: true` override; `$PROJECT/.prettierrc`, which formats the monorepo today, omits `*.mjs` and so leaves those files at `tabWidth: 2`. This was confirmed by adding the `prettier` field to `configs/prettier-config/package.json`, which immediately exposed the divergence. In this monorepo alone it re-indents 10 files under `cli/esbuild-cli/`; each of the 9 consumer repositories carries its own unknown count.
  - This impact is EXPECTED and ACCEPTED. It is a property of the shipped rules, not a defect in them: `$WEB/.prettierrc` already listed `*.mjs`, which is why its adoption pass produced zero diff, and that parity was the evidence iteration 3 was designed to produce.
  - Every migration must therefore EXPECT a `*.mjs` re-indent and treat it as correct output, not as a failed equivalence check. The strict "zero diff" acceptance criterion used in `adopt-base-config-in-web` only holds for a consumer whose existing config already matched the shipped rules exactly.
  - Follow-up plans must replace "confirm zero diff" with "confirm the diff contains only `*.mjs` re-indentation" — the criterion this plan used to write before the criterion was corrected by the iteration 3 blueprint.
- Migrate the remaining 9 consumer repositories to `@noodlestan/prettier-config`, each with the `*.mjs` re-indent expectation above.
- Consider a shared `@noodlestan/prettier-ignore` or documenting a single ignore convention in `$PROJECT/README.md`.

### Feedback

- Iteration `scaffold-prettier-config` completed at `838dfc1`; `npm run ci` at `$PROJECT` passes and `@noodlestan/prettier-config` resolves through the workspace link.
- Iteration `adopt-base-config-in-web` completed at `342054f` in `$WEB`. Equivalence is proven: `$WEB/.prettierrc` and `$PROJECT/configs/prettier-config/src/index.json` were byte-identical (`sha256 39c28bb1…`), and `npm run lint` passed with zero reformatting on the first run, exactly as `## Evidence` predicted. The local `node_modules/@noodlestan/prettier-config` symlink is the prescribed live-test mechanism; the `devDependencies` declaration belongs to `publish-and-pin`.
- Iteration `scaffold-prettier-config-astro` completed at `bb136f8`; `npm run ci` passes for all 5 packages. The worker added one unplanned field — `"prettier": "./src/index.cjs"` in `$PROJECT/configs/prettier-config-astro/package.json` — because Prettier's resolution picked up `$PROJECT/.prettierrc` for the `test/component.astro` fixture, so the package's own config was never loaded and the `astro` parser was unavailable. The instruction's prescribed causes were both false; editing the root `.prettierrc` instead was correctly rejected as out of scope. Worth capturing in a follow-up: `npm install` must precede `npm ci` when a scaffolding iteration adds a workspace package.
