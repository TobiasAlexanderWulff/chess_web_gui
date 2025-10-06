# Tech Stack – Chess Web GUI

Ziel: Eine reaktionsschnelle, wartbare Web‑GUI für Schach. Die Schach‑Engine existiert als separates Projekt und wird hier NICHT implementiert. Dieses Projekt kommuniziert mit der Engine per HTTP oder UCI und stellt eine stabile HTTP‑API gemäß `docs/openapi.yaml` bereit (bzw. nutzt diese direkt), optional mit lokaler UCI‑Bridge (siehe `docs/VISION.md`).

**Frontend**
- Framework: React + TypeScript (Vite) – schnelle Dev-Experience, typsichere UI.
- UI/Styling: Tailwind CSS + Headless UI – schnelle, konsistente Komponenten.
- Schachbrett: `react-chessboard` – robuste Board‑Darstellung, Drag & Drop inklusive.
- Client‑State: Zustand oder Redux Toolkit – schlank, unkompliziert.
- Server‑State: TanStack Query – Caching, Refetching, Lade-/Fehlerzustände.
- Routing: React Router – einfache, deklarative Routen.
- i18n & A11y: `react-i18next`, ARIA‑Rollen – internationalisierbar, barrierearm.

Hinweis: Für snappy UX darf lokal validiert werden (z.B. mit `chess.js`), die API bleibt „Source of Truth“ (FEN, Legal Moves, Statusflags).

**Backend (Gateway/Proxy, keine Engine‑Implementierung)**
- Sprache/Framework: Python FastAPI – dünnes Gateway, OpenAPI‑first, async I/O.
- Server: Uvicorn (ASGI) – performant, einfach zu starten.
- Sitzungsverwaltung: In‑Memory Map `{game_id -> GameState}` (MVP), später Redis.
- Integrationspfade zur externen Engine (eine der Optionen):
  - HTTP‑Passthrough: Proxy der OpenAPI‑Routen zu einem vorhandenen Engine‑HTTP‑Service (gleiche Schemas). Vorteil: kein UCI‑Handling im Gateway.
  - UCI‑Bridge: Start eines Engine‑Prozesses (aus externem Projekt) und Übersetzen der API‑Calls in UCI‑Befehle via `python-chess`. Vorteil: funktioniert lokal/offline.
- Serialisierung/Schema: Pydantic – kompatibel zu `docs/openapi.yaml`.
- CORS: `fastapi.middleware.cors` – gezielt erlaubte Origins (Dev/Prod).

Alternative: Rust (Axum) statt FastAPI, wenn spätere Performance/Profiling im Fokus steht; OpenAPI bleibt identisch.

**Option „Engine im Browser“**
- Stockfish WASM (z.B. `stockfish.wasm`) – optionaler Modus „Human vs Computer“ ohne Server.
- Worker‑Ausführung: Web Worker – UI bleibt flüssig; Feature‑Flag im Frontend.
- Hinweis: Unabhängig von der externen Engine; die Server‑API bleibt maßgeblich für Multiplayer und reproduzierbare Tests.

**Integrationsmodi (Überblick)**
- Direkt: Frontend → Engine‑HTTP (wenn CORS erlaubt) – schnellste Architektur, kein Gateway nötig.
- Proxy: Frontend → Gateway → Engine‑HTTP – gleiche Origin, zentrale Auth/Rate‑Limits/Observability.
- UCI: Frontend → Gateway → UCI‑Engine (Prozess) – offlinefähig, kein externer HTTP‑Dienst erforderlich.

**Tests & Qualität**
- Frontend: Vitest + Testing Library; Playwright für E2E (Drag & Drop, Touch).
- Backend: Pytest + HTTPX TestClient; Contract‑Tests gegen `docs/openapi.yaml`.
- Lint/Format: ESLint + Prettier (FE); Ruff + Black (BE); TypeScript strict.

**Build, Dev & CI**
- Dev‑Server: `vite` (FE), `uvicorn --reload` (BE).
- Paketmanager: `pnpm` bevorzugt (oder npm/yarn).
- Makefile‑Targets: `make dev`, `make test`, `make fmt`, `make lint`.
- CI: GitHub Actions – Lint, Test, Build; optional Playwright/pytest Matrix.

**Deployment**
- Container: Docker (mehrstufige Builds).
- Hosting: Static FE (z.B. Nginx) + API‑Service (Uvicorn/Gunicorn) hinter Reverse Proxy.
- Konfig: env‑Vars
  - `API_BASE_URL` (FE): Basis‑URL des Gateways bzw. Engine‑HTTP.
  - `CORS_ORIGINS` (BE): erlaubte Origins.
  - `ENGINE_MODE` (BE): `http` | `uci`.
  - `ENGINE_HTTP_URL` (BE): Ziel‑URL beim HTTP‑Passthrough.
  - `ENGINE_UCI_CMD` (BE): auszuführendes Kommando für den UCI‑Prozess (Pfad aus dem externen Projekt), z.B. `./engine_bin --uci`.
  - `LOG_LEVEL` (BE): Logging‑Level.

**Observability & Sicherheit**
- Logging: strukturierte Logs (JSON) im BE; Browser‑Logs minimieren.
- Metriken: optional Prometheus Exporter im BE.
- Security: CORS/CSRF‑Konzept, Rate‑Limiting (Proxy), Input‑Validation per Pydantic.

**Datenmodell (MVP)**
- `GameState`: `game_id`, `fen`, `legal_moves[]`, Flags (`in_check`, `checkmate`, `stalemate`, `draw`), `last_move?`, `move_history[]`.
- Persistenz: In‑Memory; später Redis für TTL‑Sessions und horizontale Skalierung.

**Empfohlene Verzeichnisstruktur**
- Frontend: `web/` – Vite App (`src/`, `components/Board.tsx`, `state/`, `api/`).
- Backend: `server/` – FastAPI (`app/main.py`, `app/routers/games.py`, `app/schemas.py`).
- Docs: `docs/` – Vision, OpenAPI, Techstack (bestehend).

**Schnellstart (lokal)**
- Frontend
  - `cd web`
  - `pnpm install`
  - `pnpm dev` (Vite-Dev-Server)
  - `pnpm test -- --run` (Vitest + Testing Library)
  - `pnpm lint` (ESLint, Flat Config)
- Backend
  - `python -m venv .venv && source .venv/bin/activate`
  - `pip install fastapi uvicorn pydantic[dotenv]` (bei UCI‑Bridge zusätzlich `python-chess`)
  - Gateway‑Endpunkte gemäß `docs/openapi.yaml` anlegen (Proxy/Bridge, keine Engine‑Logik)
  - Start: `uvicorn app.main:app --reload --port 8000`

**Warum dieser Stack?**
- Schneller MVP mit solider DX; klare Trennung UI ↔ API.
- OpenAPI‑first erleichtert Tests, Mocking und spätere Alternativ‑Implementierungen.
- Optionales WASM‑Engine‑Fallback erhöht Offline‑Nutzbarkeit ohne den API‑Pfad zu verbiegen.
