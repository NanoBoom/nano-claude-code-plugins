# Create task list for PRP

**Create a comprehensive task list in PRPs/checklist.md for PRP $ARGIMENTS**

## Core Task Decomposition Philosophy

**These principles guide task list creation. Clarity enables execution.**

### 1. Atomic Tasks

Each task does exactly ONE thing.

- A task should be completable in a single focused session
- Don't bundle unrelated changes in the same task
- Clearly separate CREATE, MODIFY, and TEST
- Each task should be simple and atomic
- If a task needs extensive explanation, split it

### 2. Context Sufficiency

Tasks contain everything needed for execution.

- Include specific file paths and patterns to follow
- Use information-dense keywords (ADD, CREATE, MODIFY, MIRROR, etc.)
- Reference existing code examples from codebase
- The executor should not need to search for missing information

### 3. Pattern Reuse

Leverage existing codebase patterns.

- Use MIRROR/COPY keywords to leverage existing code
- Reference existing patterns rather than recreating
- Search for similar implementations before defining tasks
- Reference specific files as implementation examples

### 4. PRP Alignment

Every task directly serves PRP requirements.

- Don't create tasks unless they solve specific PRP requirements
- Each task must justify its existence
- No tasks for hypothetical future needs
- Eliminate redundant or unnecessary steps

### 5. Validation Completeness

Every task has executable success criteria.

- Each task should have unit test coverage
- Make tests pass on each task before proceeding
- Include specific validation commands
- Tasks without validation are incomplete

**Applied to Task Lists:**

- Task Definition: Each task does exactly one thing (Atomic Tasks)
- Task Content: All context included with dense keywords (Context Sufficiency)
- Implementation: Use MIRROR/COPY to leverage existing code (Pattern Reuse)
- Scope: Only tasks required by PRP, nothing extra (PRP Alignment)
- Verification: Every task has test coverage (Validation Completeness)

## Task List Creation Process

Ingest the information then dig deep into our existing codebase and PRP, When done ->

ULTRATHINK about the PRP task and create the plan based adhering to claude.md and extract and refine detailed tasks following this principle:

### list of tasks to be completed to fullfill the PRP in the order they should be completed using infomration dense keywords

- Infomration dense keyword examples:
  ADD, CREATE, MODIFY, MIRROR, FIND, EXECUTE, KEEP, PRESERVE etc

Mark done tasks with: STATUS [DONE], if not done leave empty

```yaml
Task 1:
STATUS [ ]
MODIFY src/existing_module.py:
  - FIND pattern: "class OldImplementation"
  - INJECT after line containing "def __init__"
  - PRESERVE existing method signatures

STATUS [ ]
CREATE src/new_feature.py:
  - MIRROR pattern from: src/similar_feature.py
  - MODIFY class name and core logic
  - KEEP error handling pattern identical

...(...)

Task N:
...

```

Each task should have unit test coverage, make tests pass on each task

## Output

Save as: `PRPs/task-list/{task-summary}.md`

## Task List Quality Checklist

### Task Decomposition Compliance (Must Pass First)

- [ ] Atomic Tasks: Each task does exactly one thing, independently executable
- [ ] Context Sufficiency: Tasks include file paths, patterns, dense keywords
- [ ] Pattern Reuse: Existing patterns leveraged via MIRROR/COPY
- [ ] PRP Alignment: Every task maps to PRP requirements, nothing extra
- [ ] Validation Completeness: Every task has test coverage

### Task List Completeness

- [ ] All PRP requirements covered by tasks
- [ ] Tasks ordered by dependencies
- [ ] Each task has clear action keywords (ADD, MODIFY, etc.)
- [ ] All tasks have validation/test coverage
- [ ] No missing critical steps
- [ ] No scope creep beyond PRP

### Red Flags (Remove Tasks if Found)

- [ ] Tasks not in PRP scope
- [ ] "Preparatory" tasks for future work
- [ ] Complex tasks needing multiple actions
- [ ] Tasks bundling unrelated changes

**Remember: Create the minimal task list that fulfills the PRP, nothing more.**
