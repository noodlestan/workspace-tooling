# CHANGELOG

## 0.0.1

### Added

- **`*.astro` override** — `useTabs: true` and `parser: astro`, appended after the base `@noodlestan/prettier-config` overrides.
- **`plugins`** — declares `prettier-plugin-astro`, which Prettier 3 requires since it no longer auto-searches `node_modules` for plugins.
- **Peer dependency** — `prettier-plugin-astro`, so consumers get it installed automatically.
- **`exports ./json`** — the Astro-only delta; it does not include the base rules.
