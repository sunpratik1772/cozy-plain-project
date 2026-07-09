import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronDown, Download } from "lucide-react";
import { toast } from "sonner";
import { Seo } from "@/components/Seo";
import { AppShell } from "@/components/emt/AppShell";
import { StatusPill } from "@/components/emt/StatusPill";
import { useRun } from "@/contexts/RunContext";
import { getRunDetail } from "@/data/runDetail";
import { cn } from "@/lib/utils";

const STEP_DESCRIPTIONS: Record<string, string> = {
  schedule: "Triggered the run on its configured cron schedule.",
  webhook: "Received and validated the inbound webhook payload.",
  db_query: "Ran the scoped SQL query against the connected source.",
  csv_extract: "Parsed and loaded rows from the source file.",
  http_request: "Made the outbound HTTP call and checked the response status.",
  transform: "Applied the configured mapping, join and filter logic.",
  agent: "Ran the LLM step against the current context window.",
  classifier: "Scored and labeled rows against the configured model.",
  email: "Rendered and sent the notification.",
  table_output: "Materialized the result set to the output table.",
};

const RunDetail = () => {
  const { runId } = useParams();
  const { recentRuns } = useRun();
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const run = recentRuns.find((r) => r.id === runId);

  if (!run) {
    return (
      <AppShell>
        <Seo title="Run not found — dbSherpa Studio" description="This run could not be found." path="/runs" />
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          <p className="text-sm text-muted-foreground">This run isn't in your recent history anymore.</p>
          <Link to="/runs" className="text-sm font-medium text-foreground underline underline-offset-4">
            Back to Run History
          </Link>
        </div>
      </AppShell>
    );
  }

  const detail = getRunDetail(run);

  const toggle = (i: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <AppShell>
      <Seo title={`${detail.workflowName} run — dbSherpa Studio`} description="Run output detail." path={`/runs/${run.id}`} />
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
        <Link to="/runs" className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Run History
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <p className="truncate text-sm font-semibold tracking-tight">{detail.workflowName}</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 md:px-6">
          <div>
            <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">Run output</p>
            <h1 className="text-xl font-bold tracking-tight">{detail.workflowName}</h1>
            <div className="mt-2">
              <StatusPill status={detail.status} />
            </div>
          </div>

          <div className="emt-card grid grid-cols-2 gap-4 p-4 sm:grid-cols-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">Run ID</p>
              <p className="mt-1 truncate font-mono text-xs">{detail.runId}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">Duration</p>
              <p className="mt-1 font-mono text-xs">{detail.durationLabel}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">Started</p>
              <p className="mt-1 text-xs">{detail.startedLabel}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">Finished</p>
              <p className="mt-1 text-xs">{detail.finishedLabel}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">Nodes</p>
              <p className="mt-1 text-xs">{detail.nodeCount}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">Edges</p>
              <p className="mt-1 text-xs">{detail.edgeCount}</p>
            </div>
          </div>

          {detail.generatedFile && (
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">Generated files</p>
              <div className="emt-card flex items-center gap-3 p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
                  <Download className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{detail.generatedFile.name}</p>
                  <p className="text-xs text-muted-foreground">{detail.generatedFile.sizeLabel}</p>
                </div>
                <button
                  onClick={() => toast("This is a demo — no real file is generated.")}
                  className="text-xs font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Download
                </button>
              </div>
            </div>
          )}

          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">Step-by-step node execution</p>
            <div className="emt-card divide-y divide-border">
              {detail.steps.map((s, i) => {
                const isOpen = expanded.has(i);
                return (
                  <div key={i}>
                    <button onClick={() => toggle(i)} className="flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-surface">
                      <StatusPill status={s.status} label="" className="border-0 bg-transparent px-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{s.name}</p>
                        <p className="font-mono text-[10px] text-muted-foreground">{s.type}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{s.durationMs}ms</span>
                      <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                    </button>
                    {isOpen && (
                      <div className="border-t border-border/60 bg-surface/40 px-3.5 py-3 pl-[3.25rem]">
                        <p className="text-xs">
                          Step status:{" "}
                          <span className={cn(s.status === "success" && "text-success", s.status === "error" && "text-destructive", s.status === "warning" && "text-warning")}>
                            {s.status === "success" ? "Success" : s.status === "error" ? "Failed" : "Warning"}
                          </span>
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">{STEP_DESCRIPTIONS[s.type] ?? "Executed this step."}</p>
                      </div>
                    )}
                  </div>
                );
              })}
              {detail.steps.length === 0 && (
                <p className="p-3.5 text-xs text-muted-foreground">No step detail available for this run.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default RunDetail;
