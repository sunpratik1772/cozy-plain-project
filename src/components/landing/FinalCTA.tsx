import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="px-4 md:px-8 py-16 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-8">
          Get started today
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/studio"
            className="inline-flex items-center px-6 py-3 text-sm font-semibold text-primary-foreground bg-primary rounded-full transition-opacity hover:opacity-90"
          >
            Get started
          </Link>
          <Link
            to="/docs/overview"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-foreground border border-border rounded-full transition-colors hover:bg-accent"
          >
            Book a demo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
