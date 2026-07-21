/**
 * Live animated backdrop — stands in for the reference's looping hero video.
 * Deep near-black navy with slow-drifting blue aurora blobs and a faint
 * grid, giving continuous motion without a video asset. Pure CSS animation,
 * GPU-composited, respects prefers-reduced-motion via the media query below.
 */
export function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-background" aria-hidden>
      {/* Drifting blue glows */}
      <div
        className="absolute -left-1/4 top-[-20%] h-[70vh] w-[70vh] rounded-full opacity-70 blur-[120px] animate-aurora"
        style={{ background: "radial-gradient(circle, hsl(224 82% 52% / 0.9), transparent 70%)" }}
      />
      <div
        className="absolute right-[-15%] top-[10%] h-[60vh] w-[60vh] rounded-full opacity-60 blur-[130px] animate-aurora-slow"
        style={{ background: "radial-gradient(circle, hsl(212 90% 46% / 0.75), transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-25%] left-[20%] h-[65vh] w-[65vh] rounded-full opacity-50 blur-[140px] animate-aurora"
        style={{ background: "radial-gradient(circle, hsl(232 78% 44% / 0.7), transparent 70%)", animationDelay: "-8s" }}
      />

      {/* Faint grid */}
      <div
        className="absolute inset-0 animate-hue-pulse"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 100% / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, black 20%, transparent 80%)",
        }}
      />

      {/* Vignette to seat the type */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 100% at 50% 0%, transparent 40%, hsl(224 44% 5% / 0.85) 100%)" }}
      />
    </div>
  );
}
