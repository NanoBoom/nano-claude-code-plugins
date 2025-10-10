# Nano Claude Code Plugins

A collection of productivity and development workflow plugins for Claude Code, featuring advanced AI-driven development methodologies.

## Overview

This marketplace provides high-quality plugins that extend Claude Code's capabilities, focusing on development productivity, project management, and AI-assisted workflows. Our plugins are designed to streamline complex development tasks and enable systematic approaches to software engineering.

## Available Plugins

### PRP Workflow Plugin

**Version:** 1.0.0
**Author:** NanoBoom
**Categories:** Development, Productivity, Project Management, AI Development

A comprehensive Product Requirements Prompt (PRP) workflow system that transforms ideas into working code through systematic research, planning, and execution. This plugin provides 14 specialized commands and 2 expert agents for complete feature development lifecycle.

[Learn more →](./plugins/prp/README.md)

## Installation

### Quick Start

1. **Add this marketplace to Claude Code:**
   ```bash
   /plugin marketplace add https://github.com/NanoBoom/nano-claude-code-plugins.git
   ```

2. **Browse available plugins:**
   ```bash
   /plugin
   ```

3. **Install a plugin:**
   ```bash
   /plugin install prp@nano-claude-plugins
   ```

### Local Development Installation

For local development and testing:

```bash
# Clone the repository
git clone https://github.com/NanoBoom/nano-claude-code-plugins.git
cd nano-claude-code-plugins

# Start Claude Code
claude

# Add local marketplace
/plugin marketplace add ./

# Install plugins
/plugin install prp@nano-claude-code-plugins
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

3. **Add commands, agents, or hooks as needed**

4. **Update marketplace.json to include your plugin**

### Plugin Structure

```
plugins/
└── your-plugin/
    ├── .claude-plugin/
    │   └── plugin.json       # Plugin metadata
    ├── commands/              # Custom slash commands
    │   └── command.md
    ├── agents/                # Specialized AI agents
    │   └── agent.md
    ├── hooks/                 # Event handlers
    │   └── hooks.json
    ├── .mcp.json             # MCP server configuration (optional)
    └── README.md             # Plugin documentation
```

## Marketplace Management

This repository serves as a Claude Code plugin marketplace. The marketplace configuration is defined in `.claude-plugin/marketplace.json`.

### For Plugin Users

- Browse plugins: `/plugin`
- Install plugins: `/plugin install [plugin-name]@nano-claude-plugins`
- Update plugins: `/plugin update [plugin-name]@nano-claude-plugins`
- Uninstall plugins: `/plugin uninstall [plugin-name]@nano-claude-plugins`

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

This marketplace and its plugins are released under the MIT License. See [LICENSE](./LICENSE) file for details.

## Changelog

### v1.0.0 (2024-10-10)
- Initial marketplace release
- Added PRP Workflow Plugin v1.0.0
- Established plugin development guidelines
- Created marketplace infrastructure

---

**Made with ❤️ by NanoBoom**
