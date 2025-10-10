# Execute SPEC PRP

Implement a specification using an existing SPEC PRP.

## PRP File: $ARGUMENTS

## Core Transformation Principles

**These principles guide every transformation decision. When in doubt, do less.**

### 1. KISS - Keep It Simple, Stupid

- Implement transformations incrementally, not all at once
- Choose simple refactoring over clever rewrites
- If implementation gets complex, question whether it's necessary

### 2. Ockham's Razor - Entities should not be multiplied without necessity

- Don't add new patterns beyond what the SPEC requires
- Reuse existing codebase patterns wherever possible
- Every new abstraction must be explicitly in the SPEC

### 3. YAGNI - You Aren't Gonna Need It

- **Only implement what the SPEC explicitly requires**
- Resist "while I'm here" improvements
- No optimizations or enhancements beyond SPEC scope

### 4. DRY - Don't Repeat Yourself

- Consolidate duplication as specified in the SPEC
- But: prefer clear code over forced abstraction
- Follow DRY patterns already in the codebase

### 5. Single Responsibility Principle

- Each transformation task changes one thing
- Don't mix refactoring with unrelated changes
- Keep modifications focused and isolated

**Execution Reality Checks:**

```
❌ "While transforming X, I'll also improve Y" → Stick to SPEC
❌ "This could be more elegant if I..." → Follow SPEC approach
❌ "Let me add this useful abstraction" → Only if in SPEC
✅ "Is this explicitly required by the SPEC?" → This is the filter
```

## Execution Process

1. **Understand Spec**
   - Current state analysis
   - Desired state goals
   - Task dependencies

2. **ULTRATHINK**
   - Think hard before you execute the plan. Create a comprehensive plan addressing all requirements.
   - Break down complex tasks into smaller, manageable steps using your todos tools.
   - Use the TodoWrite tool to create and track your implementation plan.
   - Identify implementation patterns from existing code to follow.

3. **Execute Tasks**
   - Follow task order
   - Run validation after each
   - Fix failures before proceeding

4. **Verify Transformation**

   **Design Principle Compliance:**
   - [ ] ✅ KISS: Implementation is straightforward, no clever tricks
   - [ ] ✅ Ockham's Razor: Only patterns from SPEC or existing codebase
   - [ ] ✅ YAGNI: Zero features/changes beyond SPEC requirements
   - [ ] ✅ DRY: Duplication eliminated as per SPEC only
   - [ ] ✅ SRP: Each change has single, clear purpose

   **SPEC Validation:**
   - Confirm desired state achieved exactly as specified
   - Run all validation gates from SPEC
   - Test integration points
   - Verify no scope creep occurred

**Over-Engineering Red Flags (Fix if found):**

- 🚫 New abstractions not in SPEC
- 🚫 Changes beyond SPEC scope
- 🚫 "Improvements" not explicitly required
- 🚫 Complex solutions where simple ones work

Progress through each objective systematically. **Implement only what's specified, nothing more.**

