import { useParams } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { ApiSidebar, ApiPageContent } from "@/components/api-reference";
import { DocTableOfContents } from "@/components/documentation";
import { Footer } from "@/components/footer";
import { generateApiTableOfContents } from "@/data/api-reference";
import { Seo } from "@/components/Seo";

export default function ApiReference() {
  const params = useParams();
  const endpointSlug = params["*"] || "refresh-token";
  const tableOfContents = generateApiTableOfContents(endpointSlug);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo
        title={`${endpointSlug.replace(/-/g, " ")} — Compass API`}
        description="REST API reference for Compass: endpoints, headers, request bodies, and response schemas."
        path={`/api/${endpointSlug}`}
      />
      <Navbar />
      <div className="flex pt-16 max-w-[90rem] mx-auto flex-1 w-full min-w-0 overflow-x-hidden">
        <ApiSidebar />
        <ApiPageContent />
        <DocTableOfContents items={tableOfContents} className="pr-6" />
      </div>
      <Footer />
    </div>
  );
}
