# Codex Basic Rules (tech-log)

## Purpose
- Keep this repository optimized for Zenn writing workflow.
- Prioritize clarity, small diffs, and reproducible checks.

## Source of Truth
- `zenn_codex_instruction_final.md`
- `CONTRIBUTING.md`
- `README.md`

If rules conflict, follow the user instruction first, then `zenn_codex_instruction_final.md`.

## Repository Constraints
- Keep article markdown files in `articles/` root.
- Keep draft work in `drafts/`.
- Keep reusable formats in `templates/`.
- Keep `notes_private/` local-only and out of commits.

## Platform Constraints
- Assume Windows PowerShell or Command Prompt.
- Do not introduce bash-specific syntax.
- Avoid adding dev tooling that requires Unix environments.

## Editing Constraints
- Do not mass-reformat unrelated markdown files.
- Do not rename slugs unless explicitly requested.
- Do not move existing image assets without updating references.
- Avoid introducing new tooling unless it directly supports this repo workflow.

## Operational Defaults
- For article generation, start from `templates/*.md`.
- For preview drafts, create `articles/_draft-<slug>.md` and set `published: false`.
- Run `npm.cmd run lint` after changes to markdown/config/scripts.

## Completion Checklist
- Lint passes.
- Paths and links are valid (especially image relative paths).
- New/updated content follows slug and emoji rules in `CONTRIBUTING.md`.
