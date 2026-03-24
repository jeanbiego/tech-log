# AGENTS.md

## Scope
- This repository is for Zenn article writing and publishing workflow.
- It is not an app/backend project. Do not introduce app architecture rules.

## Read First
- `README.md`
- `CONTRIBUTING.md`
- `zenn_codex_instruction_final.md`
- `codex/rules/basic_rules.md`
- `codex/rules/git_rules.md`

## Environment Assumptions
- This repository assumes a Windows environment.
- Use `npm.cmd` instead of `npm` when invoking scripts.
- Do not modify scripts to be cross-platform unless explicitly requested.
- Do not introduce WSL, bash-only commands, or Unix-specific tooling.

## Content Structure Rules
- Article markdown must be under `articles/` directly (`articles/<slug>.md`).
- Draft work must be under `drafts/<yyyymmdd>_<topic>/`.
- Preview article format: `articles/_draft-<slug>.md` with `published: false`.
- Images for Zenn GitHub sync must be placed under repository-root `images/` and referenced with absolute `/images/...` paths.
- Do not store video files in the repository (use external hosting links).

## Slug Rules
- `howto-<tool>-<task>`
- `paper-<firstauthor>-<year>-<keyword>`
- `repro-<paperkey>-<topic>`
- Use lowercase letters, digits, and hyphens only.

## Working Rules
- Keep changes minimal and focused on the user request.
- Reuse `templates/*.md` when creating new content.
- Preserve existing file encoding/EOL unless explicitly asked.
- Prefer `apply_patch` for manual edits.

## Validation
- Run `npm.cmd run lint` after content/config changes.
- If needed, use `npm.cmd run dev` for preview checks.

## Git Rules
- Assume PR-based workflow.
- Do not rewrite history unless explicitly requested.
- Follow details in `codex/rules/git_rules.md`.
