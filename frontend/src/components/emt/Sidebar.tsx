import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  CalendarClock,
  GitGraph,
  LayoutGrid,
  LayoutTemplate,
  Puzzle,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { EmtDrawer } from "./AppShell";

interface SidebarProps {
  onOpenDrawer: (d: EmtDrawer) => void;
  className?: string;
}

const items = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutGrid },
  { label: "Studio", to: "/studio", icon: Workflow },
  { label: "Templates", to: "/templates", icon: LayoutTemplate },
  { label: "Automations", to: "/automations", icon: CalendarClock },
  { label: "Skills", to: "/skills", icon: Puzzle },
  { label: "Codebase", to: "/codebase", icon: GitGraph },
  { label: "Docs", to: "/docs/overview", icon: BookOpen },
];

export function EmtSidebar({ className }: SidebarProps) {
  const { pathname } = useLocation();

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  const railBtn = (active: boolean) =>
    cn(
      "group relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
      active
        ? "bg-primary/12 text-primary"
        : "text-muted-foreground/80 hover:bg-sidebar-accent hover:text-foreground",
    );

  return (
    <aside
      className={cn(
        "flex h-full w-[56px] shrink-0 flex-col items-center gap-1 border-r border-sidebar-border bg-sidebar py-3",
        className,
      )}
    >
      {/* Brand mark — minimal, bold sans (Railway/Plasma style) */}
      <Link
        to="/"
        className="mb-3 flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold leading-none text-white"
        style={{ background: "linear-gradient(135deg, hsl(255 92% 70%), hsl(265 85% 58%))" }}
        aria-label="Home"
      >
        S
      </Link>

      <nav className="flex flex-1 flex-col items-center gap-1">
        {items.map((r) => (
          <Tooltip key={r.to} delayDuration={150}>
            <TooltipTrigger asChild>
              <Link to={r.to} className={railBtn(isActive(r.to))} aria-label={r.label}>
                <r.icon className="h-[17px] w-[17px]" strokeWidth={1.75} />
                {isActive(r.to) && (
                  <span className="absolute -left-[11px] top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-r-full bg-primary" />
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>{r.label}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </aside>
  );
}
