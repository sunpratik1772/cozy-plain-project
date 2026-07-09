import { Link } from "react-router-dom";
import { Sun } from "lucide-react";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-300 to-zinc-100">
          <Sun className="w-5 h-5 text-zinc-900" />
        </div>
        <span className="text-xl font-bold text-foreground">dbSherpa Studio</span>
      </div>
    </Link>
  );
};

export default Logo;
