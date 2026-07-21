import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { ParticleBurst } from "./ParticleBurst";

const fluidEase: Easing = [0.16, 1, 0.3, 1];

export function EditorialHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // Scroll-linked parallax — the hero settles and gently recedes as the
  // next section arrives, instead of cutting hard at the section boundary.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]);
  const burstScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const burstOpacity = useTransform(scrollYProgress, [0, 1], [0.8, 0.25]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-background">
      {/* Ambient motion backdrop */}
      <motion.div
        style={{ scale: burstScale, opacity: burstOpacity }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <ParticleBurst />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative h-full w-full">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: fluidEase }}
          className="hero-title absolute left-4 top-[16%] text-[15vw] font-medium text-foreground md:left-10 md:text-[11vw]"
        >
          ship
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: fluidEase }}
          className="hero-title absolute right-4 top-[37%] text-[15vw] font-medium text-foreground md:right-10 md:text-[11vw]"
        >
          your
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: fluidEase }}
          className="hero-title absolute left-[10%] top-[58%] text-[15vw] font-medium text-foreground md:left-[26%] md:text-[11vw]"
        >
          flows
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: fluidEase }}
          className="absolute left-6 top-[47%] max-w-[240px] text-[15px] leading-snug text-foreground/80 md:left-10"
        >
          Sherpa runs automations on your own infrastructure — full observability, zero cloud lock-in.
        </motion.p>

        {/* Stat — top right */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: fluidEase }}
          className="absolute right-6 top-[13%] md:right-16"
        >
          <div className="flex items-center justify-end gap-3">
            <div className="hidden h-px w-24 rotate-[20deg] bg-white/30 md:block" />
            <span className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">2.4k</span>
          </div>
          <p className="mt-1 text-right text-xs text-foreground/70 md:text-sm">GitHub stars</p>
        </motion.div>

        {/* Stat — bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: fluidEase }}
          className="absolute bottom-24 left-6 md:bottom-28 md:left-16"
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">500+</span>
            <div className="hidden h-px w-24 -rotate-[20deg] bg-white/30 md:block" />
          </div>
          <p className="mt-1 text-xs text-foreground/70 md:text-sm">Active installs</p>
        </motion.div>

        {/* Stat — bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: fluidEase }}
          className="absolute bottom-20 right-6 md:bottom-24 md:right-16"
        >
          <div className="flex items-center justify-end gap-3">
            <div className="hidden h-px w-24 -rotate-[20deg] bg-white/30 md:block" />
            <span className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">94%</span>
          </div>
          <p className="mt-1 text-right text-xs text-foreground/70 md:text-sm">Success rate</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: fluidEase }}
          className="absolute bottom-8 left-6 md:left-10"
        >
          <Link to="/login" className="btn-pill-light">
            Get started
            <span className="btn-pill-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 17 17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </motion.div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-background"
        aria-hidden
      />
    </section>
  );
}
