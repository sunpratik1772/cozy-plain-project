import { motion } from "framer-motion";
import type { EmtStat } from "@/data/emt";

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 64},${20 - ((v - min) / range) * 18}`)
    .join(" ");
  return (
    <svg width="64" height="22" viewBox="0 0 64 22" className="text-success" aria-hidden>
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    </svg>
  );
}

export function StatRow({ stats }: { stats: EmtStat[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="emt-card emt-card-hover p-5"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
            <Sparkline data={s.sparkline} />
          </div>
          <p className="mt-1.5 text-3xl font-bold tracking-tight">{s.value}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{s.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}
