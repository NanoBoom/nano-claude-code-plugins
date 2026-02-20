---
description: Analyze codebase and create/update rule documentation in .claude/rules directory
argument-hint: <module-name | update description>
---

# Rule Documentation Update

**Module**: $ARGUMENTS

---

## Command Objective

Analyze the project codebase, extract key architecture patterns, design conventions, and implementation details to generate or update rule documentation in `.claude/rules/`. These documents guide Claude Code during development to ensure new code adheres to project standards.

**🎯 CRITICAL: Keep documents MINIMAL and FOCUSED**

Rule documents should be **≤ 200 lines** and contain **only project-specific patterns** that appear multiple times in the codebase. Remove all generic advice, obvious conventions, and verbose explanations.

**Core Principles**:

- **Codebase is Source of Truth** - Reference actual code, never fabricate examples
- **Natural Language Description** - Describe patterns with rules, don't copy code
- **Precise References** - All patterns include file:line references
- **Incremental Updates** - Modify existing documents, don't overwrite
- **Radical Simplicity** - Keep documents minimal, only core patterns that matter
  - Remove redundant sections, verbose explanations, and obvious advice
  - Focus on project-specific patterns, not generic best practices
  - If a pattern appears only once, it's not a pattern - don't document it
  - Prefer concise over verbose, prefer 5 bullet points over 20

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

**Task 1: Invoke prp-core:codebase-explorer agent**

Use Task tool with `subagent_type="prp-core:codebase-explorer"`:

```
Explore the entire codebase structure and patterns for rule documentation generation:

CRITICAL: Focus on REPEATED patterns only. Ignore one-off code.

DISCOVER:
1. Directory structure and file organization - Map the project's physical layout
2. Naming conventions - Extract actual naming patterns (must appear 3+ times)
3. Code organization patterns - Identify modularity, layering, separation of concerns
4. Common code patterns and abstractions - Find repeatedly used design patterns (2+ occurrences)
5. Test file organization and patterns - Test structure, naming, assertion styles
6. Configuration files and environment management - Config patterns, environment variable usage
7. Dependency management and import patterns - Import ordering, dependency injection

FILTERING RULES:
- Only report patterns that appear 2+ times in the codebase
- Skip standard conventions (e.g., camelCase in JS, snake_case in Python)
- Skip obvious patterns that apply to any project
- Prioritize project-specific, non-obvious patterns

Return ACTUAL code examples with precise file:line references.
Categorize findings by module (architecture, coding-standards, testing, etc.).
```

**Task 2: Invoke prp-core:codebase-analyst agent**

Use Task tool with `subagent_type="prp-core:codebase-analyst"`:

```
Analyze codebase implementation details for rule documentation generation:

CRITICAL: Focus on REPEATED patterns only. Ignore one-off implementations.

ANALYZE:
1. Error handling patterns - Trace how errors are created, thrown, caught, logged (2+ examples)
2. Logging patterns - Logger initialization, usage locations, message formats (2+ examples)
3. Data validation patterns - Schema definitions, validation timing, error handling (2+ examples)
4. Database access patterns - Repository pattern, query building, transaction management (2+ examples)
5. API routing patterns - Route definitions, middleware chains, request/response handling (2+ examples)
6. Authentication/authorization patterns - Auth middleware, permission checks, session management (2+ examples)
7. State management patterns - State storage, updates, subscriptions (if frontend) (2+ examples)
8. Performance optimization patterns - Caching strategies, lazy loading, resource optimization (2+ examples)

FILTERING RULES:
- Only report patterns with 2+ concrete examples
- Skip generic implementations that match framework defaults
- Skip obvious patterns that apply to any project
- Prioritize project-specific, non-obvious patterns

Trace data flows and provide precise file:line references.
Categorize findings by module (error-handling, api, database, auth, etc.).
```

**If single module update (module specified)**:

Based on module type, invoke the appropriate agent using Task tool:

| Module | Agent | Task Description |
|--------|-------|------------------|
| `architecture` | prp-core:codebase-explorer | Explore directory structure, module divisions, dependencies, entry points |
| `coding-standards` | prp-core:codebase-explorer | Explore naming conventions, code style, formatting rules, import patterns |
| `error-handling` | prp-core:codebase-analyst | Analyze error class definitions, error handling flows, error propagation |
| `testing` | prp-core:codebase-explorer | Explore test file structure, test patterns, assertion styles, coverage |
| `api` | prp-core:codebase-analyst | Analyze API route definitions, request handling, response formats, middleware |
| `database` | prp-core:codebase-analyst | Analyze database schema, query patterns, migration strategies, ORM usage |
| `auth` | prp-core:codebase-analyst | Analyze auth middleware, permission checks, session management, token handling |
| `state-management` | prp-core:codebase-analyst | Analyze state management library usage, data flow, state update patterns |
| `performance` | prp-core:codebase-analyst | Analyze caching strategies, optimization patterns, resource loading |
| `git-workflow` | Read | Read .git/config, .github/workflows, branching strategy docs |
| `deployment` | Read | Read CI/CD configs, Dockerfile, deployment scripts |
| `documentation` | prp-core:codebase-explorer | Analyze existing documentation structure, style, organization |

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

### 3.2 Rule Documentation Template (Minimal)

**CRITICAL**: Keep documents SHORT and FOCUSED. Remove any section that doesn't add unique value.

Each rule document follows this **minimal** structure:

```markdown
# {Module Name} Rules

> Auto-generated from codebase analysis

## Core Patterns

### {pattern-name}

**Reference**: `{file}:{lines}`

**Rules**:
- {rule-1}
- {rule-2}

### {pattern-name}

**Reference**: `{file}:{lines}`

**Rules**:
- {rule-1}
- {rule-2}

## Naming Conventions

| Type | Convention | Reference |
|------|------------|-----------|
| {type} | {convention} | `{file}:{line}` |
```

**What to EXCLUDE** (unless truly unique to this project):
- ❌ Generic "Overview" paragraphs that state the obvious
- ❌ "Core Principles" that are just common sense
- ❌ "Common Pitfalls" section (merge into pattern rules if critical)
- ❌ Generic checklists that apply to any project
- ❌ "Related Documentation" links (use references inline instead)
- ❌ Verbose "When to use" explanations (pattern name should be self-evident)

**What to INCLUDE** (only if project-specific):
- ✅ Actual code patterns found in THIS codebase (with file:line)
- ✅ Project-specific naming conventions (not generic camelCase advice)
- ✅ Non-obvious rules that differ from standard practices
- ✅ Critical constraints or requirements unique to this project

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

3. **Fill template with MINIMAL content**:
   - Use Phase 2 analysis results
   - **Filter patterns**: Only include patterns that appear 2+ times in codebase
   - **Prioritize**: Select 2-4 most important patterns (not all patterns found)
   - Add file:line references
   - Describe rules in natural language
   - **Remove**: Generic advice, obvious conventions, one-off code
   - **Target**: 100-200 lines total per document

4. **Write file**:

   ```
   Use Write tool to create new document
   or Edit tool to update existing document
   ```

**Content filtering rules**:
- If a naming convention is standard (e.g., camelCase for JS), don't document it
- If a pattern appears only once, it's not a pattern - skip it
- If advice applies to any project (e.g., "write tests"), remove it
- If you can't find 2+ real examples with file:line, don't include the pattern

### 3.4 Special Module Handling (Minimal Templates)

**architecture.md** (focus on structure, not philosophy):

```markdown
# Architecture Rules

## Directory Structure

```
{actual-directory-tree - only 2-3 levels deep}
```

## Module Responsibilities

| Module | Responsibility | Location |
|--------|----------------|----------|
| {module} | {one-line description} | `{path}` |

## Key Dependencies

{Only non-obvious dependencies, e.g., "auth depends on database session store"}
```

**coding-standards.md** (only project-specific conventions):

```markdown
# Coding Standards

## File Naming

{convention} - See `{file}:{line}`

## Function Naming

{convention} - See `{file}:{line}`

## Import Order

Reference `{file}:{lines}`:
1. {import-group-1}
2. {import-group-2}
```

**error-handling.md** (focus on actual patterns):

```markdown
# Error Handling Rules

## Error Classes

Reference `{errors-file}:{lines}`:
- {pattern-description}

## Error Flow

**Throw at**: {layer} - See `{file}:{lines}`
**Catch at**: {layer} - See `{file}:{lines}`
**Log at**: {layer} - See `{file}:{lines}`
```

**testing.md** (only test organization and patterns):

```markdown
# Testing Rules

## Test Structure

```
{test-directory-structure - only relevant paths}
```

## Test Patterns

**Unit tests**: See `{test-file}:{lines}`
- {key-pattern-1}
- {key-pattern-2}

**Integration tests**: See `{test-file}:{lines}`
- {key-pattern-1}
- {key-pattern-2}
```

**General principle for all modules**:
- Maximum 200 lines per document
- 2-4 patterns maximum
- No generic advice that applies to any project
- Every statement must reference actual code

**PHASE_3_CHECKPOINT:**

- [ ] All required module documents generated
- [ ] Documents follow minimal template (≤ 200 lines each)
- [ ] All code references include file:line
- [ ] Rules described in natural language
- [ ] Only repeated patterns included (2+ occurrences)
- [ ] No generic advice or obvious conventions
- [ ] 2-4 patterns per document (not exhaustive)
- [ ] Existing documents updated (if applicable)

---

## Phase 4: VERIFY - Documentation Quality Validation

### 4.1 Verify Document Completeness

**Check each generated document**:

- [ ] Contains "Core Patterns" section with 2-4 patterns
- [ ] All code references have file:line
- [ ] No fabricated code examples
- [ ] Rules described in natural language
- [ ] Document is ≤ 200 lines
- [ ] No generic advice (e.g., "use meaningful names", "write tests")
- [ ] Every pattern appears multiple times in codebase (not one-off code)

**Red flags** (if found, simplify the document):
- ❌ Document exceeds 200 lines
- ❌ Contains "Overview" or "Core Principles" sections with generic content
- ❌ Has "Common Pitfalls" or "Checklist" sections
- ❌ Includes obvious advice that applies to any project
- ❌ Pattern appears only once in codebase

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

| Document | Status | Lines | Pattern Count | Reference Count |
|----------|--------|-------|---------------|-----------------|
| `architecture.md` | ✅ Created | 35 | 3 | 8 |
| `coding-standards.md` | ✅ Created | 28 | 4 | 12 |
| `error-handling.md` | 🔄 Updated | 42 | 3 | 6 |
| `testing.md` | ✅ Created | 38 | 4 | 10 |

### Reference Validation

Sampled references:
- ✅ `src/features/auth/service.ts:45` - Valid
- ✅ `src/core/errors/base.ts:10` - Valid
- ✅ `src/features/projects/tests/service.test.ts:25` - Valid

### Simplicity Check

- ✅ All documents ≤ 200 lines
- ✅ No generic "Overview" or "Principles" sections
- ✅ All patterns have 2+ examples
- ✅ No obvious advice included

### Quality Scores

- Completeness: {score}/10
- Accuracy: {score}/10
- Simplicity: {score}/10 (10 = minimal, focused; 1 = verbose, generic)
```

**PHASE_4_CHECKPOINT:**

- [ ] All documents pass completeness check
- [ ] Reference validity verification passed
- [ ] Validation report generated

---

## Phase 5: UPDATE_INDEX - Update CLAUDE.md Index

### 5.1 Check CLAUDE.md Existence

```bash
# Check for CLAUDE.md in multiple locations
if [ -f "CLAUDE.md" ]; then
  CLAUDE_PATH="CLAUDE.md"
elif [ -f "PRPs/CLAUDE.md" ]; then
  CLAUDE_PATH="PRPs/CLAUDE.md"
else
  CLAUDE_PATH=""
fi
```

**Priority order**:
1. Project root: `CLAUDE.md`
2. PRPs directory: `PRPs/CLAUDE.md`

**If doesn't exist**: Skip Phase 5.2-5.5, note in Phase 6 output that user should create CLAUDE.md manually.

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
| Architecture | Designing new features, refactoring system structure | .claude/rules/architecture.md |
| Coding Standards | Writing any code | .claude/rules/coding-standards.md |
| Error Handling | Implementing error handling logic | .claude/rules/error-handling.md |
| Testing | Writing test code | .claude/rules/testing.md |

### Technical Rules

| Rule Module | When to Use | Document Path |
|-------------|-------------|---------------|
| API Design | Designing or implementing API endpoints | .claude/rules/api.md |
| Database | Designing schemas, writing queries | .claude/rules/database.md |
| Authentication | Implementing auth, permission checks | .claude/rules/auth.md |
| State Management | Managing frontend state | .claude/rules/state-management.md |

### Process Rules

| Rule Module | When to Use | Document Path |
|-------------|-------------|---------------|
| Performance | Optimizing performance, implementing caching | .claude/rules/performance.md |
| Git Workflow | Creating branches, committing code | .claude/rules/git-workflow.md |
| Deployment | Configuring CI/CD, deploying | .claude/rules/deployment.md |
| Documentation | Writing project documentation | .claude/rules/documentation.md |

### Usage

Reference rule documents in commands or conversations:
- Use `.claude/rules/{module}.md` to reference specific rules
- Claude Code will automatically load relevant rules as context
- Rule documents guide code generation and decision-making
```

### 5.4 Update or Add Index

**If CLAUDE.md already has "Rule Documentation Index" section**:

- Use Edit tool to replace the entire "Rule Documentation Index" section
- Include ALL existing rule modules (not just newly generated ones)
- Strategy:
  1. List all existing `.claude/rules/*.md` files
  2. Merge with newly generated modules
  3. Generate complete index covering all modules
  4. Replace old index section with new complete index
- Preserve all other content in CLAUDE.md unchanged

**If CLAUDE.md doesn't have "Rule Documentation Index" section**:

- Use Edit tool to append index section at end of file
- Add two blank lines before appending for clear separation
- Include all generated modules in this update

**Index content customization**:

- Include ALL rule modules that exist in `.claude/rules/` directory
- Adjust categorization based on project type:
  - Frontend projects: exclude database, include state-management
  - Backend projects: exclude state-management, include database, api
  - Fullstack projects: include all applicable modules
- Use actual file paths relative to project root
- Sort modules by category (Core → Technical → Process)

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

### 5.6 Verify CLAUDE.md Update

**After updating CLAUDE.md, verify the changes**:

```bash
# Read the updated section to confirm
grep -A 20 "## Rule Documentation Index" $CLAUDE_PATH
```

**Verification checklist**:
- [ ] "Rule Documentation Index" section exists
- [ ] All modules in `.claude/rules/` are listed
- [ ] Table format is correct (no broken markdown)
- [ ] File paths are accurate
- [ ] "When to Use" descriptions are present
- [ ] Usage instructions are included

**If verification fails**: Re-run Phase 5.4 with corrected content.

**PHASE_5_CHECKPOINT:**

- [ ] CLAUDE.md location identified (root or PRPs/ directory)
- [ ] Existing CLAUDE.md content read and analyzed
- [ ] Complete rule index generated (includes ALL existing + new modules)
- [ ] Index section updated/added in CLAUDE.md using Edit tool
- [ ] All rule modules in `.claude/rules/` are included in index
- [ ] Module categorization matches project type
- [ ] Usage guide clear and explicit
- [ ] CLAUDE.md file verified after update
- [ ] Verification confirms index is complete and correct

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

### ✅ CLAUDE.md Index Update

**Location**: `{CLAUDE.md path}`
**Status**: {✅ Updated / ✅ Added / ⚠️ Skipped (file doesn't exist)}

**Update details**:
- {Updated existing / Added new} "Rule Documentation Index" section
- Indexed {N} rule modules (includes all existing + newly generated)
- Categorized as: {Core Rules: X, Technical Rules: Y, Process Rules: Z}
- Added usage guide with "When to Use" descriptions
- All rule document paths use `.claude/rules/{module}.md` format

**Index location in CLAUDE.md**: Line {start-line} to {end-line}

**If CLAUDE.md was updated**:
✅ CLAUDE.md has been synchronized with the latest rule documentation.
You can now reference these rules in your development workflow.

**If CLAUDE.md doesn't exist**:
⚠️ CLAUDE.md file not found in project root or PRPs/ directory.

**Recommended action**: Create CLAUDE.md and add the following content:

```markdown
## Rule Documentation Index

This project uses modular rule documentation to guide development. Reference the appropriate rule documents when working on different types of tasks.

### Core Rules

| Rule Module | When to Use | Document Path |
|-------------|-------------|---------------|
{generated core rules list}

### Technical Rules

| Rule Module | When to Use | Document Path |
|-------------|-------------|---------------|
{generated technical rules list}

### Usage

Reference rule documents in commands or conversations:
- Use `.claude/rules/{module}.md` to reference specific rules
- Claude Code will automatically load relevant rules as context
- Rule documents guide code generation and decision-making
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
2. **Manual reference**: Use `.claude/rules/{module}.md` in conversations to reference specific rules
3. **Use in commands**: Reference rule documents in command `<context>` sections

**Example**:

```markdown
<context>
Project rules: CLAUDE.md
Architecture rules: .claude/rules/architecture.md
Coding standards: .claude/rules/coding-standards.md
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
