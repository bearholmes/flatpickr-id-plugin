# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2025-11-23

### Added

- TypeScript-first implementation (`IdPluginConfig`, strict typing, and enriched JSDoc) covering the plugin entry in `src/`.
- Jest suite covering default transfers, custom configuration, mobile inputs, and failure paths.
- `AGENTS.md` contributor guide that explains repo structure, scripts, style, testing, and collaboration expectations.
- ESLint configuration (`.eslintrc.cjs`, `.eslintignore`, `tsconfig.eslint.json`) plus a `npm run lint` script to exercise `src/` files.
- GitHub Actions `ci.yml` that runs `format:check`, `lint`, and Jest per push/PR, and `deploy-demo.yml` to build `dist/`/`examples/` and publish `gh-pages`.


### Changed

- Attribute transfer now accepts configurable delays and attribute sets, includes debug logging, and registers once in `loadedPlugins`.
- Rollup now emits CommonJS/ESM builds plus type declarations, while scripts expose format/typecheck/test workflows running Prettier/Jest/tsc.

### Fixed

- Accounting for missing `mobileInput`/`altInput` targets without throwing and ensuring attributes are cleaned from the source.
- Guarding attribute propagation so a failing `setAttribute` logs once and keeps the rest of the build stable.

## [1.0.2] - 2023-02-25

### Initial Release

- Basic functionality for transferring ID attributes
- Support for `id`, `title`, `aria-label`, `aria-labelledby`
- Works with altInput and mobileInput modes

[Unreleased]: https://github.com/bearholmes/flatpickr-id-plugin/compare/v1.0.3...HEAD
[1.0.3]: https://github.com/bearholmes/flatpickr-id-plugin/releases/tag/v1.0.3
[1.0.2]: https://github.com/bearholmes/flatpickr-id-plugin/releases/tag/v1.0.2
