import { Link } from "react-router-dom";
import { motion, type Easing } from "framer-motion";
import { ParticleBurst } from "./ParticleBurst";

const fluidEase: Easing = [0.16, 1, 0.3, 1];

export function EditorialHero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-background pt-16">
      {/* Ambient motion backdrop */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-80" aria-hidden>
        <ParticleBurst />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-16 pt-10 md:px-8 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: fluidEase }}
          className="ml-auto flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-foreground/70"
        >
          Scroll down
        </motion.p>

        <div className="flex-1" />

        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: fluidEase }}
            className="text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Ship automation your infrastructure actually owns
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: fluidEase }}
            className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg"
          >
            Sherpa runs automations on your own infrastructure — full observability, zero cloud lock-in.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: fluidEase }}
            className="mt-9"
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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: fluidEase }}
            className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/20 pt-6"
          >
            <Stat value="2.4k" label="GitHub stars" />
            <Stat value="500+" label="Active installs" />
            <Stat value="94%" label="Success rate" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">{value}</p>
      <p className="mt-0.5 text-xs text-foreground/70 md:text-sm">{label}</p>
    </div>
  );
}
