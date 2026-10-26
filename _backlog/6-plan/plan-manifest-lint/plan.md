# Plan: Manifest Lint

**ID:** `plan-manifest-lint`

**Status:** `DRAFT`

**Template:** `plan`

**Has Context File:** `FALSE`

**Skill:** `write-plan`

**Purpose:** Create CLI in cli/manifest-lint-ci that runs npm-package-json-lint with our config and custom rules.

**Description:** Build a CLI tool that uses npm-package-json-lint API with preloaded config from @noodlestan/package-json-lint-config. Supports --fix. Enforces additional custom rules beyond base linter.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure)

::READ `$MANAGEMENT/_ops/packages/policy.md`

::READ `https://npmpackagejsonlint.org/docs/api`

---

## Summary

**Upstream:**

- Milestone: `../_roadmap/4-next/milestone-manifest-lint/milestone.md`
- Config package: `@noodlestan/package-json-lint-config`

**Scope:**

- Create `cli/manifest-lint` in workspace-tooling
- Use npm-package-json-lint API programmatically
- Load and apply @noodlestan/package-json-lint-config
- Implement --fix support
- Add custom rules for Noodlestan-specific checks

**Goals:**

- Working CLI that enforces policy
- Fix mode works
- Integrates with CI

---

## Items:

| Iteration / Instructions                                                               | Status  |
| -------------------------------------------------------------------------------------- | ------- |
| Iteration: Scaffold CLI `./instructions/scaffold-cli.md`                               | `DRAFT` |
| Iteration: Integrate Linter And Config `./instructions/integrate-linter-and-config.md` | `DRAFT` |
| Iteration: Add Custom Rules `./instructions/add-custom-rules.md`                       | `DRAFT` |

### Iteration: Scaffold CLI

**Id:** `scaffold-cli`

**Status:** `DRAFT`

**Purpose:** Create cli/manifest-lint-ci.

**Description:** Scaffold package following policy, add bin, basic CLI structure (commander), tests setup.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Add cli/manifest-lint-ci/package.json
- Add src/index.ts with CLI entry
- Add README/LICENSE-CHANGELOG

**Dependencies:**

- None

**Commits:**

- Commit: `feat: scaffold manifest-lint-ci CLI`

### Iteration: Integrate Linter And Config

**Id:** `integrate-linter-and-config`

**Status:** `DRAFT`

**Purpose:** Integrate npm-package-json-lint API with our config.

**Description:** Use npm-package-json-lint programmatically, load @noodlestan/package-json-lint-config, run on all package.json in repo, support --fix, report errors clearly.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Add dependencies on npm-package-json-lint and config package
- Implement linting logic
- Add --fix support

**Dependencies:**

- Iteration: Scaffold CLI
- Plan: Pilot Npm Package Json Lint (config package available)

**Commits:**

- Commit: `feat: integrate npm-package-json-lint with config and fix support`

### Iteration: Add Custom Rules

**Id:** `add-custom-rules`

**Status:** `DRAFT`

**Purpose:** Add Noodlestan-specific custom rules beyond base linter.

**Description:** Implement custom rules for Noodlestan-specific checks that npm-package-json-lint doesn't cover natively (e.g., field ordering, repository format, dependency pinning model).

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Add custom rule implementations
- Add error messages with suggested fixes

**Dependencies:**

- Iteration: Integrate Linter And Config

**Commits:**

- Commit: `feat: add custom manifest lint rules`

---

## Work

### Next

Scaffold CLI first.

### Blockers

- npm-package-json-lint API details for programmatic use and fix

---

## Operating Instructions

::READ `$DOMAINS/operations/templates/operating-instructions-index.tart`
