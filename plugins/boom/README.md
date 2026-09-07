# Boom Plugin for Claude Code

## Overview

`boom` makes token cost a first-class constraint on delegation. Claude Code will happily spawn a fleet of subagents that all inherit the main-session model — usually the most expensive tier — and no one notices until the bill arrives. This plugin replaces that default with an explicit contract:

1. **A budget** — every user task is classified L0–L4, and each level caps total worker starts, concurrency, and active workflows.
2. **A routing table** — every role has a default model and an allowed set (discovery on Haiku, planning/QA/review on Sonnet, implementation on Opus, only named critical work on Fable).
3. **An enforcement gate** — a `PreToolUse` hook that denies any `Agent`, `Workflow`, or `SendMessage` dispatch that omits its model or steps outside its role's allowed set. Model inheritance is not a warning here; it is a denial.

The skills tell the model what to do. The hook makes it true even when the model forgets.

## Components

| Component | Type | Purpose |
| --- | --- | --- |
| `/boom:setup` | command | Installs `reference/engineering-policy.md` as `~/.claude/CLAUDE.md`, backing up any existing file first |
| `/boom:detect-models` | command | Reads the current project's subagent transcripts and reports the model each subagent actually used |
| `dispatch-policy` | skill | L0–L4 budgets, counting rules, role-to-model routing, Fable critical-worker gate |
| `workflow-authoring` | skill | Cost-controlled variant of the bundled workflow reference: every `agent()` must name its model, no Fable inside workflows |
| `coordinator` | agent | Opus/high lead with no write tools; delegates, integrates, and owns final acceptance |
| `explore` | agent | Haiku/low read-only discovery for one narrow question |
| `planner` | agent | Sonnet/high bounded plan from verified evidence |
| `implementer` | agent | Opus/high bounded production or test change |
| `qa` | agent | Sonnet/high independent build, test, and runtime verification |
| `reviewer` | agent | Sonnet/high adversarial read-only review |
| `reviewer-fable` | agent | Fable/low read-only review when Sonnet's judgment is not enough |
| `critical-implementer` | agent | Fable/high, one named critical change |
| `critical-reviewer` | agent | Fable/high, one named critical audit |
| `hooks/enforce-agent-dispatch.js` | hook | `PreToolUse` gate on `Agent`, `Workflow`, `SendMessage` |
| `scripts/detect_models.sh` | script | Backend of `/boom:detect-models`; also runnable directly with a project path |
| `reference/` | docs | Optional companions the plugin cannot install: engineering policy, coordinator session settings, settings snippet |

## Installation

### Via Marketplace

```bash
/plugin marketplace add https://github.com/NanoBoom/nano-claude-code-plugins.git
/plugin install boom@nano-claude-code-plugins
```

### Local Development

Load the plugin for one session, without installing it:

```bash
git clone https://github.com/NanoBoom/nano-claude-code-plugins.git
cd nano-claude-code-plugins
claude --plugin-dir plugins/boom
```

Plugin load failures are silent in normal output — a bad manifest drops the whole plugin, agents included. Check them with:

```bash
claude -p "hi" --plugin-dir plugins/boom --debug-file /tmp/dbg.log
grep -i "boom" /tmp/dbg.log | grep -iE "\[WARN\]|\[ERROR\]"
```

**Requirement:** the hook runs on `node`, which must be on `PATH` for hook subprocesses.

## Task levels

| Level | Use for | Total starts | Concurrency | Critical Fable starts |
|---|---|--:|--:|--:|
| L0 Direct | Explanations and small edits from current context | 0 | 0 | 0 |
| L1 Bounded | One independent task, no cross-check needed | 1 | 1 | 0 |
| L2 Standard | One implementation plus independent QA or review | 4 | 2 | 1 |
| L3 Complex | Cross-module, high-risk, or research-then-implement | 6 | 3 | 1 |
| L4 Exceptional | Large migration, full audit, performance campaign (needs explicit user approval) | 8 | 4 | 1 |

Every Agent call, fork, workflow `agent()`, pipeline item, teammate, restart, resume, repair, and rerun counts as one start against a single cumulative ledger per user task.

## Model routing

Worker roles are plugin-scoped. Pass `subagent_type` as `boom:<role>`.

| Role | Default | Allowed |
|---|---|---|
| `boom:explore` | haiku/low | haiku, sonnet |
| `boom:planner` | sonnet/high | sonnet, opus |
| `boom:implementer` | opus/high | opus, sonnet |
| `boom:qa` | sonnet/high | sonnet, opus |
| `boom:reviewer` | sonnet/high | sonnet, opus |
| `boom:reviewer-fable` | fable/low | fable |
| `boom:critical-implementer` | fable/high | fable |
| `boom:critical-reviewer` | fable/high | fable |

Escalate in order: a worker that *did not try hard enough* (skipped a file, did not run tests) needs more effort or a sharper prompt on the same model; a worker that *did not know enough* (subtle bug, unfamiliar domain, architecture call) needs a stronger model. Judge cost per completed task, not per token.

## What the hook denies

| Dispatch | Decision |
|---|---|
| `Agent` without `subagent_type` | **deny** |
| `Agent` without `model` | **deny** — model inheritance is prohibited |
| `Agent` with a model outside its role's allowed set | **deny** |
| `Agent` with `subagent_type: fork` | **deny** — a fork ignores `model` and runs on the main-session model |
| `Agent` with `model: fable` on a non-Fable role | **deny** |
| `Agent` on an unknown role with an explicit haiku/sonnet/opus model | **ask** — it still inherits the session effort level |
| `Workflow` whose script cannot be read | **deny** — its `agent()` models cannot be verified |
| `Workflow` with an `agent()` naming neither a model nor a defined role | **deny** |
| `Workflow` mentioning `model: fable` | **deny** — run Fable serially through the Agent tool instead |
| `Workflow` that passes every check | **ask** — confirm level, starts, concurrency, rerun policy |
| `SendMessage` to `main` | allow |
| `SendMessage` to a `critical-*` or Fable worker | **deny** — Fable workers are never resumed |
| `SendMessage` to any other agent | **ask** — a resume is a new start |

Malformed or unreadable hook input exits `2` (fail closed), so a broken hook blocks dispatch rather than silently permitting it.

### Verifying what actually ran

The hook is preventive. To audit after the fact, run `/boom:detect-models` in the project. It reads `~/.claude/projects/<encoded-project-path>/*/subagents/agent-*.jsonl` and prints, newest first, one row per subagent:

| Column | Meaning |
|---|---|
| MODEL | every `model` value found in that subagent's assistant messages |
| TURNS | how many messages used each model |
| TASK | the first 60 characters of the task prompt |

Compare MODEL against the `model` argument of the Agent call or the `model:` frontmatter of the agent definition. A `fork` always inherits the parent model, so a mismatch there is expected. The script resolves the project root by walking up from the current directory: an existing Claude Code session directory wins, then a git root, then a common project marker. It can also be run directly:

```bash
bash plugins/boom/scripts/detect_models.sh /path/to/project
```

### Interaction with other plugins

The hook applies to **every** `Agent` dispatch in the session, including ones made by other plugins and built-in skills. A dispatch from another plugin that omits `model` is denied, and one that names a model on an unrecognized role produces an `ask`. That is the intended trade-off — nothing spawns on an unpriced model — but expect extra prompts when running plugins that dispatch their own subagents. Disable the plugin for sessions where that is not wanted.

## Optional companions (manual install)

`/plugin install` wires up skills, agents, and hooks — nothing else. The three files under `reference/` are **never** installed or loaded by the plugin, because Claude Code has no plugin mechanism for memory files or session settings. Copy them yourself if you want the full setup:

- **`engineering-policy.md`** → run `/boom:setup` to install it as `~/.claude/CLAUDE.md`. The command copies when no file is there, and when one already exists it shows the diff, writes a timestamped backup, and asks whether to replace or append — it never overwrites your global instructions silently. To install it by hand instead, merge it into `~/.claude/CLAUDE.md` or drop it in as `~/.claude/rules/engineering-policy.md`; both load into every session, and `rules/` keeps it a separate file. Without this the delegation contract only binds the coordinator agent, since a plugin cannot ship a `CLAUDE.md`.
- **`coordinator.settings.json`** → keep it anywhere and pass it per session: `claude --settings /path/to/coordinator.settings.json`. That gives an Opus/high lead session with no write tools, because its `agent` key selects `boom:coordinator`. `--settings` overrides only the keys it names for that session; everything else still comes from your settings files. Add `--agent boom:coordinator` if you want the agent without the rest of the file. Claude Code has no `--profile` flag or `~/.claude/profiles/` directory — verified against 2.1.263 and the CLI reference.
- **`settings.snippet.json`** → merge into `~/.claude/settings.json` for the spawn-depth and concurrency caps (`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH=1`, concurrency 4, `workflowSizeGuideline: small`, `ultracode: false`). Hook registration is **not** in the snippet — the plugin registers its own hook.

## Notes and caveats

- **`workflow-authoring` is additive, not an override.** As a plugin skill it loads as `boom:workflow-authoring` and cannot replace Claude Code's bundled skill of the same name. Its mandatory model rule is enforced by the hook regardless of which variant the model reads. The body mirrors the bundled reference for **Claude Code 2.1.260** — re-diff it after upgrading. To make it a true override, copy it to `~/.claude/skills/workflow-authoring/SKILL.md`.
- **`Agent(...)` scoping applies to main-thread agents only.** The coordinator's parenthesized allowlist restricts which subagent types it may spawn when run via `claude --agent boom:coordinator` or the settings file above. As a plain subagent, the type list is ignored and only the hook constrains it.
- **`permissionMode` does not survive the port.** Claude Code ignores that field on plugin agents and logs a warning for each file that sets it, so it is omitted here. The read-only roles stay read-only through their `tools:` list, which *is* honored — the coordinator genuinely has no `Write`. To get `permissionMode: plan` as a second guardrail, copy the agent files into `.claude/agents/` or `~/.claude/agents/` instead.
- **The built-in `Explore` agent** is held to the same haiku-or-sonnet set as `boom:explore`.
- Model aliases (`haiku`, `sonnet`, `opus`, `fable`) resolve to the current generation. Do not pin versions, and keep `CLAUDE_CODE_SUBAGENT_MODEL_FORCE` unset so per-call and definition-level models apply.

## Credits

Ported from [@ds's](https://docs.dsdev.cn) personal `~/.claude` dispatch configuration. Rationale and the review that produced the original files:

- https://docs.dsdev.cn/blog/fable-5-workflow/
- https://docs.dsdev.cn/blog/claude-code-agent-workflow-prompts/

Changes made during the port: PowerShell hook rewritten in Node for cross-platform use, worker `PowerShell` tool replaced with `Bash`, `Explore` renamed to `explore` and role identifiers plugin-scoped, hook registration moved from `settings.json` into the plugin.

## License

MIT
