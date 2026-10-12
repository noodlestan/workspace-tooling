# Workspace Tooling - TypeScript config `@noodlestan/tsconfig`

**Purpose:** Define the stable `esbuild` and `vite` presets shipped by `@noodlestan/tsconfig` and how consumers extend them.

## Consumer Kinds

Only two kinds are stable. The kind a package belongs to selects its preset; everything else is transitional.

| Kind      | Preset                  | Module / resolution     | Target   | Types               | Declarations |
| --------- | ----------------------- | ----------------------- | -------- | ------------------- | ------------ |
| `esbuild` | `esbuild/tsconfig.json` | `NodeNext` / `NodeNext` | `ES2022` | (consumer-declared) | `true`       |
| `vite`    | `vite/tsconfig.json`    | `ESNext` / `bundler`    | `ESNext` | `["vite/client"]`   | `true`       |

Variants extend their kind's base preset:

| Variant                       | Adds                                                           |
| ----------------------------- | -------------------------------------------------------------- |
| `esbuild/tsconfig-solid.json` | `jsx: "preserve"`, `jsxImportSource: "solid-js"`, JSON modules |
| `vite/tsconfig-solid.json`    | `jsx: "preserve"`, `jsxImportSource: "solid-js"`, JSON modules |

## Shared Strictness

Both stable kinds apply the same strictness block; only module semantics and types differ:

```json
{
  "strict": true,
  "noImplicitAny": true,
  "verbatimModuleSyntax": true,
  "isolatedModules": true,
  "forceConsistentCasingInFileNames": true,
  "noPropertyAccessFromIndexSignature": true,
  "noUncheckedIndexedAccess": true
}
```

`skipLibCheck` is set where third-party typings are known to be problematic (vitest, svgo, and similar).

## How Consumers Extend Them

```json
{
  "extends": "@noodlestan/tsconfig/esbuild/tsconfig.json",
  "include": ["src/"],
  "exclude": ["dist/", "node_modules/"]
}
```

- Consumers own `include`, `exclude`, and `rootDir`. Presets intentionally leave them commented out.
- Consumers own declaration emit. `tsc --emitDeclarationOnly` runs as an opt-in `postBuildPlugin` step driven by the consumer's `build.config.mjs` — the presets declare `declaration: true` but emit nothing on their own.
- No project references: a package extends exactly one base preset.

## Transitional Presets

| Preset                    | Status                                             |
| ------------------------- | -------------------------------------------------- |
| `workspace/tsconfig.json` | **In flux.** Monorepo-root preset; will be removed |

Rules:

- Do **not** adopt a transitional preset in a new package.
- Existing consumers should migrate to `esbuild` or `vite`.
- Transitional presets stay published until their consumers have migrated; they are listed in `files` only to avoid breaking installs.

## Constraints

- Module semantics follow the kind, and both must satisfy [adr/distribution.md](../adr/distribution.md): Node-compatible ESM for `esbuild` packages, bundler-resolved source for `vite` consumers.
- Strictness is fixed centrally. Relaxing it is a decision record, not a per-package override.
- Kind selection and the fate of the transitional presets are recorded in [adr/shared-config.md](../adr/shared-config.md).
