# Git Rules (tech-log)

## Branching
- Use feature branches for changes.
- Treat `main` as protected and merge via pull requests.

## Branch Naming Convention
- Use `codex/<slug>` for Codex-generated work.
- Use `draft/<slug>` for draft promotion work.
- Do not push directly to `main`.

## Commit Style
- Keep commits small and single-purpose.
- Recommended format: Conventional Commits (`feat: ...`, `fix: ...`, `docs: ...`, `chore: ...`).

## Pull Requests
- Include purpose, scope, and validation result.
- Ensure CI passes (`npm run lint`).
- For content changes, mention affected slug(s) and image path changes.
- If a PR intentionally changes the slug of a published article, explain the Zenn-side cleanup plan explicitly.

## Safety
- Avoid force push on shared branches.
- Do not rewrite history unless explicitly requested.
