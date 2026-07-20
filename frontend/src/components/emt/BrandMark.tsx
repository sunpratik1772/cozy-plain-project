import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function BrandMark({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)} aria-label="Sherpa Studio home">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground">
        <span className="font-serif text-base italic text-background">s</span>
      </div>
      {!compact && (
        <>
          <span className="font-serif text-lg italic tracking-tight text-foreground">sherpa</span>
          <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground/70">studio</span>
        </>
      )}
    </Link>
  );
}
