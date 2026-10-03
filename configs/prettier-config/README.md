# Noodlestan Prettier Config

> Noodlestan's canonical base Prettier formatting configuration.

## Usage

Install the package alongside [Prettier](https://prettier.io/):

```bash
npm install --save-dev @noodlestan/prettier-config prettier
```

Then point your repository at it from the `prettier` field of your `package.json`:

```json
{
  "prettier": "@noodlestan/prettier-config"
}
```

**⚠️ Note:** delete your repository's own `.prettierrc` (or `.prettierrc.json`,
`.prettierrc.js`, …). A local Prettier config file shadows the `prettier` field of
`package.json`, so leaving one in place silently keeps your hand-written rules
instead of Noodlestan's.

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

The raw rules are also available on the `./json` subpath, for consumers that want
to spread them into a local config:

```json
{
  "prettier": {
    "printWidth": 120,
    "...": "...",
    "...@noodlestan/prettier-config/json": {}
  }
}
```

## License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
