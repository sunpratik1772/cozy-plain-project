import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUp, Sparkle } from "lucide-react";
import { motion } from "framer-motion";
import { useStudioStore } from "@/store/studioStore";
import { runSherpaSend } from "@/lib/sherpaEngine";

const SUGGESTIONS = [
  "Sync leads from Postgres nightly",
  "Alert me when orders spike",
  "Build a weekly exec report",
];

export function SherpaPromptBar() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const clearCopilot = useStudioStore((s) => s.clearCopilotMessages);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    clearCopilot();
    navigate("/studio");
    setTimeout(() => runSherpaSend(trimmed), 300);
    setValue("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <form onSubmit={submit} className="emt-card relative flex items-center gap-3 p-2 pl-4 transition-colors focus-within:border-ring/50">
        <Sparkle className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask Sherpa to build a workflow…"
          className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
          aria-label="Ask Sherpa to build a workflow"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity disabled:opacity-30"
          aria-label="Send prompt"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </form>
      <div className="mt-2 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => {
              clearCopilot();
              navigate("/studio");
              setTimeout(() => runSherpaSend(s), 300);
            }}
            className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-ring/40 hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
