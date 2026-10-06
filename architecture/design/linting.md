# Workspace Tooling - Linting

**Purpose:** State the lint and format rules that govern this repository, the shared configuration Noodlestan repositories extend, and how configuration changes are authored and validated.

## Rules That Govern This Repository

| Layer      | Source                        | Command                                             |
| ---------- | ----------------------------- | --------------------------------------------------- |
| Formatting | `.prettierrc`                 | `npm run lint` / `lint:fix` (root: `prettier . -c`) |
| Linting    | `.eslintrc.js`                | Per package: `eslint .`                             |
| Gate       | `ci:root` inside `npm run ci` | Runs the Prettier check on everything               |

- The root `.eslintrc.js` spreads `@noodlestan/eslint-config` — this repository consumes its own shared configuration.
- `.prettierrc` sets `printWidth: 100`, single quotes, trailing commas, and **tabs for JS/TS files only**; Markdown and other files use spaces.
- The root `lint` script formats everything; package `lint` scripts run Prettier plus ESLint over that package.

## The Shared Configuration Package

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

### Prettier

Prettier is enforced twice, deliberately:

1. **As an ESLint rule** — `plugin:prettier/recommended` with `prettier/prettier: error`, so a package running ESLint also fails on formatting.
2. **As a standalone check** — `prettier . -c`, which covers files ESLint does not reach (Markdown, JSON, CSS).

`eslint-config-prettier` disables the ESLint rules that would otherwise conflict with Prettier.

### Dependency Model

- The config package owns the rules: `@typescript-eslint`, `eslint-config-standard`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-mdx`, `eslint-plugin-prettier`, `eslint-plugin-solid`.
- Consumers own the toolchain through `peerDependencies`: `eslint ^8.57`, `prettier ^3.8`, `typescript ^5.9`.

## How Noodlestan Repositories Extend It

```js
// .eslintrc.cjs (or .eslintrc.js)
const config = require('@noodlestan/eslint-config');

module.exports = { ...config };
```

The style guide targets the Noodlestan web stack — SolidJS, Astro/Starlight. It is **not** for React or Vue codebases; per-path framework opt-ins are under consideration and not available today.

## Authoring and Validating Changes

1. Edit the layered files under `src/config/`, keeping rule severities in `src/constants/severity.cjs`.
2. Run `npm run lint` in the package. The fixtures in `test/` (`foo.ts`, `bar.ts`, `component.tsx`, `index.mdx`) are linted as the de-facto expectations — there is no test suite yet.
3. Run `npm run ci` from the repository root to verify every package.
4. Bump `@noodlestan/eslint-config` independently and release; consumers pick the change up on their next install.

## Constraints

- ESLint 8 with the legacy `.eslintrc` format. A move to flat config is a decision record, not an incidental change.
- Rules are opinionated by design: variance belongs in consumer overrides, not in this package.
- Decisions are recorded in [adr/shared-config.md](../adr/shared-config.md).
