# CHANGELOG

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
