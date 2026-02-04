import { Clock } from "lucide-react";
import { getInitials } from "@/shared/lib/format";

interface Expert {
  id: string;
  fullName: string;
  isTeam: boolean;
  isExpert: boolean;
  expertProfile?: {
    headline?: string | null;
    experienceYears?: number | null;
  } | null;
}

interface ExpertCardProps {
  expert: Expert;
}

export function ExpertCard({ expert }: ExpertCardProps) {
  const headline = expert.expertProfile?.headline;
  const experienceYears = expert.expertProfile?.experienceYears;

  return (
    <div
      className="min-w-[280px] md:min-w-0 bg-white rounded-2xl border border-slate-200/80 p-5
                 hover:border-[#0ea5e9]/40 hover:shadow-[0_20px_40px_-12px_rgba(14,165,233,0.15)] transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-slate-800 to-[#0ea5e9]/80
                     flex items-center justify-center text-white font-bold"
        >
          {getInitials(expert.fullName)}
        </div>
        <div className="min-w-0">
          <h4 className="font-semibold text-slate-900 truncate">
            {expert.fullName}
          </h4>
          {headline && (
            <p className="text-sm text-[#0ea5e9] line-clamp-2">{headline}</p>
          )}
        </div>
      </div>
      {experienceYears && (
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                     bg-slate-50 text-sm text-slate-600"
        >
          <Clock size={14} className="text-[#0ea5e9]" strokeWidth={1.75} />
          {experienceYears}+ лет опыта
        </span>
      )}
    </div>
  );
}
