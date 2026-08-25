# Noodlestan Workspace Tooling

> Build tooling for Noodlestan packages: an esbuild CLI wrapper plus the base ESLint and TypeScript configurations.

Every Noodlestan project repo consumes these packages so that no repo builds through the workspace. Cross-repo dependencies resolve via git URLs until a repo is stable.

## Packages

| Package                     | Location                | Purpose                                                                                                      |
| --------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| `@noodlestan/esbuild`       | `cli/esbuild-cli`       | esbuild build/watch wrapper. Bins: `noodlestan/esbuild-cli` (build), `noodlestan/esbuild-cli-watch` (watch). |
| `@noodlestan/eslint-config` | `configs/eslint-config` | Noodlestan's opinionated style guide configuration (ESLint + Prettier).                                      |
| `@noodlestan/tsconfig`      | `configs/tsconfig`      | Base TypeScript configurations (libs and cli variants).                                                      |

The declared namespaced esbuild bins are linked by npm as `esbuild-cli` and
`esbuild-cli-watch`.

## Getting started

First make sure you are using the correct node version by running `nvm use`.

Install dependencies with `npm install`.

- `npm run lint` - Check formatting (ESLint + Prettier).
- `npm run build` - Build all packages.
- `npm run test` - Run tests.

Pre-commit hooks (via lefthook) run the repo's lint.

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
