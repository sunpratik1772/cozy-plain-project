import type { Edge, Node } from "@xyflow/react";
import type { FlowNodeData } from "@/components/emt/studio/FlowNode";
import type { EmtLogLine, RunStatus } from "@/data/emt";

export type RightPanelMode = "sherpa" | "config" | "output" | "logs";
export type CopilotActiveRoute = "build" | "ask" | "automate" | "load" | "explain_run" | null;
export type SherpaActivityMode =
  | "thinking"
  | "planning"
  | "clarifying"
  | "reviewing"
  | "answering"
  | "generating"
  | "loading"
  | null;

export interface ThinkingStep {
  id: string;
  text: string;
  done: boolean;
  startedAt: number;
  durationSec?: number;
  kind?: "live" | "parallel" | "milestone" | "stage" | "subagent" | "summary" | "thinking";
  subagentName?: string;
  subagentType?: string;
  outcome?: string;
  detail?: string;
  status?: "running" | "done" | "error";
  collapsed?: boolean;
  hideDuration?: boolean;
}

export interface AgentFinalSummary {
  title: string;
  bullets: string[];
  spawnedCount: number;
  completedCount: number;
  failedCount: number;
}

export interface ClarificationOption {
  id: string;
  label: string;
  description?: string;
}

export interface ClarificationQuestion {
  id: string;
  kind: "confirm" | "choice" | "plan_approval";
  question: string;
  options: ClarificationOption[];
  defaultOptionId: string | null;
  allowMultiple: boolean;
}

export interface PendingClarification {
  questions: ClarificationQuestion[];
  pendingMessage: string;
  planApproval?: boolean;
  planSteps?: string[];
}

export interface ClarificationAnswer {
  questionId: string;
  question: string;
  kind: "confirm" | "choice" | "plan_approval";
  selectionIds: string[];
  otherText: string;
  labels: string[];
}

export interface SherpaMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  steps?: ThinkingStep[];
  summary?: AgentFinalSummary | null;
  previousWorkflow?: { name: string; nodes: Node<FlowNodeData>[]; edges: Edge[] } | null;
  newWorkflow?: { name: string; nodes: Node<FlowNodeData>[]; edges: Edge[] } | null;
  reverted?: boolean;
  automationLink?: { id: string; name: string; scheduleSummary?: string };
  streaming?: boolean;
}

export interface RunLogEntry {
  nodeId: string;
  nodeType?: string;
  label?: string;
  status: "running" | "ok" | "error" | "warning";
  durationMs?: number;
  output?: { columns?: string[]; rows?: (string | number)[][]; note?: string };
  error?: string;
  startedAt: number;
}

export interface RunResult {
  status: RunStatus;
  totalMs: number;
  nodeCount: number;
  disposition?: "COMPLETED" | "REVIEW" | "ESCALATE";
  summary?: string;
  datasets?: { name: string; rowCount: number }[];
}

export interface StudioStore {
  // Canvas
  workflowName: string;
  nodes: Node<FlowNodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  generating: boolean;
  setWorkflow: (name: string, nodes: Node<FlowNodeData>[], edges: Edge[]) => void;
  setNodes: (nodes: Node<FlowNodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node<FlowNodeData>) => void;
  updateNodePosition: (id: string, x: number, y: number) => void;
  selectNode: (id: string | null) => void;
  setNodeStatus: (ids: string[], status: FlowNodeData["status"]) => void;
  setGenerating: (v: boolean) => void;
  clearWorkflow: () => void;

  // Run
  isRunning: boolean;
  runStatus: RunStatus;
  runLog: RunLogEntry[];
  runResult: RunResult | null;
  runError: string | null;
  runTotalMs: number | null;
  logs: EmtLogLine[];
  setRunning: (v: boolean) => void;
  setRunStatus: (s: RunStatus) => void;
  addLog: (l: EmtLogLine) => void;
  setRunResult: (r: RunResult | null) => void;
  setRunError: (e: string | null) => void;
  resetRun: () => void;

  // Copilot / Sherpa
  copilotMessages: SherpaMessage[];
  copilotStreamActive: boolean;
  copilotActiveRoute: CopilotActiveRoute;
  copilotHarnessGenerating: boolean;
  copilotActivityMode: SherpaActivityMode;
  copilotThinkingSteps: ThinkingStep[];
  copilotThinkingOpen: boolean;
  copilotStreamText: string;
  copilotPlanPhaseStreaming: boolean;
  copilotWorkflowCreated: { name: string; nodeCount: number } | null;
  copilotStreamError: string | null;
  copilotFinalSummary: AgentFinalSummary | null;
  copilotPendingClarification: PendingClarification | null;
  copilotSessionId: string;
  addCopilotMessage: (msg: SherpaMessage) => void;
  appendToLastAssistant: (chunk: string) => void;
  setLastAssistantStreaming: (v: boolean) => void;
  setCopilotStream: (patch: Partial<StudioStore>) => void;
  setCopilotThinkingSteps: (steps: ThinkingStep[] | ((prev: ThinkingStep[]) => ThinkingStep[])) => void;
  setCopilotPendingClarification: (p: PendingClarification | null) => void;
  resetCopilotStreamSurface: () => void;
  clearCopilotMessages: () => void;

  // UI
  rightPanelMode: RightPanelMode;
  setRightPanelMode: (m: RightPanelMode) => void;
}
