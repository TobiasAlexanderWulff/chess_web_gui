# Projekt-Roadmap – Chess Web GUI

Diese Roadmap dient als laufender Leitfaden für Planung und Umsetzung. Sie muss vor größeren Initiativen aktualisiert und während des Projekts kontinuierlich gepflegt werden. Änderungen bitte datiert und begründet festhalten.

## Leitprinzipien
- Fokus auf UI/Gateway; Engine bleibt extern.
- Entscheidungen in Roadmap und Plänen müssen konsistent sein (Roadmap > Plan > Task).
- Versionsziele mit Semantic Versioning verknüpfen (`VERSION`, `docs/CHANGELOG.md`).

## Phase 0 – Fundament (Version 0.1.x)
- Governance & Dokumentation aufsetzen (AGENTS, Techstack, Roadmap) ✅
- CI-Grundlagen (OpenAPI-Validierung, optionale FE/BE-Jobs) ✅
- Web-Frontend scaffolden (Vite/React, Basisshell)
- Gateway scaffolden (FastAPI, Proxy/Bridge-Skelette)
- Basis-Tests (Vitest/pytest Smoke) einführen

## Phase 1 – Kernfunktionen (Version 0.2.x)
- Human vs Engine (HTTP-Proxy) mit Board-Darstellung
- Game Session Management (create, state, move, undo) gegen API
- Error-/Loading-Handling, Toasts/Notifications
- Grundlegende E2E-Tests (Playwright) für Move-Flow
- Dokumentation & README aktualisieren, Demo-Screenshots

## Phase 2 – Erweiterungen (Version 0.3.x)
- Human vs Human (Shared Session/Link)
- Engine-Lokalisierung: UCI-Bridge Modus aktivieren
- Einstellungen (Zeitkontrolle, Suche-Parameter)
- Accessibility & i18n Feinschliff
- Performance-Optimierungen (React Profiler, API-Caching)

## Phase 3 – Stretch (Version 0.4.x+)
- Computer vs Computer Demo-Modus
- Integrationen (PGN Export/Import, Sharing)
- Offline-Modus mit WASM-Engine (Feature-Flag)
- Analytics/Telemetry (Opt-in)
- Deployment Guides (Docker Compose, Cloud Templates)

## Offene Fragen & Risiken
- Authentifizierung/Autorisierung nötig? (noch offen)
- Hosting der externen Engine (Ops-Verantwortung klären)
- Datenschutz/Telemetry-Policy abstimmen

## Nächste Schritte (aktualisieren, sobald erledigt)
- [ ] Frontend & Gateway Pläne erstellen (`docs/plans/`)
- [ ] Scaffold Frontend + Gateway
- [ ] Entscheidungslog für Engine-Integrationsmodus festhalten

