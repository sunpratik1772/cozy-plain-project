import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { StatusPill } from "../StatusPill";
import type { EmtWorkflow } from "@/data/emt";

function lastRunLabel(w: EmtWorkflow) {
  if (w.kind === "draft") return "Not run yet";
  if (!w.lastRun) return "Not run yet";
  const verb = w.lastRun.status === "success" ? "succeeded" : w.lastRun.status === "error" ? "failed" : "completed with warnings";
  return `Last run ${verb}`;
}

export function WorkflowGrid({ workflows, limit = 4 }: { workflows: EmtWorkflow[]; limit?: number }) {
  const shown = workflows.slice(0, limit);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight">Recent workflows</h2>
        <Link to="/templates" className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
          View all <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="emt-card divide-y divide-border">
        {shown.map((w) => (
          <Link key={w.id} to={`/studio/${w.id}`} className="group flex items-center gap-3 p-3 transition-colors hover:bg-surface">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium transition-colors group-hover:text-foreground">{w.name}</p>
                {w.kind === "draft" && (
                  <span className="shrink-0 rounded-full border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">Draft</span>
                )}
              </div>
              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{w.filename} · {w.nodeCount} nodes</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              {w.lastRun && <StatusPill status={w.lastRun.status} label={lastRunLabel(w)} />}
              <span className="text-[11px] text-muted-foreground">{w.updatedLabel}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
