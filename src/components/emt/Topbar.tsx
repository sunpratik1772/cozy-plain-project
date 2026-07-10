import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Plus, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudioStore } from "@/store/studioStore";

interface TopbarProps {
  onSearch: () => void;
  onMobileMenu: () => void;
}

const TITLES: [string, string][] = [
  ["/", "Dashboard"],
  ["/docs", "Docs"],
  ["/api", "API Reference"],
  ["/changelog", "Changelog"],
];

// Pages below already render their own in-page header bar with the title
// (and richer status/actions), so the Topbar would otherwise show the same
// name twice — leave the Topbar blank for these instead of duplicating it.
const OWN_HEADER_PATHS = ["/studio", "/templates", "/skills", "/automations", "/runs", "/codebase", "/settings"];

function resolveTitle(pathname: string) {
  if (OWN_HEADER_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) return null;
  if (pathname === "/") return "Dashboard";
  const match = TITLES.find(([path]) => path !== "/" && (pathname === path || pathname.startsWith(`${path}/`)));
  return match?.[1] ?? "dbSherpa Studio";
}

export function EmtTopbar({ onSearch, onMobileMenu }: TopbarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const clearCopilot = useStudioStore((s) => s.clearCopilotMessages);
  const title = resolveTitle(pathname);

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
      <button
        onClick={onMobileMenu}
        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-4.5 w-4.5" size={18} />
      </button>

      {title && <h1 className="text-sm font-semibold tracking-tight">{title}</h1>}

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
        <Button size="sm" className="h-8 gap-1.5 text-xs font-semibold" onClick={() => navigate("/studio/new")}>
          <Plus className="h-3.5 w-3.5" />
          New workflow
        </Button>
      </div>
    </header>
  );
}
