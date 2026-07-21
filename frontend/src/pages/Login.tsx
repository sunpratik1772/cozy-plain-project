import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

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

      {/* Left cinematic panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-border/60 p-10 md:flex">
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
          <div className="absolute inset-0 editorial-grid opacity-40" />
          <div className="absolute -left-16 top-1/3 h-80 w-80 rounded-full bg-primary/25 blur-[70px] animate-glow-pulse" />
          <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-foreground/10 blur-[60px]" />
        </div>

        <Link to="/" className="flex items-center gap-2.5 w-fit">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
            <span className="font-serif text-lg italic text-background">s</span>
          </div>
          <span className="font-serif text-2xl italic tracking-tight text-foreground">sherpa</span>
          <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground/70">studio</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <p className="text-xs font-medium tracking-[0.28em] uppercase text-muted-foreground mb-6">— the sherpa manifesto</p>
          <h1 className="font-serif text-5xl lg:text-6xl leading-[1] tracking-tight text-foreground text-balance">
            Automation on <em className="italic text-muted-foreground">your</em> terms, running on <em className="italic text-muted-foreground">your</em> infrastructure.
          </h1>
          <p className="mt-6 max-w-md text-sm md:text-base leading-relaxed text-muted-foreground">
            Node-based composition, deterministic execution and full observability — all inside a single canvas.
          </p>
        </motion.div>

        <div className="flex items-center justify-between text-xs tracking-wider uppercase text-muted-foreground/70">
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
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm"
          >
            <div className="md:hidden mb-8 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
                <span className="font-serif text-lg italic text-background">s</span>
              </div>
              <span className="font-serif text-2xl italic tracking-tight text-foreground">sherpa</span>
            </div>

            <p className="text-xs font-medium tracking-[0.28em] uppercase text-muted-foreground">{mode === "signin" ? "Welcome back" : "Get started"}</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-[1] tracking-tight text-foreground">
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
                  className="h-11 rounded-lg border-border bg-transparent text-sm"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs text-muted-foreground">Password</Label>
                  {mode === "signin" && (
                    <button type="button" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Forgot?</button>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 rounded-lg border-border bg-transparent text-sm"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="group h-11 w-full gap-2 rounded-lg bg-foreground text-sm font-semibold text-background hover:opacity-90"
              >
                {submitting ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
                {!submitting && <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
              </Button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border/60" />
              <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground/70">or</span>
              <div className="h-px flex-1 bg-border/60" />
            </div>

            <button
              type="button"
              onClick={() => doSignIn("demo@sherpa.dev")}
              disabled={submitting}
              className="mt-4 group flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-60"
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
