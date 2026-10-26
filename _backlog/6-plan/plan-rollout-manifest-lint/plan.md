# Plan: Rollout Manifest Lint

**ID:** `plan-rollout-manifest-lint`

**Status:** `DRAFT`

**Template:** `plan`

**Has Context File:** `FALSE`

**Skill:** `write-plan`

**Purpose:** Roll out manifest-lint-ci across all repos repo by repo.

**Description:** Install and configure manifest-lint-ci in each checkout, run first pass with --fix where possible, address remaining issues, integrate into CI.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure)

::READ `$MANAGEMENT/_ops/packages/policy.md`

::READ `$MANAGEMENT/_ops/packages/inventory.md`

---

## Summary

**Upstream:**

- Milestone: `../_roadmap/4-next/milestone-manifest-lint/milestone.md`
- CLI: cli/manifest-lint

**Scope:**

- Roll out to all repos in checkouts/ (art-boards, art-js, art-lib, art-md, art-works, artificials, artisans, conventions, management, no-comply, noodlestan-web, purrception, purrfect, purrpose, purrtrait, workspace-tooling)
- Add `@noodlestan/manifest-lint` dependency, add script, configure
- Run lint --fix, commit fixes
- Add to CI

**Goals:**

- All repos passing manifest lint
- CI enforcing manifest policy

---

## Items:

| Iteration / Instructions                                                                 | Status  |
| ---------------------------------------------------------------------------------------- | ------- |
| Iteration: Rollout To Workspace Tooling `./instructions/rollout-to-workspace-tooling.md` | `DRAFT` |
| Iteration: Rollout To Other Repos `./instructions/rollout-to-other-repos.md`             | `DRAFT` |

### Iteration: Rollout To Workspace Tooling

**Id:** `rollout-to-workspace-tooling`

**Status:** `DRAFT`

**Purpose:** Roll out to workspace-tooling first as reference.

**Description:** Install @noodlestan/manifest-lint, add script, run with --fix, fix remaining issues, add to CI.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Update workspace-tooling/package.json
- Run lint --fix
- Update CI config

**Dependencies:**

- Plan: Manifest Lint

**Commits:**

- Commit: `chore: add @noodlestan/manifest-lint to workspace-tooling`

### Iteration: Rollout To Other Repos

**Id:** `rollout-to-other-repos`

**Status:** `DRAFT`

**Purpose:** Roll out to all remaining repos.

**Description:** For each repo in checkouts/, install/configure @noodlestan/manifest-lint, run lint --fix, address issues, update CI. Do repo by repo.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Update each repo's package.json and CI
- Apply fixes

**Dependencies:**

- Iteration: Rollout To Workspace Tooling

**Commits:**

- Commit: `chore: rollout @noodlestan/manifest-lint across all repos`

---

## Work

### Next

Start with workspace-tooling.

### Blockers

- None

---

## Operating Instructions

::READ `$DOMAINS/operations/templates/operating-instructions-index.tart`
