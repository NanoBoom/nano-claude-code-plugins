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

**SOLID Principles - These principles guide PRP creation.**

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

**Applied to PRP Creation:**

- Research: Each research module focuses on a single aspect of analysis (SRP)
- Context: Design extensible component structures without modifying core (OCP)
- Tasks: Ensure derived tasks conform to basic implementation flow (LSP)
- Interfaces: Provide specialized interfaces for different execution phases (ISP)
- Validation: Depend on abstract test definitions, not concrete implementation details (DIP)

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
