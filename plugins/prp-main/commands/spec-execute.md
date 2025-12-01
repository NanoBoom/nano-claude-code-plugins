# Execute SPEC PRP

Implement a specification-driven transformation using an existing SPEC PRP.

## PRP File: $ARGUMENTS

## Mission: Successful State Transformation

SPEC PRPs enable precise state transformations through:

- **Current State Clarity**: Exact understanding of what exists now
- **Desired State Definition**: Clear target to transform towards
- **Progressive Validation**: Verify each transformation step
- **Rollback Safety**: Ability to revert if transformation fails
- Read PRPs/README.md to understand PRP concepts

**Your Goal**: Transform the codebase from current state to desired state exactly as specified in the SPEC PRP.

## Core Transformation Philosophy

**These principles guide state transformation execution. Safety over speed.**

### 1. Incremental Transformation

Small steps, each verifiable.

- Execute one task at a time, never batch multiple tasks
- Complete validation before moving to next task
- If a step fails, fix only that step before proceeding

### 2. Behavior Preservation

The system must work the same after transformation.

- Run existing tests after each task
- Verify external interfaces remain unchanged
- Watch for side effects not covered by tests

### 3. Reversibility

Every transformation step can be undone.

- Keep ROLLBACK command ready before each change
- Don't delete old code until new code is verified
- If stuck, rollback and reassess rather than hack forward

### 4. Minimal Change

Change only what the SPEC specifies.

- Never modify files not listed in SPEC tasks
- Resist "while I'm here" improvements
- If you see something broken but not in SPEC, note it but don't fix it

### 5. Validation-Driven

Every step has explicit success criteria.

- Run VALIDATE command immediately after each change
- Stop on any validation failure
- Never assume a change worked - verify it

**Applied to Specification Execution:**

- Task Execution: One task at a time, validate, then next (Incremental)
- Test Runs: Existing tests must pass after every task (Behavior Preservation)
- Safety Net: ROLLBACK ready before every change (Reversibility)
- Scope Control: Only touch files/code specified in SPEC (Minimal Change)
- Progress Gate: VALIDATE must pass to proceed (Validation-Driven)

**Execution Reality Checks:**

```
WRONG: "While transforming X, I'll also improve Y" → Stick to SPEC
WRONG: "This could be more elegant if I..." → Follow SPEC approach
WRONG: "Let me add this useful abstraction" → Only if in SPEC
RIGHT: "Is this explicitly required by the SPEC?" → This is the filter
```

## Execution Process

### 1. Load SPEC PRP

- Read the specified SPEC PRP file completely
- Understand current state analysis and pain points
- Absorb desired state goals and success criteria
- Map all task dependencies and integration points
- Use the provided documentation references and file patterns

### 2. ULTRATHINK & Plan

- Create comprehensive transformation plan following the SPEC's task order
- Break down into clear todos using TodoWrite tool
- Use subagents for parallel work when beneficial (always create PRP-inspired prompts for subagents)
- Follow the patterns referenced in the SPEC
- Identify rollback points for each major transformation step
- Never guess - verify codebase patterns yourself

### 3. Execute Transformation Tasks

- Follow the SPEC's task sequence strictly
- Use ACTION keywords (MODIFY, CREATE, DELETE, RENAME, MOVE, MIRROR) as specified
- Apply changes to files specified in each task
- Run VALIDATE command after each task
- Use IF_FAIL guidance when validation fails
- Keep ROLLBACK commands ready for each step

### 4. Progressive Validation

Execute validation at each level before proceeding:

- **Level 1 - Syntax**: Run linting and type checking
- **Level 2 - Unit**: Execute unit tests for modified components
- **Level 3 - Integration**: Run integration tests for affected flows
- **Level 4 - Transformation**: Verify current→desired state achieved

**Each level must pass before proceeding to the next.**

### 5. Transformation Verification

**State Transition Validation:**

- [ ] Current state pain points are resolved
- [ ] Desired state behaviors are achieved
- [ ] All integration points function correctly
- [ ] No regression in existing functionality
- [ ] Rollback was not needed (or was successful if used)

**Transformation Principle Compliance:**

- [ ] Incremental: Each task executed individually, validated before next
- [ ] Behavior Preservation: All existing tests still pass
- [ ] Reversibility: Rollback was available for every step
- [ ] Minimal Change: No modifications outside SPEC scope
- [ ] Validation-Driven: Every task's VALIDATE command passed

**SPEC Completion:**

- [ ] All tasks executed in specified order
- [ ] All validation gates passed
- [ ] Desired state achieved exactly as specified
- [ ] No scope creep occurred
- [ ] Move completed PRP to PRPs/spec/completed/ (create folder if needed)

## Failure Protocol

When validation fails:

1. **Diagnose**: Use IF_FAIL guidance from the task specification
2. **Isolate**: Identify which specific change caused the failure
3. **Fix**: Apply targeted fix following SPEC patterns
4. **Revalidate**: Re-run validation from the failed level
5. **Rollback**: If fix attempts fail 3 times, use ROLLBACK command and reassess

**Critical**: Do not proceed to next task until current task passes validation.

## Over-Engineering Red Flags (Fix if found)

- New abstractions not in SPEC
- Changes beyond SPEC scope
- "Improvements" not explicitly required
- Complex solutions where simple ones work
- Modifications to files not listed in SPEC

Progress through each transformation task systematically. **Implement only what's specified, nothing more.**
