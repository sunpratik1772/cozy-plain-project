export interface EmtTemplate {
  id: string;
  title: string;
  description: string;
  nodeCount: number;
  updatedLabel: string;
  presetId: string;
}

export const TEMPLATES: EmtTemplate[] = [
  {
    id: "csv-orders-rollup",
    title: "CSV Orders Pipeline → Daily Rollup",
    description: "Ingests a sample orders CSV, cross-checks it against a live rates API, and rolls up daily totals.",
    nodeCount: 5,
    updatedLabel: "19h ago",
    presetId: "daily-sync",
  },
  {
    id: "github-briefing",
    title: "GitHub Engineering Briefing → Email Digest",
    description: "Collects recent repository commits, composes an executive-ready summary, and emails the team.",
    nodeCount: 4,
    updatedLabel: "19h ago",
    presetId: "github-briefing",
  },
  {
    id: "jira-triage",
    title: "Jira Issue Triage → Highlighted Report",
    description: "Scores incoming issues by priority, filters the noise, and writes a triaged report table.",
    nodeCount: 4,
    updatedLabel: "19h ago",
    presetId: "jira-triage",
  },
  {
    id: "signal-ranking",
    title: "DB Signal Ranking → Ranked CSV",
    description: "Queries Postgres in real time, ranks high-priority leads, and exports a structured CSV.",
    nodeCount: 6,
    updatedLabel: "19h ago",
    presetId: "leads-pipeline",
  },
  {
    id: "account-join",
    title: "Multi-source Account Join → Workbook",
    description: "Joins two live Postgres extracts on a shared key and exports the merged result.",
    nodeCount: 4,
    updatedLabel: "19h ago",
    presetId: "db-join",
  },
  {
    id: "order-anomaly",
    title: "Order Anomaly Detection → Alert",
    description: "Flags order-volume spikes against a rolling baseline and alerts the ops channel.",
    nodeCount: 3,
    updatedLabel: "19h ago",
    presetId: "orders-monitor",
  },
  {
    id: "exec-report",
    title: "Weekly Exec Report Builder",
    description: "Aggregates the week's orders, drafts an executive summary with an agent step, and emails it out.",
    nodeCount: 6,
    updatedLabel: "19h ago",
    presetId: "report-generator",
  },
  {
    id: "account-enrichment",
    title: "Account Enrichment via API",
    description: "Enriches account records from an external API and writes the merged fields to a table.",
    nodeCount: 3,
    updatedLabel: "19h ago",
    presetId: "draft-enrichment",
  },
];
