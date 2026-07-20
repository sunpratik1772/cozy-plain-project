import { useParams, Navigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { DocSidebar, DocTableOfContents } from "@/components/documentation";
import { DocPageContent } from "@/components/documentation/DocPageContent";
import { Footer } from "@/components/footer";
import { generateTableOfContents } from "@/data/documentation-pages";
import { Seo } from "@/components/Seo";

export default function Documentation() {
  const params = useParams();
  const pageSlug = params["*"] || "overview";
  const tableOfContents = generateTableOfContents(pageSlug);

  // Redirect to default page if no slug provided
  if (!params["*"]) {
    return <Navigate to="/docs/overview" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo
        title={`${pageSlug.replace(/-/g, " ")} — dbSherpa Studio Docs`}
        description="Guides, architecture references, and setup instructions for building on dbSherpa Studio."
        path={`/docs/${pageSlug}`}
      />
      <Navbar />
      <div className="flex pt-16 max-w-[90rem] mx-auto flex-1">
        <DocSidebar />
        <DocPageContent />
        <DocTableOfContents items={tableOfContents} className="pr-6" />
      </div>
      <Footer />
    </div>
  );
}
