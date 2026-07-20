import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { label: "Docs", href: "/docs/overview" },
  { label: "API", href: "/api/register-user" },
  { label: "Changelog", href: "/changelog" },
  { label: "Dashboard", href: "/dashboard" },
];

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <nav className="flex items-center justify-between w-full max-w-[90rem] mx-auto px-4 md:px-8 h-16">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-foreground text-background font-bold text-sm">
              d
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">Sherpa</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 text-xs font-medium text-muted-foreground bg-secondary rounded-full transition-colors hover:text-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            <span>News</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <ThemeToggle className="hidden sm:flex" />
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Book a demo
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-full transition-opacity hover:opacity-90"
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
