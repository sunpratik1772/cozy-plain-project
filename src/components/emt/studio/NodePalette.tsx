import { Plus } from "lucide-react";
import { NODE_CATALOG, type EmtNodeDef } from "@/data/emt";

interface NodePaletteProps {
  onAddNode: (def: EmtNodeDef) => void;
}

export function NodePalette({ onAddNode }: NodePaletteProps) {
  const categories = [...new Set(NODE_CATALOG.map((n) => n.category))];

  return (
    <aside className="hidden w-56 shrink-0 flex-col overflow-y-auto border-r border-border bg-card/50 p-3 scrollbar-none xl:flex">
      <p className="mb-2 px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
        Node palette
      </p>
      {categories.map((cat) => (
        <div key={cat} className="mb-3">
          <p className="mb-1.5 px-1 text-[11px] font-medium text-muted-foreground">{cat}</p>
          <div className="space-y-1">
            {NODE_CATALOG.filter((n) => n.category === cat).map((n) => (
              <button
                key={n.id}
                onClick={() => onAddNode(n)}
                className="group flex w-full items-center gap-2 rounded-md border border-border bg-card px-2 py-1.5 text-left transition-colors hover:border-ring/40 hover:bg-surface"
                title={`Add ${n.label} to canvas`}
              >
                <n.icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <span className="truncate text-xs font-medium">{n.label}</span>
                <Plus className="ml-auto h-3 w-3 shrink-0 text-muted-foreground/0 transition-colors group-hover:text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
