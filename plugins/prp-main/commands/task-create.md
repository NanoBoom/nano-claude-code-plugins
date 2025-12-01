# Create TASK PRP (Advanced)

Generate a comprehensive task list for focused changes with validation.

## Task: $ARGUMENTS

## Core Task Decomposition Philosophy

**These principles guide task breakdown and planning. Clarity enables execution.**

### 1. Atomic Tasks

Each task does exactly ONE thing.

- A task should be completable in a single focused session
- If a task has multiple concerns, split it
- Each task can be validated independently
- Clearly separate setup, execution, and validation steps
- Each task should be explainable in one sentence

### 2. Context Sufficiency

Tasks contain everything needed for execution.

- Include specific file paths and patterns to follow
- Reference existing code examples from codebase
- Document gotchas and edge cases discovered in analysis
- The executor should not need to search for missing information

### 3. Pattern Reuse

Leverage existing codebase patterns.

- Search for similar changes in history before defining tasks
- Use existing helper functions rather than creating new ones
- Reference existing patterns rather than inventing new ones
- Reference specific files as implementation examples

### 4. Task Alignment

Every task directly serves the stated change goal.

- Don't add tasks unless they solve a specific problem
- No tasks for hypothetical future needs
- No "while we're here" improvements
- Each task must justify its existence in the workflow

### 5. Validation Completeness

Every task has executable success criteria.

- Include specific validation commands that can run immediately
- Define expected output or behavior
- Tasks without validation are incomplete
- Use project-specific test commands discovered in analysis

**Applied to Task Planning:**

- Task Definition: Each task does exactly one thing (Atomic Tasks)
- Task Content: All context included, nothing guessed (Context Sufficiency)
- Implementation: Use existing patterns and helpers (Pattern Reuse)
- Scope: Only tasks required by change goal (Task Alignment)
- Verification: Every task has runnable validation (Validation Completeness)

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
Using PRPs/templates/prp_task.md format:

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

Save as: `PRPs/task/{task-name}.md`

## Quality Checklist

### Task Decomposition Compliance (Must Pass First)

- [ ] Atomic Tasks: Each task does exactly one thing, independently validatable
- [ ] Context Sufficiency: Tasks include all needed file paths, patterns, examples
- [ ] Pattern Reuse: Existing patterns and helpers leveraged
- [ ] Task Alignment: Every task maps to change goal, nothing extra
- [ ] Validation Completeness: Every task has executable validation command

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

- [ ] Tasks bundling multiple unrelated changes
- [ ] "Preparatory" tasks for hypothetical needs
- [ ] Complex tasks requiring extensive explanation
- [ ] Scope creep beyond stated change

Remember: Small, focused changes with immediate validation. **Each task should do ONE thing well.**
