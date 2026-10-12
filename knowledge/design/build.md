# Workspace Tooling - Build

**Purpose:** Explain how `@noodlestan/esbuild` builds and watches packages — engine, bins, config contract, defaults, plugins, and outputs — for this repository and its Noodlestan consumers.

## Command Surface

| Bin                 | Entry           | Behaviour                                                                      |
| ------------------- | --------------- | ------------------------------------------------------------------------------ |
| `esbuild-cli`       | `bin/build.mjs` | Loads the config, builds each declared target in order, exits `1` on error     |
| `esbuild-cli-watch` | `bin/watch.mjs` | Loads the config, starts a watch context per target in parallel, keeps running |

Both bins resolve `build.config.mjs` from the consumer's working directory. There is no subcommand layer: build and watch are separate entry points, so a consumer selects behaviour through its package scripts.

## Config Contract

Consumers author `build.config.mjs` next to `package.json`. The default export must be an object with an optional `common` block and at least one target, `cjs` or `esm`:

```js
export default {
  common: { entryPoints: ['src/index.ts'] },
  esm: {},
};
```

### Merge Order

Later values win:

1. `commonConfig` defaults (wrapper-owned).
2. The consumer's `common` block.
3. The target default (`cjsConfig` or `esmConfig`).
4. The consumer's `cjs` or `esm` block.

### Validation

The wrapper fails fast, printing a `🟥` message and exiting `1`, when:

- `build.config.mjs` is missing.
- The default export is not an object.
- Neither `cjs` nor `esm` is declared.
- `cjs` and `esm` resolve to the same `outdir`.

### Wrapper Defaults

| Option         | Default                       | Notes                                    |
| -------------- | ----------------------------- | ---------------------------------------- |
| `entryPoints`  | none                          | **Mandatory**, in `common` or the target |
| `bundle`       | `false`                       |                                          |
| `tsconfig`     | `tsconfig.json`               |                                          |
| `sourcemap`    | `true`                        |                                          |
| `logLevel`     | `'info'`                      | `'debug'` for detailed errors            |
| `plugins`      | `[]`                          | Opt-in post-build steps                  |
| `external`     | `[]`                          | Runtime dependencies declared explicitly |
| `define`       | `{}`                          | Build-time values                        |
| `platform`     | `'node'`                      |                                          |
| `target`       | `'node24'`                    |                                          |
| `outdir`       | `'dist/'`                     | Must differ between targets              |
| `format`       | `'esm'` / `'cjs'`             | Fixed per target                         |
| `outExtension` | `{ '.js': '.mjs' }` for `esm` | Fixed per target                         |

## Execution Model

- **Build.** Targets run sequentially — `cjs` first, then `esm`. Each target calls `esbuild.build`. The first failure is printed to `stderr` and terminates the process with exit code `1`.
- **Watch.** Every target gets its own `esbuild.context` and `ctx.watch()`. Contexts start in parallel and are awaited together; a rejection prints the error and exits `1`.

Both paths are one-shot processes: a config is loaded, work is performed, and the process either exits (build) or stays resident (watch). Nothing is persisted by the wrapper.

## Plugins

Plugins are opt-in post-build steps exported from `@noodlestan/esbuild/plugins`. They run after esbuild completes and can be skipped or made fatal based on what the build reported.

| Plugin                  | Purpose                                                            |
| ----------------------- | ------------------------------------------------------------------ |
| `postBuildPlugin`       | Run a command after the build — the mechanism for declaration emit |
| `copyStaticFilesPlugin` | Copy files matching an extension from `src` to the output          |

Shared options: `target` (for logging), `skipOnError`, `skipOnWarning`, `exitOnError`. `postBuildPlugin` takes `command` and `args`; `copyStaticFilesPlugin` takes `outdir` and `extension`.

Declaration emit is deliberately not built in: it is a consumer decision implemented as a `postBuildPlugin` step that runs `tsc --emitDeclarationOnly` for the target.

## Outputs

- Everything lands in `dist/` unless a target overrides `outdir`.
- The `esm` target emits `.mjs` via `outExtension`; the `cjs` target emits `.js`.
- Source maps are on by default.
- Because `cjs` and `esm` must use different outdirs, the two formats never overwrite each other.

## Use Cases

- **Build a package for publication:** `build` with both targets, declarations via `postBuildPlugin`, static files via `copyStaticFilesPlugin`.
- **Develop with feedback:** `watch` through a `dev` script, with turbo keeping dependent packages rebuilding.
- **Inject build-time values:** pass `define` values read from `package.json` in the consumer's `common` block.

## Constraints

- The wrapper owns defaults; consumers own `entryPoints`, `bundle`, `external`, `define`, `tsconfig`, and outdir overrides. Anything else is a change to the wrapper and its decision records.
- Output shape must satisfy [adr/distribution.md](../adr/distribution.md): Node-compatible ESM, explicit extensions, declarations alongside compiled output.
- The wrapper design itself is recorded in [adr/build-model.md](../adr/build-model.md).
