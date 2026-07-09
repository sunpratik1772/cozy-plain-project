import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { getSherpaReply, type SherpaReply } from "@/lib/sherpa";

export interface SherpaMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  action?: SherpaReply["action"];
}

interface SherpaContextValue {
  open: boolean;
  messages: SherpaMessage[];
  thinking: boolean;
  openChat: (initialPrompt?: string) => void;
  closeChat: () => void;
  send: (prompt: string) => void;
}

const SherpaContext = createContext<SherpaContextValue | null>(null);

const GREETING: SherpaMessage = {
  id: "greeting",
  role: "assistant",
  text: "Hi, I'm Sherpa. Tell me what you want to automate and I'll scaffold a workflow for it.",
};

export function SherpaProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<SherpaMessage[]>([GREETING]);
  const [thinking, setThinking] = useState(false);
  const counter = useRef(0);

  const send = useCallback((prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    counter.current += 1;
    const userId = `msg_${counter.current}`;
    setMessages((prev) => [...prev, { id: userId, role: "user", text: trimmed }]);
    setThinking(true);

    window.setTimeout(() => {
      counter.current += 1;
      const reply = getSherpaReply(trimmed);
      setMessages((prev) => [...prev, { id: `msg_${counter.current}`, role: "assistant", text: reply.text, action: reply.action }]);
      setThinking(false);
    }, 900 + Math.random() * 500);
  }, []);

  const openChat = useCallback(
    (initialPrompt?: string) => {
      setOpen(true);
      if (initialPrompt?.trim()) send(initialPrompt);
    },
    [send],
  );

  const closeChat = useCallback(() => setOpen(false), []);

  return (
    <SherpaContext.Provider value={{ open, messages, thinking, openChat, closeChat, send }}>
      {children}
    </SherpaContext.Provider>
  );
}

export function useSherpa() {
  const ctx = useContext(SherpaContext);
  if (!ctx) throw new Error("useSherpa must be used within a SherpaProvider");
  return ctx;
}
