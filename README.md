# Noodlestan Workspace Tooling

> Build tooling for Noodlestan packages: an esbuild CLI wrapper plus the base ESLint and TypeScript configurations.

Every Noodlestan project repo consumes these packages so that no repo builds through the workspace. Cross-repo dependencies resolve via git URLs until a repo is stable.

## Packages

| Package | Location | Purpose |
| --- | --- | --- |
| `@noodlestan/esbuild` | `cli/esbuild-cli` | esbuild build/watch wrapper. Bins: `noodlestan/esbuild-cli` (build), `noodlestan/esbuild-cli-watch` (watch). |
| `@noodlestan/eslint-config` | `configs/eslint-config` | Noodlestan's opinionated style guide configuration (ESLint + Prettier). |
| `@noodlestan/tsconfig` | `configs/tsconfig` | Base TypeScript configurations (libs and cli variants). |

## Getting started

First make sure you are using the correct node version by running `nvm use`.

Install dependencies with `npm install`.

- `npm run lint` - Check formatting (ESLint + Prettier).
- `npm run build` - Build all packages.
- `npm run test` - Run tests.

Pre-commit hooks (via lefthook) run the repo's lint.

## MIT License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
