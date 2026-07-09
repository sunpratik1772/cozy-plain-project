import { Laptop, KeyRound, LogOut, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import type { EmtDrawer } from "./AppShell";

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
] as const;

export function ProfileMenu({ onOpenDrawer }: { onOpenDrawer: (d: EmtDrawer) => void }) {
  const { settings } = useWorkspace();
  const { theme, setTheme } = useTheme();

  const initial = settings.displayName.trim().charAt(0).toUpperCase() || "P";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left transition-colors hover:bg-sidebar-accent/60">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-[11px] font-bold text-foreground">
            {initial}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-foreground">{settings.displayName}</p>
            <p className="truncate text-[11px] text-muted-foreground">Free plan</p>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" align="start" className="w-64 p-0">
        <div className="border-b border-border p-3">
          <p className="truncate text-sm font-semibold text-foreground">{settings.displayName}</p>
          <p className="truncate text-xs text-muted-foreground">{settings.workspaceName} workspace</p>
        </div>

        <div className="border-b border-border p-3">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Theme</p>
          <div className="grid grid-cols-3 gap-1.5">
            {THEME_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-md border px-1.5 py-2 text-[11px] font-medium transition-colors",
                  theme === opt.value
                    ? "border-ring/60 bg-surface text-foreground"
                    : "border-border text-muted-foreground hover:border-ring/30 hover:text-foreground",
                )}
              >
                <opt.icon className="h-3.5 w-3.5" />
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-1.5">
          <button
            onClick={() => onOpenDrawer("settings")}
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
          >
            <Settings className="h-4 w-4 text-muted-foreground" />
            Settings
          </button>
          <button
            onClick={() => onOpenDrawer("settings")}
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
          >
            <KeyRound className="h-4 w-4 text-muted-foreground" />
            Developer &amp; API keys
          </button>
          <button
            onClick={() => toast("Sign out is not wired up in this demo")}
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
