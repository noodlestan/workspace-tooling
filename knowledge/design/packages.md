# Workspace Tooling - Packages

**Purpose:** Describe the surface of the packages in this repository — layout, exports, and bins.

## Package Surface

| Package                             | Path                            | Version | Public | Consumed as                                             |
| ----------------------------------- | ------------------------------- | ------- | ------ | ------------------------------------------------------- |
| `@noodlestan/esbuild`               | `cli/esbuild-cli`               | `0.1.0` | yes    | `npm i -D @noodlestan/esbuild`, bins and `/plugins`     |
| `@noodlestan/eslint-config`         | `configs/eslint-config`         | `0.0.8` | yes    | `require('@noodlestan/eslint-config')` from `.eslintrc` |
| `@noodlestan/tsconfig`              | `configs/tsconfig`              | `0.1.0` | yes    | `extends` a preset path from a consumer `tsconfig.json` |
| `@noodlestan/prettier-config`       | `configs/prettier-config`       | `0.1.0` | yes    | `"prettier"` field in `package.json`                    |
| `@noodlestan/prettier-config-astro` | `configs/prettier-config-astro` | `0.1.0` | yes    | `"prettier"` field in an application `package.json`     |

The root package (`@noodlestan/workspace-tooling`, `0.0.11`) is `private: true`. It is a tooling manifest for the monorepo: workspace definition, scripts, and shared dev dependencies. It produces no artefacts and never publishes.

## Exports and Bins

### `@noodlestan/esbuild`

- `bin`: `esbuild-cli` → `bin/build.mjs`, `esbuild-cli-watch` → `bin/watch.mjs`.
- `exports`: `./plugins` → `src/plugins/index.mjs`, exposing `postBuildPlugin` and `copyStaticFilesPlugin`.
- `files`: `bin`, `src`, `LICENSE-MIT`, `README.md`. The package ships plain ESM `.mjs` sources and has no build step of its own.

### `@noodlestan/eslint-config`

- `main`: `.eslintrc.cjs`, which spreads `src/index.cjs`.
- `files`: `src`, `.eslintrc.cjs`, `README.md`, `LICENSE-MIT`.
- `peerDependencies`: `eslint ^8`, `prettier ^3`, `typescript ^5` — the consumer supplies the toolchain, the config supplies the rules.

### `@noodlestan/tsconfig`

- No `main` or `exports`: consumers point `extends` at files inside the installed package (for example `@noodlestan/tsconfig/esbuild/tsconfig.json`).
- Preset directories are published as-is; see [typescript.md](typescript.md) for the stable kinds.

### `@noodlestan/prettier-config`

- `main`, `exports` and the package's own `prettier` field: `./src/index.cjs` — it formats itself with the rules it ships.
- `files`: `src`, `README.md`, `LICENSE-MIT`.
- `peerDependencies`: `prettier ^3.8.4` — the consumer supplies the engine, the config supplies the rules.

### `@noodlestan/prettier-config-astro`

- `main`, `exports` and `prettier`: `./src/index.cjs`, which spreads the base rules and adds the Astro overrides.
- `files`: `src`, `README.md`, `LICENSE-MIT`.
- `dependencies`: `@noodlestan/prettier-config` `0.1.0` — exact, so Astro consumers never install a second base version.
- `peerDependencies`: `prettier ^3.8.4`, `prettier-plugin-astro ^1.1.0`.

## Inside This Repository

- npm workspaces resolve `cli/*` and `configs/*`. A root dev dependency whose version matches the workspace package (for example `@noodlestan/eslint-config 0.0.8`) links to the local package instead of the registry.
- The root `package.json` also declares `noodlestan/esbuild-cli` and `noodlestan/esbuild-cli-watch`, pointing at `cli/esbuild-cli/bin/*`, so the bins are available when the repository is consumed from a git URL.
- Package facts live in `_records/` next to each package; the records are the source of truth for what exists and what publishes.
