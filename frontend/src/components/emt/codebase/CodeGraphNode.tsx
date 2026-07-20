import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Cog, Component, Database, FileCode, Route, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CodeNodeGroup, CodeNodeKind } from "@/data/codeGraph";

export interface CodeGraphNodeData extends Record<string, unknown> {
  label: string;
  kind: CodeNodeKind;
  group: CodeNodeGroup;
  dimmed?: boolean;
  matched?: boolean;
}

const KIND_ICON: Record<CodeNodeKind, typeof Cog> = {
  engine: Cog,
  router: Route,
  service: Server,
  component: Component,
  store: Database,
  page: FileCode,
};

const KIND_LABEL: Record<CodeNodeKind, string> = {
  engine: "Engine",
  router: "Router",
  service: "Service",
  component: "Component",
  store: "Store",
  page: "Page",
};

function CodeGraphNodeInner({ data, selected }: NodeProps) {
  const d = data as CodeGraphNodeData;
  const Icon = KIND_ICON[d.kind];

  return (
    <div
      className={cn(
        "w-44 rounded-lg border bg-card px-3 py-2.5 shadow-sm transition-all",
        d.group === "frontend" ? "border-l-2 border-l-info" : "border-l-2 border-l-warning",
        selected || d.matched ? "border-ring/60 ring-1 ring-ring/40" : "border-border",
        d.dimmed ? "opacity-30" : "opacity-100",
      )}
    >
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
          <Icon className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-foreground">{d.label}</p>
          <p className="truncate text-[10px] text-muted-foreground">{KIND_LABEL[d.kind]} · {d.group}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export const CodeGraphNode = memo(CodeGraphNodeInner);
