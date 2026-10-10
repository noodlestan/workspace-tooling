# TS Config

The `@noodlestan/tsconfig` package provides base TypeScript configurations for Noodlestan packages. The stable presets are the `esbuild` and `vite` consumer kinds plus the `monorepo` root preset; the `workspace` root preset stays published for repositories that have not yet migrated.

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
monorepo/           — monorepo root preset (stable)
workspace/          — legacy monorepo root preset (kept while roots migrate)
```

## Records Management

Records are co-located with the resources they describe in `_records/` directories:

- **Package:** `_records/package.art`
- **NPM Deployment:** `_records/npm-deployment.art`

## Conventions

This package follows strict conventions.

::READ `../../_guide.md` for repository-wide conventions.

## Operating Instructions

### Operating Instructions: Setting Up

**Instructions:**

Run from the repository root (monorepo):

```bash
npm ci # to install dependencies.
```
