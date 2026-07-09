import { Activity } from "lucide-react";
import { buildCalendar } from "@/data/emt";
import { cn } from "@/lib/utils";
import { StatusPill } from "../StatusPill";
import { useRun } from "@/contexts/RunContext";

const LEVEL_CLASSES = [
  "bg-surface",
  "bg-success/25",
  "bg-success/45",
  "bg-success/70",
  "bg-success",
];

const cells = buildCalendar();

export function RunHealthCard() {
  const { liveRun } = useRun();

  return (
    <div className="emt-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Activity className="h-4 w-4 text-muted-foreground" /> Run health
        </div>
        {liveRun ? (
          <StatusPill status="running" label={`Running ${liveRun.workflowName}`} className="max-w-[190px] truncate" />
        ) : (
          <StatusPill status="connected" label="Engine online" />
        )}
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        <div>
          <p className="text-lg font-bold tracking-tight">94%</p>
          <p className="text-[11px] text-muted-foreground">Success rate</p>
        </div>
        <div>
          <p className="text-lg font-bold tracking-tight">48</p>
          <p className="text-[11px] text-muted-foreground">Runs / month</p>
        </div>
        <div>
          <p className="text-lg font-bold tracking-tight text-destructive">3</p>
          <p className="text-[11px] text-muted-foreground">Failed</p>
        </div>
      </div>

      <div className="grid grid-flow-col grid-rows-7 gap-[3px]" aria-label="Run activity over the last 12 weeks">
        {cells.map((c, i) => (
          <div key={i} className={cn("h-2.5 w-2.5 rounded-[2px]", LEVEL_CLASSES[c.level])} />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>12 weeks</span>
        <div className="flex items-center gap-1">
          Less
          {LEVEL_CLASSES.map((c, i) => (
            <span key={i} className={cn("h-2 w-2 rounded-[2px]", c)} />
          ))}
          More
        </div>
      </div>
    </div>
  );
}
