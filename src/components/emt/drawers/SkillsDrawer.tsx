import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { SKILLS } from "@/data/emt";
import { DrawerFrame, type DrawerProps } from "./DrawerFrame";

export function SkillsDrawer(props: DrawerProps) {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(SKILLS.map((s) => [s.id, s.enabled])),
  );

  return (
    <DrawerFrame {...props} title="Skills" description="Capabilities Sherpa can use while building and running workflows.">
      {SKILLS.map((s) => (
        <div key={s.id} className="emt-card emt-card-hover flex items-start justify-between gap-3 p-4">
          <div>
            <p className="text-sm font-semibold">{s.name}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{s.description}</p>
          </div>
          <Switch
            checked={enabled[s.id]}
            onCheckedChange={(v) => setEnabled((st) => ({ ...st, [s.id]: v }))}
            aria-label={`Toggle ${s.name}`}
          />
        </div>
      ))}
    </DrawerFrame>
  );
}
