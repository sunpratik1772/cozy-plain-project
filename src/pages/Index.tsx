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
        title="EMT Sun Docs & API Reference"
        description="Documentation, API reference, and changelog for EMT Sun — the visual, node-based workflow-automation platform with the Sherpa AI copilot."
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
