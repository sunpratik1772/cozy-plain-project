import { useEffect, useState } from "react";
import { ArrowUp, Loader2, Sparkles, X } from "lucide-react";
import { useStudioStore } from "@/store/studioStore";
import { runSherpaSend, stopSherpaStream } from "@/lib/sherpaEngine";
import { cn } from "@/lib/utils";

const suggestions = [
  "Add a de-duplication step after CSV parse",
  "Send failures to Slack",
  "Schedule this every weekday at 9am",
];

/**
 * Floating agent bar embedded inside the Studio canvas (bottom-center).
 * Sherpa lives ON the canvas — not as a separate panel/tab.
 */
export function CanvasSherpaBar() {
  const streamActive = useStudioStore((s) => s.copilotStreamActive);
  const activityMode = useStudioStore((s) => s.copilotActivityMode);
  const messages = useStudioStore((s) => s.copilotMessages);
  const setRightPanelMode = useStudioStore((s) => s.setRightPanelMode);
  const [value, setValue] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (streamActive) setExpanded(true);
  }, [streamActive]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || streamActive) return;
    setValue("");
    setExpanded(true);
    setRightPanelMode("sherpa");
    runSherpaSend(trimmed);
  };

  const submitSuggestion = (text: string) => {
    if (streamActive) return;
    setExpanded(true);
    setRightPanelMode("sherpa");
    runSherpaSend(text);
  };

  const hasMessages = messages.length > 0;
  const statusLabel: Record<string, string> = {
    thinking: "Sherpa is thinking",
    planning: "Sherpa is planning the workflow",
    clarifying: "Sherpa needs a bit more info",
    answering: "Sherpa is working on it",
    generating: "Sherpa is generating nodes",
    loading: "Sherpa is loading context",
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center px-4">
      <div
        className={cn(
          "pointer-events-auto flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-border bg-card/95 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] transition-all duration-300",
          expanded ? "opacity-100" : "opacity-95",
        )}
      >
        {/* Status strip — only visible while an agent action is in-flight */}
        {streamActive && activityMode && (
          <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-2 text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span className="flex-1 truncate">{statusLabel[activityMode] ?? "Sherpa is working"}…</span>
            <button
              type="button"
              onClick={stopSherpaStream}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Stop generation"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Input row */}
        <form onSubmit={submit} className="flex items-center gap-2 px-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setExpanded(true)}
            placeholder={hasMessages ? "Continue the conversation…" : "Ask Sherpa to build or modify this workflow…"}
            className="h-8 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            disabled={streamActive}
          />
          <button
            type="submit"
            disabled={!value.trim() || streamActive}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-85 disabled:opacity-30"
            aria-label="Send to Sherpa"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </form>

        {/* Suggestion chips — shown when expanded and no active conversation */}
        {expanded && !streamActive && !hasMessages && (
          <div className="flex flex-wrap gap-1.5 border-t border-border/70 bg-secondary/30 px-3 py-2.5">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => submitSuggestion(s)}
                className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
