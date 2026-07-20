import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { icons, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FlowNodeData extends Record<string, unknown> {
  label: string;
  sub: string;
  icon: string;
  status?: "success" | "error" | "warning" | "running" | "idle";
  nodeType: string;
}

const DOT: Record<string, string> = {
  success: "bg-success",
  error: "bg-destructive",
  warning: "bg-warning",
  running: "bg-info animate-pulse",
  idle: "bg-muted-foreground/40",
};

function FlowNodeInner({ data, selected }: NodeProps) {
  const d = data as FlowNodeData;
  const Icon: LucideIcon = icons[d.icon as keyof typeof icons] ?? icons.Box;

  return (
    <div
      className={cn(
        "w-48 rounded-lg border bg-card px-3 py-2.5 shadow-sm transition-colors",
        selected ? "border-ring/60" : "border-border",
      )}
    >
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-foreground">{d.label}</p>
          <p className="truncate font-mono text-[10px] text-muted-foreground">{d.sub}</p>
        </div>
        <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", DOT[d.status ?? "idle"])} />
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export const FlowNode = memo(FlowNodeInner);
