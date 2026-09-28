# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Git rules — STRICT

- **Never run `git commit`** (including `--amend`) in this repository.
- **Never run `git push`** (to any remote or branch, including force pushes).
- Do not create commits or pushes indirectly either (e.g. via `gh pr create`, `gh repo sync`, scripts, or hooks).
- Make code changes in the working tree only. The user reviews, commits and pushes everything themselves.
- Read-only git commands (`git status`, `git diff`, `git log`, `git show`, `git branch`) are fine.
- If a task seems to require a commit or push, stop and tell the user instead of doing it.
