import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, PanelRightOpen } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/emt/AppShell";
import { StatusPill } from "@/components/emt/StatusPill";
import { useRun } from "@/contexts/RunContext";

const RunHistory = () => {
  const { recentRuns } = useRun();
  const navigate = useNavigate();

  return (
    <AppShell>
      <Seo title="Run History — dbSherpa Studio" description="Latest executions across every workflow." path="/runs" />
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
        <p className="text-sm font-semibold tracking-tight">Run History</p>
        <span className="text-[11px] text-muted-foreground">{recentRuns.length} runs</span>
        <Button
          variant="outline"
          size="icon"
          className="ml-auto h-7 w-7"
          aria-label="Collapse to side panel"
          onClick={() => navigate("/", { state: { openDrawer: "runs" } })}
        >
          <PanelRightOpen className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-6 md:px-6">
          <p className="mb-4 text-sm text-muted-foreground">Latest executions across every workflow.</p>
          <div className="emt-card divide-y divide-border">
            {recentRuns.map((r) => (
              <Link
                key={r.id}
                to={`/runs/${r.id}`}
                className="flex items-center gap-3 p-3.5 transition-colors hover:bg-surface"
              >
                <StatusPill status={r.status} className="w-[92px] justify-center" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{r.workflowName}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{r.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{r.time}</p>
                  <p className="font-mono text-[11px] text-muted-foreground/70">{r.duration}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default RunHistory;
