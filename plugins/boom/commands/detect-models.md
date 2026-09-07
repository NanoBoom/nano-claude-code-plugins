---
description: Show which model each delegated subagent actually used in this project
allowed-tools: Bash(bash:*)
---

Run the detection script against the current project and show the user its output verbatim:

```
bash "${CLAUDE_PLUGIN_ROOT}/scripts/detect_models.sh" "$(pwd)"
```

The script reads `~/.claude/projects/<encoded-project-path>/*/subagents/agent-*.jsonl` and prints, per subagent, the `model` values found in its assistant messages (MODEL), how many messages used each (TURNS), and the first 60 characters of its task prompt (TASK). Newest subagents come first.

After showing the table, compare each MODEL against what was requested (the `model` argument of the Agent call, or the `model:` frontmatter of the agent definition) and point out any mismatch. Remember that `fork` agents always inherit the parent model, so a mismatch there is expected.

If the script reports no session directory or no subagent transcripts, say so and stop. Do not modify any file.
