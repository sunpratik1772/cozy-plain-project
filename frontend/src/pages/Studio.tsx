import { useCallback, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { Play, Save, Sparkles } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/emt/AppShell";
import { TopbarSlot } from "@/components/emt/TopbarSlot";
import { NodePalette } from "@/components/emt/studio/NodePalette";
import { StudioRightPanel } from "@/components/emt/studio/StudioRightPanel";
import { CanvasSherpaBar } from "@/components/emt/studio/CanvasSherpaBar";
import { FlowNode, type FlowNodeData } from "@/components/emt/studio/FlowNode";
import { GroupNode } from "@/components/emt/studio/GroupNode";
import { StatusPill } from "@/components/emt/StatusPill";
import { useRun } from "@/contexts/RunContext";
import { useStudioStore } from "@/store/studioStore";
import { runWorkflowOnCanvas } from "@/lib/sherpaEngine";
import { getWorkflowPreset } from "@/data/workflowPresets";
import type { EmtNodeDef } from "@/data/emt";

const nodeTypes = { emt: FlowNode, group: GroupNode };

const Studio = () => {
  const { workflowId } = useParams();
  const preset = useMemo(() => getWorkflowPreset(workflowId), [workflowId]);
  const navigate = useNavigate();

  const storeNodes = useStudioStore((s) => s.nodes);
  const storeEdges = useStudioStore((s) => s.edges);
  const setWorkflow = useStudioStore((s) => s.setWorkflow);
  const selectNode = useStudioStore((s) => s.selectNode);
  const setNodeStatus = useStudioStore((s) => s.setNodeStatus);
  const generating = useStudioStore((s) => s.generating);
  const setGenerating = useStudioStore((s) => s.setGenerating);
  const isRunning = useStudioStore((s) => s.isRunning);
  const runStatus = useStudioStore((s) => s.runStatus);
  const harnessGenerating = useStudioStore((s) => s.copilotHarnessGenerating);
  const addNodeToStore = useStudioStore((s) => s.addNode);
  const setRightPanelMode = useStudioStore((s) => s.setRightPanelMode);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node<FlowNodeData>>(storeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges);
  const { startRun } = useRun();
  const { resolvedTheme } = useTheme();
  const flowInstance = useRef<ReactFlowInstance | null>(null);
  const nodeCounter = useRef(preset.nodes.length);
  const initialized = useRef(false);

  // Initialize from preset on first mount or when preset changes (but not when Sherpa is generating)
  useEffect(() => {
    if (initialized.current && !harnessGenerating) return;
    initialized.current = true;
    const presetNodes = preset.nodes as Node<FlowNodeData>[];
    setWorkflow(preset.name, presetNodes, preset.edges);
    setNodes(presetNodes);
    setEdges(preset.edges);
    nodeCounter.current = preset.nodes.length;
    // Seed the run panel so the canvas loads in its "last run" state.
    useStudioStore.setState({
      logs: preset.seedLogs ?? [],
      runStatus: preset.finalStatus,
    });
    setRightPanelMode("logs");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset]);

  // Sync store nodes/edges → local ReactFlow state (for Sherpa generation + run status)
  useEffect(() => {
    if (storeNodes !== nodes) setNodes(storeNodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeNodes]);
  useEffect(() => {
    if (storeEdges !== edges) setEdges(storeEdges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeEdges]);

  // Fit view after Sherpa finishes generating
  useEffect(() => {
    if (!harnessGenerating && storeNodes.length > 0) {
      const t = window.setTimeout(() => flowInstance.current?.fitView({ padding: 0.2, duration: 400 }), 100);
      return () => window.clearTimeout(t);
    }
  }, [harnessGenerating, storeNodes.length]);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    selectNode(node.id);
    setRightPanelMode("config");
  }, [selectNode, setRightPanelMode]);

  const addNode = useCallback(
    (def: EmtNodeDef) => {
      nodeCounter.current += 1;
      const id = `node_${nodeCounter.current}`;
      const column = nodeCounter.current % 4;
      const newNode: Node<FlowNodeData> = {
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
      };
      addNodeToStore(newNode);
      setNodes((nds) => [...nds, newNode]);
      selectNode(id);
      setRightPanelMode("config");
    },
    [addNodeToStore, selectNode, setRightPanelMode, setNodes],
  );

  const runWorkflow = useCallback(() => {
    if (isRunning || generating) return;
    startRun(useStudioStore.getState().workflowName);
    runWorkflowOnCanvas();
    setRightPanelMode("logs");
  }, [isRunning, generating, startRun, setRightPanelMode]);

  const showGeneratingVeil = generating || harnessGenerating;

  return (
    <AppShell>
      <Seo
        title={`${useStudioStore.getState().workflowName} — Sherpa Studio`}
        description="Design, run and debug data workflows on the Sherpa Studio canvas."
        path={workflowId ? `/studio/${workflowId}` : "/studio"}
      />
      <TopbarSlot>
        {showGeneratingVeil ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" /> Sherpa is building…
          </span>
        ) : (
          <StatusPill status={runStatus} />
        )}
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
          <Save className="h-3 w-3" /> Save
        </Button>
        <Button
          size="sm"
          className="h-8 gap-1.5 text-xs font-semibold"
          onClick={runWorkflow}
          disabled={isRunning || generating || storeNodes.length === 0}
        >
          <Play className="h-3 w-3" /> {isRunning ? "Running…" : "Run"}
        </Button>
      </TopbarSlot>

      <div className="flex min-h-0 flex-1">
        <NodePalette onAddNode={addNode} />
        <div className="relative min-w-0 flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={() => selectNode(null)}
            onInit={(instance) => (flowInstance.current = instance)}
            fitView
            proOptions={{ hideAttribution: true }}
            colorMode={resolvedTheme === "light" ? "light" : "dark"}
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1.5} color="hsl(var(--muted-foreground) / 0.3)" />
            <Controls showInteractive={false} />
          </ReactFlow>

          {/* Sherpa agent — embedded IN the canvas, not a separate panel */}
          <CanvasSherpaBar />

          {showGeneratingVeil && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/50">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/95 px-4 py-2">
                <Sparkles className="h-4 w-4 animate-pulse text-primary" />
                <span className="text-sm font-medium text-foreground">Generating workflow…</span>
              </div>
            </div>
          )}

          {nodes.length === 0 && !showGeneratingVeil && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Compose a workflow</h2>
              <p className="max-w-sm text-sm text-muted-foreground">
                Drag nodes from the left palette or ask Sherpa below to generate the workflow.
              </p>
            </div>
          )}
        </div>
        <StudioRightPanel />
      </div>
    </AppShell>
  );
};

export default Studio;
