# Esbuild CLI

The `@noodlestan/esbuild` package wraps esbuild behind a fixed config contract, providing `esbuild-cli` (build) and `esbuild-cli-watch` (watch) bins and exporting opt-in post-build plugins.

## Recommended Reading

Agents SHOULD scan these files for definitions and resource locations when faced with uncertainty or ambiguity that may result from missing resources.

- `_guide.md` — this file: package overview, layout, records, and operating instructions.
- `README.md` — package readme.
- `../../architecture/design/build.md` — command surface, config contract, defaults, plugins, and outputs.

## Package Layout

```
_guide.md           — this file
_records/           — package records
bin/                — CLI entry points
src/                — source code
src/config/         — config defaults
src/plugins/        — exported plugins
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

### Operating Instructions: Verifying Step

**Instructions:**

Run from this package directory:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other issues (prettier, eslint)
npm run test # to run all tests
```

### Operating Instructions: Verifying Completion

**Instructions:**

Runs automatically on pre-commit hook (from the repository root):

```bash
npm run ci # lint, build, and run both test suites
```
