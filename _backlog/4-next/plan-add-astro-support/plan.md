# Plan: Add Astro Support to ESLint

**Id:** `add-astro-support`

**Status:** `DRAFT`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** `.astro` files are skipped by `eslint .` in Astro repositories, so lint rules only apply through the VS Code Astro extension and never from the CLI.

**Description:** Add an Astro ESLint override to `@noodlestan/eslint-config` mirroring the existing Solid and MDX overrides, exercise it with an `.astro` fixture inside the package, then live-tune it against `Repository: Noodlestan Web` through a local package link before publishing.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable      | Resolved Path                            | Purpose                                                        |
| ------------- | ---------------------------------------- | -------------------------------------------------------------- |
| `$WORKSPACE`  | Current working directory                | Workspace root directory.                                      |
| `$DOMAINS`    | `$WORKSPACE/.agents/domains`             | Domain resources directory.                                    |
| `$ROOT`       | `$WORKSPACE/checkouts/workspace-tooling` | Monorepo root hosting this plan and the config packages.       |
| `$WEB`        | `$WORKSPACE/checkouts/noodlestan-web`    | Consumer repository used to live-tune and then pin the config. |
| `$PKG_ESLINT` | `$ROOT/configs/eslint-config/`           | Package receiving the Astro ESLint override.                   |

## Summary

Extend `@noodlestan/eslint-config` with Astro parsing and rule coverage so `eslint .` acts on `.astro` files; the Prettier side is already delivered by upstream `Plan: Add Prettier Config`.

## Attachments

None.

## Context

### Upstream Work

| Kind    | Path                                                     | Role                                                                                                                                                               |
| ------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Plan    | `$ROOT/_backlog/1-done/plan-add-prettier-config/plan.md` | `DONE`. Ships `@noodlestan/prettier-config` and `@noodlestan/prettier-config-astro`; its `prettier-plugin-astro` install satisfies this plan's fixture dependency. |
| Project | `$ROOT/_records/project.art`                             | Owns the packages changed here.                                                                                                                                    |

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
| Workflow: Planning Work `$DOMAINS/work/workflows/planning-work/workflow.art`   | Create and manage work items lifecycle, collecting operating instructions.    |
| Workflow: Executing Work `$DOMAINS/work/workflows/executing-work/workflow.art` | Organize work execution to produce completed, verified outcomes and feedback. |

### Workflow Operations

| Workflow / Operation / Path                                                                                               | Purpose                                            |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Planning Work / Contextualizing Work Item `$DOMAINS/work/workflows/planning-work/contextualizing-work-item/operation.art` | Collect upstream sources, scope, and context.      |
| Planning Work / Drafting Work Item `$DOMAINS/work/workflows/planning-work/drafting-work-item/operation.art`               | Generate the work item record and its iterations.  |
| Planning Work / Planning Work Item `$DOMAINS/work/workflows/planning-work/planning-work-item/operation.art`               | Refine iterations, changes, and commit blueprints. |
| Planning Work / Writing Commit Message `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`       | Write standardized commit messages.                |
| Planning Work / Validating Work Item `$DOMAINS/work/workflows/planning-work/validating-work-item/operation.art`           | Check integrity before execution.                  |
| Executing Work / Setting Up `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`                             | Install dependencies in `$ROOT` and link packages. |
| Executing Work / Executing Work Step `$DOMAINS/work/workflows/executing-work/executing-work-step/operation.art`           | Carry out one iteration's changes.                 |
| Executing Work / Verifying Step `$DOMAINS/work/workflows/executing-work/verifying-step/operation.art`                     | Run package lint and test for one iteration.       |
| Executing Work / Verifying Completion `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`         | Run the monorepo CI gate before completion.        |
| Executing Work / Finalizing Execution `$DOMAINS/work/workflows/executing-work/finalizing-execution/operation.art`         | Publish versions and update records.               |

### Knowledge

::READ `$ROOT/_guide.md` (Guide) — Monorepo layout, projects table, records management, setting up and verifying completion. Relevant for Planning Work Item, Setting Up, Verifying Completion.

::READ `$ROOT/configs/eslint-config/_guide.md` (Guide) — Package layout, records pattern, and the `npm run lint` / `npm run test` verification pair. Relevant for Planning Work Item, Verifying Step.

::READ `$ROOT/configs/eslint-config/src/config/mdx.cjs` (Config) — The override pattern to mirror for `.astro` files. Relevant for Drafting Work Item, Executing Work Step.

::READ `$ROOT/configs/eslint-config/src/config/solid.cjs` (Config) — The typed-override pattern with `parser`, `parserOptions`, and `env` to mirror. Relevant for Drafting Work Item, Executing Work Step.

::READ `$ROOT/configs/eslint-config/src/index.cjs` (Config) — Override registration order and `ignorePatterns`, which determine whether ESLint collects `.astro` files at all. Relevant for Drafting Work Item, Executing Work Step.

::READ `$ROOT/_backlog/1-done/plan-add-prettier-config/plan.md` (Plan) — Upstream plan (`DONE`) shipping the Prettier packages this plan consumes. Relevant for Planning Work Item, Executing Work Step.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Commit types, scopes, and rules. Relevant for Writing Commit Message.

## Scope

1 config package extended with an Astro override and 2 new dependencies; 1 consumer repository live-tuned against the linked override and pinned to the published release.

### (Scope) Project: Noodlestan Workspace Tooling

**Record:** `$ROOT/_records/project.art`

**Role:** — Owns the packages changed by this plan.

**Partial:**

- `owner` — Project: Noodlestan Management
- `path` — `$ROOT/`

### (Scope) Repository: Workspace Tooling

**Record:** `$ROOT/_records/repository.art`

**Role:** — Hosts this plan and the config packages. Changes required.

**Partial:**

- `owner` — Project: Noodlestan Workspace Tooling
- `path` — `$ROOT/`
- `workspaces` — `cli/*`, `configs/*` — already covers both changed packages

**Changes:**

- Add `Package Dependency: ESLint Plugin Astro` and `Package Dependency: Astro ESLint Parser` to `$ROOT/_records/dependencies/project-lint.art`.
- Update `$ROOT/configs/eslint-config/README.md` with the Astro support note.

### (Scope) Package: ESLint Config

**Record:** `$ROOT/configs/eslint-config/_records/package.art`

**Role:** — Changes required. Gains the `.astro` override so ESLint parses and lints Astro single-file components.

**Partial:**

- `owner` — Project: Noodlestan Workspace Tooling
- `path` — `$ROOT/configs/eslint-config/`
- `canonicalName` — `@noodlestan/eslint-config`
- `deployment` — NPM Package Deployment: ESLint Config
- `language` — JavaScript (CJS)
- `engines` — Node `>= 22`

**Changes:**

- Add `eslint-plugin-astro` and `astro-eslint-parser` to `dependencies`.
- Create `src/config/astro.cjs` mirroring `src/config/mdx.cjs` and `src/config/solid.cjs`.
- Register the new override in `src/index.cjs` and extend `ignorePatterns` with `**/.astro/`.
- Add `test/component.astro` and include `.astro` in `test/tsconfig.json`.
- Add a `*.astro` entry to `configs/eslint-config/.prettierrc` so the package's own `prettier . -c` can parse the fixture.

**Operations:**

- Bump minor version and publish with `npm run art-work publish`.

**Dependencies:**

- None — upstream `Plan: Add Prettier Config` is `DONE`; `prettier-plugin-astro` resolves from `$ROOT`.

### (Scope) Repository: Noodlestan Web

**Record:** `$WEB/_records/repository.art`

**Role:** — Live-test consumer. The only known Astro consumer, used to surface rule conflicts before publication.

**Partial:**

- `owner` — Project: Noodlestan Web
- `path` — `$WEB/`

**Changes:**

- Link `@noodlestan/eslint-config` into `$WEB/node_modules/@noodlestan/`.
- Run `npm run lint:fix` and classify every new `.astro` violation as a config gap or a project defect.
- Commit config gaps to `$ROOT` and project defects to `$WEB`.
- Replace the link with the published version once tuning is complete.

**Dependencies:**

- `Plan: Add Prettier Config` — `DONE`; the Astro Prettier config is already pinned in `$WEB`, so this plan only links the ESLint config.

## Execution Context

Execution is coordinated from `$WORKSPACE`. Package work runs in `$ROOT`; live tuning runs in `$WEB` against linked packages before both are published and `$WEB` pins released versions.

---

## Items:

| Iteration / Instructions                                                                                        | Status  |
| --------------------------------------------------------------------------------------------------------------- | ------- |
| Iteration: Add Astro ESLint Dependencies `plan-add-astro-support/instructions/add-astro-eslint-dependencies.md` | `DRAFT` |
| Iteration: Create Astro ESLint Override `plan-add-astro-support/instructions/create-astro-eslint-override.md`   | `DRAFT` |
| Iteration: Exercise Astro Fixture `plan-add-astro-support/instructions/exercise-astro-fixture.md`               | `DRAFT` |
| Iteration: Tune Astro Rules `plan-add-astro-support/instructions/tune-astro-rules.md`                           | `DRAFT` |
| Iteration: Publish and Pin `plan-add-astro-support/instructions/publish-and-pin.md`                             | `DRAFT` |

### Iteration: Add Astro ESLint Dependencies

**Id:** `add-astro-eslint-dependencies`

**Status:** `DRAFT`

**Purpose:** Declare the packages ESLint needs to parse `.astro` files.

**Description:** Add `eslint-plugin-astro` and `astro-eslint-parser` to the runtime `dependencies` of `@noodlestan/eslint-config`, pinned to versions compatible with the `eslint ^8.57.1` peer range. `astro-eslint-parser` must be explicit rather than transitive because the override refers to it by name in `parser` and `parserOptions.parser`. Record both as `Package Dependency` entries in `$ROOT/_records/dependencies/project-lint.art`.

**Instructions:** `./plan-add-astro-support/instructions/add-astro-eslint-dependencies.md`

**Changes:**

- Add `eslint-plugin-astro` and `astro-eslint-parser` to `dependencies` in `$ROOT/configs/eslint-config/package.json`.
- Add `Package Dependency: ESLint Plugin Astro` and `Package Dependency: Astro ESLint Parser` to `$ROOT/_records/dependencies/project-lint.art`.
- Run `npm ci` in `$ROOT` and confirm both resolve.
- Confirm `eslint-plugin-astro` declares compatibility with the pinned `eslint` peer range.

**Dependencies:**

- None.

### Iteration: Create Astro ESLint Override

**Id:** `create-astro-eslint-override`

**Status:** `DRAFT`

**Purpose:** Make ESLint collect and parse `.astro` files.

**Description:** Create `src/config/astro.cjs` following the shape of `src/config/mdx.cjs` and `src/config/solid.cjs`: `files` matching `**/*.astro`, `parser` set to `astro-eslint-parser`, `parserOptions.parser` set to `@typescript-eslint/parser` so frontmatter is typed, `plugins` declaring `astro`, `extends` pulling in `plugin:astro/recommended`, `env.browser`, and a `rules` block for the false positives that Astro components inherently produce. Register the override in `src/index.cjs` and extend `ignorePatterns` with `**/.astro/` so Astro's generated content-collection types are never linted.

**Instructions:** `./plan-add-astro-support/instructions/create-astro-eslint-override.md`

**Changes:**

- Create `$ROOT/configs/eslint-config/src/config/astro.cjs`.
- Register the override in `$ROOT/configs/eslint-config/src/index.cjs` at a position that does not shadow the TypeScript or Solid overrides.
- Extend `ignorePatterns` in `src/index.cjs` with `**/.astro/`.
- Confirm that `eslint .` now collects `.astro` files, which depends entirely on `overrides[].files` — ESLint 8 lints only `.js` plus the extensions its overrides match.

**Dependencies:**

- Iteration: Add Astro ESLint Dependencies.

### Iteration: Exercise Astro Fixture

**Id:** `exercise-astro-fixture`

**Status:** `DRAFT`

**Purpose:** Prove the override and the Prettier Astro parser work from the CLI inside the package's own CI.

**Description:** Add `$ROOT/configs/eslint-config/test/component.astro` with deliberate violations — an unused frontmatter import, an `astro/no-set-html-directive` misuse, and misindented markup — and add `*.astro` to `test/tsconfig.json`. The package's `test` script is `npm run lint`, so a deliberately dirty fixture must be formatted to a clean state for the run to pass; the fixture therefore proves the rule set parses `.astro`, not that the rules fire. Add a `*.astro` entry with `parser: astro` to `configs/eslint-config/.prettierrc` so the package's own `prettier . -c` can read it.

**Instructions:** `./plan-add-astro-support/instructions/exercise-astro-fixture.md`

**Changes:**

- Create `$ROOT/configs/eslint-config/test/component.astro`.
- Add `.astro` to `include` in `$ROOT/configs/eslint-config/test/tsconfig.json`.
- Add a `*.astro` entry with `parser: astro` to `$ROOT/configs/eslint-config/.prettierrc`.
- Run `npm run lint` and `npm run test` in `$PKG_ESLINT` and confirm both pass.

**Dependencies:**

- Iteration: Create Astro ESLint Override.

### Iteration: Tune Astro Rules

**Id:** `tune-astro-rules`

**Status:** `DRAFT`

**Purpose:** Surface every real conflict between the shared Astro rules and an actual Astro codebase before publication.

**Description:** Link `@noodlestan/eslint-config` into `$WEB/node_modules/@noodlestan/` and run `npm run lint:fix` in `$WEB/apps/noodlestan-web`. Classify each violation as a config gap — fixed in `$PKG_ESLINT` — or a project defect — fixed in `$WEB`. Never commit an `.astro` file in `$WEB` to silence a rule that the shared config should instead express.

**Instructions:** `./plan-add-astro-support/instructions/tune-astro-rules.md`

**Changes:**

- Link the package into `$WEB` for live tuning, from `$WEB/node_modules/@noodlestan`:

  ```bash
  rm -rf eslint-config && ln -s ../../../workspace-tooling/configs/eslint-config eslint-config
  ```

- Run `npm run lint` in `$WEB/apps/noodlestan-web` and record every violation by class.
- Adjust `src/config/astro.cjs` for each config gap.
- Fix project defects in `$WEB/apps/noodlestan-web/src/**/*.astro`.
- Confirm `parserOptions.project` resolves for `.astro` files, given that the Solid and Typescript overrides assume a CWD-relative `./tsconfig.json`.

**Dependencies:**

- Iteration: Exercise Astro Fixture.

### Iteration: Publish and Pin

**Id:** `publish-and-pin`

**Status:** `DRAFT`

**Purpose:** Publish the ESLint config and replace the local link in `$WEB` with the released version.

**Description:** Bump the version of `@noodlestan/eslint-config`, run `npm run art-work publish` from `$WORKSPACE`, then in `$WEB` remove the symlink, install the released version, and re-run `npm run lint` to confirm the pinned result matches the linked result. Update the NPM Deployment records and `$ROOT/configs/eslint-config/README.md`.

**Instructions:** `./plan-add-astro-support/instructions/publish-and-pin.md`

**Changes:**

- Bump `version` in `$ROOT/configs/eslint-config/package.json`.
- Run `npm run art-work publish` from `$WORKSPACE`.
- Remove the symlink in `$WEB/node_modules/@noodlestan/` and install the published version.
- Re-run `npm run lint` in `$WEB/apps/noodlestan-web` and confirm parity with the linked run.
- Update `$ROOT/configs/eslint-config/_records/npm-deployment.art` and `$ROOT/configs/eslint-config/README.md`.

**Dependencies:**

- Iteration: Tune Astro Rules.

## Work

### Next

Refine the iterations into instructions files; the upstream Prettier packages are published and pinned, so planning can proceed.

### Blockers

- None — upstream `Plan: Add Prettier Config` is `DONE`; `prettier-plugin-astro` is installed in `$ROOT`.

## Operating Instructions

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write a message following: `{Type}({Scope}): {Description}.` max 120 chars, optionally followed by up 3 bullet points, max 100 chars each.
3. Use only values of `Type`, `Scope`, and valid `Type–Scope` associations defined there, along with examples, and rules.

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`.

**Instructions:** (From `$ROOT/_guide.md`)

Run from `$ROOT`:

```bash
npm ci # to install dependencies.
```

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from `$WEB/node_modules/@noodlestan` to link the local package into the live-test consumer:

```bash
rm -rf eslint-config && ln -s ../../../workspace-tooling/configs/eslint-config eslint-config
```

### Verifying Step

**Purpose:** Verify the changes produced by one iteration. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-step/operation.art`.

**Instructions:** (From `$ROOT/configs/eslint-config/_guide.md`)

Run from `$PKG_ESLINT`:

```bash
npm run lint # to report other issues (prettier, eslint)
npm run test # to run all tests
```

**Instructions:** (From `$ROOT/_guide.md`)

Run from `$WEB/apps/noodlestan-web` to confirm the live-test consumer is clean:

```bash
npm run lint # prettier, eslint and tsc
npm run lint:fix # autofix formatting issues
```

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`.

**Instructions:** (From `$ROOT/_guide.md`)

Runs automatically on pre-commit hook, from `$ROOT`:

```bash
npm run ci # lint, test and build
```

---

## Coordination

### Not In Scope

- **Flat config migration** — Moving `@noodlestan/eslint-config` to `eslint.config.js` under ESLint 9 would change every override at once; the package stays on the legacy `eslintrc` shape it already uses for Solid and MDX.
- **VS Code editor settings** — `editor.defaultFormatter` and format-on-save in `.vscode/settings.json` already work through the Astro extension and say nothing about the CLI.
- **Other frameworks** — Vue, Svelte, and MDX parity beyond the existing MDX override.
- **Prettier Astro tuning** — the Astro Prettier config and its `$WEB` pin are delivered by `Plan: Add Prettier Config`; this plan only adds ESLint coverage.
- **Other Astro consumers** — only `Repository: Noodlestan Web` is live-tested; broader adoption is not verified by this plan.

### Evidence

- In `$WEB/apps/noodlestan-web`, `npm run lint` reports violations in `src/**/*.astro` before the change and passes after it.
- `$PKG_ESLINT` runs `npm run lint` and `npm run test` green with `test/component.astro` present in the tree.
- After pinning the published ESLint config, `$WEB` produces the same lint result as it did against the linked package.

### Findings

- **ESLint 8 skips unknown extensions silently** — when a directory is passed, ESLint lints `.js` plus the extensions matched by `overrides[].files`. With no `**/*.astro` override, `eslint .` reports nothing about Astro files and does not warn.
- **Prettier skips unknown extensions silently** — `prettier . -c` only acts on extensions it can infer a parser for. `.astro` was skipped outright, which is why the lint script appeared to do nothing.
- **A working VS Code formatter proves nothing** — the Astro extension ships its own parser and formatter, independent of the repository's CLI configuration.
- **Typed overrides carry a CWD-relative `project`** — `src/config/solid.cjs` sets `parserOptions.project: './tsconfig.json'`, resolved from the process working directory. The Astro override inherits this hazard and must be verified when `$WEB/apps/noodlestan-web` is the working directory.
- **Prettier merges every matching `overrides` entry** — entries are applied in order rather than first-match, so the Astro variant can append a `*.astro` entry to the base list without restating or disabling the base entries.

### Decisions

- **Astro goes into the existing ESLint config** — an override in `@noodlestan/eslint-config` alongside `solid.cjs` and `mdx.cjs`, not a separate `eslint-config-astro` package; the Astro plugin is small and the override is inert for repositories without `.astro` files.
- **`.astro` joins the tab-indented family** — the Astro Prettier config appends `*.astro` with `useTabs: true` to the base `overrides` list rather than introducing a separate indentation style.
- **Publication before pinning** — the consumer repository pins released versions rather than keeping a symlink, so the published tarball is what gets validated.

### Knowledge to Update

- `$ROOT/configs/eslint-config/README.md` — document the Astro override and the `.astro` fixture.
- `$ROOT/configs/eslint-config/_records/package.art` — reflect the new runtime dependencies and the Astro fixture.
- `$ROOT/_guide.md` — no change expected; both packages are already listed.

### Follow Ups

- Adopt `@noodlestan/prettier-config-astro` and the Astro ESLint override in the remaining consumer repositories once an Astro project exists in one.
- Revisit `parserOptions.project` across all typed overrides now that a fourth parser is in play.

### Feedback

- None.
