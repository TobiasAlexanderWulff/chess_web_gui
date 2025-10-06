# AGENTS.md (Scope: ./server/tests)

Diese Datei gilt für alle Inhalte unterhalb dieses Ordners. Konflikte mit höherliegenden Regeln werden hier explizit übersteuert.

Beachte Root-Richtlinien in AGENTS.md sowie `server/AGENTS.md`. Ergänzungen/Abweichungen in diesem Ordner:
- Code-Stil: Pytest konventionen (Fixtures als Funktionen, Dateien `test_*.py`).
- Benennung: Testdateien spiegeln Zielmodule (`test_healthz.py`, `test_games.py`).
- Build/Test-Hinweise: Tests lokal mit `python -m pytest`; keine externen Ressourcen ohne Mocks.
