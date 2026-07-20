import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, HelpCircle, Menu, Plus, Search, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useStudioStore } from "@/store/studioStore";
import { cn } from "@/lib/utils";

interface TopbarProps {
  onSearch: () => void;
  onMobileMenu: () => void;
}

type Tab = { label: string; to: string };

const TAB_MAP: Record<string, Tab[]> = {
  studio: [
    { label: "Build", to: "/studio" },
    { label: "Runs", to: "/runs" },
    { label: "Settings", to: "/settings" },
  ],
  dashboard: [
    { label: "Overview", to: "/dashboard" },
    { label: "Automations", to: "/automations" },
    { label: "Runs", to: "/runs" },
    { label: "Codebase", to: "/codebase" },
  ],
};

function resolveContext(pathname: string) {
  if (pathname.startsWith("/studio")) {
    return { section: "studio" as const, workspace: "Automations", project: "New workflow" };
  }
  if (pathname.startsWith("/templates")) return { section: "dashboard" as const, workspace: "Library", project: "Templates" };
  if (pathname.startsWith("/skills")) return { section: "dashboard" as const, workspace: "Registry", project: "Skills" };
  if (pathname.startsWith("/automations")) return { section: "dashboard" as const, workspace: "Scheduler", project: "Automations" };
  if (pathname.startsWith("/runs")) return { section: "dashboard" as const, workspace: "Observatory", project: "Run history" };
  if (pathname.startsWith("/codebase")) return { section: "dashboard" as const, workspace: "Insight", project: "Codebase" };
  if (pathname.startsWith("/settings")) return { section: "dashboard" as const, workspace: "Workspace", project: "Settings" };
  return { section: "dashboard" as const, workspace: "Sales Team", project: "Overview" };
}

export function EmtTopbar({ onSearch, onMobileMenu }: TopbarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const clearCopilot = useStudioStore((s) => s.clearCopilotMessages);
  const ctx = resolveContext(pathname);
  const tabs = TAB_MAP[ctx.section] ?? TAB_MAP.dashboard;

  const isTabActive = (to: string) => {
    if (to === "/dashboard") return pathname === "/dashboard";
    return pathname === to || pathname.startsWith(`${to}/`);
  };

  return (
    <header className="relative flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-3 md:px-5">
      <button
        onClick={onMobileMenu}
        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Workspace picker breadcrumb — Plasma-style */}
      <div className="flex items-center gap-2 min-w-0">
        <button className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          {ctx.workspace}
          <ChevronDown className="h-3 w-3" />
        </button>
        <span className="text-muted-foreground/40">/</span>
        <button className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-accent">
          {ctx.project}
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {/* Center Tabs */}
      <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 md:flex">
        {tabs.map((t) => (
          <button
            key={t.to}
            onClick={() => navigate(t.to)}
            className={cn(
              "relative rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              isTabActive(t.to)
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
            {isTabActive(t.to) && (
              <span className="absolute inset-x-2 -bottom-[15px] h-0.5 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={onSearch}
          className="hidden items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-ring/40 hover:text-foreground sm:flex"
        >
          <Search className="h-3.5 w-3.5" />
          Search…
          <kbd className="rounded border border-border bg-background px-1 font-mono text-[10px]">⌘K</kbd>
        </button>
        <button
          onClick={onSearch}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:hidden"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
        <button
          onClick={() => { clearCopilot(); navigate("/studio"); }}
          className="hidden items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-ring/40 hover:text-foreground sm:flex"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Ask Sherpa
        </button>
        <ThemeToggle className="hidden md:flex" />
        <button className="hidden h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:flex" aria-label="Help">
          <HelpCircle className="h-4 w-4" />
        </button>
        <button className="hidden h-8 items-center gap-1.5 rounded-md border border-border bg-transparent px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-ring/40 hover:text-foreground md:inline-flex">
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>
        <Button size="sm" className="h-8 gap-1.5 rounded-md text-xs font-semibold" onClick={() => navigate("/studio/new")}>
          <Plus className="h-3.5 w-3.5" />
          New
        </Button>
      </div>
    </header>
  );
}
