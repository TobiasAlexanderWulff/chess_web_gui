# AGENTS: src/connectors/uci/

- Purpose: UCI engine connector implementation.
- Protocol: Follow UCI command/response sequencing per `vision.md`.
- Concurrency: Keep message handling deterministic; avoid hidden timeouts.
- Types: Use `src/types/` for shared shapes; export a minimal API from `index.ts`.
- Tests: Validate parsing and flow using realistic stubs in `tests/mocks/`.

