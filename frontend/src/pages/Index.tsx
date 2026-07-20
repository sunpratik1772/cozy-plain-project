import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/landing/Features";
import FinalCTA from "@/components/landing/FinalCTA";
import { Footer } from "@/components/footer";
import { Seo } from "@/components/Seo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Seo
        title="dbSherpa Studio — Plan, track, and deliver anything"
        description="Run your daily tasks, all in one place. Visual, node-based workflow automation with the Sherpa AI copilot."
        path="/"
      />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
