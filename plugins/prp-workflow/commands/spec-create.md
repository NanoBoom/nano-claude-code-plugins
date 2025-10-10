# Create SPEC PRP (Advanced)

Generate a comprehensive specification-driven PRP with clear transformation goals.

## Specification: $ARGUMENTS

## Core Design Philosophy

**These principles guide specification and transformation design. When in doubt, do less.**

### 1. KISS - Keep It Simple, Stupid

- Prefer incremental changes over big bang rewrites
- Simple refactoring beats complex architectural overhauls
- If transformation requires >5 major steps, break it down further

### 2. Ockham's Razor - Entities should not be multiplied without necessity

- Don't introduce new patterns unless current ones are fundamentally broken
- Every new abstraction in the spec must justify its existence
- Reuse existing codebase patterns wherever possible

### 3. YAGNI - You Aren't Gonna Need It

- **Only transform what's causing actual problems NOW**
- Don't "fix" code that's working fine
- Skip "while we're at it" scope creep

### 4. DRY - Don't Repeat Yourself

- Consolidate duplicated logic during transformation
- But: don't force abstraction where duplication is clearer
- Extract common patterns found during current state analysis

### 5. Single Responsibility Principle

- Each transformation task should change one thing
- Don't mix refactoring with feature additions
- Separate concerns in task breakdown

**Specification Reality Checks:**

```
❌ "While refactoring X, let's also improve Y and Z" → Focus on X only
❌ "Rewrite everything to be more flexible" → Fix specific pain points
❌ "Create perfect abstraction layer" → Solve concrete problem simply
✅ "Is this transformation fixing a real, current issue?" → This is the filter
```

**Transformation Red Flags (Reject if found):**
- 🚫 Scope creep beyond stated pain points
- 🚫 "Modernize" tasks without clear benefit
- 🚫 Introducing patterns not in existing codebase
- 🚫 Tasks that don't map to measurable improvements

## Analysis Process

1. **Current State Assessment**
   - Map existing implementation
   - Identify pain points
   - Document technical debt
   - Note integration points

2. **Desired State Research**
   - Best practices for target state
   - Implementation examples
   - Migration strategies
   - Risk assessment
   - Dependency mapping

3. **User Clarification**
   - Confirm transformation goals
   - Priority of objectives
   - Acceptable trade-offs

## PRP Generation

Using /PRPs/templates/prp_spec.md:

### State Documentation

```yaml
current_state:
  files: [list affected files]
  behavior: [how it works now]
  issues: [specific problems]

desired_state:
  files: [expected structure]
  behavior: [target functionality]
  benefits: [improvements gained]
```

### Hierarchical Objectives

1. **High-Level**: Overall transformation goal
2. **Mid-Level**: Major milestones
3. **Low-Level**: Specific tasks with validation

### Task Specification with information dense keywords

#### Information dense keywords:

- MIRROR: Mirror the state of existing code to be mirrored to another use case
- COPY: Copy the state of existing code to be copied to another use case
- ADD: Add new code to the codebase
- MODIFY: Modify existing code
- DELETE: Delete existing code
- RENAME: Rename existing code
- MOVE: Move existing code
- REPLACE: Replace existing code
- CREATE: Create new code

#### Example:

```yaml
task_name:
  action: MODIFY/CREATE
  file: path/to/file
  changes: |
    - Specific modifications
    - Implementation details
    - With clear markers
  validation:
    - command: "test command"
    - expect: "success criteria"
```

### Implementation Strategy

- Identify dependencies
- Order tasks by priority and implementation order and dependencies logic
- Include rollback plans
- Progressive enhancement

## User Interaction Points

1. **Objective Validation**
   - Review hierarchical breakdown
   - Confirm priorities
   - Identify missing pieces

2. **Risk Review**
   - Document identified risks
   - Find mitigations
   - Set go/no-go criteria

## Context Requirements

- Current implementation details
- Target architecture examples
- Migration best practices
- Testing strategies

## Output

Save as: `SPEC_PRP/PRPs/{spec-name}.md`

## Quality Checklist

### Design Principle Compliance (Must Pass First)

- [ ] ✅ KISS: Transformation is incremental, not big bang rewrite
- [ ] ✅ Ockham's Razor: Reuses existing patterns, adds nothing unnecessary
- [ ] ✅ YAGNI: Only fixes actual, current pain points
- [ ] ✅ DRY: Consolidates duplication found in current state
- [ ] ✅ SRP: Each task changes one thing, cleanly separated

### Specification Completeness

- [ ] Current state fully documented with specific pain points
- [ ] Desired state clearly defined with measurable benefits
- [ ] All objectives measurable and tied to real issues
- [ ] Tasks ordered by dependency and risk
- [ ] Each task has validation that AI can run
- [ ] Risks identified with mitigations
- [ ] Rollback strategy included
- [ ] Integration points noted

### Red Flags (Reject Spec if found)

- [ ] 🚫 Scope includes "nice to have" improvements
- [ ] 🚫 Tasks that don't address documented pain points
- [ ] 🚫 New patterns introduced without justification
- [ ] 🚫 "While we're at it" transformations
- [ ] 🚫 Benefits described as "future-proofing" or "flexibility"

Remember: Focus on the transformation journey, not just the destination. **Transform only what's broken.**
