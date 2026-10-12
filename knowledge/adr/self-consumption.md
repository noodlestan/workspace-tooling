# Self-Consumption of Configs and Tools

**Purpose:** Decide how this repository consumes the config and build packages it publishes.

## Decision: Consume the Packages This Repository Publishes

**Status:** Proposed

**Context:** This repository publishes its ESLint, Prettier, and TypeScript configuration as `@noodlestan/*` packages, yet hand-writes its own equivalents, so the packages go unexercised as consumers use them and shipped rules drift from internal use.

**Decision:** Every package and the monorepo root consume the published packages by name, resolved to the local workspace copy through npm workspaces — never a hand-written equivalent or a relative-path reference.

**Consequences:**

- Configuration has one source of truth; a wrong or missing entry point (`main`, `exports`, `prettier`, `types`) fails before publication.
- The workspace symlink exposes the whole package directory, so consumption does not validate the `files` allow-list; a packaging check (`npm pack --dry-run`, `publint`) belongs in verification.
- A target with nothing to consume is recorded as a gap — a tooling package this repository does not yet provide.
