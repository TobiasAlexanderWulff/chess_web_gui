# AGENTS.md (Root)

Geltungsbereich: Dieses Dokument gilt für das gesamte Repository ab Root und alle Unterverzeichnisse. Tiefer liegende AGENTS.md-Dateien dürfen Regeln verfeinern/übersteuern (nächsttiefe gewinnt bei Konflikten).

Ziel: Klare Leitplanken für Agenten und Beitragende, damit Änderungen konsistent, überprüfbar und dokumentiert sind – mit Fokus auf Web‑GUI (Frontend) und Gateway/Proxy (Backend), nicht auf Engine‑Implementierung.

## Grundprinzipien
- Minimal-invasive Änderungen, klarer Scope je Task, keine unbegründeten Refactorings.
- Bestehende Dokumente respektieren (docs/VISION.md, docs/techstack.md, docs/openapi.yaml). OpenAPI ist Quelle der Wahrheit für Schnittstellen.
- Schreib Stil: prägnant, typsicher, wartbar. Keine unnötige Komplexität.

## AGENTS.md in Unterverzeichnissen (automatisch pflegen)
- Bei jedem neuen Unterverzeichnis MUSS eine lokale `AGENTS.md` angelegt werden, die:
  - den Geltungsbereich auf das jeweilige Verzeichnis festlegt,
  - abweichende Stil-/Strukturregeln beschreibt (nur falls nötig),
  - auf dieses Root‑Dokument verweist.
- Bei Änderungen in der Struktur oder den lokalen Regeln: entsprechende `AGENTS.md` aktualisieren.
- Minimal‑Template für neue Ordner:

```
# AGENTS.md (Scope: ./<verzeichnis>)

Diese Datei gilt für alle Inhalte unterhalb dieses Ordners. Konflikte mit höherliegenden Regeln werden hier explizit übersteuert.

Beachte Root‑Richtlinien in AGENTS.md auf Repository‑Ebene. Ergänzungen/Abweichungen in diesem Ordner:
- Code‑Stil:
- Benennung:
- Build/Test‑Hinweise:
```

## Versionierung (SemVer) und Release‑Pflege
- Verwende Semantic Versioning: MAJOR.MINOR.PATCH
  - PATCH: Bugfixes, interne Verbesserungen, reine Doku‑Anpassungen.
  - MINOR: rückwärtskompatible Features/Endpunkte, UI‑Erweiterungen ohne Bruch.
  - MAJOR: Breaking Changes an API, UI‑Kontrakten oder Konfiguration.
- Versionsträger: Datei `VERSION` im Repository‑Root (Single Source of Truth). CHANGELOG unter `docs/CHANGELOG.md`.
- Nach Abschluss einer Aufgabe MUSS abgewogen werden, ob eine Versionserhöhung sinnvoll ist. Falls ja: dem/der Nutzer:in aktiv die neue Version vorschlagen (inkl. kurzer Begründung) und erst nach Freigabe anpassen.
- Bei Versionserhöhung: `VERSION` aktualisieren, `docs/CHANGELOG.md` Eintrag ergänzen, README ggf. anpassen. Tags/Release‑Notes über GitHub sind empfohlen.

## README und Dokumentation pflegen
- README.md stets aktuell halten (Setup, Dev, Build, Deployment, Konfiguration). Neue Features erfordern Updates.
- Neue/erweiterte Funktionalität dokumentieren unter `docs/` (z.B. `docs/techstack.md`, `docs/VISION.md`, Architekturübersicht, Migrationshinweise).
- API‑Änderungen gegen `docs/openapi.yaml` validieren und dokumentieren (Contract‑Tests bevorzugt).

## GitHub Actions Validierung (main Branch)
- Änderungen auf `main` nur via Pull Request. Direkte Pushes vermeiden.
- PRs dürfen gemergt werden, wenn alle GitHub Actions erfolgreich sind (Lint, Tests, Build). Füge bei Bedarf Workflows hinzu/aktualisiere sie, um den Stack abzudecken (Frontend/Backend, ggf. E2E).
- Status‑Checks blockieren Merge bei Fehlern. Große Jobs parallelisieren, Caching aktivieren.

## Code‑ und Qualitätsregeln (Kurzfassung)
- Frontend: TypeScript strict, ESLint+Prettier, Vitest/RTL, optional Playwright.
- Backend (Gateway/Proxy): FastAPI, Pydantic, pytest+HTTPX. Keine Engine‑Logik in diesem Repo implementieren.
- Tests nahe am geänderten Code ergänzen/aktualisieren. Keine unbeteiligten Baustellen anfassen.

## Arbeitsweise für Agenten
- Plane komplexe Tasks in überschaubare Schritte und halte den Plan aktuell. Markiere erledigte Schritte und reduziere Scope, wenn möglich.
- Vor schreibenden Aktionen kurz ankündigen, danach knapp zusammenfassen, was umgesetzt wurde.
- Files mit kleinsten, fokussierten Patches ändern. Re‑Runnables (Build/Test) lokal validieren, wenn vorhanden.
- Bei potenziellen Breaking Changes: explizit hervorheben, Impact analysieren, Versionserhöhung vorschlagen.

## Konfiguration und Sicherheit
- Konfiguration über env‑Variablen (z.B. `API_BASE_URL`, `ENGINE_MODE`, `ENGINE_HTTP_URL`, `ENGINE_UCI_CMD`, `CORS_ORIGINS`, `LOG_LEVEL`). Keine Secrets einchecken.
- CORS restriktiv konfigurieren, nur benötigte Origins freigeben. Rate‑Limiting und Logging/Tracing über Gateway/Proxy erzwingen.

## Was NICHT in dieses Repo gehört
- Keine Implementierung der Schach‑Engine. Engine liegt in einem separaten Projekt und wird via HTTP oder UCI angebunden.
