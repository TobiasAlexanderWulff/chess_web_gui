# Chess Web GUI

This project hosts a standalone browser client for playing chess locally or against remote engines. The scaffold is built with Vite, React, and TypeScript, with Vitest for unit testing and Playwright for end-to-end coverage.

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` – start the Vite dev server with hot module replacement.
- `npm run build` – type-check and build for production.
- `npm run test` – execute Vitest unit suites.
- `npm run lint` – run ESLint against the repository.
- `npm run format` – check formatting with Prettier (`npm run format:write` to apply fixes).
- `npm run e2e` – trigger Playwright tests (requires the dev server running in another terminal).

## Versioning

We use Semantic Versioning (`major.minor.patch`). See docs/versioning.md for detailed rules and the release checklist.

Convenience scripts:
- `npm run release:patch` – bump patch version
- `npm run release:minor` – bump minor version
- `npm run release:major` – bump major version

Note: Running any release script triggers `preversion` to lint, test, and build.
