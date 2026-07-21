import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  CalendarClock,
  GitGraph,
  LayoutGrid,
  LayoutTemplate,
  Puzzle,
  Sparkles,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { EmtDrawer } from "./AppShell";
import { useStudioStore } from "@/store/studioStore";

interface SidebarProps {
  onOpenDrawer: (d: EmtDrawer) => void;
  className?: string;
}

const topItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutGrid },
  { label: "Studio", to: "/studio", icon: Workflow },
  { label: "Templates", to: "/templates", icon: LayoutTemplate },
  { label: "Automations", to: "/automations", icon: CalendarClock },
];

const bottomItems = [
  { label: "Skills", to: "/skills", icon: Puzzle },
  { label: "Codebase", to: "/codebase", icon: GitGraph },
  { label: "Docs", to: "/docs/overview", icon: BookOpen },
];

export function EmtSidebar({ className }: SidebarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const clearCopilot = useStudioStore((s) => s.clearCopilotMessages);

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  const railBtn = (active: boolean) =>
    cn(
      "group relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
      active
        ? "bg-sidebar-accent text-foreground"
        : "text-muted-foreground/80 hover:bg-sidebar-accent/70 hover:text-foreground",
    );

  return (
    <aside
      className={cn(
        "flex h-full w-[56px] shrink-0 flex-col items-center gap-1 border-r border-sidebar-border bg-sidebar py-3",
        className,
      )}
    >
      {/* Brand mark — minimal Plasma-style, bold sans */}
      <Link to="/" className="mb-3 flex h-8 w-8 items-center justify-center rounded-md bg-foreground" aria-label="Home">
        <span className="text-[13px] font-bold leading-none text-background">S</span>
      </Link>

      <nav className="flex flex-1 flex-col items-center gap-1">
        {topItems.map((r) => (
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

        {/* Ask Sherpa — subtle accent, matches Plasma's sparkle glow */}
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <button
              onClick={() => { clearCopilot(); navigate("/studio"); }}
              className="relative my-1 flex h-9 w-9 items-center justify-center rounded-lg text-primary transition-colors hover:bg-sidebar-accent/70"
              aria-label="Ask Sherpa (agent)"
            >
              <span className="pointer-events-none absolute inset-1 rounded-md bg-primary/10 blur-[6px]" aria-hidden />
              <Sparkles className="relative h-[17px] w-[17px]" strokeWidth={1.75} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>Ask Sherpa · agent</TooltipContent>
        </Tooltip>

        {bottomItems.map((r) => (
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
