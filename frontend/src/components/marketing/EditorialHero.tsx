import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function EditorialHero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden pt-24">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 corner-glow-tr" />
        <div className="absolute inset-0 editorial-grid opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[92rem] px-5 md:px-10 pb-16 md:pb-24">
        <div className="flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-10 bg-foreground/40" />
            <span className="text-xs font-medium tracking-[0.28em] uppercase text-muted-foreground">Sherpa Studio · v2.0</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
            className="font-serif text-[clamp(3rem,10vw,10rem)] leading-[0.9] tracking-tight text-foreground max-w-6xl text-balance"
          >
            Local-first Automation <em className="italic text-muted-foreground">for power</em> engineering teams
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
              Sherpa is an open, node-based workflow platform that runs directly on your infrastructure. Compose, execute and observe automations with full transparency &mdash; no cloud lock-in.
            </p>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-85"
              >
                Get started
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/platform"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Explore platform
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-4 flex items-center justify-between border-t border-border/50 pt-6"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ArrowDown className="h-3.5 w-3.5 animate-glow-pulse" />
              scroll to explore
            </div>
            <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase text-muted-foreground/70">
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
