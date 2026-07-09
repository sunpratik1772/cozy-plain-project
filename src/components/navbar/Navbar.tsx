import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background border-b border-border">
      <nav className="flex items-center justify-between w-full max-w-[90rem] mx-auto px-4 md:px-8 py-4">
        {/* Left Section: Logo + SearchBar */}
        <div className="flex items-center gap-6">
          <Logo />
          <SearchBar />
        </div>

        {/* Right Section: NavLinks + CTA */}
        <div className="flex items-center gap-2">
          <NavLinks />
          <ThemeToggle className="hidden lg:flex" />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
