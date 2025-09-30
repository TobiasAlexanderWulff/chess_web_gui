# AGENTS: src/components/

- Purpose: Presentational React components; keep logic UI-focused.
- Naming: One component per file, `PascalCase.tsx`.
- Props: Fully typed; avoid any/unknown; document exported APIs with JSDoc.
- State/Effects: Avoid side-effects; no direct engine or network calls.
- Styling: Reuse existing styles; keep component styles minimal and consistent.
- Tests: Add `__tests__/*.spec.tsx` alongside the component; prefer rendering with testing-library and exercising real stubs where feasible.

