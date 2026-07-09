import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Boxes,
  CalendarClock,
  Database,
  GitGraph,
  History,
  LayoutGrid,
  LayoutTemplate,
  Puzzle,
  Sparkles,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";
import { ProfileMenu } from "./ProfileMenu";
import type { EmtDrawer } from "./AppShell";
import { useSherpa } from "@/contexts/SherpaContext";

interface SidebarProps {
  onOpenDrawer: (d: EmtDrawer) => void;
  className?: string;
}

const routes = [
  { label: "Dashboard", to: "/", icon: LayoutGrid },
  { label: "Studio", to: "/studio", icon: Workflow },
  { label: "Templates", to: "/templates", icon: LayoutTemplate },
  { label: "Codebase", to: "/codebase", icon: GitGraph },
  { label: "Docs", to: "/docs", icon: BookOpen },
];

const workspaceRoutes = [
  { label: "Automations", to: "/automations", icon: CalendarClock },
  { label: "Run History", to: "/runs", icon: History },
  { label: "Skills", to: "/skills", icon: Puzzle },
];

const drawers: { label: string; id: EmtDrawer; icon: typeof Boxes }[] = [
  { label: "Data Sources", id: "sources", icon: Database },
  { label: "Nodes", id: "nodes", icon: Boxes },
];

export function EmtSidebar({ onOpenDrawer, className }: SidebarProps) {
  const { pathname } = useLocation();
  const { openChat } = useSherpa();

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  const itemClass = (active: boolean) =>
    cn(
      "flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors",
      active
        ? "bg-sidebar-accent text-sidebar-accent-foreground"
        : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
    );

  return (
    <aside
      className={cn(
        "flex h-full w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar",
        className,
      )}
    >
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <Link to="/" aria-label="EMT Sun dashboard">
          <BrandMark />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3 scrollbar-none">
        <button
          onClick={() => openChat()}
          className="mb-3 flex w-full items-center gap-2.5 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
        >
          <Sparkles className="h-4 w-4" />
          Ask Sherpa
        </button>
        {routes.map((r) => (
          <Link key={r.to} to={r.to} className={itemClass(isActive(r.to))}>
            <r.icon className="h-4 w-4" />
            {r.label}
          </Link>
        ))}

        <p className="px-2.5 pb-1 pt-5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
          Workspace
        </p>
        {workspaceRoutes.map((r) => (
          <Link key={r.to} to={r.to} className={itemClass(isActive(r.to))}>
            <r.icon className="h-4 w-4" />
            {r.label}
          </Link>
        ))}
        {drawers.map((d) => (
          <button key={d.id} onClick={() => onOpenDrawer(d.id)} className={itemClass(false)}>
            <d.icon className="h-4 w-4" />
            {d.label}
          </button>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <ProfileMenu />
      </div>
    </aside>
  );
}
