import { motion } from "framer-motion";
import { Sparkles, FileSearch, Building2, Layers, FolderClock } from "lucide-react";

const steps = [
  { icon: FileSearch, title: "Enrich contact details", sub: "Fetch profile from Clearbit + LinkedIn" },
  { icon: Building2, title: "Check Crunchbase", sub: "Detect fundraise events on target company" },
  { icon: Layers, title: "Generate summary", sub: "Compose brief with GPT · store to CRM" },
  { icon: FolderClock, title: "File watcher", sub: "Re-run when leads CSV changes" },
];

export function AIBuildSection() {
  return (
    <section className="relative border-t border-border/50 py-20 md:py-24 overflow-hidden">
      <div className="absolute right-0 top-0 h-full w-1/2 corner-glow-tr opacity-70" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-medium tracking-[0.28em] uppercase text-muted-foreground">AI Auto-build</p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-serif text-4xl md:text-6xl leading-[1] tracking-tight text-foreground max-w-xl text-balance"
            >
              Even more control with <em className="italic text-muted-foreground">AI</em> auto-build
            </motion.h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              From prompt to production in seconds. Describe what you want to automate, and Sherpa composes the logic, connections and triggers &mdash; exactly how you'd build it, ready for you to inspect and ship.
            </p>

            <div className="mt-8 flex items-center gap-2 rounded-full border border-border/70 bg-card p-1.5 shadow-sm max-w-md">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <p className="flex-1 truncate text-sm text-muted-foreground">Ask Sherpa: <span className="text-foreground">Enrich new contacts with company info</span></p>
              <button className="rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background">Generate</button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 corner-glow-tr opacity-45 blur-xl" aria-hidden />
            <div className="relative rounded-2xl border border-border/70 bg-card/80 p-5 backdrop-blur">
              <div className="flex items-center gap-2 border-b border-border/50 pb-3">
                <span className="h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
                <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">Generating workflow</span>
                <span className="ml-auto text-[10px] font-mono text-muted-foreground/70">sherpa · v2</span>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {steps.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                  >
                    <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/60 px-4 py-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary">
                        <s.icon className="h-4 w-4 text-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{s.title}</p>
                        <p className="truncate text-xs text-muted-foreground">{s.sub}</p>
                      </div>
                      <span className="h-1.5 w-1.5 rounded-full bg-success animate-glow-pulse" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="ml-8 h-2 w-px bg-border" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
