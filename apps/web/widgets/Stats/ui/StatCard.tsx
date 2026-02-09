import { cn } from "@/shared/lib/cn";
import type { StatItem } from "@/shared/content";

const ELECTRIC_BLUE = "#0EA5E9";

interface StatCardProps {
  stat: StatItem;
}

export function StatCard({ stat }: StatCardProps) {
  const { value, label, Icon } = stat;

  return (
    <div
      className={cn(
        "relative rounded-xl p-6 bg-white dark:bg-slate-800/90",
        "before:absolute before:inset-0 before:rounded-xl before:p-[1px]",
        "before:bg-gradient-to-br before:from-[#0EA5E9] before:via-[#38BDF8] before:to-[#0EA5E9]/60",
        "before:-z-10 before:content-['']",
        "hover:-translate-y-0.5 transition-all duration-200"
      )}
    >
      <div className="relative">
        <div className="mb-3 icon-badge w-11 h-11 flex items-center justify-center">
          <Icon className="w-5 h-5" strokeWidth={1.75} />
        </div>
        <div
          className="text-2xl md:text-3xl font-bold tracking-tight mb-2"
          style={{ color: ELECTRIC_BLUE }}
        >
          {value}
        </div>
        <div className="text-sm font-medium text-[#475569] dark:text-slate-400">{label}</div>
      </div>
    </div>
  );
}
