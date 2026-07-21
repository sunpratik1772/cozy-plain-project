import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function BrandMark({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)} aria-label="Sherpa Studio home">
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground">
        <span className="text-[13px] font-bold leading-none text-background">S</span>
      </div>
      {!compact && (
        <>
          <span className="text-base font-semibold tracking-tight text-foreground">Sherpa</span>
          <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground/70">studio</span>
        </>
      )}
    </Link>
  );
}
