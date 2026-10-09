# Sub-Agent REPORT (#producer)

**Plan:** `adopt-esm`

**Iteration Id:** `inventory-distribution-matrix`

**Outcome:** `COMPLETED`

## Evidence

### Changes

| Area                | Change                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Distribution matrix | Created `$MATRIX` with a `## Matrix` listing every migrating `tsconfig.json`, its consumers classification, target config, required changes, and batch. |
| Migration batches   | Assigned 47 rows across 4 batches: `clis` (10), `vite renames` (17), `vite to esbuild migrations` (8), `monorepo roots` (12).                           |
| Exclusions          | Recorded 12 non-migrating configs: 3 application roots and 9 `workspace-tooling` package/config files.                                                  |
| Commit              | Committed `$MATRIX` as `2460d0b` with policy `NOPUSH` — committed, not pushed.                                                                          |

#### Files changed

- `$MATRIX` (`_backlog/3-now/plan-adopt-esm/plan__adopt-esm-matrix.md`) — created the distribution migration matrix (47 rows, batch summary, 12 exclusions), Prettier-formatted.

### Notes

- Discrepancy recorded per the Step 4 RULE: the eight `libs/tsconfig-vite-node.json` rows (art-js: `libs/bundler`, `libs/program`, `libs/validator`; art-md: `libs/codec`, `libs/constructs`, `libs/parser`, `libs/primitives`, `libs/serializer`) match the Step 2 signal table's `bundler` signal (`main`/`module` at `.ts` source, `vite build`), yet the plan intent and the `-node` preset name indicate Node consumers. Classified as `Node` → batch `vite to esbuild migrations`, consistent with the plan's branch blueprint.
- `$PROJECT` is the `@noodlestan/tsconfig` host, not a consumer checkout; its root and package/config files are listed in `## Excluded` rather than assigned to migration batches, respecting the plan's branching (`$PROJECT` on `main`, consumers on `adopt-esm`).
