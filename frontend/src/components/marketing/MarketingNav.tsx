import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Platform", href: "/platform" },
  { label: "Features", href: "/features" },
];

const pill = "rounded-full border border-white/10 bg-white/[0.06] backdrop-blur";

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
      className="absolute inset-x-0 top-0 z-20 px-4 pt-4 md:px-8 md:pt-6"
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
        {/* Left pill — brand */}
        <Link to="/" className={cn("flex items-center gap-2.5 py-3 pl-4 pr-6", pill)} aria-label="Sherpa home">
          <PixelMark />
          <span className="text-sm font-normal tracking-tight text-white">sherpa</span>
        </Link>

        {/* Center pill — tabs */}
        <div className={cn("hidden items-center gap-1 px-2 py-2 md:flex", pill)}>
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-5 py-2 text-sm transition-colors duration-300",
                  isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white",
                )
              }
            >
              {link.label.toLowerCase()}
            </NavLink>
          ))}
        </div>

        {/* Right — CTA (always visible) + menu toggle (mobile only, for tabs) */}
        <div className="flex items-center gap-2">
          <Link
            to={session ? "/dashboard" : "/login"}
            className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-normal text-white transition-transform duration-300 hover:scale-[1.04] md:px-6 md:py-3"
            style={{ transitionTimingFunction: "var(--ease-fluid)" }}
          >
            {session ? "dashboard" : "get started"}
          </Link>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className={cn("flex h-11 w-11 items-center justify-center text-white md:hidden", pill)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={cn("mt-2 overflow-hidden md:hidden", pill)}
          >
            <div className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === "/"}
                  className={({ isActive }) =>
                    cn(
                      "rounded-full px-4 py-2.5 text-sm",
                      isActive ? "bg-white/10 text-white" : "text-white/60",
                    )
                  }
                >
                  {link.label.toLowerCase()}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/** Abstract node-mosaic mark — original, in the reference's "pixel grid"
 * spirit, not a copy of any third-party logo. */
function PixelMark() {
  const filled = [0, 2, 4, 5, 7, 8];
  return (
    <span className="grid h-5 w-5 grid-cols-3 grid-rows-3 gap-[2px]" aria-hidden>
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className={cn("rounded-[1px]", filled.includes(i) ? "bg-white" : "bg-white/25")} />
      ))}
    </span>
  );
}
