# AGENTS: src/connectors/

- Purpose: Engine adapters and transports (HTTP and UCI).
- Contracts: Validate against `vision.md` HTTP and UCI specs; update docs on change.
- Boundaries: No React; pure TypeScript modules exporting typed APIs.
- Constants: Colocate connector-specific constants within each connector folder.
- Mocks: Prefer real HTTP/WS stubs under `tests/mocks/` for tests.
- Tests: Unit specs live next to implementations as `__tests__/*.spec.ts`.

