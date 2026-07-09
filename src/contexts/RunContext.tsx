import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { RUNS, type EmtRun, type RunStatus } from "@/data/emt";

interface LiveRun {
  id: string;
  workflowName: string;
  status: RunStatus;
}

interface RunContextValue {
  recentRuns: EmtRun[];
  liveRun: LiveRun | null;
  startRun: (workflowName: string) => string;
}

const RunContext = createContext<RunContextValue | null>(null);

export function RunProvider({ children }: { children: ReactNode }) {
  const [recentRuns, setRecentRuns] = useState<EmtRun[]>(RUNS);
  const [liveRun, setLiveRun] = useState<LiveRun | null>(null);
  const counter = useRef(0);

  const startRun = useCallback((workflowName: string) => {
    counter.current += 1;
    const id = `run_live_${counter.current}`;

    setLiveRun({ id, workflowName, status: "running" });
    setRecentRuns((prev) => [
      { id, workflowName, status: "running", time: "just now", duration: "—" },
      ...prev,
    ].slice(0, 12));

    window.setTimeout(() => {
      setLiveRun((cur) => (cur && cur.id === id ? { ...cur, status: "success" } : cur));
      setRecentRuns((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "success", duration: `${40 + Math.round(Math.random() * 20)}s` } : r)),
      );
      window.setTimeout(() => {
        setLiveRun((cur) => (cur && cur.id === id ? null : cur));
      }, 5000);
    }, 4200);

    return id;
  }, []);

  return <RunContext.Provider value={{ recentRuns, liveRun, startRun }}>{children}</RunContext.Provider>;
}

export function useRun() {
  const ctx = useContext(RunContext);
  if (!ctx) throw new Error("useRun must be used within a RunProvider");
  return ctx;
}
