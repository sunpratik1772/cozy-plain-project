import { Link } from "react-router-dom";
import { motion, type Easing } from "framer-motion";
import { AuroraBackground } from "./AuroraBackground";

const fluidEase: Easing = [0.16, 1, 0.3, 1];

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroConfig {
  eyebrow: string;
  /** Three short lowercase words, positioned in a staggered diagonal. */
  words: [string, string, string];
  description: string;
  /** [top-right, bottom-left, bottom-right] */
  stats: [HeroStat, HeroStat, HeroStat];
  ctaLabel: string;
  ctaTo: string;
}

const wordSlots = [
  "left-4 top-[17%] md:left-10",
  "right-4 top-[37%] md:right-10",
  "left-[8%] top-[57%] md:left-[24%]",
];

export function HeroPage({ config }: { config: HeroConfig }) {
  const { eyebrow, words, description, stats, ctaLabel, ctaTo } = config;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AuroraBackground />

      <div className="relative h-full w-full">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: fluidEase }}
          className="absolute left-6 top-[13%] text-[11px] font-medium uppercase tracking-[0.28em] text-white/60 md:left-10"
        >
          {eyebrow}
        </motion.p>

        {/* Staggered headline words */}
        {words.map((word, i) => (
          <motion.h1
            key={word + i}
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.13, ease: fluidEase }}
            className={`hero-title absolute text-[15vw] font-medium text-white md:text-[12vw] ${wordSlots[i]}`}
          >
            {word}
          </motion.h1>
        ))}

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: fluidEase }}
          className="absolute left-6 top-[45%] max-w-[240px] text-[15px] leading-snug text-white/80 md:left-10"
        >
          {description}
        </motion.p>

        {/* CTA — hidden on mobile (the nav CTA covers small screens, avoiding
            a collision with the lowest headline word) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: fluidEase }}
          className="absolute left-6 top-[45%] mt-24 hidden sm:block md:left-10"
        >
          <Link
            to={ctaTo}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.04]"
            style={{ transitionTimingFunction: "var(--ease-fluid)" }}
          >
            {ctaLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M7 17 17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        {/* Stat — top right */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: fluidEase }}
          className="absolute right-6 top-[13%] md:right-16"
        >
          <div className="flex items-center justify-end gap-3">
            <span className="hidden h-px w-24 rotate-[20deg] bg-white/40 md:block" />
            <span className="text-4xl font-medium tracking-tight text-white md:text-5xl">{stats[0].value}</span>
          </div>
          <p className="mt-1 text-right text-xs text-white/70 md:text-sm">{stats[0].label}</p>
        </motion.div>

        {/* Stat — bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: fluidEase }}
          className="absolute bottom-20 left-6 md:bottom-24 md:left-16"
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl font-medium tracking-tight text-white md:text-5xl">{stats[1].value}</span>
            <span className="hidden h-px w-24 -rotate-[20deg] bg-white/40 md:block" />
          </div>
          <p className="mt-1 text-xs text-white/70 md:text-sm">{stats[1].label}</p>
        </motion.div>

        {/* Stat — bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15, ease: fluidEase }}
          className="absolute bottom-16 right-6 md:bottom-20 md:right-16"
        >
          <div className="flex items-center justify-end gap-3">
            <span className="hidden h-px w-24 -rotate-[20deg] bg-white/40 md:block" />
            <span className="text-4xl font-medium tracking-tight text-white md:text-5xl">{stats[2].value}</span>
          </div>
          <p className="mt-1 text-right text-xs text-white/70 md:text-sm">{stats[2].label}</p>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-background"
        aria-hidden
      />
    </section>
  );
}
