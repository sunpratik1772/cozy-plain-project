import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Seo } from "@/components/Seo";
import { AppShell } from "@/components/emt/AppShell";
import { OnboardingWizard } from "@/components/emt/OnboardingWizard";
import { StatusPill } from "@/components/emt/StatusPill";
import { StatRow } from "@/components/emt/dashboard/StatRow";
import { SuccessRateCard } from "@/components/emt/dashboard/SuccessRateCard";
import { RunActivityCard } from "@/components/emt/dashboard/RunActivityCard";
import { WorkflowGrid } from "@/components/emt/dashboard/WorkflowGrid";
import { SherpaPromptBar } from "@/components/emt/dashboard/SherpaPromptBar";
import { STATS, WORKFLOWS } from "@/data/emt";
import { useRun } from "@/contexts/RunContext";

const Dashboard = () => {
  const { liveRun } = useRun();

  return (
    <AppShell>
      <Seo
        title="Dashboard — Sherpa Studio"
        description="Monitor workflows, runs and automations across your Sherpa Studio workspace."
        path="/dashboard"
      />
      <OnboardingWizard />
      <div className="relative flex-1 overflow-y-auto">
        {/* Corner glow — Plasma style */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-96 corner-glow-tr opacity-70" aria-hidden />

        <div className="relative mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-6 md:py-10">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-muted-foreground">Workspace overview</p>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-foreground">
              Good evening, Pratik
            </h2>
            <p className="text-sm text-muted-foreground">
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

          <div className="grid gap-4 sm:grid-cols-2">
            <SuccessRateCard />
            <RunActivityCard />
          </div>

          <WorkflowGrid workflows={WORKFLOWS} />
        </div>
      </div>
    </AppShell>
  );
};

export default Dashboard;
