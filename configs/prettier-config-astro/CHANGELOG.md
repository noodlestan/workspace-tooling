# CHANGELOG

## 0.0.1

First release. Astro support for Noodlestan's shared formatting rules, packaged separately so repositories without Astro never install the Astro plugin.

### Added

- **Astro file support** — `.astro` files are formatted with the base rules plus tab indentation, using the Astro parser. This is the only difference from `@noodlestan/prettier-config`; everything else is inherited unchanged.
- **A dependency on `@noodlestan/prettier-config`** — the base rules are spread in at load time rather than copied, so the two packages cannot drift apart.
- **`prettier-plugin-astro` as a peer dependency** — brings the Astro parser along. It is declared explicitly in the config because Prettier 3 no longer discovers plugins on its own.

### Notes

- The main entry applies the base rules and the Astro override together, so a single `prettier` field is all a consumer needs.
