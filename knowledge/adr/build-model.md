# Build Model

**Purpose:** Decide the build engine and wrapper design of this repository's `@noodlestan/esbuild` package.

## Decision: esbuild as the Build Engine

**Status:** Adopted

**Context:** Packages in the Noodlestan ecosystem need fast builds for CLI and library targets. `tsc` is slow and emits only JavaScript plus declarations; Rollup and webpack bring configuration weight and plugin ecosystems we do not use.

**Decision:** Use `esbuild` to produce JavaScript output for both `cjs` and `esm` targets. `tsc` remains available for declaration emit only, driven by a consumer's post-build step.

**Consequences:** Builds are fast and configuration stays small. esbuild does not type-check, so type errors must surface from a separate `tsc` run — currently the consumer's declaration step, with no repository-wide type-check gate yet. The engine version is pinned exactly so wrapper defaults and consumer installs agree.

## Decision: Wrapper With Two Bins, No Subcommands

**Status:** Adopted

**Context:** Every consumer package needs the same build and watch behaviour. A subcommand CLI (`tool build`, `tool watch`) is the obvious shape, but consumers only ever need to wire two npm scripts, and a command framework would add a dependency and an argument-parsing layer for zero options.

**Decision:** Ship `@noodlestan/esbuild` with exactly two bins: `esbuild-cli` (one-shot build) and `esbuild-cli-watch` (resident watch). No framework, no subcommands, no global options — behaviour is selected by which bin the consumer script calls.

**Consequences:** The entry points are two short scripts that load a config and delegate. Variance lives in `build.config.mjs`, not in flags. Adding a third behaviour means a third bin and a decision record, which keeps the surface deliberate.

## Decision: Consumer-Owned Config, Wrapper-Owned Defaults

**Status:** Adopted

**Context:** The point of the wrapper is to restrict variance, but every package differs in entry points, externals, and build-time values. Hardcoding everything makes the wrapper unusable; exposing all of esbuild's options makes it pointless.

**Decision:** Consumers author `build.config.mjs` next to their `package.json` with a default export object containing an optional `common` block and one or both targets (`cjs`, `esm`). The wrapper owns the defaults in `src/config/` and merges in a fixed order: `commonConfig` → consumer `common` → target default → consumer target. The wrapper validates the file before building.

**Consequences:** Consumers control entry points, bundling, externals, `define`, and `tsconfig`; the wrapper controls platform, target, output directory, sourcemaps, and per-target format and extensions. Invalid configs fail fast with a `🟥` message and exit code `1` instead of producing partial output.

## Decision: Explicit Targets With Distinct Outputs

**Status:** Adopted

**Context:** Publishing Node-compatible ESM while still serving CommonJS consumers means producing two outputs from one source tree. Silent collisions between the two are the main risk.

**Decision:** `cjs` and `esm` are declared explicitly and independently; at least one is required. Each target gets its own `outdir`, enforced at load time, and the `esm` target writes `.mjs` via `outExtension` while `cjs` writes `.js`.

**Consequences:** Module format is a deliberate declaration in the consumer's config rather than an inference. Two formats never overwrite each other. A package that needs only one format declares only one target.

## Decision: Opt-In Post-Build Plugins Instead of Hardcoded Steps

**Status:** Adopted

**Context:** Earlier versions hardcoded build-time injections and type emission inside the wrapper. Every package differed in the command it needed, so the wrapper accumulated special cases.

**Decision:** Expose post-build behaviour through `@noodlestan/esbuild/plugins`: `postBuildPlugin` runs an arbitrary command for a target, and `copyStaticFilesPlugin` copies files matching an extension into the output. Both accept `skipOnError`, `skipOnWarning`, and `exitOnError`.

**Consequences:** Declaration emit and static-file copying are consumer decisions expressed in `build.config.mjs`. The wrapper stays free of package-specific logic, and a failed or noisy build can be configured to skip expensive post-build work rather than compound it.

## Decision: Compiled Output as the Dependency Boundary

**Status:** Proposed

**Context:** [Distribution](distribution.md) requires published packages to ship compiled, Node-compatible ESM. Inside the monorepo, packages depend on each other during development, so consuming `dist/` output requires every dependency to be rebuilt as its sources change.

**Decision:** Published package output — not source — is the dependency boundary: consumers install compiled artefacts, and in-repo development keeps that boundary by rebuilding dependencies through turbo's `^build` task graph rather than reaching into `src/`.

**Consequences:** Consumers never resolve into a dependency's source tree, which keeps distribution and development rules aligned. The cost is build orchestration: stale `dist/` output and races between parallel build and watch processes are the failure modes to guard against. Until each package has an in-repo consumer wired through `^build`, this remains proposed.
