# CHANGELOG

## 0.1.0

### Added

- **Markdown formatting for `*.art` and `*.tart`** — source and template files are parsed as Markdown instead of being skipped as unknown extensions.

## 0.0.1

### Added

- **Base formatting rules** — 2-space indentation and 100-column wrapping for prose, JSON, Markdown, YAML, and HTML; semicolons, single quotes, trailing commas everywhere, and `arrowParens: "avoid"`.
- **Tab indentation for JavaScript and TypeScript** — `*.js`, `*.cjs`, `*.mjs`, `*.mts`, `*.ts`, and `*.tsx` are formatted with tabs; every other file type uses spaces.
- **One entry point** — `src/index.cjs` holds the rules directly and resolves for ESM imports, CJS `require`, and the `prettier` field of `package.json` alike, with no build step and no second copy to keep in sync.
