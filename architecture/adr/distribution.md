# Distribution

**Purpose:** Decide how Noodlestan published packages are shaped for their consumers: module format, compiled output, declarations, and source.

## Decision: Distribute Node-Compatible ESM

**Status:** Adopted

**Context:**

Published libraries should be directly consumable by Node.js without requiring TypeScript, a bundler, or a bundler-specific module resolver.

This should work:

```js
import { something } from '@noodlestan/library';
```

**Decision:** Published libraries will use Node-compatible ESM module semantics, except where `Decision: Distribute TypeScript Source` applies.

**Consequences:**

Packages will:

- declare `"type": "module"`.
- use explicit `.js` extensions for relative ESM imports.
- use the `esm` TypeScript configuration.

## Decision: Distribute Compiled JS

**Status:** Adopted

**Decision:** Published libraries will distribute compiled ESM, except where `Decision: Distribute TypeScript Source` applies.

Packages will:

- expose public entry points through `exports`.
- compile source before publication.

Using compiled package output as the dependency boundary during development will introduce:

- Changes propagating through compiled artefacts rather than directly through source.
- Additional tooling to keep parallel build/watch processes for all dependencies.
- Slower feedback as changes pass through one or more build steps.
- Potentially stale `dist` output when a dependency has not been rebuilt, with tests potentially running against stale dependency code and other potential race conditions between source changes and dependent builds.
- Additional cognitive load when diagnosing whether a failure is in source or generated output.

## Decision: Distribute TypeScript Declarations

**Status:** Adopted

**Decision:** Published libraries will distribute TypeScript declarations alongside their compiled JavaScript, except where TypeScript Source Distribution applies.

The preferred mechanism for generating declarations is the TypeScript compiler's native declaration emission (`tsc --emitDeclarationOnly`), preserving the source module structure rather than bundling declarations into a single type file. Declaration bundling tools or plugins should not be used unless a package has a specific requirement that cannot be met by native declaration emission.

## Decision: Distribute TypeScript Source

**Status:** Adopted

**Decision:** Libraries whose consumers are expected to use a bundler, such as Vite, are exempt from the preceding decisions.

This includes libraries used in Node.js, SSR, and browser environments where the consumer's bundler resolves and compiles the library.

These libraries:

- Publish TypeScript source rather than compiled JavaScript.
- Do not emit declarations files.
- Use extensionless relative imports.
