import { Link } from "react-router-dom";

const columns = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Studio", href: "/studio" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Templates", href: "/templates" },
      { label: "Skills", href: "/skills" },
    ],
  },
  {
    title: "Documentation",
    links: [
      { label: "Overview", href: "/docs/overview" },
      { label: "API Reference", href: "/api/register-user" },
      { label: "Changelog", href: "/changelog" },
      { label: "Codebase", href: "/codebase" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Automations", href: "/automations" },
      { label: "Run History", href: "/runs" },
      { label: "Settings", href: "/settings" },
      { label: "Login", href: "/login" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Cookie", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-[90rem] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-foreground text-background font-bold text-sm">
                d
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">dbSherpa</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Plan, track, and deliver anything. Run your daily tasks, all in one place.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2026 dbSherpa Studio · All rights reserved</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
