# Nano Claude Code Plugins

[中文文档](./README_ZH.md)

A marketplace of plugins for Claude Code that put cost and delegation discipline under explicit control.

## Overview

Claude Code's defaults are permissive by design: a subagent that omits its model silently inherits the main-session model, usually the most expensive tier, and a workflow can fan out until the bill arrives. The plugins here replace those defaults with declared budgets, explicit routing, and hooks that enforce both rather than merely suggesting them.

## Available Plugins

### boom

**Version:** 2.0.0 | **Author:** NanoBoom | **Category:** Development

Cost-first delegation control. Claude Code will spawn subagents that silently inherit the main-session model — usually the most expensive tier. This plugin replaces that default with a budget, a routing table, and a hook that enforces both.

**Features:**
- L0-L4 task levels capping total worker starts, concurrency, and active workflows
- Role-to-model routing: discovery on Haiku, planning/QA/review on Sonnet, implementation on Opus
- Fable critical-worker gate: at most one critical start per task, never inside a workflow
- `PreToolUse` hook that denies any `Agent`, `Workflow`, or `SendMessage` dispatch omitting its model
- Bounded worker agents with pinned model, effort, turn cap, and tool boundary

**Commands (2):**

| Command | Description |
|---------|-------------|
| `/boom:setup` | Install the engineering policy as `~/.claude/CLAUDE.md`, backing up any existing file first |
| `/boom:detect-models` | Show which model each delegated subagent actually used in this project, from its transcript |

**Skills (3):**

| Skill | Description |
|-------|-------------|
| `dispatch-policy` | L0-L4 budgets, counting rules, role-to-model routing, Fable gate |
| `workflow-authoring` | Cost-controlled workflow reference: every `agent()` must name its model |
| `debug` | `/boom:debug <issue>`: root-cause diagnosis published to the matching GitHub issue |

**Agents (10):**

| Agent | Model | Description |
|-------|-------|-------------|
| `coordinator` | opus/high | Delegating session lead with no write tools; owns final acceptance. Selected with `--agent`, never dispatched as a worker |
| `explorer` | haiku/low | Read-only discovery for one narrow repository or documentation question |
| `planner` | sonnet/high | Bounded plan from verified evidence |
| `coder` | opus/high | One bounded production or test change |
| `verifier` | sonnet/high | Independent build, test, and runtime verification |
| `reviewer` | sonnet/high | Adversarial read-only correctness review |
| `root-cause-analyzer` | sonnet/high | `/boom:debug` diagnosis: reproduction, causal chain, fix boundary |
| `mid-reviewer` | fable/low | Read-only review when Sonnet's judgment is not enough |
| `critical-coder` | fable/high | One named critical change |
| `critical-reviewer` | fable/high | One named critical audit |

**Hooks (1):** `PreToolUse` on `Agent|Workflow|SendMessage` — explicit model within each role's allowed set, or deny.

Ported from [@ds's](https://docs.dsdev.cn/blog/claude-code-agent-workflow-prompts/) personal `~/.claude` dispatch configuration.

[Learn more →](./plugins/boom/README.md)

---

## Installation

### Quick Start

```bash
# Add this marketplace to Claude Code
/plugin marketplace add https://github.com/NanoBoom/nano-claude-code-plugins.git

# Browse available plugins
/plugin

# Install boom
/plugin install boom@nano-claude-code-plugins
```

### Local Development

Load a plugin for one session without installing it:

```bash
git clone https://github.com/NanoBoom/nano-claude-code-plugins.git
cd nano-claude-code-plugins
claude --plugin-dir plugins/boom
```

Or register the working copy as a marketplace:

```bash
claude
/plugin marketplace add /absolute/path/to/nano-claude-code-plugins
/plugin install boom@nano-claude-code-plugins
# Restart Claude Code for components to load
```

Plugin load failures are silent in normal output — one invalid manifest field drops the whole plugin, agents and hooks included. Check for them explicitly:

```bash
claude -p "hi" --plugin-dir plugins/your-plugin --debug-file /tmp/dbg.log
grep -i "your-plugin" /tmp/dbg.log | grep -iE "\[WARN\]|\[ERROR\]"
```

### Team Installation

Add to your project's `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "nano-claude-code-plugins": {
      "source": "NanoBoom/nano-claude-code-plugins"
    }
  },
  "enabledPlugins": [
    "boom@nano-claude-code-plugins"
  ]
}
```

Team members who trust the repository will automatically have the plugin installed.

### Via `npx skills` (any agent)

The [`skills` CLI](https://github.com/vercel-labs/skills) reads `.claude-plugin/marketplace.json` directly, so this repository serves both installers from one layout — no separate top-level `skills/` directory is needed.

```bash
npx skills add NanoBoom/nano-claude-code-plugins --list          # list the 3 skills
npx skills add NanoBoom/nano-claude-code-plugins                 # install all into this project
npx skills add NanoBoom/nano-claude-code-plugins --skill debug   # install one
npx skills add NanoBoom/nano-claude-code-plugins -g              # install for every project
```

Skills land in `.agents/skills/<name>/`. Claude Code gets a symlink at `.claude/skills/<name>/`; Codex, Cursor, OpenCode and the other universal agents read `.agents/skills/` directly, with no symlink step. A `skills-lock.json` records the source. Verified against `skills@1.5.24`.

**What this installs, and what it does not.** The CLI carries skills only; the 10 agents, 2 commands, and the dispatch hook stay behind. That sorts the three skills by how much survives:

| Skill | Standalone via `npx skills` |
|---|---|
| `dispatch-policy`, `workflow-authoring` | Work as reference; the `boom:*` roles they route to are absent |
| `debug` | Install the plugin — that is its only supported path |

Copying `plugins/boom/agents/` into `.claude/agents/` does **not** rescue `debug` on its own. Those agent files carry unprefixed `name:` fields, so they land as `root-cause-analyzer`, `explorer`, and so on, while the skill body still dispatches `boom:<role>`. Making that route work means editing the installed skill text to strip the prefix everywhere, which the plugin install gives you for free.

Names arrive unnamespaced: the plugin's `/boom:debug` installs as `/debug`, which collides with any same-named skill you already have. `/plugin install` avoids that by namespacing everything under `boom:`.

## Quick Reference

### Delegate under a declared budget

Once `boom` is enabled, worker roles are addressed by their scoped type and every dispatch must name its model:

```
Agent(subagent_type: "boom:explorer", model: "haiku")   # narrow discovery
Agent(subagent_type: "boom:planner",  model: "sonnet")  # bounded plan
Agent(subagent_type: "boom:coder",    model: "opus")    # one bounded change
Agent(subagent_type: "boom:reviewer", model: "sonnet")  # adversarial review
```

Omit the model and the hook denies the call:

```
<error>Agent 'boom:coder' must specify an explicit model. Model inheritance is prohibited.</error>
```

### Run a session as the coordinator

The `coordinator` role delegates and integrates but holds no write tools:

```bash
claude --agent boom:coordinator
```

To pin its model, effort, and concurrency caps at the same time, pass the bundled session settings:

```bash
claude --settings plugins/boom/reference/coordinator.settings.json
```

### Verify what actually ran

The hook stops model inheritance before dispatch. To confirm after the fact, read the subagent transcripts of the current project:

```bash
/boom:detect-models
```

It prints one row per subagent with the model it used, the turn count, and the start of its task prompt. A `fork` always inherits the parent model, so a mismatch there is expected.

See the [plugin README](./plugins/boom/README.md) for the L0-L4 task levels, the full routing table, and what the hook denies.

## Plugin Development

### Creating a New Plugin

1. **Create plugin directory structure:**
   ```bash
   mkdir -p plugins/your-plugin/.claude-plugin
   mkdir -p plugins/your-plugin/commands
   mkdir -p plugins/your-plugin/agents
   ```

2. **Create plugin.json:**
   ```json
   {
     "name": "your-plugin",
     "description": "Your plugin description",
     "version": "1.0.0",
     "author": {
       "name": "Your Name",
       "email": "your.email@example.com"
     }
   }
   ```

3. **Add commands, agents, or skills as needed**

   Leave the component paths out of `plugin.json`. The default `commands/`, `agents/`, `skills/`, and `hooks/hooks.json` are discovered automatically, and declaring them is how manifests break:

   - `"agents": ["./agents/"]` is rejected (`agents.0: Invalid input`) — that field takes *file* paths, unlike `commands`, which accepts a directory. An invalid manifest drops the entire plugin, silently.
   - `"hooks": "./hooks/hooks.json"` is rejected as a duplicate; the manifest field is only for *additional* hook files.
   - In `hooks.json`, write `command` as a string (`"node \"${CLAUDE_PLUGIN_ROOT}/hooks/x.js\""`). The exec-form array shown in some docs is rejected by Claude Code 2.1.263.
   - `permissionMode` in an agent file is ignored for plugin agents and warns on every session. Restrict tools with `tools:` instead.

4. **Update marketplace.json to include your plugin**

### Plugin Structure

```
plugins/
└── your-plugin/
    ├── .claude-plugin/
    │   └── plugin.json       # Plugin metadata
    ├── commands/              # Slash commands (*.md)
    │   └── command.md
    ├── agents/                # AI agents (*.md)
    │   └── agent.md
    ├── skills/                # Skills
    │   └── skill-name/
    │       └── SKILL.md
    ├── hooks/                 # Event handlers
    │   └── hooks.json
    ├── scripts/               # Shell scripts invoked by commands
    ├── .mcp.json             # MCP server configuration
    └── README.md             # Plugin documentation
```

### Verifying both install paths

Any change to the skill layout should be checked against both installers before release:

```bash
# Claude Code: manifests parse, plugin loads
claude plugin validate .
claude plugin validate plugins/boom
claude -p "hi" --plugin-dir plugins/boom --debug-file /tmp/dbg.log
grep -i boom /tmp/dbg.log | grep -iE "\[WARN\]|\[ERROR\]"

# npx skills: every skill is still discovered through the marketplace manifest
npx skills add . --list
```

`permissionMode` warnings are expected — Claude Code ignores that field on plugin agents. The `--list` run must report all three skills and writes nothing; a plain `npx skills add .` does write `.agents/`, `.claude/skills/`, and `skills-lock.json`, which `.gitignore` covers.

## Marketplace Management

### For Plugin Users

| Command | Description |
|---------|-------------|
| `/plugin` | Browse available plugins |
| `/plugin install [name]@nano-claude-code-plugins` | Install a plugin |
| `/plugin update [name]@nano-claude-code-plugins` | Update a plugin |
| `/plugin uninstall [name]@nano-claude-code-plugins` | Uninstall a plugin |

### For Plugin Developers

1. Fork this repository
2. Create your plugin in the `plugins/` directory
3. Update `.claude-plugin/marketplace.json` with your plugin information
4. Submit a pull request

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Plugin Quality Standards:**
   - Complete documentation in README.md
   - Proper error handling in commands and agents
   - Follow Claude Code plugin specification
   - Include examples and usage instructions

2. **Testing:**
   - Test your plugin locally before submitting
   - Ensure all commands and agents work as expected
   - Verify compatibility with latest Claude Code version

3. **Pull Request Process:**
   - Create a feature branch for your plugin
   - Update marketplace.json with plugin metadata
   - Include screenshots or demos if applicable
   - Provide clear description of plugin functionality

## Support

- **Issues:** [GitHub Issues](https://github.com/NanoBoom/nano-claude-code-plugins/issues)
- **Documentation:** [Claude Code Plugins Docs](https://docs.claude.com/en/docs/claude-code/plugins)
- **Contact:** cinuor@gmail.com

## License

This marketplace and its plugins are released under the MIT License.

## Changelog

### v2.2.0 (2026-09-08)
- **Breaking (boom):** removed the `review`, `commit`, `pr`, and `codebase-question` skills and the nine agents that served them (`seam-analyzer`, `pr-test-analyzer`, `comment-analyzer`, `silent-failure-hunter`, `docs-impact-agent`, `code-simplifier`, `codebase-explorer`, `codebase-analyst`, `web-researcher`). Recover them from git history if needed
- Replaced `codebase-explorer` and `web-researcher` with a single Haiku/low `explorer` role for one narrow repository or documentation question
- Tightened `reviewer`, `mid-reviewer`, and `critical-reviewer` around one evidence format: file and line, violated invariant, failure path, confidence, suggested severity, smallest correction
- Updated the dispatch hook, `dispatch-policy`, `workflow-authoring`, and all READMEs to the 3-skill, 10-agent surface
- boom 1.2.0 → 2.0.0

### v2.1.0 (2026-09-08)
- Documented installation through [`npx skills`](https://github.com/vercel-labs/skills). The CLI discovers all seven skills through `.claude-plugin/marketplace.json`, so serving both installers required no layout change — verified against `skills@1.5.24` for both a local path and the GitHub source
- Added a per-skill breakdown of what works standalone, because the CLI installs skills but not the agents, commands, or hook
- Added a "Verifying both install paths" section for maintainers, and `.gitignore` entries for the artifacts `npx skills add .` writes into this repository (`.agents/`, `.claude/skills/`, `skills-lock.json`)
- boom 1.1.0 → 1.2.0

### v2.0.0 (2026-09-07)
- **Breaking:** removed the `prp-core` plugin and its 12 commands and 2 agents. Its manifest declared `"agents": ["./agents/"]`, which fails validation and made the plugin fail to load in Claude Code 2.1.263. Recover it from git history if needed.
- Added the `boom` plugin: L0-L4 delegation budgets, role-to-model routing, a Fable critical-worker gate, 9 bounded worker agents, 2 skills, a `/boom:detect-models` command that reports the model each subagent actually used, and a `PreToolUse` hook that denies model inheritance
- Rewrote the marketplace documentation around delegation cost control
- Documented the plugin manifest pitfalls that silently drop a plugin

### v1.2.0 (2025-01-12)
- Consolidated into single comprehensive prp-core plugin
- Added 12 commands covering complete development lifecycle
- Added 2 specialized agents for codebase and library research
- Removed prp-main and prp-agents (merged into prp-core)
- Updated documentation and examples

### v1.1.0 (2025-12-09)
- Updated documentation to reflect all 3 plugins
- Added comprehensive command reference tables
- Improved installation instructions
- Added quick reference workflow examples

### v1.0.0 (2024-10-10)
- Initial marketplace release
- Added prp-main plugin (14 commands)
- Added prp-agents plugin (2 agents)
- Added prp-core plugin (8 commands, 1 skill)
- Established plugin development guidelines
- Created marketplace infrastructure

---

**Made with NanoBoom**
