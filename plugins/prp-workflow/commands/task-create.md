# Create TASK PRP (Advanced)

Generate a comprehensive task list for focused changes with validation.

## Task: $ARGUMENTS

## Core Design Philosophy

**These principles guide task breakdown and planning. When in doubt, do less.**

### 1. KISS - Keep It Simple, Stupid

- Break complex tasks into simple, atomic steps
- Each task should be explainable in one sentence
- Prefer multiple simple tasks over one complex task

### 2. Ockham's Razor - Entities should not be multiplied without necessity

- Don't add tasks unless they solve a specific problem
- Don't create unnecessary intermediate steps
- Each task must justify its existence in the workflow

### 3. YAGNI - You Aren't Gonna Need It

- **Only include tasks required to complete current change**
- Skip "preparatory" tasks for hypothetical future work
- No tasks for "nice to have" improvements

### 4. DRY - Don't Repeat Yourself

- Consolidate similar tasks into one where appropriate
- Use existing helper functions rather than rewriting
- Reference existing patterns rather than creating new ones

### 5. Single Responsibility Principle

- Each task changes ONE thing
- Don't bundle unrelated changes in same task
- Separate setup, execution, and validation clearly

**Task Planning Reality Checks:**

```
❌ "Add this task in case we need it later" → Only current requirements
❌ "Bundle these changes for efficiency" → Keep tasks atomic and focused
❌ "Create new pattern while fixing bug" → One concern per task
✅ "Is this task essential for current change?" → This is the filter
```

**Task PRP Red Flags (Remove if found):**
- 🚫 Tasks for features not in current scope
- 🚫 "Preparatory" tasks for future work
- 🚫 Tasks that mix unrelated changes
- 🚫 Overly complex tasks needing >3 validation steps

## Analysis Process

1. **Scope Definition**
   - Identify all affected files
   - Map dependencies
   - Check for side effects
   - Note test coverage

2. **Pattern Research**
   - Find similar changes in history
   - Identify conventions to follow
   - Check for helper functions
   - Review test patterns

3. **User Clarification**
   - Confirm change scope
   - Verify acceptance criteria
   - Check deployment considerations
   - Identify blockers

## PRP Generation

**READ**
Using TASK_PRP/PRPs/prp_task.md format:

### Context Section

```yaml
context:
  docs:
    - url: [API documentation]
      focus: [specific methods]

  patterns:
    - file: existing/example.py
      copy: [pattern to follow]

  gotchas:
    - issue: "Library requires X"
      fix: "Always do Y first"
```

### Task Structure

```
ACTION path/to/file:
  - OPERATION: [specific change]
  - VALIDATE: [test command]
  - IF_FAIL: [debug strategy]
  - ROLLBACK: [undo approach]
```

### Task Sequencing

1. **Setup Tasks**: Prerequisites
2. **Core Changes**: Main modifications
3. **Integration**: Connect components
4. **Validation**: Comprehensive tests
5. **Cleanup**: Remove temp code

### Validation Strategy

- Unit test after each change
- Integration test after groups
- Performance check if relevant
- Security scan for sensitive areas

## User Interaction Points

1. **Task Review**
   - Confirm task breakdown
   - Validate sequencing
   - Check completeness

2. **Risk Assessment**
   - Review potential impacts
   - Confirm rollback approach
   - Set success criteria

## Critical Elements

- Include debug patterns
- Add performance checks
- Note security concerns
- Document assumptions

## Output

Save as: `TASK_PRP/PRPs/{task-name}.md`

## Quality Checklist

### Design Principle Compliance (Must Pass First)

- [ ] ✅ KISS: Each task is simple and atomic
- [ ] ✅ Ockham's Razor: Every task justified, no unnecessary steps
- [ ] ✅ YAGNI: Only tasks for current change, no future prep
- [ ] ✅ DRY: Similar tasks consolidated, existing patterns reused
- [ ] ✅ SRP: Each task changes ONE thing only

### Task Completeness

- [ ] All changes identified and scoped
- [ ] Dependencies mapped correctly
- [ ] Each task has specific validation
- [ ] Rollback steps included for each task
- [ ] Debug strategies provided
- [ ] Performance impact noted
- [ ] Security implications checked
- [ ] No missing edge cases

### Red Flags (Reject Task PRP if found)

- [ ] 🚫 Tasks bundling multiple unrelated changes
- [ ] 🚫 "Preparatory" tasks for hypothetical needs
- [ ] 🚫 Complex tasks requiring extensive explanation
- [ ] 🚫 Scope creep beyond stated change

Remember: Small, focused changes with immediate validation. **Each task should do ONE thing well.**
