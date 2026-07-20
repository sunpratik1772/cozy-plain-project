import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Laptop, KeyRound, LogOut, Moon, RefreshCw, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useAuth } from "@/contexts/AuthContext";

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
  { value: "blue", label: "Blue", icon: null },
] as const;

export function ProfileMenu() {
  const { settings, regenerateApiKey } = useWorkspace();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [apiKeyOpen, setApiKeyOpen] = useState(false);

  const copyKey = () => {
    navigator.clipboard?.writeText(settings.apiKey);
    toast.success("API key copied to clipboard");
  };

  const masked = `${settings.apiKey.slice(0, 17)}••••••••${settings.apiKey.slice(-4)}`;
  const initial = settings.displayName.trim().charAt(0).toUpperCase() || "P";

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out");
      navigate("/login");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign out failed");
    }
  };

  return (
    <>
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
            <p className="truncate text-xs text-muted-foreground">{user?.email ?? `${settings.workspaceName} workspace`}</p>
          </div>

          <div className="border-b border-border p-3">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Theme</p>
            <div className="grid grid-cols-2 gap-1.5">
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
                  {opt.icon ? (
                    <opt.icon className="h-3.5 w-3.5" />
                  ) : (
                    <span className="h-3.5 w-3.5 rounded-full bg-[hsl(234_60%_63%)]" aria-hidden />
                  )}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-1.5">
            <button
              onClick={() => navigate("/settings")}
              className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              Settings
            </button>
            <button
              onClick={() => setApiKeyOpen(true)}
              className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
            >
              <KeyRound className="h-4 w-4 text-muted-foreground" />
              Developer &amp; API keys
            </button>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </PopoverContent>
      </Popover>

      <Dialog open={apiKeyOpen} onOpenChange={setApiKeyOpen}>
        <DialogContent className="bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-muted-foreground" /> Developer &amp; API keys
            </DialogTitle>
            <DialogDescription>
              Use this key to authenticate scripts and custom integrations with the dbSherpa Studio API.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <code className="flex-1 truncate rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-xs text-muted-foreground">
              {masked}
            </code>
            <Button variant="outline" size="icon" className="h-8 w-8 shrink-0" aria-label="Copy API key" onClick={copyKey}>
              <Copy className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0"
              aria-label="Regenerate API key"
              onClick={() => {
                regenerateApiKey();
                toast.success("New API key generated");
              }}
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
          <p className="text-xs text-warning">
            Never commit this key to public source control or share it with third parties. Regenerate it if you suspect it has been compromised.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
