# Noodlestan ESLint Config

> Noodlestan's opinionated style guide configuration (ESLint + Prettier).

## About Noodlestan's style guide

This style guide targets Noodlestan's web stack, mostly based on [Solid JS](https://www.solidjs.com/) and [Astro](https://docs.astro.build) / [Starlight](https://starlight.astro.build/) for documentation and sandboxes.

The style guide was built on top of:

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

We use [eslint-config-standard](https://github.com/standard/eslint-config-standard) as a base for all JS/TS(X) linting and formatting.

And a few more plugins:

- [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import) - automate order of import statements
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) - accessibility rules
- [eslint-plugin-mdx](https://github.com/mdx-js/eslint-mdx) - parser and rules for MDX files
- [eslint-plugin-solid](https://github.com/solidjs-community/eslint-plugin-solid) - SolidJS specific rules
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) - disables rules that would otherwise conflict with Prettier
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) - runs prettier as an ESLint rule

Our overrides can be found in [src/config](./src/config/).

## Usage

Install the config and its peers, then spread it from your ESLint entry file:

```bash
npm install --save-dev @noodlestan/eslint-config eslint prettier typescript
```

```js
// .eslintrc.cjs
const config = require('@noodlestan/eslint-config');

module.exports = { ...config };
```

The config supplies the rules; your repository owns the `eslint`, `prettier`, and `typescript` versions through the declared peer dependencies. See [knowledge/design/linting.md](../../knowledge/design/linting.md) for how the config is composed and validated.

## Development

Make sure you read the [root README](../../README.md) first.

### Scripts

Run from this package directory:

- `npm run lint` — report prettier issues
- `npm run lint:fix` — fix formatting and lint issues

## License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
