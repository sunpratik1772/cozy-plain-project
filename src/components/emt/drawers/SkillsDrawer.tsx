import { Switch } from "@/components/ui/switch";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { DrawerFrame, type DrawerProps } from "./DrawerFrame";

export function SkillsDrawer(props: DrawerProps) {
  const { skills, toggleSkill } = useWorkspace();

  return (
    <DrawerFrame {...props} title="Skills" description="Capabilities Sherpa can use while building and running workflows.">
      {skills.map((s) => (
        <div key={s.id} className="emt-card emt-card-hover flex items-start justify-between gap-3 p-4">
          <div>
            <p className="text-sm font-semibold">{s.name}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{s.description}</p>
          </div>
          <Switch
            checked={s.enabled}
            onCheckedChange={() => toggleSkill(s.id)}
            aria-label={`Toggle ${s.name}`}
          />
        </div>
      ))}
    </DrawerFrame>
  );
}
