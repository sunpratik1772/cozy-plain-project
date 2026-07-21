import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-background">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-80 corner-glow-tl opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8 py-14 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground/70">let's work</p>
            <h2 className="mt-4 font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight text-foreground">
              Start building your <em className="italic text-muted-foreground">next</em> automation with Sherpa
            </h2>
          </div>
          <Link
            to="/login"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-85"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-5 border-t border-border/60 pt-10">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground">
                <span className="font-serif text-base italic text-background">s</span>
              </div>
              <span className="font-serif text-xl italic tracking-tight text-foreground">sherpa</span>
              <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground/70">studio</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Local-first, node-based automation infrastructure for engineering teams. Compose, run and observe workflows from a single canvas.
            </p>
          </div>
          <FooterCol title="Product" links={[
            { label: "Home", href: "/" },
            { label: "Platform", href: "/platform" },
            { label: "Features", href: "/features" },
            { label: "Changelog", href: "/changelog" },
          ]} />
          <FooterCol title="Resources" links={[
            { label: "Docs", href: "/docs/overview" },
            { label: "API Reference", href: "/api/register-user" },
            { label: "Templates", href: "/templates" },
            { label: "Codebase", href: "/codebase" },
          ]} />
          <FooterCol title="Company" links={[
            { label: "Login", href: "/login" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "Studio", href: "/studio" },
            { label: "Automations", href: "/automations" },
          ]} />
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-border/60 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Sherpa Studio. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link to="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Twitter</Link>
            <Link to="#" className="hover:text-foreground transition-colors">GitHub</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground/70">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.href} className="text-sm text-foreground/80 transition-colors hover:text-foreground">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
