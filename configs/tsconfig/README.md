# Noodlestan TS Config

> Enforcing consistency and strict standards across all Noodlestan packages.

Base TypeScript configurations for Noodlestan packages (`esbuild`, `vite`, and `monorepo` presets).

## Configs

| Kind       | Preset                                             | Use for                                      |
| ---------- | -------------------------------------------------- | -------------------------------------------- |
| `esbuild`  | `@noodlestan/tsconfig/esbuild/tsconfig.json`       | Packages built with `@noodlestan/esbuild`    |
| `esbuild`  | `@noodlestan/tsconfig/esbuild/tsconfig-solid.json` | JSX set to `solid-js`.                       |
| `vite`     | `@noodlestan/tsconfig/vite/tsconfig.json`          | Packages resolved by Vite and other bundlers |
| `vite`     | `@noodlestan/tsconfig/vite/tsconfig-solid.json`    | JSX set to `solid-js`.                       |
| `monorepo` | `@noodlestan/tsconfig/monorepo/tsconfig.json`      | Monorepo root tsconfig.                      |

## Usage

### Install

Install:

```bash
npm install @noodlestan/tsconfig
```

Extend configuration.

```json
{
  "extends": "@noodlestan/tsconfig/esbuild/tsconfig.json",
  "compilerOptions": {},
  "include": ["src/", "test/", "**/*.config.ts"],
  "exclude": ["**/node_modules/", "**/dist/", "**/coverage/"]
}
```

## Development

Make sure you read the [root README](../../README.md) first.

### Scripts

Run from this package directory:

- `npm run lint` — report prettier issues
- `npm run lint:fix` — fix formatting and lint issues

## License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
