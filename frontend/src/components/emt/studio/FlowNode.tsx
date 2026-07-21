import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { icons, type LucideIcon, CheckCircle2, Timer, FileText, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type NodeAccent = "red" | "orange" | "green" | "cyan" | "purple" | "blue" | "muted";

export type FlowRowKind = "check" | "clock" | "file" | "link";

export interface FlowNodeRow {
  kind: FlowRowKind;
  text: string;
}

export interface FlowNodeData extends Record<string, unknown> {
  label: string;
  sub: string;
  icon: string;
  status?: "success" | "error" | "warning" | "running" | "idle";
  nodeType: string;
  /** Optional richer presentation (screenshot-accurate cards) */
  accent?: NodeAccent;
  rows?: FlowNodeRow[];
  badge?: string;
}

const DOT: Record<string, string> = {
  success: "bg-success",
  error: "bg-destructive",
  warning: "bg-warning",
  running: "bg-primary animate-pulse",
  idle: "bg-muted-foreground/40",
};

const STATUS_TEXT: Record<string, string> = {
  success: "Ran successfully",
  error: "Failed on last run",
  warning: "Completed with warnings",
  running: "Running…",
  idle: "Ready",
};

/** Icon-tile accent colours — kept as inline HSL so Tailwind purge never drops them. */
const ACCENT: Record<NodeAccent, { bg: string; fg: string }> = {
  red: { bg: "hsl(0 72% 55% / 0.16)", fg: "hsl(0 80% 64%)" },
  orange: { bg: "hsl(24 90% 55% / 0.16)", fg: "hsl(24 90% 60%)" },
  green: { bg: "hsl(142 65% 45% / 0.16)", fg: "hsl(142 60% 55%)" },
  cyan: { bg: "hsl(190 85% 50% / 0.16)", fg: "hsl(190 80% 58%)" },
  purple: { bg: "hsl(262 83% 65% / 0.16)", fg: "hsl(262 83% 72%)" },
  blue: { bg: "hsl(212 90% 55% / 0.16)", fg: "hsl(212 90% 62%)" },
  muted: { bg: "hsl(var(--surface))", fg: "hsl(var(--muted-foreground))" },
};

const ROW_ICON: Record<FlowRowKind, LucideIcon> = {
  check: CheckCircle2,
  clock: Timer,
  file: FileText,
  link: Link2,
};

function Row({ row }: { row: FlowNodeRow }) {
  const RowIcon = ROW_ICON[row.kind];
  const mono = row.kind === "file" || row.kind === "link";
  return (
    <div className="flex items-center gap-2 border-t border-border/70 px-3 py-2">
      <RowIcon
        className={cn(
          "h-3.5 w-3.5 shrink-0",
          row.kind === "check" ? "text-success" : "text-muted-foreground/70",
        )}
        strokeWidth={row.kind === "check" ? 2 : 1.75}
      />
      <p
        className={cn(
          "truncate text-xs",
          mono ? "font-mono text-[11px] text-muted-foreground" : "text-muted-foreground",
        )}
      >
        {row.text}
      </p>
    </div>
  );
}

function FlowNodeInner({ data, selected }: NodeProps) {
  const d = data as FlowNodeData;
  const Icon: LucideIcon = icons[d.icon as keyof typeof icons] ?? icons.Box;
  const status = d.status ?? "idle";
  const accent = ACCENT[d.accent ?? "muted"];
  const rows: FlowNodeRow[] = d.rows ?? [{ kind: "check", text: d.sub || STATUS_TEXT[status] }];

  return (
    <div
      className={cn(
        "w-64 overflow-hidden rounded-xl border bg-card shadow-[0_8px_24px_-14px_rgba(0,0,0,0.7)] transition-colors",
        selected ? "border-primary/60" : "border-border",
      )}
    >
      <Handle type="target" position={Position.Left} />

      {/* Header — icon tile + title + badge/status */}
      <div className="flex items-center gap-2.5 px-3 py-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: accent.bg }}
        >
          <Icon className="h-4 w-4" style={{ color: accent.fg }} strokeWidth={2} />
        </div>
        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">{d.label}</p>
        {d.badge ? (
          <span className="shrink-0 rounded-md border border-success/30 bg-success/10 px-1.5 py-0.5 text-[10px] font-semibold text-success">
            {d.badge}
          </span>
        ) : (
          <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", DOT[status])} />
        )}
      </div>

      {/* Body rows */}
      <div className="bg-surface/40">
        {rows.map((r, i) => (
          <Row key={i} row={r} />
        ))}
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export const FlowNode = memo(FlowNodeInner);
