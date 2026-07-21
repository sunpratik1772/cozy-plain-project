import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, type Easing } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const fluidEase: Easing = [0.16, 1, 0.3, 1];

const trustMarkers = ["Governed", "Auditable", "Self-hosted"];

type FlowNode = { label: string; sub: string; active?: boolean };

const flowNodes: FlowNode[] = [
  { label: "SQL Database", sub: "Source" },
  { label: "Trade Data", sub: "Ingest" },
  { label: "AI Agent", sub: "Analyze", active: true },
  { label: "Approval", sub: "Governance" },
  { label: "Generate Report", sub: "Output" },
];

/** Minimal workflow chain — the product itself as imagery, styled for a
 * black panel. Each node and connector enters once in sequence (a state
 * change, not a decoration); the only ongoing motion is a slow breathing
 * glow on the active node, reusing the existing glow-pulse animation. */
function WorkflowPreview() {
  return (
    <div className="w-full max-w-[280px]" aria-hidden>
      {flowNodes.map((node, i) => (
        <div key={node.label}>
          {i > 0 && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.22, ease: fluidEase }}
              style={{ transformOrigin: "top" }}
              className="ml-4 h-5 w-px bg-white/15"
            />
          )}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.22, ease: fluidEase }}
            className="flex items-center gap-3"
          >
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
              {node.active && (
                <span className="absolute inset-0 animate-glow-pulse rounded-md bg-[#2E6BFF]/45 blur-md" />
              )}
              <div
                className={`relative h-2 w-2 rounded-full ${node.active ? "bg-[#2E6BFF]" : "bg-white/30"}`}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-white/90">{node.label}</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">{node.sub}</p>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

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
    <div className="login-scope relative flex min-h-screen w-full flex-col bg-background text-foreground">
      <Seo title="Sign in — dbSherpa Studio" description="Sign in to your dbSherpa Studio workspace." path="/login" />

      <div className="relative flex h-16 shrink-0 items-center justify-between border-b border-border px-6 md:px-10">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
            <span className="text-[10px] font-bold leading-none text-primary-foreground">S</span>
          </div>
          <span className="text-sm font-medium tracking-tight text-foreground">dbSherpa Studio</span>
        </Link>
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/50 transition-colors hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back home
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-10 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: fluidEase }}
          className="grid w-full grid-cols-1 gap-10 rounded-[28px] p-6 md:grid-cols-2 md:gap-16 md:p-14"
          style={{ backgroundColor: "hsl(var(--panel))", color: "hsl(var(--panel-foreground))" }}
        >
          {/* Form card */}
          <div className="order-1 w-full max-w-sm rounded-2xl bg-card p-8 text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.06)] md:order-none">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-foreground/40">
              {mode === "signin" ? "Welcome back" : "Get started"}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              {mode === "signin" ? "Sign in." : "Create account."}
            </h2>
            <p className="mt-3 text-sm text-foreground/50">
              {mode === "signin" ? "Continue to your dbSherpa workspace." : "Start orchestrating automations in one place."}
            </p>

            <form onSubmit={submit} className="mt-7 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs text-foreground/50">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-10 border-border bg-secondary/60 text-sm text-foreground placeholder:text-foreground/35"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs text-foreground/50">Password</Label>
                  {mode === "signin" && (
                    <button type="button" className="text-xs text-foreground/50 transition-colors hover:text-foreground">Forgot?</button>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-10 border-border bg-secondary/60 text-sm text-foreground placeholder:text-foreground/35"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-pill-light w-full justify-center rounded-full">
                {submitting ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
                {!submitting && (
                  <span className="btn-pill-icon">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[10px] font-medium uppercase tracking-widest text-foreground/35">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <button
              type="button"
              onClick={() => doSignIn("demo@sherpa.dev")}
              disabled={submitting}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-transparent px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary disabled:opacity-60"
            >
              <Sparkles className="h-4 w-4" />
              Continue as demo user
            </button>
            <p className="mt-2 text-center text-[11px] text-foreground/40">
              Auth is dummy mode — any credentials sign you in.
            </p>

            <p className="mt-6 text-center text-sm text-foreground/50">
              {mode === "signin" ? "New to dbSherpa? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                {mode === "signin" ? "Create an account" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Pitch column */}
          <div className="order-2 flex flex-col md:order-none md:justify-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.24em] text-white/40">
              Enterprise AI workflows
            </p>
            <h1 className="text-4xl font-semibold leading-[0.98] tracking-tight text-white md:text-5xl">
              Build enterprise
              <br />
              AI workflows.
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              Visual orchestration for governed enterprise automation — every run traceable, every step approved.
            </p>

            <div className="mt-10">
              <WorkflowPreview />
            </div>

            <div className="mt-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-white/35">
              {trustMarkers.map((marker, i) => (
                <span key={marker} className="flex items-center gap-4">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-white/25" />}
                  {marker}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
