# Instructions: `scaffold-prettier-config-astro`

**Plan:** `add-prettier-config`

**Iteration Id:** `scaffold-prettier-config-astro`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-prettier-config/instructions/scaffold-prettier-config-astro__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `scaffold-prettier-config-astro`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                             | Purpose                                            |
| ------------ | ----------------------------------------- | -------------------------------------------------- |
| `$WORKSPACE` | Current working directory                 | Workspace root directory.                          |
| `$PROJECT`   | Provided with prompt                      | Monorepo root; receives the new package.           |
| `$BASE`      | `$PROJECT/configs/prettier-config/`       | Base config package; dependency of this iteration. |
| `$PKG`       | `$PROJECT/configs/prettier-config-astro/` | Package created by this iteration.                 |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `scaffold-prettier-config-astro`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Create `@noodlestan/prettier-config-astro`, a thin package that re-exports the base Prettier rules and adds `*.astro` support, so Astro consumers get one `prettier` field instead of a local config file plus a separately declared plugin.

## Mandatory Reading

::READ `$BASE/package.json` — the dependency's manifest and its `exports` map, which defines the `./json` subpath this package requires.

::READ `$BASE/src/index.json` — the canonical base rules that must be spread, not copied.

::READ `$BASE/src/index.cjs` — the base CJS entry pattern to mirror.

::READ `$BASE/_records/package.art` — package record to mirror field-for-field.

::READ `$PROJECT/configs/eslint-config/_records/package.art` — the sibling record showing how Runtime, Peer, and Dev dependencies are grouped.

::READ `$PROJECT/_records/scripts/eslint-config.art` — script set record format.

::READ `$PROJECT/_records/dependencies/project-lint.art` — the dependency record file this iteration extends with `Package Dependency: Prettier Plugin Astro`.

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
- Step 2 / 4 — Create the config entry points
- Step 3 / 4 — Create the records, guide, README, changelog, and Astro fixture
- Step 4 / 4 — Commit `scaffold-prettier-config-astro`

## Steps

### Step 1 / 4 — Create the package manifest and license

Create `$PROJECT/configs/prettier-config-astro/`.

RULE: Do not edit the `workspaces` array in `$PROJECT/package.json`; the `configs/*` glob already covers this package. The **one** root edit required is adding `prettier-plugin-astro` to `devDependencies`, covered in Step 3.

`$PKG/package.json`:

```json
{
  "name": "@noodlestan/prettier-config-astro",
  "version": "0.0.1",
  "description": "Noodlestan's Prettier formatting configuration with Astro support.",
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
  "dependencies": {
    "@noodlestan/prettier-config": "0.0.1"
  },
  "peerDependencies": {
    "prettier": "^3.8.4",
    "prettier-plugin-astro": "^1.1.0"
  },
  "devDependencies": {
    "prettier-plugin-astro": "1.1.0"
  }
}
```

Dependency placement, and why each one is where it is:

- `@noodlestan/prettier-config` is a **runtime** `dependency` pinned to `0.0.1`. It must match the version in `$BASE/package.json` exactly, otherwise npm fetches the published copy from the registry instead of linking the local workspace.
- `prettier` is a **peer**, matching `$BASE`.
- `prettier-plugin-astro` is a **peer** _and_ a **dev** dependency. The peer is what forces the consumer to install it; the dev entry is what makes the plugin resolvable while this monorepo formats its own `.astro` fixture. A peer alone does not install on npm 7+ when the version is already satisfied elsewhere in the tree, and without a local copy the `plugins` entry in Step 2 cannot be imported.
- Do not use `^` on the runtime dependency; siblings pin their runtime dependencies exactly.

Copy `$BASE/LICENSE-MIT` to `$PKG/LICENSE-MIT`.

### Step 2 / 4 — Create the config entry points

Create `$PKG/src/index.cjs`:

```js
const base = require('@noodlestan/prettier-config/json');

module.exports = {
  ...base,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    ...base.overrides,
    {
      files: ['*.astro'],
      options: {
        useTabs: true,
        parser: 'astro',
      },
    },
  ],
};
```

Three things in that file are load-bearing:

- `require('@noodlestan/prettier-config/json')` uses the `./json` subpath export from Step 1 of the previous iteration. Do not `require('@noodlestan/prettier-config')` and do not copy the base rules inline — the rules must have exactly one source of truth.
- `...base.overrides` spreads the array; `[...base.overrides, {…}]` **concatenates** it. Object spread on the array would clobber the base entries with a single index. This is the single most likely mistake in this iteration.
- `plugins: ['prettier-plugin-astro']` is mandatory. Prettier 3 removed the `node_modules` plugin auto-search that Prettier 2 relied on, so an undeclared plugin is simply not loaded and `parser: 'astro'` fails to resolve. Do not omit this line, and do not try to work around it with `--plugin-search-dir` or `--no-plugin-search`; both flags were removed in Prettier 3.

Create `$PKG/src/index.json` carrying the Astro-specific delta only, for consumers who prefer a static JSON config:

```json
{
  "plugins": ["prettier-plugin-astro"],
  "overrides": [
    {
      "files": ["*.astro"],
      "options": {
        "useTabs": true,
        "parser": "astro"
      }
    }
  ]
}
```

RULE: This JSON file is a partial delta, not a complete config. Its `**Purpose**` in the README and guide must say so, or consumers will adopt it and silently lose the base rules.

### Step 3 / 4 — Create the records, guide, README, changelog, and Astro fixture

Add to `$PROJECT/_records/dependencies/project-lint.art`, matching the file's `## Package Dependency: <Name>` / `**Canonical Name:**` / `**Purpose:**` / `**Version:**` shape:

```
## Package Dependency: Prettier Plugin Astro

**Canonical Name:** `prettier-plugin-astro`

**Purpose:** Adds the Astro parser so `.astro` files can be formatted.

**Version:** `1.1.0`
```

Add `"prettier-plugin-astro": "1.1.0"` to the root `devDependencies` in `$PROJECT/package.json`, next to the existing `"prettier": "3.8.4"` entry.

Create `$PKG/_records/package.art` mirroring `$BASE/_records/package.art` field-for-field, with these differences:

- `## Package: Prettier Config Astro`
- `**Path:**` `configs/prettier-config-astro/`
- `**Canonical Name:**` `@noodlestan/prettier-config-astro`
- `**Deployment:**` `NPM Package Deployment: Prettier Config Astro`
- `**Files:**` the same four entries as the `files` array
- `**Language:**` JavaScript (CJS)
- `**Dependencies:**` — `Runtime:` → `Package: Prettier Config`; `Peer:` → `Package Dependency: Prettier`, `Package Dependency: Prettier Plugin Astro`; `Dev:` → `Package Dependency: Prettier Plugin Astro`
- `**Scripts:**` `Package Script Set: Prettier Config Scripts` (reuse the set created in the previous iteration; these four scripts are identical, so do not create an Astro-specific set)

Create `$PKG/_records/npm-deployment.art` mirroring `$BASE/_records/npm-deployment.art`, with `## NPM Package Deployment: Prettier Config Astro`, `**Owner:** Package: Prettier Config Astro`, and `**Canonical Name:**` `@noodlestan/prettier-config-astro`. Keep every other field identical, including `**Build:** Deployment Build: NPM Command` and `**Deploy:** Deployment Command: NPM Package CLI`.

Create `$PKG/_guide.md` following the section layout of the sibling package guide: title, one-line purpose sentence, `## Recommended Reading`, `## Package Layout`, `## Records Management`, `## Operating Instructions` with the `### Operating Instructions: Setting Up` and `### Operating Instructions: Verifying Step` headings.

RULE: Package guides carry no `### Operating Instructions: Verifying Completion` section — only the root `$PROJECT/_guide.md` has one. Do not add it.

Create `$PKG/README.md`. It must cover, in this order:

1. The consumer `package.json` snippet: `"prettier": "@noodlestan/prettier-config-astro"`.
2. The rule that `prettier-plugin-astro` is a peer dependency, so consumers on npm 7+ get it installed automatically and need no extra step.
3. The `./json` subpath, flagged as an Astro-only delta that does **not** include the base rules.

Create `$PKG/CHANGELOG.md`, written **populated** at `0.0.1` since the package is created at the version it will first ship as:

```md
# CHANGELOG

## 0.0.1

### Added

- **`*.astro` override** — `useTabs: true` and `parser: astro`, appended after the base `@noodlestan/prettier-config` overrides.
- **`plugins`** — declares `prettier-plugin-astro`, which Prettier 3 requires since it no longer auto-searches `node_modules` for plugins.
- **Peer dependency** — `prettier-plugin-astro`, so consumers get it installed automatically.
- **`exports ./json`** — the Astro-only delta; it does not include the base rules.
```

RULE: `CHANGELOG.md` is **not** added to the `files` array in `package.json` and **not** to `**Files:**` in `package.art`. `@noodlestan/tsconfig` ships a changelog in the repository but excludes it from the published tarball; match that.

Create `$PKG/test/component.astro` — a small Astro component exercising frontmatter fences, a `---` delimited script block, and a scoped `<style>` block. This fixture is the proof that the `astro` parser is actually applied; a `.astro` file that formats without error cannot be produced by any other parser in the tree.

### Step 4 / 4 — Commit

#### Commit: `scaffold-prettier-config-astro`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
scaffold(prettier-config-astro): Create `@noodlestan/prettier-config-astro` for Astro files.

- Add a `*.astro` override with `useTabs: true` and `parser: astro` on top of the base rules.
- Add `prettier-plugin-astro` to the dependency set and to the root `devDependencies`.
- Add `test/component.astro` fixture and package records.
```

RULE: The commit message is pre-authored. Do not rewrite it.

**Steps for this commit:**

1. From `$PROJECT`, run `npm ci` so the new workspace package and `prettier-plugin-astro` are installed.
2. Run `npm run lint:fix`, then `npm run lint`.
3. Prove the Astro parser works, from `$PKG`:

   ```bash
   npx prettier test/component.astro -c
   ```

   Expected outcome: it reports the fixture as already formatted. If it errors with an unresolved `astro` parser, the `plugins` entry is missing or the plugin is not installed — fix it before committing.

4. Prove the base rules were spread rather than clobbered:

   ```bash
   node -e "const c=require('./src/index.cjs'); console.log(c.printWidth, c.overrides.length, c.plugins)"
   ```

   Expected outcome: `100 2 [ 'prettier-plugin-astro' ]`. An `overrides` length of `1` means the base array was overwritten instead of concatenated.

5. Stage every file created or edited in Steps 1–3, including `$PROJECT/package.json` and `$PROJECT/_records/dependencies/project-lint.art`.
6. Commit with the message above. Do not push.

---

## Final Verification

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify `$PKG/src/index.cjs` declares `plugins: ['prettier-plugin-astro']`.
- Verify `$PKG/src/index.cjs` requires `@noodlestan/prettier-config/json` rather than inlining the base rules.
- Verify the exported config has `overrides.length === 2` — one base entry and one `*.astro` entry.
- Verify `npx prettier test/component.astro -c` in `$PKG` resolves the `astro` parser without error.
- Verify `npm ci` at `$PROJECT` links `@noodlestan/prettier-config` from the local workspace rather than the registry.
- Verify `Package Dependency: Prettier Plugin Astro` appears in `$PROJECT/_records/dependencies/project-lint.art` with version `1.1.0`.
- Verify `$PROJECT/package.json` gained only `prettier-plugin-astro` in `devDependencies`, and that its `workspaces` array is unchanged.
- Verify `$PKG/README.md` states that the `./json` subpath is an Astro-only delta.
- Verify `$PKG/CHANGELOG.md` exists with a populated `## 0.0.1` / `### Added` entry, and that `CHANGELOG.md` appears in neither the `files` array nor the `**Files:**` record.
- Execute the **Verifying Step** as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
