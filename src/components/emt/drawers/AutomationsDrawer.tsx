import { useState } from "react";
import { CalendarClock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { AUTOMATIONS } from "@/data/emt";
import { DrawerFrame, type DrawerProps } from "./DrawerFrame";

export function AutomationsDrawer(props: DrawerProps) {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(AUTOMATIONS.map((a) => [a.id, a.enabled])),
  );

  return (
    <DrawerFrame {...props} title="Automations" description="Scheduled runs for your saved workflows.">
      {AUTOMATIONS.map((a) => (
        <div key={a.id} className="emt-card emt-card-hover p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.workflow}</p>
                <div className="mt-2 flex items-center gap-2">
                  <code className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {a.cron}
                  </code>
                  <span className="text-[11px] text-muted-foreground">Next: {a.next}</span>
                </div>
              </div>
            </div>
            <Switch
              checked={enabled[a.id]}
              onCheckedChange={(v) => setEnabled((s) => ({ ...s, [a.id]: v }))}
              aria-label={`Toggle ${a.name}`}
            />
          </div>
        </div>
      ))}
    </DrawerFrame>
  );
}
