# Meta Implementation Plan

## Guiding Principles
- Anchor all work to the flows and contracts described in `vision.md`; update the document whenever the plan diverges.
- Keep modules decoupled: components in `src/components/`, logic and state in `src/state/`, and engine adapters under `src/connectors/**`.
- Favor incremental, test-driven delivery with 80%+ coverage, green CI, and conventional commits per change.

## Phase 1 – Foundation & Tooling
- Finalize Vite + React + TypeScript scaffold, ensuring eslint/prettier/vitest configs match repository conventions.
- Flesh out shared types in `src/types/` for board state, engine telemetry, and connector contracts.
- Configure global styles, theme tokens, and responsive breakpoints under `src/styles/`.
- Baseline CI: smoke tests (`npm run lint`, `npm run test`, `npm run build`) and caching tuned for quick feedback.

## Phase 2 – State Architecture & Persistence
- Choose the primary store (e.g., Zustand) and build the core slices for board state, match configuration, and connector registry under `src/state/`.
- Implement selectors for derived data (legal moves, clocks, active analysis), keeping them pure and memoized.
- Introduce persistence services for session preferences and last HTTP `game_id`, storing implementations under `src/state/persistence/`.
- Document state shape and hydration strategy in `docs/`.

## Phase 3 – Board & Interaction Layer
- Build the board component suite in `src/components/board/` covering rendering, drag/tap/keyboard move entry, and legal move highlighting.
- Create move list, captured pieces, and clock widgets with responsive layouts and accessibility (ARIA roles, focus management).
- Wire board interactions to the state store with optimistic updates and rollback hooks for illegal moves.

## Phase 4 – Engine Connectors
- Implement `ApiEngineConnector` in `src/connectors/http/` with typed wrappers for session lifecycle, move submission, and search endpoints, including retry/backoff and error normalization.
- Implement `UciEngineConnector` in `src/connectors/uci/` handling process lifecycle, option negotiation, and parsing of `info` / `bestmove` responses.
- Provide shared telemetry translation utilities so both connectors emit a unified analysis schema.
- Add connector-specific unit tests using recorded fixtures under `tests/mocks/`.

## Phase 5 – Match Orchestration
- Develop a `MatchController` service in `src/state/` (or dedicated module) to coordinate turn logic across Human↔Human, Human↔Engine, and Engine↔Engine modes.
- Ensure concurrency control for simultaneous engine requests and maintain a queue for pending actions.
- Integrate clocks, resignation/draw offers, and undo handling per mode.
- Surface consistent status updates (check, mate, stalemate, draw reasons) to the UI layer.

## Phase 6 – Analysis & Telemetry Surfaces
- Build shared analysis components in `src/components/analysis/` for score panels, PV list, node explorations, and TT metrics.
- Add a developer console overlay gated behind a feature flag to inspect raw connector messages.
- Persist analysis preferences (auto-search, depth presets) and sync with connectors.

## Phase 7 – Configuration & Session UX
- Create setup dialogs for selecting connectors, time controls, and starting positions (including FEN input validation).
- Implement engine option editors that hydrate from HTTP metadata or UCI `option` declarations.
- Provide status toasts and inline guidance for connector errors, retries, and engine restarts.

## Phase 8 – Quality Gates & Testing
- Maintain unit specs alongside modules; add integration tests for store + connectors using Vitest.
- Author Playwright suites under `e2e/` covering the three match scenarios, engine failure fallbacks, and persistence restore flows.
- Automate coverage reporting (target ≥80%) and include `npm run lint`, `npm run format -- --check`, and `npm run build` in CI required checks.

## Phase 9 – Documentation & Release Readiness
- Keep `docs/` updated with architecture decisions, state diagrams, and connector lifecycle notes; add ADRs for major changes.
- Maintain changelog entries and version bumps via `npm version` flow; ensure production builds are warning-free before tagging releases.
- Prepare onboarding docs for contributors (environment setup, fixture generation, debugging connectors).

## Milestones & Sequencing
1. Foundation complete with CI green, core types, and styles baseline.
2. State store + persistence ready with board shell rendering legal moves locally.
3. HTTP connector integrated end-to-end with Human↔Engine flow playable.
4. UCI connector functional with option management and shared analysis display.
5. Engine↔Engine automation, full analysis panel, and session UX finalized.
6. Playwright coverage, documentation round-up, and release candidate build signed off.

## Cross-Cutting Concerns & Risks
- Coordinate security review for HTTP connector (input validation, timeouts) before public release.
- Validate UCI process hosting strategy (browser vs Electron/Tauri bridge) early to avoid platform surprises.
- Monitor performance of move generation and analysis rendering on mobile devices; budget for optimizations.
- Establish logging/telemetry patterns compatible with privacy expectations and future analytics.
