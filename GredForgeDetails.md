# GredForge

## Simplified Project Specification

**Version:** 0.2

---

# 1. What is GredForge?

GredForge is a **research organization and execution system**.

It takes a messy research idea and turns it into a structured workspace where the user can:

- Define a research question
- Organize the research
- Find and manage evidence
- Run experiments
- Validate results
- Record findings
- Reproduce previous work

For example:

> "I want to investigate whether sleep deprivation affects decision-making."

or:

> "What is the relationship between inflation and stock-market returns?"

GredForge turns that idea into an organized research project.

### What GredForge is not

GredForge is **not**:

- A chatbot that simply answers research questions
- A system that claims to do all research automatically
- A replacement for the researcher

The basic idea is:

> **Humans decide what they want to understand.  
> GredForge organizes the research.  
> Agents and tools help perform the work.**

---

# 2. Core Principles

## 2.1 Three layers

| Layer | Responsibility |
|---|---|
| **Human** | Purpose, decisions, interpretation |
| **GredForge** | Structure, workflow, records, validation |
| **Agents + Tools** | Research tasks, analysis, experiments, documentation |

The human remains responsible for the meaning and interpretation of the research.

---

## 2.2 Core vs. plugins

GredForge has two major parts:

### GredForge Core

The core contains the general research machinery.

It should work for:

- Quantitative finance
- Economics
- Biology
- Engineering
- History
- Machine learning
- Other research fields

### Forge Plugins

Plugins add knowledge and tools for a specific field.

For example:

```text
GredForge
│
├── Core
│
└── Plugins
    ├── QuantForge
    ├── EconForge
    ├── BioForge
    └── MLForge
```

The rule is simple:

> **If a feature is useful to almost every research field, it belongs in Core.  
> If it exists because of one specific field, it belongs in a plugin.**

---

## 2.3 Files are the source of truth

The research workspace should mainly use normal files:

- Markdown
- YAML
- JSON
- Data files
- Code
- Configuration files

This makes the project:

- Easy to inspect
- Easy to version with Git
- Easy to back up
- Compatible with Obsidian
- Usable even when GredForge is not running

GredForge should organize the files, not hide the research inside a proprietary database.

---

## 2.4 Containers are the laboratory

Docker or Podman should provide the research environment.

The user should not need to think about containers during normal use.

The basic idea is:

```text
GredForge
    ↓
Research Workflow
    ↓
Agent
    ↓
Sandbox
    ↓
Code + Data + Tools
    ↓
Results
```

The container exists to provide:

- Isolation
- Repeatable environments
- Safer code execution
- Controlled access to files and network

---

# 3. Project Scope

## GredForge should focus on

- Research organization
- Research workflows
- Experiment execution
- Evidence tracking
- Validation
- Reproducibility
- Agent-assisted research
- Knowledge organization

## GredForge should not initially become

### An automatic research generator

It should not promise:

> "Give us any topic and we will produce finished research."

That would turn the project into an unreliable AI essay generator.

### A plugin marketplace

A public ecosystem of community plugins can come much later.

### A hosted multi-user platform

The first version should be:

- Local-first
- Single-user
- Single-machine

### A replacement for existing tools

Where a good tool already exists, GredForge should use or wrap it instead of rebuilding it.

---

# 4. Research Intake

When a new research project starts, GredForge asks three basic questions.

## 4.1 Field

What field is the research about?

Examples:

- Quantitative finance
- Economics
- Biology
- Machine learning

## 4.2 Objective

What is the user trying to do?

Possible objectives:

- Explore a topic
- Answer a research question
- Test a hypothesis
- Reproduce existing research
- Build an experiment
- Conduct a literature review

## 4.3 Rigor

How carefully should the research be tracked?

### Quick exploration

For fast investigation.

### Structured research

Adds a defined question, scope, and plan.

### Reproducible research

Adds:

- Run records
- Pinned environments
- Data hashes
- Validation
- Replay

### Advanced/custom

The user chooses which requirements apply.

Example configuration:

```yaml
project: inflation_vs_returns

field: quantitative_finance

objective: answer_research_question

rigor: reproducible_research

plugins:
  - quantforge
```

---

# 5. Research Lifecycle

Every research field follows roughly the same process.

```text
Research Idea
      ↓
Research Intake
      ↓
Define Question
      ↓
Define Scope
      ↓
Create Research Plan
      ↓
Investigate
      ↓
Run Experiments
      ↓
Validate
      ↓
Synthesize Findings
      ↓
Document
      ↓
Reproduce
      ↓
Research Knowledge
```

Different plugins can specialize individual stages.

### Generic research

```text
Question
   ↓
Literature
   ↓
Data
   ↓
Experiment
   ↓
Validation
   ↓
Finding
```

### Quantitative research

```text
Hypothesis
   ↓
Financial Literature
   ↓
Market Data
   ↓
Signal
   ↓
Backtest
   ↓
Statistical Validation
   ↓
Finding
```

---

# 6. High-Level Architecture

```text
                         GREDFORGE
                             │
                             ▼
                       Research Planner
                             │
                             ▼
                          Router
                             │
                             ▼
                      Workflow Engine
                         │       │
                         │       │
                         ▼       ▼
                      Agents    Tools
                         │       │
                         └───┬───┘
                             ▼
                       Execution Layer
                             │
                             ▼
                       Sandbox / Container
                             │
                             ▼
                    Results + Run Records
                         │           │
                         ▼           ▼
                    Workspace       Git
                    / Obsidian
```

---

# 7. Main Components

## 7.1 GredForge Core

The core manages:

- Research projects
- Questions
- Hypotheses
- Scope
- Plans
- Workflows
- Tasks
- Runs
- Experiments
- Artifacts
- Evidence
- Findings
- Validation
- Provenance
- Reproducibility

The core should remain domain-independent.

---

## 7.2 Planner

The planner turns the user's research idea into a possible research plan.

For example:

```text
Research question
      ↓
Break into subtopics
      ↓
Identify required evidence
      ↓
Identify datasets
      ↓
Define experiments
      ↓
Create research plan
```

The plan is saved as a file.

---

## 7.3 Router

The router decides which workflow and tools are appropriate.

For example:

```text
User Request
     ↓
Router
     ├── Literature Workflow
     ├── Data Workflow
     ├── Experiment Workflow
     └── Coding Workflow
```

The router may eventually use rules, an AI model, or both.

Important:

> The router may recommend actions, but it should not independently bypass permission or safety controls.

---

## 7.4 Workflow Engine

The workflow engine executes the approved research plan.

A workflow contains nodes.

A node can be:

- A task
- A tool call
- A validator
- A human approval step

A useful distinction is:

```text
Workflow = reusable process

Plan = workflow prepared for one research project

Run = one execution of that plan

Artifact = file produced by that run
```

---

# 8. Agents

GredForge communicates with agents through an agent interface.

```text
GredForge Core
      ↓
Agent Interface
      ↓
Hermes
      +
Future Agents
```

The first major agent is **Hermes**.

Hermes can help with tasks such as:

- Finding literature
- Finding datasets
- Organizing evidence
- Exploring competing explanations
- Running research tasks
- Recording findings
- Identifying limitations

### Agent contract

A task sent to an agent should contain:

- Goal
- Inputs
- Allowed tools
- Resource budget
- Expected output format

The agent returns:

- Results
- Artifacts
- Structured output
- Execution transcript

Agent results are proposals until accepted by the human.

---

# 9. Human Approval Gates

Important decisions should have explicit approval points.

| Gate | Human decides |
|---|---|
| `approve_scope` | Is this the question and scope I actually want? |
| `approve_plan` | Is this the plan I want to run? |
| `approve_permissions` | What files, tools, network access, and resources may be used? |
| `accept_finding` | Do I accept this finding? |

Once a plan is approved, it becomes **frozen**.

The system executes the frozen version.

If an agent wants to add another step, it proposes a new version of the plan instead of silently changing the existing one.

This makes research runs easier to understand and reproduce.

---

# 10. Execution and Sandbox

The first version does not need a full container system.

## Stage 1

Run tasks as local subprocesses through an executor interface.

## Stage 2

Add Docker or Podman as the execution backend.

## Stage 3

Add stronger isolation and multiple specialized environments if needed.

The same executor interface should be used throughout.

```text
Workflow
   ↓
Executor Interface
   ├── Local Process
   └── Container
```

---

# 11. Sandbox Rules

When containers are used, the default should be restrictive.

| Area | Default |
|---|---|
| Workspace | Only the research workspace is available |
| Inputs | Read-only |
| Outputs | Written only to the run output directory |
| Network | Disabled unless explicitly allowed |
| User | Non-root |
| Engine | Rootless Docker/Podman preferred |
| CPU | Limited |
| Memory | Limited |
| Processes | Limited |
| Runtime | Time-limited |
| Secrets | Not available inside the sandbox |
| Filesystem | Mostly read-only |

The sandbox should never receive:

- Passwords
- SSH keys
- Personal files
- System directories

Agent commands and workflow commands should use the same sandbox mechanism.

---

# 12. Reproducibility

GredForge should clearly distinguish different levels of reproducibility.

## Recorded

The system records what happened.

Requires:

- Plan
- Notes
- Run log

## Rerunnable

The research can be executed again.

Requires:

- Pinned environment
- Saved inputs
- File hashes
- Code version

## Deterministic

A rerun produces the same output, or output within a declared tolerance.

Requires things such as:

- Fixed random seeds
- Fixed dependencies
- Fixed inputs
- Controlled threading
- No unexpected live network access

GredForge should never claim more reproducibility than it can actually demonstrate.

---

# 13. Run Manifest

Every research run should produce:

```text
runs/
└── run_0001/
    ├── run_manifest.yaml
    ├── run_summary.md
    └── outputs/
```

The manifest records information such as:

- Run ID
- Project
- Research question
- Hypothesis
- Workflow version
- Plugin version
- Git commit
- Environment
- Dataset hashes
- Parameters
- Random seed
- Agent configuration
- Validation results
- Output files
- Approval decisions
- Execution status

Example:

```yaml
run_id: run_0007

project: inflation_vs_returns

workflow:
  name: baseline_study
  version: 3

git_commit: <commit>

environment:
  image_digest: <digest>
  python_version: <version>
  lockfile_hash: <hash>

inputs:
  - path: datasets/raw/prices.parquet
    sha256: <hash>

parameters:
  lookback_months: 12
  cost_bps: 5

random_seed: 42

agent:
  name: hermes
  model: <model_id>

validation:
  - validator: lookahead_bias
    status: pass

outputs:
  - path: outputs/result.parquet
    sha256: <hash>
```

The exact format can evolve.

The important thing is that each run has a clear record of what happened.

---

# 14. Validation

Validation is one of the important parts of GredForge.

A result can have one of four states:

- `pass`
- `warn`
- `fail`
- `not_applicable`

A failed validation can block a finding at higher research rigor levels unless the human explicitly overrides it and records why.

## Core validators

These can apply to every research field.

### Provenance check

Does the run contain the information required by its research rigor?

### Replay check

Can the run be reproduced within the declared tolerance?

### Citation check

Does each finding have supporting evidence?

### Plan deviation check

Did the actual experiment differ from the approved plan?

### Trial count

How many different experiments or attempts were performed?

This matters because trying many approaches and only reporting the successful one can create misleading results.

---

# 15. QuantForge Validators

QuantForge can add domain-specific validation.

Initial examples:

| Validator | Purpose |
|---|---|
| Look-ahead bias | Detect use of future information |
| Survivorship bias | Detect missing failed or delisted assets |
| Data leakage | Detect information leaking between training and testing |
| Overfitting | Track repeated trials and test robustness |

Each validator should have tests using deliberately broken examples.

A validator is not finished until it:

1. Detects the planted problem.
2. Passes a clean example.

---

# 16. Workspace

The workspace should also work as an Obsidian vault.

Example:

```text
my_research_project/
│
├── gredforge.yaml
│
├── questions/
│
├── literature/
│
├── sources/
│
├── concepts/
│
├── data/
│
├── experiments/
│
├── findings/
│
├── plans/
│
├── runs/
│   └── run_0001/
│       ├── run_manifest.yaml
│       ├── run_summary.md
│       └── outputs/
│
├── datasets/
│   ├── raw/
│   └── processed/
│
├── env/
│
└── .git/
```

GredForge should mainly create and update normal files.

Obsidian does not need to be running.

---

# 17. Research Knowledge

The workspace should connect research objects.

For example:

```text
Question
   ↓
Source
   ↓
Evidence
   ↓
Experiment
   ↓
Run
   ↓
Finding
```

A finding could look like:

```yaml
---
type: finding
status: proposed

question: "[[q_001]]"

evidence:
  - "[[src_004]]"
  - "[[src_007]]"

runs:
  - run_0007

validation:
  lookahead_bias: pass
  trial_count: 7
---
```

Possible finding states:

```text
proposed
    ↓
verified
    ↓
accepted
```

A finding can also be rejected.

---

# 18. Git

Git stores the history of:

- Research notes
- Plans
- Code
- Configuration
- Run manifests

Large or licensed datasets should not automatically be committed.

Instead, GredForge should record their:

- Location
- Version
- Hash
- Relevant metadata

This allows the system to track data without unnecessarily putting large files into Git.

---

# 19. Research Map

A visual research map is useful, but it is not an early priority.

The first version should use Obsidian's existing graph and canvas features.

A custom GredForge research map can be added later if those tools are not enough.

---

# 20. QuantForge

QuantForge is the first major domain plugin.

It should demonstrate that the GredForge architecture works for quantitative research.

Possible capabilities:

- Financial data
- Factor research
- Statistical testing
- Backtesting
- Portfolio analysis
- Alpha research
- Market microstructure

The important distinction is:

> **QuantForge is a demonstration of GredForge's architecture, not the definition of GredForge itself.**

---

# 21. Plugin System

The plugin API should **not** be finalized too early.

First:

1. Build the core.
2. Build the first domain implementation.
3. Identify what is genuinely reusable.
4. Extract the plugin interface.
5. Test it with a second domain.
6. Only then stabilize the plugin API.

Possible plugin structure:

```text
gredforge/
│
├── core/
│   └── research machinery
│
├── domains/
│   └── quant/
│
└── plugins/
    └── extracted plugins later
```

Domain code should not be imported directly into the core.

This keeps the boundary clear even before the formal plugin system exists.

---

# 22. Development Roadmap

## Phase 0: Define the foundation

Create:

- Core data model
- Run manifest format
- Basic acceptance test

---

## Phase 1: Walking Skeleton

Build a simple CLI.

First commands could include:

```bash
gredforge init
gredforge run
```

The first version should:

- Create a workspace
- Create a basic plan
- Ask for approval
- Run a simple workflow
- Produce a run manifest
- Store results

No containers are required yet.

---

## Phase 2: Sandbox and Replay

Add:

- Container execution
- Environment pinning
- Dataset hashing
- Replay

Target:

> Run a research project again on a clean machine and reproduce the result within the declared tolerance.

---

## Phase 3: First Quant Domain

Add:

- Financial data handling
- Basic backtesting
- As-of data handling
- Quant validators
- Trial tracking
- Tests with intentionally broken strategies

The quant code should remain separate from the core.

---

## Phase 4: Agent-Assisted Research

Connect Hermes for:

- Literature discovery
- Dataset discovery
- Evidence organization
- Source tracking
- Research notes

Add:

- Citation validation
- Source snapshots
- Finding approval
- Better research links

---

## Phase 5: Plugin API

Extract the plugin interface from working code.

Then build a second, different domain.

If both domains work without changing the core, the architecture is probably general enough.

Only then freeze the first stable plugin API.

---

## Phase 6: Optional Expansion

Only after the core works:

- Local web interface
- Custom research map
- Multiple containers
- Plugin installation
- Community plugins
- Other Forge projects

---

# 23. Acceptance Test

The first serious end-to-end test should use one real research question.

GredForge should be able to:

1. Create a workspace from the research intake.
2. Create a research plan.
3. Get human approval.
4. Freeze the plan.
5. Execute the plan.
6. Produce a run manifest.
7. Run validators.
8. Detect intentionally broken research.
9. Replay the run.
10. Open the resulting workspace in Obsidian.
11. Link the question, sources, experiments, runs, and findings.

If this works, GredForge has a real foundation.

---

# 24. Important Open Decisions

These questions should be answered during development rather than guessed now.

## Agents

- Exactly what does Hermes handle?
- Which features should Hermes provide?
- Which features should GredForge provide?
- Does Hermes run outside the sandbox while research code runs inside it?

## Router

- Should the router use rules, an AI model, or both?
- What decisions can it make automatically?
- What decisions require human approval?

## Planning

- How much can a plan change during execution?
- Current rule: changes require a new plan version.

## Existing tools

Before building custom systems, evaluate whether GredForge should use existing tools for:

- Workflow execution
- Experiment tracking
- Data versioning
- Provenance
- Packaging

## Data

For the first QuantForge project:

- Which dataset?
- What license?
- Is it point-in-time?
- Does it include delisted assets?
- How will large data be stored?

## Technology

Python is the current assumed language for the core.

The execution layer should remain compatible with both Docker and Podman.

---

# 25. The GredForge Spine

The entire project can be reduced to this:

```text
                 HUMAN
                   │
                   ▼
             Research Idea
                   │
                   ▼
              GredForge
                   │
          ┌────────┼────────┐
          ▼        ▼        ▼
       Planning  Workflow  Knowledge
          │        │
          └────┬───┘
               ▼
             Agents
               │
               ▼
             Tools
               │
               ▼
        Sandbox / Execution
               │
               ▼
           Validation
               │
               ▼
            Findings
               │
               ▼
       Reproducible Knowledge
```

And the architectural rule remains:

> **Core provides the research machinery.  
> Plugins provide the domain expertise.**

The first goal is not to build the entire Forge ecosystem.

The first goal is to make this spine work reliably from beginning to end.
