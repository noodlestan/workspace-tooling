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

## Decision: Config Published as a Versioned Package

**Status:** Adopted

**Context:** Sharing rules via a git dependency or a copied config file gives consumers no version history, no install-time resolution, and no way to pin a known-good guide.

**Decision:** Ship the guide as `@noodlestan/eslint-config` with independent semantic versions and `peerDependencies` on `eslint`, `prettier`, and `typescript`. The config owns the rules; the consumer owns the toolchain.

**Consequences:** Consumers upgrade the guide deliberately and can pin it. Peer ranges keep the engines compatible without the config dictating installation. This repository consumes the same package at the matching workspace version, so the guide is validated against itself before release.

## Decision: Stable Consumer Kinds Are `esbuild` and `vite` Only

**Status:** Proposed

**Context:** `@noodlestan/tsconfig` shipped presets for `cli`, `libs`, `esbuild`, `vite`, and `workspace`. The `cli` and `libs` families overlap: libraries built with the wrapper and libraries resolved by a bundler now belong to the `esbuild` and `vite` kinds, and `workspace` is a root-only convenience.

**Decision:** Support exactly two stable consumer kinds: `esbuild` (NodeNext module semantics, Node target, wrapper-built output) and `vite` (ESNext with `bundler` resolution and `vite/client` types, with a `-solid` variant). The `cli`, `libs`, and `workspace` presets are transitional: they stay published while their consumers migrate, are documented as in flux, and will be removed.

**Consequences:** New packages pick from two clear options instead of five overlapping ones. The cost is a migration window in which the package still ships presets it recommends against, and the `files` list must keep covering them until removal.

## Decision: Presets Extended, No Project References

**Status:** Adopted

**Context:** TypeScript project references coordinate composite builds across packages. This toolchain builds packages with esbuild through turbo's task graph, so a second build graph would duplicate orchestration.

**Decision:** A package `extends` exactly one base preset from `@noodlestan/tsconfig` and owns its own `include`, `exclude`, and `rootDir`. Project references are not used.

**Consequences:** Each package has one obvious type-check configuration and no cross-package build coupling in TypeScript. Consumers must keep `include` and `exclude` accurate themselves, and composite builds remain out of scope.

## Decision: Strictness Fixed Centrally

**Status:** Adopted

**Context:** Every preset repeated the same strictness block, and packages could quietly relax it by forking the config.

**Decision:** All stable kinds apply one strictness block — `strict`, `noImplicitAny`, `verbatimModuleSyntax`, `isolatedModules`, `forceConsistentCasingInFileNames`, `noPropertyAccessFromIndexSignature`, `noUncheckedIndexedAccess` — while module semantics and type roots vary per kind. Presets declare `declaration: true` but emit nothing; declaration output is driven by the consumer's build config.

**Consequences:** Type safety does not vary by package, and the only sanctioned difference between kinds is module resolution and environment types. Relaxing strictness requires a decision record here rather than a local override.
