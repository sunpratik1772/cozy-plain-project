export interface DocPageContent {
  title: string;
  description: string;
  breadcrumb: string[];
  sections: DocPageSection[];
}

export interface DocPageSection {
  id: string;
  title: string;
  level: "h2" | "h3";
  content: string;
  listItems?: string[];
  orderedList?: boolean;
}

export const documentationPages: Record<string, DocPageContent> = {
  overview: {
    title: "Overview",
    description: "What dbSherpa Studio is and how the Studio, Sherpa copilot, and workflow engine fit together.",
    breadcrumb: ["Getting Started", "Overview"],
    sections: [
      {
        id: "what-is-dbsherpa-studio",
        title: "What is dbSherpa Studio?",
        level: "h2",
        content: "dbSherpa Studio is a visual workflow-automation platform. You drag nodes onto a canvas, wire them into a directed acyclic graph, and click Run — the backend executes each node in topological order and streams progress back over SSE. For anything you'd rather describe than draw, Sherpa (the built-in AI copilot) turns a plain-English request into a validated, runnable workflow on the same canvas."
      },
      {
        id: "core-capabilities",
        title: "Core capabilities",
        level: "h2",
        content: "The platform is built around a small set of ideas that show up everywhere in the product:",
        listItems: [
          "A node-based Studio canvas (React Flow) for building pipelines visually",
          "A FastAPI backend that validates and executes workflow DAGs with live SSE updates",
          "Sherpa, an AI copilot that generates, edits, and explains workflows through chat",
          "MCP integrations for Jira, Confluence, and GitHub, plus direct nodes for Slack, Gmail, Telegram, Notion, and Microsoft Teams",
          "A scheduler for running saved workflows on a cron or interval automation"
        ]
      },
      {
        id: "how-it-fits-together",
        title: "How it fits together",
        level: "h2",
        content: "The frontend is a React 18 + TypeScript + Vite single-page app using Zustand for editor/run/copilot state and TanStack Query for read-mostly library data. It talks to a Python 3.11 FastAPI backend over REST and Server-Sent Events. The backend's DAG runner executes node handlers in order, the generation harness (Sherpa's brain) turns prompts into workflow JSON, and an HTTP MCP bridge fans out to external tools like Jira and Confluence."
      },
      {
        id: "who-its-for",
        title: "Who it's for",
        level: "h2",
        content: "dbSherpa Studio is aimed at data engineers, surveillance analysts, and operations teams who need to stand up a data pipeline — extract, transform, notify, publish — without shipping a full application. Most workflows combine a data source, a few transforms, an optional AI step, and an output or integration node."
      },
      {
        id: "getting-help",
        title: "Getting help",
        level: "h2",
        content: "Start with Quickstart to get the stack running locally, then Architecture for the system-wide picture. Building a custom node or onboarding a new dataset each have their own dedicated guide under Building Workflows and Integrations."
      }
    ]
  },
  architecture: {
    title: "Architecture",
    description: "System diagram: Studio UI, FastAPI backend, DAG runner, generation harness, and MCP bridge.",
    breadcrumb: ["Getting Started", "Architecture"],
    sections: [
      {
        id: "system-overview",
        title: "System overview",
        level: "h2",
        content: "The Studio UI (React Flow canvas, right panel, Copilot panel, bottom output panel) talks to the FastAPI backend on port 8001 over HTTP and SSE, all under the /api/* prefix. The backend routes requests to one of three engines: the DAG runner (executes workflows), the generation harness (Sherpa builds and edits workflows), and the node registry (serves palette metadata to the canvas). A separate MCP bridge process on port 8765 handles Jira, Confluence, and GitHub calls and is auto-started by the backend when a workflow needs it."
      },
      {
        id: "backend-packages",
        title: "Backend packages",
        level: "h2",
        content: "The backend is organized by responsibility, not by layer:",
        listItems: [
          "connectors/ — dataset catalog and connector implementations (\"what data exists\")",
          "generation/ — Sherpa's AgentRunner, planner, and repair pipeline (\"how Copilot builds workflows\")",
          "integrations/mcp/ — live GitHub, Jira, and Confluence tool implementations",
          "engine/ — the DAG runner, validator, and node YAML + Python handler pairs",
          "copilot/ — routing, clarification, and SSE adapters that sit between the API and the generation harness",
          "mcp_bridge/ — the HTTP demo/live MCP server on :8765",
          "app/ — FastAPI routers, the persistence layer, and the automations scheduler"
        ]
      },
      {
        id: "request-lifecycle-run",
        title: "Request lifecycle: running a workflow",
        level: "h2",
        content: "POST /api/run/stream receives workflow JSON, validates the DAG, creates a RunContext, and topologically sorts the nodes. For each node it looks up the registered handler, builds the incoming outputs from upstream nodes, emits an SSE node_start event, calls the handler, type-checks the output against declared ports, applies it to the RunContext, and emits node_complete (or node_error). A final workflow_complete event carries the aggregated result."
      },
      {
        id: "request-lifecycle-generate",
        title: "Request lifecycle: Sherpa generating a workflow",
        level: "h2",
        content: "POST /api/copilot/generate/stream hands the scenario to an AgentRunner, which classifies intent, gathers dataset and skill context, calls Gemini for a first-pass workflow, canonicalizes type IDs, validates the DAG, applies deterministic auto-fixes, and — if still invalid — asks Gemini to repair it (up to a configurable number of attempts). Once the workflow passes a runtime smoke test it's streamed back to the canvas and auto-saved as a draft."
      },
      {
        id: "llm-layer",
        title: "LLM layer",
        level: "h2",
        content: "Every call to Gemini goes through a single adapter module (backend/llm/gemini_adapter.py). Sherpa routing, the generation harness, run analysis, and the AI Agent node all import from this one seam, which is what makes switching between Google AI API keys and Vertex AI a one-file change."
      },
      {
        id: "deployment",
        title: "Deployment",
        level: "h2",
        content: "Locally, ./start.sh kills anything already bound to :8001/:3000 and starts the backend (uvicorn) and frontend (Vite dev server) together. For containers, the backend and frontend each have their own Dockerfile; in production the frontend image runs nginx and reverse-proxies /api/* to the backend URL, and the same image is promoted across dev, staging, and prod by changing a single environment variable on Cloud Run."
      }
    ]
  },
  quickstart: {
    title: "Quickstart",
    description: "Clone the repo, set your Gemini API key, and run your first workflow.",
    breadcrumb: ["Getting Started", "Quickstart"],
    sections: [
      {
        id: "clone-and-run",
        title: "Clone and run",
        level: "h2",
        content: "Getting a local stack running takes three steps:",
        listItems: [
          "Clone the repository and change into it",
          "Create backend/.env with a single line: GEMINI_API_KEY=your_key_here",
          "Run ./start.sh — it starts the backend on :8001 and the frontend dev server on :3000"
        ],
        orderedList: true
      },
      {
        id: "services",
        title: "Services",
        level: "h2",
        content: "Once the stack is up, three services should respond:",
        listItems: [
          "Studio UI — http://localhost:3000",
          "Backend API — http://localhost:8001/api/health",
          "MCP bridge — http://localhost:8765/health (auto-started on demand)"
        ]
      },
      {
        id: "log-in",
        title: "Log in",
        level: "h2",
        content: "Open the Studio UI and choose \"Login as Demo User\" for a local dev account. Production deployments support email/password registration and Google OAuth."
      },
      {
        id: "load-a-demo-workflow",
        title: "Load and run a demo workflow",
        level: "h2",
        content: "The fastest way to see the whole loop end to end:",
        listItems: [
          "Open the Workflow drawer from the left nav",
          "Open any bundled studio_*.json demo workflow",
          "Click Run in the canvas toolbar or topbar",
          "Switch the activity rail to Output to watch each node's result stack up"
        ],
        orderedList: true
      },
      {
        id: "try-sherpa",
        title: "Try Sherpa",
        level: "h2",
        content: "Open the Sherpa panel from the activity rail and switch to Build mode. Try a prompt like \"Load leads.csv, keep rows with score over 80, and send a summary to Slack.\" Watch the streaming timeline move through analyzing, planning, generating, and a runtime smoke test before the workflow lands on the canvas."
      }
    ]
  },
  "node-catalogue": {
    title: "Node Catalogue",
    description: "All node types available on the Studio canvas, grouped by palette section.",
    breadcrumb: ["Building Workflows", "Node Catalogue"],
    sections: [
      {
        id: "palette-sections",
        title: "Palette sections",
        level: "h2",
        content: "The node palette groups every node into one of seven sections. Each node is defined as a paired YAML spec and Python handler under backend/engine/nodes/, and the registry auto-discovers them at startup — nothing needs manual registration.",
        listItems: [
          "Triggers — start a run",
          "Data — read rows from a source",
          "Transform — reshape rows",
          "Logic — branch, loop, or run custom code",
          "AI — call an LLM or evaluate data quality",
          "Integrations — call external services (Jira, Confluence, GitHub, Slack, and more)",
          "Output — produce a final artifact or annotation"
        ]
      },
      {
        id: "triggers",
        title: "Triggers",
        level: "h2",
        content: "Trigger nodes have no inputs and produce the initial payload for the run:",
        listItems: [
          "Manual Trigger — the default starting point; click Run to fire it",
          "API Trigger — starts the workflow from an external POST to a configured path",
          "Webhook — like API Trigger, with an optional shared-secret for verification",
          "Schedule — a cron-based trigger for recurring batch jobs"
        ]
      },
      {
        id: "data-nodes",
        title: "Data",
        level: "h2",
        content: "Data nodes read from a source and produce a rows dataframe:",
        listItems: [
          "CSV Extract — load rows from a registered dataset (leads.csv, orders.csv, hs_alerts, and others)",
          "DB Query — run a SQL SELECT against a scoped source",
          "HTTP Request — fetch an external REST endpoint and flatten the JSON response into rows",
          "PDF Extract — pull rows of extracted text out of a PDF"
        ]
      },
      {
        id: "transform-nodes",
        title: "Transform",
        level: "h2",
        content: "Transform nodes take rows in and produce rows out — filtering, sorting, grouping, joining, renaming, or deduplicating:",
        listItems: [
          "Filter — keep rows matching a predicate",
          "Sort — order rows by a column",
          "Group By — aggregate rows with sum, avg, min, max, or count",
          "Join — combine two upstream tables on matching keys (inner, left, right, or outer)",
          "Map / Transform — rename columns and add derived columns",
          "Select Columns — narrow a wide table before export",
          "Deduplicate — drop duplicate rows by key column",
          "Merge — recombine two branches with concat or union"
        ]
      },
      {
        id: "logic-and-ai",
        title: "Logic and AI",
        level: "h2",
        content: "Logic nodes control flow; AI nodes call an LLM or grade data quality:",
        listItems: [
          "Transform (Starlark) — the workhorse escape hatch for custom logic in a hermetic sandbox (no imports, no filesystem, no network)",
          "Condition — routes rows to true/false branches without dropping any",
          "Router — multi-way routing to N branches based on an expression",
          "Function — full-Python escape hatch for logic that needs more than Starlark allows",
          "Loop / Pause — iteration context and rate-limiting between steps",
          "AI Agent — sends rows and a prompt to Gemini, either as one bulk summary or per-row enrichment",
          "Evaluator — pass/fail quality gate against an expression, with an overall pass rate"
        ]
      },
      {
        id: "integrations-and-output",
        title: "Integrations and Output",
        level: "h2",
        content: "Integration nodes call external services, and output nodes produce a final artifact:",
        listItems: [
          "Jira MCP / Confluence MCP / GitHub MCP — the preferred, typed nodes for Atlassian and GitHub work through the MCP bridge",
          "GitHub, Gmail, Slack, Telegram, Notion — direct nodes that call the provider's own API",
          "Microsoft Teams / Outlook — manual-add nodes; Teams sends via an incoming webhook today, Outlook validates credentials but mail send isn't wired up yet",
          "CSV Output / Excel Export — serialize rows to a downloadable file",
          "Response — a terminal node that surfaces a human-readable result",
          "Note — a canvas comment with no runtime effect"
        ]
      }
    ]
  },
  "creating-nodes": {
    title: "Creating Custom Nodes",
    description: "Add a new node type to the Studio palette: a YAML spec plus a Python handler.",
    breadcrumb: ["Building Workflows", "Creating Custom Nodes"],
    sections: [
      {
        id: "two-file-change",
        title: "A two-file change",
        level: "h2",
        content: "Adding a node to the palette means creating backend/engine/nodes/<type_id>.yaml and backend/engine/nodes/<type_id>.py, then regenerating build artifacts. The YAML is the single source of truth for metadata; the Python file holds only runtime logic and a one-line call that wires the two together."
      },
      {
        id: "the-yaml-spec",
        title: "The YAML spec",
        level: "h2",
        content: "Each node YAML declares:",
        listItems: [
          "type_id, description — the internal identifier and the palette tooltip",
          "ui — display_name, icon (a Lucide icon name), color, and which palette section it belongs to",
          "input_ports / output_ports — port name, type (dataframe, text, object, scalar, or any), and whether the port is optional",
          "params — each field's type, widget (text, number, switch, select, json, code, password, and more), default, and optional visible_if conditions",
          "constraints — free-text rules surfaced to Copilot and reviewers"
        ]
      },
      {
        id: "the-python-handler",
        title: "The Python handler",
        level: "h2",
        content: "Handlers use one of two signatures. A 2-parameter run(node, ctx) is for source/trigger nodes that produce data without any upstream input. A 3-parameter run(node, ctx, incoming) is for transform nodes — the registry auto-detects the incoming parameter and wires upstream outputs into it. Handlers that produce a dataframe should return a dict with rows and rowCount."
      },
      {
        id: "registry-auto-discovery",
        title: "Registry auto-discovery",
        level: "h2",
        content: "At import time, the registry walks backend/engine/nodes/, imports each module, and picks up its module-level NODE_SPEC. It inspects the handler's signature to decide whether to call it directly or wrap it with the orchestrator runtime that injects upstream outputs. You never need to touch registry.py or dag_runner.py to add a node."
      },
      {
        id: "regenerate-artifacts",
        title: "Regenerate artifacts",
        level: "h2",
        content: "After adding or changing a node YAML, run the generator script, which is the only supported way to update these four generated files:",
        listItems: [
          "python backend/scripts/gen_artifacts.py",
          "Regenerates: engine/node_type_ids.py, contracts/node_contracts.json",
          "Regenerates: frontend/src/nodes/generated.ts, node_detail.md"
        ],
        orderedList: true
      },
      {
        id: "testing",
        title: "Testing",
        level: "h2",
        content: "Add a smoke test that asserts the node is registered and its handler behaves as expected, and optionally a full workflow integration test using dag_runner.run_workflow(). For nodes intended for Copilot generation, add a demo workflow JSON under backend/good_examples/ so the harness's retriever and end-to-end test suite can exercise it."
      }
    ]
  },
  "studio-basics": {
    title: "Studio Basics",
    description: "How the visual canvas, node panel, and run/output panels work together.",
    breadcrumb: ["Building Workflows", "Studio Basics"],
    sections: [
      {
        id: "canvas-layout",
        title: "Canvas layout",
        level: "h2",
        content: "The Studio shell has five regions: a left nav for opening library drawers (Workflows, Skills, Data Sources, Automations), a topbar for run/save/validate actions, a node palette with ⌘K search, the React Flow canvas itself, and a right panel that switches between node config, run logs, and the Sherpa copilot. A bottom output panel appears once a run has produced results."
      },
      {
        id: "building-a-workflow",
        title: "Building a workflow",
        level: "h2",
        content: "The basic loop for building by hand:",
        listItems: [
          "Drag a node from the palette onto the canvas",
          "Wire edges between nodes to form the DAG",
          "Select a node and configure its parameters in the right panel",
          "Watch inline validation badges as you wire and configure",
          "Click Run"
        ],
        orderedList: true
      },
      {
        id: "running-a-workflow",
        title: "Running a workflow",
        level: "h2",
        content: "Clicking Run streams Server-Sent Events back to the canvas: node_start marks a node as running, node_complete or node_error marks its final state, and workflow_complete finalizes the run log. The bottom output panel stacks each finished node as an expandable card, followed by a Final Output section with the overall disposition and any downloadable files."
      },
      {
        id: "workflow-json-shape",
        title: "Workflow JSON shape",
        level: "h2",
        content: "A workflow is a JSON document with a name, a list of nodes (each with an id, type, label, and config), and a list of edges using from/to keys — not React Flow's internal source/target naming. Node ids conventionally follow the n01, n02, … pattern."
      },
      {
        id: "saved-workflows-and-drafts",
        title: "Saved workflows and drafts",
        level: "h2",
        content: "Explicitly saved workflows live in the workflows table, one namespace per user. Anything in progress — including everything Sherpa generates — is auto-saved to the separate drafts table so a save doesn't clobber your published library. A draft can be promoted to a saved workflow from the Workflow drawer."
      }
    ]
  },
  "agent-harness": {
    title: "Sherpa Agent Harness",
    description: "How a chat message becomes a routed action: intent classification, clarification, and plan approval.",
    breadcrumb: ["Sherpa & Copilot", "Agent Harness"],
    sections: [
      {
        id: "what-sherpa-does",
        title: "What Sherpa does",
        level: "h2",
        content: "Sherpa is the chat surface in the Studio right panel. Every message you send passes through a stack of gates before any handler runs: slash-command parsing, an LLM router, deterministic follow-up overrides, a build-plan gate, an intent/disposition layer, and a clarification check. Only after all of that does Sherpa actually build, answer, load, automate, or explain a run."
      },
      {
        id: "routing-pipeline",
        title: "Routing pipeline",
        level: "h2",
        content: "A single call to POST /api/copilot/route runs the whole pipeline in order:",
        listItems: [
          "Slash command parse — explicit commands like /build or /run skip the LLM entirely",
          "LLM router — classifies intent as build, ask, automate, load, explain_run, explain_error, or query_run_data",
          "Heuristic overrides — deterministic rules for short answers like \"yes\" or \"do it\" that must not depend on model luck",
          "Build plan gate — decides whether to draft a numbered plan before touching the canvas",
          "Intent layer — resolves a disposition (plan, answer, or clarify) for the UI's activity chip",
          "Clarification — decides whether Sherpa needs to ask a follow-up question before proceeding"
        ]
      },
      {
        id: "disposition-modes",
        title: "Disposition modes",
        level: "h2",
        content: "Every routed message resolves to one of three dispositions, which drives the activity chip shown while Sherpa is working:",
        listItems: [
          "plan — draft a numbered plan before making canvas changes",
          "answer — respond directly (Q&A, run review, load, canvas edits, sample runs)",
          "clarify — ask for missing information before a brand-new build"
        ]
      },
      {
        id: "plan-approval",
        title: "Plan approval",
        level: "h2",
        content: "New builds go through a plan-first gate: Sherpa proposes a numbered plan and waits for approval before generating anything on the canvas. Editing an existing workflow, or a fix plan proposed after reviewing a run, skips this gate — those go straight to generation since the user has already reviewed the relevant context."
      },
      {
        id: "clarification-questions",
        title: "Clarification questions",
        level: "h2",
        content: "Sherpa only asks a clarifying question when a build request is genuinely ambiguous, when a named workflow can't be resolved, or when a run-data question needs to disambiguate between metadata, rows, or both. Slash commands, sample-run confirmations, and canvas edits never trigger a clarification prompt."
      },
      {
        id: "key-endpoints",
        title: "Key endpoints",
        level: "h2",
        content: "The full Sherpa surface lives under /api/copilot:",
        listItems: [
          "POST /copilot/route — classify a message and optionally return a clarification prompt",
          "POST /copilot/clarify/resolve — apply an answer from the Questions panel",
          "POST /copilot/chat — ask-mode chat and plan-only responses",
          "POST /copilot/generate/stream — build or edit a workflow (SSE)",
          "POST /copilot/load/stream — load a saved workflow by name (SSE)",
          "POST /copilot/automate/stream — set up a scheduled automation (SSE)",
          "POST /copilot/explain-run/stream — analyze a completed run (SSE)"
        ]
      }
    ]
  },
  "generation-harness": {
    title: "Generation Harness",
    description: "The AgentRunner control loop that turns a validated plan into a runnable workflow.",
    breadcrumb: ["Sherpa & Copilot", "Generation Harness"],
    sections: [
      {
        id: "control-loop",
        title: "Control loop",
        level: "h2",
        content: "The AgentRunner (backend/generation/harness/runner.py) is the only Studio build path — it's invoked exclusively from POST /api/copilot/generate/stream:",
        listItems: [
          "Classify intent and enrich the prompt with dataset schemas and skill hints",
          "Retrieve similar few-shot examples from good_examples/",
          "Optionally fan out parallel pre-planning tasks",
          "Call Gemini through the Planner to produce workflow JSON",
          "Canonicalize node type IDs",
          "Validate the DAG against the deterministic engine validator",
          "Apply mechanical auto-fixes, then repair with the LLM if it's still invalid (up to a configurable number of attempts)",
          "Finalize the workflow with a runtime smoke test before returning it"
        ],
        orderedList: true
      },
      {
        id: "key-modules",
        title: "Key modules",
        level: "h2",
        content: "The harness is split into focused modules under generation/harness/:",
        listItems: [
          "runner.py — the AgentRunner control loop",
          "state.py — AgentState, AgentEvent, AgentPhase",
          "intent.py — create-vs-edit scenario classification",
          "retriever.py — pulls matching good_examples/studio_*.json and contract definitions",
          "enrichment.py — injects dataset schemas and skill hints into the prompt",
          "memory.py — structured memory carried across turns",
          "prompt_builder.py, planner.py — system/user prompt construction and the Gemini wrapper",
          "canonicalizer.py, validator_adapter.py, repair/auto_fixer.py — normalization, validation bridge, and mechanical repair"
        ]
      },
      {
        id: "repair-pipeline",
        title: "Repair pipeline",
        level: "h2",
        content: "LLM output first passes through the canonicalizer, then the validator adapter. If it's invalid, the deterministic AutoFixer tries mechanical repairs (no LLM call, no added latency) before falling back to an LLM repair loop driven by a structured FeedbackBuilder, capped at a small number of attempts (three by default)."
      },
      {
        id: "sse-events",
        title: "SSE events",
        level: "h2",
        content: "The harness streams AgentEvents that the frontend maps into UI updates:",
        listItems: [
          "agent_stage / thinking — thinking-block steps and narration",
          "text_start / text_chunk — streaming assistant text",
          "workflow_created — replaces the canvas with the generated DAG",
          "agent_final_summary — a bullet summary of what was built",
          "error / done — stream error handling and collapsing the thinking timeline"
        ]
      },
      {
        id: "few-shot-examples",
        title: "Few-shot examples",
        level: "h2",
        content: "backend/good_examples/ holds 15 vetted studio_*.json workflows used both as few-shot context for the retriever and as the fixture set for end-to-end tests — every one of them must validate and execute before a structural change to the harness is considered done."
      }
    ]
  },
  "mcp-integrations": {
    title: "MCP Integrations",
    description: "How Studio nodes call Jira, Confluence, GitHub, Slack, and other external tools through the MCP bridge.",
    breadcrumb: ["Integrations", "MCP Integrations"],
    sections: [
      {
        id: "architecture",
        title: "Architecture",
        level: "h2",
        content: "Studio does not spawn stdio MCP servers. Instead, MCP nodes on the canvas call a shared handler (engine/nodes/mcp_common.py) which makes an HTTP request to the MCP bridge on port 8765. The bridge either returns demo fixtures or, when live mode is enabled and credentials are present, delegates to the real Atlassian and GitHub REST APIs under integrations/mcp/."
      },
      {
        id: "credentials",
        title: "Credentials",
        level: "h2",
        content: "MCP credentials are read only from backend/.env at request time — never from workflow JSON. The relevant variables are ATLASSIAN_SITE_URL, ATLASSIAN_EMAIL, ATLASSIAN_API_TOKEN, CONFLUENCE_SPACE_KEY, JIRA_PROJECT_KEY for Atlassian, and GITHUB_TOKEN plus GITHUB_REPO for GitHub. Inspector fields on MCP nodes are locked, read-only mirrors of these values, and saving a workflow strips any credential-shaped keys so tokens never end up in saved JSON."
      },
      {
        id: "typed-nodes",
        title: "Typed nodes",
        level: "h2",
        content: "Three typed nodes are preferred for new workflows and for everything Copilot generates:",
        listItems: [
          "jira_mcp — create issues, list issues, create epics from a Confluence page, bulk-create tasks",
          "confluence_mcp — search pages, extract action items, publish a report",
          "github_mcp — list commits, implement fixes, or run the live Jira-linked fix-and-update flow",
          "The legacy mcp node still works and is automatically upgraded to one of the typed nodes based on its configured tool"
        ]
      },
      {
        id: "demo-vs-live",
        title: "Demo vs. live mode",
        level: "h2",
        content: "MCP_BRIDGE_MODE=demo (the default) returns fixture data for every tool with no external calls and no tokens required — ideal for offline development and CI. Setting MCP_BRIDGE_MODE=live routes eligible tools to the real Atlassian and GitHub REST APIs once the corresponding environment variables are present; the bridge must be restarted after changing mode or rotating tokens."
      },
      {
        id: "microsoft-teams-and-outlook",
        title: "Microsoft Teams and Outlook",
        level: "h2",
        content: "Teams and Outlook are not MCP nodes — they call their providers directly. The Teams node sends to an incoming webhook (TEAMS_INCOMING_WEBHOOK_URL) and is fully implemented for that path. The Outlook node validates its three Graph credential variables but mail send itself isn't wired up yet — it fails fast with a clear message rather than silently doing nothing. Both nodes are hidden from the default Copilot-generated palette until they're production ready."
      },
      {
        id: "http-contract",
        title: "HTTP contract",
        level: "h2",
        content: "Every MCP tool call follows the same shape: POST {MCP_SERVER_URL}/tools/{tool}/run with a JSON body of { params, credentials }, returning { rows, rowCount, mode }. The bridge also exposes GET /health and GET /tools for status checks and tool discovery."
      }
    ]
  },
  "data-sources": {
    title: "Data Source Onboarding",
    description: "Register a dataset so Copilot, db_query, and csv_extract nodes know its schema.",
    breadcrumb: ["Integrations", "Data Source Onboarding"],
    sections: [
      {
        id: "overview",
        title: "Overview",
        level: "h2",
        content: "Every dataset is a single YAML file under backend/connectors/metadata/. At startup the connector registry loads every YAML and routes reads through the Oracle SQL connector — even the bundled demo datasets are modeled as Oracle tables backed by a local SQLite fixture when no live DSN is configured."
      },
      {
        id: "adding-a-dataset",
        title: "Adding a dataset",
        level: "h2",
        content: "Onboarding a new dataset is a three-step process:",
        listItems: [
          "Add a metadata YAML with an id, description, connector: oracle, a sources list, and a columns list with names, types, and optional semantic tags",
          "For local development, add table DDL and seed rows to the SQLite demo-data generator script and map the Oracle source path to a table name",
          "Regenerate the local demo fixture and confirm the new dataset appears in the data sources drawer"
        ],
        orderedList: true
      },
      {
        id: "using-a-dataset-in-a-workflow",
        title: "Using a dataset in a workflow",
        level: "h2",
        content: "A db_query node runs SQL directly against the demo table name — for example SELECT * FROM comms_messages LIMIT 20. A csv_extract node remains a convenience loader for the same dataset when you just want all rows without writing SQL."
      },
      {
        id: "production-setup",
        title: "Production setup",
        level: "h2",
        content: "Set ORACLE_DSN to point at a real Oracle instance and implement the connector's query method with a real client library. Everything else — the metadata schema, the node configuration, Copilot's understanding of the dataset — stays the same between demo and production."
      },
      {
        id: "how-copilot-uses-schemas",
        title: "How Copilot uses schemas",
        level: "h2",
        content: "GET /api/data-sources exposes every registered dataset's schema, and the generation harness's enrichment step embeds that schema directly into the prompt context Sherpa uses when planning a workflow — which is why Sherpa can suggest the right column names without you having to spell them out."
      }
    ]
  },
  "database-schema": {
    title: "Schema & Relations",
    description: "Sixteen tables covering auth, workflows, Copilot chats, run history, and automations.",
    breadcrumb: ["Database", "Schema & Relations"],
    sections: [
      {
        id: "overview",
        title: "Overview",
        level: "h2",
        content: "SQLite is the zero-configuration default (backend/copilot_chats.db); MySQL 8 — typically Google Cloud SQL — is used in production once DATABASE_URL or the MYSQL_* environment variables are set. Both engines share the same 16-table schema, defined in backend/app/database.py and migrated idempotently on every startup."
      },
      {
        id: "table-groups",
        title: "Table groups",
        level: "h2",
        content: "The 16 tables fall into six logical groups:",
        listItems: [
          "Auth & identity — users, user_sessions",
          "Per-user workspace — workflows, drafts, workflow_votes, good_examples",
          "Copilot — copilot_chats, user_memory",
          "Access control — user_skills, user_data_source_access, user_preferences, user_feature_access",
          "Run history — run_logs, run_artifacts",
          "Automations — automations, automation_runs"
        ]
      },
      {
        id: "key-relationships",
        title: "Key relationships",
        level: "h2",
        content: "Almost every relationship is enforced in application code by scoping rows to a user_id, not by SQL foreign keys — the single declared foreign key in the whole schema is automation_runs.automation_id referencing automations.id. This keeps SQLite and MySQL parity simple while still giving each table a clear owner."
      },
      {
        id: "per-user-workflow-namespace",
        title: "Per-user workflow namespace",
        level: "h2",
        content: "The workflows and drafts tables use a composite primary key of (user_id, filename), so two users can each save a file called report.json without colliding. Votes on another user's workflow are keyed by (voter_user_id, owner_user_id, filename)."
      },
      {
        id: "scheduler",
        title: "Scheduler",
        level: "h2",
        content: "backend/app/scheduler.py polls the automations table every 10 seconds inside the FastAPI process. Cron-scheduled automations fire once per matching minute; interval automations fire on an elapsed-time check within a duration window. Every execution writes a row to both run_logs and automation_runs."
      },
      {
        id: "schema-scripts",
        title: "Schema scripts",
        level: "h2",
        content: "Canonical DDL lives in backend/sql/001_schema_mysql.sql and backend/sql/002_schema_sqlite.sql, applied with apply_mysql_schema.py / apply_sqlite_schema.py and checked for drift with verify_schema.py."
      }
    ]
  },
  "cloud-sql": {
    title: "Cloud SQL",
    description: "Provisioning a MySQL 8 Cloud SQL instance for production deployments.",
    breadcrumb: ["Database", "Cloud SQL"],
    sections: [
      {
        id: "create-the-instance",
        title: "Create the instance",
        level: "h2",
        content: "Provisioning a production database takes three gcloud steps:",
        listItems: [
          "gcloud sql instances create — a MySQL 8 instance in your target region",
          "gcloud sql databases create and gcloud sql users create — the application database and its own least-privilege user",
          "GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX, DROP on that database only — never root credentials in the app"
        ],
        orderedList: true
      },
      {
        id: "apply-schema",
        title: "Apply schema",
        level: "h2",
        content: "Run apply_mysql_schema.py against the instance, either through a local Cloud SQL Auth Proxy or directly with the mysql client against 001_schema_mysql.sql. Applying the schema explicitly before first deploy ensures indexes and the one declared foreign key exist before real traffic arrives — letting the API bootstrap an empty database works too, but is the fallback, not the recommended path."
      },
      {
        id: "cloud-run-environment",
        title: "Cloud Run environment",
        level: "h2",
        content: "Two connection patterns are supported: TCP through an Auth Proxy sidecar (MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE) or a Unix socket when the Cloud Run service mounts the Cloud SQL connection directly (MYSQL_UNIX_SOCKET or its alias CLOUD_SQL_UNIX_SOCKET)."
      },
      {
        id: "seed-admin-user",
        title: "Seed admin user",
        level: "h2",
        content: "On first start against an empty users table, the backend seeds a default admin account (username johndoe, password password123). Override the seed values with DBSHERPA_SEED_USERNAME, DBSHERPA_SEED_PASSWORD, and related env vars, and change the password immediately in any environment reachable from the internet."
      },
      {
        id: "health-checks",
        title: "Health checks",
        level: "h2",
        content: "After deploying, confirm the service is healthy with GET /api/health, and confirm the database connection works end-to-end by logging in with the seeded (or newly created) admin account."
      },
      {
        id: "backup-and-restore",
        title: "Backup and restore",
        level: "h2",
        content: "Use gcloud sql export sql to write a dump to a Cloud Storage bucket and gcloud sql import sql to restore it into a new instance — the same schema scripts and verification steps apply after a restore."
      }
    ]
  },
  "engineering-onboarding": {
    title: "Engineering Onboarding",
    description: "Clone the repo, understand the layout, and ship your first change.",
    breadcrumb: ["Engineering", "Onboarding"],
    sections: [
      {
        id: "first-30-minutes",
        title: "Your first 30 minutes",
        level: "h2",
        content: "Get productive fast:",
        listItems: [
          "Clone the repo and create backend/.env with GEMINI_API_KEY",
          "Run ./start.sh and confirm the frontend, backend, and MCP bridge all respond",
          "Log in as the demo user",
          "Load a bundled studio_*.json demo workflow and click Run",
          "Open the Sherpa panel and try a Build-mode prompt end to end"
        ],
        orderedList: true
      },
      {
        id: "tech-stack",
        title: "Tech stack",
        level: "h2",
        content: "The stack is intentionally small and consistent:",
        listItems: [
          "Frontend — React 18, TypeScript, Vite, Tailwind CSS, Zustand, TanStack Query, React Flow",
          "Backend — Python 3.11+, FastAPI, Uvicorn, Pandas",
          "User code sandbox — Starlark (the code node)",
          "LLM — Google Gemini via a single shared adapter",
          "Persistence — SQLite by default, MySQL/Cloud SQL in production",
          "Deploy — Docker and Cloud Run"
        ]
      },
      {
        id: "repo-layout",
        title: "Repo layout",
        level: "h2",
        content: "frontend/src/ holds components, Zustand stores, and the API/SSE client. backend/app/ holds FastAPI routers, the persistence layer, and the automations scheduler. backend/engine/ holds the DAG runner and every node's YAML + Python handler pair. backend/generation/ holds Sherpa's AgentRunner and prompt/repair pipeline. backend/connectors/ and backend/integrations/mcp/ hold data source and external-tool implementations respectively, and backend/good_examples/ holds the vetted demo workflows used for few-shot generation and end-to-end tests."
      },
      {
        id: "core-concepts",
        title: "Core concepts",
        level: "h2",
        content: "A handful of ideas explain most of the codebase:",
        listItems: [
          "Workflows are JSON documents with nodes and edges (using from/to, not React Flow's source/target)",
          "Nodes are YAML spec + Python handler pairs, auto-discovered by the registry",
          "RunContext carries datasets, scalar values, and generic state between node handlers during a run",
          "Sherpa turns natural language into a validated workflow via the AgentRunner control loop",
          "Automations are scheduled or interval runs of a saved workflow, polled by a scheduler inside the FastAPI process"
        ]
      },
      {
        id: "common-tasks",
        title: "Common development tasks",
        level: "h2",
        content: "The most common changes an engineer makes:",
        listItems: [
          "Add a node — see Creating Custom Nodes",
          "Add a data source — see Data Source Onboarding",
          "Modify the node config UI — RightPanel/ConfigView.tsx",
          "Run the backend test suite — python -m pytest tests/ -q",
          "Reset the local database — python backend/scripts/reset_db.py"
        ]
      },
      {
        id: "conventions",
        title: "Conventions",
        level: "h2",
        content: "Python uses snake_case with type hints; TypeScript uses strict mode and functional components. Workflow node ids follow the n01, n02, … pattern. Never hand-edit node_contracts.json, generated.ts, node_type_ids.py, or node_detail.md — they're all produced by gen_artifacts.py. Starlark code has no imports; use output = [...] or list comprehensions."
      }
    ]
  },
  "gemini-migration": {
    title: "Gemini Migration & LLM Configuration",
    description: "How dbSherpa Studio talks to Gemini today, and how to move from API keys to Vertex AI.",
    breadcrumb: ["Engineering", "Gemini Migration"],
    sections: [
      {
        id: "single-seam",
        title: "A single seam",
        level: "h2",
        content: "Every backend LLM call goes through one module, backend/llm/gemini_adapter.py, accessed via get_default_adapter(). Callers should never construct GeminiAdapter() directly or read GEMINI_API_KEY themselves — they call gemini_configured() to check credential presence and llm_provider() to see whether the process is running in Gemini or Vertex mode. This is what makes swapping providers a one-file change."
      },
      {
        id: "current-setup",
        title: "Current setup",
        level: "h2",
        content: "The minimum local configuration is a single line in backend/.env: GEMINI_API_KEY=your_key_here. After restarting the backend, GET /api/agent/llm/health confirms credentials are present (no network call), and GET /api/agent/llm/probe makes a real hello-world call and reports latency."
      },
      {
        id: "key-rotation",
        title: "Key rotation and failover",
        level: "h2",
        content: "The adapter supports up to three API keys plus a legacy fallback, and automatically tries the next one on rate limits, auth failures, or transient server errors:",
        listItems: [
          "GEMINI_API_KEY — primary key",
          "GEMINI_API_KEY_2 — first backup",
          "GEMINI_API_KEY_3 — second backup",
          "GOOGLE_API_KEY — legacy fallback"
        ]
      },
      {
        id: "migrating-to-vertex",
        title: "Migrating to Vertex AI",
        level: "h2",
        content: "Moving from API keys to Vertex AI's Application Default Credentials:",
        listItems: [
          "Enable the Vertex AI API on your GCP project and grant the runtime service account roles/aiplatform.user",
          "Set LLM_PROVIDER=vertex, VERTEX_PROJECT, and VERTEX_LOCATION in backend/.env or your Cloud Run service",
          "Restart the backend and confirm GET /api/agent/llm/probe reports \"provider\": \"vertex\" and ok: true",
          "Run the regression suite (test_gemini_connectivity.py, test_studio_workflows_e2e.py) before removing any GEMINI_API_KEY secrets"
        ],
        orderedList: true
      },
      {
        id: "who-calls-gemini",
        title: "Who calls Gemini",
        level: "h2",
        content: "Every path below uses the shared adapter, so a provider migration touches none of them directly:",
        listItems: [
          "Sherpa routing (copilot/llm_router.py)",
          "Workflow generation (copilot/workflow_generator.py, generation/planner.py)",
          "Run analysis (copilot/run_analyst.py)",
          "The AI Agent workflow node (engine/nodes/agent.py)",
          "Health and probe endpoints (app/routers/agent.py)"
        ]
      },
      {
        id: "default-model",
        title: "Default model",
        level: "h2",
        content: "The fleet-wide default model, gemini-2.5-flash, is defined exactly once in gemini_adapter.py as DEFAULT_MODEL. Individual AI Agent nodes may override it per-node; every other Sherpa and harness call site uses the adapter default unless it explicitly passes a model argument."
      }
    ]
  }
};

// Helper function to generate table of contents from page sections
export function generateTableOfContents(pageId: string) {
  const page = documentationPages[pageId];
  if (!page) return [];

  return page.sections.map(section => ({
    id: section.id,
    title: section.title,
    level: section.level
  }));
}
