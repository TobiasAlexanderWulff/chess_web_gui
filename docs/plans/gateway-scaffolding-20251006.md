# Gateway-Scaffolding Plan (2025-10-06)

## Zielsetzung
Ein minimales FastAPI-Gateway unter `server/` bereitstellen, das als Proxy-Skelett dient, Tests integriert und mit der bestehenden Governance/CI harmoniert.

## Scope
- Ordner `server/` anlegen und lokale Governance (`AGENTS.md`) ableiten.
- FastAPI-Applikation mit `/healthz`-Endpoint implementieren.
- Abhängigkeiten via `requirements.txt` definieren.
- Pytest-Smoke-Test für `/healthz` ergänzen.
- CI-Anbindung sicherstellen (bestehender Workflow greift automatisch).

## Annahmen
- Python 3.12 ist lokal und in CI verfügbar.
- Keine direkte Engine-Integration nötig (HTTP-Passthrough später).
- Sandbox erlaubt das Hinzufügen neuer Dateien im Repository.

## Abhängigkeiten
- Root-Governance (`AGENTS.md`).
- CI-Workflow `.github/workflows/ci.yml`.
- API-Definition `docs/openapi.yaml` (Referenz für künftige Endpunkte).

## Deliverables
- `server/` Verzeichnis mit `AGENTS.md`, `main.py`, `requirements.txt`.
- Health-Check-Test unter `server/tests/test_healthz.py`.
- Aktualisierte Dokumentation (README, CHANGELOG) mit Verweis auf Gateway-Setup.

## Teststrategie
- Lokal `python -m pytest server/tests` ausführen.
- CI: bestehender Backend-Job greift `requirements.txt` auf und führt `pytest` aus.

## Rollback
- Entfernen des Verzeichnisses `server/` und wiederherstellen der angepassten Dokumentation.
- Git-Reset auf den letzten stabilen Commit.
