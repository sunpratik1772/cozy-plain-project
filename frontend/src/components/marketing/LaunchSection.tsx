import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Users, Boxes, Wallet, Gauge } from "lucide-react";

const fluidEase = [0.16, 1, 0.3, 1] as const;

const pillars = [
  { icon: Users, title: "A team embedded in your stack", desc: "Engineers pair with you from kickoff through the first production run." },
  { icon: Boxes, title: "Workflows built around your data", desc: "Every canvas is composed around the sources and constraints you already run." },
  { icon: Wallet, title: "Usage-based pricing, no lock-in", desc: "Pay for what runs. Self-host or go managed, same price either way." },
  { icon: Gauge, title: "Reliability you can measure", desc: "Every run is logged, replayable and alertable from the first deploy." },
];

export function LaunchSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative border-t border-border/50 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-[220px_1fr] md:gap-16">
          <div>
            <p className="text-xs font-medium tracking-[0.28em] uppercase text-muted-foreground">About Sherpa</p>
          </div>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: fluidEase }}
              className="font-serif text-4xl md:text-6xl leading-[1.02] tracking-tight text-foreground max-w-3xl text-balance"
            >
              How we help teams <em className="italic text-muted-foreground">ship reliable automation</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: fluidEase }}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              See how the Sherpa team pairs deep infrastructure work with fast iteration to get automations running on your own systems.
            </motion.p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2">
          {pillars.map((p, i) => (
            <motion.button
              key={p.title}
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: fluidEase }}
              className={`group flex items-center gap-4 rounded-2xl border p-5 text-left transition-colors duration-300 ${
                active === i ? "border-primary/50 bg-card" : "border-border/70 bg-card/60 hover:border-border"
              }`}
            >
              <div className="flex items-center gap-1.5">
                {pillars.map((_, dot) => (
                  <span
                    key={dot}
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      dot <= i ? "bg-foreground" : "bg-foreground/20"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-auto text-xs font-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary">
                <p.icon className="h-4.5 w-4.5 text-foreground" strokeWidth={1.6} />
              </div>
              <p className="text-sm font-medium text-foreground">{p.title}</p>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: fluidEase }}
          className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/70"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.35),transparent_55%),radial-gradient(ellipse_at_bottom_right,hsl(var(--foreground)/0.15),transparent_50%)]" />
          <div className="absolute inset-0 editorial-dot-grid opacity-40" />
          <div className="relative flex h-full items-center gap-4 px-6 md:px-10">
            <button
              type="button"
              aria-label="Watch product walkthrough"
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition-transform hover:scale-105"
            >
              <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />
            </button>
            <div>
              <p className="text-xl font-medium text-foreground md:text-2xl">Watch Sherpa in action</p>
              <p className="text-sm text-foreground/70">(2020&ndash;26)</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
