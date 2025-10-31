---
description: "Execute a Story PRP with focused task implementation"
---

# Execute Story PRP

## PRP File: $ARGUMENTS

## Mission

Execute a story/task PRP through **sequential task completion** with immediate validation.

**Execution Philosophy**: Complete one task, validate it, then move to the next. No task left behind.

## Core Implementation Principles

**These principles guide every implementation decision. When in doubt, choose simpler.**

### 1. KISS - Keep It Simple, Stupid

- Implement tasks exactly as specified, no clever variations
- Choose straightforward solutions over elegant complexity
- If implementation feels complex, question the approach

### 2. Ockham's Razor - Entities should not be multiplied without necessity

- Don't add code beyond what task requires
- Reuse existing patterns and utilities from codebase
- Every line of code must be in the task specification

### 3. YAGNI - You Aren't Gonna Need It

- **Only implement what the task explicitly requires**
- No "improvements" or "enhancements" while coding
- Resist adding features not in story acceptance criteria

### 4. DRY - Don't Repeat Yourself

- Use existing utilities and patterns (especially MIRROR tasks)
- But: don't refactor code outside task scope
- Follow DRY only where task specifies

### 5. Single Responsibility Principle

- Each task implementation changes ONE thing
- Don't bundle multiple tasks in one commit
- Keep modifications focused and isolated

**Implementation Reality Checks:**

```
❌ "While implementing this, I'll also improve..." → Execute only the task
❌ "This could be more elegant if I..." → Follow task specification
❌ "Let me refactor this nearby code" → Only touch task scope
✅ "Does this task explicitly require this code?" → This is the filter
```

## Execution Process

### 1. Load Story PRP

- Read the specified story PRP file
- Understand the original story intent
- Review all context references
- Note validation commands for each task

### 2. Pre-Implementation Check

- Ultrathink about the story intent and task requirements
- Verify all referenced files exist
- Check that patterns mentioned are accessible
- Ensure development environment is ready
- Run any pre-requisite setup commands

### 3. Task-by-Task Implementation

For each task in the PRP:

**a) Understand Task**

- Read task requirements completely
- Review referenced patterns
- Check gotchas and constraints

**b) Implement Task**

- Follow the specified pattern
- Use the indicated naming conventions
- Apply the documented approach
- Handle edge cases mentioned

**c) Validate Immediately**

- Run the task's validation command
- If validation fails, fix and re-validate
- Don't proceed until current task passes

**d) Mark Complete**

- Update todo list to track progress
- Document any deviations if necessary

### 4. Full Validation

After all tasks complete:

- Run the validation gates from PRP
- Execute comprehensive test suite
- Verify all acceptance criteria met

### 5. Completion

**Design Principle Compliance:**
- [ ] ✅ KISS: All implementations are straightforward, no clever tricks
- [ ] ✅ Ockham's Razor: No code added beyond task specifications
- [ ] ✅ YAGNI: Zero features/changes outside story acceptance criteria
- [ ] ✅ DRY: Used existing patterns (MIRROR tasks), no unnecessary refactoring
- [ ] ✅ SRP: Each task implementation changed ONE thing only

**Story Validation:**
- Work through completion checklist
- Ensure story requirements satisfied
- Verify all acceptance criteria met
- Confirm no scope creep occurred
- Move completed PRP to PRPs/completed/ create the folder if it does not exist

## Execution Rules

**Validation Gates**: Each task must pass validation, iterate until passed
**Pattern Adherence**: Follow existing patterns, don't create new ones
**No Shortcuts**: Complete all validation steps

## Failure Handling

When a task fails validation:

1. Read the error message carefully
2. Check the pattern reference again
3. Validate it by investigating the codebase
4. Fix and re-validate
5. If stuck, check similar implementations

## Success Criteria

- Every validation command passes
- Full test suite green
- Story acceptance criteria met
- Code follows project conventions
- Design principles adhered to throughout

**Implementation Red Flags (Fix if found):**
- 🚫 Code changes not in any task specification
- 🚫 "Improvements" or features beyond story scope
- 🚫 New patterns introduced when existing ones work
- 🚫 Refactoring outside task boundaries
- 🚫 Multiple concerns mixed in single task

**Remember: Implement exactly what the story requires, using existing patterns, nothing more.**
