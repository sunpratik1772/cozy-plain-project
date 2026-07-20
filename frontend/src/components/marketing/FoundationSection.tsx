import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function FoundationSection() {
  return (
    <section className="relative border-t border-border/50 py-24 md:py-32">
      <div className="mx-auto max-w-[92rem] px-5 md:px-10">
        <div className="flex flex-col gap-6">
          <p className="text-xs font-medium tracking-[0.28em] uppercase text-muted-foreground">Foundation</p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight text-foreground max-w-4xl text-balance"
          >
            Built for institutional-grade engineering workflows
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-2xl text-base leading-relaxed text-muted-foreground"
          >
            Sherpa delivers a unified automation layer combining node composition, execution and observability inside a single configurable canvas. Every module is modular and designed for control, letting teams define workflows, permissions and execution logic while integrating with existing systems.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-2"
          >
            <Link to="/platform" className="inline-flex items-center gap-2 text-sm font-medium text-foreground group">
              The Platform
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border transition-colors group-hover:bg-foreground group-hover:text-background">
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
