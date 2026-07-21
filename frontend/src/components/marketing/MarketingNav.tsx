import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Grip, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Platform", href: "/platform" },
  { label: "Features", href: "/features" },
];

export function MarketingNav() {
  const { session } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  return (
    <motion.header
      ref={rootRef}
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 bg-[hsl(var(--background))] shadow-[0_1px_0_0_rgba(255,255,255,0.12)]"
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/" className="flex items-center gap-2" aria-label="Sherpa Studio home">
          <PixelMark />
          <span className="text-[15px] font-semibold uppercase tracking-[0.04em] text-foreground">sherpa</span>
        </Link>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex items-center gap-2 text-sm font-medium text-foreground/90 transition-colors hover:text-foreground"
        >
          {menuOpen ? "Close" : "Menu"}
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/25">
            {menuOpen ? <X className="h-3.5 w-3.5" /> : <Grip className="h-3.5 w-3.5" />}
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full border-t border-white/15 bg-[hsl(var(--background))]"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 md:px-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === "/"}
                  className={({ isActive }) =>
                    cn(
                      "rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                      isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-white/15 pt-3">
                <Link
                  to={session ? "/dashboard" : "/login"}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  {session ? "Open Dashboard" : "Login"}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <ThemeToggle className="text-foreground hover:bg-white/10 hover:text-foreground" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/** Abstract node-mosaic mark — an original mark in the same "pixel grid"
 * spirit as the reference, not a copy of any third-party logo. */
function PixelMark() {
  const filled = [0, 2, 4, 5, 7, 8];
  return (
    <span className="grid h-6 w-6 grid-cols-3 grid-rows-3 gap-[2px]" aria-hidden>
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className={cn("rounded-[1px]", filled.includes(i) ? "bg-foreground" : "bg-foreground/30")} />
      ))}
    </span>
  );
}
