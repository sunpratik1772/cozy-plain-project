import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
import { useTheme } from "next-themes";
import { Play, Save } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/emt/AppShell";
import { NodePalette } from "@/components/emt/studio/NodePalette";
import { StudioRightPanel } from "@/components/emt/studio/StudioRightPanel";
import { FlowNode, type FlowNodeData } from "@/components/emt/studio/FlowNode";
import { StatusPill } from "@/components/emt/StatusPill";
import { useRun } from "@/contexts/RunContext";
import { getWorkflowPreset } from "@/data/workflowPresets";
import type { EmtLogLine, EmtNodeDef, RunStatus } from "@/data/emt";

const nodeTypes = { emt: FlowNode };

function timestamp() {
  return new Date().toLocaleTimeString("en-US", { hour12: false });
}

const Studio = () => {
  const { workflowId } = useParams();
  const preset = useMemo(() => getWorkflowPreset(workflowId), [workflowId]);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node<FlowNodeData>>(preset.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(preset.edges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [logs, setLogs] = useState<EmtLogLine[]>([]);
  const [runStatus, setRunStatus] = useState<RunStatus>("success");
  const timers = useRef<number[]>([]);
  const { startRun } = useRun();
  const nodeCounter = useRef(preset.nodes.length);
  const { resolvedTheme } = useTheme();

  // Reset the canvas whenever a different workflow is opened.
  useEffect(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    setNodes(preset.nodes);
    setEdges(preset.edges);
    setSelectedNodeId(null);
    setLogs([]);
    setRunStatus("success");
    nodeCounter.current = preset.nodes.length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset]);

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

    const runTimeline = preset.runTimeline;
    setRunStatus("running");
    setLogs([]);
    setNodes((nds) => nds.map((n) => ({ ...n, data: { ...n.data, status: "idle" } })));
    setEdges((eds) => eds.map((e) => ({ ...e, animated: true })));
    startRun(preset.name);

    runTimeline.forEach((step, i) => {
      const timer = window.setTimeout(() => {
        if (step.nodeIds.length) setNodeStatus(step.nodeIds, step.status ?? "running");
        setLogs((prev) => [...prev, { ...step.log, t: timestamp() }]);

        const priorStep = runTimeline[i - 1];
        const priorWasPlainRun = priorStep && (!priorStep.status || priorStep.status === "running");
        if (priorStep?.nodeIds.length && priorWasPlainRun) setNodeStatus(priorStep.nodeIds, "success");

        if (i === runTimeline.length - 1) {
          setRunStatus(preset.finalStatus);
          setEdges((eds) => eds.map((e) => ({ ...e, animated: false })));
        }
      }, step.delay);
      timers.current.push(timer);
    });
  }, [runStatus, setNodes, setEdges, setNodeStatus, startRun, preset]);

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
        title={`${preset.name} — EMT Sun Studio`}
        description="Design, run and debug data workflows on the EMT Sun canvas."
        path={workflowId ? `/studio/${workflowId}` : "/studio"}
      />
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
        <p className="text-sm font-semibold tracking-tight">{preset.name}</p>
        <span className="font-mono text-[11px] text-muted-foreground">{preset.file}</span>
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
            colorMode={resolvedTheme === "light" ? "light" : "dark"}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(var(--border))" />
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
