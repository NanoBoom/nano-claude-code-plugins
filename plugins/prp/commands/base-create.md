# Create BASE PRP

## Feature: $ARGUMENTS

## PRP Creation Mission

Create a comprehensive PRP that enables **one-pass implementation success** through systematic research and context curation.

**Critical Understanding**: The executing AI agent only receives:

- Start by reading and understanding the prp concepts PRPs/README.md
- The PRP content you create
- Its training data knowledge
- Access to codebase files (but needs guidance on which ones)

**Therefore**: Your research and context curation directly determines implementation success. Incomplete context = implementation failure.

## Core Design Philosophy

**These principles guide PRP creation. When in doubt, do less.**

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
❌ "This supports 100 edge cases" → Only handle cases that actually occur
❌ "Build flexible framework for future needs" → Solve today's concrete problem
❌ "Abstract everything for reusability" → Write straightforward code that works
✅ "Does this feature solve a real, current problem?" → This is the filter
```

**Applied to PRP Creation:**

- Research: Only investigate directly relevant patterns, not theoretical possibilities
- Context: Only include files/docs actually needed for THIS feature
- Tasks: Only steps required for core functionality, not "nice to have"
- Validation: Only tests that verify essential behavior

## Research Process

> During the research process, create clear tasks and spawn as many agents and subagents as needed using the batch tools. The deeper research we do here the better the PRP will be. we optminize for chance of success and not for speed.

1. **Codebase Analysis in depth**
   - Create clear todos and spawn subagents to search the codebase for similar features/patterns Think hard and plan your approach
   - Identify all the necessary files to reference in the PRP
   - Note all existing conventions to follow
   - Check existing test patterns for validation approach
   - Use the batch tools to spawn subagents to search the codebase for similar features/patterns

2. **External Research at scale**
   - Create clear todos and spawn with instructions subagents to do deep research for similar features/patterns online and include urls to documentation and examples
   - Library documentation (include specific URLs)
   - For critical pieces of documentation add a .md file to PRPs/ai_docs and reference it in the PRP with clear reasoning and instructions
   - Implementation examples (GitHub/StackOverflow/blogs)
   - Best practices and common pitfalls found during research
   - Use the batch tools to spawn subagents to search for similar features/patterns online and include urls to documentation and examples

3. **User Clarification**
   - Ask for clarification if you need it

## PRP Generation Process

### Step 1: Choose Template

Use `PRPs/templates/prp_base.md` as your template structure - it contains all necessary sections and formatting.

### Step 2: Context Completeness Validation

Before writing, apply the **"No Prior Knowledge" test** from the template:
_"If someone knew nothing about this codebase, would they have everything needed to implement this successfully?"_

### Step 3: Research Integration

Transform your research findings into the template sections:

**Goal Section**: Use research to define specific, measurable Feature Goal and concrete Deliverable
**Context Section**: Populate YAML structure with your research findings - specific URLs, file patterns, gotchas
**Implementation Tasks**: Create dependency-ordered tasks using information-dense keywords from codebase analysis
**Validation Gates**: Use project-specific validation commands that you've verified work in this codebase

### Step 4: Information Density Standards

Ensure every reference is **specific and actionable**:

- URLs include section anchors, not just domain names
- File references include specific patterns to follow, not generic mentions
- Task specifications include exact naming conventions and placement
- Validation commands are project-specific and executable

### Step 5: ULTRATHINK Before Writing

After research completion, create comprehensive PRP writing plan using TodoWrite tool:

- Plan how to structure each template section with your research findings
- Identify gaps that need additional research
- Create systematic approach to filling template with actionable context

## Output

Save as: `PRPs/{feature-name}-base.md`

## PRP Quality Gates

### Design Philosophy Compliance (Must Pass First)

- [ ] ✅ Solves a REAL, CURRENT problem (not hypothetical)
- [ ] ✅ Solution is the SIMPLEST possible approach
- [ ] ✅ No "future-proofing" complexity added
- [ ] ✅ Every task/component justified by immediate need

### Context Completeness Check

- [ ] Passes "No Prior Knowledge" test from template
- [ ] All YAML references are specific and accessible
- [ ] Implementation tasks include exact naming and placement guidance
- [ ] Validation commands are project-specific and verified working

### Template Structure Compliance

- [ ] All required template sections completed
- [ ] Goal section has specific Feature Goal, Deliverable, Success Definition
- [ ] Implementation Tasks follow dependency ordering
- [ ] Final Validation Checklist is comprehensive

### Information Density Standards

- [ ] No generic references - all are specific and actionable
- [ ] File patterns point at specific examples to follow
- [ ] URLs include section anchors for exact guidance
- [ ] Task specifications use information-dense keywords from codebase

### Red Flags (Reject PRP if found)

- [ ] 🚫 "This could support..." (future speculation)
- [ ] 🚫 Tasks for features not in current requirements
- [ ] 🚫 "Flexible architecture for any use case"
- [ ] 🚫 Abstraction layers without concrete immediate use

## Success Metrics

**Confidence Score**: Rate 1-10 for one-pass implementation success likelihood

**Validation**: The completed PRP should enable an AI agent unfamiliar with the codebase to implement the feature successfully using only the PRP content and codebase access.
