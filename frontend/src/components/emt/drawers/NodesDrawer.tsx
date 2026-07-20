import { NODE_CATALOG } from "@/data/emt";
import { DrawerFrame, type DrawerProps } from "./DrawerFrame";

export function NodesDrawer(props: DrawerProps) {
  const categories = [...new Set(NODE_CATALOG.map((n) => n.category))];

  return (
    <DrawerFrame {...props} title="Node Catalog" description="Building blocks available in the studio.">
      {categories.map((cat) => (
        <div key={cat}>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">{cat}</p>
          <div className="space-y-2">
            {NODE_CATALOG.filter((n) => n.category === cat).map((n) => (
              <div key={n.id} className="emt-card emt-card-hover flex items-center gap-3 p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
                  <n.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{n.label}</p>
                  <p className="truncate text-xs text-muted-foreground">{n.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </DrawerFrame>
  );
}
