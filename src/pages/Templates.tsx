import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Boxes, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Seo } from "@/components/Seo";
import { AppShell } from "@/components/emt/AppShell";
import { TEMPLATES } from "@/data/templates";

const Templates = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TEMPLATES;
    return TEMPLATES.filter((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
  }, [query]);

  return (
    <AppShell>
      <Seo
        title="Templates — EMT Sun"
        description="Prebuilt workflow templates you can open straight into Studio and adapt."
        path="/templates"
      />
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
        <p className="text-sm font-semibold tracking-tight">Templates</p>
        <div className="relative ml-2 w-72 max-w-full">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates…"
            className="h-7 w-full rounded-md border border-border bg-surface pl-8 pr-2.5 text-xs outline-none placeholder:text-muted-foreground/70 focus:border-ring/50"
            aria-label="Search templates"
          />
        </div>
        <span className="text-[11px] text-muted-foreground">{filtered.length} templates</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <p className="mb-4 text-sm text-muted-foreground">
            Prebuilt workflows and Sherpa drafts — open one straight into Studio and adapt it.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
              >
                <Link to={`/studio/${t.presetId}`} className="emt-card emt-card-hover group flex h-full flex-col p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      <Boxes className="h-2.5 w-2.5" /> Prebuilt
                    </span>
                  </div>
                  <p className="text-sm font-semibold leading-snug tracking-tight transition-colors group-hover:text-foreground">
                    {t.title}
                  </p>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">{t.description}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
                    <span>{t.nodeCount} nodes</span>
                    <span>{t.updatedLabel}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">No templates match "{query}".</p>
          )}
        </div>
      </div>
    </AppShell>
  );
};

export default Templates;
