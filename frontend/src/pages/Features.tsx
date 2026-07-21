import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Seo } from "@/components/Seo";
import { MarketingShell } from "@/components/marketing/MarketingShell";

const features = [
  {
    eyebrow: "Composition",
    title: "Node-based automation canvas",
    body: "Build powerful workflows by visually connecting triggers, transforms and sinks. Every port is typed, every edge is inspectable.",
    bullets: ["Typed inputs and outputs", "Sub-flows and macros", "Version-controlled canvas", "Multi-cursor collaboration"],
  },
  {
    eyebrow: "Runtime",
    title: "Local folder & filesystem triggers",
    body: "Watch local folders, network shares or S3 buckets and fire workflows the moment a file lands. No polling, no delay.",
    bullets: ["Native file-watch events", "Debounced trigger windows", "Path pattern matching", "Retries with dead-letter queues"],
  },
  {
    eyebrow: "Observability",
    title: "Every execution, tracked",
    body: "View every run's input, output and error — filter by node, workflow or duration. Time-travel through history without leaving Studio.",
    bullets: ["Structured logs with payload inspection", "Node-level timings", "Errors surfaced inline on the canvas", "Trace replay"],
  },
  {
    eyebrow: "Intelligence",
    title: "AI-enhanced suggestions",
    body: "Sherpa learns from your workspace behaviour and proposes the next node, the next transform, the next integration — you stay in control.",
    bullets: ["Prompt-to-flow generation", "Inline node recommendations", "Auto-fix broken edges", "LLM policies per workspace"],
  },
];

const pricing = [
  { name: "Starter", tagline: "For individuals", price: "Free", period: "forever", cta: "Get started", features: ["2 workspaces", "Local runtime", "Community skills", "5 concurrent runs"], popular: false },
  { name: "Studio", tagline: "For growing teams", price: "$29", period: "per user / month", cta: "Start trial", features: ["Unlimited workspaces", "Distributed runtime", "Private skill registry", "Unlimited runs", "Audit logs"], popular: true },
  { name: "Enterprise", tagline: "For institutions", price: "Custom", period: "contact sales", cta: "Get in touch", features: ["On-prem deployment", "SSO / SCIM", "Custom compliance", "24/7 support", "Solutions engineering"], popular: false },
];

const Features = () => {
  return (
    <MarketingShell>
      <Seo title="Features — Sherpa Studio" description="Everything Sherpa Studio ships with — composition, execution, observability, intelligence and pricing." path="/features" />

      {/* Hero */}
      <section className="relative pt-36 pb-14 md:pt-44 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 corner-glow-tr" />
          <div className="absolute inset-0 editorial-grid opacity-30" />
        </div>
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-xs font-medium tracking-[0.28em] uppercase text-muted-foreground">Features</p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6 font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight text-foreground max-w-5xl text-balance"
          >
            Engineered <em className="italic text-muted-foreground">strictly</em> for power users
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground"
          >
            Every capability inside Sherpa Studio is built for engineers who care about determinism, observability and end-to-end control.
          </motion.p>
        </div>
      </section>

      {/* Feature rows */}
      <section className="border-t border-border/50 py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8 space-y-24 md:space-y-32">
          {features.map((f, i) => (
            <div key={f.title} className={`grid gap-10 md:gap-16 lg:grid-cols-2 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="[direction:ltr]"
              >
                <span className="text-[10px] font-medium tracking-[0.24em] uppercase text-muted-foreground">{f.eyebrow}</span>
                <h3 className="mt-4 font-serif text-4xl md:text-5xl leading-tight text-foreground text-balance">{f.title}</h3>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">{f.body}</p>
                <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-md">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-foreground/90">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
                className="[direction:ltr] relative aspect-[5/4] rounded-3xl border border-border/70 bg-card overflow-hidden"
              >
                <div className="absolute inset-0 editorial-dot-grid opacity-60" />
                <div className="absolute inset-0 corner-glow-tl opacity-40" />
                <div className="relative flex h-full items-center justify-center">
                  <div className="grid grid-cols-2 gap-3 max-w-[70%]">
                    {[0, 1, 2, 3].map((n) => (
                      <div key={n} className="rounded-lg border border-border/60 bg-background/60 p-4 backdrop-blur">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" style={{ animationDelay: `${n * 0.2}s` }} />
                          <span className="text-[9px] font-mono text-muted-foreground">node_{i}{n}</span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-1 rounded-full bg-muted" style={{ width: `${60 + n * 8}%` }} />
                          <div className="h-1 rounded-full bg-muted/60" style={{ width: `${40 + n * 10}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-border/50 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-xs font-medium tracking-[0.28em] uppercase text-muted-foreground">Pricing</p>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl leading-[1] tracking-tight text-foreground max-w-3xl text-balance">
            Simple pricing. <em className="italic text-muted-foreground">Powerful</em> every step.
          </h2>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {pricing.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col gap-6 rounded-2xl border p-8 transition-colors ${
                  p.popular ? "border-primary/40 bg-card" : "border-border/60 bg-card/60 hover:border-border"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-6 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">
                    <Zap className="h-3 w-3" /> Popular
                  </span>
                )}
                <div>
                  <h3 className="font-serif text-3xl text-foreground">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl text-foreground">{p.price}</span>
                  <span className="text-xs text-muted-foreground">{p.period}</span>
                </div>
                <a
                  href="/login"
                  className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    p.popular ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border text-foreground hover:bg-accent"
                  }`}
                >
                  {p.cta}
                </a>
                <ul className="space-y-2.5 border-t border-border/50 pt-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/90">
                      <Check className="h-4 w-4 text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
};

export default Features;
