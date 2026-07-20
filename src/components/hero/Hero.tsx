import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 md:px-8 pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(900px 500px at 50% -10%, hsl(var(--foreground) / 0.06), transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center w-full max-w-4xl mx-auto" style={{ zIndex: 2 }}>
        {/* Announcement badge */}
        <Link
          to="/changelog"
          className="inline-flex items-center gap-2 pl-4 pr-2 py-1.5 mb-8 text-sm text-muted-foreground bg-secondary rounded-full transition-colors hover:text-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          <span>New — Sherpa AI copilot is now in Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground text-center tracking-tighter mb-6 leading-[1.05]"
        >
          Plan, track, and deliver{" "}
          <span className="text-muted-foreground">anything.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-10"
        >
          Run your daily tasks, all in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-16"
        >
          <Link
            to="/studio"
            className="inline-flex items-center px-6 py-3 text-sm font-semibold text-primary-foreground bg-primary rounded-full transition-opacity hover:opacity-90"
          >
            Get started
          </Link>
          <Link
            to="/docs/overview"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-foreground border border-border rounded-full transition-colors hover:bg-accent"
          >
            Book a demo
          </Link>
        </motion.div>

        {/* Dashboard mockup cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-5xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {mockCards.map((card, i) => (
              <div
                key={i}
                className={`rounded-xl border border-border bg-card p-4 md:p-5 ${card.className ?? ""}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full" style={{ background: card.accent }} />
                  <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{card.label}</span>
                </div>
                <div className="space-y-1.5">
                  {card.rows.map((row, ri) => (
                    <div key={ri} className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 rounded-full bg-muted" style={{ width: `${row.fill}%` }} />
                      <span className="text-[9px] font-mono text-muted-foreground/60">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const mockCards = [
  {
    label: "Kanban",
    accent: "hsl(var(--success))",
    rows: [
      { fill: 80, value: "12" },
      { fill: 45, value: "8" },
      { fill: 60, value: "5" },
      { fill: 30, value: "3" },
    ],
  },
  {
    label: "List",
    accent: "hsl(var(--info))",
    rows: [
      { fill: 100, value: "✓" },
      { fill: 70, value: "—" },
      { fill: 50, value: "▸" },
      { fill: 20, value: "○" },
    ],
  },
  {
    label: "Gantt",
    accent: "hsl(var(--warning))",
    rows: [
      { fill: 90, value: "Apr" },
      { fill: 40, value: "May" },
      { fill: 65, value: "Jun" },
      { fill: 25, value: "Jul" },
    ],
  },
  {
    label: "Ticket",
    accent: "hsl(var(--destructive))",
    rows: [
      { fill: 75, value: "P1" },
      { fill: 50, value: "P2" },
      { fill: 35, value: "P3" },
      { fill: 15, value: "P4" },
    ],
  },
];

export default Hero;
