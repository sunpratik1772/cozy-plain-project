import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NODE_CONFIG, NODE_OUTPUT, type EmtLogLine } from "@/data/emt";
import { cn } from "@/lib/utils";

interface SelectedNode {
  id: string;
  nodeType: string;
  label: string;
}

interface StudioRightPanelProps {
  node: SelectedNode | null;
  logs: EmtLogLine[];
}

export function StudioRightPanel({ node, logs }: StudioRightPanelProps) {
  const config = node ? NODE_CONFIG[node.nodeType] : undefined;
  const output = node ? NODE_OUTPUT[node.nodeType] : undefined;

  return (
    <aside className="hidden w-80 shrink-0 flex-col border-l border-border bg-card/50 lg:flex">
      <Tabs defaultValue="config" className="flex h-full flex-col">
        <TabsList className="m-3 grid h-8 grid-cols-3 bg-surface">
          <TabsTrigger value="config" className="text-xs">Config</TabsTrigger>
          <TabsTrigger value="output" className="text-xs">Output</TabsTrigger>
          <TabsTrigger value="logs" className="text-xs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="flex-1 space-y-3 overflow-y-auto px-3 pb-3">
          {node && config ? (
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
          {node && output ? (
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
              Select a node that has run to preview its output.
            </p>
          )}
        </TabsContent>

        <TabsContent value="logs" className="flex-1 overflow-y-auto px-3 pb-3">
          {logs.length ? (
            <div className="emt-card space-y-1 p-3 font-mono text-[11px] leading-relaxed">
              {logs.map((l, i) => (
                <p key={i} className="flex gap-2">
                  <span className="shrink-0 text-muted-foreground/60">{l.t}</span>
                  <span className={cn(l.level === "warn" && "text-warning", l.level === "error" && "text-destructive", l.level === "info" && "text-muted-foreground")}>
                    {l.msg}
                  </span>
                </p>
              ))}
            </div>
          ) : (
            <p className="px-1 pt-2 text-xs text-muted-foreground">
              No run yet — click <span className="font-medium text-foreground">Run</span> to execute the workflow and stream logs here.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </aside>
  );
}
