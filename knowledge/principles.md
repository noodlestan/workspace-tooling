# Principles: Workspace Tooling

**Purpose:** State the principles and hard constraints that every design document and decision record in this directory must satisfy.

## Principles

1. **One place to change a convention.** Rules, presets, and build defaults live in a package and change by releasing a version. Consumers upgrade at their own pace.
2. **Restrict variance.** Configs distributed from this repository own universal defaults. Consumers supply local environment. Example: TSConfig `entryPoints`, `external`, `define`, `include`.
3. **Fail fast, loud, and non-zero.** Invalid configuration, failed builds, and failed checks print a clear message and exit wioth error code. No partial success states, no silent fallbacks.
