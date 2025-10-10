# Create PLANNING PRP (Advanced)

Transform rough ideas into comprehensive PRDs with rich visual documentation.

## Idea: $ARGUMENTS

## Core Design Philosophy

**These principles override everything else. When in doubt, do less.**

### 1. KISS - Keep It Simple, Stupid

- Simple solutions always beat complex ones
- If it takes more than 3 layers of abstraction to explain, redesign it
- Deleting code is more valuable than adding code

### 2. Ockham's Razor - Entities should not be multiplied without necessity

- Every component, API, and abstraction layer must justify its existence
- Default answer is "NO" unless there's solid evidence
- When two solutions work equally well, choose the simpler one

### 3. YAGNI - You Aren't Gonna Need It

- **Only solve problems that exist RIGHT NOW**
- Reject "maybe we'll need it later" features
- Reject complexity added "for extensibility"
- Requirements must be based on real data, not imagination

### 4. DRY - Don't Repeat Yourself

- Consolidate duplicated logic during transformation
- But: don't force abstraction where duplication is clearer
- Extract common patterns found during current state analysis

### 5. Single Responsibility Principle

- Each transformation task should change one thing
- Don't mix refactoring with feature additions
- Separate concerns in task breakdown

**Reality Checks:**

```
❌ "This architecture supports 100 future scenarios" → Only need current 2
❌ "For flexibility, we need a plugin system" → Solve concrete problem first
❌ "Design a perfect abstraction layer" → Write the dumbest code that works
✅ "Is this a real problem real users have?" → This is the starting point
```

**Applied to PRD Generation:**

- Market Analysis: Only study directly relevant competitors, not industry reports
- Diagrams: Only draw necessary core flows, not all possible paths
- APIs: Design minimum viable API first, not "perfect" API
- Phases: First version does core features only, everything else is "maybe later"

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

Using /PRPs/templates/prp_planning_base.md:

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
