import { useMemo, useState } from "react";
import { Background, BackgroundVariant, Controls, ReactFlow, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { Search } from "lucide-react";
import { Seo } from "@/components/Seo";
import { AppShell } from "@/components/emt/AppShell";
import { CodeGraphNode, type CodeGraphNodeData } from "@/components/emt/codebase/CodeGraphNode";
import { CodeGraphDetails } from "@/components/emt/codebase/CodeGraphDetails";
import { CODE_GRAPH_EDGES, CODE_GRAPH_NODES } from "@/data/codeGraph";

const nodeTypes = { code: CodeGraphNode };

const baseNodes: Node<CodeGraphNodeData>[] = CODE_GRAPH_NODES.map((n) => ({
  id: n.id,
  type: "code",
  position: { x: n.x, y: n.y },
  data: { label: n.label, kind: n.kind, group: n.group },
}));

const baseEdges: Edge[] = CODE_GRAPH_EDGES.map((e) => ({ id: e.id, source: e.source, target: e.target }));

const Codebase = () => {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  const matchedIds = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return new Set(
      CODE_GRAPH_NODES.filter(
        (n) => n.label.toLowerCase().includes(q) || n.path.toLowerCase().includes(q) || n.description.toLowerCase().includes(q),
      ).map((n) => n.id),
    );
  }, [query]);

  const nodes = useMemo(
    () =>
      baseNodes.map((n) => ({
        ...n,
        data: {
          ...n.data,
          matched: matchedIds ? matchedIds.has(n.id) : n.id === selectedId,
          dimmed: matchedIds ? !matchedIds.has(n.id) : false,
        },
      })),
    [matchedIds, selectedId],
  );

  return (
    <AppShell>
      <Seo
        title="Codebase Graph — dbSherpa Studio"
        description="Explore how dbSherpa Studio's backend services and frontend components connect."
        path="/codebase"
      />
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
        <p className="text-sm font-semibold tracking-tight">Codebase Graph</p>
        <div className="relative ml-2 w-64 max-w-full">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search modules, routers, components…"
            className="h-7 w-full rounded-md border border-border bg-surface pl-8 pr-2.5 text-xs outline-none placeholder:text-muted-foreground/70 focus:border-ring/50"
            aria-label="Search codebase graph"
          />
        </div>
        {matchedIds && (
          <span className="text-[11px] text-muted-foreground">
            {matchedIds.size} match{matchedIds.size === 1 ? "" : "es"}
          </span>
        )}
        <div className="ml-auto flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-warning" /> Backend
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-info" /> Frontend
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <div className="min-w-0 flex-1">
          <ReactFlow
            nodes={nodes}
            edges={baseEdges}
            nodeTypes={nodeTypes}
            onNodeClick={(_, node) => setSelectedId(node.id)}
            onPaneClick={() => setSelectedId(null)}
            nodesDraggable={false}
            nodesConnectable={false}
            fitView
            proOptions={{ hideAttribution: true }}
            colorMode={resolvedTheme === "light" ? "light" : "dark"}
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1.5} color="hsl(var(--muted-foreground) / 0.3)" />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
        <CodeGraphDetails nodeId={selectedId} onSelect={setSelectedId} />
      </div>
    </AppShell>
  );
};

export default Codebase;
