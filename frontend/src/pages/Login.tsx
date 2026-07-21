import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Sparkles, Workflow } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ParticleBurst } from "@/components/marketing/ParticleBurst";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const pillars = [
  { icon: Workflow, text: "Node-based composition — every automation is an explicit, inspectable graph" },
  { icon: Sparkles, text: "Ask Sherpa to build, fix or explain any workflow in plain language" },
];

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Dummy sign-in: any submission (or the "Continue as demo" button)
  // signs the user in as a demo user. Real auth is intentionally stubbed
  // until Supabase is configured — this keeps preview environments unblocked.
  const doSignIn = async (emailOverride?: string) => {
    setSubmitting(true);
    try {
      const finalEmail = (emailOverride ?? email).trim() || "demo@sherpa.dev";
      await signIn(finalEmail, password || "sherpa-demo");
      toast.success("Signed in");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setSubmitting(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await doSignIn();
  };

  return (
    <div className="c8-scope relative flex min-h-screen w-full flex-col overflow-hidden bg-background text-foreground">
      <Seo title="Sign in — Sherpa Studio" description="Sign in to your Sherpa Studio workspace." path="/login" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-start opacity-40" aria-hidden>
        <ParticleBurst className="-ml-40 max-w-[640px] md:-ml-20" />
      </div>

      <div className="relative flex h-16 shrink-0 items-center justify-between px-6 md:px-10">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80 transition-colors hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back home
        </Link>
        <ThemeToggle className="text-foreground hover:bg-white/10 hover:text-foreground" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center gap-14 px-6 pb-16 pt-6 md:flex-row md:items-center md:gap-16 md:px-10">
        {/* Pitch column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md md:flex-1"
        >
          <Link to="/" className="mb-8 flex w-fit items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="text-sm font-bold leading-none text-primary-foreground">S</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">sherpa</span>
          </Link>

          <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-foreground/70">Local-first automation</p>
          <h1 className="text-4xl font-medium leading-[1.05] tracking-tight text-foreground lg:text-5xl">
            Automation on your terms, running on your infrastructure.
          </h1>

          <div className="mt-8 space-y-3">
            {pillars.map((p) => (
              <div key={p.text} className="flex items-start gap-3 rounded-lg border border-white/20 bg-white/5 p-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/10 text-foreground">
                  <p.icon className="h-3.5 w-3.5" />
                </div>
                <p className="pt-0.5 text-sm text-foreground/80">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 hidden items-center gap-4 text-xs uppercase tracking-wider text-foreground/60 md:flex">
            <span>SOC 2</span>
            <span className="h-1 w-1 rounded-full bg-foreground/30" />
            <span>Open source</span>
            <span className="h-1 w-1 rounded-full bg-foreground/30" />
            <span>Self-hosted</span>
          </div>
        </motion.div>

        {/* Form column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/[0.07] p-7 backdrop-blur-sm md:flex-1"
        >
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-foreground/70">
            {mode === "signin" ? "Welcome back" : "Get started"}
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground">
            {mode === "signin" ? "Sign in" : "Create account"}
          </h2>
          <p className="mt-3 text-sm text-foreground/70">
            {mode === "signin" ? "Continue to your Sherpa workspace." : "Start orchestrating automations in one place."}
          </p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs text-foreground/70">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-10 border-white/25 bg-white/10 text-sm text-foreground placeholder:text-foreground/40"
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs text-foreground/70">Password</Label>
                {mode === "signin" && (
                  <button type="button" className="text-xs text-foreground/70 transition-colors hover:text-foreground">Forgot?</button>
                )}
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-10 border-white/25 bg-white/10 text-sm text-foreground placeholder:text-foreground/40"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-pill-light w-full justify-center rounded-lg py-2.5"
            >
              {submitting ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
              {!submitting && <ArrowUpRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-foreground/60">or</span>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          <button
            type="button"
            onClick={() => doSignIn("demo@sherpa.dev")}
            disabled={submitting}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/10 disabled:opacity-60"
          >
            <Sparkles className="h-4 w-4" />
            Continue as demo user
          </button>
          <p className="mt-2 text-center text-[11px] text-foreground/60">
            Auth is dummy mode — any credentials sign you in.
          </p>

          <p className="mt-6 text-center text-sm text-foreground/70">
            {mode === "signin" ? "New to Sherpa? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="font-semibold text-foreground underline-offset-4 hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
