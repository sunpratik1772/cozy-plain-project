import { useLocation } from "react-router-dom";
import { Menu, Plus, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSherpa } from "@/contexts/SherpaContext";

interface TopbarProps {
  onSearch: () => void;
  onMobileMenu: () => void;
}

const TITLES: [string, string][] = [
  ["/", "Dashboard"],
  ["/studio", "Workflow Studio"],
  ["/templates", "Templates"],
  ["/codebase", "Codebase Graph"],
];

function resolveTitle(pathname: string) {
  if (pathname === "/") return "Dashboard";
  const match = TITLES.find(([path]) => path !== "/" && (pathname === path || pathname.startsWith(`${path}/`)));
  return match?.[1] ?? "EMT Sun";
}

export function EmtTopbar({ onSearch, onMobileMenu }: TopbarProps) {
  const { pathname } = useLocation();
  const { openChat } = useSherpa();
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

      <h1 className="text-sm font-semibold tracking-tight">{title}</h1>

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
          onClick={() => openChat()}
          className="hidden items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-ring/40 hover:text-foreground sm:flex"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Ask Sherpa
        </button>
        <ThemeToggle className="h-8 w-8 border border-border bg-surface hover:border-ring/40" />
        <Button size="sm" className="h-8 gap-1.5 text-xs font-semibold">
          <Plus className="h-3.5 w-3.5" />
          New workflow
        </Button>
      </div>
    </header>
  );
}
