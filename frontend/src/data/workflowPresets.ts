import type { Edge, Node } from "@xyflow/react";
import type { FlowNodeData, FlowNodeRow, NodeAccent } from "@/components/emt/studio/FlowNode";
import type { GroupNodeData } from "@/components/emt/studio/GroupNode";
import type { EmtLogLine, RunStatus } from "@/data/emt";

export interface RunStep {
  delay: number;
  nodeIds: string[];
  status?: FlowNodeData["status"];
  log: EmtLogLine;
}

export interface WorkflowPreset {
  name: string;
  file: string;
  // Mixed emt/group nodes — kept as the base Node type so group containers
  // (GroupNodeData) and flow cards (FlowNodeData) can coexist in one array.
  nodes: Node[];
  edges: Edge[];
  runTimeline: RunStep[];
  finalStatus: RunStatus;
  /** Log lines shown in the run panel before the workflow is (re)run. */
  seedLogs?: EmtLogLine[];
}

/** Rich screenshot-accurate node (colored tile + typed rows). */
function card(
  id: string,
  x: number,
  y: number,
  label: string,
  icon: string,
  accent: NodeAccent,
  rows: FlowNodeRow[],
  opts: { nodeType?: string; parentId?: string; badge?: string; status?: FlowNodeData["status"] } = {},
): Node<FlowNodeData> {
  return {
    id,
    type: "emt",
    position: { x, y },
    ...(opts.parentId ? { parentId: opts.parentId, extent: "parent" as const } : {}),
    data: {
      label,
      sub: rows[0]?.text ?? "",
      icon,
      accent,
      rows,
      badge: opts.badge,
      status: opts.status ?? "success",
      nodeType: opts.nodeType ?? id,
    },
  };
}

function groupNode(id: string, x: number, y: number, width: number, height: number, label: string, icon = "FileText"): Node<GroupNodeData> {
  return {
    id,
    type: "group",
    position: { x, y },
    style: { width, height },
    data: { label, icon },
  };
}

function node(
  id: string,
  x: number,
  y: number,
  label: string,
  sub: string,
  icon: string,
  nodeType: string,
  status: FlowNodeData["status"] = "success",
): Node<FlowNodeData> {
  return { id, type: "emt", position: { x, y }, data: { label, sub, icon, status, nodeType } };
}

function edge(id: string, source: string, target: string): Edge {
  return { id, source, target };
}

interface TimelineStep {
  nodeIds: string[];
  msg: string;
  level?: EmtLogLine["level"];
  status?: FlowNodeData["status"];
}

function timeline(steps: TimelineStep[], finalMsg: string, finalLevel: EmtLogLine["level"] = "info"): RunStep[] {
  const t: RunStep[] = steps.map((s, i) => ({
    delay: i * 700,
    nodeIds: s.nodeIds,
    status: s.status,
    log: { t: "now", level: s.level ?? "info", msg: s.msg },
  }));
  t.push({ delay: steps.length * 700 + 400, nodeIds: [], log: { t: "now", level: finalLevel, msg: finalMsg } });
  return t;
}

export const WORKFLOW_PRESETS: Record<string, WorkflowPreset> = {
  "new-leads-automation": {
    name: "New leads Automation",
    file: "leads.slip",
    nodes: [
      groupNode("grp-filecheck", 40, 380, 288, 356, "File Check", "FileText"),
      card("file-watcher-1", 16, 52, "File Watcher", "Folder", "red", [
        { kind: "check", text: "New file in folder" },
        { kind: "file", text: "/Projects/scripts" },
      ], { parentId: "grp-filecheck", nodeType: "file_watcher" }),
      card("file-watcher-2", 16, 196, "File Watcher", "Folder", "red", [
        { kind: "check", text: "New file in folder" },
        { kind: "file", text: "/Projects/scripts/Customer dat…" },
      ], { parentId: "grp-filecheck", nodeType: "file_watcher" }),
      card("csv-parser", 470, 60, "CSV Parser", "Table", "green", [
        { kind: "check", text: "Convert CSV to usable objects" },
        { kind: "clock", text: "Next 2.45 minutes" },
      ], { nodeType: "csv_parser" }),
      card("de-duplicator", 470, 360, "De duplicator", "Filter", "cyan", [
        { kind: "check", text: "Removes Duplicates" },
      ], { nodeType: "de_duplicator" }),
      card("crm-sync", 690, 640, "CRM Sync", "Send", "orange", [
        { kind: "check", text: "Sends clean data to CRM" },
        { kind: "link", text: "https://api.hubapi.com/crm/v3/…" },
      ], { nodeType: "crm_sync" }),
    ],
    edges: [
      edge("e-fc-csv", "file-watcher-1", "csv-parser"),
      edge("e-csv-dedup", "csv-parser", "de-duplicator"),
      edge("e-dedup-crm", "de-duplicator", "crm-sync"),
    ],
    finalStatus: "running",
    seedLogs: [
      { t: "Nov 12 00:12:00", level: "info", msg: 'Initializing automation: "New Leads Automation"' },
      { t: "Nov 12 00:12:00", level: "info", msg: "Environment: Local-first" },
      { t: "Nov 12 00:12:00", level: "info", msg: "Loaded configuration from /Users/sam/Automations/leads.slip" },
      { t: "Nov 12 00:12:00", level: "info", msg: "Node: Watcher — Listening to /Users/sam/Downloads/leads/" },
      { t: "Nov 12 00:12:00", level: "info", msg: "File detected: leads-2025-04-19.csv" },
      { t: "Nov 12 00:12:00", level: "info", msg: "Reading file: leads-2025-04-19.csv (38 KB)" },
      { t: "Nov 12 00:12:00", level: "info", msg: "Parsed 122 rows in 241ms" },
      { t: "Nov 12 00:12:00", level: "info", msg: "Node: Clean Data — Removing incomplete rows" },
      { t: "Nov 12 00:12:00", level: "warn", msg: "Found 3 rows with missing email addresses" },
      { t: "Nov 12 00:12:00", level: "info", msg: "119 valid rows remaining" },
      { t: "Nov 12 00:12:00", level: "info", msg: "Domain check complete: 115 valid, 4 flagged" },
      { t: "Nov 12 00:12:00", level: "info", msg: "Enrichment completed in 2.1s" },
      { t: "Nov 12 00:12:00", level: "info", msg: "Node: Deduplication — Comparing with CRM (local db)" },
      { t: "Nov 12 00:12:00", level: "info", msg: "Checking against existing 13,842 records" },
      { t: "Nov 12 00:12:00", level: "info", msg: "117 new leads, 2 duplicates ignored" },
      { t: "Nov 12 00:12:00", level: "info", msg: "Node: CRM Sync — Writing to local CRM instance" },
      { t: "Nov 12 00:12:00", level: "info", msg: "Synced 117 new contacts in 1.4s" },
      { t: "Nov 12 00:12:00", level: "info", msg: "Node: Notify — Slack Webhook to #sales-leads" },
    ],
    runTimeline: timeline(
      [
        { nodeIds: ["file-watcher-1", "file-watcher-2"], msg: "Watcher: new file detected — leads-2025-04-19.csv" },
        { nodeIds: ["csv-parser"], msg: "CSV Parser: parsed 122 rows in 241ms" },
        { nodeIds: ["de-duplicator"], msg: "Deduplication: 117 new leads, 2 duplicates ignored" },
        { nodeIds: ["crm-sync"], msg: "CRM Sync: synced 117 new contacts in 1.4s" },
      ],
      "Run succeeded — 117 new leads processed",
    ),
  },

  "leads-pipeline": {
    name: "Lead scoring pipeline",
    file: "leads_pipeline.json",
    nodes: [
      node("1", 0, 120, "Schedule", "0 2 * * *", "CalendarClock", "schedule"),
      node("2", 260, 40, "DB query", "leads · postgres", "Database", "db_query"),
      node("3", 260, 200, "CSV extract", "orders.csv", "FileSpreadsheet", "csv_extract"),
      node("4", 520, 120, "Transform", "join + filter", "Braces", "transform"),
      node("5", 780, 120, "Agent", "score_leads", "Bot", "agent"),
      node("6", 1040, 120, "Table output", "scored_leads", "Table2", "table_output"),
    ],
    edges: [
      edge("e1-2", "1", "2"),
      edge("e1-3", "1", "3"),
      edge("e2-4", "2", "4"),
      edge("e3-4", "3", "4"),
      edge("e4-5", "4", "5"),
      edge("e5-6", "5", "6"),
    ],
    finalStatus: "success",
    runTimeline: [
      { delay: 0, nodeIds: ["1"], log: { t: "now", level: "info", msg: "Run started (trigger: manual)" } },
      { delay: 500, nodeIds: ["2", "3"], log: { t: "now", level: "info", msg: "db_query: SELECT * FROM leads LIMIT 500" } },
      { delay: 1400, nodeIds: [], log: { t: "now", level: "info", msg: "csv_extract: loaded 12,402 rows from orders.csv" } },
      { delay: 2100, nodeIds: ["4"], log: { t: "now", level: "info", msg: "transform: 500 → 342 rows after filter" } },
      { delay: 2900, nodeIds: ["5"], log: { t: "now", level: "info", msg: "agent: scoring batch 1/4" } },
      { delay: 3600, nodeIds: [], log: { t: "now", level: "warn", msg: "agent: 3 rows missing company field" } },
      { delay: 3900, nodeIds: ["6"], log: { t: "now", level: "info", msg: "output: wrote 342 rows to scored_leads" } },
      { delay: 4200, nodeIds: [], log: { t: "now", level: "info", msg: "Run succeeded in 4.2s" } },
    ],
  },

  "daily-sync": {
    name: "Daily data sync",
    file: "daily_sync.json",
    nodes: [
      node("1", 0, 120, "Schedule", "0 6 * * *", "CalendarClock", "schedule"),
      node("2", 260, 40, "CSV extract", "orders.csv", "FileSpreadsheet", "csv_extract"),
      node("3", 260, 200, "HTTP request", "fx-rates API", "Globe", "http_request"),
      node("4", 520, 120, "Transform", "merge + normalize", "Braces", "transform"),
      node("5", 780, 120, "Table output", "daily_totals", "Table2", "table_output"),
    ],
    edges: [edge("e1-2", "1", "2"), edge("e1-3", "1", "3"), edge("e2-4", "2", "4"), edge("e3-4", "3", "4"), edge("e4-5", "4", "5")],
    finalStatus: "error",
    runTimeline: [
      { delay: 0, nodeIds: ["1"], log: { t: "now", level: "info", msg: "Run started (trigger: schedule)" } },
      { delay: 700, nodeIds: ["2", "3"], log: { t: "now", level: "info", msg: "csv_extract: loaded 240 rows from orders.csv" } },
      { delay: 1400, nodeIds: [], log: { t: "now", level: "warn", msg: "http_request: fx-rates API slow to respond, retrying…" } },
      { delay: 2100, nodeIds: ["3"], status: "error", log: { t: "now", level: "error", msg: "http_request: 503 Service Unavailable after 3 retries" } },
      { delay: 2800, nodeIds: [], log: { t: "now", level: "error", msg: "Run failed — transform never received fx-rates data" } },
    ],
  },

  "report-generator": {
    name: "Weekly exec report",
    file: "exec_report.json",
    nodes: [
      node("1", 0, 120, "Schedule", "0 8 * * 1", "CalendarClock", "schedule"),
      node("2", 260, 120, "DB query", "orders · postgres", "Database", "db_query"),
      node("3", 520, 120, "Transform", "aggregate by region", "Braces", "transform"),
      node("4", 780, 120, "Agent", "summarize_orders", "Bot", "agent"),
      node("5", 1040, 120, "Table output", "exec_summary", "Table2", "table_output"),
      node("6", 1300, 120, "Email", "exec-team@acme.com", "Mail", "email"),
    ],
    edges: [edge("e1-2", "1", "2"), edge("e2-3", "2", "3"), edge("e3-4", "3", "4"), edge("e4-5", "4", "5"), edge("e5-6", "5", "6")],
    finalStatus: "success",
    runTimeline: timeline(
      [
        { nodeIds: ["1"], msg: "Run started (trigger: schedule)" },
        { nodeIds: ["2"], msg: "db_query: SELECT * FROM orders WHERE week = current" },
        { nodeIds: ["3"], msg: "transform: aggregated 1,204 orders by region" },
        { nodeIds: ["4"], msg: "agent: drafting executive summary" },
        { nodeIds: ["5"], msg: "output: wrote summary to exec_summary table" },
        { nodeIds: ["6"], msg: "email: sending to 6 recipients" },
      ],
      "Run succeeded in 4.9s",
    ),
  },

  "orders-monitor": {
    name: "Orders anomaly monitor",
    file: "orders_monitor.json",
    nodes: [
      node("1", 0, 120, "Webhook trigger", "/hooks/orders", "Webhook", "webhook"),
      node("2", 300, 120, "Classifier", "spike detection", "Wand2", "classifier"),
      node("3", 600, 120, "Email", "ops@acme.com", "Mail", "email"),
    ],
    edges: [edge("e1-2", "1", "2"), edge("e2-3", "2", "3")],
    finalStatus: "warning",
    runTimeline: timeline(
      [
        { nodeIds: ["1"], msg: "Run started (trigger: webhook)" },
        { nodeIds: ["2"], msg: "classifier: analyzing order volume vs 7-day baseline" },
        { nodeIds: ["2"], status: "warning", msg: "classifier: spike detected — 340% above baseline", level: "warn" },
        { nodeIds: ["3"], msg: "email: sending alert to ops@acme.com" },
      ],
      "Run completed with warnings",
      "warn",
    ),
  },

  "draft-enrichment": {
    name: "Account enrichment",
    file: "draft_02.json",
    nodes: [
      node("1", 0, 120, "HTTP request", "Clearbit API", "Globe", "http_request", "idle"),
      node("2", 300, 120, "Transform", "merge fields", "Braces", "transform", "idle"),
      node("3", 600, 120, "Table output", "enriched_accounts", "Table2", "table_output", "idle"),
    ],
    edges: [edge("e1-2", "1", "2"), edge("e2-3", "2", "3")],
    finalStatus: "success",
    runTimeline: timeline(
      [
        { nodeIds: ["1"], msg: "http_request: enriching via Clearbit" },
        { nodeIds: ["2"], msg: "transform: merging enrichment fields" },
        { nodeIds: ["3"], msg: "output: wrote to enriched_accounts" },
      ],
      "Run succeeded in 2.1s",
    ),
  },

  "new-draft": {
    name: "Untitled workflow",
    file: "draft_01.json",
    nodes: [
      node("1", 0, 120, "Webhook trigger", "not configured", "Webhook", "webhook", "idle"),
      node("2", 300, 120, "Agent", "describe what this should do", "Bot", "agent", "idle"),
    ],
    edges: [edge("e1-2", "1", "2")],
    finalStatus: "success",
    runTimeline: timeline(
      [
        { nodeIds: ["1"], msg: "Run started (trigger: manual)" },
        { nodeIds: ["2"], msg: "agent: no system prompt configured yet" },
      ],
      "Run finished — configure the Agent node to do more",
    ),
  },

  "github-briefing": {
    name: "GitHub engineering briefing",
    file: "github_briefing.json",
    nodes: [
      node("1", 0, 120, "Webhook trigger", "/hooks/github", "Webhook", "webhook", "idle"),
      node("2", 300, 120, "HTTP request", "GitHub commits API", "Globe", "http_request", "idle"),
      node("3", 600, 120, "Agent", "summarize_commits", "Bot", "agent", "idle"),
      node("4", 900, 120, "Email", "eng-team@acme.com", "Mail", "email", "idle"),
    ],
    edges: [edge("e1-2", "1", "2"), edge("e2-3", "2", "3"), edge("e3-4", "3", "4")],
    finalStatus: "success",
    runTimeline: timeline(
      [
        { nodeIds: ["1"], msg: "Run started (trigger: webhook)" },
        { nodeIds: ["2"], msg: "http_request: fetched 42 commits since last briefing" },
        { nodeIds: ["3"], msg: "agent: drafting engineering briefing" },
        { nodeIds: ["4"], msg: "email: sending briefing to eng-team@acme.com" },
      ],
      "Run succeeded in 3.4s",
    ),
  },

  "jira-triage": {
    name: "Jira issue triage",
    file: "jira_triage.json",
    nodes: [
      node("1", 0, 120, "Webhook trigger", "/hooks/issues", "Webhook", "webhook", "idle"),
      node("2", 300, 120, "Classifier", "priority scoring", "Wand2", "classifier", "idle"),
      node("3", 600, 120, "Transform", "filter high-priority", "Braces", "transform", "idle"),
      node("4", 900, 120, "Table output", "triaged_issues", "Table2", "table_output", "idle"),
    ],
    edges: [edge("e1-2", "1", "2"), edge("e2-3", "2", "3"), edge("e3-4", "3", "4")],
    finalStatus: "success",
    runTimeline: timeline(
      [
        { nodeIds: ["1"], msg: "Run started (trigger: webhook)" },
        { nodeIds: ["2"], msg: "classifier: scoring incoming issues by priority" },
        { nodeIds: ["3"], msg: "transform: kept 8 of 34 issues above threshold" },
        { nodeIds: ["4"], msg: "output: wrote triaged issues to report table" },
      ],
      "Run succeeded in 2.8s",
    ),
  },

  "db-join": {
    name: "Multi-source account join",
    file: "account_join.json",
    nodes: [
      node("1", 0, 40, "DB query", "accounts · postgres", "Database", "db_query", "idle"),
      node("2", 0, 200, "DB query", "orders · postgres", "Database", "db_query", "idle"),
      node("3", 300, 120, "Transform", "join on account_id", "Braces", "transform", "idle"),
      node("4", 600, 120, "Table output", "joined_accounts", "Table2", "table_output", "idle"),
    ],
    edges: [edge("e1-3", "1", "3"), edge("e2-3", "2", "3"), edge("e3-4", "3", "4")],
    finalStatus: "success",
    runTimeline: timeline(
      [
        { nodeIds: ["1", "2"], msg: "db_query: pulled accounts and orders tables" },
        { nodeIds: ["3"], msg: "transform: joined 3,204 rows on account_id" },
        { nodeIds: ["4"], msg: "output: wrote to joined_accounts" },
      ],
      "Run succeeded in 2.3s",
    ),
  },
};

export const DEFAULT_PRESET: WorkflowPreset = {
  name: "New workflow",
  file: "untitled.json",
  nodes: [],
  edges: [],
  finalStatus: "success",
  runTimeline: [],
};

export function getWorkflowPreset(id: string | undefined): WorkflowPreset {
  if (!id) return WORKFLOW_PRESETS["new-leads-automation"];
  return WORKFLOW_PRESETS[id] ?? DEFAULT_PRESET;
}
