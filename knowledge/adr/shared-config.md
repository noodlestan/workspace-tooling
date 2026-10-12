# Shared Configuration

**Purpose:** Decide the shared lint/format and TypeScript configuration shipped to Noodlestan repositories, and the rules consumers inherit.

## Decision: One Opinionated ESLint Config Package

**Status:** Adopted

**Context:** Each Noodlestan repository linted itself with its own ruleset. Style drift followed, and a rule change meant editing every repository.

**Decision:** Publish a single package, `@noodlestan/eslint-config`, holding Noodlestan's style guide as layered overrides composed into one export (`src/index.cjs`). Consumers spread that export from their own ESLint entry file and do not restate rules.

**Consequences:** A rule change is a package version, not a multi-repo edit. The guide stays opinionated: variance belongs in consumer overrides, and adding a framework or a rule family is a change here with its own review. The package targets the Noodlestan stack (SolidJS, Astro/Starlight) and is explicitly not for React or Vue codebases.

## Decision: Prettier as Both an ESLint Rule and a Standalone Check

**Status:** Adopted

**Context:** Formatting could be enforced through `eslint-plugin-prettier` alone, through `prettier --check` alone, or both. ESLint alone does not reach Markdown, JSON, or CSS; Prettier alone does not run in every package's lint script.

**Decision:** Enforce formatting twice. `plugin:prettier/recommended` runs Prettier as an ESLint rule (`prettier/prettier: error`) so any package running ESLint fails on formatting, and `prettier . -c` runs as a standalone check covering files ESLint does not parse. `eslint-config-prettier` disables conflicting ESLint rules.

**Consequences:** One formatting source of truth, two enforcement points, no rule conflicts. The trade-off is double reporting on the same files and formatting rules visible in ESLint output; both are accepted to keep a single pass sufficient wherever linting happens.

## Decision: TSConfig Scoped to Consumer Build Tool `esbuild` or `vite`

**Status:** Adopted

**Decision:** Support exactly two consumer types: `esbuild` (NodeNext module semantics, Node target, wrapper-built output) and `vite` (ESNext with `bundler` resolution and `vite/client` types, with a `-solid` variant) and a convinience `workspace` preset for workspaces (not built).

## Decision: No Typescript Project References

**Status:** Adopted

**Context:** TypeScript project references allow coordinating composite builds across packages.

**Decision:** A package `extends` exactly one base preset from `@noodlestan/tsconfig` and owns its own `include`, `exclude`, and `rootDir`. Project references are not used.

**Consequences:** Each package has one obvious type-check configuration and no cross-package build coupling in TypeScript. Consumers must keep `include` and `exclude` accurate themselves, and coordinate composite build through turbo's task graph.

## Decision: TSConfig Strict Preset

**Status:** Adopted

**Context:** Every preset repeated the same strictness block, and packages could quietly relax it by forking the config.

**Decision:** All TSConfig apply one strictness block — `strict`, `noImplicitAny`, `verbatimModuleSyntax`, `isolatedModules`, `forceConsistentCasingInFileNames`, `noPropertyAccessFromIndexSignature`, `noUncheckedIndexedAccess` — while module semantics and type roots vary per kind. Presets declare `declaration: true` but emit nothing; declaration output is driven by the consumer's build config.

**Consequences:** Type safety does not vary by package, and the only sanctioned difference between types is module resolution and environment types. Relaxing strictness requires a decision record here rather than a local override.
