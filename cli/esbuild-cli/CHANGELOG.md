# CHANGELOG

## 0.1.1

### Changed

- **Update dependencies** - `esbuild@0.28.2` cleans up npm audit.

## 0.1.0

### Added

- **Build configuration** – Now loaded from the consumer's `build.config.mjs` file. Declare `common` plus at least one of `cjs` or `esm`; only declared targets are built.
- **`./plugins` export** – `postBuildPlugin` and `copyStaticFilesPlugin` are importable from `@noodlestan/esbuild/plugins`.
- **`postBuildPlugin`** – Replaces `emitTypesPlugin` with a general post-build step taking `{ command, args, target, exitOnError, skipOnError, skipOnWarning }`.

### Changed

- **Configuration defaults** – Trimmed to `sourcemap`, `logLevel`, `platform`, `target`, and `outdir` shared, with `format` and `outExtension` per target. `bundle`, `entryPoints`, `plugins`, `external`, and `define` are consumer-owned.
- **`copyStaticFilesPlugin`** – Renamed from `copyStaticFiles`, on the same options contract.

### Removed

- **Inferred externals** – Runtime dependencies are no longer derived from `package.json`. Declare them in `external`.
- **`__BUILD_VERSION__` define** – No longer injected. Use `define` in your build config; see the readme.

## 0.0.14

### Added

- Define `__BUILD_VERSION__` with value from `package.json`.
