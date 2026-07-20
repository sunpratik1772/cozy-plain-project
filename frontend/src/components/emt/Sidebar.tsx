import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Settings,
  Sparkles,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";
import { ProfileMenu } from "./ProfileMenu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { EmtDrawer } from "./AppShell";
import { useStudioStore } from "@/store/studioStore";

interface SidebarProps {
  onOpenDrawer: (d: EmtDrawer) => void;
  className?: string;
}

const routes = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutGrid },
  { label: "Studio", to: "/studio", icon: Workflow },
  { label: "Templates", to: "/templates", icon: LayoutTemplate },
  { label: "Skills", to: "/skills", icon: Puzzle },
  { label: "Codebase", to: "/codebase", icon: GitGraph },
  { label: "Docs", to: "/docs/overview", icon: BookOpen },
];

const workspaceItems: { label: string; to: string; drawerId: EmtDrawer; icon: typeof CalendarClock }[] = [
  { label: "Automations", to: "/automations", drawerId: "automations", icon: CalendarClock },
  { label: "Run History", to: "/runs", drawerId: "runs", icon: History },
];

const drawers: { label: string; id: EmtDrawer; icon: typeof Boxes }[] = [
  { label: "Data Sources", id: "sources", icon: Database },
  { label: "Nodes", id: "nodes", icon: Boxes },
];

export function EmtSidebar({ onOpenDrawer, className }: SidebarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const clearCopilot = useStudioStore((s) => s.clearCopilotMessages);

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  const iconBtn = (active: boolean) =>
    cn(
      "relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
      active
        ? "bg-sidebar-accent text-sidebar-accent-foreground"
        : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
    );

  return (
    <aside
      className={cn(
        "flex h-full w-16 shrink-0 flex-col items-center border-r border-sidebar-border bg-sidebar py-3",
        className,
      )}
    >
      <div className="mb-4">
        <BrandMark compact />
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => { clearCopilot(); navigate("/studio"); }}
            className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/15 text-primary transition-colors hover:bg-primary/25"
            aria-label="Ask Sherpa"
          >
            <Sparkles className="h-4.5 w-4.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">Ask Sherpa</TooltipContent>
      </Tooltip>

      <nav className="flex flex-1 flex-col items-center gap-1">
        {routes.map((r) => (
          <Tooltip key={r.to}>
            <TooltipTrigger asChild>
              <Link to={r.to} className={iconBtn(isActive(r.to))} aria-label={r.label}>
                <r.icon className="h-4.5 w-4.5" />
                {isActive(r.to) && (
                  <span className="absolute -left-3 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{r.label}</TooltipContent>
          </Tooltip>
        ))}

        <div className="my-2 h-px w-6 bg-sidebar-border" />

        {workspaceItems.map((w) => (
          <Tooltip key={w.label}>
            <TooltipTrigger asChild>
              <button onClick={() => onOpenDrawer(w.drawerId)} className={iconBtn(false)} aria-label={w.label}>
                <w.icon className="h-4.5 w-4.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">{w.label}</TooltipContent>
          </Tooltip>
        ))}
        {drawers.map((d) => (
          <Tooltip key={d.id}>
            <TooltipTrigger asChild>
              <button onClick={() => onOpenDrawer(d.id)} className={iconBtn(false)} aria-label={d.label}>
                <d.icon className="h-4.5 w-4.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">{d.label}</TooltipContent>
          </Tooltip>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/settings" className={iconBtn(isActive("/settings"))} aria-label="Settings">
              <Settings className="h-4.5 w-4.5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
        <div className="mt-1">
          <ProfileMenu compact />
        </div>
      </div>
    </aside>
  );
}
