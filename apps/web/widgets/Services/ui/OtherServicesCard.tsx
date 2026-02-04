import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { cn } from "@/shared/lib/cn";

interface OtherServicesCardProps {
  href: string;
}

export function OtherServicesCard({ href }: OtherServicesCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative rounded-2xl overflow-hidden",
        "min-h-[260px] flex flex-col items-center justify-center gap-3 p-6",
        "bg-gradient-to-br from-[#0ea5e9]/15 to-[#38bdf8]/10 border-2 border-[#0ea5e9]/40",
        "hover:border-[#0ea5e9] hover:shadow-[0_20px_40px_-12px_rgba(14,165,233,0.3)] hover:-translate-y-2",
        "transition-all duration-300"
      )}
    >
      <div className="icon-badge w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
        <Layers className="w-7 h-7" strokeWidth={1.5} />
      </div>
      <span className="text-lg font-bold text-slate-900 group-hover:text-[#0ea5e9] transition-colors">
        Другие услуги
      </span>
      <span className="text-sm text-slate-600 group-hover:text-[#0ea5e9] flex items-center gap-1 transition-colors">
        Смотреть все
        <ArrowRight
          className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
          strokeWidth={1.75}
        />
      </span>
    </Link>
  );
}
