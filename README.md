# Nano Claude Code Plugins

[中文文档](./README_ZH.md)

A marketplace of productivity and development workflow plugins for Claude Code, featuring the PRP (Product Requirements Prompt) methodology for AI-driven software development.

> **Attribution**: This project is based on [PRPs-agentic-eng](https://github.com/Wirasm/PRPs-agentic-eng) by [Wirasm](https://github.com/Wirasm). We have reorganized and adapted the original work into a modular plugin marketplace format. All credit for the PRP methodology and core concepts goes to the original author.

## Overview

This marketplace provides high-quality plugins that extend Claude Code's capabilities through the **PRP methodology** - where **PRP = PRD + curated codebase intelligence + agent/runbook**. The PRP approach enables AI agents to ship production-ready code on the first pass by providing comprehensive context, step-by-step implementation plans, and executable validation gates.

### What is PRP?

A PRP (Product Requirements Prompt) is a comprehensive implementation document that contains:

1. **Context** - All necessary patterns, documentation, and examples from your codebase
2. **Plan** - Step-by-step tasks with validation gates
3. **Validation** - Executable commands to verify correctness

### Core Principles

- **Context is King** - Include ALL necessary information for implementation success
- **Validation Loops** - Provide executable tests the AI can run and fix
- **Information Dense** - Use keywords and patterns from your codebase
- **Progressive Success** - Start simple, validate, enhance

## Available Plugins

| Plugin | Commands | Agents | Skills | Purpose |
|--------|----------|--------|--------|---------|
| prp-main | 14 | - | - | Main PRP workflow system |
| prp-agents | - | 2 | - | Research agents for codebase analysis |
| prp-core | 8 | - | 1 | Automation & orchestration |

### prp-main

**Version:** 1.0.0 | **Author:** NanoBoom | **Category:** Development

A comprehensive PRP workflow system for AI-driven feature development with systematic research, planning, and execution capabilities.

**Features:**
- Systematic research with deep codebase analysis
- Structured documentation for one-pass implementation
- Parallel POC execution support
- Complete development lifecycle management

**Commands (14):**

| Command | Description |
|---------|-------------|
| `/base-create` | Create comprehensive base PRP with research |
| `/base-execute` | Execute base PRP implementation |
| `/planning-create` | Create strategic planning documents |
| `/spec-create` | Generate technical specifications |
| `/spec-execute` | Execute technical specifications |
| `/story-create` | Create user stories with acceptance criteria |
| `/story-execute` | Execute user story implementation |
| `/task-create` | Break down features into tasks |
| `/task-execute` | Execute individual tasks |
| `/task-list-init` | Initialize and organize task lists |
| `/poc-create-parallel` | Create parallel POC implementations |
| `/poc-execute-parallel` | Execute POCs with parallel processing |
| `/api-contract-define` | Define API contracts and interfaces |
| `/install-prp` | Install and configure PRP system |

[Learn more ->](./plugins/prp-main/README.md)

---

### prp-agents

**Version:** 1.0.0 | **Author:** NanoBoom | **Category:** Development

Specialized AI agents for PRP workflow providing codebase analysis and library research capabilities.

**Agents (2):**

| Agent | Description |
|-------|-------------|
| `codebase-analyst` | Deep codebase pattern analysis, architecture discovery, convention detection, and similar implementation identification |
| `library-researcher` | External library documentation research, API discovery, best practices identification, and common pitfalls documentation |

**Usage:**
These agents are automatically invoked during PRP creation commands and can be explicitly invoked via the Task tool in custom workflows.

[Learn more ->](./plugins/prp-agents/README.md)

---

### prp-core

**Version:** 1.0.0 | **Author:** NanoBoom | **Category:** Development

Complete PRP workflow automation with commands for creating, executing, committing, and shipping features using the PRP methodology.

**Features:**
- End-to-end workflow automation
- Git integration (branch, commit, PR)
- Validation gates and quality checks
- CI/CD integration support

**Commands (8):**

| Command | Description |
|---------|-------------|
| `/prp-core:create` | Create feature PRP with deep codebase analysis |
| `/prp-core:execute` | Execute PRP with validation until complete |
| `/prp-core:commit` | Create atomic git commit with validation |
| `/prp-core:pr` | Push changes and create pull request |
| `/prp-core:new-branch` | Create new git branch for feature |
| `/prp-core:review` | Code review with validation |
| `/prp-core:install` | Install and configure prp-core |
| `/prp-core:run-all` | Complete workflow orchestration (create -> execute -> commit -> pr) |

**Skill (1):**

| Skill | Description |
|-------|-------------|
| `prp-core-runner` | Orchestrates complete PRP workflow from feature request to pull request |

[Learn more ->](./plugins/prp-core/README.md)

---

## Installation

### Quick Start

```bash
# Add this marketplace to Claude Code
/plugin marketplace add https://github.com/NanoBoom/nano-claude-code-plugins.git

# Browse available plugins
/plugin

# Install plugins
/plugin install prp-main@nano-claude-code-plugins
/plugin install prp-agents@nano-claude-code-plugins
/plugin install prp-core@nano-claude-code-plugins
```

### Local Development

```bash
# Clone the repository
git clone https://github.com/NanoBoom/nano-claude-code-plugins.git
cd nano-claude-code-plugins

# Start Claude Code
claude

# Add local marketplace (use absolute path)
/plugin marketplace add /absolute/path/to/nano-claude-code-plugins

# Install plugins
/plugin install prp-main@nano-claude-code-plugins
/plugin install prp-agents@nano-claude-code-plugins
/plugin install prp-core@nano-claude-code-plugins

# Restart Claude Code for commands to load
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
    "prp-main@nano-claude-code-plugins",
    "prp-agents@nano-claude-code-plugins",
    "prp-core@nano-claude-code-plugins"
  ]
}
```

Team members who trust the repository will automatically have the plugins installed.

## Quick Reference

### Complete Workflow Example

```bash
# 1. Create a feature PRP with deep analysis
/prp-core:create "Add user authentication with JWT"

# 2. Execute the PRP (implements the feature)
/prp-core:execute PRPs/features/add-user-authentication.md

# 3. Commit changes with validation
/prp-core:commit

# 4. Create pull request
/prp-core:pr "feat: add JWT authentication"
```

### Alternative Workflow (prp-main)

```bash
# Create comprehensive PRP
/base-create "Add user authentication"

# Execute implementation
/base-execute PRPs/user-authentication.md
```

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
    ├── .mcp.json             # MCP server configuration
    └── README.md             # Plugin documentation
```

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
