---
description: Analyze codebase and create/update rule documentation in .claude/rules directory
argument-hint: [module-name]
---

# Rule Documentation Update

**Module**: $ARGUMENTS

---

## Command Objective

Analyze the project codebase, extract key architecture patterns, design conventions, and implementation details to generate or update rule documentation in `.claude/rules/`. These documents guide Claude Code during development to ensure new code adheres to project standards.

**Core Principles**:
- **Codebase is Source of Truth** - Reference actual code, never fabricate examples
- **Natural Language Description** - Describe patterns with rules, don't copy code
- **Precise References** - All patterns include file:line references
- **Incremental Updates** - Modify existing documents, don't overwrite

---

## Phase 0: DETECT - Parameter Parsing

### 0.1 Determine Update Scope

| Parameter | Scope | Behavior |
|-----------|-------|----------|
| Empty | All modules | Analyze entire codebase, update all rule documents |
| Module name specified | Single module | Analyze and update only the specified module's rules |

**Supported Module Names**:

| Module | Description | Applicable Projects |
|--------|-------------|---------------------|
| `architecture` | Architecture design, system structure | All projects |
| `coding-standards` | Coding conventions, naming patterns | All projects |
| `error-handling` | Error handling patterns | All projects |
| `testing` | Testing strategies and patterns | All projects |
| `api` | API design standards | Backend/Fullstack |
| `database` | Database design and queries | Backend/Fullstack |
| `auth` | Authentication/authorization patterns | Projects requiring auth |
| `state-management` | State management | Frontend/Fullstack |
| `performance` | Performance optimization strategies | All projects (optional) |
| `git-workflow` | Git workflow | All projects (optional) |
| `deployment` | Deployment processes | All projects (optional) |
| `documentation` | Documentation standards | All projects (optional) |

### 0.2 Determine Applicable Modules (Full Update Only)

**If full update (no parameters)**, select core modules based on project type:

| Project Type | Core Modules | Optional Modules |
|--------------|--------------|------------------|
| Frontend (React/Vue/Angular) | architecture, coding-standards, testing, state-management | performance, git-workflow |
| Backend API | architecture, coding-standards, error-handling, api, testing | database, auth, performance |
| Fullstack | architecture, coding-standards, error-handling, api, testing, database, state-management | auth, performance, deployment |
| CLI Tool | architecture, coding-standards, error-handling, testing | documentation |
| Library/SDK | architecture, coding-standards, testing, documentation | - |

**If single module update (module specified)**: Skip this step, update only the specified module.

### 0.3 Create Directory Structure

```bash
mkdir -p .claude/rules
```

**PHASE_0_CHECKPOINT:**
- [ ] Parameters parsed
- [ ] Update scope determined (full or single module)
- [ ] If full update: applicable modules determined
- [ ] Directory structure created

---

## Phase 1: DISCOVER - Project Analysis

### 1.1 Identify Project Type and Tech Stack

**Detect project type**:

```bash
# Check for configuration files
ls -la package.json pyproject.toml Cargo.toml go.mod pom.xml 2>/dev/null
```

| Config File | Project Type | Primary Language |
|-------------|--------------|------------------|
| `package.json` | Node.js/Frontend | TypeScript/JavaScript |
| `pyproject.toml` | Python | Python |
| `Cargo.toml` | Rust | Rust |
| `go.mod` | Go | Go |
| `pom.xml` | Java | Java |

### 1.2 Identify Project Structure

**Discover source code directories**:

```bash
# List potential source directories
ls -la src/ app/ lib/ pkg/ internal/ cmd/ 2>/dev/null | head -20
```

**Common directory structures**:
- TypeScript/JS: `src/`, `app/`, `lib/`, `components/`, `pages/`
- Python: `src/`, `lib/`, root-level modules
- Go: `cmd/`, `internal/`, `pkg/`
- Rust: `src/`, `crates/`

### 1.3 Identify Key Technologies

**Framework and library detection** (from package.json/requirements.txt, etc.):
- Frontend frameworks: React, Vue, Angular, Svelte
- Backend frameworks: Express, Fastify, Django, Flask, Gin
- Databases: PostgreSQL, MySQL, MongoDB, Redis
- ORMs: Drizzle, Prisma, TypeORM, SQLAlchemy
- Test frameworks: Jest, Vitest, Pytest, Go test

**PHASE_1_CHECKPOINT:**
- [ ] Project type identified
- [ ] Source code directories located
- [ ] Tech stack cataloged

---

## Phase 2: ANALYZE - Deep Codebase Analysis

### 2.1 Select Analysis Strategy Based on Update Scope

**If full update (no parameters)**:

Launch two agents in parallel using Task tool:

**Task 1: Invoke codebase-explorer agent**

Use Task tool with `subagent_type="prp-core:codebase-explorer"`:

```
Explore the entire codebase structure and patterns for rule documentation generation:

DISCOVER:
1. Directory structure and file organization - Map the project's physical layout
2. Naming conventions - Extract actual naming patterns for files, functions, classes, variables
3. Code organization patterns - Identify modularity, layering, separation of concerns
4. Common code patterns and abstractions - Find repeatedly used design patterns
5. Test file organization and patterns - Test structure, naming, assertion styles
6. Configuration files and environment management - Config patterns, environment variable usage
7. Dependency management and import patterns - Import ordering, dependency injection

Return ACTUAL code examples with precise file:line references.
Categorize findings by module (architecture, coding-standards, testing, etc.).
```

**Task 2: Invoke codebase-analyst agent**

Use Task tool with `subagent_type="prp-core:codebase-analyst"`:

```
Analyze codebase implementation details for rule documentation generation:

ANALYZE:
1. Error handling patterns - Trace how errors are created, thrown, caught, logged
2. Logging patterns - Logger initialization, usage locations, message formats
3. Data validation patterns - Schema definitions, validation timing, error handling
4. Database access patterns - Repository pattern, query building, transaction management
5. API routing patterns - Route definitions, middleware chains, request/response handling
6. Authentication/authorization patterns - Auth middleware, permission checks, session management
7. State management patterns - State storage, updates, subscriptions (if frontend)
8. Performance optimization patterns - Caching strategies, lazy loading, resource optimization

Trace data flows and provide precise file:line references.
Categorize findings by module (error-handling, api, database, auth, etc.).
```

**If single module update (module specified)**:

Based on module type, invoke the appropriate agent using Task tool:

| Module | Agent | Task Description |
|--------|-------|------------------|
| `architecture` | codebase-explorer | Explore directory structure, module divisions, dependencies, entry points |
| `coding-standards` | codebase-explorer | Explore naming conventions, code style, formatting rules, import patterns |
| `error-handling` | codebase-analyst | Analyze error class definitions, error handling flows, error propagation |
| `testing` | codebase-explorer | Explore test file structure, test patterns, assertion styles, coverage |
| `api` | codebase-analyst | Analyze API route definitions, request handling, response formats, middleware |
| `database` | codebase-analyst | Analyze database schema, query patterns, migration strategies, ORM usage |
| `auth` | codebase-analyst | Analyze auth middleware, permission checks, session management, token handling |
| `state-management` | codebase-analyst | Analyze state management library usage, data flow, state update patterns |
| `performance` | codebase-analyst | Analyze caching strategies, optimization patterns, resource loading |
| `git-workflow` | Read | Read .git/config, .github/workflows, branching strategy docs |
| `deployment` | Read | Read CI/CD configs, Dockerfile, deployment scripts |
| `documentation` | codebase-explorer | Analyze existing documentation structure, style, organization |

**Agent invocation example** (for error-handling module):

```
Use Task tool with subagent_type="prp-core:codebase-analyst"

Analyze error handling patterns for generating error-handling.md rule documentation:

ANALYZE:
1. Error class definitions - Find all custom error classes, extract patterns
2. Error creation - How errors are instantiated and thrown
3. Error catching - try/catch patterns, error boundaries
4. Error propagation - How errors flow between layers
5. Error logging - Error logging patterns
6. Error responses - How errors are converted to user responses

Trace complete error handling flows with file:line references.
```

### 2.2 Wait for Agent Completion and Organize Findings

**Organization format**:

```markdown
## Module: {module-name}

### Key Findings

| Category | Location | Pattern Description |
|----------|----------|---------------------|
| {category} | `{file}:{lines}` | {description} |

### Code Pattern Examples

#### Pattern 1: {pattern-name}
**Location**: `{file}:{lines}`
**Purpose**: {what-it-does}
**Key Points**:
- {key-aspect-1}
- {key-aspect-2}
```

**PHASE_2_CHECKPOINT:**
- [ ] Agent analysis completed
- [ ] Findings organized into tables
- [ ] All patterns have file:line references
- [ ] Code examples sourced from actual codebase

---

## Phase 3: GENERATE - Generate Rule Documentation

### 3.1 Determine Documents to Generate

**If full update**:
- Based on project type and tech stack, determine required modules
- Example: Frontend projects need `state-management.md`, backend projects need `api.md`

**If single module update**:
- Generate only the specified module's documentation

### 3.2 Rule Documentation Template

Each rule document follows this structure:

```markdown
# {Module Name} Rules

> Last updated: {date}
> Auto-generated from codebase analysis

## Overview

{1-2 paragraphs describing this module's purpose and importance}

## Core Principles

1. **Principle 1** - {description}
2. **Principle 2** - {description}
3. **Principle 3** - {description}

## Code Patterns

### Pattern 1: {pattern-name}

**When to use**: {when-to-use}

**Reference implementation**: See `{file}:{lines}`

**Key rules**:
- {rule-1}
- {rule-2}

### Pattern 2: {pattern-name}

**When to use**: {when-to-use}

**Reference implementation**: See `{file}:{lines}`

**Key rules**:
- {rule-1}
- {rule-2}

## Naming Conventions

| Type | Convention | Example | Reference |
|------|------------|---------|-----------|
| {type} | {convention} | {example} | `{file}:{line}` |

## Common Pitfalls

### Pitfall 1: {pitfall-name}

**Problem**: {what-goes-wrong}

**Correct approach**: {correct-approach}

**Reference**: `{file}:{lines}`

## Checklist

When writing {module-type} code, ensure:

- [ ] {checklist-item-1}
- [ ] {checklist-item-2}
- [ ] {checklist-item-3}

## Related Documentation

- See `{related-file-1}` for {what}
- See `{related-file-2}` for {what}
```

### 3.3 Generate Document Content

**For each module**:

1. **Read existing document** (if exists)
   ```bash
   # Check if file exists
   ls -la .claude/rules/{module-name}.md 2>/dev/null
   ```

2. **Determine operation type**:
   - If file doesn't exist: Create new document
   - If file exists: Update document (preserve user customizations, update code references)

3. **Fill template**:
   - Use Phase 2 analysis results
   - Extract actual code patterns
   - Add file:line references
   - Describe rules in natural language

4. **Write file**:
   ```
   Use Write tool to create new document
   or Edit tool to update existing document
   ```

### 3.4 Special Module Handling

**architecture.md**:
```markdown
# Architecture Rules

## Directory Structure

```
{actual-directory-tree}
```

## Module Divisions

| Module | Responsibility | Location |
|--------|----------------|----------|
| {module} | {responsibility} | `{path}` |

## Dependencies

```
{dependency-graph}
```

## Data Flow

```
{data-flow-diagram}
```
```

**coding-standards.md**:
```markdown
# Coding Standards

## Naming Conventions

### File Naming
- Convention: {convention}
- Example: `{example-file}`

### Function Naming
- Convention: {convention}
- Example: See `{file}:{line}`

### Variable Naming
- Convention: {convention}
- Example: See `{file}:{line}`

## Code Style

### Indentation and Formatting
- Use {spaces/tabs}
- Config file: `{.prettierrc/.eslintrc/etc}`

### Import Order
Reference import pattern in `{file}:{lines}`:
1. {import-group-1}
2. {import-group-2}
3. {import-group-3}
```

**error-handling.md**:
```markdown
# Error Handling Rules

## Error Class Definitions

Reference pattern in `{errors-file}:{lines}`:
- Extend base error class
- Include `code` and `statusCode` properties
- Provide clear error messages

## Error Throwing

**When to throw**:
- {scenario-1}
- {scenario-2}

**How to throw**:
See example in `{file}:{lines}`

## Error Catching

**Where to catch**:
- {layer-1}: {what-to-catch}
- {layer-2}: {what-to-catch}

**How to handle**:
See example in `{file}:{lines}`
```

**testing.md**:
```markdown
# Testing Rules

## Test File Organization

```
{test-directory-structure}
```

## Test Patterns

### Unit Tests
Reference `{test-file}:{lines}`:
- Uses {test-framework}
- Follows {pattern} pattern
- Assertion style: {assertion-style}

### Integration Tests
Reference `{test-file}:{lines}`:
- Test scope: {scope}
- Data setup: {setup-pattern}
- Cleanup strategy: {teardown-pattern}

## Test Coverage

- Target: {coverage-target}
- Command: `{test-command}`
```

**PHASE_3_CHECKPOINT:**
- [ ] All required module documents generated
- [ ] Documents follow unified template
- [ ] All code references include file:line
- [ ] Rules described in natural language
- [ ] Existing documents updated (if applicable)

---

## Phase 4: VERIFY - Documentation Quality Validation

### 4.1 Verify Document Completeness

**Check each generated document**:

- [ ] Contains "Overview" section
- [ ] Contains "Core Principles" (at least 3)
- [ ] Contains "Code Patterns" (at least 2)
- [ ] All code references have file:line
- [ ] No fabricated code examples
- [ ] Rules described in natural language

### 4.2 Verify Reference Validity

**Randomly sample 5 file:line references**:

```bash
# Extract and validate all file:line references
grep -oP '`[^`]+:\d+(-\d+)?`' .claude/rules/*.md | \
  sed 's/`//g' | \
  shuf | head -5 | \
  while IFS=: read -r file line_range; do
    # Extract starting line number
    line=$(echo "$line_range" | cut -d- -f1)

    if [ -f "$file" ]; then
      total_lines=$(wc -l < "$file" 2>/dev/null || echo 0)
      if [ "$line" -le "$total_lines" ] && [ "$line" -gt 0 ]; then
        echo "✅ $file:$line - Valid"
      else
        echo "❌ $file:$line - Line $line exceeds file length (total: $total_lines)"
      fi
    else
      echo "❌ $file:$line - File not found"
    fi
  done
```

**VALIDATION_GATE**: If any reference is invalid, STOP and fix before proceeding.

### 4.3 Generate Validation Report

```markdown
## Documentation Validation Report

### Generated Documents

| Document | Status | Pattern Count | Reference Count |
|----------|--------|---------------|-----------------|
| `architecture.md` | ✅ Created | 5 | 12 |
| `coding-standards.md` | ✅ Created | 8 | 20 |
| `error-handling.md` | 🔄 Updated | 4 | 8 |
| `testing.md` | ✅ Created | 6 | 15 |

### Reference Validation

Sampled references:
- ✅ `src/features/auth/service.ts:45` - Valid
- ✅ `src/core/errors/base.ts:10` - Valid
- ✅ `src/features/projects/tests/service.test.ts:25` - Valid

### Quality Scores

- Completeness: {score}/10
- Accuracy: {score}/10
- Usability: {score}/10
```

**PHASE_4_CHECKPOINT:**
- [ ] All documents pass completeness check
- [ ] Reference validity verification passed
- [ ] Validation report generated

---

## Phase 5: UPDATE_INDEX - Update CLAUDE.md Index

### 5.1 Check CLAUDE.md Existence

```bash
# Check for CLAUDE.md in project root
ls -la CLAUDE.md 2>/dev/null || ls -la PRPs/CLAUDE.md 2>/dev/null
```

**If doesn't exist**: Skip this phase, remind user in Phase 6 output to create manually.

### 5.2 Read Existing CLAUDE.md

Use Read tool to read CLAUDE.md content, check if "Rule Documentation Index" section already exists.

### 5.3 Generate Rule Index Content

**Index format**:

```markdown
## Rule Documentation Index

This project uses modular rule documentation to guide development. Reference the appropriate rule documents when working on different types of tasks.

### Core Rules

| Rule Module | When to Use | Document Path |
|-------------|-------------|---------------|
| Architecture | Designing new features, refactoring system structure | @.claude/rules/architecture.md |
| Coding Standards | Writing any code | @.claude/rules/coding-standards.md |
| Error Handling | Implementing error handling logic | @.claude/rules/error-handling.md |
| Testing | Writing test code | @.claude/rules/testing.md |

### Technical Rules

| Rule Module | When to Use | Document Path |
|-------------|-------------|---------------|
| API Design | Designing or implementing API endpoints | @.claude/rules/api.md |
| Database | Designing schemas, writing queries | @.claude/rules/database.md |
| Authentication | Implementing auth, permission checks | @.claude/rules/auth.md |
| State Management | Managing frontend state | @.claude/rules/state-management.md |

### Process Rules

| Rule Module | When to Use | Document Path |
|-------------|-------------|---------------|
| Performance | Optimizing performance, implementing caching | @.claude/rules/performance.md |
| Git Workflow | Creating branches, committing code | @.claude/rules/git-workflow.md |
| Deployment | Configuring CI/CD, deploying | @.claude/rules/deployment.md |
| Documentation | Writing project documentation | @.claude/rules/documentation.md |

### Usage

Reference rule documents in commands or conversations:
- Use `@.claude/rules/{module}.md` to reference specific rules
- Claude Code will automatically load relevant rules as context
- Rule documents guide code generation and decision-making
```

### 5.4 Update or Add Index

**If CLAUDE.md already has "Rule Documentation Index" section**:
- Use Edit tool to update that section
- Only update actually generated modules
- Preserve other content unchanged

**If CLAUDE.md doesn't have "Rule Documentation Index" section**:
- Use Edit tool to append index section at end of file
- Add blank line before appending for separation

**Index content customization**:
- Only include modules generated/updated this time
- Adjust categorization based on project type (frontend projects don't show database, backend projects don't show state-management)
- Use actual file paths

### 5.5 Generate Module Usage Guide

**Add brief usage instructions for each generated module**:

| Module | When to Use |
|--------|-------------|
| architecture | Designing new features, refactoring system structure, understanding project organization |
| coding-standards | Writing any code, naming variables/functions/classes, organizing imports |
| error-handling | Implementing error handling logic, defining error classes, catching exceptions |
| testing | Writing test code, designing test cases, improving coverage |
| api | Designing or implementing API endpoints, defining routes, handling requests |
| database | Designing schemas, writing queries, optimizing database access |
| auth | Implementing authentication, permission checks, session management |
| state-management | Managing frontend state, designing data flow, implementing state updates |
| performance | Optimizing performance, implementing caching, reducing resource consumption |
| git-workflow | Creating branches, committing code, merging PRs |
| deployment | Configuring CI/CD, writing deployment scripts, releasing versions |
| documentation | Writing project docs, API docs, usage guides |

**PHASE_5_CHECKPOINT:**
- [ ] CLAUDE.md checked
- [ ] Rule index generated
- [ ] Index content updated in CLAUDE.md
- [ ] Only includes actually generated modules
- [ ] Usage guide clear and explicit

---

## Phase 6: OUTPUT - Output Results

### 6.1 List Generated Documents

```bash
ls -lh .claude/rules/
```

### 6.2 Report to User

```markdown
## Rule Documentation Update Complete

**Update scope**: {All modules / Specified module: {module-name}}

**Project type**: {project-type}
**Tech stack**: {tech-stack}

### Generated Documents

| Document | Operation | Size | Pattern Count |
|----------|-----------|------|---------------|
| `.claude/rules/architecture.md` | Created | {size} | {count} |
| `.claude/rules/coding-standards.md` | Created | {size} | {count} |
| `.claude/rules/error-handling.md` | Updated | {size} | {count} |
| `.claude/rules/testing.md` | Created | {size} | {count} |

### CLAUDE.md Index Update

**Status**: {Updated / Added / Skipped (file doesn't exist)}

**Update content**:
- Added index for {N} rule modules
- Includes usage guide and document paths
- Uses `@.claude/rules/{module}.md` reference format

**If CLAUDE.md doesn't exist**:
⚠️ CLAUDE.md file not found. Recommend creating this file and adding the following content:

```markdown
## Rule Documentation Index

This project uses modular rule documentation to guide development. Reference the appropriate rule documents when working on different types of tasks.

### Core Rules

| Rule Module | When to Use | Document Path |
|-------------|-------------|---------------|
{generated core rules list}

### Usage

Reference rule documents in commands or conversations:
- Use `@.claude/rules/{module}.md` to reference specific rules
- Claude Code will automatically load relevant rules as context
```

### Key Findings

**Architecture patterns**:
- {key-pattern-1}
- {key-pattern-2}

**Coding conventions**:
- {key-convention-1}
- {key-convention-2}

**Testing strategies**:
- {key-strategy-1}
- {key-strategy-2}

### Usage

**Reference rules during development**:

1. **Automatic loading**: Claude Code will automatically reference these rules for relevant tasks
2. **Manual reference**: Use `@.claude/rules/{module}.md` in conversations to reference specific rules
3. **Use in commands**: Reference rule documents in command `<context>` sections

**Example**:
```markdown
<context>
Project rules: @CLAUDE.md
Architecture rules: @.claude/rules/architecture.md
Coding standards: @.claude/rules/coding-standards.md
</context>
```

**View rules**:
```bash
# View specific rule
cat .claude/rules/architecture.md

# View all rules
ls .claude/rules/
```

**Edit rules**:
- Manually edit documents to add project-specific rules
- Re-run `/rule-update` or `/rule-update {module}` to update

### Next Steps

1. ✅ Review generated rule documents
2. ✅ Verify rule index in CLAUDE.md
3. 📝 Add project-specific rules and conventions
4. 🚀 Reference these rules when developing new features
5. 🔄 Periodically run `/rule-update` to keep rule documents current
```

---

## Error Handling

### Unable to Identify Project Type

**Symptoms**: No package.json, pyproject.toml, Cargo.toml, go.mod, or other config files found

**Recovery steps**:
1. Verify current directory: `pwd`
2. List files to confirm: `ls -la`
3. If in wrong directory: `cd` to project root and retry
4. If truly no config file: Create minimal config for your language
5. Retry command after config exists

**Prevention**: Always run from project root directory

### Agent Analysis Failed

**Symptoms**: Error occurred during agent analysis process

**Recovery steps**:
1. Check error message: `{error-message}`
2. Verify codebase accessible: `ls -R | wc -l` to confirm sufficient files
3. Check for permission issues: `ls -la`
4. Try single module update: `/rule-update {specific-module}`
5. If failure persists: Check agent logs for detailed information

**Prevention**: Ensure codebase structure is complete and readable

### File Write Failed

**Symptoms**: Unable to write `.claude/rules/{module}.md`

**Recovery steps**:
1. Check directory permissions: `ls -la .claude/rules/`
2. If directory doesn't exist: `mkdir -p .claude/rules`
3. Check disk space: `df -h .`
4. Check if file is in use: `lsof .claude/rules/{module}.md`
5. Fix permissions: `chmod 755 .claude/rules`
6. Retry command

**Prevention**: Ensure `.claude/rules/` directory exists and is writable

---

## Success Criteria

- [ ] All specified module rule documents generated or updated
- [ ] All code references valid (file:line accessible)
- [ ] Documents use natural language to describe rules
- [ ] Documents reference actual code, no fabricated examples
- [ ] Document structure clear and readable
- [ ] User receives complete update report
