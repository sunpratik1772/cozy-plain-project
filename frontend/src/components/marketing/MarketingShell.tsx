import type { ReactNode } from "react";
import { MarketingNav } from "./MarketingNav";

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="c8-scope relative h-screen w-full overflow-hidden bg-background text-foreground">
      <MarketingNav />
      <main className="relative h-full w-full">{children}</main>
    </div>
  );
}
