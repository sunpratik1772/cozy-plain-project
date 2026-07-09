import { useState } from "react";
import { ArrowUp, Sparkle } from "lucide-react";
import { motion } from "framer-motion";
import { useSherpa } from "@/contexts/SherpaContext";

export function SherpaPromptBar() {
  const [value, setValue] = useState("");
  const { openChat } = useSherpa();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    openChat(value);
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
    </motion.div>
  );
}
