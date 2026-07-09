import { Database, FileSpreadsheet, Plug } from "lucide-react";
import { SOURCES } from "@/data/emt";
import { StatusPill } from "../StatusPill";

const ICONS = { database: Database, file: FileSpreadsheet, mcp: Plug };

export function SourcesStrip({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="emt-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight">Connected sources</h2>
        <button onClick={onOpen} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
          Manage
        </button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {SOURCES.map((s) => {
          const Icon = ICONS[s.type as keyof typeof ICONS] ?? Database;
          return (
            <div key={s.id} className="flex items-center gap-2.5 rounded-md border border-border bg-surface/60 p-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-card">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium">{s.name}</p>
                <p className="truncate text-[11px] text-muted-foreground">{s.detail}</p>
              </div>
              <StatusPill status={s.status} label="" className="border-0 bg-transparent px-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
