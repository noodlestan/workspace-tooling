# Noodlestan ESLint Config

> Noodlestan's opinionated style guide configuration (ESLint + Prettier).

## About Noodlestan's style guide

This style guide targets Noodlestan's web stack, mostly based on [Solid JS](https://www.solidjs.com/) and [Astro](https://docs.astro.build) / [Starlight](https://starlight.astro.build/) for documentation and sandboxes.

**⚠️ Note:** this style guide is not meant to be used on codebases that use React, Vue.js or any other frameworks. An opt-in method to setup rules for specific framework (on a per path basis) is being considered.

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

The config supplies the rules; your repository owns the `eslint`, `prettier`, and `typescript` versions through the declared peer dependencies. See [architecture/design/linting.md](../../architecture/design/linting.md) for how the config is composed and validated.

## Development

System requirements:

- [Node.js](https://nodejs.org/)
- [NVM](https://github.com/nvm-sh/nvm)

We recommended using [VS Code](https://code.visualstudio.com/) with the following extensions: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [MDX](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx), [SpellRight](https://marketplace.visualstudio.com/items?itemName=ban.spellright).

### Getting started

First make sure you are using the correct node version by running `nvm use`.

Install dependencies with `npm install`.

Run `npm run lint`. It will lint the example files provided.

### Tools

- [Lefthook](https://evilmartians.com/chronicles/lefthook-knock-your-teams-code-back-into-shape) - manages the git hooks

### Committing

Make sure the `pre-commit` hook was executed. It runs automatically before every commit: from the repository root, Lefthook runs `npm run clean`, `npm run extract`, then `npm run ci`, and `ci` covers this package's Prettier and ESLint checks.

## License

Copyright (c) 2024 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
