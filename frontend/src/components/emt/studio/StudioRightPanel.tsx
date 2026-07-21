import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NODE_CONFIG, NODE_OUTPUT } from "@/data/emt";
import { useStudioStore } from "@/store/studioStore";
import { StatusPill } from "@/components/emt/StatusPill";
import { cn } from "@/lib/utils";
import { ChevronsRight, Search, ChevronRight, MoreVertical } from "lucide-react";

type RunTab = "logs" | "errors" | "payloads";

const RUN_TABS: { id: RunTab; label: string }[] = [
  { id: "logs", label: "Logs" },
  { id: "errors", label: "Errors" },
  { id: "payloads", label: "Payloads" },
];

export function StudioRightPanel() {
  const selectedNodeId = useStudioStore((s) => s.selectedNodeId);
  const selectNode = useStudioStore((s) => s.selectNode);
  const nodes = useStudioStore((s) => s.nodes);
  const logs = useStudioStore((s) => s.logs);
  const isRunning = useStudioStore((s) => s.isRunning);
  const runResult = useStudioStore((s) => s.runResult);
  const runError = useStudioStore((s) => s.runError);
  const runStatus = useStudioStore((s) => s.runStatus);
  const workflowName = useStudioStore((s) => s.workflowName);
  const [logFilter, setLogFilter] = useState("");
  const [tab, setTab] = useState<RunTab>("logs");

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null;
  const nodeType = (selectedNode?.data as { nodeType?: string } | undefined)?.nodeType;
  const config = nodeType ? NODE_CONFIG[nodeType] : undefined;
  const output = nodeType ? NODE_OUTPUT[nodeType] : undefined;

  const errorLogs = useMemo(() => logs.filter((l) => l.level === "error" || l.level === "warn"), [logs]);
  const shownLogs = tab === "errors" ? errorLogs : logs;
  const filteredLogs = useMemo(
    () =>
      logFilter.trim()
        ? shownLogs.filter((l) => l.msg.toLowerCase().includes(logFilter.trim().toLowerCase()))
        : shownLogs,
    [shownLogs, logFilter],
  );

  const status = isRunning ? "running" : runStatus;

  return (
    <aside className="hidden w-[400px] shrink-0 flex-col border-l border-border bg-card/40 xl:flex">
      {/* Run header — "Running - New leads automation" */}
      <div className="border-b border-border px-5 pb-4 pt-5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            {status === "running" ? "Running" : "Last run"} — {workflowName}
          </h2>
          <button
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Collapse panel"
          >
            <ChevronsRight className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <StatusPill status={status} />
          <span className="text-xs text-muted-foreground">Last run: Apr 19, 2025 · 09:08:11</span>
        </div>
      </div>

      {selectedNode && config ? (
        /* Contextual node config (shown when a node is selected) */
        <div className="flex-1 overflow-y-auto p-4">
          <button
            onClick={() => selectNode(null)}
            className="mb-3 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronRight className="h-3 w-3 rotate-180" /> Back to run
          </button>
          <div className="emt-card p-3">
            <p className="mb-2 text-xs font-semibold">{config.subtitle}</p>
            <div className="space-y-2.5">
              {config.fields.map((f) => (
                <div key={f.label} className="space-y-1">
                  <Label className="text-[11px]">{f.label}</Label>
                  {f.value.length > 48 ? (
                    <textarea
                      defaultValue={f.value}
                      className="min-h-[72px] w-full rounded-md border border-input bg-background p-2 text-xs outline-none focus:border-ring/50"
                    />
                  ) : (
                    <Input defaultValue={f.value} className="h-7 bg-background font-mono text-xs" />
                  )}
                </div>
              ))}
            </div>
          </div>
          {output && (
            <p className="mt-3 text-[11px] text-muted-foreground">{output.note}</p>
          )}
        </div>
      ) : (
        /* Run view — Logs / Errors / Payloads */
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center gap-2 px-5 pb-3 pt-4">
            <nav className="flex items-center gap-1">
              {RUN_TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-sm font-medium transition-colors",
                    tab === t.id
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t.label}
                  {t.id === "errors" && errorLogs.length > 0 && (
                    <span className="ml-1.5 text-[11px] text-warning">{errorLogs.length}</span>
                  )}
                </button>
              ))}
            </nav>
            <div className="relative ml-auto w-40">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={logFilter}
                onChange={(e) => setLogFilter(e.target.value)}
                placeholder="Filter Logs"
                className="h-8 bg-surface pl-8 text-xs"
              />
            </div>
          </div>

          {tab === "payloads" ? (
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
              {runError && (
                <div className="emt-card mb-2 border-destructive/40 p-2.5">
                  <p className="text-xs font-medium text-destructive">Execution Failed</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{runError}</p>
                </div>
              )}
              <pre className="emt-card overflow-x-auto p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
{JSON.stringify(
  runResult ?? {
    summary: "117 new leads processed",
    link: "http://localhost:3000/leads/summary",
    user: "Sam Lasisi",
  },
  null,
  2,
)}
              </pre>
            </div>
          ) : (
            <div className="min-h-0 flex-1 overflow-y-auto">
              {/* Table header */}
              <div className="sticky top-0 z-10 flex items-center gap-3 border-y border-border bg-card/80 px-5 py-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground backdrop-blur">
                <span className="w-[128px] shrink-0">Date</span>
                <span className="flex-1">Message</span>
                <MoreVertical className="h-3.5 w-3.5 text-muted-foreground/60" />
              </div>
              {filteredLogs.length ? (
                <ul className="font-mono text-[11px] leading-relaxed">
                  {filteredLogs.map((l, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 border-l-2 border-l-border/60 px-5 py-1 hover:bg-surface/40"
                    >
                      <span className="w-[128px] shrink-0 text-muted-foreground/70">{l.t}</span>
                      <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground/40" />
                      <span
                        className={cn(
                          "min-w-0 flex-1",
                          l.level === "warn"
                            ? "text-warning"
                            : l.level === "error"
                              ? "text-destructive"
                              : "text-muted-foreground",
                        )}
                      >
                        {l.msg}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-5 pt-4 text-xs text-muted-foreground">
                  {logFilter
                    ? `No log lines match "${logFilter}".`
                    : tab === "errors"
                      ? "No errors — the last run was clean."
                      : "No run yet — click Run or ask Sherpa to run the workflow."}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
