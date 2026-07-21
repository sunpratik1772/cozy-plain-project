import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function EditorialHero() {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden pt-24">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 corner-glow-tr" />
        <div className="absolute inset-0 editorial-grid opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-8 pb-14 md:pb-20">
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-8 bg-foreground/40" />
            <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-muted-foreground">Sherpa Studio · v2.0</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
            className="font-serif text-[clamp(2.75rem,8vw,8rem)] leading-[0.9] tracking-[-0.03em] text-foreground max-w-5xl text-balance"
          >
            Local-first Automation <em className="italic text-muted-foreground">for power</em> engineering teams
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-lg text-sm md:text-base leading-relaxed text-muted-foreground">
              Sherpa is an open, node-based workflow platform that runs directly on your infrastructure. Compose, execute and observe automations with full transparency &mdash; no cloud lock-in.
            </p>

            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                Get started
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/platform"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Explore platform
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-2 flex items-center justify-between border-t border-border/50 pt-5"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ArrowDown className="h-3 w-3 animate-glow-pulse" />
              scroll to explore
            </div>
            <div className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.18em] uppercase text-muted-foreground/70">
              <span>2.4k stars</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span>500+ active installs</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span>Open source</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
