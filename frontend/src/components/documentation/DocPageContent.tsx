import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { DocBreadcrumb } from "./DocBreadcrumb";
import { DocSection } from "./DocSection";
import { documentationPages } from "@/data/documentation-pages";
import WaveText from "@/components/ui/wave-text";

export function DocPageContent() {
  const params = useParams();
  const pageSlug = params["*"] || "overview";
  
  const page = documentationPages[pageSlug] || documentationPages["overview"];
  
  if (!page) {
    return (
      <main className="flex-1 min-w-0 px-6 lg:px-12 pt-16 lg:pt-10 pb-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Page Not Found</h1>
          <p className="text-lg text-muted-foreground">
            The documentation page you're looking for doesn't exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <motion.main 
      key={pageSlug}
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex-1 min-w-0 px-4 md:px-6 lg:px-12 pt-16 lg:pt-10 pb-10 overflow-hidden"
    >
      <div className="max-w-3xl w-full">
        <DocBreadcrumb items={page.breadcrumb} />

        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            <WaveText text={page.title} />
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            {page.description}
          </p>
        </div>

        <div className="space-y-12">
          {page.sections.map((section) => (
            <DocSection key={section.id} id={section.id} title={section.title} level={section.level}>
              <p>{section.content}</p>
              {section.listItems && (
                section.orderedList ? (
                  <ol className="list-decimal list-inside space-y-2 ml-2 mt-4">
                    {section.listItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                ) : (
                  <ul className="list-disc list-inside space-y-2 ml-2 mt-4">
                    {section.listItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )
              )}
            </DocSection>
          ))}
        </div>
      </div>
    </motion.main>
  );
}
