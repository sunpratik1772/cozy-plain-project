import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Cpu, Layers, Lock, Waypoints } from "lucide-react";
import { Seo } from "@/components/Seo";
import { MarketingShell } from "@/components/marketing/MarketingShell";

const pillars = [
  {
    tag: "Composition",
    title: "Node canvas",
    body: "Every automation is expressed as a directed graph of typed nodes. Inputs, outputs and side-effects are all explicit — no hidden magic, no cloud middleman.",
    icon: Waypoints,
  },
  {
    tag: "Execution",
    title: "Local-first runtime",
    body: "Sherpa executes on your infrastructure with sandboxed skill nodes, deterministic replay and full step-through debugging. Bring your own compute.",
    icon: Cpu,
  },
  {
    tag: "Extensibility",
    title: "Skills SDK",
    body: "Write custom nodes in Python, TypeScript or WASM. Publish to your workspace registry with versioning, permissions and change history.",
    icon: Layers,
  },
  {
    tag: "Governance",
    title: "Compliance-ready",
    body: "Row-level secrets, audit logs, workspace permissions and SOC 2 controls. Sherpa slots into your existing security posture.",
    icon: Lock,
  },
];

const modules = [
  { name: "Studio Canvas", role: "Composition", to: "/studio" },
  { name: "Skills Registry", role: "Extensibility", to: "/skills" },
  { name: "Automations Scheduler", role: "Execution", to: "/automations" },
  { name: "Run Observatory", role: "Observability", to: "/runs" },
  { name: "Codebase Graph", role: "Insight", to: "/codebase" },
  { name: "Template Library", role: "Composition", to: "/templates" },
];

const Platform = () => {
  return (
    <MarketingShell>
      <Seo title="Platform — Sherpa Studio" description="A unified automation layer combining composition, execution and observability inside a single configurable canvas." path="/platform" />

      {/* Hero */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 corner-glow-tl" />
          <div className="absolute inset-0 editorial-grid opacity-30" />
        </div>
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-xs font-medium tracking-[0.28em] uppercase text-muted-foreground">Platform · architecture</p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6 font-serif text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-tight text-foreground max-w-5xl text-balance"
          >
            One unified <em className="italic text-muted-foreground">layer</em> for every workflow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground"
          >
            The Sherpa platform combines composition, execution and observability inside a single configurable canvas. Each module is modular, permissioned and integrates cleanly with the infrastructure you already run.
          </motion.p>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-border/50 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="relative flex flex-col gap-6 rounded-3xl border border-border/60 bg-card/50 p-8 md:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium tracking-[0.24em] uppercase text-muted-foreground">{p.tag}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border">
                    <p.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight text-foreground">{p.title}</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-xl">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Overview */}
      <section className="border-t border-border/50 py-20 md:py-24 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/2 corner-glow-tr opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24 items-start">
            <div>
              <p className="text-xs font-medium tracking-[0.28em] uppercase text-muted-foreground">Modules</p>
              <h2 className="mt-4 font-serif text-4xl md:text-6xl leading-[1] tracking-tight text-foreground text-balance">
                Every part of the stack, <em className="italic text-muted-foreground">on your terms</em>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                Adopt Sherpa Studio one module at a time. Start with a single template, extend with custom skills, then wire full observability into your team’s daily operations.
              </p>
            </div>
            <div className="grid gap-3">
              {modules.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <Link
                    to={m.to}
                    className="group flex items-center justify-between rounded-2xl border border-border/60 bg-card px-6 py-5 transition-all hover:border-primary/40 hover:bg-card/80"
                  >
                    <div>
                      <span className="text-[10px] font-medium tracking-[0.24em] uppercase text-muted-foreground">{m.role}</span>
                      <h4 className="mt-1 font-serif text-2xl text-foreground">{m.name}</h4>
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors group-hover:border-primary/50 group-hover:bg-primary/10">
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
};

export default Platform;
