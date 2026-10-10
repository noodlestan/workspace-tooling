# Plan: Externalize Esbuild Config

**ID:** `externalize-esbuild-config`

**Status:** `DONE`

**Template:** `.agents/domains/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Replace the unoverridable baked-in build defaults of `esbuild-cli` with an explicit, consumer-owned `build.config.mjs`.

**Description:** Plan record with 5 iterations and 8 commit blueprints, executed directly in `$PROJECT` on branch `main`.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable           | Resolved Path                                                | Purpose                                                                    |
| ------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `$WORKSPACE`       | Current working directory                                    | Workspace root directory.                                                  |
| `$DOMAINS`         | `$WORKSPACE/.agents/domains`                                 | Domain resources directory.                                                |
| `$PROJECT`         | Provided with prompt. Example: `checkouts/workspace-tooling` | Build tooling monorepo holding `esbuild-cli` and `tsconfig`.               |
| `$ESBUILD_CLI`     | `$PROJECT/cli/esbuild-cli`                                   | The `@noodlestan/esbuild` package.                                         |
| `$TS_CONFIG`       | `$PROJECT/configs/tsconfig`                                  | The `@noodlestan/tsconfig` package.                                        |
| `$ART_MD_BUILDING` | Provided with prompt. Example: `checkouts/art-md-building`   | Consumer checkout used as the live config example and verification target. |

## Summary

Move build configuration ownership from `$ESBUILD_CLI` to each consumer repository, so that entry points, bundling, plugins, externals, and tsconfig selection are declared in a `build.config.mjs` committed next to the consumer's `package.json`.

## Context

### Upstream Work

| Kind                | Path                       | Role                                                                    |
| ------------------- | -------------------------- | ----------------------------------------------------------------------- |
| Package Guide       | `$PROJECT/_guide.md`       | Repository layout, records management, and verification commands.       |
| Package Guide       | `$ESBUILD_CLI/_guide.md`   | `esbuild-cli` package layout and per-package operating instructions.    |
| Package Guide       | `$TS_CONFIG/_guide.md`     | `tsconfig` package layout and operating instructions.                   |
| Uncommitted changes | `git status` in `$PROJECT` | Source of the changes this plan structures into iterations and commits. |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                                  | Description                                                                        |
| ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain: Plans `.agents/domains/plans/index.md` | Planning lifecycle for contextualising, drafting, planning, and integrating plans. |

### Knowledge

::READ `$PROJECT/_guide.md` (Guide) — Repository layout, records management, and `npm run ci` verification. Relevant for Planning Work Item, Setting up, Verifying Completion.

::READ `$ESBUILD_CLI/_guide.md` (Guide) — `esbuild-cli` package layout and `npm run lint:fix` / `npm run lint` / `npm run test` verification. Relevant for Planning Work Item, Verifying Completion.

::READ `$TS_CONFIG/_guide.md` (Guide) — `tsconfig` package layout and operating instructions. Relevant for Planning Work Item, Verifying Completion.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Commit message types, scopes, and format rules for all iterations in this plan.

::READ `$PROJECT/cli/esbuild-cli/src/helpers/loadConfig.mjs` (Implementation) — The new `build.config.mjs` loader; the contract every iteration must stay consistent with.

::READ `$ART_MD_BUILDING/cli/bin/build.config.mjs` (Consumer Example) — A live consumer config demonstrating the `common` / `esm` shape produced by this plan.

## Scope

Changes in 1 repository. The CLI loses its opinionated defaults and gains a config contract; the `tsconfig` package loses the esm/cjs emit presets; records are corrected; consumer-facing documentation states the new contract.

### (Scope) Package: ESBuild CLI

**Record:** `$ESBUILD_CLI/_records/package.art`

**Role:** — Changes required.

**Partial:**

- `owner` — Project: Artificial
- `path` — `cli/esbuild-cli/`
- `canonicalName` — `@noodlestan/esbuild`
- `deployment` — NPM Package Deployment: ESBuild CLI
- `files` — `bin`, `src`, `LICENSE-MIT`, `README.md`
- `dependencies` — Esbuild; Esbuild Plugin File Path Extensions

**Changes:**

- Load build configuration from the consumer's `build.config.mjs`.
- Trim the shared and target config defaults to non-opinionated values.
- Replace the declaration-emission plugin with a general post-build plugin.
- Export the plugins from a public subpath.
- Correct stale `Path` and `Canonical Name` fields in the package record.

### (Scope) Package: TS Config

**Record:** `$TS_CONFIG/_records/package.art`

**Role:** — Changes required.

**Partial:**

- `owner` — Project: Artificial
- `path` — `configs/tsconfig/`
- `canonicalName` — `@noodlestan/tsconfig`
- `files` — `cli`, `libs`

**Changes:**

- Remove `cli/tsconfig.cjs.json` and `cli/tsconfig.esm.json` presets; declaration emit is now the consumer's concern.

## Execution Context

Execution occurs from `$WORKSPACE/`; the plan is executed in the single checkout `$PROJECT` on branch `main`. Package work spans `$ESBUILD_CLI` and `$TS_CONFIG`. No consumer checkout is modified by this plan; the consumer contract is documented for downstream adoption.

---

## Items:

| Iteration / Instructions                                    | Status |
| ----------------------------------------------------------- | ------ |
| Iteration: Add build config loader                          | `DONE` |
| Iteration: Strip baked-in build defaults                    | `DONE` |
| Iteration: Replace emit-types plugin with post-build plugin | `DONE` |
| Iteration: Export plugins subpath                           | `DONE` |
| Iteration: Drop esm/cjs tsconfig presets                    | `DONE` |
| Iteration: Document config contract                         | `DONE` |

### Iteration: Add build config loader

**Id:** `add-build-config-loader`

**Status:** `DONE`

**Purpose:** Give `esbuild-cli` a single, validated entry point for consumer-supplied build configuration.

**Description:** Adds `loadConfig.mjs` and rewires both bins to it, so `build` and `watch` share one resolution and validation path.

**Changes:**

- Add `$ESBUILD_CLI/src/helpers/loadConfig.mjs`:

  - Resolve `build.config.mjs` from `process.cwd()`.
  - Throw when the file is absent, naming the resolved path.
  - `import()` the file via `pathToFileURL` and reject a non-object or `null` default export.
  - Merge `{ ...commonConfig, ...supplied.common }` into a `common` block.
  - Throw when neither `supplied.cjs` nor `supplied.esm` is defined.
  - Return only the declared targets, each as `{ ...common, ...targetConfig, ...supplied.<target> }`.

- Rewrite `$ESBUILD_CLI/bin/build.mjs` to `await loadConfig()` once and then, per declared target, call `createBuild(config.<target>).build()`. Drop the `cjs`/`esm` wrapper closures and the `const config = {}` COMMITTED with its `TODO`.

- Rewrite `$ESBUILD_CLI/bin/watch.mjs` to `await loadConfig()` once, push each declared target's `watch()` promise into an array, and `await Promise.all(promises)`. Drop the wrapper closures and the COMMITTED.

- Both bins run targets sequentially in `build` and concurrently in `watch`; preserve that asymmetry.

**Dependencies:**

- None.

#### Commits:

| ID                        | Repository / Checkout / Branch          | Policy   | Hash      | Status      |
| ------------------------- | --------------------------------------- | -------- | --------- | ----------- |
| `add-build-config-loader` | Workspace Tooling / `$PROJECT` / `main` | `MANUAL` | `c2b790b` | `COMMITTED` |

##### Commit: `add-build-config-loader`

**Message:**

```text
build(esbuild): Load build config from consumer `build.config.mjs`.

- Add `loadConfig` resolving and validating `common`, `cjs`, and `esm` targets
- Build only declared targets; keep `build` sequential and `watch` concurrent
```

### Iteration: Strip baked-in build defaults

**Id:** `strip-baked-in-build-defaults`

**Status:** `DONE`

**Purpose:** Remove the defaults that made the previous behaviour unoverridable and produced bundles plain Node could not load.

**Description:** Reduces the shared config modules to non-opinionated defaults and simplifies `createBuild` into a thin esbuild wrapper.

**Changes:**

Options are applied in four layers, later values winning, as implemented in `$ESBUILD_CLI/src/helpers/loadConfig.mjs`:

1. `commonConfig` defaults.
2. The consumer's `common` block.
3. The `cjs` or `esm` target defaults.
4. The consumer's `cjs` or `esm` block.

Target defaults sit above `common` and below the consumer's target block, so a target value overrides the shared block while the consumer's target value still wins.

- `$ESBUILD_CLI/src/config/common.mjs` — reduce to the shared defaults: `sourcemap: true`, `logLevel: 'info'`, `platform: 'node'`, `target: 'node24'`, `outdir: 'dist/'`. `bundle`, `entryPoints`, `plugins`, `external`, `define`, and `tsconfig` are no longer defaulted and fall back to esbuild's own behaviour.

- `$ESBUILD_CLI/src/config/esm.mjs` — trim to the esm-only values: `format: 'esm'`, `outExtension: { '.js': '.mjs' }`.

- `$ESBUILD_CLI/src/config/cjs.mjs` — trim to the cjs-only value: `format: 'cjs'`.

- `$ESBUILD_CLI/src/helpers/loadConfig.mjs` — unchanged; it already applies the four layers.

- `$ESBUILD_CLI/src/build/index.mjs` — reduce `createBuild(options, defaults)` to `createBuild(config)`:

  - Drop `resolvePackageJson`, `resolveExternalPackages`, and `emitTypesPlugin` imports.
  - Remove the `define.__BUILD_VERSION__` injection from `package.json`.
  - Remove the inferred-`external` merge.
  - `build()` becomes `async () => esbuild.build(config)`.
  - `watch()` becomes `async () => await ctx.watch()`.
  - Return `{ watch, build }` on one line.

- Delete the two orphaned helpers, now unreferenced after the `createBuild` simplification: `$ESBUILD_CLI/src/helpers/resolvePackageJson.mjs` and `$ESBUILD_CLI/src/helpers/resolveExternalPackages.mjs`.

- `$ESBUILD_CLI/src/plugins/copyStaticFilesPlugin.mjs` is no longer wired into any default. It is retained as an opt-in plugin export, reachable through the `@noodlestan/esbuild/plugins` export map.

**Dependencies:**

- Iteration: Add build config loader.

#### Commits:

| ID                              | Repository / Checkout / Branch          | Policy   | Hash      | Status      |
| ------------------------------- | --------------------------------------- | -------- | --------- | ----------- |
| `reduce-shared-config-defaults` | Workspace Tooling / `$PROJECT` / `main` | `MANUAL` | `8896709` | `COMMITTED` |
| `simplify-create-build`         | Workspace Tooling / `$PROJECT` / `main` | `MANUAL` | `198a430` | `COMMITTED` |

##### Commit: `reduce-shared-config-defaults`

**Message:**

```text
build(esbuild): Trim the shared and target config defaults.

- Drop `bundle`, default `entryPoints`, default plugins, and inferred externals
- Keep only `sourcemap`, `logLevel`, `platform`, `target`, and `outdir` shared
```

##### Commit: `simplify-create-build`

**Message:**

```text
build(esbuild): Drop hardcoded injection in favor of postBuildPlugin.

- Remove `__BUILD_VERSION__` define injection and external inference
- Delete the orphaned `resolvePackageJson` and `resolveExternalPackages` helpers
```

### Iteration: Replace emit-types plugin with post-build plugin

**Id:** `replace-emit-types-plugin`

**Status:** `DONE`

**Purpose:** Generalise the declaration-emission plugin into a reusable post-build step, and give the static-file copier a matching contract.

**Description:** Replaces `emitTypesPlugin` with `postBuildPlugin` and renames `copyStaticFiles` to `copyStaticFilesPlugin`, both exposing the same `{ skipOnError, skipOnWarning, exitOnError }` shape.

**Instructions:** `./instructions/replace-emit-types-plugin.md`

**Changes:**

- Delete `$ESBUILD_CLI/src/plugins/emitTypesPlugin.mjs`.

- Add `$ESBUILD_CLI/src/plugins/postBuildPlugin.mjs`:

  - `postBuildPlugin({ command, args = [], target, exitOnError = true, skipOnError = true, skipOnWarning = true })`.
  - `runPostBuildCommand` spawns `command` with `args`, logs per `target`, and exits on failure when `exitOnError`.
  - Skip the command on build errors when `skipOnError`, and on build warnings when `skipOnWarning`, logging why.
  - The plugin is no longer injected by `createBuild`; consumers add it via their `build.config.mjs` `plugins` array.

- Delete `$ESBUILD_CLI/src/plugins/copyStaticFiles.mjs`.

- Add `$ESBUILD_CLI/src/plugins/copyStaticFilesPlugin.mjs`:

  - `copyStaticFilesPlugin({ outdir, extension = '.json', exitOnError = true, skipOnError = true, skipOnWarning = true })`.
  - Copies files matching `extension` from `src` into `outdir` after the build.
  - Shares the `skipOnError` / `skipOnWarning` / `exitOnError` contract with `postBuildPlugin`.

**Dependencies:**

- Iteration: Strip baked-in build defaults.

#### Commits:

| ID                          | Repository / Checkout / Branch          | Policy   | Hash      | Status      |
| --------------------------- | --------------------------------------- | -------- | --------- | ----------- |
| `replace-emit-types-plugin` | Workspace Tooling / `$PROJECT` / `main` | `MANUAL` | `8375919` | `COMMITTED` |

##### Commit: `replace-emit-types-plugin`

**Message:**

```text
build(esbuild): Replace `emitTypesPlugin` with a general `postBuildPlugin`.

- Take `{ command, args, target, exitOnError, skipOnError, skipOnWarning }`
- Rename `copyStaticFiles` to `copyStaticFilesPlugin` on the same contract
```

### Iteration: Export plugins subpath

**Id:** `add-plugins-export-map`

**Status:** `DONE`

**Purpose:** Give plugins a stable public import path so consumers do not reach into `src/`.

**Description:** Adds a barrel module and the matching package `exports` entry.

**Instructions:** `./instructions/add-plugins-export-map.md`

**Changes:**

- Add `$ESBUILD_CLI/src/plugins/index.mjs` re-exporting every plugin module.

- Add an `exports` map to `$ESBUILD_CLI/package.json`:

  ```json
  "exports": {
    "./plugins": "./src/plugins/index.mjs"
  }
  ```

- `files` already includes `src`, so no packaging change is needed.

**Dependencies:**

- Iteration: Replace emit-types plugin with post-build plugin.

#### Commits:

| ID                       | Repository / Checkout / Branch          | Policy   | Hash      | Status      |
| ------------------------ | --------------------------------------- | -------- | --------- | ----------- |
| `add-plugins-export-map` | Workspace Tooling / `$PROJECT` / `main` | `MANUAL` | `b4df102` | `COMMITTED` |

##### Commit: `add-plugins-export-map`

**Message:**

```text
build(esbuild): Export plugins from `@noodlestan/esbuild/plugins`.

- Add `src/plugins/index.mjs` re-exporting the plugin modules
- Add the `./plugins` entry to the package `exports` map
```

### Iteration: Drop esm/cjs tsconfig presets

**Id:** `drop-esm-cjs-tsconfig-presets`

**Status:** `DONE`

**Purpose:** Stop shipping emit-only esm/cjs presets now that consumers own their declaration emit strategy.

**Description:** Deletes the two CLI presets and aligns the `tsconfig` package records and changelog with the remaining presets.

**Changes:**

- Delete `$TS_CONFIG/cli/tsconfig.cjs.json` and `$TS_CONFIG/cli/tsconfig.esm.json`.

- Keep `$TS_CONFIG/cli/tsconfig.json` as the base CLI preset.

- Note that `$ESBUILD_CLI/src/config/cjs.mjs` still defaults `tsconfig` to `'tsconfig.cjs.json'`; the consumer is now responsible for providing that file. Record this as a finding and state the expectation in the docs iteration.

- Update `$TS_CONFIG/_records/package.art` if its `files` or description claims the esm/cjs presets.

- Add a `$TS_CONFIG/CHANGELOG.md` entry recording the removal of `cli/tsconfig.cjs` and `cli/tsconfig.esm`.

**Dependencies:**

- Iteration: Strip baked-in build defaults.

#### Commits:

| ID                                    | Repository / Checkout / Branch          | Policy   | Hash      | Status      |
| ------------------------------------- | --------------------------------------- | -------- | --------- | ----------- |
| `remove-cli-tsconfig-esm-cjs-presets` | Workspace Tooling / `$PROJECT` / `main` | `MANUAL` | `22f068e` | `COMMITTED` |

##### Commit: `remove-cli-tsconfig-esm-cjs-presets`

**Message:**

```text
build(tsconfig): Remove esm and cjs emit presets.

- Declaration emit is now owned by the consumer's `build.config.mjs`
- Record the removal in the `@noodlestan/tsconfig` changelog
```

### Iteration: Document config contract

**Id:** `document-config-contract`

**Status:** `DONE`

**Purpose:** Make the new `build.config.mjs` contract discoverable by consumers migrating off the old defaults.

**Description:** Corrects the stale `$ESBUILD_CLI/_records/package.art` fields, records the config contract in the package and repository guides, and rewrites the README with the install steps, bin entry points, option table, and plugin opt-in.

**Changes:**

- `$ESBUILD_CLI/README.md` — rewrite to cover:

  - A rationale preamble: the indirection restricts and formalises variance across consumer projects and provides a documentation layer for common build patterns.
  - `## Usage` → `### Install and Configure`: install command, the `build.config.mjs` requirement, a minimal config example, the at-least-one-target rule, and the `package.json` script wiring.
  - `### Options`: the four-layer merge order and a single table of options and defaults, noting `entryPoints` is mandatory.
  - `### Plugins`: `postBuildPlugin` and `copyStaticFilesPlugin` reference, each with its options, plus a pointer to the esbuild community plugins.
  - `## Use Cases`: injecting build-time values via `define`, emitting type declarations, and copying static files.

- `$ESBUILD_CLI/_guide.md` — record the plugin export subpath in the package layout.

- `$PROJECT/_guide.md` — record the consumer contract under the Esbuild CLI project row.

**Dependencies:**

- Iteration: Add build config loader.
- Iteration: Strip baked-in build defaults.
- Iteration: Replace emit-types plugin with post-build plugin.
- Iteration: Export plugins subpath.
- Iteration: Drop esm/cjs tsconfig presets.

#### Commits:

| ID                               | Repository / Checkout / Branch          | Policy   | Hash      | Status      |
| -------------------------------- | --------------------------------------- | -------- | --------- | ----------- |
| `correct-esbuild-cli-records`    | Workspace Tooling / `$PROJECT` / `main` | `MANUAL` | `d174e78` | `COMMITTED` |
| `update-esbuild-cli-guides`      | Workspace Tooling / `$PROJECT` / `main` | `MANUAL` | `18be34d` | `COMMITTED` |
| `document-build-config-contract` | Workspace Tooling / `$PROJECT` / `main` | `MANUAL` | `afc7bb5` | `COMMITTED` |

##### Commit: `correct-esbuild-cli-records`

**Message:**

```text
records(esbuild): Fix stale path and canonical name.

- Set `Path` to `cli/esbuild-cli/` and `Canonical Name` to `@noodlestan/esbuild`
```

##### Commit: `update-esbuild-cli-guides`

**Message:**

```text
guides(esbuild): Record `build.config.mjs` in the package guides.

- Add `build.config.mjs` and the plugin export map to the package layout
- Note the three-layer option application order in operating instructions
```

##### Commit: `document-build-config-contract`

**Message:**

```text
docs(esbuild): Document the `build.config.mjs` contract.

- Add install and `package.json` script wiring; document both bin entry points
- Tabulate the `common`, `cjs`, and `esm` defaults; flag `entryPoints` as mandatory
```

---

## Work

### Next

- None.

### Blockers

- None.

---

## Operating Instructions

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/ops/setting-up.art`.

**Instructions:** (From `$PROJECT/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
npm run ci # to verify build is green before starting
```

If either fails, resolve the issue before proceeding with implementation. Do NOT run `npm install` inside `$PROJECT` — a local `node_modules` there shadows the monorepo resolution.

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/ops/writing-commit-message.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.

2. Write the commit message following: the rules defined there.

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/ops/verifying-completion.art`.

**Instructions:** (From `$PROJECT/_guide.md`)

Runs automatically on the pre-commit hook, from the `$WORKSPACE` root:

```bash
npm run ci # lint, test and build
```

**Instructions:** (From `$ESBUILD_CLI/_guide.md`)

Run from the package directory:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other issues (prettier, eslint)
npm run test # to run all tests
```

Additionally verify a consumer build end to end: in `$ART_MD_BUILDING/cli/bin`, run `esbuild-cli` and confirm the emitted bundle loads under plain Node.

---

## Coordination

### Not In Scope

- **Consumer migration** — no consumer checkout is modified. `$ART_MD_BUILDING` keeps its existing `build.config.mjs`; adoption by other consumers is separate work.
- **Declaration emit for consumers** — the `tsconfig` presets are removed, but no replacement preset is authored in this plan.

### Evidence

- **Consumer builds and loads** — in `$ART_MD_BUILDING/cli/bin`, `esbuild-cli` produces a bundle that plain `node` loads without a loader flag. This is the end-to-end check that the baked-in defaults were the cause of the previous failure.
- **Missing config fails loudly** — running `esbuild-cli` from a directory without `build.config.mjs` errors naming the resolved path, rather than silently building with defaults.
- **Target selection honoured** — a config declaring only `esm` runs exactly one build; a config declaring both `cjs` and `esm` runs two.
- **Lint green** — `npm run ci` from `$PROJECT` passes with no pre-existing failures introduced.

### Findings

- **Externals are now consumer-owned** — the old `createBuild` merged `dependencies`, `peerDependencies`, and `optionalDependencies` into `external`. With that inference gone, a consumer that omits `external` will bundle its runtime dependencies, which is exactly the class of bug that produced unloadable bundles. The consumer example lists `external: ['commander']` explicitly for this reason.
- **`resolvePackageJson` and `resolveExternalPackages` deleted** — nothing under `$ESBUILD_CLI/src` imports them after the `createBuild` simplification, so both orphaned helpers are removed.
- **`esbuild-plugin-file-path-extensions` is now an unused dependency** — the plugin import was removed from `esmConfig`. The dependency remains declared in `$ESBUILD_CLI/package.json` and in the build-tools dependency record. Either remove it or document it as consumer-facing.
- **Presets trimmed to target-only values** — `cjsConfig` keeps `format: 'cjs'`; `esmConfig` keeps `format: 'esm'` and `outExtension: { '.js': '.mjs' }`. Everything else a target needs is consumer-supplied.

### Decisions

- **One config file, two optional targets** — `build.config.mjs` is resolved from `process.cwd()` and declares `common` plus at least one of `cjs` or `esm`. Targets are built only when declared, replacing the previous unconditional both-targets run.
- **Four-layer application order** — `commonConfig` defaults, then the consumer's `common` block, then the target defaults, then the consumer's target block. Target defaults sit above `common` so a target value overrides the shared block, while the consumer's target value still wins.
- **`build` is sequential, `watch` is concurrent** — preserved from the previous bins. Watch mode must keep all contexts alive simultaneously.
- **Missing config is a hard error** — no fallback to defaults. Silently building with defaults is what made the old behaviour unoverridable.
- **Plugins are opt-in** — no default plugins, including type emission. Consumers wire `postBuildPlugin({ command, args })` through their own `plugins` array.
- **Records corrections ride with documentation** — the `_records/package.art` path and canonical-name fix is bundled with the docs iteration rather than given its own iteration.

### Knowledge to Update

- **`$ESBUILD_CLI/README.md`** — rationale preamble, usage, options table, plugin reference, and use cases.
- **`$ESBUILD_CLI/_guide.md`** — record the plugin export subpath in the layout.
- **`$PROJECT/_guide.md`** — record the consumer contract.
- **`$TS_CONFIG/CHANGELOG.md`** — record the removal of `cli/tsconfig.cjs` and `cli/tsconfig.esm`.

### Follow Ups

- Audit every consumer repository that relied on the removed inferred externals and the removed esm/cjs presets, and give each a `build.config.mjs`.
- Decide the disposition of the unused `esbuild-plugin-file-path-extensions` dependency.
- Reintroduce a declaration-emit preset, or publish a documented pattern, now that `tsconfig.cjs.json` and `tsconfig.esm.json` are gone.
- Bump `@noodlestan/esbuild` and `@noodlestan/tsconfig` versions; the removal of the config defaults and of the presets is breaking.

### Feedback

- None.
