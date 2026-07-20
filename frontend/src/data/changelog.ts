export interface ChangelogSection {
  title: string;
  items: string[];
  code?: {
    lines: string[];
  };
}

export interface ChangelogBadge {
  variant: "features" | "improvements" | "fixes";
  label: string;
}

export interface ChangelogEntryData {
  date: string;
  badges: ChangelogBadge[];
  sections: ChangelogSection[];
}

export const changelogData: ChangelogEntryData[] = [
  {
    date: "Jul 8, 2026",
    badges: [
      { variant: "features", label: "New Features" },
      { variant: "improvements", label: "Improvements" },
    ],
    sections: [
      {
        title: "Sherpa plan approval",
        items: [
          "New workflow builds now go through a plan-first gate — Sherpa proposes a numbered plan and waits for approval before touching the canvas.",
          "Canvas edits and fix-plans after a run review skip the gate, since you've already reviewed the context.",
          "Added a dedicated activity chip state (Planning) so it's clear when Sherpa is drafting a plan versus generating a workflow.",
        ],
      },
      {
        title: "Studio canvas",
        items: [
          "The node palette now supports ⌘K search across all 36 node types.",
          "Validation badges on canvas nodes update as you type, instead of only on save.",
          "Compact layout for narrow viewports moves the node palette into an overlay and the right panel into a fixed sheet.",
        ],
      },
    ],
  },
  {
    date: "Jun 24, 2026",
    badges: [
      { variant: "features", label: "New Features" },
      { variant: "fixes", label: "Fixes" },
    ],
    sections: [
      {
        title: "MCP integrations",
        items: [
          "Added typed jira_mcp, confluence_mcp, and github_mcp nodes — the preferred way to reach Jira, Confluence, and GitHub through the MCP bridge.",
          "The legacy mcp node now auto-upgrades to the correct typed node based on its configured tool.",
          "Fixed a bug where MCP credential fields could appear editable in the node inspector; they are now always locked, read-only mirrors of backend/.env.",
        ],
        code: {
          lines: [
            "POST /tools/confluence_publish_report/run",
            "{",
            '  "params": { "title": "Weekly Risk Digest", "body_markdown": "..." },',
            '  "credentials": { "integration": "atlassian" }',
            "}",
          ],
        },
      },
      {
        title: "Gemini migration",
        items: [
          "All LLM traffic now flows through a single adapter module, making the switch from Google AI API keys to Vertex AI a one-file change.",
          "Added automatic key rotation across up to three GEMINI_API_KEY values on rate limits or transient errors.",
          "New GET /api/agent/llm/health and GET /api/agent/llm/probe endpoints for credential and connectivity checks.",
        ],
      },
    ],
  },
  {
    date: "Jun 9, 2026",
    badges: [
      { variant: "improvements", label: "Improvements" },
      { variant: "fixes", label: "Fixes" },
    ],
    sections: [
      {
        title: "Backend restructure",
        items: [
          "Dataset catalog moved from data_sources/ to connectors/, and the generation harness moved from agent/ to generation/ — legacy import paths are removed.",
          "Vetted demo workflows now live under backend/good_examples/ and back both the Copilot retriever and the end-to-end test suite.",
          "Node handlers and their YAML specs are now paired one-to-one under engine/nodes/, auto-discovered by the registry at import time.",
        ],
      },
      {
        title: "Fixes",
        items: [
          "Fixed a race where the Questions panel could be cleared immediately after Sherpa asked a clarifying question.",
          "Fixed sample-run \"yes\" sometimes triggering a full workflow rebuild instead of running the existing canvas DAG.",
          "Fixed the Join node's edge-order handling so left/right inputs resolve deterministically.",
        ],
      },
    ],
  },
  {
    date: "May 27, 2026",
    badges: [
      { variant: "features", label: "New Features" },
      { variant: "improvements", label: "Improvements" },
    ],
    sections: [
      {
        title: "Automations",
        items: [
          "Added interval-based automations alongside cron schedules, with a configurable active duration window.",
          "The Automations drawer now shows run history and supports manual, on-demand triggers.",
          "The scheduler now writes both run_logs and automation_runs entries for every scheduled execution.",
        ],
      },
      {
        title: "Node catalogue",
        items: [
          "Added the Evaluator node for pass/fail quality gates against a run's output.",
          "Added the Router node for multi-way branching, alongside the existing binary Condition node.",
          "Excel Export now supports multi-tab output by connecting multiple upstream edges.",
        ],
      },
    ],
  },
  {
    date: "May 12, 2026",
    badges: [
      { variant: "fixes", label: "Fixes" },
      { variant: "improvements", label: "Improvements" },
    ],
    sections: [
      {
        title: "Studio reliability",
        items: [
          "Fixed a bug where the bottom output panel could show duplicated stage cards after a run with warnings.",
          "Improved SSE reconnection handling for long-running workflow executions.",
          "Draft autosave now debounces more aggressively to avoid write contention with manual saves.",
        ],
      },
      {
        title: "Developer experience",
        items: [
          "Added python backend/scripts/gen_artifacts.py output validation, catching malformed node YAML before it reaches the palette.",
          "Improved error messages when a Starlark script in the code node references a disallowed builtin.",
        ],
      },
    ],
  },
];
