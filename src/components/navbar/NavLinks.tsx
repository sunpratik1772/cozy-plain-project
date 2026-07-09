import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkItem {
  label: string;
  href: string;
}

const links: NavLinkItem[] = [
  { label: "Docs", href: "/docs/overview" },
  { label: "API", href: "/api/refresh-token" },
  { label: "Changelog", href: "/changelog" },
];

const NavLinks = () => {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href.startsWith("/docs")) return location.pathname.startsWith("/docs");
    if (href.startsWith("/api")) return location.pathname.startsWith("/api");
    if (href.startsWith("/changelog")) return location.pathname.startsWith("/changelog");
    return false;
  };

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          className={cn(
            "px-3 py-2 text-sm font-medium transition-colors rounded-xl",
            isActive(link.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
