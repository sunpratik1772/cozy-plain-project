import { Seo } from "@/components/Seo";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { HeroPage, type HeroConfig } from "@/components/marketing/HeroPage";

const config: HeroConfig = {
  eyebrow: "local-first automation",
  words: ["ship", "your", "flows"],
  description: "Sherpa runs automations on your own infrastructure — full observability, zero cloud lock-in.",
  stats: [
    { value: "2.4k", label: "github stars" },
    { value: "500+", label: "active installs" },
    { value: "94%", label: "run success rate" },
  ],
  ctaLabel: "get started",
  ctaTo: "/login",
};

const Index = () => (
  <MarketingShell>
    <Seo
      title="Sherpa — local-first automation for engineering teams"
      description="Sherpa is an open, node-based workflow platform running on your own infrastructure."
      path="/"
    />
    <HeroPage config={config} />
  </MarketingShell>
);

export default Index;
