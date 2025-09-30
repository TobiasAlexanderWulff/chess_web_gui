# Versioning Guidelines

We follow Semantic Versioning (SemVer): `MAJOR.MINOR.PATCH`.

## Definitions
- MAJOR: Incompatible, breaking changes to public APIs or contracts. Examples:
  - Changes to HTTP or UCI interfaces defined in `vision.md` that require client or engine updates.
  - Removals or incompatible changes to exported TypeScript types in `src/types/`.
  - State shape changes in `src/state/` that require consumer migration.
  - Breaking UI/route changes that invalidate documented flows or deep links.
- MINOR: Backwards-compatible functionality added. Examples:
  - New features/components, optional fields, or non-breaking extensions to APIs.
  - New selectors, utilities, or connector capabilities that don’t require changes by consumers.
  - Performance improvements that don’t alter behavior.
- PATCH: Backwards-compatible bug fixes and low-risk changes. Examples:
  - Bug fixes, dependency updates, test/dev tooling, docs, CI, and internal refactors.
  - Style or accessibility improvements that don’t change public APIs.

Use judgment: if consumers must change code or configuration to upgrade, it’s MAJOR. If consumers can upgrade without changes and gain capabilities, it’s MINOR. If behavior stays the same but quality improves, it’s PATCH.

## Conventional Commits → Version Bumps
- feat(...): usually MINOR
- fix(...), perf(...), chore(...), docs(...), test(...), refactor(...): usually PATCH
- BREAKING CHANGE: footer or `!` in the type/scope indicates MAJOR regardless of type

## Release Checklist
1. Ensure `main` is green and warning-free: `npm run lint && npm run test && npm run build`.
2. Update docs as needed (e.g., `vision.md` when contracts change).
3. Choose the bump level:
   - `npm version patch` for PATCH
   - `npm version minor` for MINOR
   - `npm version major` for MAJOR
   Optionally include a message: `-m "chore(release): v%s"`.
4. Push commit and tags: `git push && git push --tags`.
5. Create a GitHub release with highlights and link to PRs (optional).

## Notes
- The authoritative version lives in `package.json`.
- Keep `npm run build` warning-free for releases.
- When changing contracts, update `vision.md` and call out migration steps in the release notes.
