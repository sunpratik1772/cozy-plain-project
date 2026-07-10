import type { Edge, Node } from "@xyflow/react";
import type { FlowNodeData } from "@/components/emt/studio/FlowNode";
import { useStudioStore, genId } from "@/store/studioStore";
import type {
  AgentFinalSummary,
  ClarificationAnswer,
  CopilotActiveRoute,
  PendingClarification,
  SherpaMessage,
  ThinkingStep,
} from "@/store/studioTypes";

function node(
  id: string,
  x: number,
  y: number,
  label: string,
  sub: string,
  icon: string,
  nodeType: string,
  status: FlowNodeData["status"] = "idle",
): Node<FlowNodeData> {
  return { id, type: "emt", position: { x, y }, data: { label, sub, icon, status, nodeType } };
}

function edge(id: string, source: string, target: string): Edge {
  return { id, source, target };
}

interface BuildPlan {
  name: string;
  nodes: Node<FlowNodeData>[];
  edges: Edge[];
  thinking: string[];
  summary: AgentFinalSummary;
}

const PLANS: Record<string, BuildPlan> = {
  "lead-scoring": {
    name: "Lead scoring pipeline",
    nodes: [
      node("s1", 0, 120, "Schedule", "0 2 * * *", "CalendarClock", "schedule"),
      node("s2", 260, 40, "DB query", "leads · postgres", "Database", "db_query"),
      node("s3", 260, 200, "CSV extract", "orders.csv", "FileSpreadsheet", "csv_extract"),
      node("s4", 520, 120, "Transform", "join + filter", "Braces", "transform"),
      node("s5", 780, 120, "Agent", "score_leads", "Bot", "agent"),
      node("s6", 1040, 120, "Table output", "scored_leads", "Table2", "table_output"),
    ],
    edges: [
      edge("se1-2", "s1", "s2"),
      edge("se1-3", "s1", "s3"),
      edge("se2-4", "s2", "s4"),
      edge("se3-4", "s3", "s4"),
      edge("se4-5", "s4", "s5"),
      edge("se5-6", "s5", "s6"),
    ],
    thinking: [
      "Reading your request and identifying the goal: score leads from Postgres nightly.",
      "Checking connected data sources — Postgres (production) and orders.csv are available.",
      "Planning service topology — 6 nodes across trigger, data, transform, AI, and output.",
      "Matching blueprints — this resembles your existing Lead scoring pipeline pattern.",
      "Generating the workflow graph and wiring typed ports in dependency order.",
    ],
    summary: {
      title: "Workflow generated",
      bullets: [
        "Schedule trigger fires nightly at 02:00 UTC",
        "DB query pulls 500 leads from Postgres, CSV extracts 12,402 orders",
        "Transform joins and filters to 342 active leads",
        "Agent scores each lead 0–100 in batches of 100",
        "Table output materializes 342 rows to scored_leads",
      ],
      spawnedCount: 6,
      completedCount: 6,
      failedCount: 0,
    },
  },
  "anomaly-monitor": {
    name: "Orders anomaly monitor",
    nodes: [
      node("a1", 0, 120, "Webhook trigger", "/hooks/orders", "Webhook", "webhook"),
      node("a2", 300, 120, "Classifier", "spike detection", "Wand2", "classifier"),
      node("a3", 600, 120, "Email", "ops@acme.com", "Mail", "email"),
    ],
    edges: [edge("ae1-2", "a1", "a2"), edge("ae2-3", "a2", "a3")],
    thinking: [
      "Reading your request — you want alerts when orders spike.",
      "Checking data sources — the orders webhook is already configured.",
      "Planning service topology — webhook trigger, classifier, email alert.",
      "Matching blueprints — this matches your Orders anomaly monitor pattern.",
      "Generating the workflow graph.",
    ],
    summary: {
      title: "Workflow generated",
      bullets: [
        "Webhook trigger listens on /hooks/orders",
        "Classifier compares order volume against a 7-day baseline",
        "Email alerts ops@acme.com when a spike is detected",
      ],
      spawnedCount: 3,
      completedCount: 3,
      failedCount: 0,
    },
  },
  "exec-report": {
    name: "Weekly exec report",
    nodes: [
      node("r1", 0, 120, "Schedule", "0 8 * * 1", "CalendarClock", "schedule"),
      node("r2", 260, 120, "DB query", "orders · postgres", "Database", "db_query"),
      node("r3", 520, 120, "Transform", "aggregate by region", "Braces", "transform"),
      node("r4", 780, 120, "Agent", "summarize_orders", "Bot", "agent"),
      node("r5", 1040, 120, "Table output", "exec_summary", "Table2", "table_output"),
      node("r6", 1300, 120, "Email", "exec-team@acme.com", "Mail", "email"),
    ],
    edges: [
      edge("re1-2", "r1", "r2"),
      edge("re2-3", "r2", "r3"),
      edge("re3-4", "r3", "r4"),
      edge("re4-5", "r4", "r5"),
      edge("re5-6", "r5", "r6"),
    ],
    thinking: [
      "Reading your request — a weekly executive report.",
      "Checking data sources — Postgres orders table is available.",
      "Planning service topology — schedule, query, aggregate, summarize, output, email.",
      "Matching blueprints — weekly report pattern with email distribution.",
      "Generating the workflow graph.",
    ],
    summary: {
      title: "Workflow generated",
      bullets: [
        "Schedule trigger fires Mondays at 08:00 UTC",
        "DB query pulls current-week orders from Postgres",
        "Transform aggregates 1,204 orders by region",
        "Agent drafts an executive summary",
        "Table output writes to exec_summary, Email sends to 6 recipients",
      ],
      spawnedCount: 6,
      completedCount: 6,
      failedCount: 0,
    },
  },
  "daily-sync": {
    name: "Daily data sync",
    nodes: [
      node("d1", 0, 120, "Schedule", "0 6 * * *", "CalendarClock", "schedule"),
      node("d2", 260, 40, "CSV extract", "orders.csv", "FileSpreadsheet", "csv_extract"),
      node("d3", 260, 200, "HTTP request", "fx-rates API", "Globe", "http_request"),
      node("d4", 520, 120, "Transform", "merge + normalize", "Braces", "transform"),
      node("d5", 780, 120, "Table output", "daily_totals", "Table2", "table_output"),
    ],
    edges: [
      edge("de1-2", "d1", "d2"),
      edge("de1-3", "d1", "d3"),
      edge("de2-4", "d2", "d4"),
      edge("de3-4", "d3", "d4"),
      edge("de4-5", "d4", "d5"),
    ],
    thinking: [
      "Reading your request — a nightly data sync.",
      "Checking data sources — orders.csv and the fx-rates HTTP API are available.",
      "Planning service topology — schedule, CSV extract, HTTP request, merge, output.",
      "Generating the workflow graph.",
    ],
    summary: {
      title: "Workflow generated",
      bullets: [
        "Schedule trigger fires daily at 06:00 UTC",
        "CSV extract loads 240 rows from orders.csv",
        "HTTP request fetches current fx-rates",
        "Transform merges and normalizes both sources",
        "Table output writes daily totals",
      ],
      spawnedCount: 5,
      completedCount: 5,
      failedCount: 0,
    },
  },
};

interface RouteResult {
  intent: CopilotActiveRoute;
  planKey?: keyof typeof PLANS;
  clarification?: PendingClarification;
  answer?: string;
  planSteps?: string[];
}

function route(prompt: string): RouteResult {
  const p = prompt.toLowerCase();

  if (/(report|excel|export|summary|top contributors|exec)/i.test(prompt)) {
    return {
      intent: "build",
      clarification: {
        questions: [
          {
            id: "q_group",
            kind: "choice",
            question: "For the top-contributors ranking, which column should I group by?",
            options: [
              { id: "company", label: "company — rank by total order value" },
              { id: "region", label: "region — rank by order volume" },
              { id: "rep", label: "rep — rank by leads closed" },
              { id: "other", label: "Something else — describe it in your own words" },
            ],
            defaultOptionId: "company",
            allowMultiple: false,
          },
        ],
        pendingMessage: prompt,
      },
    };
  }

  if (/(lead|score|scoring)/i.test(prompt)) return { intent: "build", planKey: "lead-scoring" };
  if (/(alert|monitor|spike|anomaly)/i.test(prompt)) return { intent: "build", planKey: "anomaly-monitor" };
  if (/(sync|nightly|daily|csv|spreadsheet)/i.test(prompt)) return { intent: "build", planKey: "daily-sync" };
  if (/(schedule|cron)/i.test(prompt)) return { intent: "build", planKey: "daily-sync" };

  if (/(what|how|why|explain|difference|best|should|can you)/i.test(prompt)) {
    return {
      intent: "ask",
      answer:
        "Great question. Based on your connected sources and existing workflows, here's what I'd recommend:\n\nThe most reliable approach is to chain a **DB query** node to pull the raw data, then a **Transform** node to shape it, and finally an **Agent** node if you need any reasoning or classification. This keeps each step testable and lets you re-run from any point.\n\nWant me to scaffold this as a workflow on the canvas?",
    };
  }

  return { intent: "build", planKey: "lead-scoring" };
}

function resolveClarification(prompt: string, answers: ClarificationAnswer[]): RouteResult {
  const first = answers[0];
  if (first?.selectionIds.includes("other")) {
    return {
      intent: "ask",
      answer:
        "No problem — tell me how you'd like it grouped and I'll adjust the report step. You can describe the column or logic in your own words and I'll wire it up.",
    };
  }
  const dimension = first?.labels[0]?.split(" — ")[0] ?? "company";
  return {
    intent: "build",
    planKey: "exec-report",
    planSteps: [
      `Group top contributors by ${dimension}`,
      "Aggregate order value per group",
      "Rank and export to Excel",
      "Email to exec-team@acme.com",
    ],
  };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
let activeAbort: AbortController | null = null;

export function stopSherpaStream() {
  if (activeAbort) {
    activeAbort.abort();
    activeAbort = null;
  }
}

export async function runSherpaSend(prompt: string) {
  if (activeAbort) activeAbort.abort();
  const controller = new AbortController();
  activeAbort = controller;
  const signal = controller.signal;

  const store = useStudioStore.getState();
  const userMsg: SherpaMessage = {
    id: genId("msg"),
    role: "user",
    content: prompt,
    timestamp: Date.now(),
  };
  store.addCopilotMessage(userMsg);

  const result = route(prompt);

  store.setCopilotStream({
    copilotStreamActive: true,
    copilotActiveRoute: result.intent,
    copilotActivityMode: "thinking",
    copilotThinkingOpen: true,
    copilotThinkingSteps: [],
    copilotStreamText: "",
    copilotStreamError: null,
    copilotFinalSummary: null,
    copilotWorkflowCreated: null,
  });

  await sleep(400);
  if (signal.aborted) return;

  if (result.clarification) {
    store.setCopilotStream({
      copilotActivityMode: "clarifying",
      copilotStreamActive: false,
    });
    store.setCopilotPendingClarification(result.clarification);
    return;
  }

  if (result.intent === "ask" && result.answer) {
    await streamAnswer(result.answer, signal);
    return;
  }

  if (result.intent === "build" && result.planKey) {
    await streamBuild(PLANS[result.planKey], signal);
    return;
  }
}

export async function resolveSherpaClarification(answers: ClarificationAnswer[]) {
  const store = useStudioStore.getState();
  const pending = store.copilotPendingClarification;
  if (!pending) return;

  const answerMsg: SherpaMessage = {
    id: genId("msg"),
    role: "user",
    content: answers.flatMap((a) => a.labels).join(", "),
    timestamp: Date.now(),
  };
  store.addCopilotMessage(answerMsg);
  store.setCopilotPendingClarification(null);

  const result = resolveClarification(pending.pendingMessage, answers);

  store.setCopilotStream({
    copilotStreamActive: true,
    copilotActiveRoute: result.intent,
    copilotActivityMode: "thinking",
    copilotThinkingOpen: true,
    copilotThinkingSteps: [],
  });

  await sleep(400);

  if (result.intent === "ask" && result.answer) {
    await streamAnswer(result.answer, new AbortController().signal);
    return;
  }

  if (result.intent === "build" && result.planKey) {
    await streamBuild(PLANS[result.planKey], new AbortController().signal);
  }
}

async function streamAnswer(text: string, signal: AbortSignal) {
  const store = useStudioStore.getState();
  store.setCopilotStream({ copilotActivityMode: "answering" });

  const assistantMsg: SherpaMessage = {
    id: genId("msg"),
    role: "assistant",
    content: "",
    timestamp: Date.now(),
    streaming: true,
  };
  store.addCopilotMessage(assistantMsg);

  const words = text.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (signal.aborted) return;
    await sleep(18 + Math.random() * 22);
    useStudioStore.getState().appendToLastAssistant((i === 0 ? "" : " ") + words[i]);
  }
  useStudioStore.getState().setLastAssistantStreaming(false);
  useStudioStore.getState().setCopilotStream({
    copilotStreamActive: false,
    copilotActivityMode: null,
    copilotActiveRoute: null,
  });
  activeAbort = null;
}

async function streamBuild(plan: BuildPlan, signal: AbortSignal) {
  const store = useStudioStore.getState();
  store.setCopilotStream({ copilotActivityMode: "planning" });

  const steps: ThinkingStep[] = [];
  for (let i = 0; i < plan.thinking.length; i++) {
    if (signal.aborted) return;
    const stepId = `step_${i}`;
    steps.push({
      id: stepId,
      text: plan.thinking[i],
      done: false,
      startedAt: Date.now(),
      kind: i === 0 ? "thinking" : "stage",
      status: "running",
    });
    useStudioStore.getState().setCopilotThinkingSteps([...steps]);
    await sleep(650 + Math.random() * 350);
    steps[i] = { ...steps[i], done: true, status: "done", durationSec: 0.8 };
    useStudioStore.getState().setCopilotThinkingSteps([...steps]);
  }

  if (signal.aborted) return;
  useStudioStore.getState().setCopilotStream({ copilotActivityMode: "generating", copilotHarnessGenerating: true });

  const assistantMsg: SherpaMessage = {
    id: genId("msg"),
    role: "assistant",
    content: "",
    timestamp: Date.now(),
    streaming: true,
    steps: [...steps],
  };
  store.addCopilotMessage(assistantMsg);

  const intro = `I've generated **${plan.name}** on the canvas — ${plan.nodes.length} nodes wired in dependency order. `;
  const words = intro.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (signal.aborted) return;
    await sleep(20);
    useStudioStore.getState().appendToLastAssistant((i === 0 ? "" : " ") + words[i]);
  }

  useStudioStore.getState().setWorkflow(plan.name, [], []);
  await sleep(300);
  for (let i = 0; i < plan.nodes.length; i++) {
    if (signal.aborted) return;
    await sleep(220);
    useStudioStore.getState().setNodes(plan.nodes.slice(0, i + 1));
  }
  await sleep(200);
  for (let i = 0; i < plan.edges.length; i++) {
    if (signal.aborted) return;
    await sleep(140);
    useStudioStore.getState().setEdges(plan.edges.slice(0, i + 1));
  }

  useStudioStore.getState().setCopilotStream({ copilotHarnessGenerating: false });
  useStudioStore.getState().setLastAssistantStreaming(false);

  const summaryText = `\n\n**${plan.summary.title}**\n${plan.summary.bullets.map((b) => `• ${b}`).join("\n")}`;
  useStudioStore.getState().appendToLastAssistant(summaryText);

  const finalMsg = useStudioStore.getState().copilotMessages;
  const lastIdx = finalMsg.length - 1;
  if (lastIdx >= 0) {
    const updated = [...finalMsg];
    updated[lastIdx] = {
      ...updated[lastIdx],
      summary: plan.summary,
      newWorkflow: { name: plan.name, nodes: plan.nodes, edges: plan.edges },
      streaming: false,
    };
    useStudioStore.getState().setCopilotStream({ copilotMessages: updated });
  }

  useStudioStore.getState().setCopilotStream({
    copilotStreamActive: false,
    copilotActivityMode: null,
    copilotActiveRoute: null,
    copilotFinalSummary: plan.summary,
    copilotWorkflowCreated: { name: plan.name, nodeCount: plan.nodes.length },
  });
  activeAbort = null;
}

export async function runWorkflowOnCanvas() {
  const store = useStudioStore.getState();
  if (store.isRunning) return;
  const nodes = store.nodes;
  if (!nodes.length) return;

  store.setRunning(true);
  store.setRunStatus("running");
  store.resetRun();
  store.setCopilotStream({ copilotActivityMode: "generating" });

  const ordered = topoSort(nodes, store.edges);
  const totalMs = ordered.length * 700 + 400;

  for (let i = 0; i < ordered.length; i++) {
    const n = ordered[i];
    store.setNodeStatus([n.id], "running");
    store.addLog({
      t: new Date().toLocaleTimeString("en-US", { hour12: false }),
      level: "info",
      msg: `${n.data.label}: started`,
    });
    await sleep(700);
    const hasError = n.data.nodeType === "http_request" && Math.random() < 0.3;
    if (hasError) {
      store.setNodeStatus([n.id], "error");
      store.addLog({
        t: new Date().toLocaleTimeString("en-US", { hour12: false }),
        level: "error",
        msg: `${n.data.label}: failed — connection timeout`,
      });
      store.setRunStatus("error");
      store.setRunError(`${n.data.label} failed — connection timeout`);
      store.setRunning(false);
      store.setCopilotStream({ copilotActivityMode: null });
      return;
    }
    store.setNodeStatus([n.id], "success");
    store.addLog({
      t: new Date().toLocaleTimeString("en-US", { hour12: false }),
      level: "info",
      msg: `${n.data.label}: completed`,
    });
  }

  store.setRunStatus("success");
  store.setRunResult({
    status: "success",
    totalMs,
    nodeCount: ordered.length,
    disposition: "COMPLETED",
    summary: `Run succeeded in ${(totalMs / 1000).toFixed(1)}s — all ${ordered.length} nodes completed.`,
  });
  store.addLog({
    t: new Date().toLocaleTimeString("en-US", { hour12: false }),
    level: "info",
    msg: `Run succeeded in ${(totalMs / 1000).toFixed(1)}s`,
  });
  store.setRunning(false);
  store.setCopilotStream({ copilotActivityMode: null });
}

function topoSort(nodes: Node<FlowNodeData>[], edges: Edge[]): Node<FlowNodeData>[] {
  const adj = new Map<string, string[]>();
  const inDeg = new Map<string, number>();
  nodes.forEach((n) => {
    adj.set(n.id, []);
    inDeg.set(n.id, 0);
  });
  edges.forEach((e) => {
    adj.get(e.source)?.push(e.target);
    inDeg.set(e.target, (inDeg.get(e.target) ?? 0) + 1);
  });
  const queue: string[] = [];
  inDeg.forEach((d, id) => {
    if (d === 0) queue.push(id);
  });
  const result: Node<FlowNodeData>[] = [];
  while (queue.length) {
    const id = queue.shift()!;
    const n = nodes.find((x) => x.id === id);
    if (n) result.push(n);
    adj.get(id)?.forEach((t) => {
      inDeg.set(t, (inDeg.get(t) ?? 1) - 1);
      if (inDeg.get(t) === 0) queue.push(t);
    });
  }
  return result.length === nodes.length ? result : nodes;
}
