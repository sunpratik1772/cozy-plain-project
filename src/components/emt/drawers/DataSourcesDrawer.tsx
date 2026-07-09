import { Database, FileSpreadsheet, Plug, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusPill } from "../StatusPill";
import { SOURCES } from "@/data/emt";
import { DrawerFrame, type DrawerProps } from "./DrawerFrame";

const ICONS = { database: Database, file: FileSpreadsheet, mcp: Plug };

export function DataSourcesDrawer(props: DrawerProps) {
  return (
    <DrawerFrame {...props} title="Data Sources" description="Connected databases, files and MCP servers.">
      {SOURCES.map((s) => {
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
            <StatusPill status={s.status} />
          </div>
        );
      })}
      <Button variant="outline" className="w-full gap-2 border-dashed text-sm">
        <Plus className="h-4 w-4" /> Add source
      </Button>
    </DrawerFrame>
  );
}
