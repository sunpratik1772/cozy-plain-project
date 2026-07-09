import { Menu, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useSearch } from "@/contexts/SearchContext";

interface NavLinkItem {
  label: string;
  href: string;
}

const mainLinks: NavLinkItem[] = [
  { label: "Docs", href: "/docs/overview" },
  { label: "API", href: "/api/refresh-token" },
  { label: "Changelog", href: "/changelog" },
];


const MobileMenu = () => {
  const location = useLocation();
  const { openSearch } = useSearch();

  const isActive = (href: string) => {
    if (href.startsWith("/docs")) return location.pathname.startsWith("/docs");
    if (href.startsWith("/api")) return location.pathname.startsWith("/api");
    return location.pathname === href;
  };

  return (
    <div className="lg:hidden flex items-center gap-2">
      {/* Search Button */}
      <button
        onClick={openSearch}
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-muted-foreground/50"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-muted-foreground/50"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] bg-background border-border">
          <SheetHeader>
            <SheetTitle className="text-foreground">Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-2 mt-8">
            {/* Main Navigation Links */}
            {mainLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                  isActive(link.href)
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
