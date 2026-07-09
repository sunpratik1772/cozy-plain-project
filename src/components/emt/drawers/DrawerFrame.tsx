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
  children: ReactNode;
}

export function DrawerFrame({ open, onOpenChange, title, description, children }: DrawerFrameProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto border-border bg-card sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle className="tracking-tight">{title}</SheetTitle>
          <SheetDescription className="text-muted-foreground">{description}</SheetDescription>
        </SheetHeader>
        <div className="mt-5 space-y-3">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
