import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Categories } from "@/components/categories";
import { Support } from "@/components/support";
import { AIAssistant } from "@/components/ai-assistant";
import { Footer } from "@/components/footer";
import { Seo } from "@/components/Seo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Seo
        title="Docs & Knowledge Hub Template | Lovable"
        description="Build a professional documentation site with command palette search, API reference, and changelog. Dark theme, scroll-spy navigation. Ready in hours."
        path="/"
      />
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Support />
        <AIAssistant />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
