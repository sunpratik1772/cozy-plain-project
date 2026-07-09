import { StatusPill } from "../StatusPill";
import { useRun } from "@/contexts/RunContext";
import { DrawerFrame, type DrawerProps } from "./DrawerFrame";

export function RunHistoryDrawer(props: DrawerProps) {
  const { recentRuns } = useRun();
  return (
    <DrawerFrame {...props} title="Run History" description="Latest executions across every workflow.">
      <div className="emt-card divide-y divide-border">
        {recentRuns.map((r) => (
          <div key={r.id} className="flex items-center gap-3 p-3.5 transition-colors hover:bg-surface">
            <StatusPill status={r.status} className="w-[92px] justify-center" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{r.workflowName}</p>
              <p className="font-mono text-[11px] text-muted-foreground">{r.id}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">{r.time}</p>
              <p className="font-mono text-[11px] text-muted-foreground/70">{r.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </DrawerFrame>
  );
}
