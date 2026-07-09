import {
  FileText,
  Wrench,
  Layers,
  Settings,
  Sparkles,
  Tag,
  DollarSign,
  Package,
  RefreshCw,
  AlertTriangle,
  Shield,
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
      { id: "workspace", title: "Set Up Your Workspace", href: "/docs/workspace", icon: Wrench },
      { id: "sandbox", title: "Sandbox vs. Production", href: "/docs/sandbox", icon: Layers },
      { id: "account-setup", title: "Account Setup", href: "/docs/account-setup", icon: Settings },
      { id: "features", title: "Key Features", href: "/docs/features", icon: Sparkles },
    ],
  },
  {
    id: "products",
    title: "Products & Subscriptions",
    items: [
      { id: "coupons", title: "Coupons & Discounts", href: "/docs/coupons", icon: Tag },
      { id: "pricing", title: "Pricing Models", href: "/docs/pricing", icon: DollarSign },
      { id: "products", title: "Creating a Product", href: "/docs/products", icon: Package },
      { id: "subscriptions", title: "Subscriptions", href: "/docs/subscriptions", icon: RefreshCw },
      { id: "failed-payments", title: "Failed Payments", href: "/docs/failed-payments", icon: AlertTriangle },
    ],
  },
  {
    id: "security",
    title: "Security",
    items: [
      { id: "encryption", title: "Security & Encryption", href: "/docs/encryption", icon: Shield },
    ],
  },
];

export const tableOfContents: TableOfContentsItem[] = [
  { id: "introduction", title: "Introduction", level: "h2" },
  { id: "creating-your-account", title: "Creating Your Account", level: "h2" },
  { id: "sign-up-process", title: "Sign-up Process", level: "h3" },
  { id: "account-verification", title: "Account Verification", level: "h3" },
  { id: "workspace-details", title: "Workspace & Project Details", level: "h2" },
  { id: "adding-a-workspace", title: "Adding a Workspace", level: "h3" },
  { id: "supported-regions", title: "Supported Regions", level: "h3" },
  { id: "configuration", title: "Configuration", level: "h2" },
  { id: "security-setup", title: "Security Setup", level: "h2" },
  { id: "two-factor-auth", title: "Two-Factor Authentication", level: "h3" },
  { id: "recovery-options", title: "Setting Up Recovery Options", level: "h3" },
  { id: "notifications", title: "Notifications & Preferences", level: "h2" },
  { id: "reviewing-setup", title: "Reviewing Your Setup", level: "h2" },
  { id: "checklist", title: "Checklist for a Complete Account", level: "h3" },
  { id: "testing-sandbox", title: "Testing in Sandbox Mode", level: "h3" },
];

export const documentationContent = {
  title: "Account Setup",
  description: "Learn how to set up your account and configure your workspace for optimal use.",
  breadcrumb: ["Getting Started", "Account Setup"],
};
