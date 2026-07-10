import { create } from "zustand";
import type { Edge, Node } from "@xyflow/react";
import type { FlowNodeData } from "@/components/emt/studio/FlowNode";
import type { EmtLogLine, RunStatus } from "@/data/emt";
import type {
  AgentFinalSummary,
  CopilotActiveRoute,
  PendingClarification,
  RightPanelMode,
  RunLogEntry,
  RunResult,
  SherpaActivityMode,
  SherpaMessage,
  StudioStore,
  ThinkingStep,
} from "./studioTypes";

function genId(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

const emptyStreamSurface = {
  copilotStreamActive: false,
  copilotActiveRoute: null as CopilotActiveRoute,
  copilotHarnessGenerating: false,
  copilotActivityMode: null as SherpaActivityMode,
  copilotThinkingSteps: [] as ThinkingStep[],
  copilotThinkingOpen: false,
  copilotStreamText: "",
  copilotPlanPhaseStreaming: false,
  copilotWorkflowCreated: null,
  copilotStreamError: null,
  copilotFinalSummary: null as AgentFinalSummary | null,
  copilotPendingClarification: null as PendingClarification | null,
};

export const useStudioStore = create<StudioStore>((set, get) => ({
  // Canvas
  workflowName: "Lead scoring pipeline",
  nodes: [],
  edges: [],
  selectedNodeId: null,
  generating: false,
  setWorkflow: (name, nodes, edges) => set({ workflowName: name, nodes, edges }),
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  addNode: (node) => set((s) => ({ nodes: [...s.nodes, node] })),
  updateNodePosition: (id, x, y) =>
    set((s) => ({ nodes: s.nodes.map((n) => (n.id === id ? { ...n, position: { x, y } } : n)) })),
  selectNode: (id) => set({ selectedNodeId: id }),
  setNodeStatus: (ids, status) =>
    set((s) => ({
      nodes: s.nodes.map((n) => (ids.includes(n.id) ? { ...n, data: { ...n.data, status } } : n)),
    })),
  setGenerating: (v) => set({ generating: v }),
  clearWorkflow: () => set({ workflowName: "New workflow", nodes: [], edges: [], selectedNodeId: null }),

  // Run
  isRunning: false,
  runStatus: "success" as RunStatus,
  runLog: [] as RunLogEntry[],
  runResult: null,
  runError: null,
  runTotalMs: null,
  logs: [] as EmtLogLine[],
  setRunning: (v) => set({ isRunning: v }),
  setRunStatus: (s) => set({ runStatus: s }),
  addLog: (l) => set((s) => ({ logs: [...s.logs, l] })),
  setRunResult: (r) => set({ runResult: r }),
  setRunError: (e) => set({ runError: e }),
  resetRun: () =>
    set({ isRunning: false, runLog: [], runResult: null, runError: null, runTotalMs: null, logs: [] }),

  // Copilot / Sherpa
  copilotMessages: [],
  copilotSessionId: genId("session"),
  ...emptyStreamSurface,
  addCopilotMessage: (msg) => set((s) => ({ copilotMessages: [...s.copilotMessages, msg] })),
  appendToLastAssistant: (chunk) =>
    set((s) => {
      const msgs = [...s.copilotMessages];
      for (let i = msgs.length - 1; i >= 0; i--) {
        if (msgs[i].role === "assistant") {
          msgs[i] = { ...msgs[i], content: msgs[i].content + chunk };
          break;
        }
      }
      return { copilotMessages: msgs };
    }),
  setLastAssistantStreaming: (v) =>
    set((s) => {
      const msgs = [...s.copilotMessages];
      for (let i = msgs.length - 1; i >= 0; i--) {
        if (msgs[i].role === "assistant") {
          msgs[i] = { ...msgs[i], streaming: v };
          break;
        }
      }
      return { copilotMessages: msgs };
    }),
  setCopilotStream: (patch) => set((s) => ({ ...s, ...patch })),
  setCopilotThinkingSteps: (steps) =>
    set((s) => ({
      copilotThinkingSteps: typeof steps === "function" ? (steps as (p: ThinkingStep[]) => ThinkingStep[])(s.copilotThinkingSteps) : steps,
    })),
  setCopilotPendingClarification: (p) => set({ copilotPendingClarification: p }),
  resetCopilotStreamSurface: () => set(emptyStreamSurface),
  clearCopilotMessages: () => set({ copilotMessages: [] }),

  // UI
  rightPanelMode: "sherpa",
  setRightPanelMode: (m) => set({ rightPanelMode: m }),
}));

export { genId };
export type { Edge, Node, FlowNodeData };
