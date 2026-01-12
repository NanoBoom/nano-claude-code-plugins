# PRP Core Plugin for Claude Code

## Overview

Complete PRP (Product Requirement Prompt) workflow system providing comprehensive commands for planning, implementation, debugging, issue management, and code review.

## Features

### Planning & Design
- **PRD Creation**: Generate comprehensive Product Requirement Documents
- **Planning**: Create detailed implementation plans with validation gates
- **Implementation Strategy**: Design execution approaches

### Development Workflow
- **Implementation**: Execute PRPs with systematic validation
- **Debugging**: Interactive debugging with step-by-step analysis
- **Issue Management**: Investigate and fix issues systematically

### Code Quality
- **Code Review**: Automated code review with best practices
- **Validation**: Built-in quality checks and validation gates
- **Commit Management**: Smart git commits with proper messages

### AI-Powered Development
- **Ralph**: Autonomous development agent for end-to-end feature development
- **Codebase Analysis**: Deep pattern and architecture analysis
- **Library Research**: External library and documentation research

## Installation

### Via Marketplace
```bash
/plugin marketplace add https://github.com/NanoBoom/nano-claude-code-plugins.git
/plugin install prp-core@nano-claude-code-plugins
```

### Local Development
```bash
# Clone the repository
git clone https://github.com/NanoBoom/nano-claude-code-plugins.git
cd nano-claude-code-plugins

# Add local marketplace
/plugin marketplace add .

# Install plugin
/plugin install prp-core@nano-claude-code-plugins
```

## Commands

### Planning Commands

#### `/prp-prd`
Generate comprehensive Product Requirement Documents (PRD) with deep codebase analysis.

**Usage:**
```bash
/prp-prd "Feature description"
```

**Output:** Creates a detailed PRD in `PRPs/features/[feature-name].prd.md`

#### `/prp-plan`
Create detailed implementation plans with validation gates and step-by-step tasks.

**Usage:**
```bash
/prp-plan "Feature or issue to plan"
```

**Output:** Creates an implementation plan in `PRPs/features/[feature-name].plan.md`

### Implementation Commands

#### `/prp-implement`
Execute PRPs with systematic validation and quality checks.

**Usage:**
```bash
/prp-implement path/to/prp.md
```

**Features:**
- Validation loop execution
- Automated testing
- Quality gate checks
- Progress tracking

### Debugging Commands

#### `/prp-debug`
Interactive debugging with step-by-step analysis and validation.

**Usage:**
```bash
/prp-debug "Issue description or error message"
```

**Features:**
- Root cause analysis
- Step-by-step debugging
- Validation after fixes
- Documentation of findings

### Issue Management Commands

#### `/prp-issue-investigate`
Deep investigation of issues with systematic analysis.

**Usage:**
```bash
/prp-issue-investigate "Issue description"
```

**Features:**
- Multi-angle analysis
- Pattern recognition
- Related issue identification
- Investigation report generation

#### `/prp-issue-fix`
Systematic issue fixing with validation loops.

**Usage:**
```bash
/prp-issue-fix path/to/investigation-report.md
```

**Features:**
- Implementation with validation
- Test coverage
- Regression prevention
- Fix verification

### Code Review Commands

#### `/prp-review`
Comprehensive code review with best practices validation.

**Usage:**
```bash
/prp-review [files or directories]
```

**Features:**
- Best practices checking
- Security analysis
- Performance review
- Maintainability assessment

### Git & PR Commands

#### `/prp-commit`
Create atomic git commits with proper messages and validation.

**Usage:**
```bash
/prp-commit
```

**Features:**
- Smart commit message generation
- Pre-commit validation
- Conventional commits format
- Co-authored attribution

#### `/prp-pr`
Create pull requests with comprehensive descriptions.

**Usage:**
```bash
/prp-pr "PR title"
```

**Features:**
- Auto-generated descriptions
- Test plan generation
- Related issue linking
- Review checklist

### AI Agent Commands

#### `/prp-ralph`
Launch Ralph, the autonomous development agent for end-to-end feature development.

**Usage:**
```bash
/prp-ralph "Feature request"
```

**Features:**
- Complete workflow automation (PRD → Plan → Implementation → PR)
- Autonomous decision making
- Quality validation at each step
- Human oversight at key checkpoints

#### `/prp-ralph-cancel`
Cancel the running Ralph agent.

**Usage:**
```bash
/prp-ralph-cancel
```

### Setup Commands

#### `/install`
Install and configure the PRP system for your project.

**Usage:**
```bash
/install
```

**Features:**
- Creates PRP directory structure
- Sets up validation gates
- Configures git integration
- Initializes templates

## Agents

### codebase-analyst
Deep codebase pattern analysis for understanding architecture and conventions.

**Capabilities:**
- Pattern recognition
- Architecture discovery
- Convention detection
- Similar implementation identification

### library-researcher
External library and documentation research for best practices.

**Capabilities:**
- Documentation research
- API discovery
- Best practices identification
- Common pitfalls documentation

## Workflow Examples

### Complete Feature Development

```bash
# 1. Create PRD with research
/prp-prd "Add user authentication with JWT"

# 2. Create implementation plan
/prp-plan PRPs/features/add-user-authentication.prd.md

# 3. Implement the feature
/prp-implement PRPs/features/add-user-authentication.plan.md

# 4. Review the changes
/prp-review src/auth/

# 5. Commit changes
/prp-commit

# 6. Create pull request
/prp-pr "feat: add JWT authentication"
```

### Autonomous Development with Ralph

```bash
# Ralph handles the entire workflow
/prp-ralph "Add user authentication with JWT and session management"
```

### Bug Investigation & Fix

```bash
# 1. Investigate the issue
/prp-issue-investigate "Users can't login after password reset"

# 2. Fix the issue
/prp-issue-fix PRPs/investigations/login-after-reset.md

# 3. Commit the fix
/prp-commit

# 4. Create PR
/prp-pr "fix: resolve login issue after password reset"
```

### Debugging Session

```bash
# Interactive debugging
/prp-debug "TypeError: Cannot read property 'id' of undefined in user profile"
```

## PRP Methodology

The PRP methodology follows these principles:

### 1. Context is King
Include all necessary patterns, documentation, and examples from your codebase.

### 2. Validation Loops
Provide executable tests that AI can run and fix automatically.

### 3. Information Dense
Use actual keywords and patterns from your codebase.

### 4. Progressive Success
Start with minimal implementation, validate, then enhance.

## Directory Structure

```
PRPs/
├── features/               # Feature PRDs and plans
│   ├── *.prd.md           # Product requirement documents
│   └── *.plan.md          # Implementation plans
├── investigations/         # Issue investigation reports
│   └── *.investigation.md
├── ai_docs/               # AI-accessible documentation
│   └── *.md
└── CLAUDE.md             # Main PRP template reference
```

## Integration

This plugin works standalone and provides comprehensive PRP workflow capabilities:

- Complete development lifecycle (PRD → Plan → Implementation → Review → PR)
- Autonomous development with Ralph agent
- Issue investigation and fixing
- Interactive debugging
- Code quality and review

## Best Practices

### 1. Start with Research
Always create PRDs first to gather context and patterns.

### 2. Plan Before Implementing
Use `/prp-plan` to create detailed implementation strategies.

### 3. Validate Frequently
Use validation gates at each step to catch issues early.

### 4. Document Decisions
Keep investigation reports and plans for future reference.

### 5. Review Before Committing
Always run `/prp-review` before creating commits.

## License

MIT License

## Support

- Issues: https://github.com/NanoBoom/nano-claude-code-plugins/issues
- Author: NanoBoom (cinuor@gmail.com)

## Attribution

Based on the PRP methodology from [PRPs-agentic-eng](https://github.com/Wirasm/PRPs-agentic-eng) by [Wirasm](https://github.com/Wirasm).
