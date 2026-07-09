import { useCallback } from "react";
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
import { FlowNode } from "@/components/emt/studio/FlowNode";
import { StatusPill } from "@/components/emt/StatusPill";

const nodeTypes = { emt: FlowNode };

const initialNodes: Node[] = [
  { id: "1", type: "emt", position: { x: 0, y: 120 }, data: { label: "Schedule", sub: "0 2 * * *", icon: "CalendarClock", status: "success" } },
  { id: "2", type: "emt", position: { x: 260, y: 40 }, data: { label: "DB query", sub: "leads · postgres", icon: "Database", status: "success" } },
  { id: "3", type: "emt", position: { x: 260, y: 200 }, data: { label: "CSV extract", sub: "orders.csv", icon: "FileSpreadsheet", status: "success" } },
  { id: "4", type: "emt", position: { x: 520, y: 120 }, data: { label: "Transform", sub: "join + filter", icon: "Braces", status: "success" } },
  { id: "5", type: "emt", position: { x: 780, y: 120 }, data: { label: "Agent", sub: "score_leads", icon: "Bot", status: "running" } },
  { id: "6", type: "emt", position: { x: 1040, y: 120 }, data: { label: "Table output", sub: "scored_leads", icon: "Table2", status: "idle" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5", animated: true },
  { id: "e5-6", source: "5", target: "6" },
];

const Studio = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <AppShell>
      <Seo
        title="Workflow Studio — EMT Sun"
        description="Design, run and debug data workflows on the EMT Sun canvas."
        path="/studio"
      />
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
        <p className="text-sm font-semibold tracking-tight">Lead scoring pipeline</p>
        <span className="font-mono text-[11px] text-muted-foreground">leads_pipeline.json</span>
        <StatusPill status="running" />
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs">
            <Save className="h-3 w-3" /> Save
          </Button>
          <Button size="sm" className="h-7 gap-1.5 text-xs font-semibold">
            <Play className="h-3 w-3" /> Run
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <NodePalette />
        <div className="min-w-0 flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            proOptions={{ hideAttribution: true }}
            colorMode="dark"
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(0 0% 16%)" />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
        <StudioRightPanel />
      </div>
    </AppShell>
  );
};

export default Studio;
