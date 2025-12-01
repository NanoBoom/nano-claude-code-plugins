# Create PLANNING PRP (Advanced)

Transform rough ideas into comprehensive PRDs with rich visual documentation.

## Idea: $ARGUMENTS

## Core Planning Philosophy

**These principles guide product discovery and PRD creation. Clarity over completeness.**

### 1. Problem-First

Define the problem before designing solutions.

- Articulate the specific pain point being solved
- Validate that the problem is real and worth solving
- Resist jumping to solutions before understanding the problem

### 2. User-Centric

Every feature must have clear user value.

- Define who the user is and what they need
- Write requirements from user perspective (user stories)
- Prioritize based on user impact, not technical interest

### 3. Minimal Viable

Include only what's essential for MVP.

- Strip features to the core necessity
- Ask "can we launch without this?" for every feature
- Phase 1 should be embarrassingly small

### 4. Measurable Outcomes

Every feature has success criteria.

- Define how you'll know if it works
- Specific, measurable acceptance criteria
- Avoid vague "improve user experience" goals

### 5. Iterative Discovery

Refine through research and feedback.

- Start with assumptions, validate through research
- Incorporate market and technical findings
- Allow scope to adjust based on discoveries

**Applied to PRD Creation:**

- Concept Expansion: Define problem clearly before exploring solutions (Problem-First)
- User Research: Write all requirements from user perspective (User-Centric)
- Feature Scoping: Only include MVP-essential features (Minimal Viable)
- Acceptance Criteria: Every story has measurable success criteria (Measurable Outcomes)
- Research Integration: Adjust direction based on findings (Iterative Discovery)

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

Save as: `PRPs/planning/{feature-name}.md`

## Quality Checklist

**Planning Principle Compliance (Must Pass First):**

- [ ] Problem-First: Problem clearly defined before solution details
- [ ] User-Centric: All features written as user stories with clear value
- [ ] Minimal Viable: Only MVP-essential features included
- [ ] Measurable Outcomes: Every feature has specific success criteria
- [ ] Iterative Discovery: Research findings incorporated, assumptions validated

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

- [ ] "This could support..." (future speculation)
- [ ] More than 5 core components
- [ ] "Flexible architecture for any use case"
- [ ] Abstraction layers without concrete use

Remember: Great PRDs are MINIMAL, not comprehensive. Implementation beats planning.
