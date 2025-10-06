# AGENTS.md (Scope: ./server)

Diese Datei gilt für alle Inhalte unterhalb dieses Ordners. Konflikte mit höherliegenden Regeln werden hier explizit übersteuert.

Beachte Root-Richtlinien in AGENTS.md auf Repository-Ebene. Ergänzungen/Abweichungen in diesem Ordner:
- Code-Stil: Bevorzuge modulare FastAPI-Anwendungen ohne unnötige Abstraktionen; Endpoints klar gemäß `docs/openapi.yaml` strukturieren.
- Benennung: Dateinamen snake_case, Python-Pakete klar nach Verantwortlichkeiten (z.B. `routers`, `schemas`).
- Build/Test-Hinweise: Tests mit `pytest`, FastAPI `TestClient`; virtuelle Umgebung empfohlen (`python -m venv .venv`).
