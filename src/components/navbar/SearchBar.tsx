import { Search } from "lucide-react";
import { useSearch } from "@/contexts/SearchContext";

const SearchBar = () => {
  const { openSearch } = useSearch();

  return (
    <button
      onClick={openSearch}
      className="hidden lg:inline-flex search-bar-gradient-border items-center justify-between py-2 pl-6 pr-2.5 w-[309px] min-w-[309px] gap-5 hover:bg-accent/5 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-2 flex-1">
        <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <span className="text-sm text-muted-foreground">
          Search...
        </span>
      </div>
      
      <div className="flex items-center gap-1 flex-shrink-0">
        <kbd className="flex items-center justify-center w-6 h-6 rounded-md bg-secondary text-xs font-semibold text-muted-foreground">
          ⌘
        </kbd>
        <kbd className="flex items-center justify-center w-6 h-6 rounded-md bg-secondary text-xs font-semibold text-muted-foreground">
          K
        </kbd>
      </div>
    </button>
  );
};

export default SearchBar;
