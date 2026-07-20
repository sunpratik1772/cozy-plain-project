import { Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandMark({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Sun className="h-4 w-4" strokeWidth={2.4} />
      </div>
      {!compact && (
        <span className="text-sm font-bold tracking-tight text-foreground">
          dbSherpa Studio
        </span>
      )}
    </div>
  );
}
