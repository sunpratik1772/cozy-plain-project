import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

const features = [
  {
    eyebrow: "Features",
    title: "A complete set of tools to support your daily tasks",
    subtitle: "Meet Sherpa. The platform to manage tasks, hit deadlines, and keep your team moving faster.",
    items: [
      { title: "Oversee every project", desc: "Get the full picture across teams and goals.", inside: ["Project health", "Team visibility", "Goal tracking", "Progress reports"] },
      { title: "Visualize your work", desc: "Manage tasks and priorities at a glance.", inside: ["Drag and drop", "Custom columns", "Task labels", "Live updates"] },
      { title: "Structure your tasks", desc: "Track every detail with full context and control.", inside: ["Inline editing", "Smart filters", "Custom grouping", "Bulk actions"] },
      { title: "Plan your timeline", desc: "Map dependencies and milestones across time.", inside: ["Task dependencies", "Milestone markers", "Date ranges", "Team capacity"] },
    ],
  },
];

const marqueeItems = [
  "Assign, track, deliver",
  "All from a single workspace",
  "Assign, track, deliver",
  "All from a single workspace",
  "Assign, track, deliver",
  "All from a single workspace",
];

const steps = [
  { num: "01", title: "Create a task", desc: "Name it, describe it, set a due date, and assign it to the right person in seconds." },
  { num: "02", title: "Track the progress", desc: "Tasks update in real time as your team works. No check-ins, no status emails." },
  { num: "03", title: "Review and ship", desc: "Once the work is done, review it, mark it complete, and keep the project moving." },
];

const testimonials = [
  { quote: "The platform is clear and reliable. It reduced manual work and made our processes easier to manage and follow.", name: "James B.", role: "Product Manager" },
  { quote: "We use it every day to automate tasks and track performance. It saves time and helps the team stay focused on important work.", name: "Emily K.", role: "Project Manager" },
  { quote: "The platform is clear and reliable. It reduced manual work and made our processes easier to manage and follow.", name: "Daniel P.", role: "Founder" },
  { quote: "Content creation, automation, and reporting are now handled in one tool. It simplified our workflow and improved how we work as a team.", name: "Sarah M.", role: "Marketing Director" },
];

const security = [
  { title: "GDPR Compliant", desc: "Your data stays private, protected, and fully under your control." },
  { title: "SOC 2 certified", desc: "Built on security standards trusted by thousands of companies." },
];

const plans = [
  { name: "Starter", tagline: "For individuals", price: "$29", period: "per month", billed: "billed yearly", cta: "Get started", features: ["2 projects", "1 member", "500 Go", "5 integrations"], popular: false },
  { name: "Pro", tagline: "For growing professionals", price: "$49", period: "per month", billed: "billed yearly", cta: "Get started", features: ["10 projects", "5 members", "1 To", "15 integrations"], popular: true },
  { name: "Team", tagline: "For established teams", price: "Custom", period: "", billed: "", cta: "Contact sales", features: ["Unlimited projects", "Unlimited members", "5 To", "25 integrations"], popular: false },
];

const roadmap = [
  { title: "Gantt view", desc: "Plan projects across time with full dependency support.", date: "Apr, 2026" },
  { title: "Bulk actions", desc: "Bulk actions, better filters, and smarter grouping.", date: "May, 2026" },
  { title: "Project dashboard", desc: "See everything across all your projects in one view.", date: "Jun, 2026" },
  { title: "Board and list views", desc: "Two ways to work, one unified workspace.", date: "Aug, 2026" },
];

export function Features() {
  return (
    <>
      {/* Intro + alternating feature sections */}
      <section className="px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-medium text-muted-foreground mb-3">{features[0].eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground max-w-3xl mb-4">
            {features[0].title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mb-16">
            {features[0].subtitle}
          </p>

          <div className="space-y-20 md:space-y-32">
            {features[0].items.map((item, i) => (
              <FeatureRow key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee band */}
      <div className="border-y border-border bg-secondary py-5 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {[...marqueeItems, ...marqueeItems].map((text, i) => (
            <span key={i} className="text-2xl md:text-3xl font-bold tracking-tight text-foreground/80 flex items-center gap-12">
              {text}
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
            </span>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section className="px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-medium text-muted-foreground mb-3">Process</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-16">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-muted-foreground/30">{step.num}</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 md:px-8 py-16 md:py-24 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="flex flex-col gap-4 p-6 md:p-8 bg-background border border-border rounded-2xl"
              >
                <p className="text-base md:text-lg text-foreground leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center text-sm font-semibold text-foreground">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-medium text-muted-foreground mb-3">Security</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-16">Protection from day one</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {security.map((s, i) => (
              <div key={i} className="flex flex-col gap-2 p-6 md:p-8 border border-border rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <Check className="h-5 w-5 text-success" />
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 md:px-8 py-16 md:py-24 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-medium text-muted-foreground mb-3">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-3">Choose your plan</h2>
          <p className="text-lg text-muted-foreground mb-10">Flexible plans to keep teams organized and projects on track.</p>

          <div className="flex items-center gap-3 mb-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border text-sm font-medium text-foreground">
              Yearly
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground">
              Monthly
            </div>
            <span className="text-xs text-success font-medium">Save 30% on a yearly subscription</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative flex flex-col p-6 md:p-8 rounded-2xl border transition-colors ${
                  plan.popular
                    ? "border-foreground bg-background"
                    : "border-border bg-background hover:border-muted-foreground/30"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-6 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground bg-primary rounded-full">
                    Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.tagline}</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                </div>
                {plan.billed && <p className="text-xs text-muted-foreground mb-6">{plan.billed}</p>}
                <div className="mt-auto">
                  <a
                    href="#"
                    className={`flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "border border-border text-foreground hover:bg-accent"
                    }`}
                  >
                    {plan.cta}
                  </a>
                  <ul className="mt-6 space-y-2.5">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-success shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Free 7 day trial</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Cancel anytime</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Secure Payments — SSL encryption</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> 24/7 Support — Live chat</span>
          </div>
        </div>
      </section>

      {/* Changelog / Roadmap */}
      <section className="px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-medium text-muted-foreground mb-3">Changelog</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-16">What's on the roadmap.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmap.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col gap-3 p-5 border border-border rounded-2xl hover:border-muted-foreground/30 transition-colors"
              >
                <span className="text-xs text-muted-foreground">{item.date}</span>
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground mt-auto" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureRow({ item, index }: { item: { title: string; desc: string; inside: string[] }; index: number }) {
  const isReversed = index % 2 === 1;
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${isReversed ? "md:[direction:rtl]" : ""}`}>
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="[direction:ltr]"
      >
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">{item.title}</h3>
        <p className="text-base md:text-lg text-muted-foreground mb-6">{item.desc}</p>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">What's inside</p>
        <ul className="grid grid-cols-2 gap-2">
          {item.inside.map((label, li) => (
            <li key={li} className="flex items-center gap-2 text-sm text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
              {label}
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: isReversed ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="[direction:ltr]"
      >
        <FeatureMockup title={item.title} inside={item.inside} />
      </motion.div>
    </div>
  );
}

function FeatureMockup({ title, inside }: { title: string; inside: string[] }) {
  return (
    <div className="relative rounded-2xl border border-border bg-card overflow-hidden p-6 min-h-[280px]">
      <div className="absolute inset-0 emt-grid-bg opacity-30" />
      <div className="relative flex flex-col gap-4 h-full" style={{ zIndex: 1 }}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
          </div>
          <span className="text-xs font-medium text-muted-foreground ml-2">{title}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 flex-1">
          {inside.map((label, i) => (
            <div key={i} className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-background/50">
              <div className="h-1.5 w-2/3 rounded-full bg-muted" />
              <div className="h-1 w-full rounded-full bg-muted/60" />
              <div className="h-1 w-1/2 rounded-full bg-muted/40" />
              <span className="text-[10px] text-muted-foreground mt-auto">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
