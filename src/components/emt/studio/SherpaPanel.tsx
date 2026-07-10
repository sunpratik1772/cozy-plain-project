import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Loader2, Sparkles, Square, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStudioStore } from "@/store/studioStore";
import { runSherpaSend, resolveSherpaClarification, stopSherpaStream, runWorkflowOnCanvas } from "@/lib/sherpaEngine";
import type { ClarificationAnswer, ClarificationOption, PendingClarification, SherpaMessage, ThinkingStep } from "@/store/studioTypes";
import { useTypewriter } from "@/hooks/use-typewriter";

const SUGGESTIONS = [
  "Sync leads from Postgres nightly",
  "Alert me when orders spike",
  "Build a weekly exec report",
];

const GREETING: SherpaMessage = {
  id: "greeting",
  role: "assistant",
  content: "Hi, I'm Sherpa. Tell me what you want to automate and I'll scaffold a workflow for you on the canvas.",
  timestamp: Date.now(),
};

function ThinkingTimeline({ steps, open }: { steps: ThinkingStep[]; open: boolean }) {
  const [collapsed, setCollapsed] = useState(!open);
  useEffect(() => {
    if (open) setCollapsed(false);
  }, [open]);

  if (!steps.length) return null;

  return (
    <div className="mb-2 rounded-md border border-border bg-surface/60 p-2.5">
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex w-full items-center gap-1.5 text-xs font-medium text-muted-foreground"
      >
        <Sparkles className="h-3.5 w-3.5" />
        {collapsed ? "Thought process" : "Thinking process…"}
        <ChevronDown className={cn("ml-auto h-3.5 w-3.5 transition-transform", collapsed && "rotate-180")} />
      </button>
      {!collapsed && (
        <div className="mt-2 space-y-2">
          {steps.map((step, i) => (
            <ThinkingStepRow key={step.id} step={step} />
          ))}
        </div>
      )}
    </div>
  );
}

function ThinkingStepRow({ step }: { step: ThinkingStep }) {
  const { shown, done } = useTypewriter(step.text, !step.done);
  const isRunning = !step.done;
  return (
    <div className="flex items-start gap-2">
      {step.done ? (
        <Check className="mt-px h-3.5 w-3.5 shrink-0 text-success" />
      ) : (
        <Loader2 className="mt-px h-3.5 w-3.5 shrink-0 animate-spin text-muted-foreground" />
      )}
      <div className="min-w-0">
        <p className={cn("text-xs leading-relaxed", step.done ? "text-muted-foreground" : "text-foreground")}>
          {shown}
          {isRunning && !done && <span className="ml-0.5 inline-block h-3 w-1 animate-pulse bg-current align-middle" />}
        </p>
        {step.done && step.durationSec && (
          <p className="text-[10px] text-muted-foreground/60">Done in {step.durationSec}s</p>
        )}
      </div>
    </div>
  );
}

function ClarificationPanel({ pending }: { pending: PendingClarification }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const question = pending.questions[0];
  if (!question) return null;

  const toggle = (opt: ClarificationOption) => {
    if (question.allowMultiple) {
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(opt.id)) next.delete(opt.id);
        else next.add(opt.id);
        return next;
      });
    } else {
      setSelected(new Set([opt.id]));
    }
  };

  const submit = () => {
    if (!selected.size) return;
    const labels = question.options
      .filter((o) => selected.has(o.id))
      .map((o) => o.label);
    const answer: ClarificationAnswer = {
      questionId: question.id,
      question: question.question,
      kind: question.kind,
      selectionIds: [...selected],
      otherText: "",
      labels,
    };
    resolveSherpaClarification([answer]);
  };

  return (
    <div className="mt-2 rounded-md border border-ring/30 bg-surface p-2.5">
      <p className="mb-2 text-xs font-medium text-foreground">{question.question}</p>
      <div className="space-y-1">
        {question.options.map((opt) => {
          const isSelected = selected.has(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt)}
              className={cn(
                "flex w-full items-start gap-2 rounded-md border px-2 py-1.5 text-left text-xs transition-colors",
                isSelected
                  ? "border-ring/60 bg-background text-foreground"
                  : "border-border text-muted-foreground hover:border-ring/40 hover:text-foreground",
              )}
            >
              <span className={cn(
                "mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] font-semibold",
                isSelected ? "border-primary bg-primary text-primary-foreground" : "border-current",
              )}>
                {isSelected && <Check className="h-2.5 w-2.5" />}
              </span>
              {opt.label}
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex justify-end gap-1.5">
        <button
          onClick={() => useStudioStore.getState().setCopilotPendingClarification(null)}
          className="rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground"
        >
          Skip
        </button>
        <button
          onClick={submit}
          disabled={!selected.size}
          className="rounded-md bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground disabled:opacity-30"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: SherpaMessage }) {
  const isUser = msg.role === "user";
  const [animated, setAnimated] = useState(!msg.streaming);
  const { shown, done } = useTypewriter(msg.content, msg.streaming ?? false);

  useEffect(() => {
    if (msg.streaming && done) setAnimated(true);
  }, [done, msg.streaming]);

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-lg bg-primary px-3 py-2 text-sm leading-relaxed text-primary-foreground">
          <p>{msg.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] rounded-lg border border-border bg-surface px-3 py-2 text-sm leading-relaxed text-foreground">
        {msg.steps && msg.steps.length > 0 && <ThinkingTimeline steps={msg.steps} open={false} />}
        <p className="whitespace-pre-wrap">
          {shown}
          {msg.streaming && !done && <span className="ml-0.5 inline-block h-3 w-1 animate-pulse bg-current align-middle" />}
        </p>
        {msg.summary && (
          <div className="mt-2 rounded-md border border-border bg-background p-2">
            <p className="text-xs font-semibold text-foreground">{msg.summary.title}</p>
            <ul className="mt-1 space-y-0.5">
              {msg.summary.bullets.map((b, i) => (
                <li key={i} className="text-[11px] text-muted-foreground">• {b}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function ActivityChip({ mode }: { mode: string | null }) {
  if (!mode) return null;
  const labels: Record<string, string> = {
    thinking: "Processing",
    planning: "Planning",
    clarifying: "Clarifying",
    answering: "Working on it",
    generating: "Generating",
    loading: "Loading",
  };
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-muted-foreground">
      <Loader2 className="h-3 w-3 animate-spin" />
      {labels[mode] ?? mode}
    </div>
  );
}

export function SherpaPanel() {
  const messages = useStudioStore((s) => s.copilotMessages);
  const streamActive = useStudioStore((s) => s.copilotStreamActive);
  const activityMode = useStudioStore((s) => s.copilotActivityMode);
  const pendingClarification = useStudioStore((s) => s.copilotPendingClarification);
  const thinkingSteps = useStudioStore((s) => s.copilotThinkingSteps);
  const thinkingOpen = useStudioStore((s) => s.copilotThinkingOpen);
  const harnessGenerating = useStudioStore((s) => s.copilotHarnessGenerating);
  const workflowCreated = useStudioStore((s) => s.copilotWorkflowCreated);
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const allMessages = messages.length ? messages : [GREETING];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streamActive, pendingClarification, thinkingSteps]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    setValue("");
    runSherpaSend(trimmed);
  };

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
        {allMessages.map((m) => (
          <MessageBubble key={m.id} msg={m} />
        ))}

        {pendingClarification && <ClarificationPanel pending={pendingClarification} />}

        {streamActive && thinkingSteps.length > 0 && (
          <ThinkingTimeline steps={thinkingSteps} open={thinkingOpen} />
        )}

        {streamActive && activityMode && !thinkingSteps.length && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-lg border border-border bg-surface px-3 py-2.5">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50" />
            </div>
          </div>
        )}

        {allMessages.length <= 1 && !streamActive && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => runSherpaSend(s)}
                className="rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-ring/40 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {workflowCreated && !streamActive && (
        <div className="border-t border-border bg-success/5 px-3 py-1.5">
          <button
            onClick={() => runWorkflowOnCanvas()}
            className="flex w-full items-center gap-1.5 text-[11px] font-medium text-success"
          >
            <Sparkles className="h-3 w-3" />
            Run "{workflowCreated.name}" now
          </button>
        </div>
      )}

      {streamActive && (
        <div className="flex items-center justify-between border-t border-border px-3 py-1.5">
          <ActivityChip mode={activityMode} />
          <button
            onClick={stopSherpaStream}
            className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground"
          >
            <Square className="h-2.5 w-2.5" /> Stop
          </button>
        </div>
      )}

      <form onSubmit={submit} className="border-t border-border p-2.5">
        <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5 focus-within:border-ring/50">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask Sherpa to build, explain, or run…"
            className="h-7 flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground/70"
            aria-label="Message Sherpa"
          />
          <button
            type="submit"
            disabled={!value.trim() || streamActive}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground transition-opacity disabled:opacity-30"
            aria-label="Send message"
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
        <p className="mt-1 pl-6 text-[10px] text-muted-foreground/60">Enter to send · Sherpa thinks, streams, and generates on canvas</p>
      </form>
    </div>
  );
}
