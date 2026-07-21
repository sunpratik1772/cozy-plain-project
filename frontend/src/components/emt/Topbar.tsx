import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileMenu } from "./ProfileMenu";

interface TopbarProps {
  onSearch: () => void;
  onMobileMenu: () => void;
}

type Tab = { label: string; to: string };

const DASHBOARD_TABS: Tab[] = [
  { label: "Overview", to: "/dashboard" },
  { label: "Runs", to: "/runs" },
  { label: "Settings", to: "/settings" },
];

const STUDIO_TABS: Tab[] = [
  { label: "Build", to: "/studio" },
  { label: "Runs", to: "/runs" },
  { label: "Settings", to: "/settings" },
];

const PLAIN_TABS: Tab[] = [];

function resolveContext(pathname: string) {
  if (pathname.startsWith("/studio")) return { workspace: "Sales Team", project: "New workflow", tabs: STUDIO_TABS };
  if (pathname.startsWith("/templates")) return { workspace: "Library", project: "Templates", tabs: PLAIN_TABS };
  if (pathname.startsWith("/skills")) return { workspace: "Registry", project: "Skills", tabs: PLAIN_TABS };
  if (pathname.startsWith("/automations")) return { workspace: "Scheduler", project: "Automations", tabs: PLAIN_TABS };
  if (pathname.startsWith("/runs")) return { workspace: "Observatory", project: "Run history", tabs: PLAIN_TABS };
  if (pathname.startsWith("/codebase")) return { workspace: "Insight", project: "Codebase", tabs: PLAIN_TABS };
  if (pathname.startsWith("/settings")) return { workspace: "Workspace", project: "Settings", tabs: PLAIN_TABS };
  return { workspace: "Sales Team", project: "Overview", tabs: DASHBOARD_TABS };
}

export function EmtTopbar({ onMobileMenu }: TopbarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const ctx = resolveContext(pathname);

  const isTabActive = (to: string) => {
    if (to === "/dashboard") return pathname === "/dashboard" || pathname === "/";
    if (to === "/studio") return pathname === "/studio" || (pathname.startsWith("/studio/") && !pathname.endsWith("/runs") && !pathname.endsWith("/settings"));
    return pathname === to || pathname.startsWith(`${to}/`);
  };

  const workspaceInitial = ctx.workspace.charAt(0).toUpperCase();

  return (
    <header className="relative flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-3 md:px-5">
      <button
        onClick={onMobileMenu}
        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Breadcrumb picker (Plasma style: workspace avatar + static label + project ~) */}
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent text-[11px] font-semibold text-foreground">
          {workspaceInitial}
        </div>
        <span className="text-sm font-medium text-muted-foreground">{ctx.workspace}</span>
        <button className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold text-foreground transition-colors hover:bg-accent">
          {ctx.project}
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      <div className="ml-auto flex items-center gap-1">
        {/* Tabs (right-aligned Plasma style) */}
        {ctx.tabs.length > 0 && (
          <nav className="hidden items-center md:flex">
            {ctx.tabs.map((t) => (
              <button
                key={t.to}
                onClick={() => navigate(t.to)}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-[15px] font-medium transition-colors",
                  isTabActive(t.to)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
                {isTabActive(t.to) && (
                  <span className="absolute inset-x-3 -bottom-[15px] h-[2px] rounded-full bg-foreground" />
                )}
              </button>
            ))}
            <div className="mx-2 h-4 w-px bg-border" />
          </nav>
        )}

        <a
          href="/docs/overview"
          className="hidden h-8 items-center rounded-md px-3 text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
        >
          Help
        </a>
        <button
          className="hidden h-8 items-center rounded-md px-3 text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
          aria-label="Share"
        >
          Share
        </button>

        <div className="ml-1">
          <ProfileMenu compact />
        </div>
      </div>
    </header>
  );
}
