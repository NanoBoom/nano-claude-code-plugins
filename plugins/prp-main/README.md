# PRP Main Workflow Plugin for Claude Code

## Overview

The PRP (Product Requirements Prompt) Workflow plugin is a comprehensive system for AI-driven feature development that enables systematic research, planning, and execution of software features. It provides a structured approach to transforming ideas into working code through well-defined workflows and documentation.

## Features

### Core Capabilities

- **Systematic Research**: Deep codebase analysis and external research for informed development
- **Structured Documentation**: Create comprehensive PRPs that enable one-pass implementation success
- **Parallel Execution**: Support for concurrent POC development and task execution
- **Complete Lifecycle**: From initial planning to final implementation and validation
- **Expert Agents**: Specialized agents for codebase analysis and library research

### Design Philosophy

The plugin follows these core principles:

- **KISS**: Keep It Simple, Stupid - Simple solutions over complex ones
- **YAGNI**: You Aren't Gonna Need It - Solve only current problems
- **DRY**: Don't Repeat Yourself - Consolidate duplicated logic
- **Single Responsibility**: Each task changes one thing
- **Ockham's Razor**: Choose the simplest solution that works

## Installation

### Via Marketplace

```bash
# Add the marketplace containing this plugin
/plugin marketplace add [marketplace-url]

# Install the plugin
/plugin install prp-main@[marketplace-name]
```

### Local Development

```bash
# Clone the repository
git clone https://github.com/NanoBoom/nano-claude-code-plugins.git
cd nano-claude-code-plugins

# Add local marketplace
/plugin marketplace add ./

# Install the plugin
/plugin install prp-main@local
```

## Commands

### Base PRP Commands

#### `/base-create [feature-name]`

Create a comprehensive base PRP with systematic research and context curation. This command:

- Performs deep codebase analysis
- Conducts external research
- Generates a complete PRP document
- Ensures one-pass implementation success

#### `/base-execute [prp-file]`

Execute an existing base PRP to implement the specified feature. Follows the PRP document to deliver working code.

### Planning and Specification

#### `/planning-create [feature]`

Create strategic planning documents for complex feature development with:

- High-level architecture decisions
- Component breakdown
- Risk assessment
- Timeline estimation

#### `/spec-create [requirements]`

Generate detailed technical specifications from requirements including:

- API contracts
- Data models
- Integration points
- Technical constraints

#### `/spec-execute [spec-file]`

Execute technical specifications to implement features according to the defined spec.

### User Story Management

#### `/story-create [feature]`

Create user stories with:

- Clear acceptance criteria
- Implementation details
- Testing requirements
- Definition of done

#### `/story-execute [story-file]`

Execute user stories to deliver feature implementations that meet all acceptance criteria.

### Task Management

#### `/task-create [feature]`

Break down features into actionable development tasks with:

- Clear dependencies
- Time estimates
- Resource requirements
- Success criteria

#### `/task-execute [task-id]`

Execute individual tasks from the task list with progress tracking.

#### `/task-list-init [project]`

Initialize and organize task lists for systematic development:

- Create task hierarchy
- Set priorities
- Define workflows
- Track progress

### Proof of Concept

#### `/poc-create-parallel [feature]`

Create proof-of-concept implementations with parallel execution strategies:

- Multiple approach exploration
- Concurrent experimentation
- Rapid prototyping
- Comparison framework

#### `/poc-execute-parallel [poc-plan]`

Execute POC implementations using parallel processing for faster validation.

### API Development

#### `/api-contract-define [service]`

Define API contracts and interface specifications:

- Endpoint definitions
- Request/response schemas
- Error handling
- Versioning strategy

### Setup

#### `/install-prp`

Install and configure the PRP workflow system in your project:

- Create PRP directory structure
- Set up templates
- Configure settings
- Initialize workflow

## Agents

The PRP workflow system uses specialized agents for research and analysis. These agents are now available as a separate plugin for modularity and reuse.

**Note**: For detailed agent documentation and standalone usage, see the [prp-agents plugin](../prp-agents/README.md).

### Quick Reference

- **codebase-analyst**: Deep codebase pattern analysis and convention discovery
- **library-researcher**: External library documentation research and best practices

Both agents are automatically used during PRP creation commands and can be explicitly invoked via the Task tool.

### Installation

If you want to use these agents standalone or in other plugins:

```bash
/plugin install prp-agents@[marketplace-name]
```

## Configuration

The plugin can be configured through Claude Code settings:

```json
{
  "prp_directory": "./PRPs", // Where PRP documents are stored
  "parallel_execution": true, // Enable parallel POC execution
  "auto_research": true // Auto-perform research during PRP creation
}
```

## Workflow Example

### Creating and Executing a New Feature

1. **Create the PRP**

   ```bash
   /base-create "Add user authentication"
   ```

   This will:
   - Research existing auth patterns in codebase
   - Find external documentation and examples
   - Generate comprehensive PRP document

2. **Review the PRP**
   The PRP will be saved to `PRPs/user-authentication.md`

3. **Execute the Implementation**

   ```bash
   /base-execute PRPs/user-authentication.md
   ```

   This implements the feature according to the PRP.

4. **Validate**
   The execution includes validation steps defined in the PRP.

## PRP Document Structure

Each PRP document contains:

- **Goal**: Feature goal, deliverable, and success definition
- **Context**: YAML structure with references, patterns, and gotchas
- **Implementation Tasks**: Dependency-ordered, actionable tasks
- **Validation Gates**: Project-specific validation commands
- **Final Checklist**: Comprehensive validation criteria

## Best Practices

1. **Research First**: Let the plugin perform thorough research before implementation
2. **Review PRPs**: Always review generated PRPs before execution
3. **Incremental Development**: Use task management for complex features
4. **Parallel POCs**: Explore multiple approaches for uncertain implementations
5. **Validation**: Ensure all validation gates pass before considering complete

## Troubleshooting

### Common Issues

**PRP Generation Takes Long Time**

- This is normal - deep research optimizes for success over speed
- Check progress through spawned agent tasks

**Execution Fails**

- Verify PRP completeness
- Check all referenced files exist
- Ensure dependencies are installed

**Commands Not Available**

- Restart Claude Code after installation
- Verify plugin is enabled: `/plugin`

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch
3. Add/modify commands or agents
4. Test thoroughly
5. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

- **Issues**: <https://github.com/NanoBoom/nano-claude-code-plugins/issues>
- **Documentation**: <https://github.com/NanoBoom/nano-claude-code-plugins/wiki>
- **Author**: NanoBoom (<cinuor@gmail.com>)

## Version History

### v1.2.0 (2025-10-31)

- Renamed plugin from "prp" to "prp-main" for clarity
- Updated all documentation and installation instructions
- Maintained backward compatibility (directory path unchanged)

### v1.1.0 (2025-10-31)

- Extracted agents into separate prp-agents plugin for modularity
- Maintained backward compatibility with existing workflows
- Updated documentation with cross-references

### v1.0.0 (2024-10-10)

- Initial release with comprehensive PRP workflow system
- 14 specialized commands for complete development lifecycle
- 2 expert agents for codebase analysis and library research
- Support for parallel POC execution
- Complete task management and planning capabilities

