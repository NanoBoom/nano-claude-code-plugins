# Execute TASK PRP

Run through a task list from an existing TASK PRP.

## PRP File: $ARGUMENTS

## Core Execution Principles

**These principles guide every task execution. When in doubt, do less.**

### 1. KISS - Keep It Simple, Stupid

- Execute tasks exactly as specified, no clever variations
- If task seems complex, break it down further
- Simple, direct implementation beats elegant complexity

### 2. Ockham's Razor - Entities should not be multiplied without necessity

- Don't add steps beyond what task specifies
- Use existing patterns and helpers from codebase
- Every modification must be in the task list

### 3. YAGNI - You Aren't Gonna Need It

- **Only implement what the task explicitly requires**
- No "improvements" while executing tasks
- Resist adding features not in task scope

### 4. DRY - Don't Repeat Yourself

- Use existing utilities and patterns
- But: don't refactor code not in task scope
- Follow DRY only where task specifies

### 5. Single Responsibility Principle

- Each task execution changes ONE thing
- Don't mix multiple tasks in one step
- Keep changes isolated and focused

**Execution Reality Checks:**

```
❌ "While doing this task, I'll also..." → Execute only the task
❌ "This could be done better if I..." → Follow task specification
❌ "Let me refactor this nearby code" → Only touch task scope
✅ "Does this task require this change?" → This is the filter
```

## Execution Process

1. **Load Tasks**
   - Read task list
   - Understand context

2. **Execute Each Task**
   - Perform ACTION
   - Run VALIDATE
   - Fix IF_FAIL issues

3. **Complete Checklist**

   **Design Principle Compliance:**
   - [ ] ✅ KISS: All implementations straightforward, no clever tricks
   - [ ] ✅ Ockham's Razor: No steps added beyond task specifications
   - [ ] ✅ YAGNI: Zero changes outside task requirements
   - [ ] ✅ DRY: Used existing patterns, no unnecessary refactoring
   - [ ] ✅ SRP: Each task execution changed ONE thing only

   **Task Validation:**
   - Verify all tasks completed exactly as specified
   - Run final validation commands
   - Check no regressions introduced
   - Confirm no scope creep occurred
   - Move completed PRP to PRPs/completed/ create the folder if it does not exist

**Execution Red Flags (Fix if found):**

- 🚫 Changes not listed in any task
- 🚫 "Improvements" made while executing
- 🚫 Code refactored outside task scope
- 🚫 Multiple concerns mixed in single task execution

Work through tasks sequentially, validating each. **Execute exactly what's specified, nothing more.**
