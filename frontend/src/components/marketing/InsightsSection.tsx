import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const fluidEase = [0.16, 1, 0.3, 1] as const;

const posts = [
  { date: "Jul 8, 2026", title: "Sherpa now plans before it builds", desc: "New workflow builds go through a plan-first gate before touching the canvas." },
  { date: "Jun 2, 2026", title: "Search the node palette with ⌘K", desc: "Instant fuzzy search across all node types, right from the canvas." },
];

export function InsightsSection() {
  return (
    <section className="relative border-t border-border/50 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: fluidEase }}
            className="font-serif text-4xl leading-[1] tracking-tight text-foreground md:text-6xl max-w-lg text-balance"
          >
            Latest from the <em className="italic text-muted-foreground">changelog</em>
          </motion.h2>
          <Link
            to="/changelog"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            See all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
          {posts.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: fluidEase }}
            >
              <Link
                to="/changelog"
                className="group flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 transition-colors hover:border-primary/40"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border/60 bg-secondary/50">
                  <div className="absolute inset-0 editorial-dot-grid opacity-50" />
                  <div className="absolute inset-0 corner-glow-tr opacity-60" />
                </div>
                <p className="text-xs text-muted-foreground">{p.date}</p>
                <h3 className="text-lg font-medium leading-snug text-foreground">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.16, ease: fluidEase }}
          >
            <Link
              to="/changelog"
              className="group relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl border border-border/70 bg-foreground p-6 text-background"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.5),transparent_60%)]" />
              <p className="relative text-xs uppercase tracking-[0.2em] text-background/60">Sherpa</p>
              <p className="relative mt-3 text-2xl font-medium leading-tight">What&rsquo;s new in automation?</p>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
