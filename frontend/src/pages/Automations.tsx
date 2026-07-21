import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarClock, PanelRightOpen, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Seo } from "@/components/Seo";
import { AppShell } from "@/components/emt/AppShell";
import { TopbarSlot } from "@/components/emt/TopbarSlot";
import { WORKFLOWS } from "@/data/emt";
import { useWorkspace } from "@/contexts/WorkspaceContext";

const Automations = () => {
  const { automations, addAutomation, toggleAutomation, deleteAutomation } = useWorkspace();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [workflow, setWorkflow] = useState(WORKFLOWS[0]?.name ?? "");
  const [cron, setCron] = useState("0 2 * * *");

  const submit = () => {
    if (!name.trim() || !workflow) return;
    addAutomation({ name: name.trim(), workflow, cron: cron.trim() || "0 2 * * *" });
    toast.success(`"${name.trim()}" automation created`);
    setName("");
    setCron("0 2 * * *");
    setOpen(false);
  };

  return (
    <AppShell>
      <Seo
        title="Automations — Sherpa Studio"
        description="Scheduled runs for your saved workflows."
        path="/automations"
      />
      <TopbarSlot>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            aria-label="Collapse to side panel"
            onClick={() => navigate("/", { state: { openDrawer: "automations" } })}
          >
            <PanelRightOpen className="h-3.5 w-3.5" />
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1.5 text-xs font-semibold">
                <Plus className="h-3.5 w-3.5" /> New automation
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>New automation</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nightly sync" className="h-8 bg-background text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Workflow</Label>
                  <Select value={workflow} onValueChange={setWorkflow}>
                    <SelectTrigger className="h-8 bg-background text-sm">
                      <SelectValue placeholder="Select a workflow" />
                    </SelectTrigger>
                    <SelectContent>
                      {WORKFLOWS.map((w) => (
                        <SelectItem key={w.id} value={w.name}>{w.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Cron expression</Label>
                  <Input value={cron} onChange={(e) => setCron(e.target.value)} className="h-8 bg-background font-mono text-sm" />
                </div>
              </div>
              <DialogFooter>
                <Button size="sm" onClick={submit} disabled={!name.trim()}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </TopbarSlot>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl space-y-3 px-4 py-8 md:px-6">
          <header className="mb-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Automations</h1>
            <p className="mt-1 text-sm text-muted-foreground">Scheduled runs for your saved workflows · {automations.length} scheduled.</p>
          </header>

          {automations.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">No automations yet — create one to run a workflow on a schedule.</p>
          )}

          {automations.map((a) => (
            <div key={a.id} className="emt-card emt-card-hover p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface">
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.workflow}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <code className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                        {a.cron}
                      </code>
                      <span className="text-[11px] text-muted-foreground">Next: {a.enabled ? a.next : "Paused"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={a.enabled} onCheckedChange={() => toggleAutomation(a.id)} aria-label={`Toggle ${a.name}`} />
                  <button
                    onClick={() => {
                      deleteAutomation(a.id);
                      toast(`"${a.name}" automation deleted`);
                    }}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                    aria-label={`Delete ${a.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
};

export default Automations;
