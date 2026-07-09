import { useEffect, useState } from "react";
import { Copy, KeyRound, Plug, RefreshCw, Trash2, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { StatusPill } from "../StatusPill";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { DrawerFrame, type DrawerProps } from "./DrawerFrame";

export function SettingsDrawer(props: DrawerProps) {
  const { settings, updateSettings, regenerateApiKey, toggleMcp, resetWorkspace } = useWorkspace();
  const [displayName, setDisplayName] = useState(settings.displayName);
  const [workspaceName, setWorkspaceName] = useState(settings.workspaceName);

  useEffect(() => {
    setDisplayName(settings.displayName);
    setWorkspaceName(settings.workspaceName);
  }, [settings.displayName, settings.workspaceName]);

  const saveProfile = () => {
    updateSettings({ displayName: displayName.trim() || settings.displayName, workspaceName: workspaceName.trim() || settings.workspaceName });
    toast.success("Profile saved");
  };

  const copyKey = () => {
    navigator.clipboard?.writeText(settings.apiKey);
    toast.success("API key copied to clipboard");
  };

  const masked = `${settings.apiKey.slice(0, 11)}••••••••${settings.apiKey.slice(-4)}`;

  return (
    <DrawerFrame {...props} title="Settings" description="Workspace profile, keys and integrations.">
      <section className="emt-card p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <UserRound className="h-4 w-4 text-muted-foreground" /> Profile
        </div>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="emt-name" className="text-xs">Display name</Label>
            <Input id="emt-name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="h-8 bg-background text-sm" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="emt-workspace" className="text-xs">Workspace</Label>
            <Input id="emt-workspace" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} className="h-8 bg-background font-mono text-sm" />
          </div>
          <Button
            size="sm"
            className="h-8 text-xs"
            onClick={saveProfile}
            disabled={displayName === settings.displayName && workspaceName === settings.workspaceName}
          >
            Save changes
          </Button>
        </div>
      </section>

      <section className="emt-card p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <KeyRound className="h-4 w-4 text-muted-foreground" /> API key
        </div>
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
      </section>

      <section className="emt-card p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Plug className="h-4 w-4 text-muted-foreground" /> MCP integrations
        </div>
        <div className="space-y-2.5">
          {settings.mcp.map((m) => (
            <div key={m.name} className="flex items-center justify-between">
              <span className="text-sm">{m.name}</span>
              <button
                onClick={() => {
                  toggleMcp(m.name);
                  toast(m.status === "off" ? `${m.name} connected` : `${m.name} disconnected`);
                }}
              >
                <StatusPill
                  status={m.status}
                  label={m.status === "connected" ? "Connected" : m.status === "partial" ? "Needs auth" : "Not set"}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="emt-card border-destructive/30 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-destructive">
          <Trash2 className="h-4 w-4" /> Danger zone
        </div>
        <p className="mb-3 text-xs text-muted-foreground">Permanently delete this workspace and all workflows.</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="h-8 text-xs">Delete workspace</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-card">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this workspace?</AlertDialogTitle>
              <AlertDialogDescription>
                This removes every automation and data source and resets your settings. Saved workflows in Studio are not affected. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  resetWorkspace();
                  toast.success("Workspace reset");
                }}
              >
                Delete workspace
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </DrawerFrame>
  );
}
