# Overview: Workspace Tooling

**Purpose:** Provide an overview of the toolchain for noodlestan repositories and inform authors about rules, constraints and available options.

## What

This repository (`noodlestan/workspace-tooling`) is the build tooling for Noodlestan workspaces: an esbuild wrapper, a shared style-guide configuration, and base TypeScript configurations, published as three npm packages.

| Package                     | Path                    | What it provides                                                           |
| --------------------------- | ----------------------- | -------------------------------------------------------------------------- |
| `@noodlestan/esbuild`       | `cli/esbuild-cli`       | `esbuild-cli` and `esbuild-cli-watch` bins, plus opt-in post-build plugins |
| `@noodlestan/eslint-config` | `configs/eslint-config` | Noodlestan's ESLint + Prettier style guide                                 |
| `@noodlestan/tsconfig`      | `configs/tsconfig`      | Base TypeScript presets for the `esbuild` and `vite` consumer kinds        |

## Why

Without this repository, every Noodlestan package would define and maintain its own build, lint, and type-check configuration. Conventions would drift, a rule change would mean touching every repository, and the "right way" to build a package would stay implicit in individual configs.

Key benefits:

- **One place to change a convention.** Rules, presets, and build defaults are edited once and released as a package version.
- **Restricted variance.** The wrapper fixes the options that matter (platform, target, output layout, module format) and leaves a small, explicit config surface for consumers.
- **A documentation layer.** Build patterns, style rules, and type settings are written down here instead of being inferred from scattered configs.

## Audience and Scope

Every document and decision record in this directory opens with a `**Purpose:**` line that names its scope:

- **This repository** — how the monorepo is laid out, verified, versioned, and published.
- **Noodlestan repositories (consumers)** — the rules, constraints, and options that packages and repositories adopting this tooling inherit.

Read the purpose line before applying a statement: a rule about the wrapper's internal defaults belongs to this repository, while a rule about module format in published output binds every Noodlestan package.

## Definitions

- **Noodlestan repository** — a project repository in the Noodlestan ecosystem. A repository that adopts this tooling is a **consumer**.
- **Consumer kind** — the category that selects a TypeScript preset and build expectations for a package. The stable kinds are `esbuild` and `vite`.
- **Target** — one of the `cjs` or `esm` build outputs declared in a consumer's `build.config.mjs`.
- **Preset** — one JSON configuration file shipped by `@noodlestan/tsconfig`.
- **Records** — the `.art` files in `_records/` that are the source of truth for project, repository, and package facts.

## Use Cases

- A consumer package builds and watches its sources through `esbuild-cli` and `esbuild-cli-watch`.
- An author changes a lint rule once, releases `@noodlestan/eslint-config`, and consumers pick it up on their next install.
- A package author picks the `esbuild` or `vite` preset, extends it, and owns only `include`, `rootDir`, and emit decisions.
- A maintainer verifies the whole monorepo with `npm run ci` and publishes only the leaf packages.

## How It Works

### Verification

1. Lefthook runs a `pre-commit` hook: `npm run clean`, then `npm run extract`, then `npm run ci`.
2. `npm run ci` runs the root format check (`ci:root`, Prettier) and then `turbo run ci` across every package.
3. Each package's `ci` script runs Prettier and, where present, ESLint over its own sources.

### Publishing

1. The root package stays `private`; only the three leaf packages publish, each with `publishConfig.access: public`.
2. Versions are independent per package and released from this repository.
3. Consumers install the published packages; npm workspaces link them inside this monorepo.
