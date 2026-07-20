export type CodeNodeKind = "engine" | "router" | "service" | "component" | "store" | "page";
export type CodeNodeGroup = "backend" | "frontend";

export interface CodeGraphNode {
  id: string;
  label: string;
  path: string;
  kind: CodeNodeKind;
  group: CodeNodeGroup;
  description: string;
  x: number;
  y: number;
}

export interface CodeGraphEdge {
  id: string;
  source: string;
  target: string;
}

const col = (x: number) => x;
const row = (i: number) => 40 + i * 110;

export const CODE_GRAPH_NODES: CodeGraphNode[] = [
  // backend · core
  { id: "engine", label: "Workflow Engine", path: "backend/engine", kind: "engine", group: "backend", description: "Executes workflow DAGs node by node and tracks run state.", x: col(0), y: row(0) },
  { id: "engine_nodes", label: "Node Runtime", path: "backend/engine/nodes", kind: "engine", group: "backend", description: "Registers and executes individual node types at run time.", x: col(0), y: row(1) },
  { id: "database", label: "Database Layer", path: "backend/database, backend/sql", kind: "service", group: "backend", description: "Postgres access, schema helpers and migrations.", x: col(0), y: row(2) },

  // backend · routers
  { id: "router_workflows", label: "workflows.py", path: "backend/app/routers/workflows.py", kind: "router", group: "backend", description: "Workflow and draft CRUD, YAML import/export.", x: col(260), y: row(0) },
  { id: "router_run", label: "run.py", path: "backend/app/routers/run.py", kind: "router", group: "backend", description: "Triggers and streams workflow runs.", x: col(260), y: row(1) },
  { id: "router_auth", label: "auth.py", path: "backend/app/routers/auth.py", kind: "router", group: "backend", description: "Session and authentication endpoints.", x: col(260), y: row(2) },
  { id: "router_copilot", label: "copilot.py", path: "backend/app/routers/copilot.py", kind: "router", group: "backend", description: "Sherpa copilot chat, planning and clarification endpoints.", x: col(260), y: row(3) },
  { id: "router_automations", label: "automations.py", path: "backend/app/routers/automations.py", kind: "router", group: "backend", description: "Scheduled automation CRUD.", x: col(260), y: row(4) },
  { id: "router_library", label: "library.py", path: "backend/app/routers/library.py", kind: "router", group: "backend", description: "Saved workflow library and audit log.", x: col(260), y: row(5) },
  { id: "router_reports", label: "reports.py", path: "backend/app/routers/reports.py", kind: "router", group: "backend", description: "Generated report retrieval.", x: col(260), y: row(6) },
  { id: "router_workspace", label: "workspace.py", path: "backend/app/routers/workspace.py", kind: "router", group: "backend", description: "Workspace settings and membership.", x: col(260), y: row(7) },
  { id: "router_user", label: "user.py", path: "backend/app/routers/user.py", kind: "router", group: "backend", description: "User profile endpoints.", x: col(260), y: row(8) },
  { id: "router_validate", label: "validate.py", path: "backend/app/routers/validate.py", kind: "router", group: "backend", description: "Validates a workflow before save or run.", x: col(260), y: row(9) },
  { id: "router_code_graph", label: "code_graph.py", path: "backend/app/routers/code_graph.py", kind: "router", group: "backend", description: "Serves the Understand-Anything codebase graph.", x: col(260), y: row(10) },

  // backend · services
  { id: "copilot_core", label: "Copilot / Sherpa", path: "backend/copilot", kind: "service", group: "backend", description: "Agent harness — planning, clarification and tool use.", x: col(520), y: row(0) },
  { id: "generation", label: "Generation Harness", path: "backend/generation", kind: "service", group: "backend", description: "Generates and repairs workflow code from prompts.", x: col(520), y: row(1) },
  { id: "connectors", label: "Connectors", path: "backend/connectors", kind: "service", group: "backend", description: "Source adapters — Postgres, CSV, HTTP, MCP servers.", x: col(520), y: row(2) },
  { id: "mcp_bridge", label: "MCP Bridge", path: "backend/mcp_bridge, backend/integrations/mcp", kind: "service", group: "backend", description: "Talks to external MCP servers on behalf of connectors and copilot.", x: col(520), y: row(3) },
  { id: "llm", label: "LLM Client", path: "backend/llm", kind: "service", group: "backend", description: "Model client wrapper (Gemini) shared by copilot and generation.", x: col(520), y: row(4) },
  { id: "skills_backend", label: "Skills", path: "backend/skills", kind: "service", group: "backend", description: "Reusable capabilities Sherpa can call while working.", x: col(520), y: row(5) },

  // frontend · state & api
  { id: "services", label: "services/*", path: "frontend/src/services", kind: "service", group: "frontend", description: "Typed API client wrapping the backend routers.", x: col(880), y: row(0) },
  { id: "workflow_store", label: "store/workflow", path: "frontend/src/store/workflow", kind: "store", group: "frontend", description: "Client-side workflow state — nodes, edges, selection.", x: col(880), y: row(1) },
  { id: "nodes_registry", label: "nodes/generated.ts", path: "frontend/src/nodes", kind: "store", group: "frontend", description: "Generated node-type registry consumed by the canvas.", x: col(880), y: row(2) },

  // frontend · components
  { id: "workflow_canvas", label: "WorkflowCanvas", path: "frontend/src/components/WorkflowCanvas", kind: "component", group: "frontend", description: "React Flow canvas rendering the workflow graph.", x: col(1140), y: row(0) },
  { id: "node_panel", label: "NodePanel", path: "frontend/src/components/NodePanel", kind: "component", group: "frontend", description: "Node palette and drag source for the canvas.", x: col(1140), y: row(1) },
  { id: "right_panel", label: "RightPanel", path: "frontend/src/components/RightPanel", kind: "component", group: "frontend", description: "Config / Output / Logs inspector for the selected node.", x: col(1140), y: row(2) },
  { id: "workflow_code_editor", label: "WorkflowCodeEditor", path: "frontend/src/components/WorkflowCodeEditor", kind: "component", group: "frontend", description: "YAML/JSON code view of the workflow.", x: col(1140), y: row(3) },
  { id: "workspace_toolbar", label: "WorkspaceToolbar", path: "frontend/src/components/WorkspaceToolbar", kind: "component", group: "frontend", description: "Save / run / share controls above the canvas.", x: col(1140), y: row(4) },
  { id: "workflow_drawer", label: "WorkflowDrawer", path: "frontend/src/components/WorkflowDrawer", kind: "component", group: "frontend", description: "Run history and workflow list drawer.", x: col(1140), y: row(5) },
  { id: "copilot_ui", label: "Copilot", path: "frontend/src/components/Copilot", kind: "component", group: "frontend", description: "Sherpa chat UI — thinking blocks, clarifications, slash menu.", x: col(1140), y: row(6) },

  // frontend · pages
  { id: "dashboard_home", label: "DashboardHome", path: "frontend/src/pages/DashboardHome.tsx", kind: "page", group: "frontend", description: "Landing page after login.", x: col(1400), y: row(0) },
  { id: "dashboard_components", label: "dashboard/*", path: "frontend/src/components/dashboard", kind: "component", group: "frontend", description: "Stat rows, workflow cards, run activity calendar.", x: col(1400), y: row(1) },
];

export const CODE_GRAPH_EDGES: CodeGraphEdge[] = [
  { id: "e1", source: "router_workflows", target: "engine" },
  { id: "e2", source: "router_run", target: "engine" },
  { id: "e3", source: "engine", target: "engine_nodes" },
  { id: "e4", source: "engine_nodes", target: "connectors" },
  { id: "e5", source: "connectors", target: "mcp_bridge" },
  { id: "e6", source: "router_automations", target: "engine" },
  { id: "e7", source: "router_reports", target: "engine" },
  { id: "e8", source: "router_workspace", target: "database" },
  { id: "e9", source: "router_user", target: "database" },
  { id: "e10", source: "router_library", target: "database" },
  { id: "e11", source: "router_auth", target: "database" },
  { id: "e12", source: "router_workflows", target: "database" },
  { id: "e13", source: "router_validate", target: "engine" },
  { id: "e14", source: "router_code_graph", target: "engine_nodes" },
  { id: "e15", source: "router_copilot", target: "copilot_core" },
  { id: "e16", source: "copilot_core", target: "llm" },
  { id: "e17", source: "copilot_core", target: "generation" },
  { id: "e18", source: "copilot_core", target: "skills_backend" },
  { id: "e19", source: "generation", target: "llm" },

  { id: "e20", source: "services", target: "router_workflows" },
  { id: "e21", source: "services", target: "router_run" },
  { id: "e22", source: "services", target: "router_validate" },
  { id: "e23", source: "services", target: "router_copilot" },
  { id: "e24", source: "services", target: "router_library" },
  { id: "e25", source: "services", target: "router_reports" },

  { id: "e26", source: "workflow_canvas", target: "nodes_registry" },
  { id: "e27", source: "workflow_canvas", target: "workflow_store" },
  { id: "e28", source: "workflow_canvas", target: "node_panel" },
  { id: "e29", source: "workflow_canvas", target: "right_panel" },
  { id: "e30", source: "workflow_canvas", target: "workspace_toolbar" },
  { id: "e31", source: "node_panel", target: "nodes_registry" },
  { id: "e32", source: "nodes_registry", target: "engine_nodes" },
  { id: "e33", source: "workspace_toolbar", target: "services" },
  { id: "e34", source: "right_panel", target: "services" },
  { id: "e35", source: "workflow_code_editor", target: "workflow_store" },
  { id: "e36", source: "workflow_drawer", target: "services" },
  { id: "e37", source: "copilot_ui", target: "services" },
  { id: "e38", source: "dashboard_home", target: "dashboard_components" },
  { id: "e39", source: "dashboard_components", target: "services" },
];
