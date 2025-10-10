# Execute BASE PRP

## PRP File: $ARGUMENTS

## Mission: One-Pass Implementation Success

PRPs enable working code on the first attempt through:

- **Context Completeness**: Everything needed, nothing guessed
- **Progressive Validation**: 4-level gates catch errors early
- **Pattern Consistency**: Follow existing codebase approaches
- Read PRPs/README.md to understand PRP concepts

**Your Goal**: Transform the PRP into working code that passes all validation gates.

## Core Implementation Principles

**These principles guide every implementation decision. When in doubt, choose simpler.**

### 1. KISS - Keep It Simple, Stupid

- Write the simplest code that solves the problem
- Avoid clever solutions that sacrifice clarity
- If implementation gets complex, step back and rethink approach

### 2. Ockham's Razor - Entities should not be multiplied without necessity

- Don't introduce new abstractions unless absolutely required
- Reuse existing patterns from the codebase
- Every new file/class/function must justify its existence

### 3. YAGNI - You Aren't Gonna Need It

- **Only implement what the PRP explicitly requires**
- Resist adding "might be useful" features
- No premature optimization or generalization

### 4. DRY - Don't Repeat Yourself

- Extract repeated logic into shared utilities
- Follow existing abstraction patterns in the codebase
- But: prefer clear duplication over forced abstraction

### 5. Single Responsibility Principle

- Each function/class does ONE thing well
- If describing what code does requires "and", split it
- Follow separation patterns shown in PRP examples

**Implementation Reality Checks:**

```
❌ "Let me add flexibility for future cases" → Only code what's specified
❌ "I'll create a new abstraction pattern" → Use existing patterns first
❌ "This needs a sophisticated architecture" → Start with dumbest solution
✅ "Does the PRP explicitly require this?" → This is the decision filter
```

## Execution Process

1. **Load PRP**
   - Read the specified PRP file completely
   - Absorb all context, patterns, requirements and gather codebase intelligence
   - Use the provided documentation references and file patterns, consume the right documentation before the appropriate todo/task
   - Trust the PRP's context and guidance - it's designed for one-pass success
   - If needed do additional codebase exploration and research as needed

2. **ULTRATHINK & Plan**
   - Create comprehensive implementation plan following the PRP's task order
   - Break down into clear todos using TodoWrite tool
   - Use subagents for parallel work when beneficial (always create prp inspired prompts for subagents when used)
   - Follow the patterns referenced in the PRP
   - Use specific file paths, class names, and method signatures from PRP context
   - Never guess - always verify the codebase patterns and examples referenced in the PRP yourself

3. **Execute Implementation**
   - Follow the PRP's Implementation Tasks sequence, add more detail as needed, especially when using subagents
   - Use the patterns and examples referenced in the PRP
   - Create files in locations specified by the desired codebase tree
   - Apply naming conventions from the task specifications and CLAUDE.md

4. **Progressive Validation**

   **Execute the level validation system from the PRP:**
   - **Level 1**: Run syntax & style validation commands from PRP
   - **Level 2**: Execute unit test validation from PRP
   - **Level 3**: Run integration testing commands from PRP
   - **Level 4**: Execute specified validation from PRP

   **Each level must pass before proceeding to the next.**

5. **Completion Verification**

   **Design Principle Compliance:**
   - [ ] ✅ KISS: Solution is simple and clear (no clever tricks)
   - [ ] ✅ Ockham's Razor: No unnecessary abstractions added
   - [ ] ✅ YAGNI: Only implemented what PRP requires
   - [ ] ✅ DRY: Repeated logic properly extracted
   - [ ] ✅ SRP: Each component has single, clear responsibility

   **PRP Validation:**
   - Work through the Final Validation Checklist in the PRP
   - Verify all Success Criteria from the "What" section are met
   - Confirm all Anti-Patterns were avoided
   - Implementation is ready and working

**Failure Protocol**: When validation fails, use the patterns and gotchas from the PRP to fix issues, then re-run validation until passing.

**Over-Engineering Red Flags (Fix if found):**
- 🚫 New patterns not in existing codebase
- 🚫 Features beyond PRP requirements
- 🚫 Complex abstractions for simple problems
- 🚫 Code that needs extensive comments to explain
