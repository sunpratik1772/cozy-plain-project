import { Link } from "react-router-dom";
import { ArrowUpRight, FileJson, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import { StatusPill } from "../StatusPill";
import type { EmtWorkflow } from "@/data/emt";

function lastRunLabel(w: EmtWorkflow) {
  if (w.kind === "draft") return "Not run yet";
  if (!w.lastRun) return "Not run yet";
  const verb = w.lastRun.status === "success" ? "succeeded" : w.lastRun.status === "error" ? "failed" : "completed with warnings";
  return `Last run ${verb}`;
}

export function WorkflowGrid({ workflows }: { workflows: EmtWorkflow[] }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight">Recent workflows</h2>
        <Link to="/templates" className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
          Templates <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {workflows.map((w, i) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
          >
            <Link to={`/studio/${w.id}`} className="emt-card emt-card-hover group flex items-center gap-3 p-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
                <Workflow className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold tracking-tight">{w.name}</p>
                  {w.kind === "draft" && (
                    <span className="shrink-0 rounded-full border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">Draft</span>
                  )}
                </div>
                <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileJson className="h-3 w-3" />
                    <span className="font-mono">{w.filename}</span>
                  </span>
                  <span aria-hidden>·</span>
                  <span>{w.nodeCount} nodes</span>
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                {w.lastRun && <StatusPill status={w.lastRun.status} label={lastRunLabel(w)} />}
                <span className="text-[11px] text-muted-foreground">{w.updatedLabel}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
