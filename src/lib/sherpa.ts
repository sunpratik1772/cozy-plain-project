import { WORKFLOWS } from "@/data/emt";

export interface ClarificationOption {
  key: string;
  label: string;
}

export interface SherpaWorkflowContext {
  name: string;
  nodeCount: number;
}

export interface SherpaReply {
  text: string;
  action?: { label: string; to: string };
  workflow?: SherpaWorkflowContext;
  clarification?: { question: string; options: ClarificationOption[] };
}

const KEYWORD_REPLIES: { match: RegExp; reply: SherpaReply }[] = [
  {
    match: /(postgres|database|db|sql)/i,
    reply: {
      text: "I can wire up a Postgres source and scope it to the tables you need. I've dropped a DB query node into a draft — you can point it at any connected source from there.",
      action: { label: "Open in Studio", to: "/studio/leads-pipeline" },
      workflow: { name: "Lead scoring pipeline", nodeCount: 8 },
    },
  },
  {
    match: /(csv|spreadsheet|file)/i,
    reply: {
      text: "Sure — I've started a workflow with a CSV extract node so you can map columns and schedule a refresh.",
      action: { label: "Open in Studio", to: "/studio/daily-sync" },
      workflow: { name: "Daily data sync", nodeCount: 5 },
    },
  },
  {
    match: /(alert|monitor|spike|anomaly)/i,
    reply: {
      text: "I'll build a monitor: a webhook trigger, a classifier to flag anomalies, and an email step for alerts — same shape as your existing Orders anomaly monitor.",
      action: { label: "Open in Studio", to: "/studio/orders-monitor" },
      workflow: { name: "Orders anomaly monitor", nodeCount: 7 },
    },
  },
  {
    match: /(schedule|cron|nightly|daily)/i,
    reply: {
      text: "I've added a schedule trigger and chained it to the rest of the pipeline. You can tune the cron expression from the node's Config tab.",
      action: { label: "Open in Studio", to: "/studio/daily-sync" },
      workflow: { name: "Daily data sync", nodeCount: 5 },
    },
  },
];

const REPORT_CLARIFICATION: SherpaReply = {
  text: "I can build that as a report pipeline. One thing first —",
  clarification: {
    question: "For the top-contributors ranking, which column should I group by?",
    options: [
      { key: "A", label: "company — rank by total order value" },
      { key: "B", label: "region — rank by order volume" },
      { key: "C", label: "rep — rank by leads closed" },
      { key: "D", label: "Something else — describe it in your own words" },
    ],
  },
};

const FALLBACKS = [
  "I can help you build that as a workflow — trigger, data, transform, and an output step. Want me to scaffold it in Studio?",
  "Let's turn that into a workflow. I'll start from a blank canvas with a trigger and the nodes that make sense for what you described.",
];

export function getSherpaReply(prompt: string): SherpaReply {
  if (/(report|excel|export|summary|top contributors)/i.test(prompt)) {
    return REPORT_CLARIFICATION;
  }

  for (const { match, reply } of KEYWORD_REPLIES) {
    if (match.test(prompt)) return reply;
  }

  const mentioned = WORKFLOWS.find((w) => prompt.toLowerCase().includes(w.name.toLowerCase().split(" ")[0]));
  if (mentioned) {
    return {
      text: `"${mentioned.name}" is already saved (${mentioned.filename}). I can open it in Studio so you can adjust it, or start a fresh variant.`,
      action: { label: "Open in Studio", to: `/studio/${mentioned.id}` },
      workflow: { name: mentioned.name, nodeCount: mentioned.nodeCount },
    };
  }

  const text = FALLBACKS[prompt.length % FALLBACKS.length];
  return { text, action: { label: "Open in Studio", to: "/studio" } };
}

export function getClarificationFollowup(option: ClarificationOption): SherpaReply {
  const dimension = option.label.split(" — ")[0];
  if (option.key === "D") {
    return {
      text: "No problem — tell me how you'd like it grouped and I'll adjust the report step.",
    };
  }
  return {
    text: `Got it — I'll group top contributors by ${dimension}. Building the exec report now.`,
    action: { label: "Open in Studio", to: "/studio/report-generator" },
    workflow: { name: "Weekly exec report", nodeCount: 11 },
  };
}

export function getImproveSuggestion(workflow: SherpaWorkflowContext | null): string {
  if (!workflow) return "Describe a workflow first and I'll suggest an improvement once it's built.";
  const suggestions: Record<string, string> = {
    "Lead scoring pipeline": "I'd add a retry policy on the DB query step so a slow Postgres connection doesn't fail the whole run.",
    "Daily data sync": "The HTTP request step has no timeout configured — I'd cap it at 10s and fall back to the last cached rate.",
    "Orders anomaly monitor": "I'd widen the baseline window from 7 to 14 days so single-day noise triggers fewer false alerts.",
    "Weekly exec report": "I'd cache the aggregation step's output so re-running the report for a Slack request doesn't re-query Postgres.",
  };
  return suggestions[workflow.name] ?? `I'd add error handling around the first data step in "${workflow.name}" so a bad row doesn't fail the whole run.`;
}
