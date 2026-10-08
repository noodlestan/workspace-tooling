# Noodlestan Prettier Config Astro

> Noodlestan's Prettier formatting configuration with Astro support.

## Usage

Install the package alongside [Prettier](https://prettier.io/) and [prettier-plugin-astro](https://github.com/withastro/prettier-plugin-astro).

```bash
npm install --save-dev @noodlestan/prettier-config-astro prettier prettier-plugin-astro
```

Then point your repository or package at the config from the `prettier` field of your `package.json`:

```json
{
  "prettier": "@noodlestan/prettier-config-astro"
}
```

**⚠️ Note:** delete your repository's or library's own `.prettierrc` (or `.prettierrc.json`,
`.prettierrc.js`, …). A local Prettier config file shadows the `prettier` field of
`package.json`.

## Peer Depedencies

Both `prettier` and `prettier-plugin-astro` are peer dependencies of this package and must be installed in the target project.

## Rules

The configuration resolves to [@noodlestan/prettier-config](../prettier-config/README.md) adding an override for `.astro` files.

| Rule      | Value     |
| --------- | --------- |
| `files`   | `*.astro` |
| `useTabs` | `true`    |
| `parser`  | `astro`   |

## Development

Make sure you read the [root README](../../README.md) first.

### Scripts

Run from this package directory:

- `npm run lint` — report prettier issues
- `npm run lint:fix` — fix formatting and lint issues

## License

Copyright (c) 2026 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
