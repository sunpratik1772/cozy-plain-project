import { Copy, KeyRound, Plug, Trash2, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusPill } from "../StatusPill";
import { DrawerFrame, type DrawerProps } from "./DrawerFrame";

export function SettingsDrawer(props: DrawerProps) {
  return (
    <DrawerFrame {...props} title="Settings" description="Workspace profile, keys and integrations.">
      <section className="emt-card p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <UserRound className="h-4 w-4 text-muted-foreground" /> Profile
        </div>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="emt-name" className="text-xs">Display name</Label>
            <Input id="emt-name" defaultValue="Pratik" className="h-8 bg-background text-sm" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="emt-workspace" className="text-xs">Workspace</Label>
            <Input id="emt-workspace" defaultValue="emt-sun" className="h-8 bg-background font-mono text-sm" />
          </div>
        </div>
      </section>

      <section className="emt-card p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <KeyRound className="h-4 w-4 text-muted-foreground" /> API key
        </div>
        <div className="flex items-center gap-2">
          <code className="flex-1 truncate rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-xs text-muted-foreground">
            emt_sk_••••••••••••4f2a
          </code>
          <Button variant="outline" size="icon" className="h-8 w-8 shrink-0" aria-label="Copy API key">
            <Copy className="h-3.5 w-3.5" />
          </Button>
        </div>
      </section>

      <section className="emt-card p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Plug className="h-4 w-4 text-muted-foreground" /> MCP integrations
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-sm">Atlassian</span>
            <StatusPill status="partial" label="Needs auth" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">GitHub</span>
            <StatusPill status="off" label="Not set" />
          </div>
        </div>
      </section>

      <section className="emt-card border-destructive/30 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-destructive">
          <Trash2 className="h-4 w-4" /> Danger zone
        </div>
        <p className="mb-3 text-xs text-muted-foreground">Permanently delete this workspace and all workflows.</p>
        <Button variant="destructive" size="sm" className="h-8 text-xs">Delete workspace</Button>
      </section>
    </DrawerFrame>
  );
}
