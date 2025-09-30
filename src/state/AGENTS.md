# AGENTS: src/state/

- Purpose: App state containers, contexts, and hooks.
- Purity: Keep selectors and derived state pure; no network/engine I/O here.
- Separation: Connector-specific constants live under `src/connectors/**` not here.
- Files: Prefer small modules; keep under 300 lines.
- Tests: Unit-test hooks and reducers with Vitest; place specs in `__tests__/`.

