# PRP Agents Plugin for Claude Code

## Overview

Specialized AI agents for the PRP workflow system providing codebase analysis and library research capabilities.

## Features

### codebase-analyst
- Deep codebase pattern analysis
- Architecture and structure discovery
- Convention and naming standard detection
- Similar implementation identification

### library-researcher
- External library documentation research
- API method discovery and examples
- Best practices and common pitfalls
- Version-specific considerations

## Installation

### Via Marketplace
```bash
/plugin marketplace add [marketplace-url]
/plugin install prp-agents@[marketplace-name]
```

### Local Development
```bash
/plugin marketplace add ./
/plugin install prp-agents@local
```

## Usage

These agents are automatically invoked by PRP workflow commands:
- `/base-create` - Uses both agents for comprehensive research
- `/story-create` - Uses both agents for codebase and library analysis
- Can be explicitly invoked via Task tool in custom workflows

## Agents

### codebase-analyst

Specialized agent for deep codebase analysis, pattern recognition, and architectural insights.

**Capabilities:**
- Identify similar patterns and implementations
- Analyze code structure and dependencies
- Discover conventions and best practices
- Map component relationships

**Usage:**
The agent is automatically invoked during PRP creation for codebase research.

### library-researcher

Expert agent for researching external libraries, documentation, and best practices.

**Capabilities:**
- Find relevant documentation
- Discover implementation examples
- Identify best practices
- Research common pitfalls

**Usage:**
Automatically used during PRP creation for external research.

## Integration

This plugin is designed to work with:
- `prp-main` - Main PRP workflow plugin
- `prp-core` - Core PRP automation commands
- Any custom plugins using PRP methodology

## License

MIT License

## Support

- Issues: https://github.com/NanoBoom/nano-claude-code-plugins/issues
- Author: NanoBoom (cinuor@gmail.com)
