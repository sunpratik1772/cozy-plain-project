import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Sparkles, Workflow } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
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
    <div className="relative flex min-h-screen w-full overflow-hidden bg-background text-foreground">
      <Seo title="Sign in — Sherpa Studio" description="Sign in to your Sherpa Studio workspace." path="/login" />

      {/* Left panel — same brand chrome as the app shell (sidebar mark, purple accent, dot grid) */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-border bg-sidebar p-10 md:flex">
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 emt-grid-bg opacity-60" />
          <div className="absolute inset-0 corner-glow-tl" />
        </div>

        <Link to="/" className="flex w-fit items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground">
            <span className="text-sm font-bold leading-none text-background">S</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">sherpa</span>
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/70">studio</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-primary">Local-first automation</p>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground lg:text-5xl">
            Automation on your terms, running on your infrastructure.
          </h1>
          <div className="mt-8 space-y-3">
            {pillars.map((p) => (
              <div key={p.text} className="emt-card flex items-start gap-3 p-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-primary">
                  <p.icon className="h-3.5 w-3.5" />
                </div>
                <p className="pt-0.5 text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground/70">
          <span>v2.0 · local first</span>
          <div className="flex items-center gap-4">
            <span>SOC 2</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>Open source</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>Self-hosted</span>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="relative flex w-full flex-col md:w-1/2">
        <div className="flex h-16 items-center justify-between px-6 md:px-10">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back home
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-10 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm"
          >
            <div className="mb-8 flex items-center gap-2.5 md:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground">
                <span className="text-sm font-bold leading-none text-background">S</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">sherpa</span>
            </div>

            <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">{mode === "signin" ? "Welcome back" : "Get started"}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {mode === "signin" ? "Sign in" : "Create account"}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {mode === "signin" ? "Continue to your Sherpa workspace." : "Start orchestrating automations in one place."}
            </p>

            <form onSubmit={submit} className="mt-8 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-10 bg-background text-sm"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs text-muted-foreground">Password</Label>
                  {mode === "signin" && (
                    <button type="button" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Forgot?</button>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-10 bg-background text-sm"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                />
              </div>
              <Button type="submit" disabled={submitting} className="group h-10 w-full gap-2 text-sm font-semibold">
                {submitting ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
                {!submitting && <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
              </Button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <button
              type="button"
              onClick={() => doSignIn("demo@sherpa.dev")}
              disabled={submitting}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-ring/40 hover:bg-accent disabled:opacity-60"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Continue as demo user
            </button>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Auth is dummy mode — any credentials sign you in.
            </p>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "signin" ? "New to Sherpa? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                {mode === "signin" ? "Create an account" : "Sign in"}
              </button>
            </p>

            <p className="mt-8 text-center text-[11px] text-muted-foreground">
              By continuing you agree to the Sherpa workspace terms.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
