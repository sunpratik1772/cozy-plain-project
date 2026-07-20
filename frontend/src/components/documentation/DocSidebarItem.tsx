import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/data/documentation";

interface DocSidebarItemProps {
  item: NavItem;
}

export function DocSidebarItem({ item }: DocSidebarItemProps) {
  const location = useLocation();
  const isActive = location.pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      to={item.href}
      className={cn(
        "relative flex items-center gap-3 pl-6 pr-3 py-2 text-sm transition-colors",
        isActive
          ? "text-foreground font-medium"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {/* Active indicator overlaying the continuous line */}
      {isActive && (
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-sidebar-primary" />
      )}
      <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-sidebar-primary")} />
      <span className="truncate">{item.title}</span>
      {item.isNew && (
        <span className="ml-auto text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-sidebar-primary/20 text-sidebar-primary">
          New
        </span>
      )}
    </Link>
  );
}
