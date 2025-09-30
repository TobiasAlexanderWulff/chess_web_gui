# AGENTS: src/connectors/http/

- Purpose: HTTP engine connector implementation.
- Files: `HttpEngineConnector.ts` and related helpers; export typed, side-effect-free functions/classes.
- Types: Use shared types from `src/types/`; surface minimal public API from `index.ts`.
- Errors: Normalize network and engine errors; avoid throwing raw fetch errors.
- Tests: Cover request/response mapping using stubs from `tests/mocks/`.
- Docs: Keep aligned with `vision.md` HTTP contract.

