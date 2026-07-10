import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NODE_CONFIG, NODE_OUTPUT } from "@/data/emt";
import { useStudioStore } from "@/store/studioStore";
import { SherpaPanel } from "./SherpaPanel";
import { Sparkles, Settings2, Table2, Terminal } from "lucide-react";

export function StudioRightPanel() {
  const mode = useStudioStore((s) => s.rightPanelMode);
  const setMode = useStudioStore((s) => s.setRightPanelMode);
  const selectedNodeId = useStudioStore((s) => s.selectedNodeId);
  const nodes = useStudioStore((s) => s.nodes);
  const logs = useStudioStore((s) => s.logs);
  const isRunning = useStudioStore((s) => s.isRunning);
  const runResult = useStudioStore((s) => s.runResult);
  const runError = useStudioStore((s) => s.runError);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null;
  const config = selectedNode ? NODE_CONFIG[selectedNode.data.nodeType] : undefined;
  const output = selectedNode ? NODE_OUTPUT[selectedNode.data.nodeType] : undefined;

  return (
    <aside className="hidden w-80 shrink-0 flex-col border-l border-border bg-card/50 lg:flex">
      <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)} className="flex h-full flex-col">
        <TabsList className="m-3 grid h-8 grid-cols-4 bg-surface">
          <TabsTrigger value="sherpa" className="text-xs gap-1">
            <Sparkles className="h-3 w-3" /> Sherpa
          </TabsTrigger>
          <TabsTrigger value="config" className="text-xs gap-1">
            <Settings2 className="h-3 w-3" /> Config
          </TabsTrigger>
          <TabsTrigger value="output" className="text-xs gap-1">
            <Table2 className="h-3 w-3" /> Output
          </TabsTrigger>
          <TabsTrigger value="logs" className="text-xs gap-1">
            <Terminal className="h-3 w-3" /> Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sherpa" className="flex-1 overflow-hidden">
          <SherpaPanel />
        </TabsContent>

        <TabsContent value="config" className="flex-1 space-y-3 overflow-y-auto px-3 pb-3">
          {selectedNode && config ? (
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
          ) : (
            <p className="px-1 pt-2 text-xs text-muted-foreground">
              Select a node on the canvas to view and edit its configuration.
            </p>
          )}
        </TabsContent>

        <TabsContent value="output" className="flex-1 overflow-y-auto px-3 pb-3">
          {runError && (
            <div className="emt-card mb-2 border-destructive/40 p-2.5">
              <p className="text-xs font-medium text-destructive">Execution Failed</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{runError}</p>
            </div>
          )}
          {runResult && (
            <div className="emt-card mb-2 p-2.5">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
                  {runResult.disposition ?? "COMPLETED"}
                </span>
                <span className="text-[11px] text-muted-foreground">{(runResult.totalMs / 1000).toFixed(1)}s · {runResult.nodeCount} nodes</span>
              </div>
              {runResult.summary && <p className="mt-1.5 text-xs text-foreground">{runResult.summary}</p>}
            </div>
          )}
          {selectedNode && output ? (
            <>
              <div className="emt-card overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      {output.columns.map((c) => (
                        <th key={c} className="p-2 font-medium">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    {output.rows.map((row, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        {row.map((cell, j) => (
                          <td key={j} className="p-2">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">{output.note}</p>
            </>
          ) : (
            <p className="px-1 pt-2 text-xs text-muted-foreground">
              {isRunning ? "Running — output will appear as nodes complete." : "Select a node that has run to preview its output."}
            </p>
          )}
        </TabsContent>

        <TabsContent value="logs" className="flex-1 overflow-y-auto px-3 pb-3">
          {logs.length ? (
            <div className="emt-card space-y-1 p-3 font-mono text-[11px] leading-relaxed">
              {logs.map((l, i) => (
                <p key={i} className="flex gap-2">
                  <span className="shrink-0 text-muted-foreground/60">{l.t}</span>
                  <span className={
                    l.level === "warn" ? "text-warning" :
                    l.level === "error" ? "text-destructive" :
                    "text-muted-foreground"
                  }>
                    {l.msg}
                  </span>
                </p>
              ))}
            </div>
          ) : (
            <p className="px-1 pt-2 text-xs text-muted-foreground">
              No run yet — click <span className="font-medium text-foreground">Run</span> or ask Sherpa to run the workflow.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </aside>
  );
}
