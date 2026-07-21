import { cn } from "@/lib/utils";
import type { RunStatus } from "@/data/emt";

const STYLES: Record<string, { dot: string; text: string; label: string }> = {
  success: { dot: "bg-success", text: "text-success", label: "Success" },
  error: { dot: "bg-destructive", text: "text-destructive", label: "Failed" },
  warning: { dot: "bg-warning", text: "text-warning", label: "Warning" },
  running: { dot: "bg-primary animate-pulse", text: "text-primary", label: "Running" },
  connected: { dot: "bg-success", text: "text-success", label: "Connected" },
  partial: { dot: "bg-warning", text: "text-warning", label: "Partial" },
  off: { dot: "bg-muted-foreground/40", text: "text-muted-foreground", label: "Off" },
};

interface StatusPillProps {
  status: RunStatus | "connected" | "partial" | "off";
  label?: string;
  className?: string;
}

export function StatusPill({ status, label, className }: StatusPillProps) {
  const s = STYLES[status] ?? STYLES.off;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2 py-0.5 text-xs font-medium",
        s.text,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {label ?? s.label}
    </span>
  );
}
