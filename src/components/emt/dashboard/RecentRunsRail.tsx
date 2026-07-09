import { History } from "lucide-react";
import { StatusPill } from "../StatusPill";
import type { EmtRun } from "@/data/emt";

interface RecentRunsRailProps {
  runs: EmtRun[];
  onViewAll: () => void;
}

export function RecentRunsRail({ runs, onViewAll }: RecentRunsRailProps) {
  return (
    <div className="emt-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <History className="h-4 w-4 text-muted-foreground" /> Recent runs
        </div>
        <button onClick={onViewAll} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
          View all
        </button>
      </div>
      <div className="space-y-1">
        {runs.slice(0, 5).map((r) => (
          <div key={r.id} className="-mx-2 flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-surface">
            <StatusPill status={r.status} label="" className="border-0 bg-transparent px-0" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">{r.workflowName}</p>
              <p className="font-mono text-[10px] text-muted-foreground/70">{r.id}</p>
            </div>
            <span className="shrink-0 text-[11px] text-muted-foreground">{r.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
