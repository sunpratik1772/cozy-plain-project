import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const fluidEase = [0.16, 1, 0.3, 1] as const;

const faqs = [
  {
    q: "How long does it take to get a workflow running?",
    a: "Most teams have a first workflow live within a day. Complexity and the number of integrations involved determine the exact timeline &mdash; we'll scope it with you during onboarding.",
  },
  {
    q: "Can I self-host Sherpa on my own infrastructure?",
    a: "Yes. Sherpa is local-first by design &mdash; run it on your own servers with full control over data, or use our managed offering if you'd rather not operate it yourself.",
  },
  {
    q: "What's included in the AI copilot?",
    a: "Describe what you want automated and Sherpa proposes a numbered plan, then drafts the canvas for you to review, edit and approve before anything runs.",
  },
  {
    q: "How does usage-based pricing work?",
    a: "You pay for workflow runs and compute, not seats. There's a free tier for prototyping, and volume pricing kicks in automatically as you scale.",
  },
  {
    q: "Can I migrate existing scripts into Sherpa?",
    a: "Existing Python, Node or shell scripts can be wrapped as custom Skills and dropped straight into a canvas alongside native nodes.",
  },
  {
    q: "How do I get started?",
    a: "Create a free account, connect a data source, and either build your first flow manually or ask the AI copilot to draft one for you.",
  },
];

export function FAQSection() {
  return (
    <section className="relative border-t border-border/50 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: fluidEase }}
              className="font-serif text-6xl leading-[0.9] tracking-tight text-foreground md:text-7xl"
            >
              FAQ.
            </motion.h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Got questions? Here&rsquo;s everything you need to know about running Sherpa.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: fluidEase }}
          >
            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${i}`}
                  className="rounded-2xl border border-border/70 bg-card px-5 last:border-b"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-medium text-foreground hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    <span dangerouslySetInnerHTML={{ __html: f.a }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
