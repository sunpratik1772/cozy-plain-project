import { cn } from "@/lib/utils";
import { buildCalendar, type EmtStat } from "@/data/emt";
import { StatusPill } from "../StatusPill";

const LEVEL_CLASSES = ["bg-surface", "bg-success/25", "bg-success/45", "bg-success/70", "bg-success"];
const cells = buildCalendar();

export function OverviewBar({ stats, successRate }: { stats: EmtStat[]; successRate: string }) {
  return (
    <div className="emt-card flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
            <p className="text-xl font-bold tracking-tight">{s.value}</p>
          </div>
        ))}
        <div>
          <p className="text-[11px] text-muted-foreground">Success rate</p>
          <p className="text-xl font-bold tracking-tight">{successRate}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-[3px] sm:grid sm:grid-flow-col sm:grid-rows-7" aria-label="Run activity over the last 12 weeks">
          {cells.map((c, i) => (
            <div key={i} className={cn("h-1.5 w-1.5 rounded-[1.5px]", LEVEL_CLASSES[c.level])} />
          ))}
        </div>
        <StatusPill status="connected" label="Engine online" className="shrink-0" />
      </div>
    </div>
  );
}
