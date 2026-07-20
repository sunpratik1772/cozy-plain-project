import { useMemo, useState } from "react";
import { Boxes, Plus, Search, Sparkles, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Seo } from "@/components/Seo";
import { AppShell } from "@/components/emt/AppShell";
import { useWorkspace } from "@/contexts/WorkspaceContext";

type Source = "prebuilt" | "workspace";

const Skills = () => {
  const { skills, toggleSkill, addCustomSkill, deleteSkill } = useWorkspace();
  const [source, setSource] = useState<Source>("prebuilt");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const prebuilt = skills.filter((s) => s.origin === "prebuilt");
  const custom = skills.filter((s) => s.origin === "custom");
  const visible = source === "prebuilt" ? prebuilt : custom;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return visible;
    return visible.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
  }, [visible, query]);

  const submit = () => {
    if (!name.trim()) return;
    addCustomSkill({ name: name.trim(), description: description.trim() || "Custom skill." });
    toast.success(`"${name.trim()}" skill added`);
    setName("");
    setDescription("");
    setOpen(false);
  };

  return (
    <AppShell>
      <Seo
        title="Skills — Sherpa Studio"
        description="Packaged capabilities Sherpa can drop into any workflow."
        path="/skills"
      />
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
        <p className="text-sm font-semibold tracking-tight">Skills</p>

        <Select value={source} onValueChange={(v) => setSource(v as Source)}>
          <SelectTrigger className="ml-2 h-7 w-48 bg-surface text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="prebuilt">Prebuilt skills ({prebuilt.length})</SelectItem>
            <SelectItem value="workspace">Your workspace ({custom.length})</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative ml-auto w-64 max-w-full sm:ml-2">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills…"
            className="h-7 w-full rounded-md border border-border bg-surface pl-8 pr-2.5 text-xs outline-none placeholder:text-muted-foreground/70 focus:border-ring/50"
            aria-label="Search skills"
          />
        </div>

        {source === "workspace" && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-7 gap-1.5 text-xs font-semibold">
                <Plus className="h-3.5 w-3.5" /> New skill
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>New skill</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Currency normalizer" className="h-8 bg-background text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Description</Label>
                  <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What should Sherpa do with this skill?" className="h-8 bg-background text-sm" />
                </div>
              </div>
              <DialogFooter>
                <Button size="sm" onClick={submit} disabled={!name.trim()}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <p className="mb-4 text-sm text-muted-foreground">
            {source === "prebuilt"
              ? "Packaged capabilities Sherpa can drop into any workflow — define the logic once, reuse everywhere."
              : "Skills you've defined for this workspace."}
          </p>

          {filtered.length === 0 && source === "workspace" && (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No custom skills yet — create one to give Sherpa a new capability.
            </p>
          )}
          {filtered.length === 0 && source === "prebuilt" && (
            <p className="py-12 text-center text-sm text-muted-foreground">No skills match "{query}".</p>
          )}

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
              >
                <div className="emt-card flex h-full flex-col p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {s.origin === "prebuilt" ? <Boxes className="h-2.5 w-2.5" /> : <Sparkles className="h-2.5 w-2.5" />}
                      {s.origin === "prebuilt" ? "Prebuilt" : "Custom"}
                    </span>
                    <div className="flex items-center gap-2">
                      {s.origin === "custom" && (
                        <button
                          onClick={() => {
                            deleteSkill(s.id);
                            toast(`"${s.name}" skill deleted`);
                          }}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label={`Delete ${s.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <Switch
                        checked={s.enabled}
                        onCheckedChange={() => {
                          toggleSkill(s.id);
                          toast(s.enabled ? `${s.name} disabled` : `${s.name} enabled`);
                        }}
                        aria-label={`Toggle ${s.name}`}
                      />
                    </div>
                  </div>
                  <p className="text-sm font-semibold leading-snug tracking-tight">{s.name}</p>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">{s.description}</p>
                  <div className="mt-3 border-t border-border pt-3 text-[11px] text-muted-foreground">
                    {s.usedByWorkflows > 0 ? `Used by ${s.usedByWorkflows} workflow${s.usedByWorkflows === 1 ? "" : "s"} · ${s.runs} runs` : "Not yet used · 0 runs"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Skills;
