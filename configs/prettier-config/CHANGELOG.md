# CHANGELOG

## 0.0.1

First release. Noodlestan's shared formatting rules, published so repositories stop hand-writing and drifting their own Prettier configs.

### Added

- **Base formatting rules** — 2-space indentation and 100-column wrapping for prose, JSON, Markdown, YAML, and HTML; semicolons, single quotes, trailing commas everywhere, and `arrowParens: "avoid"`.
- **Tab indentation for JavaScript and TypeScript** — `*.js`, `*.cjs`, `*.mjs`, `*.mts`, `*.ts`, and `*.tsx` are formatted with tabs; every other file type uses spaces.
- **One entry point** — `src/index.cjs` holds the rules directly and resolves for ESM imports, CJS `require`, and the `prettier` field of `package.json` alike, with no build step and no second copy to keep in sync.

### Notes

- Adopting this config re-indents `*.mjs` files that a previous hand-written config left at 2 spaces, because `.mjs` is part of the tab override. Expect that diff; it is correct output, not a misconfiguration.
