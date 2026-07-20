import { Seo } from "@/components/Seo";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { EditorialHero } from "@/components/marketing/EditorialHero";
import { FoundationSection } from "@/components/marketing/FoundationSection";
import { ProductSuite } from "@/components/marketing/ProductSuite";
import { StatsBand } from "@/components/marketing/StatsBand";
import { AIBuildSection } from "@/components/marketing/AIBuildSection";
import { TestimonialsMarquee } from "@/components/marketing/TestimonialsMarquee";

const Index = () => {
  return (
    <MarketingShell>
      <Seo
        title="Sherpa Studio — Local-first automation for engineering teams"
        description="Sherpa is an open, node-based workflow platform running on your own infrastructure. Compose, run and observe automations from a single canvas."
        path="/"
      />
      <EditorialHero />
      <FoundationSection />
      <ProductSuite />
      <StatsBand />
      <AIBuildSection />
      <TestimonialsMarquee />
    </MarketingShell>
  );
};

export default Index;
