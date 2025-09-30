# Repository Guidelines

## Project Structure & Module Organization
Follow the layout described in `vision.md`. Place UI code under `src/`, with `src/components/` for presentational pieces, `src/state/` for the store, and `src/connectors/http|uci/` for engine adapters. Use `public/` for static assets (icons, manifest). Keep shared types in `src/types/`. Add unit tests next to code as `__tests__/` folders, and end-to-end specs under `e2e/`. Document architecture decisions in `docs/` alongside `vision.md`.

## Build, Test, and Development Commands
Install dependencies with `npm install` (Node 18+). Run the dev server via `npm run dev` to launch Vite with hot reloading. Produce a production bundle using `npm run build`, which must stay warning-free. Execute fast unit suites with `npm run test`. Run linting and formatting checks through `npm run lint` and `npm run format` before opening a PR. Use `npx playwright test` for end-to-end verification covering match flows.

## Coding Style & Naming Conventions
Write all application code in TypeScript using ES modules. Prefer functional React components with hooks; keep files under 300 lines. Indent with two spaces and rely on Prettier defaults (`npm run format`). Use camelCase for variables and functions, PascalCase for components (`MatchController`), and kebab-case for filenames except React components (`Board.tsx`). Document non-obvious logic with concise comments and JSDoc for exported APIs. Keep state selectors pure and colocate connector-specific constants under their folders.

## Testing Guidelines
Use Vitest for unit tests; name files `*.spec.ts` next to the implementation. Mock engine transports lightly—prefer exercising real HTTP/WS stubs under `tests/mocks/`. Target 80%+ line coverage and add regression tests for every bugfix. For Playwright suites in `e2e/`, cover Human↔Engine scenarios and capture screenshots with `--trace on` when failures occur. Record test plans in the PR description whenever manual checks are required.

## Commit & Pull Request Guidelines
The repo has no history yet—start with Conventional Commits (`feat(board): highlight legal moves`). Keep commits scoped and revert-safe. Every PR needs: a clear summary, linked issue, checklist of test commands run, and screenshots or recordings when UI changes. Request review before merging; require at least one approval and a green CI run.

## Architecture Notes
Treat `vision.md` as the source of truth for connectors, persistence, and analysis flows. Validate new features against the HTTP and UCI contracts described there, and update the document when assumptions change.
