import { useMemo, useState } from "react";
import { Boxes, Search } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Seo } from "@/components/Seo";
import { AppShell } from "@/components/emt/AppShell";
import { useWorkspace } from "@/contexts/WorkspaceContext";

const Skills = () => {
  const { skills, toggleSkill } = useWorkspace();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return skills;
    return skills.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
  }, [skills, query]);

  return (
    <AppShell>
      <Seo
        title="Skills — EMT Sun"
        description="Packaged capabilities Sherpa can drop into any workflow."
        path="/skills"
      />
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
        <p className="text-sm font-semibold tracking-tight">Skills</p>
        <div className="relative ml-2 w-72 max-w-full">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills…"
            className="h-7 w-full rounded-md border border-border bg-surface pl-8 pr-2.5 text-xs outline-none placeholder:text-muted-foreground/70 focus:border-ring/50"
            aria-label="Search skills"
          />
        </div>
        <span className="text-[11px] text-muted-foreground">{filtered.length} skills</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <p className="mb-4 text-sm text-muted-foreground">
            Packaged capabilities Sherpa can drop into any workflow — define the logic once, reuse everywhere.
          </p>
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
                      <Boxes className="h-2.5 w-2.5" /> Prebuilt
                    </span>
                    <Switch
                      checked={s.enabled}
                      onCheckedChange={() => {
                        toggleSkill(s.id);
                        toast(s.enabled ? `${s.name} disabled` : `${s.name} enabled`);
                      }}
                      aria-label={`Toggle ${s.name}`}
                    />
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

          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">No skills match "{query}".</p>
          )}
        </div>
      </div>
    </AppShell>
  );
};

export default Skills;
