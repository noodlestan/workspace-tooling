# CHANGELOG

## 0.2.0

### Added

- **esbuild/tsconfig.json** – Base preset for packages built with `@noodlestan/esbuild`.
- **esbuild/tsconfig-solid.json** – Adds `solid-js` JSX configuration to the esbuild preset.
- **vite/tsconfig.json** – Base preset for packages resolved by Vite and other bundlers.
- **vite/tsconfig-solid.json** – Adds `solid-js` JSX configuration to the vite preset.
- **monorepo/tsconfig.json** – Base preset for consumer monorepo roots.

## 0.1.0

### Removed

- **cli/tsconfig.esm.json** – Declaration emit is now owned by the consumer's `build.config.mjs`.
- **cli/tsconfig.cjs.json** – Declaration emit is now owned by the consumer's `build.config.mjs`.

### Changed

- **cli/tsconfig.json** – Now the base CLI preset, extended directly by consumers.

## 0.0.14

### Added

- **libs/tsconfig-vite-node.json** – Extends `libs/tsconfig` with `vite` and `node` types.
- **libs/tsconfig-vite-solid.json** – Extends `libs/tsconfig` with `vite` types and JSX configuration.
- **libs/tsconfig-vite.json** – Extends `libs/tsconfig` with `vite` types.
- **workspace/tsconfig.json** – For monorepo roots.

### Changed

- **cli/tsconfig.esm** – Added `noPropertyAccessFromIndexSignature` and `noUncheckedIndexedAccess`.
- **cli/tsconfig.cjs** – Added `noPropertyAccessFromIndexSignature` and `noUncheckedIndexedAccess`.
- **cli/tsconfig** – Added `noPropertyAccessFromIndexSignature` and `noUncheckedIndexedAccess`.
- **libs/tsconfig** – Added `verbatimModuleSyntax`, `isolatedModules`, `forceConsistentCasingInFileNames`, `noPropertyAccessFromIndexSignature`, and `noUncheckedIndexedAccess`
