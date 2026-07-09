import { Search } from "lucide-react";
import { useSearch } from "@/contexts/SearchContext";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSearchBar = () => {
  const { openSearch } = useSearch();
  const isMobile = useIsMobile();

  return (
    <button
      onClick={openSearch}
      className="search-bar-gradient-border bg-background rounded-xl inline-flex items-center justify-between py-4 pl-4 md:pl-8 pr-4 w-full max-w-[600px] gap-3 md:gap-5 hover:bg-accent/5 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-3 flex-1">
        <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        <span className="text-base text-muted-foreground">
          {isMobile ? "Search" : "Search (e.g. integrations, API)"}
        </span>
      </div>
      
      <div className="flex items-center gap-1 flex-shrink-0">
        <kbd className="flex items-center justify-center w-7 h-7 rounded-md bg-[#121314] text-xs font-semibold text-muted-foreground">
          ⌘
        </kbd>
        <kbd className="flex items-center justify-center w-7 h-7 rounded-md bg-[#121314] text-xs font-semibold text-muted-foreground">
          K
        </kbd>
      </div>
    </button>
  );
};

export default HeroSearchBar;
