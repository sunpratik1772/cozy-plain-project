import { Seo } from "@/components/Seo";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { HeroPage, type HeroConfig } from "@/components/marketing/HeroPage";

const config: HeroConfig = {
  eyebrow: "platform · architecture",
  words: ["one", "unified", "layer"],
  description: "Node composition, local-first execution and full observability inside a single configurable canvas.",
  stats: [
    { value: "180+", label: "curated nodes" },
    { value: "local", label: "first runtime" },
    { value: "soc 2", label: "compliance ready" },
  ],
  ctaLabel: "explore studio",
  ctaTo: "/login",
};

const Platform = () => (
  <MarketingShell>
    <Seo
      title="Platform — Sherpa"
      description="A unified automation layer combining composition, execution and observability in a single canvas."
      path="/platform"
    />
    <HeroPage config={config} />
  </MarketingShell>
);

export default Platform;
