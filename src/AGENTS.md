# AGENTS: src/

- Scope: All application UI code and modules in this subtree.
- Structure: `components/`, `state/`, `connectors/`, `types/`, `styles/`.
- Language: TypeScript + React functional components with hooks.
- Conventions: PascalCase for components (`Board.tsx`), kebab-case for other filenames, 2-space indent, keep files <300 lines.
- Tests: Place Vitest specs as `__tests__/*.spec.ts[x]` next to implementations.
- Formatting: Use Prettier (`npm run format`) and lint before PRs.
- Contracts: Align connectors and types with `vision.md`.

