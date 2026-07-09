import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-300 to-zinc-100">
          <Compass className="w-5 h-5 text-zinc-900" />
        </div>
        <span className="text-xl font-bold text-foreground">Compass</span>
      </div>
    </Link>
  );
};

export default Logo;
