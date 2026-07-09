import { useState } from "react";
import { Seo } from "@/components/Seo";
import { AppShell } from "@/components/emt/AppShell";
import { StatRow } from "@/components/emt/dashboard/StatRow";
import { RunHealthCard } from "@/components/emt/dashboard/RunHealthCard";
import { WorkflowGrid } from "@/components/emt/dashboard/WorkflowGrid";
import { RecentRunsRail } from "@/components/emt/dashboard/RecentRunsRail";
import { SherpaPromptBar } from "@/components/emt/dashboard/SherpaPromptBar";
import { RunHistoryDrawer } from "@/components/emt/drawers";
import { STATS, WORKFLOWS } from "@/data/emt";

const Dashboard = () => {
  const [runsOpen, setRunsOpen] = useState(false);

  return (
    <AppShell>
      <Seo
        title="Dashboard — EMT Sun"
        description="Monitor workflows, runs and automations across your EMT Sun workspace."
      />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 md:px-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Good evening, Pratik</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Your workspace ran 48 workflows this month with a 94% success rate.
            </p>
          </div>

          <SherpaPromptBar />
          <StatRow stats={STATS} />

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <WorkflowGrid workflows={WORKFLOWS} />
            <div className="space-y-3">
              <RunHealthCard />
              <RecentRunsRail onViewAll={() => setRunsOpen(true)} />
            </div>
          </div>
        </div>
      </div>
      <RunHistoryDrawer open={runsOpen} onOpenChange={setRunsOpen} />
    </AppShell>
  );
};

export default Dashboard;
