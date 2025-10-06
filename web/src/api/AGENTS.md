# AGENTS.md (Scope: ./web/src/api)

Diese Datei gilt für alle Inhalte unterhalb dieses Ordners. Konflikte mit höherliegenden Regeln werden hier explizit übersteuert.

Beachte Root-Richtlinien in AGENTS.md sowie `web/AGENTS.md`. Ergänzungen/Abweichungen in diesem Ordner:
- Code-Stil: HTTP-Clients klein halten, Funktionen mit expliziten Rückgabetypen versehen.
- Benennung: Dateinamen snake_case (z.B. `client.ts`), Funktionsnamen beginnen mit einem Verb (`fetchGatewayHealth`).
- Build/Test-Hinweise: Vitest für Unit-Tests nutzen; externe Aufrufe via `vi.stubGlobal('fetch', ...)` isolieren.
