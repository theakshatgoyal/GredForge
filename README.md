# GredForge
# GredForge Architecture Spine

## Core Principle

> **GredForge is a domain-agnostic research infrastructure platform. Its
> core provides the universal machinery for structuring, executing,
> validating, documenting, and reproducing research. Domain-specific
> knowledge, tools, workflows, and validators are supplied through
> modular Forge plugins.**

Short version:

> **Core provides the research machinery. Plugins provide the domain
> expertise.**

------------------------------------------------------------------------

# 1. Vision

GredForge should not become a collection of unrelated features. The
architecture should begin with a universal research engine and allow
specialized research domains to grow as plugins.

The key separation:

-   **GredForge Core owns the research process.**
-   **Plugins own domain expertise.**

This avoids a fragile architecture where every new field becomes another
collection of special cases.

------------------------------------------------------------------------

# 2. High-Level Architecture

``` text
                         GREDFORGE
                    Research, organized.
                            |
              +-------------+-------------+
              |                           |
        Core Research Engine        Plugin Ecosystem
              |                           |
      +-------+--------+          +-------+--------+
      |       |        |          |       |        |
   Planning Workflow Knowledge  Quant  Biology Economics
                                |
                            QuantForge
```

------------------------------------------------------------------------

# 3. GredForge Core

The core should understand universal research concepts:

-   Research questions
-   Hypotheses
-   Scope
-   Sources
-   Data
-   Experiments
-   Tasks
-   Agents
-   Workflows
-   Validation
-   Findings
-   Evidence
-   Citations
-   Provenance
-   Reproducibility
-   Research notes
-   Knowledge graphs
-   Projects
-   Runs

The core should not know whether research is finance, biology,
economics, engineering, or any other discipline.

------------------------------------------------------------------------

# 4. Plugin Architecture

Example structure:

``` text
GredForge
|
+-- Core
|
+-- Plugins
|   |
|   +-- QuantForge
|   +-- BioForge
|   +-- EconForge
|   +-- ChemForge
|   +-- SocialForge
|   +-- MLForge
|
+-- User Plugins
```

A plugin provides domain capabilities:

``` yaml
plugin:
  name: QuantForge
  domain: quantitative_finance

capabilities:
  - market_data
  - factor_research
  - backtesting
  - portfolio_analysis
  - statistical_testing

validators:
  - lookahead_bias
  - survivorship_bias
  - data_leakage
  - overfitting
```

GredForge only asks:

> What capabilities does this plugin provide?

------------------------------------------------------------------------

# 5. QuantForge as the First Major Plugin

QuantForge should not be the entire application.

Instead:

``` text
GredForge
|
+-- Research Core
|
+-- QuantForge
    |
    +-- Quant Research
    +-- Backtesting
    +-- Market Data
    +-- Statistical Finance
    +-- Portfolio Research
```

The user interacts with one application while plugins provide
specialized research abilities.

------------------------------------------------------------------------

# 6. Universal Research Lifecycle

Every domain follows the same backbone:

``` text
Research Idea
      |
    Define
      |
   Structure
      |
 Investigate
      |
     Test
      |
  Validate
      |
 Synthesize
      |
 Document
      |
 Reproduce
      |
 Knowledge
```

Example:

## Generic Research

Question → Literature → Data → Experiment → Validation → Finding

## QuantForge

Hypothesis → Market Literature → Market Data → Signal → Backtest →
Statistical Validation → Finding

------------------------------------------------------------------------

# 7. Modular Agents

Agents should also be separated from the core.

``` text
GredForge Core
      |
Agent Interface
      |
+-----+-----+
|           |
Hermes   Future Agents
```

Architecture responsibility:

-   GredForge decides what needs to happen.
-   Plugins provide domain tools.
-   Agents execute tasks.

------------------------------------------------------------------------

# 8. Docker and Reproducibility

Docker should support experiments rather than be a visible feature.

``` text
GredForge
    |
 Workflow
    |
 Agent
    |
 Execution Environment
    |
 Docker
    |
 Code + Dependencies + Dataset + Tools
```

A research run should preserve:

-   Question
-   Hypothesis
-   Workflow version
-   Plugin version
-   Git commit
-   Dataset hash
-   Docker image
-   Python version
-   Parameters
-   Random seed
-   Agent configuration
-   Validation results
-   Outputs

A research experiment becomes a reproducible computational object.

------------------------------------------------------------------------

# 9. Technology Roles

  Component   Role
  ----------- ---------------------
  GredForge   Research engine
  Docker      Research laboratory
  Hermes      Research worker
  Obsidian    Research memory
  Git         Version history
  Plugins     Domain expertise

Each technology exists for a reason, not because the project needed a
checklist of buzzwords.

------------------------------------------------------------------------

# 10. Development Roadmap

## Phase 1: Core

Build:

``` text
Research setup
    |
Workspace
    |
Workflow
    |
Agent
    |
Experiment
    |
Result
    |
Knowledge
```

Do not start with QuantForge or an ecosystem.

------------------------------------------------------------------------

## Phase 2: Workflow Engine

Introduce:

-   Workflow
-   Node
-   Task
-   Agent
-   Tool
-   Validator
-   Run
-   Artifact

------------------------------------------------------------------------

## Phase 3: Reproducibility

Add:

-   Git integration
-   Docker environments
-   Dataset hashes
-   Environment metadata
-   Research receipts
-   Replay capability

------------------------------------------------------------------------

## Phase 4: Obsidian Integration

Create structured knowledge:

``` text
Research
|
+-- Questions
+-- Sources
+-- Data
+-- Experiments
+-- Findings
+-- Concepts
```

------------------------------------------------------------------------

## Phase 5: Plugin API

Create a stable plugin interface:

``` python
class GredForgePlugin:
    name
    version
    domain

    capabilities()
    workflows()
    tools()
    validators()
    schemas()
```

------------------------------------------------------------------------

## Phase 6: QuantForge

Add:

-   Financial datasets
-   Factor research
-   Statistical tests
-   Backtesting
-   Portfolio analysis
-   Market microstructure
-   Alpha research
-   Quant validators

------------------------------------------------------------------------

# 11. Long-Term Ecosystem

``` text
                 GREDFORGE
                    |
       +------------+------------+
       |            |            |
   QuantForge   EconForge    BioForge
       |
   +---+---+
   |       |
  FX    Equity
```

Future plugin ecosystem:

-   Official plugins
-   Community plugins
-   Private plugins
-   Institutional plugins

Example:

``` bash
gredforge plugin install quantforge
gredforge plugin install bioforge
```

------------------------------------------------------------------------

# Final Architectural Rule

A feature belongs in **GredForge Core** if it applies equally to:

-   Quant researchers
-   Biologists
-   Economists
-   Engineers
-   Historians
-   Students

A feature belongs in a **Forge Plugin** if it exists because of a
specific domain.

The spine:

> **Core provides the research machinery. Plugins provide the domain
> expertise.**
