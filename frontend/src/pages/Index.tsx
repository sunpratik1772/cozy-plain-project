import { Seo } from "@/components/Seo";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { EditorialHero } from "@/components/marketing/EditorialHero";
import { FoundationSection } from "@/components/marketing/FoundationSection";
import { ProductSuite } from "@/components/marketing/ProductSuite";
import { StatsBand } from "@/components/marketing/StatsBand";
import { AIBuildSection } from "@/components/marketing/AIBuildSection";
import { TestimonialsMarquee } from "@/components/marketing/TestimonialsMarquee";
import { LaunchSection } from "@/components/marketing/LaunchSection";
import { ServicesAccordion } from "@/components/marketing/ServicesAccordion";
import { RatingSection } from "@/components/marketing/RatingSection";
import { FAQSection } from "@/components/marketing/FAQSection";
import { InsightsSection } from "@/components/marketing/InsightsSection";
import { ContactSection } from "@/components/marketing/ContactSection";

const Index = () => {
  return (
    <MarketingShell>
      <Seo
        title="Sherpa Studio — Local-first automation for engineering teams"
        description="Sherpa is an open, node-based workflow platform running on your own infrastructure. Compose, run and observe automations from a single canvas."
        path="/"
      />
      <EditorialHero />
      <StatsBand />
      <ServicesAccordion />
      <FoundationSection />
      <LaunchSection />
      <ProductSuite />
      <RatingSection />
      <TestimonialsMarquee />
      <FAQSection />
      <InsightsSection />
      <AIBuildSection />
      <ContactSection />
    </MarketingShell>
  );
};

export default Index;
