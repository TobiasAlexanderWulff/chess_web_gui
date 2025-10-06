# AGENTS.md (Scope: ./docs)

Geltungsbereich: Dieses Dokument gilt für alle Inhalte unterhalb von `docs/`. Bei Konflikten mit Root‑Regeln in `AGENTS.md` haben die spezifischen Regeln hier Vorrang.

Leitlinien für Dokumentation
- Quelle der Wahrheit: `docs/openapi.yaml` für die API, `docs/VISION.md` für Ziele, `docs/techstack.md` für Implementierungsstack.
- Schreibstil: prägnant, deutsch/englisch konsistent, klare Abschnittsüberschriften, kurze Absätze, Aufzählungen bevorzugen.
- Querverweise: relative Pfade verwenden (z. B. `docs/techstack.md`). Keine externen Protokoll‑URIs im Codeblock (z. B. `file://`).
- Versionierung: Änderungen mit Nutzerwirkung im `docs/CHANGELOG.md` vermerken und abwägen, ob eine Versionsanhebung in `VERSION` sinnvoll ist. Vorschlag an User machen, vor Anpassung.
- Struktur: neue Unterordner in `docs/` mit eigener `AGENTS.md` anlegen, wenn dort eigene Konventionen gelten sollen (Template siehe Root‑AGENTS.md).

Qualitätssicherung
- Bei API‑Änderungen: `docs/openapi.yaml` aktualisieren und mit CI validieren lassen.
- Bei neuen Features: README und relevante Doku‑Seiten ergänzen, Screenshots/Diagramme nach Bedarf.

