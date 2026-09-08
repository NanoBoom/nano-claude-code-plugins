---
name: review
description: Reviews GitHub pull requests through specialist review agents, runs repository validation, verifies corrections, aggregates findings, and posts the result. Defaults to code, seam, and simplification review; the operator can add scopes or explicitly request only selected scopes. Use when the operator asks to review a PR, re-review fixes, check whether a PR is ready to merge, run review agents, or invokes /boom:review.
argument-hint: "<pr-number|pr-url|branch> [add <scopes>|only <scopes>|all] [--verify-corrections] [--approve|--request-changes]"
---

# Review a Pull Request

Coordinate an evidence-based PR review. Reviewer agents are the only path for judging the code:
do not add an inline review pass before or after them.

**Input**: $ARGUMENTS (if absent, use the current branch's PR).

Let `workflows/agents.md` own scope selection, reviewer dispatch, correction verification,
aggregation, and publication. Pass the operator's scope intent and flags through without rebuilding
those contracts here.

Reviewer dispatch is governed by the `boom:dispatch-policy` skill: load it before the first launch,
classify the task level from the number of selected scopes, and pass an explicit `model` on every
Agent call. The hook denies a dispatch that omits one.

Resolve the review store before starting. Reports live outside the repository so they survive
worktree cleanup and never land in a commit:

```bash
# --- Review store resolver ---
# Adopt the store that already records this root; mint a key only when none does.
_gd="$(git rev-parse --path-format=absolute --git-common-dir 2>/dev/null)"
case "$_gd" in */.git) _root="${_gd%/.git}" ;; "") _root="$PWD" ;; *) _root="$_gd" ;; esac
_root="$(cd "$_root" && pwd -P)"
_name="$(basename "$_root" | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9' '-' | sed 's/^-*//;s/-*$//')"
_home="${BOOM_HOME:-$HOME/.boom}"
_hit="$(grep -lsF "\"path\": \"$_root\"" "$_home"/*/project.json 2>/dev/null | head -1)"
REVIEW_HOME="${_hit%/project.json}"
[ -n "$REVIEW_HOME" ] || REVIEW_HOME="$_home/${_name:-project}-$(printf %s "$_root" | git hash-object --stdin | cut -c1-8)"
mkdir -p "$REVIEW_HOME"; [ -f "$REVIEW_HOME/project.json" ] || printf '{"path": "%s", "name": "%s"}\n' "$_root" "${_name:-project}" > "$REVIEW_HOME/project.json"
```

Read `workflows/agents.md` and execute it end-to-end. Before producing the report, read
`templates/review-report.md` and follow its output contract exactly.

## Resources

- `workflows/agents.md` — PR resolution, validation, agent scopes, aggregation, and publication
- `templates/review-report.md` — canonical local and GitHub review format
