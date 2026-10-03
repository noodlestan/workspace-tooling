# Noodlestan Prettier Config Astro

> Noodlestan's Prettier formatting configuration with Astro support.

## Usage

Install the package alongside [Prettier](https://prettier.io/):

```bash
npm install --save-dev @noodlestan/prettier-config-astro prettier
```

Then point your repository at it from the `prettier` field of your `package.json`:

```json
{
  "prettier": "@noodlestan/prettier-config-astro"
}
```

**⚠️ Note:** delete your repository's own `.prettierrc` (or `.prettierrc.json`,
`.prettierrc.js`, …). A local Prettier config file shadows the `prettier` field of
`package.json`, so leaving one in place silently keeps your hand-written rules
instead of Noodlestan's.

## Plugins

`prettier-plugin-astro` is a **peer dependency** of this package, so npm installs it
automatically alongside the config — there is no extra setup step. It is declared
explicitly in the `plugins` array because Prettier 3 no longer searches
`node_modules` for plugins on its own, and without that entry the `astro` parser
cannot be resolved and `.astro` files fail to format.

## Rules

The configuration resolves to `@noodlestan/prettier-config` — `printWidth: 100`,
`tabWidth: 2`, `semi: true`, `singleQuote: true`, `trailingComma: "all"`,
`arrowParens: "avoid"`, plus `useTabs: true` for the JS family — with one extra
`overrides` entry appended:

| Rule      | Value     |
| --------- | --------- |
| `files`   | `*.astro` |
| `useTabs` | `true`    |
| `parser`  | `astro`   |

The Astro-specific delta alone is also available on the `./json` subpath:

```json
{
  "prettier": {
    "...": "...",
    "...@noodlestan/prettier-config-astro/json": {}
  }
}
```

**⚠️ Note:** the `./json` subpath is a **partial Astro-only delta**. It carries the
`plugins` array and the `*.astro` override, and nothing else — it does **not**
include the base rules from `@noodlestan/prettier-config`. Spread
`@noodlestan/prettier-config/json` alongside it, or adopt the package itself, or
your repository loses Noodlestan's base formatting.

## License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
