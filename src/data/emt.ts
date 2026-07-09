import {
  Bot,
  Braces,
  CalendarClock,
  Database,
  FileSpreadsheet,
  Globe,
  Mail,
  Table2,
  Wand2,
  Webhook,
  type LucideIcon,
} from "lucide-react";

export type RunStatus = "success" | "error" | "warning" | "running";

export interface EmtStat {
  label: string;
  value: string;
  sub: string;
  sparkline: number[];
}

export interface EmtWorkflow {
  id: string;
  name: string;
  filename: string;
  kind: "saved" | "draft";
  nodeCount: number;
  updatedLabel: string;
  nodeTypes: string[];
  lastRun?: { status: RunStatus; label: string };
}

export interface EmtRun {
  id: string;
  workflowName: string;
  status: RunStatus;
  time: string;
  duration: string;
}

export interface EmtSource {
  id: string;
  name: string;
  type: string;
  detail: string;
  status: "connected" | "partial" | "off";
}

export interface EmtAutomation {
  id: string;
  name: string;
  workflow: string;
  cron: string;
  next: string;
  enabled: boolean;
}

export interface EmtNodeDef {
  id: string;
  label: string;
  category: string;
  description: string;
  icon: LucideIcon;
}

export interface EmtSkill {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export const STATS: EmtStat[] = [
  { label: "Workflows", value: "6", sub: "2 drafts ready to open", sparkline: [2, 3, 3, 4, 4, 5, 6] },
  { label: "Runs this month", value: "48", sub: "+12 vs last month", sparkline: [3, 5, 4, 8, 6, 10, 12] },
  { label: "Success rate", value: "94%", sub: "3 failed this month", sparkline: [88, 90, 92, 89, 93, 95, 94] },
  { label: "Automations", value: "3", sub: "2 running on schedule", sparkline: [1, 1, 2, 2, 2, 3, 3] },
];

export const WORKFLOWS: EmtWorkflow[] = [
  {
    id: "leads-pipeline",
    name: "Lead scoring pipeline",
    filename: "leads_pipeline.json",
    kind: "saved",
    nodeCount: 8,
    updatedLabel: "2h ago",
    nodeTypes: ["db_query", "agent", "jira_mcp"],
    lastRun: { status: "success", label: "Succeeded 2h ago" },
  },
  {
    id: "daily-sync",
    name: "Daily data sync",
    filename: "daily_sync.json",
    kind: "saved",
    nodeCount: 5,
    updatedLabel: "5h ago",
    nodeTypes: ["csv_extract", "transform", "output"],
    lastRun: { status: "error", label: "Failed 5h ago" },
  },
  {
    id: "report-generator",
    name: "Weekly exec report",
    filename: "exec_report.json",
    kind: "saved",
    nodeCount: 11,
    updatedLabel: "1d ago",
    nodeTypes: ["db_query", "agent", "email"],
    lastRun: { status: "success", label: "Succeeded 1d ago" },
  },
  {
    id: "orders-monitor",
    name: "Orders anomaly monitor",
    filename: "orders_monitor.json",
    kind: "saved",
    nodeCount: 7,
    updatedLabel: "2d ago",
    nodeTypes: ["webhook", "classifier", "alerts"],
    lastRun: { status: "warning", label: "Completed with warnings" },
  },
  {
    id: "draft-enrichment",
    name: "Account enrichment",
    filename: "draft_02.json",
    kind: "draft",
    nodeCount: 3,
    updatedLabel: "3d ago",
    nodeTypes: ["http_request", "transform"],
  },
  {
    id: "new-draft",
    name: "Untitled workflow",
    filename: "draft_01.json",
    kind: "draft",
    nodeCount: 2,
    updatedLabel: "1w ago",
    nodeTypes: ["trigger", "agent"],
  },
];

export const RUNS: EmtRun[] = [
  { id: "run_8f3a1c", workflowName: "Lead scoring pipeline", status: "success", time: "2h ago", duration: "42s" },
  { id: "run_2b91d0", workflowName: "Daily data sync", status: "error", time: "5h ago", duration: "13s" },
  { id: "run_c47e22", workflowName: "Orders anomaly monitor", status: "warning", time: "9h ago", duration: "1m 04s" },
  { id: "run_91ab3f", workflowName: "Weekly exec report", status: "success", time: "1d ago", duration: "2m 18s" },
  { id: "run_5d20e8", workflowName: "Lead scoring pipeline", status: "success", time: "1d ago", duration: "39s" },
  { id: "run_7fe614", workflowName: "Daily data sync", status: "success", time: "2d ago", duration: "51s" },
  { id: "run_30c9aa", workflowName: "Orders anomaly monitor", status: "success", time: "2d ago", duration: "58s" },
  { id: "run_ee12b7", workflowName: "Weekly exec report", status: "running", time: "just now", duration: "—" },
];

export const SOURCES: EmtSource[] = [
  { id: "postgres-main", name: "Postgres · production", type: "database", detail: "14 tables scoped", status: "connected" },
  { id: "orders-csv", name: "orders.csv", type: "file", detail: "12,402 rows · refreshed daily", status: "connected" },
  { id: "atlassian-mcp", name: "Atlassian MCP", type: "mcp", detail: "Configure in Settings", status: "partial" },
  { id: "github-mcp", name: "GitHub MCP", type: "mcp", detail: "Not configured", status: "off" },
];

export const AUTOMATIONS: EmtAutomation[] = [
  { id: "auto-1", name: "Nightly sync", workflow: "Daily data sync", cron: "0 2 * * *", next: "Tonight 02:00", enabled: true },
  { id: "auto-2", name: "Monday report", workflow: "Weekly exec report", cron: "0 8 * * 1", next: "Mon 08:00", enabled: true },
  { id: "auto-3", name: "Hourly monitor", workflow: "Orders anomaly monitor", cron: "0 * * * *", next: "Paused", enabled: false },
];

export const NODE_CATALOG: EmtNodeDef[] = [
  { id: "webhook", label: "Webhook trigger", category: "Triggers", description: "Start a run from an HTTP call", icon: Webhook },
  { id: "schedule", label: "Schedule", category: "Triggers", description: "Cron-based trigger", icon: CalendarClock },
  { id: "db_query", label: "DB query", category: "Data", description: "Run SQL against a scoped source", icon: Database },
  { id: "csv_extract", label: "CSV extract", category: "Data", description: "Load rows from a file source", icon: FileSpreadsheet },
  { id: "http_request", label: "HTTP request", category: "Data", description: "Fetch external APIs", icon: Globe },
  { id: "transform", label: "Transform", category: "Transform", description: "Map, filter and reshape rows", icon: Braces },
  { id: "agent", label: "Agent", category: "AI", description: "LLM step with tool access", icon: Bot },
  { id: "classifier", label: "Classifier", category: "AI", description: "Label rows with an LLM", icon: Wand2 },
  { id: "email", label: "Email", category: "Output", description: "Send a rendered report", icon: Mail },
  { id: "table_output", label: "Table output", category: "Output", description: "Materialize results as a table", icon: Table2 },
];

export const SKILLS: EmtSkill[] = [
  { id: "sql-author", name: "SQL authoring", description: "Sherpa writes and validates SQL against your scoped schema.", enabled: true },
  { id: "report-writer", name: "Report writer", description: "Turns run output into executive-ready narratives.", enabled: true },
  { id: "anomaly-triage", name: "Anomaly triage", description: "Explains spikes and dips in monitored metrics.", enabled: false },
  { id: "jira-sync", name: "Jira sync", description: "Files and updates tickets from workflow output.", enabled: false },
];

/** GitHub-style activity heatmap: 12 weeks × 7 days, deterministic pseudo-random. */
export function buildCalendar(): { level: number }[] {
  const cells: { level: number }[] = [];
  let seed = 42;
  for (let i = 0; i < 84; i++) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    const r = seed / 2147483648;
    const level = r < 0.38 ? 0 : r < 0.6 ? 1 : r < 0.8 ? 2 : r < 0.93 ? 3 : 4;
    cells.push({ level });
  }
  return cells;
}
