# Execute TASK PRP

Run through a task list from an existing TASK PRP.

## PRP File: $ARGUMENTS

## Core Implementation Philosophy

**These principles guide every task execution. When in doubt, do less.**

### 1. Simplicity First

Execute tasks exactly as specified.

- No clever variations on the task
- If task seems complex, break it down further
- Simple, direct implementation beats elegant complexity

### 2. Minimal Addition

Don't add steps beyond what task specifies.

- Use existing patterns and helpers from codebase
- Every modification must be in the task list
- Every line of code must justify its existence

### 3. Scope Discipline

Only implement what the task explicitly requires.

- No "improvements" while executing tasks
- Resist adding features not in task scope
- If task doesn't mention it, don't build it

### 4. Pattern Reuse

Use existing utilities and patterns.

- Don't refactor code not in task scope
- Match the style and structure of similar code
- Follow patterns where task specifies

### 5. Focused Components

Each task execution changes ONE thing.

- Don't mix multiple tasks in one step
- Keep changes isolated and focused
- If describing what code does requires "and", split it

**Execution Reality Checks:**

```
WRONG: "While doing this task, I'll also..." → Execute only the task
WRONG: "This could be done better if I..." → Follow task specification
WRONG: "Let me refactor this nearby code" → Only touch task scope
RIGHT: "Does this task require this change?" → This is the filter
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

   **Implementation Principle Compliance:**
   - [ ] Simplicity First: All implementations straightforward, no clever tricks
   - [ ] Minimal Addition: No steps added beyond task specifications
   - [ ] Scope Discipline: Zero changes outside task requirements
   - [ ] Pattern Reuse: Used existing patterns, no unnecessary refactoring
   - [ ] Focused Components: Each task execution changed ONE thing only

   **Task Validation:**
   - Verify all tasks completed exactly as specified
   - Run final validation commands
   - Check no regressions introduced
   - Confirm no scope creep occurred
   - Move completed PRP to PRPs/task/completed/ (create folder if needed)

**Implementation Red Flags (Fix if found):**

- Changes not listed in any task
- "Improvements" made while executing
- Code refactored outside task scope
- Multiple concerns mixed in single task execution

Work through tasks sequentially, validating each. **Execute exactly what's specified, nothing more.**
