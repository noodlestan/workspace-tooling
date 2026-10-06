# Workspace Tooling - Dependencies

**Purpose:** Record dependency observations and choices behind this repository's toolchain, and flag the ones that need a decision.

## Toolchain Inventory

| Dependency                            | Version  | Role                                   | Declared in                    |
| ------------------------------------- | -------- | -------------------------------------- | ------------------------------ |
| `esbuild`                             | `0.28.0` | Build engine (exact pin)               | root and `@noodlestan/esbuild` |
| `esbuild-plugin-file-path-extensions` | `^2.1.4` | Reserved for import extension handling | `@noodlestan/esbuild`          |
| `typescript`                          | `5.9.3`  | Type checking and declaration emit     | root (dev), peer of the config |
| `eslint`                              | `8.57.1` | Lint engine (legacy `.eslintrc`)       | root (dev), peer of the config |
| `prettier`                            | `3.8.4`  | Formatting                             | root (dev), peer of the config |
| `turbo`                               | `2.9.18` | Task graph across workspaces           | root (dev)                     |
| `lefthook`                            | `2.1.9`  | Git hooks                              | root (dev)                     |
| `@noodlestan/eslint-config`           | `0.0.8`  | This repo's own style guide            | root (dev)                     |

`@noodlestan/eslint-config` is pinned to its workspace version, so npm workspaces links the local package instead of fetching it from the registry — this repository dogfoods its own configuration.

## Choices

- **Exact pin on `esbuild`.** The wrapper and its consumers must agree on engine behaviour; a range would let consumer installs drift from the defaults the wrapper was written against.
- **Peers for the toolchain.** `@noodlestan/eslint-config` declares `eslint`, `prettier`, and `typescript` as peers: consumers choose their installation, the config only supplies rules.
- **Dev-only tooling at the root.** `turbo`, `lefthook`, `prettier`, `eslint`, and `typescript` are `devDependencies` of the private root; they never reach a published package.
- **Runtime dependencies stay minimal.** Published packages carry only what they execute: the esbuild package runs `esbuild`, the config package runs its rule plugins, the presets carry nothing.

## Observations

| Observation                                                                           | Status                                              |
| ------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `esbuild-plugin-file-path-extensions` is declared but not imported anywhere in `src/` | Dead dependency — removal candidate                 |
| ESLint is on 8.x with the legacy config format                                        | Intentional today; flat config is a decision record |
| `.nvmrc` pins `v24.15.0` while `engines` allows `>=22` and esbuild targets `node24`   | Consistent: develop on 24, support 22+              |
| `@noodlestan/esbuild` ships `.mjs` sources with no build step                         | Deliberate: the wrapper builds other packages       |
| No package has a test suite (`test` scripts echo)                                     | Known gap; `test/` fixtures are linted only         |

## Constraints

- Adding a runtime dependency to a published package changes what consumers install; it requires a decision record in [adr/repository.md](../adr/repository.md).
- Version choices for published output follow [adr/distribution.md](../adr/distribution.md).
- The build engine and wrapper dependency surface follow [adr/build-model.md](../adr/build-model.md).
