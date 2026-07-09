import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  Building2,
  Database,
  FileSpreadsheet,
  FileText,
  Plug,
  RefreshCw,
  UserRound,
  Users2,
  Wand2,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useWorkspace } from "@/contexts/WorkspaceContext";

interface WizardOption {
  id: string;
  title: string;
  description: string;
  icon: typeof Database;
}

interface WizardStep {
  headline: (name: string) => ReactNode;
  subtitle: string;
  helper: string;
  multi: boolean;
  options: WizardOption[];
}

const STEPS: WizardStep[] = [
  {
    headline: () => "What are you building in dbSherpa?",
    subtitle: "A quick setup so dbSherpa starts with the sources and workflow style you actually need.",
    helper: "Select all that apply.",
    multi: true,
    options: [
      { id: "sync", title: "Sync & join data sources", description: "Keep Postgres, CSVs, and APIs in lockstep", icon: Database },
      { id: "monitor", title: "Monitor & alert on anomalies", description: "Catch spikes and failures before they cascade", icon: AlertTriangle },
      { id: "report", title: "Automate reporting", description: "Executive summaries and scheduled digests", icon: FileText },
      { id: "custom", title: "Build something custom", description: "Start from a blank canvas and go from there", icon: Wand2 },
    ],
  },
  {
    headline: () => "Which data source should dbSherpa connect first?",
    subtitle: "Start with the source that matters most — you can connect more any time from Data Sources.",
    helper: "Select all that apply.",
    multi: true,
    options: [
      { id: "postgres-main", title: "Postgres · production", description: "14 tables scoped", icon: Database },
      { id: "orders-csv", title: "orders.csv", description: "12,402 rows · refreshed daily", icon: FileSpreadsheet },
      { id: "atlassian-mcp", title: "Atlassian MCP", description: "Jira and Confluence", icon: Plug },
      { id: "github-mcp", title: "GitHub MCP", description: "Repositories, issues and commits", icon: Plug },
    ],
  },
  {
    headline: () => "How will you use dbSherpa day-to-day?",
    subtitle: "Choose the operating model that best reflects how your team works.",
    helper: "Choose one.",
    multi: false,
    options: [
      { id: "solo", title: "I build workflows solo", description: "I design and run automations for my own projects", icon: UserRound },
      { id: "shared", title: "Shared team workspace", description: "Teammates collaborate on shared workflows and reviews", icon: Users2 },
      { id: "central", title: "Central automation platform", description: "One team manages automations for many stakeholders", icon: Building2 },
    ],
  },
  {
    headline: () => "Which workflows should dbSherpa run first?",
    subtitle: "Pick the workflows you want live first — we'll surface these at the top of your dashboard.",
    helper: "Select all that apply.",
    multi: true,
    options: [
      { id: "leads-pipeline", title: "Lead scoring pipeline", description: "Score inbound leads from Postgres + orders.csv", icon: Workflow },
      { id: "daily-sync", title: "Daily data sync", description: "Merge CSV and FX-rate data every morning", icon: RefreshCw },
      { id: "report-generator", title: "Weekly exec report", description: "Aggregate orders into an executive summary", icon: FileText },
      { id: "orders-monitor", title: "Orders anomaly monitor", description: "Flag order-volume spikes against a rolling baseline", icon: AlertTriangle },
    ],
  },
];

export function OnboardingWizard() {
  const { settings, completeOnboarding } = useWorkspace();
  const [open, setOpen] = useState(!settings.onboarded);
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, Set<string>>>({});

  const finish = () => {
    completeOnboarding();
    setOpen(false);
  };

  const current = STEPS[step];
  const selected = selections[step] ?? new Set<string>();
  const isLast = step === STEPS.length - 1;

  const toggleOption = (id: string) => {
    setSelections((prev) => {
      const next = new Set(prev[step] ?? []);
      if (current.multi) {
        if (next.has(id)) next.delete(id);
        else next.add(id);
      } else {
        next.clear();
        next.add(id);
      }
      return { ...prev, [step]: next };
    });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && finish()}>
      <DialogContent className="gap-0 border-border bg-card p-0 sm:max-w-lg">
        <div className="flex items-center justify-center gap-1.5 pt-6">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === step ? "w-6 bg-primary" : "w-1.5 bg-border",
              )}
            />
          ))}
        </div>

        <div className="px-6 pb-2 pt-5">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
            {settings.displayName}&apos;s workspace
          </p>
          <h2 className="text-xl font-bold tracking-tight text-foreground">{current.headline(settings.displayName)}</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">{current.subtitle}</p>
          <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">{current.helper}</p>
        </div>

        <div className="grid grid-cols-1 gap-2 px-6 pb-6 sm:grid-cols-2">
          {current.options.map((opt) => {
            const isSelected = selected.has(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggleOption(opt.id)}
                className={cn(
                  "flex items-start gap-3 rounded-md border p-3 text-left transition-colors",
                  isSelected ? "border-ring/60 bg-surface" : "border-border hover:border-ring/30 hover:bg-surface/50",
                )}
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
                  <opt.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{opt.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{opt.description}</p>
                </div>
                <span
                  className={cn(
                    "mt-1 h-3.5 w-3.5 shrink-0 rounded-full border",
                    isSelected ? "border-primary bg-primary" : "border-border",
                  )}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border px-6 py-4">
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={finish}>
            Dismiss
          </Button>
          <Button
            size="sm"
            className="text-xs font-semibold"
            onClick={() => (isLast ? finish() : setStep((s) => s + 1))}
          >
            {isLast ? "Finish" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
