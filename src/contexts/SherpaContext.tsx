import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import {
  getClarificationFollowup,
  getImproveSuggestion,
  getSherpaReply,
  type ClarificationOption,
  type SherpaReply,
  type SherpaWorkflowContext,
} from "@/lib/sherpa";

export interface SherpaMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  action?: SherpaReply["action"];
  clarification?: { question: string; options: ClarificationOption[]; answeredKey?: string };
}

interface SherpaContextValue {
  open: boolean;
  messages: SherpaMessage[];
  thinking: boolean;
  building: SherpaWorkflowContext | null;
  editing: SherpaWorkflowContext | null;
  openChat: (initialPrompt?: string) => void;
  closeChat: () => void;
  send: (prompt: string) => void;
  answerClarification: (messageId: string, option: ClarificationOption) => void;
  runSlashCommand: (cmd: "run" | "improve" | "follow-up", onRun?: () => void) => void;
}

const SherpaContext = createContext<SherpaContextValue | null>(null);

const GREETING: SherpaMessage = {
  id: "greeting",
  role: "assistant",
  text: "Hi, I'm Sherpa. Tell me what you want to automate and I'll scaffold a workflow for it.",
};

const SIMPLE_DELAY = () => 700 + Math.random() * 400;
const BUILD_DELAY = () => 2400 + Math.random() * 400;

export function SherpaProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<SherpaMessage[]>([GREETING]);
  const [thinking, setThinking] = useState(false);
  const [building, setBuilding] = useState<SherpaWorkflowContext | null>(null);
  const [editing, setEditing] = useState<SherpaWorkflowContext | null>(null);
  const counter = useRef(0);

  const applyReply = useCallback((reply: SherpaReply) => {
    counter.current += 1;
    setMessages((prev) => [
      ...prev,
      {
        id: `msg_${counter.current}`,
        role: "assistant",
        text: reply.text,
        action: reply.action,
        clarification: reply.clarification ? { ...reply.clarification } : undefined,
      },
    ]);
    if (reply.workflow) setEditing(reply.workflow);
  }, []);

  const send = useCallback(
    (prompt: string) => {
      const trimmed = prompt.trim();
      if (!trimmed) return;

      counter.current += 1;
      setMessages((prev) => [...prev, { id: `msg_${counter.current}`, role: "user", text: trimmed }]);

      const reply = getSherpaReply(trimmed);
      const isBuild = Boolean(reply.workflow) && !reply.clarification;
      setThinking(true);
      setBuilding(isBuild ? reply.workflow! : null);

      window.setTimeout(
        () => {
          applyReply(reply);
          setThinking(false);
          setBuilding(null);
        },
        isBuild ? BUILD_DELAY() : SIMPLE_DELAY(),
      );
    },
    [applyReply],
  );

  const answerClarification = useCallback(
    (messageId: string, option: ClarificationOption) => {
      setMessages((prev) => prev.map((m) => (m.id === messageId && m.clarification ? { ...m, clarification: { ...m.clarification, answeredKey: option.key } } : m)));

      counter.current += 1;
      setMessages((prev) => [...prev, { id: `msg_${counter.current}`, role: "user", text: option.label }]);

      const reply = getClarificationFollowup(option);
      const isBuild = Boolean(reply.workflow);
      setThinking(true);
      setBuilding(isBuild ? reply.workflow! : null);

      window.setTimeout(
        () => {
          applyReply(reply);
          setThinking(false);
          setBuilding(null);
        },
        isBuild ? BUILD_DELAY() : SIMPLE_DELAY(),
      );
    },
    [applyReply],
  );

  const runSlashCommand = useCallback(
    (cmd: "run" | "improve" | "follow-up", onRun?: () => void) => {
      counter.current += 1;
      setMessages((prev) => [...prev, { id: `msg_${counter.current}`, role: "user", text: `/${cmd}` }]);

      if (cmd === "run") {
        onRun?.();
        counter.current += 1;
        setMessages((prev) => [
          ...prev,
          {
            id: `msg_${counter.current}`,
            role: "assistant",
            text: editing
              ? `Running "${editing.name}" now — track progress from the Dashboard or Studio.`
              : "Nothing to run yet — describe a workflow first and I'll scaffold it.",
          },
        ]);
        return;
      }

      if (cmd === "follow-up") {
        counter.current += 1;
        setMessages((prev) => [...prev, { id: `msg_${counter.current}`, role: "assistant", text: "Sure — what would you like to follow up on?" }]);
        return;
      }

      setThinking(true);
      window.setTimeout(() => {
        applyReply({ text: getImproveSuggestion(editing) });
        setThinking(false);
      }, SIMPLE_DELAY());
    },
    [applyReply, editing],
  );

  const openChat = useCallback(
    (initialPrompt?: string) => {
      setOpen(true);
      if (initialPrompt?.trim()) send(initialPrompt);
    },
    [send],
  );

  const closeChat = useCallback(() => setOpen(false), []);

  return (
    <SherpaContext.Provider
      value={{ open, messages, thinking, building, editing, openChat, closeChat, send, answerClarification, runSlashCommand }}
    >
      {children}
    </SherpaContext.Provider>
  );
}

export function useSherpa() {
  const ctx = useContext(SherpaContext);
  if (!ctx) throw new Error("useSherpa must be used within a SherpaProvider");
  return ctx;
}
