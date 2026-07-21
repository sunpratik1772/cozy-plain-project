import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6"
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
        {/* Left pill — brand */}
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-card/90 py-3 pl-4 pr-6 backdrop-blur transition-colors duration-300 hover:bg-card"
          aria-label="Sherpa Studio home"
        >
          <PixelMark />
          <span className="text-sm font-medium tracking-tight text-foreground">sherpa</span>
        </Link>

        {/* Center pill — links */}
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-card/90 px-3 py-2 backdrop-blur md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-5 py-2 text-sm transition-colors duration-300",
                  isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground",
                )
              }
            >
              {link.label.toLowerCase()}
            </NavLink>
          ))}
        </div>

        {/* Right pill — CTA */}
        <Link
          to={session ? "/dashboard" : "/login"}
          className="hidden items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
        >
          {session ? "open dashboard" : "get started"}
        </Link>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-card/90 text-foreground backdrop-blur md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-card/95 backdrop-blur md:hidden"
          >
            <div className="flex flex-col gap-1 px-3 py-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === "/"}
                  className={({ isActive }) =>
                    cn(
                      "rounded-full px-4 py-2.5 text-sm",
                      isActive ? "bg-white/10 text-foreground" : "text-foreground/60",
                    )
                  }
                >
                  {link.label.toLowerCase()}
                </NavLink>
              ))}
              <Link
                to={session ? "/dashboard" : "/login"}
                className="mt-1 flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                {session ? "open dashboard" : "get started"}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <div className="mt-1 flex items-center justify-between px-4 py-2">
                <span className="text-xs text-foreground/60">theme</span>
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
