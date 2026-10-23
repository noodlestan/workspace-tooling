# Workspace Tooling - Build

**Purpose:** Explain how `@noodlestan/esbuild` builds and watches packages — engine, bins, config contract, defaults, plugins, and outputs.

Install, configuration examples, and per-option usage live in the package [README](../../cli/esbuild-cli/README.md).

## Command Surface

| Bin                 | Entry           | Behaviour                                                           |
| ------------------- | --------------- | ------------------------------------------------------------------- |
| `esbuild-cli`       | `bin/build.mjs` | Loads the config, builds each declared target in order, exits 1     |
| `esbuild-cli-watch` | `bin/watch.mjs` | Loads the config, starts a watch context per target, stays resident |

Both bins resolve `build.config.mjs` from the consumer's working directory. There is no subcommand layer: build and watch are separate entry points, so a consumer selects behaviour through its package scripts.

## Config Contract

The default export is an object with an optional `common` block shared by every target and a `targets` array (or legacy `cjs`/`esm` keys for backward compatibility). Each target is an object with at least a `name` (or is derived) and its own esbuild options. `entryPoints` is mandatory, in `common` or in the target.

**Merge order** — later wins: wrapper `commonConfig` defaults → the consumer's `common` block → target-type defaults (e.g. `cjs`/`esm`/custom) → the target-specific config.

**Validation** — the wrapper fails fast, printing a `🟥` message and exiting `1`, when `build.config.mjs` is missing, the default export is not an object, no targets are declared, targets resolve to conflicting outdirs (when required), or targets are misconfigured.

**Wrapper-owned defaults** — `bundle: false`, `sourcemap: true`, `logLevel: 'info'`, `platform: 'node'`, `target: 'node24'`, `outdir: 'dist/'`, and empty `plugins`, `external`, `define`. `format`, `outExtension` may be set by target defaults or by the consumer. The full option table, and which options consumers override, are in the README.

## Execution Model

- **Build.** Targets run in the order declared in `targets` (or in a stable order), each calling `esbuild.build`. The first failure is printed to `stderr` and terminates the process with exit code `1`.
- **Watch.** Every target gets its own `esbuild.context` and `ctx.watch()`. Contexts start in parallel and are awaited together; a rejection prints the error and exits `1`.

Both paths are one-shot processes: a config is loaded, work is performed, and the process either exits (build) or stays resident (watch). Nothing is persisted by the wrapper.

## Plugins

Opt-in post-build steps exported from `@noodlestan/esbuild/plugins`, running after esbuild completes: `postBuildPlugin` runs a command — the mechanism for declaration emit — and `copyStaticFilesPlugin` copies files matching an extension from `src` to the output. Both share `target`, `skipOnError`, `skipOnWarning` and `exitOnError`; their options and examples are in the README.

Declaration emit is deliberately not built in: it is a consumer decision implemented as a `postBuildPlugin` step that runs `tsc --emitDeclarationOnly` for the target.

## Outputs

- Everything lands in `dist/` unless a target overrides `outdir`.
- Targets control `format` and `outExtension`; common patterns include ESM emitting `.mjs` and CJS emitting `.js`.
- Source maps are on by default.
- Targets with colliding `outdir` should be avoided unless explicitly intended; the wrapper may enforce distinct outdirs for conflicting formats depending on configuration.

## Constraints

- The wrapper owns defaults; consumers own `entryPoints`, `bundle`, `external`, `define`, `tsconfig`, and outdir overrides. Anything else is a change to the wrapper and its decision records.
- Output shape must satisfy [adr/distribution.md](../adr/distribution.md): Node-compatible ESM, explicit extensions, declarations alongside compiled output.
- The wrapper design itself is recorded in [adr/build-model.md](../adr/build-model.md).
