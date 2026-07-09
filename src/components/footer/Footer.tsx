const Footer = () => {
  return (
    <footer className="border-t border-border py-6">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left - Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2026 EMT Sun · All rights reserved
          </p>

          {/* Right - Powered by */}
          <span className="text-sm text-muted-foreground">
            Powered by Lovable
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;