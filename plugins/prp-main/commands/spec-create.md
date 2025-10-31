# Create SPEC PRP (Advanced)

Generate a comprehensive specification-driven PRP with clear transformation goals.

## Specification: $ARGUMENTS

## Core Design Philosophy

**SOLID Principles - These principles guide specification and transformation design.**

### 1. Single Responsibility Principle (SRP)

A class should have only one reason to change.

- Each transformation task should change only one thing
- Don't mix refactoring with feature additions
- Separate concerns in task breakdown
- Each specification module focuses on a single transformation goal

### 2. Open/Closed Principle (OCP)

Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.

- Prefer incremental changes over large-scale rewrites
- Improve architecture through extension rather than modification
- Reuse existing codebase patterns in specifications
- Don't introduce new patterns unless existing ones are fundamentally broken

### 3. Liskov Substitution Principle (LSP)

Subtypes must be substitutable for their base types without affecting program correctness.

- Ensure refactored components can seamlessly replace original components
- Maintain interface contract consistency
- Transformations should preserve existing behavioral semantics
- New implementations must satisfy original test cases

### 4. Interface Segregation Principle (ISP)

Clients should not be forced to depend on methods they do not use.

- Create focused, small interfaces in transformations
- Avoid introducing bloated abstractions during refactoring
- Only expose methods that clients actually need
- Break large transformations into specialized smaller transformations

### 5. Dependency Inversion Principle (DIP)

High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.

- Depend on abstractions rather than concrete implementations in transformations
- Isolate changes through abstraction layers
- High-level transformation logic should not depend on specific implementation details
- Use dependency injection for loosely coupled transformations

**Applied to Specification Design:**

- Current State Assessment: Each analysis module focuses on a single aspect (SRP)
- Target State Design: Design extensible transformation paths (OCP)
- Migration Strategy: Ensure new implementations can replace old ones (LSP)
- Transformation Tasks: Provide specialized interfaces for different transformation phases (ISP)
- Implementation Guidance: Depend on abstract transformation definitions (DIP)

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

Using PRPs/templates/prp_spec.md:

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

#### Information dense keywords

- MIRROR: Mirror the state of existing code to be mirrored to another use case
- COPY: Copy the state of existing code to be copied to another use case
- ADD: Add new code to the codebase
- MODIFY: Modify existing code
- DELETE: Delete existing code
- RENAME: Rename existing code
- MOVE: Move existing code
- REPLACE: Replace existing code
- CREATE: Create new code

#### Example

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

Save as: `PRPs/{spec-name}-spec.md`

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
