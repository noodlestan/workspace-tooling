# Milestone: Manifest Lint

**ID:** `milestone-manifest-lint`

**Status:** `DRAFT`

**Template:** `milestone`

**Has Context File:** `FALSE`

**Skill:** `write-milestone`

**Purpose:** Establish a canonical package manifest linting to enforce the package policy across all repositories.

**Description:** Move policy into deterministic checks ran at pre-commit time. Roll out the linter repo by repo.

## Mandatory Reading

::READ `$DOMAINS/milestones/structures/milestone.art` (Structure) — Defines the milestone structure and nested types.

::READ `$MANAGEMENT/_ops/packages/policy.md`

::READ `$MANAGEMENT/_ops/packages/inventory.md`

::READ `$MANAGEMENT/_ops/packages/dependencies.md`

---

## Summary

**Upstream:**

- Policy: `$MANAGEMENT/_ops/packages/policy.md`
- npm-package-json-lint: https://npmpackagejsonlint.org/docs/api

**Scope:**

- Create and publish `@noodlestan/package-json-lint-config` in `configs/package-json-lint` (workspace-tooling)
- Pilot npm-package-json-lint in workspace-tooling
- Build and publish `@noodlestan/manifest-lint` in `cli/manifest-lint` to run npm-package-json-lint with our config + custom rules
- Roll out manifest lint across all repos

**Goals:**

- Policy becomes enforceable via linter rules
- Consistent enforcement with auto-fix where possible

## Phases

| Index | Name                        | Status  |
| ----- | --------------------------- | ------- |
| #1    | Pilot Npm Package Json Lint | `DRAFT` |
| #2    | Manifest Lint               | `DRAFT` |
| #3    | Rollout Manifest Lint       | `DRAFT` |

### Phase: 1 — Pilot Npm Package Json Lint

**Goal:** Validate npm-package-json-lint in workspace-tooling and establish our shared config package.

**Description:** Test the library/API in workspace-tooling, create `configs/package-json-lint` as `@noodlestan/package-json-lint-config` (canonical), wire it up, and document learnings.

**Status:** `DRAFT`

**Dependencies:**

- workspace-tooling repo available

### Phase: 2 — Manifest Lint

**Goal:** Build our own CLI in `cli/manifest-lint` that runs npm-package-json-lint with our config and adds custom rules.

**Description:** CLI uses npm-package-json-lint API with preloaded config, supports --fix, enforces additional custom rules.

**Status:** `DRAFT`

**Dependencies:**

- Phase 1 complete

### Phase: 3 — Rollout Manifest Lint

**Goal:** Roll out repo by repo across all checkouts.

**Description:** Install/configure @noodlestan/manifest-lint in each repo, run first pass with fixes where possible, address remaining issues, and ensure CI integration.

**Status:** `DRAFT`

**Dependencies:**

- Phase 3 complete

---

## Items:

| Phase | Resource / Record                                                                               | Status  |
| ----- | ----------------------------------------------------------------------------------------------- | ------- |
| 1     | Plan: Pilot Npm Package Json Lint `../_backlog/6-plan/plan-pilot-npm-package-json-lint/plan.md` | `DRAFT` |
| -     |                                                                                                 |         |
| 2     | Plan: Manifest Lint `../_backlog/6-plan/plan-manifest-lint/plan.md`                             | `DRAFT` |
| -     |                                                                                                 |         |
| 3     | Plan: Rollout Manifest Lint `../_backlog/6-plan/plan-rollout-manifest-lint/plan.md`             | `DRAFT` |

---

## Work

### Next

Start with Phase 1: create `@noodlestan/package-json-lint-config` in workspace-tooling and pilot npm-package-json-lint.

### Blockers

- **npm-package-json-lint API**: Need to understand API surface for programmatic use with custom config.

---

## Operating Instructions

::READ `$DOMAINS/operations/templates/operating-instructions-index.tart`
