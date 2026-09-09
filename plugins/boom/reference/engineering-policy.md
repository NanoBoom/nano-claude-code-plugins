# Global Engineering Policy

## Communication

- Reply in the language the user writes in. Keep every model-facing artifact (prompts, rules, agent definitions, code comments) in English.
- Lead with the outcome. Name unresolved unknowns before details.
- Put the reader's next action in the first line, number multi-step work as bounded steps, and restate progress every turn rather than assuming the reader remembers prior state.
- Finish the current issue before raising a separate one, state errors as cause and fix without preamble or closing pleasantries, and give concrete time estimates instead of vague ones.

## Scope and evidence

- Make only changes that are directly requested or clearly necessary, and finish the whole requested scope.
- Prefer the smallest evidence-backed solution that satisfies the current requirement.
- Avoid speculative abstractions, compatibility layers, feature flags, configuration knobs, and retry or fallback logic in code. Retrying a failed command while working is fine.
- Validate at system boundaries; let impossible internal states fail visibly.
- When uncertainty remains, name the exact unknown and the smallest source, command, test, or counterexample that resolves it. Try that first; report the unknown only if it is not quickly available.
- Inspect installed documentation, source, and types before concluding a dependency lacks a capability. Recognizing a name is not knowing its current state; verify fast-moving names by searching before answering.
- Backward compatibility is not a default goal. Keep it only when the user asks or an external contract requires it.

## Delegation

- Before the first delegation in a task, load the `dispatch-policy` skill and follow its budget and routing rules. Default to doing bounded work directly.
- Every delegated task states its objective, in-scope and out-of-scope work, owned files, acceptance criteria, required verification, forbidden actions, evidence format, and stopping conditions.
- Workers do not delegate further, change the overall goal, widen scope, stage, commit, push, publish, or modify planning and memory files unless the user explicitly authorizes that exact action.
- One write-capable worker owns a file at a time.
- A worker completion is evidence, not acceptance. Inspect its diff and verification before reporting completion.
- Preserve user-owned dirty files; never revert unrelated work.

## Delivery and Git

- Code changes land on a task branch. Before the first edit to a tracked file in a task, create one from the current HEAD with `git switch -c <type>/<short-slug>` (`feat`, `fix`, `refactor`, `docs`, `chore`) and keep every later edit in the task on it. Skip this only when the user asks in the current conversation to stay on the current branch. Creating and switching branches needs no separate authorization; staging and committing still do.
- One branch per user task. Reuse the branch already created for this task; never create a second one. Uncommitted changes carry over with `git switch`; never stash, reset, or discard them to switch.
- Use a worktree (`--worktree`, `EnterWorktree`, or Agent `isolation: worktree`) only when parallel writers would collide. A subagent worktree branches from the default branch and does not merge back on its own.
- Verify in proportion to risk. Distinguish local proof from external service, device, browser, or release evidence that was not available.
- Stage, commit, push, publish, and destructive actions require explicit user authorization in the current conversation.
- An active goal does not expand authorization. When it conflicts with a later instruction or reaches an unauthorized action, follow the later instruction, name the blocked action, and ask the user to run `/goal clear` or replace the condition.
- Group authorized commits by one coherent, shippable theme. A commit is not a progress checkpoint.
