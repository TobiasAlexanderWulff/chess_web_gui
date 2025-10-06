# Decision Log – Engine Integration Mode (2025-10-06)

## Status
Accepted (Review planned, wenn UCI-Bridge priorisiert wird)

## Kontext
Die Roadmap verlangt ein Gateway, das die in `docs/openapi.yaml` definierte API bereitstellt, während die eigentliche Engine separat betrieben wird. Für den MVP muss ein Integrationspfad gewählt werden, der schnelle Iteration im Frontend/Gateway ermöglicht, ohne die Engine im selben Repo zu implementieren.

## Entscheidung
Wir starten mit dem HTTP-Passthrough-Modus: Das Gateway proxyt die vorhandenen Endpunkte 1:1 zu einem extern betriebenen Engine-HTTP-Service. Der Gateway stellt Auth/CORS/Rate-Limits bereit, kümmert sich aber nicht um UCI-Kommandos.

## Begründung
- Schnellste Umsetzung: Keine UCI-Übersetzung nötig, API passt bereits zur Spezifikation.
- CI/Tests: OpenAPI-Contract kann unverändert genutzt werden; Integrationstests lassen sich über Mocks/Fakes für HTTP-Aufrufe abbilden.
- Ops-Trennung: Engine-Betrieb (Skalierung, Updates) bleibt beim Engine-Team; Gateway fokussiert sich auf Web-Zugriff.
- Erweiterbar: UCI-Bridge kann später in einem separaten Modul aktiviert werden (`ENGINE_MODE=uci`).

## Konsequenzen
- Konfigurationsbedarf: Gateway benötigt `ENGINE_MODE=http` und `ENGINE_HTTP_URL` (Basis-URL der Engine-API).
- Fehlerbehandlung: Gateway muss HTTP-Fehler sauber übersetzen und dem Frontend strukturierte Fehler (siehe OpenAPI `components.responses.Error`) liefern.
- Test-Setup: Für lokale Entwicklung wird ein Mock-/Fake-Engine-Service benötigt, bis ein echter HTTP-Service verfügbar ist.

## Folgeaktionen
1. Gateway-Routing für die OpenAPI-Endpunkte einführen und Requests an `ENGINE_HTTP_URL` delegieren.
2. README/Env-Doku um die neuen Variablen ergänzen.
3. Evaluieren, wann eine UCI-Bridge erforderlich wird (z.B. Offline-Modus); Entscheidungslog bei Wechsel aktualisieren.
