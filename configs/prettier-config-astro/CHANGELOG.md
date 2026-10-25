# CHANGELOG

## 0.1.1

### Changed

- **Update dependencies** - `prettier@3.9.10` cleans up npm audit.

## 0.1.0

### Changed

- **Updated dependency** – Update `@noodlestan/prettier-config` to `0.1.0` to inherit the latest base configuration.

## 0.0.1

### Added

- **Astro file support** — `.astro` files are formatted with the base rules plus tab indentation, using the Astro parser. This is the only difference from `@noodlestan/prettier-config`; everything else is inherited unchanged.
- **A dependency on `@noodlestan/prettier-config`** — the base rules are spread in at load time rather than copied, so the two packages cannot drift apart.
- **`prettier-plugin-astro` as a peer dependency** — brings the Astro parser along. It is declared explicitly in the config because Prettier 3 no longer discovers plugins on its own.
