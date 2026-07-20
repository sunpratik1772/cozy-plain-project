import { WORKFLOW_PRESETS } from "./workflowPresets";
import type { EmtRun, RunStatus } from "./emt";

export interface RunStepDetail {
  name: string;
  type: string;
  status: RunStatus;
  durationMs: number;
}

export interface RunDetail {
  runId: string;
  workflowName: string;
  status: RunStatus;
  startedLabel: string;
  finishedLabel: string;
  durationLabel: string;
  nodeCount: number;
  edgeCount: number;
  steps: RunStepDetail[];
  generatedFile?: { name: string; sizeLabel: string };
}

function seededDuration(seed: string, min: number, max: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return min + (h % (max - min));
}

export function getRunDetail(run: EmtRun): RunDetail {
  const preset = Object.values(WORKFLOW_PRESETS).find((p) => p.name === run.workflowName);
  const nodes = preset?.nodes ?? [];
  const edges = preset?.edges ?? [];

  const steps: RunStepDetail[] = nodes.map((n, i) => {
    const isLast = i === nodes.length - 1;
    const status: RunStatus = run.status === "error" && isLast ? "error" : run.status === "warning" && isLast ? "warning" : "success";
    return {
      name: n.data.label,
      type: n.data.nodeType,
      status,
      durationMs: seededDuration(`${run.id}-${n.id}`, 780, 1400),
    };
  });

  const hasOutput = nodes.some((n) => ["table_output", "email", "csv_extract"].includes(n.data.nodeType));

  return {
    runId: run.id.replace(/^run[-_]?/, "").padEnd(24, "0").slice(0, 24),
    workflowName: run.workflowName,
    status: run.status,
    startedLabel: run.time,
    finishedLabel: run.time,
    durationLabel: run.duration,
    nodeCount: nodes.length || 4,
    edgeCount: edges.length || 3,
    steps,
    generatedFile: hasOutput ? { name: "output.xlsx", sizeLabel: "128 KB" } : undefined,
  };
}
