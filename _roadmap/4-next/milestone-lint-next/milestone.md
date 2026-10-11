# Milestone: Lint Next

**Id:** `lint-next`

**Status:** `DRAFT`

**Template:** `$DOMAINS/milestones/templates/milestone.tart`

**Skill:** `write-milestone`

**Purpose:** Move JavaScript, TypeScript, and SolidJS linting from ESLint to OxLint, keeping ESLint only where OxLint cannot parse the file format.

**Description:** Prove OxLint on two pilots — Art MD for the plain TypeScript case, Noodlestan Web for the Astro case — then generate an adoption matrix, roll OxLint out one checkout per commit, document it, and shrink ESLint to the narrow role it still has to keep. Prettier stays the formatter throughout: OxLint and ESLint both concern correctness, neither replaces formatting.

## Path Variables

| Variable     | Resolved Path                 | Purpose                                |
| ------------ | ----------------------------- | -------------------------------------- |
| `$WORKSPACE` | Current working directory     | Workspace root directory.              |
| `$PROJECT`   | `checkouts/workspace-tooling` | Hosts the lint configuration packages. |
| `$CHECKOUTS` | `$WORKSPACE/checkouts`        | All managed checkouts adopting OxLint. |

## Phases

### Phase: 1 — Prove OxLint

**Status:** `DRAFT`

**Description:** Two pilots that answer different questions — Art MD proves the plain TypeScript case end to end, Noodlestan Web proves how Astro files are split out to ESLint. Neither pilot drops Prettier.

### Phase: 2 — Adopt Across Ecosystem

**Status:** `DRAFT`

**Description:** Classify every checkout by the file formats it actually contains, decide its lint split from that classification, then adopt one checkout per commit.

### Phase: 3 — Document and Retire ESLint

**Status:** `DRAFT`

**Description:** Document OxLint as the standard and retire the broad ESLint configuration. ESLint itself is not retired while `.astro` files still need `eslint-plugin-astro`.

## Items

No plan records exist yet. Each becomes `_backlog/{bucket}/plan-{id}/plan.md` when drafted.

| Phase | Plan                                                               | Status  |
| ----- | ------------------------------------------------------------------ | ------- |
| `1`   | Plan: MVP Oxlint — pilot in Art MD                                 | `DRAFT` |
| `1`   | Plan: MVP Oxlint + Astro ESLint Fallback — pilot in Noodlestan Web | `DRAFT` |
| `2`   | Plan: Adopt OxLint — matrix across all checkouts                   | `DRAFT` |
| `3`   | Plan: Document OxLint                                              | `DRAFT` |
| `3`   | Plan: Retire ESLint                                                | `DRAFT` |

### Plan: MVP Oxlint

**Status:** `DRAFT`

**Purpose:** Prove OxLint can carry the whole lint pass in a plain TypeScript repository, piloted in Art MD.

**Description:** Art MD is the right pilot because it is the simplest shape in the ecosystem: TypeScript libs and a CLI, markdown documentation, and — verified — no `.astro`, no `.mdx`, and no Solid JSX. So the pilot has exactly one question to answer: does OxLint replace the ESLint run on plain JS/TS without losing a rule that mattered?

**Changes:**

- Run OxLint alongside the existing ESLint pass first, diff the reported problems, then drop the ESLint run and keep Prettier exactly as it is.
- Record every rule that did not carry over, and why, so the ecosystem rollout knows the real cost before it starts.
- Treat OxLint's JavaScript plugin support as alpha — record crashes and false positives as findings, escalating to a blocker only if they block the pilot's lint gate.
- Confirm the ESLint dependency can be removed from this checkout entirely, since Art MD has no `.astro` files for ESLint to keep.

### Plan: MVP Oxlint + Astro ESLint Fallback

**Status:** `DRAFT`

**Purpose:** Prove how Astro files are handled in a repository that has them, piloted in Noodlestan Web.

**Description:** OxLint has no official or unofficial Astro support, so parsing an `.astro` frontmatter block is not the same as linting the template, its directives, and component usage. The fallback keeps ESLint alive for `.astro` only, scoped by glob so JS/TS is never linted twice, and packaged as a new `eslint-astro` layer on top of the existing `@noodlestan/eslint-config` rather than a fork of it.

**Changes:**

- Add `configs/eslint-astro` as a new package layered on `@noodlestan/eslint-config`, carrying `eslint-plugin-astro` and nothing OxLint already covers.
- Scope ESLint to `.astro` globs so the two linters never run over the same file.
- Keep Prettier plus `prettier-plugin-astro` as the Astro formatter — Astro's own documentation still recommends it, and nothing in OxLint changes that.
- Verify what OxLint does with Astro frontmatter and record it as a finding rather than assuming template coverage.

### Plan: Adopt OxLint

**Status:** `DRAFT`

**Purpose:** Put every checkout on OxLint, each with the lint split its own file formats require.

**Description:** Generate the adoption matrix from the checkouts, classify each repository by the file formats it contains, and adopt one complete checkout per commit. The classification, not preference, decides whether a checkout keeps any ESLint at all.

**Changes:**

- Generate the adoption matrix from all checkouts: file formats present, lint config extended today, plugins needed, expected diff.
- Adopt OxLint in every checkout classified as plain JS/TS, removing its ESLint run.
- Adopt the split lint setup in the checkouts that contain `.astro` files.
- Record SolidJS coverage findings from the checkouts that carry Solid JSX.

### Plan: Document OxLint

**Status:** `DRAFT`

**Purpose:** Make the split linting standard documented, so no repository re-derives it.

**Description:** Update `_guide.md`, write the ADR carrying the decision, add the usage section to the README, and update the knowledge components that describe linting.

### Plan: Retire ESLint

**Status:** `DRAFT`

**Purpose:** Retire the broad ESLint configuration, not ESLint itself.

**Description:** What retires is the wide JS/TS ESLint pass and the non-Astro layers of `@noodlestan/eslint-config`. ESLint survives in the ecosystem for as long as `.astro` files need `eslint-plugin-astro` — a full retirement needs either OxLint gaining real Astro template support or the Astro sites moving off `.astro`. Update the README to describe the split, and archive the retired layers.

## Findings

Recorded from the OxLint research and a scan of all 16 checkouts on 2026-10-12.

- **OxLint is the Rust-based linter from the Oxc project** — native rules, high throughput, covering JS, TS, JSX, and TSX.
- **Framework support in the docs is not full-file linting** — the compatibility matrix separates partial from full support, and that distinction is the one that decides this milestone.
- **The limit is parsing, not rules.** OxLint loads ESLint plugins, including JavaScript ones, but its parser does not support arbitrary custom file formats. Loading a plugin is not the same as understanding the file: `eslint-plugin-svelte` is the documented illustration, where the rules load and the template rules still cannot work.
- **SolidJS is reachable.** `eslint-plugin-solid` runs through the JavaScript plugin compat layer, documented as tested at `1.25.0` with most rules working and API compatibility issues reported in November 2025. There is a configuration example that imports the plugin's TypeScript preset and reuses its rules, avoiding a hand-maintained duplicate rule list.
- **Astro has no support, official or unofficial.** Frontmatter parsing is not template linting.
- **MDX is a non-issue in this ecosystem today.** The scan found no `.mdx` files in any checkout except one in this repository, so `oxlint-mdx` is a question to park, not a migration to plan.
- **Prettier is unaffected.** OxLint checks correctness, Prettier formats; adopting one does not give up the other.
- **OxLint runs alongside ESLint**, taking what it supports natively while ESLint keeps the rest — that coexistence is the migration path, not a flag day.

### Ecosystem Inventory

| File format | Checkouts                                                                                                          | Consequence                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| Plain JS/TS | art-domains, art-js, art-lib, art-md, art-work, artisans, conventions, management, purrception, purrfect, purrpose | OxLint alone can replace ESLint completely.               |
| `.astro`    | artificials (13 files), noodlestan-web (20), workspace-tooling (1)                                                 | ESLint survives, scoped to `.astro` globs.                |
| Solid JSX   | no-comply (309 files), purrtrait (4), artificials (3), workspace-tooling (1)                                       | Verify `eslint-plugin-solid` coverage before trusting it. |
| `.mdx`      | workspace-tooling (1) only                                                                                         | Nothing to migrate.                                       |

Fourteen of the sixteen checkouts carry a root ESLint config; `ops` and `workspace-tooling` do not.

## Decisions

- **OxLint takes JS, TS, and SolidJS** — the pilot proves it on plain TypeScript; the Solid checkouts confirm it before the plugin is trusted at scale.
- **ESLint survives, scoped to `.astro`** — no official or unofficial Astro parser exists for OxLint, and template linting is the whole point of keeping a second linter.
- **Prettier is untouched** — it remains the formatter for every file type, Astro and MDX included.
- **Split by file format, not by repository** — a checkout's lint setup is decided by which file formats it contains, which is what the adoption matrix records.
- **Layer, do not fork** — the Astro fallback extends the existing `@noodlestan/eslint-config` instead of forking it, so there is one config lineage left afterwards.
- **Coexistence is the path** — both linters may run while the migration is in flight; neither waits for the other to be removed first.

## Work

### Next

Draft `Plan: MVP Oxlint` — it is the gate for everything else here. The Astro fallback, the matrix, and the retirement all depend on what the plain TypeScript pilot proves about real rule loss.

### Blockers

- None.
