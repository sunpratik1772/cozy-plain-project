import { Gauge } from "lucide-react";
import { StatusPill } from "../StatusPill";
import { useRun } from "@/contexts/RunContext";

export function SuccessRateCard() {
  const { liveRun } = useRun();

  return (
    <div className="emt-card flex flex-col justify-between p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Gauge className="h-4 w-4 text-muted-foreground" /> Success rate
        </div>
        {liveRun ? (
          <StatusPill status="running" label={`Running ${liveRun.workflowName}`} className="max-w-[160px] truncate" />
        ) : (
          <StatusPill status="connected" label="Engine online" />
        )}
      </div>

      <div>
        <p className="mt-2 text-4xl font-bold tracking-tight">94%</p>
        <p className="mt-1 text-xs text-muted-foreground">48 runs this month · 3 failed</p>
      </div>
    </div>
  );
}
