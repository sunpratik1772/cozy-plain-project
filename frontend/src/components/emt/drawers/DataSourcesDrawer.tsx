import { useState } from "react";
import { Database, FileSpreadsheet, Plug, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StatusPill } from "../StatusPill";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { DrawerFrame, type DrawerProps } from "./DrawerFrame";

const ICONS = { database: Database, file: FileSpreadsheet, mcp: Plug };

export function DataSourcesDrawer(props: DrawerProps) {
  const { sources, addSource, toggleSourceStatus, removeSource } = useWorkspace();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("database");
  const [detail, setDetail] = useState("");

  const submit = () => {
    if (!name.trim()) return;
    addSource({ name: name.trim(), type, detail: detail.trim() || "Newly connected" });
    toast.success(`"${name.trim()}" source added`);
    setName("");
    setDetail("");
    setOpen(false);
  };

  return (
    <DrawerFrame {...props} title="Data Sources" description="Connected databases, files and MCP servers.">
      {sources.length === 0 && (
        <p className="px-1 py-2 text-center text-xs text-muted-foreground">No sources connected yet.</p>
      )}

      {sources.map((s) => {
        const Icon = ICONS[s.type as keyof typeof ICONS] ?? Database;
        return (
          <div key={s.id} className="emt-card emt-card-hover flex items-center gap-3 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{s.name}</p>
              <p className="truncate text-xs text-muted-foreground">{s.detail}</p>
            </div>
            <button
              onClick={() => {
                toggleSourceStatus(s.id);
                toast(s.status === "connected" ? `${s.name} disconnected` : `${s.name} connected`);
              }}
            >
              <StatusPill status={s.status} />
            </button>
            <button
              onClick={() => {
                removeSource(s.id);
                toast(`"${s.name}" removed`);
              }}
              className="text-muted-foreground transition-colors hover:text-destructive"
              aria-label={`Remove ${s.name}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full gap-2 border-dashed text-sm">
            <Plus className="h-4 w-4" /> Add source
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-card sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add data source</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Postgres · staging" className="h-8 bg-background text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-8 bg-background text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="file">File</SelectItem>
                  <SelectItem value="mcp">MCP server</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Detail</Label>
              <Input value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="Scoped tables, refresh cadence…" className="h-8 bg-background text-sm" />
            </div>
          </div>
          <DialogFooter>
            <Button size="sm" onClick={submit} disabled={!name.trim()}>Add source</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DrawerFrame>
  );
}
