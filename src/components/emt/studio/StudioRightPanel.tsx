import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LOGS = [
  { t: "12:04:01", level: "info", msg: "Run started (trigger: manual)" },
  { t: "12:04:02", level: "info", msg: "db_query: SELECT * FROM leads LIMIT 500" },
  { t: "12:04:14", level: "info", msg: "transform: 500 → 342 rows after filter" },
  { t: "12:04:15", level: "info", msg: "agent: scoring batch 1/4" },
  { t: "12:04:38", level: "warn", msg: "agent: 3 rows missing company field" },
  { t: "12:04:43", level: "info", msg: "output: wrote 342 rows to scored_leads" },
  { t: "12:04:43", level: "info", msg: "Run succeeded in 42s" },
];

const ROWS = [
  { name: "Acme Corp", score: 92, tier: "A" },
  { name: "Globex", score: 81, tier: "A" },
  { name: "Initech", score: 64, tier: "B" },
  { name: "Umbrella Ltd", score: 47, tier: "C" },
  { name: "Hooli", score: 88, tier: "A" },
];

export function StudioRightPanel() {
  return (
    <aside className="hidden w-80 shrink-0 flex-col border-l border-border bg-card/50 lg:flex">
      <Tabs defaultValue="config" className="flex h-full flex-col">
        <TabsList className="m-3 grid h-8 grid-cols-3 bg-surface">
          <TabsTrigger value="config" className="text-xs">Config</TabsTrigger>
          <TabsTrigger value="output" className="text-xs">Output</TabsTrigger>
          <TabsTrigger value="logs" className="text-xs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="flex-1 space-y-3 overflow-y-auto px-3 pb-3">
          <div className="emt-card p-3">
            <p className="mb-2 text-xs font-semibold">Agent · score_leads</p>
            <div className="space-y-2.5">
              <div className="space-y-1">
                <Label className="text-[11px]">Model</Label>
                <Input defaultValue="gemini-2.5-flash" className="h-7 bg-background font-mono text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-[11px]">Batch size</Label>
                <Input defaultValue="100" className="h-7 bg-background font-mono text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-[11px]">System prompt</Label>
                <textarea
                  defaultValue="Score each lead 0–100 based on fit and intent signals."
                  className="min-h-[72px] w-full rounded-md border border-input bg-background p-2 text-xs outline-none focus:border-ring/50"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="output" className="flex-1 overflow-y-auto px-3 pb-3">
          <div className="emt-card overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="p-2 font-medium">name</th>
                  <th className="p-2 font-medium">score</th>
                  <th className="p-2 font-medium">tier</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {ROWS.map((r) => (
                  <tr key={r.name} className="border-b border-border/50 last:border-0">
                    <td className="p-2">{r.name}</td>
                    <td className="p-2">{r.score}</td>
                    <td className="p-2">{r.tier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">342 rows · showing 5</p>
        </TabsContent>

        <TabsContent value="logs" className="flex-1 overflow-y-auto px-3 pb-3">
          <div className="emt-card space-y-1 p-3 font-mono text-[11px] leading-relaxed">
            {LOGS.map((l, i) => (
              <p key={i} className="flex gap-2">
                <span className="shrink-0 text-muted-foreground/60">{l.t}</span>
                <span className={l.level === "warn" ? "text-warning" : "text-muted-foreground"}>{l.msg}</span>
              </p>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  );
}
