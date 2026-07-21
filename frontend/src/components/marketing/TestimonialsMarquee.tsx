import { motion } from "framer-motion";

const tweets = [
  { name: "Flora Schuler", handle: "@floraFlawa", text: "i'm using @sherpa to get access to some of the best automation features in the market, you should try it too" },
  { name: "OneBadDev", handle: "@elidecodes", text: "been using @sherpa to automate my podcast post-prod flow. local triggers + ffmpeg scripts = chef's kiss" },
  { name: "John Robert", handle: "@scripteddev", text: "@sherpa is already part of my daily toolkit. Local folder watcher → python script → discord alert. Took 2 mins to set up." },
  { name: "CodeNinja", handle: "@sysninja", text: "Can't believe how fast @sherpa runs. It's like Zapier if it respected your privacy and your CPU." },
  { name: "Tusmah", handle: "@ananenu1", text: "Made a Sherpa flow that watches my screenshot folder and auto-saves new captures to Notion. Didn't touch the cloud once." },
  { name: "Liam Stone", handle: "@liam.codes", text: "Sherpa completely changed how I debug and monitor workflows. It's like a second brain for automation." },
];

export function TestimonialsMarquee() {
  return (
    <section className="relative border-t border-border/50 py-20 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 md:px-8 mb-14">
        <p className="text-xs font-medium tracking-[0.28em] uppercase text-muted-foreground">Loved by builders</p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-4 font-serif text-4xl md:text-6xl leading-[1] tracking-tight text-foreground max-w-3xl text-balance"
        >
          Real automation <em className="italic text-muted-foreground">for control</em> freaks
        </motion.h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
        <div className="flex gap-4 animate-marquee" style={{ width: "max-content" }}>
          {[...tweets, ...tweets].map((t, i) => (
            <div key={i} className="flex w-[380px] shrink-0 flex-col gap-3 rounded-2xl border border-border/70 bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/10 font-serif text-base text-foreground">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.handle}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">{t.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
        <div className="flex gap-4 animate-marquee-reverse" style={{ width: "max-content" }}>
          {[...tweets.slice().reverse(), ...tweets.slice().reverse()].map((t, i) => (
            <div key={i} className="flex w-[380px] shrink-0 flex-col gap-3 rounded-2xl border border-border/70 bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/10 font-serif text-base text-foreground">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.handle}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
