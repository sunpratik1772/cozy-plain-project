import { useEffect, useState, type ReactNode } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EmtSidebar } from "./Sidebar";
import { EmtTopbar } from "./Topbar";
import { CommandPalette } from "./CommandPalette";
import { DataSourcesDrawer, NodesDrawer, SettingsDrawer, SherpaChatDrawer } from "./drawers";

export type EmtDrawer = "sources" | "nodes" | "settings" | null;

export function AppShell({ children }: { children: ReactNode }) {
  const [drawer, setDrawer] = useState<EmtDrawer>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openDrawer = (d: EmtDrawer) => {
    setMobileNavOpen(false);
    setDrawer(d);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <EmtSidebar onOpenDrawer={openDrawer} className="hidden lg:flex" />

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-56 border-sidebar-border bg-sidebar p-0">
          <EmtSidebar onOpenDrawer={openDrawer} className="w-full border-r-0" />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <EmtTopbar onSearch={() => setPaletteOpen(true)} onMobileMenu={() => setMobileNavOpen(true)} />
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</main>
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} onOpenDrawer={openDrawer} />

      <DataSourcesDrawer open={drawer === "sources"} onOpenChange={(o) => !o && setDrawer(null)} />
      <NodesDrawer open={drawer === "nodes"} onOpenChange={(o) => !o && setDrawer(null)} />
      <SettingsDrawer open={drawer === "settings"} onOpenChange={(o) => !o && setDrawer(null)} />
      <SherpaChatDrawer />
    </div>
  );
}
