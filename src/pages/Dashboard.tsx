import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Seo } from "@/components/Seo";
import { AppShell } from "@/components/emt/AppShell";
import { StatusPill } from "@/components/emt/StatusPill";
import { StatRow } from "@/components/emt/dashboard/StatRow";
import { RunHealthCard } from "@/components/emt/dashboard/RunHealthCard";
import { WorkflowGrid } from "@/components/emt/dashboard/WorkflowGrid";
import { RecentRunsRail } from "@/components/emt/dashboard/RecentRunsRail";
import { SherpaPromptBar } from "@/components/emt/dashboard/SherpaPromptBar";
import { SourcesStrip } from "@/components/emt/dashboard/SourcesStrip";
import { RunHistoryDrawer, DataSourcesDrawer } from "@/components/emt/drawers";
import { STATS, WORKFLOWS } from "@/data/emt";
import { useRun } from "@/contexts/RunContext";

const Dashboard = () => {
  const [runsOpen, setRunsOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const { recentRuns, liveRun } = useRun();

  return (
    <AppShell>
      <Seo
        title="Dashboard — EMT Sun"
        description="Monitor workflows, runs and automations across your EMT Sun workspace."
        path="/"
      />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 md:px-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Good evening, Pratik</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Your workspace ran 48 workflows this month with a 94% success rate.
            </p>
          </div>

          {liveRun && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="emt-card flex items-center gap-3 p-3"
            >
              <StatusPill status="running" label="Live" />
              <p className="min-w-0 flex-1 truncate text-sm">
                <span className="font-medium">{liveRun.workflowName}</span> is running…
              </p>
              <Link to="/studio" className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
                Watch in Studio <ArrowUpRight className="h-3 w-3" />
              </Link>
            </motion.div>
          )}

          <SherpaPromptBar />
          <StatRow stats={STATS} />

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <WorkflowGrid workflows={WORKFLOWS} />
            <div className="space-y-3">
              <RunHealthCard />
              <RecentRunsRail runs={recentRuns} onViewAll={() => setRunsOpen(true)} />
            </div>
          </div>

          <SourcesStrip onOpen={() => setSourcesOpen(true)} />
        </div>
      </div>
      <RunHistoryDrawer open={runsOpen} onOpenChange={setRunsOpen} />
      <DataSourcesDrawer open={sourcesOpen} onOpenChange={setSourcesOpen} />
    </AppShell>
  );
};

export default Dashboard;
