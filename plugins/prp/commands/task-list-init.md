# Create task list for PRP

**Create a comprehensive task list in PRPs/checklist.md for PRP $ARGIMENTS**

## Core Design Philosophy

**These principles guide task list creation. When in doubt, do less.**

### 1. KISS - Keep It Simple, Stupid

- Each task should be simple and atomic
- Break complex tasks into smaller, simpler steps
- If a task needs extensive explanation, split it

### 2. Ockham's Razor - Entities should not be multiplied without necessity

- Don't create tasks unless they solve a specific PRP requirement
- Each task must justify its existence
- Eliminate redundant or unnecessary steps

### 3. YAGNI - You Aren't Gonna Need It

- **Only include tasks required by the PRP**
- No preparatory tasks for hypothetical future needs
- Skip "nice to have" tasks not in PRP scope

### 4. DRY - Don't Repeat Yourself

- Consolidate similar tasks where appropriate
- Reference existing patterns rather than recreating
- Use MIRROR/COPY keywords to leverage existing code

### 5. Single Responsibility Principle

- Each task changes ONE thing only
- Don't bundle unrelated changes in same task
- Separate CREATE, MODIFY, and TEST clearly

**Task List Reality Checks:**

```
❌ "Add this task in case we need it" → Only PRP requirements
❌ "Bundle these for efficiency" → Keep tasks atomic
❌ "Prepare for future extension" → Current scope only
✅ "Does the PRP explicitly require this?" → This is the filter
```

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

Save as: `PRPs/{task-summary}-checklist.md`

## Task List Quality Checklist

### Design Principle Compliance (Must Pass First)

- [ ] ✅ KISS: All tasks are simple and atomic
- [ ] ✅ Ockham's Razor: Every task justified by PRP requirements
- [ ] ✅ YAGNI: No tasks for hypothetical future needs
- [ ] ✅ DRY: Similar tasks consolidated, existing patterns reused
- [ ] ✅ SRP: Each task changes ONE thing only

### Task List Completeness

- [ ] All PRP requirements covered by tasks
- [ ] Tasks ordered by dependencies
- [ ] Each task has clear action keywords (ADD, MODIFY, etc.)
- [ ] All tasks have validation/test coverage
- [ ] No missing critical steps
- [ ] No scope creep beyond PRP

### Red Flags (Remove Tasks if Found)

- [ ] 🚫 Tasks not in PRP scope
- [ ] 🚫 "Preparatory" tasks for future work
- [ ] 🚫 Complex tasks needing multiple actions
- [ ] 🚫 Tasks bundling unrelated changes

**Remember: Create the minimal task list that fulfills the PRP, nothing more.**
