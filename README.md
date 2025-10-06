# Chess Web GUI

Ein moderner, webbasierter Schach-Client, der über HTTP oder UCI mit einer externen Engine kommuniziert. Dieses Repository konzentriert sich auf UI, Gateway/Proxy und Dokumentation – die Engine selbst liegt in einem separaten Projekt.

## Status
- Version: `0.0.1` (Pre‑Alpha)
- Fokus: Governance, Dokumentation, Build-/Test-Infrastruktur vorbereiten

## Vision & Architektur
- Zielbild: `docs/VISION.md` beschreibt die geplanten Spielmodi, API-Endpunkte und UCI-Anbindung.
- Tech-Stack: `docs/techstack.md` fasst Frontend (React/TypeScript), Backend-Gateway (FastAPI) und Integrationsmodi (HTTP-Passthrough, UCI-Bridge, WASM) zusammen.
- API-Vertrag: `docs/openapi.yaml` ist die maßgebliche Spezifikation des Gateways.

## Repository-Struktur
- `docs/` – Vision, OpenAPI, Techstack, Changelog, lokale AGENTS-Richtlinien.
- `.github/workflows/ci.yml` – GitHub Actions Workflow (OpenAPI-Check, Frontend/Backend-Jobs).
- `AGENTS.md` – Root-Governance (Pflege von Sub-AGENTS, Versionierung, Doku, CI).
- `VERSION` – Semantic-Versioning-Quelle.
- `web/` – Vite/React-Frontend inkl. lokaler Governance (`web/AGENTS.md`).
- (geplant) `server/` – FastAPI-Gateway/Proxy.

## Getting Started
1. Repository klonen oder aktualisieren.
2. Dokumentation durchgehen (`docs/`), insbesondere Techstack und OpenAPI.
3. Für neue Ordner direkt ein lokales `AGENTS.md` anlegen (siehe Root-Template).
4. Frontend starten: `cd web && pnpm install && pnpm dev` (siehe Abschnitt „Frontend Development“).
5. Nach Änderungen `VERSION`/`docs/CHANGELOG.md` prüfen und ggf. Versionsupdate vorschlagen.

## Frontend Development
- `cd web`
- `pnpm install`
- `pnpm dev` startet den lokalen Vite-Dev-Server auf Port 5173.
- `pnpm test` führt Vitest inklusive Testing Library aus.
- `pnpm lint` nutzt ESLint (Flat Config) über TypeScript/React-Dateien.
- `pnpm build` erzeugt einen Produktions-Build unter `web/dist`.

## Tests & Continuous Integration
- GitHub Actions prüft
  - OpenAPI-Spezifikation (immer).
  - Frontend (`web/`): pnpm install, `pnpm lint`, `pnpm test`, `pnpm build`.
  - Backend (`server/`), sobald `requirements.txt` oder `pyproject.toml` vorhanden ist (Lint/Test mit Python 3.12).
- Lokale Tests spiegeln diese Jobs wider. Bitte neue Skripte/Targets in zukünftigen Projektschritten ergänzen.

## Dokumentation pflegen
- README und `docs/` müssen bei neuen Features aktualisiert werden.
- Versionsänderungen in `VERSION` und `docs/CHANGELOG.md` festhalten (SemVer).
- Relevante Entscheidungen/Architektur-Notizen früh dokumentieren, damit CI/Release-Prozess konsistent bleibt.

## Beitragen & Governance
- Verbindliche Regeln stehen im Root-`AGENTS.md`.
- Pull Requests gegen `main` benötigen grüne CI-Läufe; direkte Pushes sind zu vermeiden.
- Breaking Changes klar kennzeichnen und Versionssprung mit der Projektleitung abstimmen.

## Nächste Schritte (Empfehlung)
1. Frontend-Komponenten für Board/Spielsteuerung entwickeln und an Mock-Daten anbinden.
2. FastAPI-Gateway (`server/`) mit Proxy/Bridge-Gerüst implementieren und gegen `docs/openapi.yaml` testen.
3. README & Doku nach jeder Erweiterung aktualisieren; Version 0.1.0 anstreben, sobald erste funktionale Oberfläche verfügbar ist.
