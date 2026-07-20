import {
  FileText,
  Layers,
  Rocket,
  Blocks,
  Wrench,
  LayoutDashboard,
  Bot,
  Wand2,
  Plug,
  Database,
  Table2,
  Cloud,
  GraduationCap,
  RefreshCw,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  isNew?: boolean;
}

export interface NavGroup {
  id: string;
  title: string;
  items: NavItem[];
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: "h2" | "h3";
}

export const navigationGroups: NavGroup[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      { id: "overview", title: "Overview", href: "/docs/overview", icon: FileText },
      { id: "architecture", title: "Architecture", href: "/docs/architecture", icon: Layers },
      { id: "quickstart", title: "Quickstart", href: "/docs/quickstart", icon: Rocket },
    ],
  },
  {
    id: "building-workflows",
    title: "Building Workflows",
    items: [
      { id: "node-catalogue", title: "Node Catalogue", href: "/docs/node-catalogue", icon: Blocks },
      { id: "creating-nodes", title: "Creating Custom Nodes", href: "/docs/creating-nodes", icon: Wrench },
      { id: "studio-basics", title: "Studio Basics", href: "/docs/studio-basics", icon: LayoutDashboard },
    ],
  },
  {
    id: "sherpa-copilot",
    title: "Sherpa & Copilot",
    items: [
      { id: "agent-harness", title: "Agent Harness", href: "/docs/agent-harness", icon: Bot },
      { id: "generation-harness", title: "Generation Harness", href: "/docs/generation-harness", icon: Wand2, isNew: true },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    items: [
      { id: "mcp-integrations", title: "MCP Integrations", href: "/docs/mcp-integrations", icon: Plug },
      { id: "data-sources", title: "Data Source Onboarding", href: "/docs/data-sources", icon: Database },
    ],
  },
  {
    id: "database",
    title: "Database",
    items: [
      { id: "database-schema", title: "Schema & Relations", href: "/docs/database-schema", icon: Table2 },
      { id: "cloud-sql", title: "Cloud SQL", href: "/docs/cloud-sql", icon: Cloud },
    ],
  },
  {
    id: "engineering",
    title: "Engineering",
    items: [
      { id: "engineering-onboarding", title: "Onboarding", href: "/docs/engineering-onboarding", icon: GraduationCap },
      { id: "gemini-migration", title: "Gemini Migration", href: "/docs/gemini-migration", icon: RefreshCw },
    ],
  },
];
