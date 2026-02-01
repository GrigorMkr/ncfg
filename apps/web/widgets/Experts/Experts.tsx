import { Section } from "@/shared/ui/Section";
import { Clock } from "lucide-react";

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

interface ExpertsProps {
  title: string;
  experts: Expert[];
}

function getInitials(fullName: string): string {
  const parts = fullName.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return fullName.substring(0, 2).toUpperCase();
}

function ExpertCard({ expert }: { expert: Expert }) {
  const headline = expert.expertProfile?.headline;
  const experienceYears = expert.expertProfile?.experienceYears;

  return (
    <div
      className="min-w-[280px] md:min-w-0 bg-white rounded-xl border border-[#F1F5F9] p-5
                 hover:border-[#3B82F6]/30 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-[#58A8E0] to-[#1E3A5F]
                     flex items-center justify-center text-white font-bold"
        >
          {getInitials(expert.fullName)}
        </div>
        <div className="min-w-0">
          <h4 className="font-semibold text-[#1E3A5F] truncate">
            {expert.fullName}
          </h4>
          {headline && (
            <p className="text-sm text-[#3B82F6] line-clamp-2">{headline}</p>
          )}
        </div>
      </div>
      {experienceYears && (
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                     bg-[#F8FAFC] text-sm text-[#475569]"
        >
          <Clock size={14} className="text-[#3B82F6]" />
          {experienceYears}+ лет опыта
        </span>
      )}
    </div>
  );
}

export function Experts({ title, experts }: ExpertsProps) {
  // Filter: isExpert === true and NOT team members (or team members who are also experts but exclude featured ones)
  const displayExperts = experts.filter(
    (e) =>
      e.isExpert &&
      !e.isTeam &&
      e.expertProfile?.headline // Only show experts with headline
  );

  if (displayExperts.length === 0) return null;

  return (
    <Section id="experts" title={title}>
      <div
        className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4
                   overflow-x-auto pb-4 md:overflow-visible md:pb-0
                   snap-x snap-mandatory md:snap-none
                   -mx-4 px-4 md:mx-0 md:px-0"
      >
        {displayExperts.map((expert) => (
          <div key={expert.id} className="snap-start">
            <ExpertCard expert={expert} />
          </div>
        ))}
      </div>
    </Section>
  );
}
