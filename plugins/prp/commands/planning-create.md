# Create PLANNING PRP (Advanced)

Transform rough ideas into comprehensive PRDs with rich visual documentation.

## Idea: $ARGUMENTS

## Core Design Philosophy

**SOLID Principles - These principles are the foundation of software design.**

### 1. Single Responsibility Principle (SRP)

A class should have only one reason to change.

- Each module or class should focus on a single functionality or responsibility
- Changes should have only one clear reason
- Avoid coupling multiple unrelated functionalities together
- Each transformation task should change only one thing
- Don't mix refactoring with feature additions

### 2. Open/Closed Principle (OCP)

Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.

- Design should allow adding new features through extension
- Avoid modifying existing, validated code
- Use abstractions and interfaces for flexible design
- Add functionality through composition rather than modification

### 3. Liskov Substitution Principle (LSP)

Subtypes must be substitutable for their base types without affecting program correctness.

- Derived classes should be usable in place of base classes
- Subtypes should not break the behavioral contract of parent types
- Inheritance relationships should represent "is-a" relationships
- Ensure correct use of polymorphism

### 4. Interface Segregation Principle (ISP)

Clients should not be forced to depend on methods they do not use.

- Interfaces should be small and focused
- Avoid creating bloated interfaces
- Clients only need to know methods they actually use
- Prefer multiple specialized interfaces over a single general-purpose interface

### 5. Dependency Inversion Principle (DIP)

High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.

- Depend on abstractions rather than concrete implementations
- High-level policies should not depend on low-level details
- Use dependency injection for loose coupling
- Isolate changes through abstraction layers

**Applied to PRD Generation:**

- Market Analysis: Each analysis module focuses on a single aspect (SRP)
- Architecture Design: Design extensible component interfaces without modifying core (OCP)
- User Stories: Ensure derived scenarios conform to basic user journeys (LSP)
- API Design: Provide specialized interfaces for different clients (ISP)
- Implementation Strategy: Depend on abstract requirement definitions, not concrete implementation details (DIP)

## Discovery Process

1. **Concept Expansion**
   - Break down the core idea
   - Define success criteria
   - Map to business goals if provided

2. **Market & Technical Research**
   - Do deep web search for the following:
     - Market analysis
     - Competitor analysis
     - Technical feasibility study
     - Best practice examples
     - Integration possibilities

3. **User Research & Clarification**
   - Ask user for the following if not provided:
   - Target user personas?
   - Key pain points?
   - Success metrics?
   - Constraints/requirements?

## PRD Generation

Using /PRPs/templates/prp_planning.md:

### Visual Documentation Plan

```yaml
diagrams_needed:
  user_flows:
    - Happy path journey
    - Error scenarios
    - Edge cases

  architecture:
    - System components
    - Data flow
    - Integration points

  sequences:
    - API interactions
    - Event flows
    - State changes

  data_models:
    - Entity relationships
    - Schema design
    - State machines
```

### Research Integration

- **Market Analysis**: Include findings in PRD
- **Technical Options**: Compare approaches
- **Risk Assessment**: With mitigation strategies
- **Success Metrics**: Specific, measurable

### User Story Development

```markdown
## Epic: [High-level feature]

### Story 1: [User need]

**As a** [user type]
**I want** [capability]
**So that** [benefit]

**Acceptance Criteria:**

- [ ] Specific behavior
- [ ] Edge case handling
- [ ] Performance requirement

**Technical Notes:**

- Implementation approach
- API implications
- Data requirements
```

### Implementation Strategy

- Phases with dependencies (no dates)
- Priority ordering
- MVP vs enhanced features
- Technical prerequisites

## User Interaction Points

1. **Idea Validation**
   - Confirm understanding
   - Clarify ambiguities
   - Set boundaries

2. **Research Review**
   - Share findings
   - Validate assumptions
   - Adjust direction

3. **PRD Draft Review**
   - Architecture approval
   - Risk acknowledgment
   - Success metric agreement

## Diagram Guidelines

- Use Mermaid for all diagrams
- Include legends where needed
- Show error paths
- Annotate complex flows

## Output Structure

```markdown
1. Executive Summary
2. Problem & Solution
3. User Stories (with diagrams)
4. Technical Architecture (with diagrams)
5. API Specifications
6. Data Models
7. Implementation Phases
8. Risks & Mitigations
9. Success Metrics
10. Appendices
```

Save as: `PRPs/{feature-name}-prd.md`

## Quality Checklist

**Design Philosophy (Must Pass First):**

- [ ] ✅ Solves a REAL problem (not hypothetical)
- [ ] ✅ Solution is the SIMPLEST possible
- [ ] ✅ No "future-proofing" complexity
- [ ] ✅ Every component justified by current need

**Content Quality:**

- [ ] Problem clearly articulated
- [ ] Solution addresses problem
- [ ] Only NECESSARY user flows diagrammed
- [ ] Wireframes included ONLY if essential
- [ ] Architecture visualized (minimum viable)
- [ ] APIs specified (MVP only, not "complete")
- [ ] Data models included (essential entities only)
- [ ] Dependencies identified
- [ ] Risks identified and mitigated
- [ ] Success metrics measurable
- [ ] Implementation phases logical (Phase 1 = MVP)
- [ ] Ready for implementation PRP

**Red Flags (Reject if found):**

- [ ] 🚫 "This could support..." (future speculation)
- [ ] 🚫 More than 5 core components
- [ ] 🚫 "Flexible architecture for any use case"
- [ ] 🚫 Abstraction layers without concrete use

Remember: Great PRDs are MINIMAL, not comprehensive. Implementation beats planning.
