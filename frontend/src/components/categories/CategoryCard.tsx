import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  image: string;
  title: string;
  description: string;
  linkText: string;
  href: string;
}

const CategoryCard = ({ image, title, description, linkText, href }: CategoryCardProps) => {
  return (
    <div className="group flex flex-col rounded-[2rem] overflow-hidden border border-border transition-colors hover:border-muted-foreground/30">
      {/* Image Container */}
      <div className="p-4 pb-0">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[1.5rem]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* CTA Link */}
        <Link
          to={href}
          className="inline-flex items-center gap-2 text-sm text-foreground transition-colors group-hover:text-muted-foreground"
        >
          <span>{linkText}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
