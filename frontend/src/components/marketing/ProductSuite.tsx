import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Boxes, GitGraph, LayoutTemplate, Puzzle, Workflow, History, Zap, Database } from "lucide-react";

const products = [
  { cat: "Canvas", title: "Studio", desc: "Node-based automation canvas with typed ports, live status and Sherpa AI copilot.", icon: Workflow, to: "/studio" },
  { cat: "Composition", title: "Templates", desc: "Production-ready workflow blueprints you can clone, adapt and ship in minutes.", icon: LayoutTemplate, to: "/templates" },
  { cat: "Extensions", title: "Skills", desc: "Custom logic nodes written in Python, TypeScript or WASM. Fully sandboxed execution.", icon: Puzzle, to: "/skills" },
  { cat: "Scheduling", title: "Automations", desc: "Triggers, crons and file-watchers that fire your flows when the world changes.", icon: Zap, to: "/automations" },
  { cat: "Observability", title: "Run History", desc: "Every execution, input, output and error tracked in real-time and searchable.", icon: History, to: "/runs" },
  { cat: "Insight", title: "Codebase", desc: "A live dependency graph of your entire automation surface — from nodes to secrets.", icon: GitGraph, to: "/codebase" },
  { cat: "Data", title: "Sources", desc: "Connect Postgres, Mongo, S3, local folders and REST APIs. Data stays where it lives.", icon: Database, to: "/dashboard" },
  { cat: "Primitives", title: "Nodes", desc: "200+ curated primitives covering LLMs, files, HTTP, transforms and integrations.", icon: Boxes, to: "/dashboard" },
];

export function ProductSuite() {
  return (
    <section className="relative border-t border-border/50 py-24 md:py-32">
      <div className="mx-auto max-w-[92rem] px-5 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.28em] uppercase text-muted-foreground">Product Suite</p>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl leading-[1] tracking-tight text-foreground max-w-3xl text-balance">
              A complete set of  <em className="italic text-muted-foreground">customisable</em>  primitives
            </h2>
          </div>
          <Link to="/features" className="inline-flex items-center gap-2 text-sm font-medium text-foreground group">
            Discover features
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border transition-colors group-hover:bg-foreground group-hover:text-background">
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            >
              <Link
                to={p.to}
                className="group relative flex h-full flex-col gap-6 rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_10px_40px_-12px_hsl(var(--primary)/0.35)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium tracking-[0.24em] uppercase text-muted-foreground">{p.cat}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border transition-colors group-hover:border-primary/50 group-hover:bg-primary/10">
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </span>
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border/60 bg-secondary/50">
                  <div className="absolute inset-0 editorial-dot-grid opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background/70 backdrop-blur-sm">
                      <p.icon className="h-7 w-7 text-foreground" strokeWidth={1.4} />
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 corner-glow-tr" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
