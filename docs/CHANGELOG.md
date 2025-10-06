# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden in dieser Datei festgehalten. Das Projekt folgt Semantic Versioning (MAJOR.MINOR.PATCH).

## [Unreleased]
- Frontend-Grundgerüst unter `web/` hinzugefügt (Vite + React + TypeScript, Tests mit Vitest/TL) und CI-Job für Lint/Test/Build aktiviert.
- Planungsdokument `docs/plans/frontend-scaffolding-20251006.md` ergänzt, um Scope und Tests für den Aufbau festzuhalten.
- Frontend-Testskripte auf nicht-interaktiven Durchlauf (`vitest --run`) gestellt, damit lokale/CI-Läufe ohne manuelles Beenden funktionieren.
- Gateway-Planung in `docs/plans/gateway-scaffolding-20251006.md` dokumentiert.
- FastAPI-Gateway-Skelett (`server/`) mit `/healthz`-Endpoint, Tests und Requirements hinzugefügt.

## [0.0.1] - 2025-10-06
- Initiale Struktur für Governance & Doku: `AGENTS.md` (Root) mit Regeln zu Sub-AGENTS, Versionierung, Doku-Pflege, CI auf main.
- `docs/techstack.md` erstellt und an externe Engine angepasst (Gateway/Proxy, Integrationsmodi, Config-Variablen).
- `VERSION` als Single Source of Truth eingeführt.
