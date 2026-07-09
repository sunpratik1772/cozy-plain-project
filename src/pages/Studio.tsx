import { useCallback, useRef, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Play, Save } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/emt/AppShell";
import { NodePalette } from "@/components/emt/studio/NodePalette";
import { StudioRightPanel } from "@/components/emt/studio/StudioRightPanel";
import { FlowNode, type FlowNodeData } from "@/components/emt/studio/FlowNode";
import { StatusPill } from "@/components/emt/StatusPill";
import { useRun } from "@/contexts/RunContext";
import type { EmtLogLine, EmtNodeDef, RunStatus } from "@/data/emt";

const nodeTypes = { emt: FlowNode };

const WORKFLOW_NAME = "Lead scoring pipeline";
const WORKFLOW_FILE = "leads_pipeline.json";

const initialNodes: Node<FlowNodeData>[] = [
  { id: "1", type: "emt", position: { x: 0, y: 120 }, data: { label: "Schedule", sub: "0 2 * * *", icon: "CalendarClock", status: "success", nodeType: "schedule" } },
  { id: "2", type: "emt", position: { x: 260, y: 40 }, data: { label: "DB query", sub: "leads · postgres", icon: "Database", status: "success", nodeType: "db_query" } },
  { id: "3", type: "emt", position: { x: 260, y: 200 }, data: { label: "CSV extract", sub: "orders.csv", icon: "FileSpreadsheet", status: "success", nodeType: "csv_extract" } },
  { id: "4", type: "emt", position: { x: 520, y: 120 }, data: { label: "Transform", sub: "join + filter", icon: "Braces", status: "success", nodeType: "transform" } },
  { id: "5", type: "emt", position: { x: 780, y: 120 }, data: { label: "Agent", sub: "score_leads", icon: "Bot", status: "success", nodeType: "agent" } },
  { id: "6", type: "emt", position: { x: 1040, y: 120 }, data: { label: "Table output", sub: "scored_leads", icon: "Table2", status: "success", nodeType: "table_output" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e5-6", source: "5", target: "6" },
];

// (delay ms, node ids to mark running → success, log line)
const RUN_TIMELINE: { delay: number; nodeIds: string[]; log: EmtLogLine }[] = [
  { delay: 0, nodeIds: ["1"], log: { t: "now", level: "info", msg: "Run started (trigger: manual)" } },
  { delay: 500, nodeIds: ["2", "3"], log: { t: "now", level: "info", msg: "db_query: SELECT * FROM leads LIMIT 500" } },
  { delay: 1400, nodeIds: [], log: { t: "now", level: "info", msg: "csv_extract: loaded 12,402 rows from orders.csv" } },
  { delay: 2100, nodeIds: ["4"], log: { t: "now", level: "info", msg: "transform: 500 → 342 rows after filter" } },
  { delay: 2900, nodeIds: ["5"], log: { t: "now", level: "info", msg: "agent: scoring batch 1/4" } },
  { delay: 3600, nodeIds: [], log: { t: "now", level: "warn", msg: "agent: 3 rows missing company field" } },
  { delay: 3900, nodeIds: ["6"], log: { t: "now", level: "info", msg: "output: wrote 342 rows to scored_leads" } },
  { delay: 4200, nodeIds: [], log: { t: "now", level: "info", msg: "Run succeeded in 4.2s" } },
];

function timestamp() {
  return new Date().toLocaleTimeString("en-US", { hour12: false });
}

const Studio = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [logs, setLogs] = useState<EmtLogLine[]>([]);
  const [runStatus, setRunStatus] = useState<RunStatus>("success");
  const timers = useRef<number[]>([]);
  const { startRun } = useRun();
  const nodeCounter = useRef(initialNodes.length);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const setNodeStatus = useCallback(
    (ids: string[], status: FlowNodeData["status"]) => {
      setNodes((nds) => nds.map((n) => (ids.includes(n.id) ? { ...n, data: { ...n.data, status } } : n)));
    },
    [setNodes],
  );

  const runWorkflow = useCallback(() => {
    if (runStatus === "running") return;

    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];

    setRunStatus("running");
    setLogs([]);
    setNodes((nds) => nds.map((n) => ({ ...n, data: { ...n.data, status: "idle" } })));
    setEdges((eds) => eds.map((e) => ({ ...e, animated: true })));
    startRun(WORKFLOW_NAME);

    RUN_TIMELINE.forEach((step) => {
      const timer = window.setTimeout(() => {
        if (step.nodeIds.length) setNodeStatus(step.nodeIds, "running");
        setLogs((prev) => [...prev, { ...step.log, t: timestamp() }]);

        const priorStep = RUN_TIMELINE[RUN_TIMELINE.indexOf(step) - 1];
        if (priorStep?.nodeIds.length) setNodeStatus(priorStep.nodeIds, "success");

        if (step === RUN_TIMELINE[RUN_TIMELINE.length - 1]) {
          setRunStatus("success");
          setEdges((eds) => eds.map((e) => ({ ...e, animated: false })));
        }
      }, step.delay);
      timers.current.push(timer);
    });
  }, [runStatus, setNodes, setEdges, setNodeStatus, startRun]);

  const addNode = useCallback(
    (def: EmtNodeDef) => {
      nodeCounter.current += 1;
      const id = `node_${nodeCounter.current}`;
      const column = nodeCounter.current % 4;
      setNodes((nds) => [
        ...nds,
        {
          id,
          type: "emt",
          position: { x: column * 260, y: 340 + Math.floor(nodeCounter.current / 4) * 90 },
          data: {
            label: def.label,
            sub: def.description,
            icon: def.icon.displayName ?? "Box",
            status: "idle",
            nodeType: def.id,
          },
        },
      ]);
      setSelectedNodeId(id);
    },
    [setNodes],
  );

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null;

  return (
    <AppShell>
      <Seo
        title="Workflow Studio — EMT Sun"
        description="Design, run and debug data workflows on the EMT Sun canvas."
        path="/studio"
      />
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
        <p className="text-sm font-semibold tracking-tight">{WORKFLOW_NAME}</p>
        <span className="font-mono text-[11px] text-muted-foreground">{WORKFLOW_FILE}</span>
        <StatusPill status={runStatus} />
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs">
            <Save className="h-3 w-3" /> Save
          </Button>
          <Button
            size="sm"
            className="h-7 gap-1.5 text-xs font-semibold"
            onClick={runWorkflow}
            disabled={runStatus === "running"}
          >
            <Play className="h-3 w-3" /> {runStatus === "running" ? "Running…" : "Run"}
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <NodePalette onAddNode={addNode} />
        <div className="min-w-0 flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={() => setSelectedNodeId(null)}
            fitView
            proOptions={{ hideAttribution: true }}
            colorMode="dark"
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(0 0% 16%)" />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
        <StudioRightPanel
          node={selectedNode ? { id: selectedNode.id, nodeType: selectedNode.data.nodeType, label: selectedNode.data.label } : null}
          logs={logs}
        />
      </div>
    </AppShell>
  );
};

export default Studio;
