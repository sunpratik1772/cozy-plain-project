import { useMemo } from "react";

const LABELS = [
  { text: "PARSING…", top: "18%", left: "6%", delay: "0s" },
  { text: "ROUTING…", top: "42%", left: "-2%", delay: "2.4s" },
  { text: "VALIDATING…", top: "68%", left: "8%", delay: "4.8s" },
  { text: "SYNCING…", top: "58%", left: "88%", delay: "7.2s" },
  { text: "EXECUTING…", top: "82%", left: "70%", delay: "9.6s" },
];

function polar(radius: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: radius * Math.cos(rad), y: radius * Math.sin(rad) };
}

function buildPaths(count: number, radius: number, swirl: number) {
  const paths: string[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (360 / count) * i;
    const p1 = polar(radius, angle);
    const control = polar(radius * 0.52, angle + swirl);
    paths.push(`M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Q ${control.x.toFixed(1)} ${control.y.toFixed(1)} 0 0`);
  }
  return paths;
}

function buildDots(count: number, radius: number) {
  return Array.from({ length: count }, (_, i) => polar(radius, (360 / count) * i));
}

/** Decorative sunburst — dotted ring with radiating curved traces and a
 * glowing core, echoing the reference hero's animated flow visualization. */
export function ParticleBurst({ className = "" }: { className?: string }) {
  const dots = useMemo(() => buildDots(64, 190), []);
  const pathsA = useMemo(() => buildPaths(18, 190, 46), []);
  const pathsB = useMemo(() => buildPaths(18, 190, -46), []);

  return (
    <div className={`relative aspect-square w-full max-w-[520px] ${className}`} aria-hidden>
      <svg viewBox="-200 -200 400 400" className="h-full w-full overflow-visible animate-burst-spin-slow-reverse">
        {pathsA.map((d, i) => (
          <path key={`a${i}`} d={d} fill="none" stroke="white" strokeOpacity={0.16} strokeWidth={0.7} />
        ))}
        {pathsB.map((d, i) => (
          <path key={`b${i}`} d={d} fill="none" stroke="white" strokeOpacity={0.12} strokeWidth={0.7} />
        ))}
      </svg>

      <svg viewBox="-200 -200 400 400" className="absolute inset-0 h-full w-full animate-burst-spin-slow">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={1.6} fill="white" fillOpacity={0.85} />
        ))}
      </svg>

      <div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ boxShadow: "0 0 40px 14px rgba(255,255,255,0.55), 0 0 90px 40px rgba(255,255,255,0.22)" }}
      />

      {LABELS.map((l) => (
        <span
          key={l.text}
          className="absolute font-mono text-[10px] uppercase tracking-[0.2em] text-white/0"
          style={{
            top: l.top,
            left: l.left,
            animation: "fluid-fade-up 10s ease-in-out infinite",
            animationDelay: l.delay,
          }}
        >
          {l.text}
        </span>
      ))}
    </div>
  );
}
