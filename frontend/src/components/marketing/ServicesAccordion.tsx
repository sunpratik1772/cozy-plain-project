import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";

const fluidEase = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    title: "Workflow canvas & automation",
    desc: "Compose triggers, transforms and actions on a typed node canvas that runs on your own infrastructure.",
    tags: ["Node canvas", "Cron triggers", "File watchers", "Webhooks", "Templates", "+3"],
  },
  {
    title: "AI copilot & auto-build",
    desc: "Describe what you want automated and Sherpa drafts the workflow logic, ready to review and ship.",
    tags: ["Prompt-to-flow", "Plan approval", "Inline edits"],
  },
  {
    title: "Observability & run history",
    desc: "Every execution, input, output and error tracked in real-time and searchable across your whole surface.",
    tags: ["Live logs", "Replay", "Alerting"],
  },
  {
    title: "Integrations & data sources",
    desc: "Connect Postgres, Mongo, S3, local folders and REST APIs. Your data stays where it already lives.",
    tags: ["Databases", "Object storage", "REST & webhooks"],
  },
];

export function ServicesAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative py-4 md:py-6">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: fluidEase }}
          className="rounded-3xl bg-foreground px-6 py-14 text-background md:px-12 md:py-16"
        >
          <div className="flex items-center gap-2 text-sm text-background/70">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-background/40">
              <Plus className="h-3 w-3" />
            </span>
            What we do
          </div>
          <h2 className="mt-6 font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl">
            Platform.<span className="ml-3 text-2xl align-super text-background/50 md:text-3xl">(4)</span>
          </h2>

          <div className="mt-10 divide-y divide-background/15 border-t border-background/15">
            {services.map((s, i) => {
              const isOpen = open === i;
              return (
                <div key={s.title}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center gap-4 py-6 text-left"
                  >
                    <span className="font-mono text-xs text-background/50">({String(i + 1).padStart(3, "0")})</span>
                    <span className="flex-1 text-xl font-medium md:text-2xl">{s.title}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-background/30 transition-colors">
                      {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: fluidEase }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-0 md:pl-16">
                          <p className="max-w-xl text-background/70">{s.desc}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {s.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-background/25 px-3 py-1 text-xs text-background/80"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <Link
            to="/login"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-85"
          >
            Get started
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
