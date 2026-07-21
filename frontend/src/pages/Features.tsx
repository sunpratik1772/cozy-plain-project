import { Seo } from "@/components/Seo";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { HeroPage, type HeroConfig } from "@/components/marketing/HeroPage";

const config: HeroConfig = {
  eyebrow: "features · ai auto-build",
  words: ["ask", "sherpa", "anything"],
  description: "Describe what you want to automate — Sherpa composes the logic, connections and triggers for you.",
  stats: [
    { value: "prompt", label: "to flow in seconds" },
    { value: "200+", label: "primitive nodes" },
    { value: "auto", label: "fix broken edges" },
  ],
  ctaLabel: "start building",
  ctaTo: "/login",
};

const Features = () => (
  <MarketingShell>
    <Seo
      title="Features — Sherpa"
      description="Prompt-to-flow generation, typed node composition and full run observability."
      path="/features"
    />
    <HeroPage config={config} />
  </MarketingShell>
);

export default Features;
