# Repository Guidelines

## Project Structure & Module Organization

- **src/** holds the TypeScript implementation and the `__tests__` folder that contains Jest coverage for the plugin hooks.
- **dist/** is the build output (CommonJS + ESM + types) produced by Rollup; `package.json` exports those artifacts.
- **examples/** keeps manual demos (e.g., `examples/demo.html`) that mirror public usage patterns.
- Config files such as `rollup.config.mjs`, `tsconfig.json`, and `jest.config.js` define the bundle, type-check, and test setups respectively.

## Build, Test, and Development Commands

- `npm run build` – runs Rollup to emit development bundles into `dist/`.
- `npm run build:prod` – sets `NODE_ENV=production` before Rollup for minified output; mirrors what `prepublishOnly` runs.
- `npm run dev` – starts Rollup in watch mode for live rebuilding while editing `src/`.
- `npm run lint` – runs ESLint via the shared `.eslintrc.cjs` config; CI executes this alongside format/typecheck/test on every push/PR.
- `npm test`, `npm run test:watch`, `npm run test:coverage` – exercise the Jest suite (unit tests live under `src/__tests__`).
- `npm run typecheck` – runs `tsc --noEmit` to validate typings; `npm run format` and `npm run format:check` invoke Prettier across the repo (generated bundles in `dist/` and the temporary `deploy/` folder are ignored via `.prettierignore`).

## Coding Style & Naming Conventions

- TypeScript is the sole language; stay within `src/` and follow existing 2-space indentation and concise JSDoc comments seen in `src/index.ts`.
- Plugin exports use camelCase identifiers (e.g., `idPlugin`, `IdPluginConfig`); align new helpers with those naming patterns.
- Prettier is the formatting tool (configured implicitly via scripts); run `npm run format:check` before PRs to ensure consistent spacing/semicolons.

## Testing Guidelines

- Jest is the framework; tests live alongside source in `src/__tests__/index.test.ts` and follow the `*.test.ts` suffix.
- Keep mocks scoped to `beforeEach`/`afterEach` as shown, prefer DOM primitives from `document.createElement`, and assert both happy and edge paths.
- No enforced coverage threshold in config, but `npm run test:coverage` generates detailed reports – run it if you add critical logic.

## Commit & Pull Request Guidelines

- Existing commits use short descriptors with optional conventional prefixes (e.g., `refactor: …`). Mirror that clarity: `<area>: brief summary` or `fix: …` if applicable.
- PRs should describe what changed, why, and which commands were run (`npm run test`, `npm run format:check`, etc.); link related issues or demos if available, and mention any manual verification steps.
- Ensure `dist/` is regenerated only when the change impacts runtime output; run `npm run build` before tagging releases to keep published artifacts in sync.

## Automation & Deployment

- GitHub Actions run `npm run format:check`, `npm run lint`, and `npm test` on every push and PR via `.github/workflows/ci.yml` so you can rely on a consistent Node 20-based pipeline.
- The `deploy-demo.yml` workflow builds the bundle, copies `dist` + `examples` into a temporary `deploy` directory, and pushes that content to `gh-pages`, keeping `examples/demo.html` live whenever `main` is updated.
- Committing locally also enforces the same checks because Husky’s pre-commit hook runs `npm run format:check`, `npm run lint`, and `npm test`; failing any of those will stop the commit and keep your working tree clean.
