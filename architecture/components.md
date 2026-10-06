# Components: Workspace Tooling

**Purpose:** Identify the components of the workspace toolchain and how they fit together — packages, their contracts, and the repository machinery that carries them.

## Component Map

| Component                   | Location                       | Responsibility                                                     | Kind                 |
| --------------------------- | ------------------------------ | ------------------------------------------------------------------ | -------------------- |
| `@noodlestan/esbuild`       | `cli/esbuild-cli`              | Build and watch packages through a fixed config contract           | Published            |
| `@noodlestan/eslint-config` | `configs/eslint-config`        | Noodlestan style guide, composed as one ESLint export              | Published            |
| `@noodlestan/tsconfig`      | `configs/tsconfig`             | Base TypeScript presets for the `esbuild` and `vite` kinds         | Published            |
| Tooling manifest            | `/package.json`                | npm workspaces, scripts, shared dev dependencies (never publishes) | Private root         |
| Task graph                  | `turbo.json`                   | Ordered `build`, `lint`, `ci`, `dev` across workspaces             | Repository machinery |
| Pre-commit gate             | `lefthook.yml`                 | `clean` → `extract` → `ci` on every commit                         | Repository machinery |
| Records                     | `_records/`, `{pkg}/_records/` | Source of truth for project, repository, and package facts         | Records              |
| Backlog                     | `_backlog/`                    | Planning artefacts (Workflow: Planning Work)                       | Planning             |

## Contracts Between Components

Each published package exposes exactly one contract to consumers. The contract, not the implementation, is what a Noodlestan repository depends on.

| Producer                    | Contract                                                 | Consumer action                                | Documented in                                |
| --------------------------- | -------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------- |
| `@noodlestan/esbuild`       | `build.config.mjs`, the `esbuild-cli*` bins, `./plugins` | Author a config, wire two scripts              | [design/build.md](design/build.md)           |
| `@noodlestan/eslint-config` | A spreadable ESLint config with peers                    | `require()` it from the ESLint entry file      | [design/linting.md](design/linting.md)       |
| `@noodlestan/tsconfig`      | Preset paths inside the package                          | `extends` one preset, own `include`/`exclude`  | [design/typescript.md](design/typescript.md) |
| Task graph                  | Stable task names `build`, `lint`, `ci`, `dev`           | Comply with the names instead of inventing new | [adr/repository.md](adr/repository.md)       |
| Distribution rules          | Module format, output shape, declarations                | Satisfy them in every published package        | [adr/distribution.md](adr/distribution.md)   |

## How the Pieces Relate

### Inside this repository

```
commit attempt
  └── lefthook pre-commit: clean → extract → ci
        └── npm run ci
              ├── ci:root      — prettier . -c over everything
              └── turbo run ci — each package's lint (prettier + eslint)

root package.json (private)
  ├── workspaces: cli/*, configs/*
  ├── devDependency @noodlestan/eslint-config  → linked from the workspace
  └── .eslintrc.js → spreads @noodlestan/eslint-config  (dogfooding)
```

### Consuming Noodlestan repository

```
consumer package.json
  ├── scripts: build → esbuild-cli, dev → esbuild-cli-watch
  ├── devDependencies: @noodlestan/esbuild, @noodlestan/eslint-config, @noodlestan/tsconfig
  ├── build.config.mjs      → contract of @noodlestan/esbuild
  ├── .eslintrc.cjs         → contract of @noodlestan/eslint-config
  └── tsconfig.json         → extends @noodlestan/tsconfig/{esbuild|vite}/tsconfig.json
```

## Boundaries

- This repository owns the contracts; consumers own their project configuration and their toolchain versions.
- Planning (`_backlog/`) and records (`_records/`) are inputs to the design documents here, not part of the toolchain a consumer sees.
- Behavioural detail belongs in the [design documents](design/); binding choices belong in the [decision records](adr/).
