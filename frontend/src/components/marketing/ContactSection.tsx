import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Zap, ListChecks } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const fluidEase = [0.16, 1, 0.3, 1] as const;

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [newsletter, setNewsletter] = useState({ name: "", email: "" });

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    toast.success("Message sent — we'll get back to you shortly.");
    setForm({ name: "", email: "", message: "" });
  };

  const submitNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletter.email) return;
    toast.success("Subscribed to the Sherpa newsletter.");
    setNewsletter({ name: "", email: "" });
  };

  return (
    <>
      <section className="relative py-4 md:py-6">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: fluidEase }}
            className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-14 text-background md:px-12 md:py-16"
          >
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-40" style={{ backgroundImage: "radial-gradient(560px 400px at 100% 0%, hsl(var(--primary) / 0.4), transparent 65%)" }} aria-hidden />
            <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="font-serif text-6xl leading-[0.9] tracking-tight md:text-7xl">Let&rsquo;s talk.</h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-background/70">
                  Tell us about your project &mdash; whether it&rsquo;s a new pipeline, an AI-assisted workflow, or migrating off spreadsheets.
                </p>

                <div className="mt-10 grid grid-cols-2 gap-6 border-t border-background/15 pt-8">
                  <div>
                    <Zap className="h-4 w-4 text-background/70" />
                    <p className="mt-3 text-sm font-medium">Quick response.</p>
                    <p className="mt-1 text-xs leading-relaxed text-background/60">If you&rsquo;re ready to build, we&rsquo;d love to hear from you.</p>
                  </div>
                  <div>
                    <ListChecks className="h-4 w-4 text-background/70" />
                    <p className="mt-3 text-sm font-medium">Clear next steps.</p>
                    <p className="mt-1 text-xs leading-relaxed text-background/60">After a quick call, we&rsquo;ll send a scoped plan and timeline.</p>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3 rounded-2xl bg-background/10 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-background/20 font-serif text-lg">L</div>
                  <div>
                    <p className="text-xs text-background/60">Team Lead at Sherpa</p>
                    <p className="text-sm font-medium">Lauren Thompson</p>
                  </div>
                </div>
              </div>

              <form onSubmit={submitContact} className="rounded-2xl bg-background p-6 text-foreground md:p-8">
                <p className="text-sm font-medium text-muted-foreground">Sherpa Studio</p>
                <h3 className="mt-1 text-2xl font-semibold">Have a project in mind?</h3>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Your name*</label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Jordan Lee"
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">E-mail*</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@company.com"
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Message</label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="What are you looking to automate?"
                      className="mt-1.5"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full rounded-full">Send message</Button>
                  <p className="text-center text-xs text-muted-foreground">By submitting, you agree to our Terms and Privacy Policy.</p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-border/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-2xl leading-snug text-muted-foreground md:text-3xl">
                Whether you&rsquo;re looking to automate a pipeline, ship an AI-assisted workflow, or migrate off scripts &mdash;{" "}
                <span className="font-medium text-foreground">we&rsquo;re here to help.</span>
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/10 font-serif text-base text-foreground">G</div>
                <div>
                  <p className="text-sm font-medium text-foreground">George Stern</p>
                  <p className="text-xs text-muted-foreground">Client Success Manager</p>
                </div>
              </div>
            </div>

            <form onSubmit={submitNewsletter} className="rounded-2xl border border-border/70 bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground">Newsletter</h3>
              <div className="mt-4 space-y-3">
                <Input
                  value={newsletter.name}
                  onChange={(e) => setNewsletter((n) => ({ ...n, name: e.target.value }))}
                  placeholder="Your name"
                />
                <Input
                  type="email"
                  value={newsletter.email}
                  onChange={(e) => setNewsletter((n) => ({ ...n, email: e.target.value }))}
                  placeholder="Email"
                  required
                />
                <Button type="submit" className="w-full rounded-full">Subscribe</Button>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Join the list and stay updated on the latest in workflow automation.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
