# AGENTS.md (Scope: ./web)

Diese Datei gilt für alle Inhalte unterhalb von `web/`.

Beachte Root‑Richtlinien in `AGENTS.md` auf Repository-Ebene. Ergänzungen/Abweichungen in diesem Ordner:
- Code-Stil: React mit TypeScript (strict). pnpm als Paketmanager; ESLint/Prettier/Vitest gemäß Vite-Setup pflegen.
- Benennung: Komponenten `PascalCase`, Hooks `camelCase`, Tests `*.test.tsx` nahe der Komponenten.
- Build/Test-Hinweise: `pnpm install` zum Installieren. Standard-Skripte `pnpm dev`, `pnpm build`, `pnpm preview`, `pnpm test -- --run`, `pnpm lint`. Bei CI auf Node 20 setzen.
