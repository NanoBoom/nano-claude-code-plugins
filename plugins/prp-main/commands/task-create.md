# Create TASK PRP (Advanced)

Generate a comprehensive task list for focused changes with validation.

## Task: $ARGUMENTS

## Core Design Philosophy

**SOLID Principles - These principles guide task breakdown and planning.**

### 1. Single Responsibility Principle (SRP)

A class should have only one reason to change.

- Each task changes ONE thing
- Don't bundle unrelated changes in the same task
- Clearly separate setup, execution, and validation
- Break complex tasks into simple, atomic steps
- Each task should be explainable in one sentence

### 2. Open/Closed Principle (OCP)

Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.

- Complete tasks by extending existing functionality rather than modifying
- Use existing helper functions rather than rewriting
- Reference existing patterns rather than creating new ones
- Prefer composition and extension strategies

### 3. Liskov Substitution Principle (LSP)

Subtypes must be substitutable for their base types without affecting program correctness.

- Task execution should maintain system behavioral consistency
- New tasks should not break existing workflows
- Follow established task execution patterns
- Ensure task outputs meet expected contracts

### 4. Interface Segregation Principle (ISP)

Clients should not be forced to depend on methods they do not use.

- Don't add tasks unless they solve a specific problem
- Don't create unnecessary intermediate steps
- Each task must justify its existence in the workflow
- Prefer multiple simple tasks over one complex task

### 5. Dependency Inversion Principle (DIP)

High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.

- Tasks should depend on abstract workflow definitions
- Consolidate similar tasks into one where appropriate
- High-level task planning should not depend on specific implementation details
- Use abstract validation criteria rather than specific implementation checks

**Applied to Task Planning:**

- Task Definition: Each task focuses on a single change (SRP)
- Execution Strategy: Extend existing patterns rather than modifying (OCP)
- Workflow Integration: Maintain consistency in task execution (LSP)
- Task Scope: Only include tasks that solve the current problem (ISP)
- Planning Approach: Depend on abstract task definitions (DIP)

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

Save as: `PRPs/{task-name}-task.md`

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
