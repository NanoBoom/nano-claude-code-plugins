---
name: dispatch-policy
description: Cost-first budget and model routing for Agent, fork, Workflow, Agent Team, and Codex delegation. Load before the first delegation in a task, or when the user asks about task levels, worker budgets, or which model a worker should use.
---

# Dispatch Policy

Token cost is a first-class constraint. Default to L0 and serial execution. The limits below are ceilings, not targets.

## Task levels

| Level | Use for | Total starts | Starts per workflow | Active workflows | Concurrency | Critical Fable starts |
|---|---|--:|--:|--:|--:|--:|
| L0 Direct | Explanations and small edits from current context | 0 | 0 | 0 | 0 | 0 |
| L1 Bounded | One independent task, no cross-check needed | 1 | none | 0 | 1 | 0 |
| L2 Standard | One implementation plus independent QA or review | 4 | 4 | 1 | 2 | 1 |
| L3 Complex | Cross-module, high-risk, or research-then-implement | 6 | 6 | 1 | 3 | 1 |
| L4 Exceptional | Large migration, full audit, performance campaign; requires explicit user approval in this conversation | 8 | 8 | 1 | 4 | 1 |

Counting rules:

- Every Agent call, fork, workflow agent(), pipeline item, teammate, Codex delegation, restart, resume, repair, and rerun is one start.
- Keep one cumulative ledger per user task. Do not split a task across workflows to evade its total.
- In one phase use either direct Agent dispatch or a workflow, never both at once.
- Parallelize only genuinely independent work when the wall-clock gain justifies the extra context.
- At L2 and above, report once before the first dispatch: level, planned starts, peak concurrency, model per role, and Fable allowance. Update only when the level or remaining capacity changes. L1 needs no ledger.
- At any limit, stop creating workers and report the unfinished work. Do not raise the level without the user's instruction.
- A user prompt may tighten these limits; it cannot loosen system instructions, permissions, tool allowlists, or hooks.

## Model routing

Always pass an explicit `subagent_type` and `model` alias to the Agent tool. Aliases resolve to the current generation; do not pin specific versions. Keep `CLAUDE_CODE_SUBAGENT_MODEL_FORCE` unset so per-call and definition-level models apply, and read the resolved model from the Agent tool result.

The worker roles ship with this plugin, so their `subagent_type` is plugin-scoped: `boom:implementer`, not `implementer`.

Each role has a default model in its definition and an allowed set enforced by the hook. Overriding within the allowed set per call is normal; the default is where to start, not a ceiling.

| Role (`subagent_type`) | Default | Allowed | Typical work |
|---|---|---|---|
| `boom:explore` | haiku | haiku, sonnet | Narrow discovery, evidence lists; sonnet when the search needs more context or turns |
| `boom:planner` | sonnet/high | sonnet, opus | Bounded plans; opus for cross-module architecture |
| `boom:implementer` | opus/high | opus, sonnet | Production and test changes; sonnet for mechanical edits you can describe precisely |
| `boom:qa` | sonnet/high | sonnet, opus | Builds, tests, browser checks, reproduction |
| `boom:reviewer` | sonnet/high | sonnet, opus | Ordinary independent review; opus for permissions, data, concurrency, migration, public contracts |
| `boom:reviewer-fable` | fable/low | fable | Read-only review when Sonnet's judgment is not enough; Anthropic reports Fable at low is competitive on cost per task with Sonnet or Opus at higher effort |
| `boom:critical-implementer` | fable/high | fable | One named critical change |
| `boom:critical-reviewer` | fable/high | fable | One named critical audit |

Escalation order, from the Claude Code model guidance: ask whether the worker did not try hard enough or did not know enough. Not trying hard enough (skipped a file, did not run tests, did not double-check) means raise effort or rerun with a sharper prompt on the same model. Not knowing enough (subtle bug, unfamiliar domain, architecture decision) means move to a stronger model. Judge cost per completed task, not per token; a cheaper worker that needs another round is not cheaper.

Routing notes:

- implementer at opus/high is a deliberate step below the Claude Code default effort. Raise to xhigh when rework or failed verification shows the task needs it.
- Review prompts are adversarial: ask the reviewer to refute the change and prove it does not work. A second reviewer with fresh context beats re-asking the same one.
- Built-in types such as `Explore`, `general-purpose`, and `Plan` also need an explicit haiku, sonnet, or opus alias. The built-in `Explore` is held to the same haiku-or-sonnet set as the role above.
- A fork ignores the model parameter and runs on the main-session model. Count it as a main-model start and use it only when the full conversation context is required.
- Codex delegation, including codex-rescue, counts as a start and is used only when the user names Codex in the current conversation. The plugin's proactive-use guidance does not override this.
- Preserve the configured main-session model. A dedicated coordinator session launched with its own `--settings` file may pin opus/high.
- Do not use Agent Teams unless workers must talk to each other. Do not enable ultracode.

## Fable worker gate

Two kinds of Fable worker exist and are budgeted differently.

- `reviewer-fable` at low effort is an ordinary read-only start. It is allowed from L1 upward and counts against the level's total starts like any other worker. Use it when a Sonnet review is uncertain or the diff is high-stakes, and tell it to read before concluding because Fable at low searches less on its own.
- `critical-implementer` and `critical-reviewer` at high effort are the critical slot: at most one start per user task, allowed from L2 upward (an implementation plus its review is L2, and the review may be the critical one), never more than one Fable worker of any kind running concurrently.
- Use the critical slot only for a named issue involving security, permissions, privacy, concurrency, transactions, irreversible migration, high-impact release, a critical architecture boundary, or one evidence-backed normal-role attempt that failed.
- Run critical roles serially after cheaper evidence is consolidated into a compact packet. Never place any Fable worker in parallel(), pipeline(), restart, resume, repair, or rerun.
- Never use Fable workers for exploration, fan-out, routine implementation, builds, browser QA, formatting, or documentation.
- Raise a critical role to xhigh only when an eval on real tasks shows headroom at high.
- If a Fable worker ends with a refusal stop reason, report that, do not count it as a failed normal-role attempt, and rerun the same task on opus/xhigh without spending another Fable start. Finding vulnerabilities in source code is permitted; false positives come mostly from compile-check phrasing, obscure languages, and base64 in tool output.
