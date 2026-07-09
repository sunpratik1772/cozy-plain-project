import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUp, Sparkle, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useSherpa } from "@/contexts/SherpaContext";

const SUGGESTIONS = [
  "Sync leads from Postgres nightly",
  "Alert me when orders spike",
  "Build a weekly exec report",
];

export function SherpaChatDrawer() {
  const { open, closeChat, messages, thinking, send } = useSherpa();
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    send(value);
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
                <p>{m.text}</p>
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

        <form onSubmit={submit} className="flex items-center gap-2 border-t border-border p-3">
          <Sparkle className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask Sherpa to build a workflow…"
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
        </form>
      </SheetContent>
    </Sheet>
  );
}
