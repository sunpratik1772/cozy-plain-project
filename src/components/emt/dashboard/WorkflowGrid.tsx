import { Link } from "react-router-dom";
import { ArrowUpRight, FileJson, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import { StatusPill } from "../StatusPill";
import type { EmtWorkflow } from "@/data/emt";

export function WorkflowGrid({ workflows }: { workflows: EmtWorkflow[] }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight">Workflows</h2>
        <Link to="/studio" className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
          Open studio <ArrowUpRight className="h-3 w-3" />
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
            <Link to="/studio" className="emt-card emt-card-hover group block p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface">
                  <Workflow className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
                {w.kind === "draft" ? (
                  <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-xs font-medium text-muted-foreground">Draft</span>
                ) : w.lastRun ? (
                  <StatusPill status={w.lastRun.status} />
                ) : null}
              </div>
              <p className="mt-3 text-sm font-semibold tracking-tight">{w.name}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <FileJson className="h-3 w-3" />
                <span className="font-mono">{w.filename}</span>
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
                <span>{w.nodeCount} nodes</span>
                <span>Updated {w.updatedLabel}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
