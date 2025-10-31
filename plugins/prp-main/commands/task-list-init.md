# Create task list for PRP

**Create a comprehensive task list in PRPs/checklist.md for PRP $ARGIMENTS**

## Core Design Philosophy

**SOLID Principles - These principles guide task list creation.**

### 1. Single Responsibility Principle (SRP)

A class should have only one reason to change.

- Each task changes only ONE thing
- Don't bundle unrelated changes in the same task
- Clearly separate CREATE, MODIFY, and TEST
- Each task should be simple and atomic
- Break complex tasks into smaller, simpler steps

### 2. Open/Closed Principle (OCP)

Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.

- Complete tasks by extending existing code rather than modifying
- Reference existing patterns rather than recreating
- Use MIRROR/COPY keywords to leverage existing code
- Prefer extension strategies to implement new functionality

### 3. Liskov Substitution Principle (LSP)

Subtypes must be substitutable for their base types without affecting program correctness.

- Task execution should maintain system consistency
- New tasks should conform to existing execution patterns
- Follow established task format and conventions
- Ensure task outputs meet PRP expectations

### 4. Interface Segregation Principle (ISP)

Clients should not be forced to depend on methods they do not use.

- Don't create tasks unless they solve specific PRP requirements
- Each task must justify its existence
- Eliminate redundant or unnecessary steps
- If a task needs extensive explanation, split it

### 5. Dependency Inversion Principle (DIP)

High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.

- Tasks should depend on abstract PRP requirements rather than specific details
- Consolidate similar tasks where appropriate
- High-level task orchestration doesn't depend on specific implementation steps
- Use information-dense keywords to express abstract task intent

**Applied to Task Lists:**

- Task Definition: Each task focuses on a single operation (SRP)
- Execution Method: Use MIRROR/COPY to extend existing code (OCP)
- Task Format: Follow consistent task structure (LSP)
- Task Scope: Only include tasks explicitly required by PRP (ISP)
- Task Description: Use abstract keywords rather than specific details (DIP)

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
