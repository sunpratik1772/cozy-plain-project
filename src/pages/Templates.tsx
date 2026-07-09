import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Search, Sparkles, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Seo } from "@/components/Seo";
import { AppShell } from "@/components/emt/AppShell";
import { TEMPLATES } from "@/data/templates";
import { WORKFLOWS } from "@/data/emt";

type Source = "prebuilt" | "workspace";
type WorkspaceTab = "workflows" | "drafts";

interface CardItem {
  id: string;
  title: string;
  description: string;
  nodeCount: number;
  updatedLabel: string;
  href: string;
  tag: string;
  icon: LucideIcon;
}

const Templates = () => {
  const [source, setSource] = useState<Source>("prebuilt");
  const [workspaceTab, setWorkspaceTab] = useState<WorkspaceTab>("workflows");
  const [query, setQuery] = useState("");

  const savedWorkflows = WORKFLOWS.filter((w) => w.kind === "saved");
  const draftWorkflows = WORKFLOWS.filter((w) => w.kind === "draft");

  const items: CardItem[] = useMemo(() => {
    if (source === "prebuilt") {
      return TEMPLATES.map((t) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        nodeCount: t.nodeCount,
        updatedLabel: t.updatedLabel,
        href: `/studio/${t.presetId}`,
        tag: "Prebuilt",
        icon: Sparkles,
      }));
    }
    const list = workspaceTab === "workflows" ? savedWorkflows : draftWorkflows;
    return list.map((w) => ({
      id: w.id,
      title: w.name,
      description: w.filename,
      nodeCount: w.nodeCount,
      updatedLabel: w.updatedLabel,
      href: `/studio/${w.id}`,
      tag: workspaceTab === "workflows" ? "Workflow" : "Draft",
      icon: workspaceTab === "workflows" ? Copy : Sparkles,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, workspaceTab]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <AppShell>
      <Seo
        title="Templates — EMT Sun"
        description="Prebuilt workflow templates, your saved workflows, and Sherpa drafts — open one straight into Studio and adapt it."
        path="/templates"
      />
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
        <p className="text-sm font-semibold tracking-tight">Templates</p>

        <Select value={source} onValueChange={(v) => setSource(v as Source)}>
          <SelectTrigger className="ml-2 h-7 w-48 bg-surface text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="prebuilt">Prebuilt templates ({TEMPLATES.length})</SelectItem>
            <SelectItem value="workspace">Your workspace ({WORKFLOWS.length})</SelectItem>
          </SelectContent>
        </Select>

        {source === "workspace" && (
          <div className="flex items-center gap-1 rounded-md border border-border bg-surface p-0.5">
            <button
              onClick={() => setWorkspaceTab("workflows")}
              className={cn(
                "rounded px-2 py-1 text-xs font-medium transition-colors",
                workspaceTab === "workflows" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Your workflows <span className="text-muted-foreground">{savedWorkflows.length}</span>
            </button>
            <button
              onClick={() => setWorkspaceTab("drafts")}
              className={cn(
                "rounded px-2 py-1 text-xs font-medium transition-colors",
                workspaceTab === "drafts" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Drafts <span className="text-muted-foreground">{draftWorkflows.length}</span>
            </button>
          </div>
        )}

        <div className="relative ml-auto w-64 max-w-full sm:ml-2">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates…"
            className="h-7 w-full rounded-md border border-border bg-surface pl-8 pr-2.5 text-xs outline-none placeholder:text-muted-foreground/70 focus:border-ring/50"
            aria-label="Search templates"
          />
        </div>
        <span className="hidden text-[11px] text-muted-foreground sm:inline">{filtered.length}</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <p className="mb-4 text-sm text-muted-foreground">
            {source === "prebuilt"
              ? "Prebuilt workflows you can open straight into Studio and adapt."
              : workspaceTab === "workflows"
                ? "Workflows you've saved — open one to keep editing."
                : "Sherpa drafts and works-in-progress — open one to continue."}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
              >
                <Link to={t.href} className="emt-card emt-card-hover group flex h-full flex-col p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      <t.icon className="h-2.5 w-2.5" /> {t.tag}
                    </span>
                  </div>
                  <p className="text-sm font-semibold leading-snug tracking-tight transition-colors group-hover:text-foreground">
                    {t.title}
                  </p>
                  <p className="mt-1.5 flex-1 truncate text-xs leading-relaxed text-muted-foreground">{t.description}</p>
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
