import { motion } from "framer-motion";
import { Star } from "lucide-react";

const fluidEase = [0.16, 1, 0.3, 1] as const;

const logos = ["Northwind Labs", "Globex Data", "Acme Systems", "Vertex Cloud"];

export function RatingSection() {
  return (
    <section className="relative border-t border-border/50 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-xs font-medium tracking-[0.28em] uppercase text-muted-foreground">Testimonials</p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: fluidEase }}
          className="mt-4 font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight text-foreground"
        >
          Trusted by teams.
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: fluidEase }}
            className="flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-8"
          >
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-6xl leading-none text-foreground">4.9</span>
              <span className="text-sm text-muted-foreground">/5</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We&rsquo;ve powered <span className="text-foreground">500+ automations</span> that keep engineering teams shipping.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border/60 pt-6">
              {logos.map((l) => (
                <span key={l} className="text-xs font-medium tracking-wide text-muted-foreground/70">{l}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: fluidEase }}
            className="flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/10 font-serif text-lg text-foreground">
                A
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Alicia Ferreira</p>
                <p className="text-xs text-muted-foreground">Head of Platform, Northwind Labs</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />
                ))}
              </div>
            </div>
            <p className="mt-6 text-base leading-relaxed text-foreground/90">
              &ldquo;We moved three data pipelines onto Sherpa in a week. Having run history and replay built in saved us from writing our own observability layer.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
