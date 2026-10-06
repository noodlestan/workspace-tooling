# TS Config

The `@noodlestan/tsconfig` package provides base TypeScript configurations for Noodlestan packages. The stable consumer kinds are `esbuild` and `vite`; the `cli`, `libs`, and `workspace` presets are transitional and will be removed.

## Recommended Reading

Agents SHOULD scan these files for definitions and resource locations when faced with uncertainty or ambiguity that may result from missing resources.

- `_guide.md` — this file: package overview, layout, records, and operating instructions.
- `README.md` — package readme.
- `../../architecture/design/typescript.md` — consumer kinds, presets, and how consumers extend them.

## Package Layout

```
_guide.md           — this file
_records/           — package records
esbuild/            — esbuild consumer kind presets (stable)
vite/               — vite consumer kind presets (stable)
cli/                — CLI presets (transitional, will be removed)
libs/               — library presets (transitional, will be removed)
workspace/          — monorepo root preset (transitional, will be removed)
```

## Records Management

Records are co-located with the resources they describe in `_records/` directories:

- **Package:** `_records/package.art`
- **NPM Deployment:** `_records/npm-deployment.art`

## Operating Instructions

### Operating Instructions: Setting Up

**Instructions:**

Run from the repository root (monorepo):

```bash
npm ci # to install dependencies.
```
