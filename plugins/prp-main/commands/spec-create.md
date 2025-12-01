# Create SPEC PRP (Advanced)

Generate a comprehensive specification-driven PRP with clear transformation goals.

## Specification: $ARGUMENTS

## PRP Creation Mission

Create a specification PRP that enables **successful state transformation** through systematic current-state analysis and target-state research.

**Critical Understanding**: The executing AI agent only receives:

- Start by reading and understanding the PRP concepts in PRPs/README.md
- The PRP content you create
- Its training data knowledge
- Access to codebase files (but needs guidance on which ones)

**Therefore**: Your research and context curation directly determines implementation success. Incomplete context = implementation failure.

## Core Transformation Philosophy

**These principles guide state transformation design. Safety over speed.**

### 1. Incremental Transformation

Small steps, each verifiable.

- Transform in small, atomic steps rather than big-bang rewrites
- Each step should be independently testable
- If a step fails, only that step needs to be fixed

### 2. Behavior Preservation

The system must work the same after transformation.

- All existing tests must continue to pass
- External interfaces remain unchanged unless explicitly intended
- Side effects and edge cases must be preserved

### 3. Reversibility

Every transformation step can be undone.

- Maintain rollback capability for each step
- Keep the old implementation available until new one is verified
- Document rollback commands for each task

### 4. Minimal Change

Change only what's necessary to achieve the goal.

- Don't refactor code that isn't part of the transformation scope
- Resist "while I'm here" improvements
- One transformation goal per SPEC

### 5. Validation-Driven

Every step has explicit success criteria.

- Define validation commands before executing changes
- Stop immediately on validation failure
- Never proceed to next step until current step passes

**Applied to Specification Design:**

- Task Breakdown: Each task is one atomic transformation step (Incremental)
- Test Strategy: Document which tests must pass after each task (Behavior Preservation)
- Risk Planning: Include rollback command for every task (Reversibility)
- Scope Control: Only include tasks that address documented pain points (Minimal Change)
- Success Criteria: Every task has VALIDATE command with expected output (Validation-Driven)

## Research Process

> During the research process, create clear tasks and spawn as many agents and subagents as needed using the batch tools. The deeper research we do here the better the PRP will be. We optimize for chance of success and not for speed.

### 1. Current State Assessment

- Create clear todos and spawn subagents to analyze the existing implementation
- Map all affected files and their dependencies
- Identify specific pain points with concrete examples
- Document technical debt with severity levels
- Note all integration points and side effects

### 2. Desired State Research

- Spawn subagents to research best practices for the target state
- Find implementation examples (GitHub/StackOverflow/blogs) with specific URLs
- For critical documentation, add a .md file to PRPs/ai_docs and reference it
- Research migration strategies and common pitfalls
- Assess risks and create dependency mapping

### 3. User Clarification (Before Proceeding)

Use AskUserQuestion tool to confirm:

- Transformation goals and scope boundaries
- Priority of objectives (must-have vs nice-to-have)
- Acceptable trade-offs and constraints
- Go/no-go criteria for the transformation

## PRP Generation Process

### Step 1: Choose Template

Use `PRPs/templates/prp_spec.md` as your template structure.

### Step 2: Transform Research into Template Sections

**High-Level Objective**: The overall transformation goal

```markdown
## High-Level Objective

- Transform [current state] to [desired state] to solve [specific pain point]
```

**Mid-Level Objectives**: Major milestones with measurable outcomes

```markdown
## Mid-Level Objective

- Milestone 1: [concrete deliverable with success criteria]
- Milestone 2: [concrete deliverable with success criteria]
```

**Implementation Notes**: Technical context and constraints

```markdown
## Implementation Notes

- Current state: [specific files, behaviors, issues]
- Target state: [expected structure, new behaviors, benefits]
- Migration constraints: [backwards compatibility, rollback needs]
- Dependencies: [external libs, internal modules affected]
```

**Low-Level Tasks**: Specific implementation steps with validation

### Step 3: Task Specification with Action Keywords

Use these action keywords for clarity:

| Keyword | Usage                                                |
| ------- | ---------------------------------------------------- |
| MODIFY  | Change existing code in place                        |
| CREATE  | Add new files or functions                           |
| DELETE  | Remove deprecated code                               |
| RENAME  | Change names (files, functions, variables)           |
| MOVE    | Relocate code to different location                  |
| MIRROR  | Replicate pattern from existing code to new use case |

**Task Format**:

```markdown
1. [Task name]

ACTION: MODIFY
FILE: path/to/file.ts
CHANGES:

- Specific modification with line/function reference
- Implementation detail with pattern to follow
  VALIDATE: npm test -- path/to/file.test.ts
  IF_FAIL: Check [specific debugging steps]
  ROLLBACK: git checkout path/to/file.ts
```

### Step 4: Context Completeness Validation

Apply the **"No Prior Knowledge" test**:
_"If someone knew nothing about this codebase, would they have everything needed to implement this successfully?"_

### Step 5: ULTRATHINK Before Writing

After research completion, create comprehensive PRP writing plan using TodoWrite tool:

- Plan how to structure each template section with your research findings
- Identify gaps that need additional research
- Create systematic approach to filling template with actionable context

## Output

Save as: `PRPs/spec/{specification-name}.md`

**Naming convention**: Derive `{specification-name}` from $ARGUMENTS by:

1. Converting to lowercase kebab-case
2. Removing common words (the, a, an)
3. Example: "Migrate to React Hooks" → `migrate-react-hooks-spec.md`

## Quality Checklist

### Transformation Principle Compliance (Must Pass First)

- [ ] Incremental: Each task is atomic, independently testable
- [ ] Behavior Preservation: Existing tests identified, must pass after each task
- [ ] Reversibility: Rollback command documented for every task
- [ ] Minimal Change: No tasks beyond documented pain points
- [ ] Validation-Driven: Every task has VALIDATE with concrete success criteria

### Specification Completeness

- [ ] Current state fully documented with specific pain points
- [ ] Desired state clearly defined with measurable benefits
- [ ] All objectives measurable and tied to real issues
- [ ] Tasks ordered by dependency and risk
- [ ] Each task has validation command that AI can run
- [ ] Risks identified with mitigations
- [ ] Rollback strategy included for each task
- [ ] Integration points noted

### Red Flags (Reject Spec if found)

- [ ] Scope includes "nice to have" improvements
- [ ] Tasks that don't address documented pain points
- [ ] New patterns introduced without justification
- [ ] "While we're at it" transformations
- [ ] Benefits described as "future-proofing" or "flexibility"

## Success Metrics

**Confidence Score**: Rate 1-10 for transformation success likelihood

**Validation**: The completed PRP should enable an AI agent unfamiliar with the codebase to execute the transformation successfully using only the PRP content and codebase access.

Remember: Focus on the transformation journey, not just the destination. **Transform only what's broken.**
