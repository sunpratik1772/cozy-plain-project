import { Activity } from "lucide-react";
import { buildCalendar } from "@/data/emt";
import { cn } from "@/lib/utils";

const LEVEL_CLASSES = ["bg-surface", "bg-success/25", "bg-success/45", "bg-success/70", "bg-success"];

const cells = buildCalendar();

export function RunActivityCard() {
  return (
    <div className="emt-card p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <Activity className="h-4 w-4 text-muted-foreground" /> Run activity
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
