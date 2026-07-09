import { useState } from "react";
import { ArrowUp } from "lucide-react";

const ChatInput = () => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo only — no backend wired.
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-gradient-border bg-card rounded-xl">
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Demo only — not wired to a real AI"
          maxLength={500}
          aria-label="Chat message (demo only)"
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!input.trim()}
          aria-label="Send message (demo only)"
          className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
