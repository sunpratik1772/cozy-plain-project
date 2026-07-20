import { ArrowLeft, ArrowRight } from "lucide-react";
import { CODE_GRAPH_EDGES, CODE_GRAPH_NODES } from "@/data/codeGraph";
import { cn } from "@/lib/utils";

interface CodeGraphDetailsProps {
  nodeId: string | null;
  onSelect: (id: string) => void;
}

export function CodeGraphDetails({ nodeId, onSelect }: CodeGraphDetailsProps) {
  const node = CODE_GRAPH_NODES.find((n) => n.id === nodeId);

  if (!node) {
    return (
      <aside className="hidden w-80 shrink-0 flex-col border-l border-border bg-card/50 p-4 lg:flex">
        <p className="text-xs text-muted-foreground">
          Select a node on the graph to see its file path, description and relationships.
        </p>
      </aside>
    );
  }

  const dependsOn = CODE_GRAPH_EDGES.filter((e) => e.source === node.id).map((e) => CODE_GRAPH_NODES.find((n) => n.id === e.target)!);
  const usedBy = CODE_GRAPH_EDGES.filter((e) => e.target === node.id).map((e) => CODE_GRAPH_NODES.find((n) => n.id === e.source)!);

  return (
    <aside className="hidden w-80 shrink-0 flex-col overflow-y-auto border-l border-border bg-card/50 p-4 lg:flex">
      <div className="emt-card p-3">
        <span
          className={cn(
            "mb-2 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
            node.group === "frontend" ? "border-info/30 text-info" : "border-warning/30 text-warning",
          )}
        >
          {node.group}
        </span>
        <p className="text-sm font-semibold">{node.label}</p>
        <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{node.path}</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{node.description}</p>
      </div>

      {dependsOn.length > 0 && (
        <div className="mt-4">
          <p className="mb-1.5 flex items-center gap-1.5 px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
            <ArrowRight className="h-3 w-3" /> Depends on
          </p>
          <div className="space-y-1">
            {dependsOn.map((n) => (
              <button
                key={n.id}
                onClick={() => onSelect(n.id)}
                className="flex w-full items-center justify-between rounded-md border border-border bg-card px-2.5 py-1.5 text-left text-xs transition-colors hover:border-ring/40 hover:bg-surface"
              >
                {n.label}
                <span className="text-[10px] text-muted-foreground">{n.group}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {usedBy.length > 0 && (
        <div className="mt-4">
          <p className="mb-1.5 flex items-center gap-1.5 px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
            <ArrowLeft className="h-3 w-3" /> Used by
          </p>
          <div className="space-y-1">
            {usedBy.map((n) => (
              <button
                key={n.id}
                onClick={() => onSelect(n.id)}
                className="flex w-full items-center justify-between rounded-md border border-border bg-card px-2.5 py-1.5 text-left text-xs transition-colors hover:border-ring/40 hover:bg-surface"
              >
                {n.label}
                <span className="text-[10px] text-muted-foreground">{n.group}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
