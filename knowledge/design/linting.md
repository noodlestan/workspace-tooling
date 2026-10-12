# Workspace Tooling - Linting

**Purpose:** State the lint and format configs available for consumers and how they work.

## Prettier

Prettier is available as a standalone set of configs (see [Packages](./packages.md) for all options).

| Config | Package                             | Scope                                                     |
| ------ | ----------------------------------- | --------------------------------------------------------- |
| Base   | `@noodlestan/prettier-config`       | every repository, at the monorepo root                    |
| Astro  | `@noodlestan/prettier-config-astro` | Astro application packages only, never at a monorepo root |

Both ship their rules as `src/index.cjs`; the Astro config spreads the base rules and adds the Astro overrides, so the two never disagree. Rules: tabs for JS/TS and spaces elsewhere, `printWidth: 100`, single quotes, trailing commas. `*.art` and `*.tart` are parsed as markdown.

Enforcement is two-point by decision — `plugin:prettier/recommended` as an ESLint rule, plus a standalone `prettier . -c` for files ESLint does not parse. See [adr/shared-config.md](../adr/shared-config.md).

### How Noodlestan Repositories Extend It

```json
{
  "prettier": "@noodlestan/prettier-config",
  "devDependencies": {
    "@noodlestan/prettier-config": "0.1.0"
  }
}
```

The field replaces `.prettierrc*` outright — delete it; the dependency is exact-pinned, never a caret range. Prettier resolves config by walking up from the file, so a package only overrides its monorepo root when its own `package.json` carries the field: that is how an application package adopts `@noodlestan/prettier-config-astro` while the root stays on the base config.

## ESLint

`@noodlestan/eslint-config` composes one export from layered files:

```
src/index.cjs
├── config/_base.cjs      — eslint:recommended + standard + plugin:prettier/recommended
├── config/typescript.cjs — TS overrides
├── config/solid.cjs      — SolidJS overrides
├── config/configs.cjs    — *.config.js and config/** relaxations
├── config/scripts.cjs    — scripts/** relaxations
├── config/tests.cjs      — test overrides
├── config/mdx.cjs        — MDX overrides
└── ignorePatterns        — node_modules/, coverage/, dist/
```

Rules live in `src/config/rules/` (`_base.cjs`, `_import-order.cjs`, `solid.cjs`, `typescript.cjs`) with severities centralised in `src/constants/severity.cjs`.

### Dependency Model

- The config package owns the rules: `@typescript-eslint`, `eslint-config-standard`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-mdx`, `eslint-plugin-prettier`, `eslint-plugin-solid`.
- Consumers own the toolchain through `peerDependencies`: `eslint ^8.57`, `prettier ^3.8`, `typescript ^5.9`.

### How Noodlestan Repositories Extend It

```js
// .eslintrc.cjs (or .eslintrc.js)
const config = require('@noodlestan/eslint-config');

module.exports = { ...config };
```

The style guide targets the Noodlestan web stack — SolidJS, Astro/Starlight. It is **not** for React or Vue codebases; per-path framework opt-ins are under consideration and not available today.

### Constraints

- ESLint 8 with the legacy `.eslintrc` format. A move to flat config is a decision record, not an incidental change.
- Rules are opinionated by design: variance belongs in consumer overrides, not in this package.
- Decisions are recorded in [adr/shared-config.md](../adr/shared-config.md).
