# Noodlestan Workspace Tooling

> Build tooling for Noodlestan workspaces.

Esbuild CLI wrapper, ESLint config, and base TypeScript configs.

## Packages

| Package                             | Location                        | Purpose                                                                                                      |
| ----------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `@noodlestan/esbuild`               | `cli/esbuild-cli`               | esbuild build/watch wrapper. Bins: `noodlestan/esbuild-cli` (build), `noodlestan/esbuild-cli-watch` (watch). |
| `@noodlestan/eslint-config`         | `configs/eslint-config`         | Noodlestan's opinionated style guide configuration (ESLint + Prettier).                                      |
| `@noodlestan/prettier-config`       | `configs/prettier-config`       | Noodlestan's base Prettier formatting configuration.                                                         |
| `@noodlestan/prettier-config-astro` | `configs/prettier-config-astro` | Prettier formatting configuration with Astro support.                                                        |
| `@noodlestan/tsconfig`              | `configs/tsconfig`              | Base TypeScript configurations (libs and cli variants).                                                      |

The declared namespaced esbuild bins are linked by npm as `esbuild-cli` and
`esbuild-cli-watch`.

## Architecture

Documents and decision records for this repository live in
[architecture/index.md](architecture/index.md) — start with
[architecture/overview.md](architecture/overview.md) for the toolchain,
its rules, and the options available to consuming repositories.

## Development

System requirements:

- [Node.js](https://nodejs.org/)
- [NVM](https://github.com/nvm-sh/nvm)

We recommended using [VS Code](https://code.visualstudio.com/) with the following extensions: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

### Getting started

First make sure you are using the correct node version by running `nvm use`.

Install dependencies with `npm install`.

### Scripts

- `npm run turbo lint` - Check formatting (Prettier + ESLint) in all packages.
- `npm run turbo lint:fix` - Fix formatting issues (Prettier + ESLint) in all packages.
- `npm run ci` - Full build.

Pre-commit hooks (via [Lefthook](https://evilmartians.com/chronicles/lefthook-knock-your-teams-code-back-into-shape)) run the repo's `ci` on every package.

## License

MIT License

Copyright (c) 2024 Noodlestan https://noodlestan.org/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
