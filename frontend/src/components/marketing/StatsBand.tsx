import { motion } from "framer-motion";

const stats = [
  { value: "12k+", label: "Active developers" },
  { value: "3.6M+", label: "Workflow runs" },
  { value: "180+", label: "Curated nodes" },
  { value: "99.99%", label: "Runtime uptime" },
];

export function StatsBand() {
  return (
    <section className="relative border-y border-border/50 py-14 md:py-16 overflow-hidden">
      <div className="absolute inset-0 editorial-dot-grid opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-xs font-medium tracking-[0.28em] uppercase text-muted-foreground mb-8">Our numbers say it all</p>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <p className="font-serif text-5xl md:text-7xl leading-none tracking-tight text-foreground">{s.value}</p>
              <p className="mt-3 text-xs md:text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
