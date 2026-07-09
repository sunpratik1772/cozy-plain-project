import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { AUTOMATIONS, SOURCES, SKILLS, type EmtAutomation, type EmtSource, type EmtSkill } from "@/data/emt";

const STORAGE_KEY = "emt-sun-workspace-v1";

export type McpStatus = "connected" | "partial" | "off";

export interface WorkspaceSettings {
  displayName: string;
  workspaceName: string;
  apiKey: string;
  mcp: { name: string; status: McpStatus }[];
}

interface WorkspaceState {
  automations: EmtAutomation[];
  sources: EmtSource[];
  skills: EmtSkill[];
  settings: WorkspaceSettings;
}

const DEFAULT_STATE: WorkspaceState = {
  automations: AUTOMATIONS,
  sources: SOURCES,
  skills: SKILLS,
  settings: {
    displayName: "Pratik",
    workspaceName: "emt-sun",
    apiKey: "emt_sk_live_9f31c8a24f2a",
    mcp: [
      { name: "Atlassian", status: "partial" },
      { name: "GitHub", status: "off" },
    ],
  },
};

function loadState(): WorkspaceState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        automations: parsed.automations ?? DEFAULT_STATE.automations,
        sources: parsed.sources ?? DEFAULT_STATE.sources,
        skills: parsed.skills ?? DEFAULT_STATE.skills,
        settings: { ...DEFAULT_STATE.settings, ...parsed.settings },
      };
    }
  } catch {
    // ignore corrupt storage
  }
  return DEFAULT_STATE;
}

function randomKey() {
  const part = () => Math.random().toString(36).slice(2, 10);
  return `emt_sk_live_${part()}${part()}`.slice(0, 28);
}

let idCounter = 0;
function nextId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}${idCounter}`;
}

interface WorkspaceContextValue extends WorkspaceState {
  addAutomation: (input: { name: string; workflow: string; cron: string }) => void;
  toggleAutomation: (id: string) => void;
  deleteAutomation: (id: string) => void;

  addSource: (input: { name: string; type: string; detail: string }) => void;
  toggleSourceStatus: (id: string) => void;
  removeSource: (id: string) => void;

  toggleSkill: (id: string) => void;
  addCustomSkill: (input: { name: string; description: string }) => void;
  deleteSkill: (id: string) => void;

  updateSettings: (patch: Partial<Pick<WorkspaceSettings, "displayName" | "workspaceName">>) => void;
  regenerateApiKey: () => void;
  toggleMcp: (name: string) => void;

  resetWorkspace: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WorkspaceState>(loadState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addAutomation = useCallback((input: { name: string; workflow: string; cron: string }) => {
    setState((s) => ({
      ...s,
      automations: [
        { id: nextId("auto"), name: input.name, workflow: input.workflow, cron: input.cron, next: "Pending first run", enabled: true },
        ...s.automations,
      ],
    }));
  }, []);

  const toggleAutomation = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      automations: s.automations.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)),
    }));
  }, []);

  const deleteAutomation = useCallback((id: string) => {
    setState((s) => ({ ...s, automations: s.automations.filter((a) => a.id !== id) }));
  }, []);

  const addSource = useCallback((input: { name: string; type: string; detail: string }) => {
    setState((s) => ({
      ...s,
      sources: [{ id: nextId("src"), name: input.name, type: input.type, detail: input.detail, status: "connected" }, ...s.sources],
    }));
  }, []);

  const toggleSourceStatus = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      sources: s.sources.map((src) =>
        src.id === id ? { ...src, status: src.status === "connected" ? "off" : "connected" } : src,
      ),
    }));
  }, []);

  const removeSource = useCallback((id: string) => {
    setState((s) => ({ ...s, sources: s.sources.filter((src) => src.id !== id) }));
  }, []);

  const toggleSkill = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      skills: s.skills.map((sk) => (sk.id === id ? { ...sk, enabled: !sk.enabled } : sk)),
    }));
  }, []);

  const addCustomSkill = useCallback((input: { name: string; description: string }) => {
    setState((s) => ({
      ...s,
      skills: [
        { id: nextId("skill"), name: input.name, description: input.description, enabled: true, usedByWorkflows: 0, runs: 0, origin: "custom" },
        ...s.skills,
      ],
    }));
  }, []);

  const deleteSkill = useCallback((id: string) => {
    setState((s) => ({ ...s, skills: s.skills.filter((sk) => sk.id !== id) }));
  }, []);

  const updateSettings = useCallback((patch: Partial<Pick<WorkspaceSettings, "displayName" | "workspaceName">>) => {
    setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
  }, []);

  const regenerateApiKey = useCallback(() => {
    setState((s) => ({ ...s, settings: { ...s.settings, apiKey: randomKey() } }));
  }, []);

  const toggleMcp = useCallback((name: string) => {
    setState((s) => ({
      ...s,
      settings: {
        ...s.settings,
        mcp: s.settings.mcp.map((m) => (m.name === name ? { ...m, status: m.status === "off" ? "connected" : "off" } : m)),
      },
    }));
  }, []);

  const resetWorkspace = useCallback(() => {
    setState({ automations: [], sources: [], skills: DEFAULT_STATE.skills.map((s) => ({ ...s, enabled: false })), settings: DEFAULT_STATE.settings });
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{
        ...state,
        addAutomation,
        toggleAutomation,
        deleteAutomation,
        addSource,
        toggleSourceStatus,
        removeSource,
        toggleSkill,
        addCustomSkill,
        deleteSkill,
        updateSettings,
        regenerateApiKey,
        toggleMcp,
        resetWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used within a WorkspaceProvider");
  return ctx;
}
