---
description: Install the boom engineering policy as the user-level ~/.claude/CLAUDE.md
allowed-tools: Bash(ls:*), Bash(diff:*), Bash(mkdir:*), Read
---

Install `${CLAUDE_PLUGIN_ROOT}/reference/engineering-policy.md` as the user-level memory file `~/.claude/CLAUDE.md`.

Claude Code has no plugin mechanism for memory files, so this copy is the only way the delegation contract binds every session rather than only the `boom:coordinator` agent.

`~/.claude/CLAUDE.md` is the user's own global instruction file and is loaded into every session in every project. Treat overwriting it as destructive.

Do exactly this, in order:

1. Check the target: `ls -l ~/.claude/CLAUDE.md`

2. **If it does not exist** — create the directory and copy, then go to step 4:

   ```
   mkdir -p ~/.claude
   cp "${CLAUDE_PLUGIN_ROOT}/reference/engineering-policy.md" ~/.claude/CLAUDE.md
   ```

3. **If it already exists** — do not overwrite it silently.

   a. Show what would change: `diff ~/.claude/CLAUDE.md "${CLAUDE_PLUGIN_ROOT}/reference/engineering-policy.md"`

   b. If the diff is empty, report that the policy is already installed and stop without writing anything.

   c. Otherwise present the diff and ask the user to choose. Do not guess:
      - **replace** — back up first, then copy over it
      - **append** — add the policy to the end of their existing file, keeping their content above it
      - **cancel** — change nothing

   d. Before either write, back up to a path that cannot clobber an earlier backup:

      ```
      cp ~/.claude/CLAUDE.md ~/.claude/CLAUDE.md.boom-backup-$(date +%Y%m%d%H%M%S)
      ```

4. Report the target path, whether the file was created or replaced or appended, and the backup path if one was written. Tell the user the policy takes effect in their next session, not this one.

Do not modify any file other than `~/.claude/CLAUDE.md` and its backup. Do not edit the source policy in the plugin.
