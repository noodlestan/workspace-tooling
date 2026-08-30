# TS Config

The `@noodlestan/tsconfig` package provides base TypeScript configurations for Noodlestan packages (libs and cli variants).

## Recommended Reading

Agents SHOULD scan these files for definitions and resource locations when faced with uncertainty or ambiguity that may result from missing resources.

- `_guide.md` — this file: package overview, layout, records, and operating instructions.
- `README.md` — package readme.

## Package Layout

```
_guide.md           — this file
_records/           — package records
cli/                — CLI tsconfig presets
libs/               — library tsconfig presets
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
