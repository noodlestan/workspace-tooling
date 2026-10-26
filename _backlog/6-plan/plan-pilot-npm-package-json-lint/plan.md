# Plan: Pilot Npm Package Json Lint

**ID:** `plan-pilot-npm-package-json-lint`

**Status:** `DRAFT`

**Template:** `plan`

**Has Context File:** `FALSE`

**Skill:** `write-plan`

**Purpose:** Pilot npm-package-json-lint in workspace-tooling and create the shared Noodlestan config package.

**Description:** Test https://npmpackagejsonlint.org/docs/api in workspace-tooling. Create `configs/package-json-lint` as package `@noodlestan/package-json-lint-config` (canonical). Encode policy rules from `$MANAGEMENT/_ops/packages/policy.md` into the config. Validate against existing manifests.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

::READ `$MANAGEMENT/_ops/packages/policy.md`

::READ `https://npmpackagejsonlint.org/docs/api`

---

## Summary

**Upstream:**

- Milestone: `../_roadmap/4-next/milestone-manifest-lint/milestone.md`
- Policy: `$MANAGEMENT/_ops/packages/policy.md`
- npm-package-json-lint API docs

**Scope:**

- Create `configs/package-json-lint/package.json` with name `@noodlestan/package-json-lint-config`
- Create config module that exports rules matching policy (field order, required fields, engines.node >=22, private/files/publishConfig rules, dependency pinning rules where expressible, repository format)
- Install `npm-package-json-lint` in workspace-tooling and add pilot script
- Run pilot against all package.json in workspace-tooling, fix config/issues as needed
- Publish/package for use by other repos

**Goals:**

- Working pilot in workspace-tooling
- Canonical config package `@noodlestan/package-json-lint-config` created
- Policy rules encoded in config

---

## Items:

| Iteration / Instructions                                                             | Status  |
| ------------------------------------------------------------------------------------ | ------- |
| Iteration: Create Config Package `./instructions/create-config-package.md`           | `DRAFT` |
| Iteration: Pilot In Workspace Tooling `./instructions/pilot-in-workspace-tooling.md` | `DRAFT` |

### Iteration: Create Config Package

**Id:** `create-config-package`

**Status:** `DRAFT`

**Purpose:** Create `@noodlestan/package-json-lint-config` in `configs/package-json-lint`.

**Description:** Scaffold package.json following policy, create config that encodes policy rules (field ordering where possible, required fields like engines.node, repository, private/publishConfig/files rules, no-carets rules for deps/devDeps per policy, peer deps carets). Export config in format expected by npm-package-json-lint.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Add `configs/package-json-lint/package.json`
- Add `configs/package-json-lint/index.js` or equivalent exporting rules
- Add README/LICENSE-CHANGELOG as needed per policy
- Update workspace-tooling workspace if needed

**Dependencies:**

- None

**Commits:**

- Commit: `feat: add @noodlestan/package-json-lint-config`

### Iteration: Pilot In Workspace Tooling

**Id:** `pilot-in-workspace-tooling`

**Status:** `DRAFT`

**Purpose:** Install and run npm-package-json-lint against workspace-tooling using the new config.

**Description:** Add npm-package-json-lint to devDependencies, add script to run linter, test against all package.json, adjust config to match policy, document results.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Update `workspace-tooling/package.json` (add dependency, add script)
- Run linter and fix any config issues
- Validate all manifests pass with config

**Dependencies:**

- Iteration: Create Config Package

**Commits:**

- Commit: `chore: pilot npm-package-json-lint in workspace-tooling`

---

## Work

### Next

Start with iteration `create-config-package`.

### Blockers

- npm-package-json-lint API needs to be reviewed for programmatic usage
- Some policy rules (like exact field ordering across all manifests) may need custom rules or post-processing

---

## Operating Instructions

::READ `$DOMAINS/operations/templates/operating-instructions-index.tart`
