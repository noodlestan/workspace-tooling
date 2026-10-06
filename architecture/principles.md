# Principles: Workspace Tooling

**Purpose:** State the principles and hard constraints that every design document and decision record in this directory must satisfy.

## Principles

1. **One place to change a convention.** Rules, presets, and build defaults live in a package and change by releasing a version — never by editing every consumer repository.
2. **Restrict variance.** The wrapper owns defaults; consumers own a small, explicit set of choices (`entryPoints`, `external`, `define`, `include`). A new knob needs a reason, not a use case.
3. **Fail fast, loud, and non-zero.** Invalid configuration, failed builds, and failed checks print a clear message and exit `1`. No partial success states, no silent fallbacks.
4. **Nothing reaches a commit unverified.** The pre-commit hook runs the same `npm run ci` a maintainer would run by hand; the gate and the verification contract are the same thing.
5. **Private root, publishable leaves.** The root package is a tooling manifest: workspaces, scripts, dev dependencies. It produces no artefacts and never publishes.
6. **Consumers own the toolchain; packages own the rules.** Engines (`eslint`, `prettier`, `typescript`) arrive as peers; the opinionated rules ship inside the config package.
7. **Type safety is fixed centrally.** The strictness block is identical across kinds. Relaxing it is a decision record, not a per-package override.
8. **Name what is in flux.** Transitional presets are labelled, documented as transitional, and time-boxed — never quietly recommended to a new package.
9. **Decisions are recorded, not implied.** A choice that constrains consumers or the repository's own shape is written down in [adr/](adr/) with status and consequences.
10. **Every document declares its scope.** The `**Purpose:**` line after the title says whether the document binds this repository or Noodlestan consumers, so a rule is never applied to the wrong audience.

## Constraints

Hard limits that no design document or decision record may contradict without superseding it:

| Constraint                                       | Source                                       |
| ------------------------------------------------ | -------------------------------------------- |
| Node `>=22`; developed on `.nvmrc`               | `package.json` `engines`                     |
| npm is the package manager; npm workspaces only  | `package.json` `packageManager`              |
| The root is not a build root and never publishes | `package.json` `private: true`               |
| Published output satisfies the distribution ADRs | [adr/distribution.md](adr/distribution.md)   |
| ESLint 8 with the legacy `.eslintrc` format      | [adr/shared-config.md](adr/shared-config.md) |
| Stable consumer kinds are `esbuild` and `vite`   | [adr/shared-config.md](adr/shared-config.md) |
| `ci` is uncached; the gate is sequential         | [adr/repository.md](adr/repository.md)       |

## Known Gaps

These are acknowledged, not principles — they are the reasons the relevant decisions stay `Proposed`:

- No automated test suite in any package; `test/` fixtures are linted as de-facto expectations.
- No release automation: versions and changelogs are maintained by hand.
- No repository-wide type-check gate; type errors surface only where declaration emit runs.

## Applying These

- A design document that conflicts with a principle must either change or propose a decision record that supersedes the principle.
- A decision record marked `Proposed` does not bind anything until it is adopted; a `Proposed` record may deliberately conflict with a known gap, not with a constraint.
