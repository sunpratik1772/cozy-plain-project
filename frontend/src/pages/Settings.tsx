import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Database, FileSpreadsheet, Plug, Settings as SettingsIcon, Shield, Trash2, UserRound } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Seo } from "@/components/Seo";
import { AppShell } from "@/components/emt/AppShell";
import { TopbarSlot } from "@/components/emt/TopbarSlot";
import { StatusPill } from "@/components/emt/StatusPill";
import { useWorkspace } from "@/contexts/WorkspaceContext";

const ICONS = { database: Database, file: FileSpreadsheet, mcp: Plug };

type Cat = "general" | "permissions" | "sources" | "danger";

const CATEGORIES: { id: Cat; label: string; icon: typeof SettingsIcon }[] = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "permissions", label: "Permissions", icon: Shield },
  { id: "sources", label: "Data sources", icon: Database },
];

const PERM_TILES = [
  { id: "full", title: "Full access", desc: "Sherpa can read every connected data source." },
  { id: "selective", title: "Selective", desc: "You explicitly choose which sources Sherpa can use." },
  { id: "strict", title: "Strict", desc: "No data sources are exposed to Sherpa." },
] as const;

const Settings = () => {
  const { settings, updateSettings, sources, toggleSourceStatus, resetWorkspace } = useWorkspace();
  const [cat, setCat] = useState<Cat>("general");
  const [displayName, setDisplayName] = useState(settings.displayName);
  const [workspaceName, setWorkspaceName] = useState(settings.workspaceName);

  useEffect(() => {
    setDisplayName(settings.displayName);
    setWorkspaceName(settings.workspaceName);
  }, [settings.displayName, settings.workspaceName]);

  const saveProfile = () => {
    updateSettings({ displayName: displayName.trim() || settings.displayName, workspaceName: workspaceName.trim() || settings.workspaceName });
    toast.success("Settings saved");
  };

  const sourcesOn = sources.filter((s) => s.status === "connected").length;
  const sourcesTotal = sources.length;
  const permMode: "full" | "selective" | "strict" = useMemo(() => {
    if (sourcesTotal === 0) return "selective";
    if (sourcesOn === sourcesTotal) return "full";
    if (sourcesOn === 0) return "strict";
    return "selective";
  }, [sourcesOn, sourcesTotal]);

  const setPermMode = (mode: (typeof PERM_TILES)[number]["id"]) => {
    if (mode === "full") {
      sources.forEach((s) => {
        if (s.status !== "connected") toggleSourceStatus(s.id);
      });
    } else if (mode === "strict") {
      sources.forEach((s) => {
        if (s.status === "connected") toggleSourceStatus(s.id);
      });
    }
  };

  return (
    <AppShell>
      <Seo title="Settings — Sherpa Studio" description="Workspace profile, permissions and data source access." path="/settings" />

      <TopbarSlot>
        <span className="hidden text-xs text-muted-foreground lg:inline">Changes are saved automatically</span>
      </TopbarSlot>

      <div className="flex min-h-0 flex-1">
        <aside className="w-52 shrink-0 overflow-y-auto border-r border-border p-3">
          <p className="px-2.5 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">General</p>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors",
                cat === c.id
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
              )}
            >
              <c.icon className="h-4 w-4" />
              {c.label}
            </button>
          ))}

          <p className="px-2.5 pb-1 pt-5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">Workspace</p>
          <button
            onClick={() => setCat("danger")}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors",
              cat === "danger" ? "bg-destructive/10 text-destructive" : "text-destructive/80 hover:bg-destructive/10 hover:text-destructive",
            )}
          >
            <AlertTriangle className="h-4 w-4" />
            Danger zone
          </button>
        </aside>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl space-y-4 px-6 py-6">
            {cat === "general" && (
              <>
                <header>
                  <h2 className="text-lg font-semibold tracking-tight">General</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Workspace identity shown across Studio and exports.
                  </p>
                </header>
                <section className="emt-card space-y-3 p-4">
                  <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
                    <UserRound className="h-4 w-4 text-muted-foreground" /> Profile
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="set-name" className="text-xs">Display name</Label>
                    <Input id="set-name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="h-8 bg-background text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="set-workspace" className="text-xs">Workspace name</Label>
                    <Input id="set-workspace" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} className="h-8 bg-background font-mono text-sm" />
                  </div>
                  <Button
                    size="sm"
                    className="h-8 text-xs"
                    onClick={saveProfile}
                    disabled={displayName === settings.displayName && workspaceName === settings.workspaceName}
                  >
                    Save changes
                  </Button>
                </section>
              </>
            )}

            {cat === "permissions" && (
              <>
                <header>
                  <h2 className="text-lg font-semibold tracking-tight">Agent permission mode</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Select one of the three options. Per-source permissions can be further customized in Data sources.
                  </p>
                </header>

                <div className="grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Agent permission mode">
                  {PERM_TILES.map((tile) => (
                    <button
                      key={tile.id}
                      type="button"
                      role="radio"
                      aria-checked={permMode === tile.id}
                      onClick={() => setPermMode(tile.id)}
                      className={cn(
                        "rounded-md border p-3 text-left transition-colors",
                        permMode === tile.id ? "border-ring/60 bg-surface" : "border-border hover:border-ring/30",
                      )}
                    >
                      <p className="text-sm font-semibold">{tile.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{tile.desc}</p>
                    </button>
                  ))}
                </div>

                {permMode === "full" && (
                  <div className="flex items-start gap-2 rounded-md border border-warning/30 bg-warning/10 p-3 text-xs text-warning">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>
                      <b>Warning:</b> Full access exposes every connected source to the agent. Switch to Selective for a safer default.
                    </span>
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  {sourcesOn} of {sourcesTotal} sources currently visible to the agent. Toggle individual rows in Data sources.
                </p>
              </>
            )}

            {cat === "sources" && (
              <>
                <header>
                  <h2 className="text-lg font-semibold tracking-tight">Data source access</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Toggle which connectors Sherpa and your workflows can see.
                  </p>
                </header>

                <section className="emt-card divide-y divide-border p-0">
                  {sources.length === 0 && (
                    <p className="px-4 py-6 text-center text-xs text-muted-foreground">No data sources configured yet.</p>
                  )}
                  {sources.map((s) => {
                    const Icon = ICONS[s.type as keyof typeof ICONS] ?? Database;
                    return (
                      <div key={s.id} className="flex items-center gap-3 p-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{s.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{s.detail}</p>
                        </div>
                        <button
                          onClick={() => {
                            toggleSourceStatus(s.id);
                            toast(s.status === "connected" ? `${s.name} disconnected` : `${s.name} connected`);
                          }}
                        >
                          <StatusPill status={s.status} />
                        </button>
                      </div>
                    );
                  })}
                </section>
              </>
            )}

            {cat === "danger" && (
              <>
                <header>
                  <h2 className="text-lg font-semibold tracking-tight text-destructive">Danger zone</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Irreversible workspace actions. Run with care — destructive operations cannot be undone.
                  </p>
                </header>

                <section className="emt-card border-destructive/30 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-destructive">
                    <Trash2 className="h-4 w-4" /> Reset workspace
                  </div>
                  <p className="mb-3 text-xs text-muted-foreground">
                    Permanently delete this workspace — automations, data sources, skills and settings — and restore
                    defaults. Saved workflows in Studio are not affected.
                  </p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" className="h-8 text-xs">Reset workspace</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-card">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Reset this workspace?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This removes every automation and data source and resets your settings. Saved workflows in
                          Studio are not affected. This cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            resetWorkspace();
                            toast.success("Workspace reset");
                          }}
                        >
                          Reset workspace
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Settings;
