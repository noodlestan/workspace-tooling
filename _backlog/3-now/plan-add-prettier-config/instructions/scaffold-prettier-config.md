# Instructions: `scaffold-prettier-config`

**Plan:** `add-prettier-config`

**Iteration Id:** `scaffold-prettier-config`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-prettier-config/instructions/scaffold-prettier-config__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `scaffold-prettier-config`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                       | Purpose                                  |
| ------------ | ----------------------------------- | ---------------------------------------- |
| `$WORKSPACE` | Current working directory           | Workspace root directory.                |
| `$PROJECT`   | Provided with prompt                | Monorepo root; receives the new package. |
| `$PKG`       | `$PROJECT/configs/prettier-config/` | Package created by this iteration.       |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `scaffold-prettier-config`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Create `@noodlestan/prettier-config`, the publishable package carrying Noodlestan's canonical base Prettier rules, so consumer repositories stop hand-writing their own `.prettierrc`.

## Mandatory Reading

::READ `$PROJECT/configs/eslint-config/package.json` — the sibling package manifest to mirror: field set, `files`, `publishConfig`, and `peerDependencies` caret ranges.

::READ `$PROJECT/configs/eslint-config/_records/package.art` — package record to mirror field-for-field.

::READ `$PROJECT/configs/eslint-config/_records/npm-deployment.art` — deployment record to mirror.

::READ `$PROJECT/_records/scripts/eslint-config.art` — script set record to mirror for the new `Prettier Config Scripts` set.

::READ `$PROJECT/_records/dependencies/project-tools.art` — defines `Package Dependency: Prettier`, the peer entry this package declares.

::READ `$PROJECT/_records/project.art` — the project record whose `**Resources:**` list this package is added to.

::READ `$PROJECT/_guide.md` — the root guide whose `## Projects` table this package is added to.

::READ (Type: Package) FROM `$DOMAINS/packages/structures/package.art` — the canonical field set and heading format for `package.art`.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

### Operating Instructions: Setting Up

**Instructions:**

Run from the repository root (monorepo):

```bash
npm ci # to install dependencies.
```

## Changes

- Step 1 / 4 — Create the package manifest and license
- Step 2 / 4 — Create the config source files
- Step 3 / 4 — Create the records, guide, README, changelog, and test fixtures
- Step 4 / 4 — Commit `scaffold-prettier-config`

## Steps

### Step 1 / 4 — Create the package manifest and license

Create `$PROJECT/configs/prettier-config/`.

RULE: Do **not** edit `$PROJECT/package.json`. Its `workspaces` array already contains the `configs/*` glob, so the new package is picked up automatically. Do not add `prettier` to the root `devDependencies` either — the root already depends on `prettier@3.8.4`.

`$PKG/package.json`:

```json
{
  "name": "@noodlestan/prettier-config",
  "version": "0.0.1",
  "description": "Noodlestan's base Prettier formatting configuration.",
  "author": "Noodlestan Collective",
  "license": "MIT",
  "private": false,
  "publishConfig": {
    "access": "public"
  },
  "main": "./src/index.cjs",
  "exports": {
    ".": "./src/index.cjs",
    "./json": "./src/index.json",
    "./package.json": "./package.json"
  },
  "files": ["src", "_guide.md", "README.md", "LICENSE-MIT"],
  "scripts": {
    "lint": "prettier . -c",
    "lint:fix": "prettier . -c --write",
    "test": "echo no tests yet",
    "ci": "npm run lint"
  },
  "peerDependencies": {
    "prettier": "^3.8.4"
  }
}
```

Notes on the choices:

- `main` points at `src/index.cjs`, matching the sibling's `main: ".eslintrc.cjs"` pattern of shipping a `.cjs` entry point rather than requiring a build step.
- `exports` is required. Prettier resolves a `prettier` field through Node resolution, so the `.` entry must exist and the `./json` subpath is provided for consumers that want the raw rules to spread.
- `prettier` is a **peer** dependency with a caret range, mirroring `@noodlestan/eslint-config`. This package has **no** `dependencies` entry — it ships rules, not code.
- `test` is `echo no tests yet`, matching the sibling. The fixtures are exercised by `lint`, which the `ci` task runs.

Copy `$PROJECT/configs/eslint-config/LICENSE-MIT` to `$PKG/LICENSE-MIT`.

### Step 2 / 4 — Create the config source files

Create `$PKG/src/index.json` with these rules **verbatim**. This is the canonical rule set; do not reformat, reorder, or "improve" it.

```json
{
  "useTabs": false,
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "arrowParens": "avoid",
  "overrides": [
    {
      "files": ["*.js", "*.cjs", "*.mjs", "*.mts", "*.ts", "*.tsx"],
      "options": {
        "useTabs": true
      }
    }
  ]
}
```

RULE: The `overrides` entry must list `*.mjs`. The rule set is derived from the consumer repo's hand-written `.prettierrc` plus `*.mjs`; omitting it silently reformats `.mjs` files with spaces.

Create `$PKG/src/index.cjs` re-exporting the same rules, so CJS consumers and `.prettierrc.cjs` files work without a build step:

```js
module.exports = require('./index.json');
```

### Step 3 / 4 — Create the records, guide, README, changelog, and test fixtures

Create `$PKG/_records/package.art` mirroring the sibling's field set, heading format, and ordering. Field headings are Title Case with a space (`**Canonical Name:**`, not `canonical_name`). Use these values:

- `## Package: Prettier Config`
- `**Purpose:**` Noodlestan's canonical base Prettier formatting configuration.
- `**Description:**` Shared Prettier configuration consumed by every project repo.
- `**Owner:**` `Project: Artificial`
- `**Namespace:**` `@noodlestan`
- `**Author:**` Noodlestan Collective
- `**Path:**` `configs/prettier-config/`
- `**Canonical Name:**` `@noodlestan/prettier-config`
- `**Published:**` `true`
- `**Private:**` `false`
- `**Deployment:**` `NPM Package Deployment: Prettier Config`
- `**Files:**` the same four entries as the `files` array in `package.json`
- `**Language:**` JavaScript (CJS)
- `**Engines:**` Node: `>= 22`
- `**PackageManager:**` `npm@10.2.3`
- `**PackageFile:**` `package.json`
- `**Dependencies:**` — leave **Runtime** and **Dev** empty; list only `Peer:` → `Package Dependency: Prettier`
- `**Scripts:**` `Package Script Set: Prettier Config Scripts`
- `**License:**` `License: Noodlestan 2024 MIT`

Create `$PROJECT/_records/scripts/prettier-config.art` defining `## Package Script Set: Prettier Config Scripts`, mirroring the `**Scripts:**` nested list format of `_records/scripts/eslint-config.art`. Declare `Package Script: Lint`, `Package Script: Test`, and `Package Script: CI`.

Create `$PKG/_records/npm-deployment.art` mirroring the sibling:

```
# Module

## NPM Package Deployment: Prettier Config

**Owner:** Package: Prettier Config

**Status:** `DEPLOYED`

**Build:** Deployment Build: NPM Command

**Deploy:** Deployment Command: NPM Package CLI

**Canonical Name:** `@noodlestan/prettier-config`

**Registry:** `https://registry.npmjs.org`

**Access:** `public`
```

RULE: `**Status:**` is `DEPLOYED`, not `NOT-DEPLOYED`. The package has never been published, but the sibling records carry `DEPLOYED` as the steady state for a published-intent config package. If you believe `NOT-DEPLOYED` is correct here, note it in your report rather than silently diverging.

Create `$PKG/_guide.md` following the section layout of the sibling guide: title, one-line purpose sentence, `## Recommended Reading`, `## Package Layout`, `## Records Management`, `## Operating Instructions`. Reproduce the `### Operating Instructions: Setting Up` and `### Operating Instructions: Verifying Step` headings verbatim.

RULE: The sibling package guide has no `### Operating Instructions: Verifying Completion` section — only the root `$PROJECT/_guide.md` has one. Do not add it here.

Create `$PKG/README.md` documenting **how a consumer adopts the config**, since that is the package's entire purpose. Show exactly this consumer snippet and state that the consumer's own `.prettierrc` must be deleted so it does not shadow the package:

```json
{
  "prettier": "@noodlestan/prettier-config"
}
```

Create `$PKG/CHANGELOG.md`. The package is created directly at the version it will first ship as, so this file is written **populated**, not as an empty stub — there is no later bump to append to:

```md
# CHANGELOG

## 0.0.1

### Added

- **src/index.json** — Noodlestan's canonical base formatting rules: `printWidth: 100`, `tabWidth: 2`, `semi: true`, `singleQuote: true`, `trailingComma: "all"`, `arrowParens: "avoid"`.
- **overrides** — `useTabs: true` for `*.js`, `*.cjs`, `*.mjs`, `*.mts`, `*.ts`, and `*.tsx`.
- **exports `./json`** — the raw rules, for consumers that spread them into a local config.
```

RULE: `CHANGELOG.md` is **not** added to the `files` array in `package.json` and **not** to `**Files:**` in `package.art`. `@noodlestan/tsconfig` ships a changelog in the repository but excludes it from the published tarball; match that.

Create `$PKG/test/` fixtures covering `.ts`, `.mjs`, `.md`, `.json`, and `.html` — one file per extension, each exercising a rule from the canonical set (single quotes, tabs, semicolons, trailing commas, `arrowParens: avoid`). The `.mjs` fixture is the important one: it is the regression guard for the `*.mjs` override.

Register the package in the two existing files:

- `$PROJECT/_records/project.art` — append `- Package: Prettier Config` to the `**Resources:**` list.
- `$PROJECT/_guide.md` — add a row to the `## Projects` table: `| Prettier Config | \`configs/prettier-config/\_guide.md\` | \`NONE\` |`.

### Step 4 / 4 — Commit

#### Commit: `scaffold-prettier-config`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
scaffold(prettier-config): Create `@noodlestan/prettier-config` with the base formatting rules.

- Add `src/index.json` and `src/index.cjs` carrying the canonical base rules.
- Add `test/` fixtures for `.ts`, `.mjs`, `.md`, `.json`, and `.html` with a `ci` script.
- Register `Package: Prettier Config` in `$PROJECT/_records/project.art` and `$PROJECT/_guide.md`.
```

RULE: The commit message is pre-authored. Do not rewrite it.

RULE: The message body mentions `test/` fixtures and a `ci` script. Both must exist before committing, otherwise the message is false.

**Steps for this commit:**

1. From `$PROJECT`, run `npm run lint:fix` so the new files are formatted to the repo's own rules.
2. Run `npm run lint` and confirm it passes.
3. Run `npm run ci` and confirm the new package's `ci` task runs (the root task is `npm run ci:root && turbo run ci`).
4. Stage every file created or edited in Steps 1–3.
5. Commit with the message above. Do not push.

---

## Final Verification

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify `npm ci` at `$PROJECT` succeeds and `$PROJECT/node_modules/@noodlestan/prettier-config` resolves through the workspace link.
- Verify `$PKG/src/index.json` contains `*.mjs` in the `overrides` `files` array.
- Verify `$PKG/package.json` declares `private: false`, `publishConfig.access: public`, and a `files` array that excludes `test/`.
- Verify `$PKG/src/index.cjs` loads the same rules as `$PKG/src/index.json`.
- Verify `Package: Prettier Config` appears in the `**Resources:**` list of `$PROJECT/_records/project.art` and as a row in the `## Projects` table of `$PROJECT/_guide.md`.
- Verify `$PKG/CHANGELOG.md` exists with a populated `## 0.0.1` / `### Added` entry, and that `CHANGELOG.md` appears in neither the `files` array nor the `**Files:**` record.
- Verify `$PROJECT/package.json` was not modified.
- Execute the **Verifying Step** as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
