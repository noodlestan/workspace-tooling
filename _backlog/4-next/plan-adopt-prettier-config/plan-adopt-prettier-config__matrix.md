# Prettier Adoption Matrix

## Matrix

| Checkout          | Current config       | `prettier` field              | `@noodlestan/prettier-config` dep | `.astro` files   | Expected adoption diff                                           | Status |
| ----------------- | -------------------- | ----------------------------- | --------------------------------- | ---------------- | ---------------------------------------------------------------- | ------ |
| art-domains       | `.prettierrc` (hand) | NONE                          | NONE                              | 0                | re-indent `*.mjs` (0 files)                                      | TODO   |
| art-js            | `.prettierrc` (hand) | NONE                          | NONE                              | 0                | re-indent `*.mjs` (12 files)                                     | TODO   |
| art-lib           | `.prettierrc` (hand) | NONE                          | NONE                              | 0                | re-indent `*.mjs` (2 files)                                      | TODO   |
| art-md            | `.prettierrc` (hand) | NONE                          | NONE                              | 0                | re-indent `*.mjs` (17 files)                                     | TODO   |
| art-work          | `.prettierrc` (hand) | NONE                          | NONE                              | 0                | re-indent `*.mjs` (3 files)                                      | TODO   |
| artificials       | `.prettierrc` (hand) | NONE                          | NONE                              | 13               | re-indent `*.mjs` (1 file)                                       | TODO   |
| artisans          | `.prettierrc` (hand) | NONE                          | NONE                              | 0                | re-indent `*.mjs` (0 files)                                      | TODO   |
| conventions       | `.prettierrc` (hand) | NONE                          | `0.0.1` (present, unwired)        | 0                | re-indent `*.mjs` (0 files)                                      | TODO   |
| management        | `.prettierrc` (hand) | NONE                          | NONE                              | 0                | re-indent `*.mjs` (0 files)                                      | TODO   |
| no-comply         | `.prettierrc` (hand) | NONE                          | NONE                              | 0                | re-indent `*.mjs` (58 files)                                     | TODO   |
| noodlestan-web    | `prettier` field     | `@noodlestan/prettier-config` | `0.0.1`                           | 20               | none (already adopted)                                           | DONE   |
| ops               | `.prettierrc` (hand) | NONE                          | NONE                              | 0                | re-indent `*.mjs` (0 files); **loses `*.art`/`*.tart` override** | TODO   |
| purrception       | `.prettierrc` (hand) | NONE                          | NONE                              | 0                | re-indent `*.mjs` (8 files)                                      | TODO   |
| purrfect          | `.prettierrc` (hand) | NONE                          | NONE                              | 0                | re-indent `*.mjs` (0 files)                                      | TODO   |
| purrpose          | `.prettierrc` (hand) | NONE                          | NONE                              | 0                | re-indent `*.mjs` (0 files)                                      | TODO   |
| purrtrait         | `.prettierrc` (hand) | NONE                          | NONE                              | 0                | re-indent `*.mjs` (0 files)                                      | TODO   |
| workspace-tooling | `.prettierrc` (hand) | NONE                          | NONE                              | 1 (test fixture) | re-indent `*.mjs` (11 files)                                     | TODO   |

## Batch Summary

| Batch           | Rows | Checkouts                                                                                                                                                                     |
| --------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| already adopted | 1    | noodlestan-web                                                                                                                                                                |
| to adopt        | 16   | art-domains, art-js, art-lib, art-md, art-work, artificials, artisans, conventions, management, no-comply, ops, purrception, purrfect, purrpose, purrtrait, workspace-tooling |

## Excluded

| Checkout | Reason                                                                              |
| -------- | ----------------------------------------------------------------------------------- |
| (none)   | All 17 checkouts under `$CHECKOUTS` carry a Prettier config; every one is in scope. |

## Recipe

Replay once per checkout, one commit per checkout on branch `adopt-prettier-config`. `{checkout}` comes from the matrix.

1. Setup the checkout — `cd $CHECKOUTS/{checkout} && npm ci && (git switch adopt-prettier-config || git switch -c adopt-prettier-config)` — expected: a clean tree.
2. Authorised dependency bump — `npm install -D @noodlestan/prettier-config@0.0.1` (checkout root) — expected: rewrites `package.json` and `package-lock.json`; rides along in the same commit.
3. Config swap — delete `.prettierrc*` and add `"prettier": "@noodlestan/prettier-config"` to the checkout root `package.json`.
4. Lint — `npm run lint` — expected: passes; the diff contains only the expected `*.mjs` re-indent (tabs). Anything wider is a defect in `$PROJECT` or a pre-existing divergence to judge, never absorbed silently.
5. Commit — stage every file changed for the checkout's row, commit with the iteration blueprint message, and do **not** push (`NOPUSH`); then set the row to `DONE` in this matrix (that edit stays uncommitted for the planner).

### Outcome for `ops` (DIVERGENCE)

`ops/.prettierrc` carries an extra override for `*.art`/`*.tart` (`parser: "markdown"`) that the shipped base rules do **not** include. Adopting the base config would silently drop that override. This is a pre-existing divergence to be judged before adoption — either the base package gains the override, or `ops` keeps a local extension, or the divergence is accepted and the `.art`/`.tart` files fall back to default markdown handling.

### Outcome for `conventions` (PARTIAL)

`conventions` already declares `@noodlestan/prettier-config@0.0.1` in `devDependencies` but has **no** `prettier` field and still carries a hand-written `.prettierrc`. The dependency is present but unwired. Adoption here is a config swap only (no dependency bump needed).

### Outcome for `noodlestan-web` (ALREADY ADOPTED)

`noodlestan-web` is the pilot consumer: `prettier` field set to `@noodlestan/prettier-config`, dependency pinned at `0.0.1`. Verified, not re-migrated. It is the only checkout with `.astro` files (20) that has adopted the base config; the Astro variant is out of scope for this plan (`Plan: Add Astro Support`).
