import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusPill } from "../StatusPill";
import { useRun } from "@/contexts/RunContext";
import { DrawerFrame, type DrawerProps } from "./DrawerFrame";

export function RunHistoryDrawer(props: DrawerProps) {
  const { recentRuns } = useRun();
  const navigate = useNavigate();

  const expand = () => {
    props.onOpenChange(false);
    navigate("/runs");
  };

  return (
    <DrawerFrame
      {...props}
      title="Run History"
      description="Latest executions across every workflow."
      headerAction={
        <Button variant="outline" size="icon" className="h-7 w-7" aria-label="Open in center view" onClick={expand}>
          <Maximize2 className="h-3.5 w-3.5" />
        </Button>
      }
    >
      <div className="emt-card divide-y divide-border">
        {recentRuns.map((r) => (
          <Link
            key={r.id}
            to={`/runs/${r.id}`}
            onClick={() => props.onOpenChange(false)}
            className="flex items-center gap-3 p-3.5 transition-colors hover:bg-surface"
          >
            <StatusPill status={r.status} className="w-[92px] shrink-0 justify-center" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{r.workflowName}</p>
              <p className="font-mono text-[11px] text-muted-foreground">{r.id}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-muted-foreground">{r.time}</p>
              <p className="font-mono text-[11px] text-muted-foreground/70">{r.duration}</p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60" />
          </Link>
        ))}
      </div>
    </DrawerFrame>
  );
}
