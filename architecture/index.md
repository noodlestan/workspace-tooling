# Index: Workspace Tooling

## Documents

| Document                       | Purpose                                                                                                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------- |
| [overview.md](overview.md)     | Overview of the toolchain for Noodlestan repositories: benefits, definitions, use cases, and how it works |
| [components.md](components.md) | Components of the toolchain, their contracts, and how they relate                                         |
| [principles.md](principles.md) | Principles and hard constraints every document and decision record must satisfy                           |

## Design Documents

| Document                                         | Purpose                                                                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| [design/packages.md](design/packages.md)         | Surface of the packages in this repository and how Noodlestan repositories consume them                       |
| [design/build.md](design/build.md)               | How `@noodlestan/esbuild` builds and watches: bins, config contract, defaults, plugins, and outputs           |
| [design/linting.md](design/linting.md)           | Lint and format rules that govern this repository, the shared config consumers extend, and how changes land   |
| [design/typescript.md](design/typescript.md)     | Stable `esbuild` and `vite` presets of `@noodlestan/tsconfig`, how consumers extend them, and what is in flux |
| [design/dependencies.md](design/dependencies.md) | Dependency observations and choices behind this repository's toolchain                                        |
| [design/\_pseudo.md](design/_pseudo.md)          | Pseudo-code and BDD expectations for the build, watch, lint, and verify use cases                             |

## Decision Records

| Record                                       | Purpose                                                                            |
| -------------------------------------------- | ---------------------------------------------------------------------------------- |
| [adr/distribution.md](adr/distribution.md)   | How Noodlestan published packages are shaped for their consumers                   |
| [adr/build-model.md](adr/build-model.md)     | Build engine and wrapper design of `@noodlestan/esbuild`                           |
| [adr/shared-config.md](adr/shared-config.md) | Shared lint/format and TypeScript configuration shipped to Noodlestan repositories |
| [adr/repository.md](adr/repository.md)       | How this repository is organised, verified, versioned, and published               |
