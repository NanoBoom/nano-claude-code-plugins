---
description: "Convert user story/task into executable PRP with deep codebase analysis"
---

# Create Story PRP from User Story/Task

## Story/Task: $ARGUMENTS

## Mission

Transform a user story or task into a **tactical implementation PRP** through systematic codebase analysis and task decomposition.

We do not write any code in this step, the goal is to create a detailed context engineered implementation plan for the implementation agent.

**Key Principle**: We must first gather the context about the story/task before proceeding with the analysis.

When we understand the story/task, we can proceed with the codebase analysis. We systematically dig deep into the codebase to gather intelligence and identify patterns and implementation points. We then use this information to create a PRP that can be executed by a coding agent.

The contents of the created PRP should encapsulate all the information the agent needs to complete the story/task in one pass.

Remember that subagents will only receive their details from you, the user has no way of interacting with the subagents. so you need to share all the relevant context to the subagent in the subagent prompt and in the TODO that is shared with the particular agent.

Create detailed todos and spawn parallel subagents to analyze (Use specialized subagents when apropriate):

## Core Design Philosophy

**These principles guide PRP creation and task decomposition. When in doubt, do less.**

### 1. KISS - Keep It Simple, Stupid

- Break story into simplest possible tasks
- Each task should be straightforward to implement
- Avoid complex multi-step tasks; split them

### 2. Ockham's Razor - Entities should not be multiplied without necessity

- Don't create tasks unless story explicitly requires them
- Reuse existing patterns found in codebase
- Every task must justify its existence for the story

### 3. YAGNI - You Aren't Gonna Need It

- **Only create tasks for current story requirements**
- No "preparatory" tasks for hypothetical future stories
- Skip "nice to have" features not in acceptance criteria

### 4. DRY - Don't Repeat Yourself

- Leverage MIRROR keyword to reuse existing patterns
- Identify and reuse common codebase utilities
- Consolidate similar tasks where appropriate

### 5. Single Responsibility Principle

- Each task changes ONE thing only
- Don't bundle multiple concerns in same task
- Separate CREATE, UPDATE, and TEST tasks clearly

**Story PRP Reality Checks:**

```
❌ "Add this task for potential future stories" → Current story only
❌ "Bundle multiple changes for efficiency" → Keep tasks atomic
❌ "Create flexible abstraction while implementing" → Use existing patterns
✅ "Does this story's acceptance criteria require this?" → This is the filter
```

**PRP Creation Red Flags (Remove if found):**

- 🚫 Tasks beyond story acceptance criteria
- 🚫 "Future-proofing" tasks not in current story
- 🚫 New patterns when existing ones work
- 🚫 Complex tasks mixing multiple concerns

## Analysis Process

### Phase 1: Story Decomposition

Analyze the story to determine:

- **Story/Task Type**: Feature/Bug/Enhancement/Refactor
- **Complexity**: Low, Medium, High
- **Affected Systems**: Which components/services need changes

Get a deep understanding about the story/task before proceeding so that you can effectively guide the rest of the process.

### Phase 2: Codebase Intelligence Gathering

**1. Project Structure Analysis**

- Detect primary language(s) and frameworks
- Map directory structure and conventions to identify integration points for the story/task
- Identify service/component boundaries
- Find configuration files and environment setup

**2. Pattern Recognition**

- Search for similar implementations in codebase
- Identify coding conventions (naming, structure, error handling) start in CLAUDE.md AGENTS.md or relevant rules files such as .cursorrules
- Extract common patterns for the story's domain that should be added to the PRP as context for the implementation agent.
- Note anti-patterns to avoid

**3. Dependency Analysis**

- Catalog external libraries used if relevant to the story/task (check package.json, pyproject.toml, go.mod, etc.)
- Understand how libraries are integrated
- Find relevant documentation in PRPs/ai_docs/ if shared, ai_docs directory is used by the user to paste in relevant additional context that may be relevant to our story/task

**4. Testing Patterns**

- Identify test framework and structure
- Find similar test examples and test setup
- Suggest test cases and scenarios

**5. Integration Points**

- Identify files that will need updates
- Identify if new files needs to be created and where to create them
- Find router/API registration patterns
- Understand database/model patterns if relevant

### Phase 3: Think harder about the story and its components

Really think hard about everything you just learned during the research phases.

### Phase 4: PRP Task Generation

Transform analysis into concrete tasks:

Read and understand the template PRPs/templates/prp_story.md

**Task Rules**:

1. Each task is atomic and independently testable
2. Tasks are ordered by dependency
3. Use action verbs that are information dense: CREATE, UPDATE, ADD, REMOVE, REFACTOR, MIRROR
4. Include specific implementation details from codebase analysis
5. Every task has an executable validation command

**Task Action Types**:

We use the concept of information dense keywords to describe the action to be taken, below is a guidance.
But you can use your own words to describe the action to be taken as long as you follow this same principle.

Examples:

- **CREATE**: New files/components
- **UPDATE**: Modify existing files
- **ADD**: Insert new functionality into existing code
- **REMOVE**: Delete deprecated code
- **REFACTOR**: Restructure without changing behavior
- **MIRROR**: Mirror existing pattern or functionality that exists elsewhere in the codebase

### Phase 5: Validation Design

For each task, design validation that:

- Can run immediately after task completion
- Provides clear pass/fail feedback
- Uses project-specific commands discovered in analysis

## Quality Criteria

### Design Principle Compliance (Must Pass First)

- [ ] ✅ KISS: All tasks are simple and atomic
- [ ] ✅ Ockham's Razor: Every task justified by story requirements
- [ ] ✅ YAGNI: No tasks for hypothetical future needs
- [ ] ✅ DRY: Existing patterns reused via MIRROR/existing utilities
- [ ] ✅ SRP: Each task has single, clear responsibility

### Task Clarity

- [ ] The PRP is clear and concise and follows KISS principle
- [ ] Each task has clear action and target
- [ ] Implementation details reference specific patterns
- [ ] Validation commands are executable

### Context Completeness

- [ ] All necessary patterns identified
- [ ] External library usage documented
- [ ] Integration points mapped
- [ ] External context references populated

### Story Coverage

- [ ] All acceptance criteria addressed
- [ ] Edge cases considered
- [ ] Error handling included where needed

### Red Flags (Reject PRP if found)

- [ ] 🚫 Tasks outside story acceptance criteria
- [ ] 🚫 "Future-proofing" or preparatory tasks
- [ ] 🚫 New abstractions when existing patterns work
- [ ] 🚫 Complex tasks bundling multiple changes

## Output

Save as: `PRPs/story_{kebab-case-summary}.md`

## Success Metrics

**Implementation Ready**: Another developer could execute these tasks without additional context
**Validation Complete**: Every task has atleast one working validation command
**Pattern Consistent**: Tasks follow existing codebase conventions
**Scope Discipline**: Every task maps directly to story acceptance criteria, nothing more

**Remember: Create minimal PRPs that fulfill the story requirements exactly, using existing patterns wherever possible.**
