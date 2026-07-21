import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  CalendarClock,
  GitGraph,
  LayoutGrid,
  LayoutTemplate,
  Puzzle,
  Settings,
  Sparkles,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ProfileMenu } from "./ProfileMenu";
import type { EmtDrawer } from "./AppShell";
import { useStudioStore } from "@/store/studioStore";

interface SidebarProps {
  onOpenDrawer: (d: EmtDrawer) => void;
  className?: string;
}

const primary = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutGrid },
  { label: "Studio", to: "/studio", icon: Workflow },
  { label: "Templates", to: "/templates", icon: LayoutTemplate },
  { label: "Automations", to: "/automations", icon: CalendarClock },
];

const secondary = [
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
      "group relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
      active
        ? "bg-sidebar-accent text-sidebar-accent-foreground"
        : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
    );

  return (
    <aside
      className={cn(
        "flex h-full w-[60px] shrink-0 flex-col items-center border-r border-sidebar-border bg-sidebar py-3",
        className,
      )}
    >
      {/* Brand */}
      <Link to="/" className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-foreground" aria-label="Home">
        <span className="font-serif text-lg italic text-background">s</span>
      </Link>

      <nav className="flex flex-1 flex-col items-center gap-1.5">
        {primary.map((r) => (
          <Tooltip key={r.to} delayDuration={150}>
            <TooltipTrigger asChild>
              <Link to={r.to} className={railBtn(isActive(r.to))} aria-label={r.label}>
                <r.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                {isActive(r.to) && (
                  <span className="absolute -left-[13px] top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{r.label}</TooltipContent>
          </Tooltip>
        ))}

        {/* Ask Sherpa — agent lives in the rail */}
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <button
              onClick={() => { clearCopilot(); navigate("/studio"); }}
              className="my-1 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/40 bg-primary/15 text-primary transition-colors hover:bg-primary/25"
              aria-label="Ask Sherpa (agent)"
            >
              <Sparkles className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">Ask Sherpa · agent</TooltipContent>
        </Tooltip>

        {secondary.map((r) => (
          <Tooltip key={r.to} delayDuration={150}>
            <TooltipTrigger asChild>
              <Link to={r.to} className={railBtn(isActive(r.to))} aria-label={r.label}>
                <r.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                {isActive(r.to) && (
                  <span className="absolute -left-[13px] top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{r.label}</TooltipContent>
          </Tooltip>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-1.5">
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <Link to="/settings" className={railBtn(isActive("/settings"))} aria-label="Settings">
              <Settings className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
        <ProfileMenu compact />
      </div>
    </aside>
  );
}
