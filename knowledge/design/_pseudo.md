# Workspace Tooling - Pseudo

**Purpose:** carry pseudo-code and BDD expectations for the build, watch, lint, and verify use cases of this repository.

## Entry Point

### Function: main() — `bin/build.mjs`

```
config ← loadConfig()
if config.cjs declared: createBuild(config.cjs).build() or exit 1
if config.esm declared: createBuild(config.esm).build() or exit 1
exit 0
```

### Function: main() — `bin/watch.mjs`

```
config  ← loadConfig()
promises ← []
if config.cjs declared: promises ← promises + createBuild(config.cjs).watch()
if config.esm declared: promises ← promises + createBuild(config.esm).watch()
await all(promises) or exit 1
```

## Data Structures

### Function: loadConfig()

```
path ← cwd/build.config.mjs
FAIL "Build config not found" if path does not exist
mod  ← import(path); config ← mod.default
FAIL "Invalid build config" unless config is an object
common ← merge(commonConfig, config.common ?? {})
FAIL "must define at least one target" unless config.cjs or config.esm
merged.cjs ← merge(common, cjsConfig, config.cjs)  if config.cjs
merged.esm ← merge(common, esmConfig, config.esm)  if config.esm
FAIL "cjs and esm share outDir" if both declared and outdir equal
return merged
```

### Function: createBuild(config)

```
build() → esbuild.build(config)
watch() → ctx ← esbuild.context(config); ctx.watch()
```

### Function: composeOverrides() — `@noodlestan/eslint-config`

```
base      ← config/_base.cjs            # eslint:recommended + standard + prettier
overrides ← typescript + solid + configs + scripts + tests + mdx
return { ...base, ignorePatterns, overrides }
```

## Use Cases

### Command: `esbuild-cli`

- **Given** a `build.config.mjs` declaring `common.entryPoints` and an `esm` target,
- **when** `esbuild-cli` runs,
- **then** ESM output lands in `dist/` as `.mjs` with source maps, and the process exits `0`.

- **Given** the config file is missing,
- **when** `esbuild-cli` runs,
- **then** it prints `🟥 Build config not found: {path}` and exits `1`.

- **Given** both targets declare the same `outdir`,
- **when** `esbuild-cli` runs,
- **then** it prints `🟥 Build targets cjs and esm both have outDir` and exits `1`.

- **Given** a target fails to build,
- **when** `esbuild-cli` runs,
- **then** the error is written to `stderr`, followed by `🟥 Build failed with errors`, and the process exits `1`.

### Command: `esbuild-cli-watch`

- **Given** a config declaring both `cjs` and `esm`,
- **when** `esbuild-cli-watch` runs,
- **then** two watch contexts start in parallel and the process stays resident.
- **when** one context rejects,
- **then** the error is printed and the process exits `1`.

### Command: `npm run ci` (verification)

- **Given** changes staged in any workspace package,
- **when** a commit is attempted,
- **then** Lefthook runs `clean`, `extract`, then `ci` — in that order, not in parallel.
- **when** `npm run ci` runs,
- **then** the root Prettier check passes first, then `turbo run ci` runs each package's `ci` task with `^ci` dependencies.

### Command: `npm run lint` (authoring loop)

- **Given** an edit under `configs/eslint-config/src/`,
- **when** `npm run lint` runs in the package,
- **then** Prettier checks formatting and ESLint lints the fixtures in `test/`, surfacing rule violations as errors.

## Expectations

- Every failure path prints a `🟥` message to `stderr` and exits non-zero; no partial success states.
- The wrapper never writes to the consumer's source tree — only `outdir` and the post-build commands a consumer configures.
- No package may pass `ci` while its own `lint` script fails.
