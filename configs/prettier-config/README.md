# Noodlestan Prettier Config

> Noodlestan's canonical base Prettier formatting configuration.

## Usage

Install the package alongside [Prettier](https://prettier.io/):

```bash
npm install --save-dev @noodlestan/prettier-config prettier
```

Then point your repository or package at the config from the `prettier` field of your `package.json`:

```json
{
  "prettier": "@noodlestan/prettier-config"
}
```

**⚠️ Note:** delete your repository's or library's own `.prettierrc` (or `.prettierrc.json`,
`.prettierrc.js`, …). A local Prettier config file shadows the `prettier` field of
`package.json`.

### Peer Depedencies

The `prettier` package is a peer dependencies of this package and must be installed in the target project.

## Rules

The configuration resolves to the following rules:

| Rule            | Value     |
| --------------- | --------- |
| `useTabs`       | `false`   |
| `printWidth`    | `100`     |
| `tabWidth`      | `2`       |
| `semi`          | `true`    |
| `singleQuote`   | `true`    |
| `trailingComma` | `"all"`   |
| `arrowParens`   | `"avoid"` |

An `overrides` entry sets `useTabs: true` for `*.js`, `*.cjs`, `*.mjs`, `*.mts`,
`*.ts` and `*.tsx`.

## Development

Make sure you read the [root README](../../README.md) first.

### Scripts

Run from this package directory:

- `npm run lint` — report prettier issues
- `npm run lint:fix` — fix formatting and lint issues

## License

Copyright (c) 2026 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
