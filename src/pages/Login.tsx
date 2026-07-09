import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandMark } from "@/components/emt/BrandMark";

const Login = () => {
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
      <Seo title="Sign in — EMT Sun" description="Sign in to your EMT Sun workspace." path="/login" />
      <div className="emt-grid-bg absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.04] blur-3xl"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-sm"
      >
        <div className="mb-8 flex justify-center">
          <BrandMark />
        </div>

        <div className="emt-card p-6">
          <h1 className="text-lg font-bold tracking-tight">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Continue to your workspace.</p>

          <form onSubmit={submit} className="mt-5 space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs">Email</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@company.com"
                className="h-9 bg-background text-sm"
              />
            </div>
            <Button type="submit" className="h-9 w-full text-sm font-semibold">
              Continue with email
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground/60">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-2">
            <Button variant="outline" onClick={() => navigate("/")} className="h-9 w-full gap-2 text-sm">
              <Github className="h-4 w-4" /> Continue with GitHub
            </Button>
            <Button variant="outline" onClick={() => navigate("/")} className="h-9 w-full gap-2 text-sm">
              <Mail className="h-4 w-4" /> Continue with Google
            </Button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to the workspace terms.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
