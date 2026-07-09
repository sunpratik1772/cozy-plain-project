import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUp, Pencil, Sparkle, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useSherpa, type SherpaMessage } from "@/contexts/SherpaContext";
import { useRun } from "@/contexts/RunContext";
import { useTypewriter } from "@/hooks/use-typewriter";
import type { ClarificationOption } from "@/lib/sherpa";

const SUGGESTIONS = [
  "Sync leads from Postgres nightly",
  "Alert me when orders spike",
  "Build a weekly exec report",
];

const SLASH_COMMANDS = [
  { cmd: "run" as const, hint: "Run the workflow" },
  { cmd: "improve" as const, hint: "Suggest an improvement" },
  { cmd: "follow-up" as const, hint: "Ask a follow-up" },
];

function AssistantText({ text, animate, onDone }: { text: string; animate: boolean; onDone: () => void }) {
  const { shown, done } = useTypewriter(text, animate);

  useEffect(() => {
    if (animate && done) onDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, animate]);

  return (
    <p>
      {shown}
      {animate && !done && <span className="ml-0.5 inline-block h-3 w-1 animate-pulse bg-current align-middle" />}
    </p>
  );
}

function ClarificationBlock({
  clarification,
  onAnswer,
}: {
  clarification: NonNullable<SherpaMessage["clarification"]>;
  onAnswer: (option: ClarificationOption) => void;
}) {
  const { question, options, answeredKey } = clarification;

  return (
    <div className="mt-2 rounded-md border border-border bg-background p-2.5">
      <p className="mb-2 text-xs font-medium text-foreground">{question}</p>
      <div className="space-y-1">
        {options.map((opt) => {
          const selected = answeredKey === opt.key;
          const disabled = Boolean(answeredKey);
          return (
            <button
              key={opt.key}
              disabled={disabled}
              onClick={() => onAnswer(opt)}
              className={cn(
                "flex w-full items-start gap-2 rounded-md border px-2 py-1.5 text-left text-xs transition-colors",
                selected
                  ? "border-ring/60 bg-surface text-foreground"
                  : disabled
                    ? "border-border/60 text-muted-foreground/50"
                    : "border-border text-muted-foreground hover:border-ring/40 hover:text-foreground",
              )}
            >
              <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded border border-current text-[10px] font-semibold">
                {opt.key}
              </span>
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SherpaChatDrawer() {
  const { open, closeChat, messages, thinking, editing, send, answerClarification, runSlashCommand } = useSherpa();
  const { startRun } = useRun();
  const [value, setValue] = useState("");
  const [animatedIds, setAnimatedIds] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const markAnimated = (id: string) => setAnimatedIds((prev) => new Set(prev).add(id));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    if (trimmed === "/run") runSlashCommand("run", () => editing && startRun(editing.name));
    else if (trimmed === "/improve") runSlashCommand("improve");
    else if (trimmed === "/follow-up") runSlashCommand("follow-up");
    else send(trimmed);

    setValue("");
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && closeChat()}>
      <SheetContent className="flex h-full w-full flex-col gap-0 border-border bg-card p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-4 py-3 text-left">
          <SheetTitle className="flex items-center gap-2 text-sm tracking-tight">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            Ask Sherpa
          </SheetTitle>
        </SheetHeader>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {messages.map((m) => (
            <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-surface text-foreground",
                )}
              >
                {m.role === "assistant" ? (
                  <AssistantText text={m.text} animate={!animatedIds.has(m.id)} onDone={() => markAnimated(m.id)} />
                ) : (
                  <p>{m.text}</p>
                )}

                {m.clarification && (
                  <ClarificationBlock
                    clarification={m.clarification}
                    onAnswer={(opt) => answerClarification(m.id, opt)}
                  />
                )}

                {m.action && (
                  <button
                    onClick={() => {
                      closeChat();
                      navigate(m.action!.to);
                    }}
                    className="mt-2 inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground transition-colors hover:border-ring/40"
                  >
                    {m.action.label}
                  </button>
                )}
              </div>
            </div>
          ))}

          {thinking && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-lg border border-border bg-surface px-3 py-2.5">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50" />
              </div>
            </div>
          )}

          {messages.length <= 1 && !thinking && (
            <div className="flex flex-wrap gap-2 pt-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-ring/40 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {editing && (
          <div className="flex items-center gap-1.5 border-t border-border bg-surface/60 px-4 py-1.5 text-[11px] text-muted-foreground">
            <Pencil className="h-3 w-3" />
            Editing <span className="font-medium text-foreground">"{editing.name}"</span> — {editing.nodeCount} nodes
          </div>
        )}

        {editing && !thinking && (
          <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-2">
            {SLASH_COMMANDS.map((s) => (
              <button
                key={s.cmd}
                onClick={() => {
                  if (s.cmd === "run") runSlashCommand("run", () => startRun(editing.name));
                  else runSlashCommand(s.cmd);
                }}
                className="flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-ring/40 hover:text-foreground"
                title={s.hint}
              >
                <span className="font-mono text-foreground/80">/{s.cmd}</span>
                {s.hint}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={submit} className="border-t border-border p-3">
          <div className="flex items-center gap-2">
            <Sparkle className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Describe a workflow, ask a question, or type / for commands…"
              className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
              aria-label="Message Sherpa"
            />
            <button
              type="submit"
              disabled={!value.trim()}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity disabled:opacity-30"
              aria-label="Send message"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1.5 pl-6 text-[10px] text-muted-foreground/70">Enter to send · type / for commands</p>
        </form>
      </SheetContent>
    </Sheet>
  );
}
