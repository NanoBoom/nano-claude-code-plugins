#!/usr/bin/env bash
# List the model actually used by each Claude Code subagent for a project.
# Usage: detect_models.sh [dir]   (defaults to the current directory)
set -euo pipefail

# Claude Code keys session dirs by the directory it was launched from,
# encoded by replacing every non-alphanumeric character with '-'.
encode_project_path() {
  printf '%s' "$1" | sed 's/[^A-Za-z0-9]/-/g'
}

# Resolve the project root for an arbitrary start directory.
# Priority, walking from the start dir up to '/':
#   1. the closest ancestor that already has a Claude Code session dir
#   2. the closest ancestor that is a git root (.git dir or worktree file)
#   3. the closest ancestor holding a mainstream project marker
#   4. the start dir itself
detect_project_dir() {
  local start dir m
  start="$(cd "$1" && pwd -P)"

  # Marker names are matched as-is; entries with '*' are globs.
  local markers=(
    package.json pnpm-workspace.yaml lerna.json deno.json bun.lockb
    pyproject.toml setup.py setup.cfg requirements.txt Pipfile poetry.lock uv.lock
    go.mod go.work Cargo.toml
    pom.xml build.gradle build.gradle.kts settings.gradle settings.gradle.kts
    Gemfile composer.json mix.exs
    Package.swift Podfile pubspec.yaml
    CMakeLists.txt Makefile meson.build BUILD.bazel WORKSPACE
    '*.sln' '*.csproj' '*.xcodeproj' '*.xcworkspace'
    CLAUDE.md .claude
  )

  # 1. Existing session dir wins: it is what Claude Code actually used.
  dir="$start"
  while :; do
    [ -d "$HOME/.claude/projects/$(encode_project_path "$dir")" ] && { printf '%s\n' "$dir"; return; }
    [ "$dir" = "/" ] && break
    dir="$(dirname "$dir")"
  done

  # 2. Git root (also covers worktrees and submodules where .git is a file).
  dir="$start"
  while :; do
    [ -e "$dir/.git" ] && { printf '%s\n' "$dir"; return; }
    [ "$dir" = "/" ] && break
    dir="$(dirname "$dir")"
  done

  # 3. Closest ancestor with a known project marker.
  dir="$start"
  while :; do
    for m in "${markers[@]}"; do
      case "$m" in
        *'*'*) compgen -G "$dir/$m" >/dev/null 2>&1 && { printf '%s\n' "$dir"; return; } ;;
        *)     [ -e "$dir/$m" ] && { printf '%s\n' "$dir"; return; } ;;
      esac
    done
    [ "$dir" = "/" ] && break
    dir="$(dirname "$dir")"
  done

  # 4. Fall back to where we started.
  printf '%s\n' "$start"
}

project_dir="$(detect_project_dir "${1:-.}")"
sessions_dir="$HOME/.claude/projects/$(encode_project_path "$project_dir")"

[ -d "$sessions_dir" ] || { echo "No session dir for $project_dir: $sessions_dir" >&2; exit 1; }

files="$(find "$sessions_dir" -path '*/subagents/agent-*.jsonl' -print0 | xargs -0 ls -t 2>/dev/null || true)"
[ -n "$files" ] || { echo "No subagent transcripts under $sessions_dir"; exit 0; }

printf '%-10s %-12s %-28s %-6s %s\n' "SESSION" "AGENT" "MODEL" "TURNS" "TASK"
printf '%s\n' "$files" | while read -r f; do
  session="$(basename "$(dirname "$(dirname "$f")")")"
  agent="$(basename "$f" .jsonl | sed 's/^agent-//')"
  # First user message = the task prompt handed to the subagent.
  task="$(grep -m1 '"type":"user"' "$f" | sed -E 's/.*"content":"?([^"]{0,60}).*/\1/' | tr -d '\n')"
  grep -o '"model":"[^"]*"' "$f" | cut -d'"' -f4 | sort | uniq -c | while read -r n m; do
    printf '%-10s %-12s %-28s %-6s %s\n' "${session:0:8}" "${agent:0:12}" "$m" "$n" "$task"
  done
done
