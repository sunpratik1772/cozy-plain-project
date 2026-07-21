import { Link } from "react-router-dom";
import { motion, type Easing } from "framer-motion";
import { ParticleBurst } from "./ParticleBurst";

const fluidEase: Easing = [0.16, 1, 0.3, 1];

export function EditorialHero() {
  return (
    <section className="c8-scope relative h-screen w-full overflow-hidden bg-[hsl(var(--c8-blue))]">
      {/* Ambient motion backdrop — stands in for a hero video */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70" aria-hidden>
        <ParticleBurst className="translate-y-6" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 50% 40%, hsl(var(--c8-blue) / 0) 0%, hsl(var(--c8-blue)) 75%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-background"
        aria-hidden
      />

      <div className="relative h-full w-full">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: fluidEase }}
          className="hero-title absolute left-4 top-[16%] text-[15vw] font-medium text-white md:left-10 md:text-[11vw]"
        >
          ship
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: fluidEase }}
          className="hero-title absolute right-4 top-[37%] text-[15vw] font-medium text-white md:right-10 md:text-[11vw]"
        >
          your
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: fluidEase }}
          className="hero-title absolute left-[10%] top-[58%] text-[15vw] font-medium text-white md:left-[26%] md:text-[11vw]"
        >
          flows
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: fluidEase }}
          className="absolute left-6 top-[47%] max-w-[240px] text-[15px] leading-snug text-white/90 md:left-10"
        >
          sherpa runs automations on your own infrastructure — full observability, zero cloud lock-in.
        </motion.p>

        {/* Stat — top right */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: fluidEase }}
          className="absolute right-6 top-[13%] md:right-16"
        >
          <div className="flex items-center justify-end gap-3">
            <div className="hidden h-px w-24 rotate-[20deg] bg-white/40 md:block" />
            <span className="text-4xl font-medium tracking-tight text-white md:text-5xl">2.4k</span>
          </div>
          <p className="mt-1 text-right text-xs text-white/70 md:text-sm">github stars</p>
        </motion.div>

        {/* Stat — bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: fluidEase }}
          className="absolute bottom-24 left-6 md:bottom-28 md:left-16"
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl font-medium tracking-tight text-white md:text-5xl">500+</span>
            <div className="hidden h-px w-24 -rotate-[20deg] bg-white/40 md:block" />
          </div>
          <p className="mt-1 text-xs text-white/70 md:text-sm">active installs</p>
        </motion.div>

        {/* Stat — bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: fluidEase }}
          className="absolute bottom-20 right-6 md:bottom-24 md:right-16"
        >
          <div className="flex items-center justify-end gap-3">
            <div className="hidden h-px w-24 -rotate-[20deg] bg-white/40 md:block" />
            <span className="text-4xl font-medium tracking-tight text-white md:text-5xl">94%</span>
          </div>
          <p className="mt-1 text-right text-xs text-white/70 md:text-sm">success rate</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: fluidEase }}
          className="absolute bottom-8 left-6 md:left-10"
        >
          <Link to="/login" className="btn-pill-light">
            get started
            <span className="btn-pill-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 17 17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
