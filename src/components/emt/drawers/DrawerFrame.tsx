import type { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DrawerFrameProps extends DrawerProps {
  title: string;
  description: string;
  headerAction?: ReactNode;
  children: ReactNode;
}

export function DrawerFrame({ open, onOpenChange, title, description, headerAction, children }: DrawerFrameProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto border-border bg-card sm:max-w-md">
        <SheetHeader className="flex-row items-start justify-between gap-2 text-left">
          <div>
            <SheetTitle className="tracking-tight">{title}</SheetTitle>
            <SheetDescription className="text-muted-foreground">{description}</SheetDescription>
          </div>
          {headerAction && <div className="mr-6 shrink-0">{headerAction}</div>}
        </SheetHeader>
        <div className="mt-5 space-y-3">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
