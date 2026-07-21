import { memo } from "react";
import { type NodeProps } from "@xyflow/react";
import { icons, type LucideIcon, ChevronUp } from "lucide-react";

export interface GroupNodeData extends Record<string, unknown> {
  label: string;
  icon?: string;
}

/**
 * A container node that visually wraps its child nodes (React Flow parent/child).
 * Matches the "File Check" group in the reference dashboard: a rounded, translucent
 * card with a titled header and a collapse chevron.
 */
function GroupNodeInner({ data }: NodeProps) {
  const d = data as GroupNodeData;
  const Icon: LucideIcon = icons[(d.icon ?? "FileText") as keyof typeof icons] ?? icons.FileText;

  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-border bg-card/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
        <p className="flex-1 truncate text-xs font-semibold text-foreground">{d.label}</p>
        <ChevronUp className="h-3.5 w-3.5 text-muted-foreground/70" />
      </div>
    </div>
  );
}

export const GroupNode = memo(GroupNodeInner);
