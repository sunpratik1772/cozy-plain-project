import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Boxes,
  CalendarClock,
  Database,
  History,
  LayoutGrid,
  Puzzle,
  Settings,
  Sparkles,
  Workflow,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { WORKFLOWS } from "@/data/emt";
import { useSherpa } from "@/contexts/SherpaContext";
import type { EmtDrawer } from "./AppShell";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenDrawer: (d: EmtDrawer) => void;
}

export function CommandPalette({ open, onOpenChange, onOpenDrawer }: CommandPaletteProps) {
  const navigate = useNavigate();
  const { openChat } = useSherpa();

  const run = (fn: () => void) => {
    onOpenChange(false);
    fn();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search workflows, pages, actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => run(() => navigate("/"))}>
            <LayoutGrid className="mr-2 h-4 w-4" /> Dashboard
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate("/studio"))}>
            <Workflow className="mr-2 h-4 w-4" /> Workflow Studio
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate("/docs"))}>
            <BookOpen className="mr-2 h-4 w-4" /> Docs
          </CommandItem>
          <CommandItem onSelect={() => run(() => openChat())}>
            <Sparkles className="mr-2 h-4 w-4" /> Ask Sherpa
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Workflows">
          {WORKFLOWS.map((w) => (
            <CommandItem key={w.id} onSelect={() => run(() => navigate("/studio"))}>
              <Workflow className="mr-2 h-4 w-4" />
              {w.name}
              <span className="ml-auto font-mono text-xs text-muted-foreground">{w.filename}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Workspace">
          <CommandItem onSelect={() => run(() => onOpenDrawer("automations"))}>
            <CalendarClock className="mr-2 h-4 w-4" /> Automations
          </CommandItem>
          <CommandItem onSelect={() => run(() => onOpenDrawer("sources"))}>
            <Database className="mr-2 h-4 w-4" /> Data Sources
          </CommandItem>
          <CommandItem onSelect={() => run(() => onOpenDrawer("runs"))}>
            <History className="mr-2 h-4 w-4" /> Run History
          </CommandItem>
          <CommandItem onSelect={() => run(() => onOpenDrawer("nodes"))}>
            <Boxes className="mr-2 h-4 w-4" /> Nodes
          </CommandItem>
          <CommandItem onSelect={() => run(() => onOpenDrawer("skills"))}>
            <Puzzle className="mr-2 h-4 w-4" /> Skills
          </CommandItem>
          <CommandItem onSelect={() => run(() => onOpenDrawer("settings"))}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
