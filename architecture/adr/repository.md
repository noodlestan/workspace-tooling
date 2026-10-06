# Repository

**Purpose:** Decide how this repository is organised, verified, versioned, and published: workspaces, task graph, pre-commit, and releases.

## Decision: npm Workspaces With a Private Root Manifest

**Status:** Adopted

**Context:** The repository hosts three tooling packages that must be developed together and released independently. Adopting pnpm or yarn workspaces would change the package manager that Noodlestan repositories already use.

**Decision:** Use npm workspaces with `"workspaces": ["cli/*", "configs/*"]`, pinned `packageManager: npm@10.2.3`, and a `private: true` root package that acts as a tooling manifest: scripts, shared dev dependencies, and workspace wiring only.

**Consequences:** The root produces no artefacts and never publishes, so "tooling manifest, not build root" stays true. npm links workspace packages whose versions match root dependencies, which is how this repository dogfoods its own ESLint config. The single-package-manager constraint applies to every contributor and CI run.

## Decision: turbo as the Task Graph

**Status:** Adopted

**Context:** Three packages need ordered `build`, `lint`, and `ci` runs with caching. A shell loop cannot express "run a task after my dependencies' builds", and per-package `npm run` invocations do not scale as workspaces are added.

**Decision:** Use `turbo` to declare the task graph in `turbo.json`: `build` depends on `^build` and emits `dist/**`, `lint` and `lint:fix` depend on `^lint*`, `dev` depends on `^lint` and is persistent and uncacheable, and `ci` is uncached with `^ci` dependencies.

**Consequences:** Verification and builds scale across packages and cache where caching is safe. The `ci` task deliberately never caches, so a green `ci` always reflects a real run. Adding a package means complying with these task names rather than inventing new ones.

## Decision: Sequential Pre-Commit Hook as the Gate

**Status:** Adopted

**Context:** Hooks that run fast and in parallel encourage skipping work; hooks that are slow and opaque get bypassed. The repository's verification is short enough to run on every commit.

**Decision:** Lefthook runs `pre-commit` with `parallel: false`, in a fixed order: `npm run clean`, then `npm run extract`, then `npm run ci`. `assert_lefthook_installed` keeps the hook present, and `follow: true` reports failures from every step.

**Consequences:** Nothing reaches a commit without the full verification contract. The ordering means an unclean build fails before verification rather than during it. Commits are slower than a bare `git commit`; the trade-off is accepted because the suite is small today.

## Decision: Root Format Check Before Package CI

**Status:** Adopted

**Context:** Prettier must cover files ESLint never parses (Markdown, JSON, config files), and package-level lint scripts only see their own package.

**Decision:** `npm run ci` composes `ci:root` — a repository-wide `prettier . -c` — followed by `turbo run ci` for the per-package checks. The root `lint` script is the same formatting check, with `lint:fix` as its write variant.

**Consequences:** A single command verifies the whole repository, and formatting is checked once for everything instead of per package. Root-level formatting failures are reported before any package work starts.

## Decision: Independent Per-Package Versions, Public Leaf Packages

**Status:** Adopted

**Context:** The packages change at different rates: a rule tweak in the ESLint config has nothing to do with a build-wrapper change. A fixed version scheme would force unrelated releases.

**Decision:** Each leaf package versions independently (`0.0.8`, `0.1.0`, `0.1.0` at the time of writing), publishes with `publishConfig.access: public`, and keeps `private: true` off. The root never publishes.

**Consequences:** Consumers upgrade only what changed, and a breaking preset change does not force a wrapper release. Releases are manual, per package, so there is no release automation and no repository-wide version to communicate.

## Decision: Per-Package Changelog

**Status:** Proposed

**Context:** Consumers need to know what changed in the package they upgrade. Releases today are manual, and only `@noodlestan/esbuild` and `@noodlestan/tsconfig` carry a `CHANGELOG.md`.

**Decision:** Every published package keeps a `CHANGELOG.md` in its own directory, written at release time, recording additions, changes, and removals per version — especially preset removals and config contract changes.

**Consequences:** Upgrade notes live next to the package rather than in repository history. Until all three packages carry one, consumers of `@noodlestan/eslint-config` have no local record of rule changes, which is the gap this closes.
