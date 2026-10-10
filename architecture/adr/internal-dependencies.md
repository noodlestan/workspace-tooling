# Internal Dependencies

**Purpose:** Decide how packages in this repository depend on each other.

## Decision: Internal Dependencies Use a Wildcard Range

**Status:** Proposed

**Context:** The root pins `@noodlestan/eslint-config` at `0.0.8`. npm workspaces links a local package only when the range matches the local version, so the next bump silently resolves the registry copy instead.

**Decision:** Dependencies on packages published from this repository use a wildcard range (`"*"`), so npm workspaces always resolves the local package.

**Consequences:**

- Self-consumption cannot break on a version bump; the version lives only in the package's `package.json`.
- External dependencies keep explicit ranges; the wildcard is valid only internally.
