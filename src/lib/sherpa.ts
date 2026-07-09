import { WORKFLOWS } from "@/data/emt";

export interface SherpaReply {
  text: string;
  action?: { label: string; to: string };
}

const KEYWORD_REPLIES: { match: RegExp; reply: SherpaReply }[] = [
  {
    match: /(postgres|database|db|sql)/i,
    reply: {
      text: "I can wire up a Postgres source and scope it to the tables you need. I'll drop a DB query node into a new draft — you can point it at any connected source from there.",
      action: { label: "Open in Studio", to: "/studio" },
    },
  },
  {
    match: /(csv|spreadsheet|file)/i,
    reply: {
      text: "Sure — I'll start a workflow with a CSV extract node so you can map columns and schedule a refresh.",
      action: { label: "Open in Studio", to: "/studio" },
    },
  },
  {
    match: /(alert|monitor|spike|anomaly)/i,
    reply: {
      text: "I'll build a monitor: a trigger, a classifier to flag anomalies, and an output step for alerts. Similar to your existing Orders anomaly monitor workflow.",
      action: { label: "Open in Studio", to: "/studio" },
    },
  },
  {
    match: /(report|summary|weekly|exec)/i,
    reply: {
      text: "Got it — a scheduled report pipeline: query your data, summarize with an agent step, and email the result. I'll scaffold it now.",
      action: { label: "Open in Studio", to: "/studio" },
    },
  },
  {
    match: /(schedule|cron|nightly|daily)/i,
    reply: {
      text: "I'll add a schedule trigger and chain it to your existing steps. You can tune the cron expression in the node config panel.",
      action: { label: "Open in Studio", to: "/studio" },
    },
  },
];

const FALLBACKS = [
  "I can help you build that as a workflow — trigger, data, transform, and an output step. Want me to scaffold it in Studio?",
  "Let's turn that into a workflow. I'll start from a blank canvas with a trigger and the nodes that make sense for what you described.",
];

export function getSherpaReply(prompt: string): SherpaReply {
  for (const { match, reply } of KEYWORD_REPLIES) {
    if (match.test(prompt)) return reply;
  }

  const mentioned = WORKFLOWS.find((w) => prompt.toLowerCase().includes(w.name.toLowerCase().split(" ")[0]));
  if (mentioned) {
    return {
      text: `"${mentioned.name}" is already saved (${mentioned.filename}). I can open it in Studio so you can adjust it, or start a fresh variant.`,
      action: { label: "Open in Studio", to: "/studio" },
    };
  }

  const text = FALLBACKS[prompt.length % FALLBACKS.length];
  return { text, action: { label: "Open in Studio", to: "/studio" } };
}
