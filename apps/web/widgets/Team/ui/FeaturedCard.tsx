import { getInitials } from "@/shared/lib/format";

interface TeamMember {
  id: string;
  fullName: string;
  isTeam: boolean;
  team: {
    unit: string;
    title: string;
    department: string | null;
  } | null;
  expertProfile?: {
    headline?: string | null;
    experienceYears?: number | null;
  } | null;
}

interface FeaturedCardProps {
  member: TeamMember;
}

export function FeaturedCard({ member }: FeaturedCardProps) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8
                 hover:border-[#0ea5e9]/40 hover:shadow-[0_20px_40px_-12px_rgba(14,165,233,0.15)] hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div
          className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-2xl
                     bg-gradient-to-br from-slate-800 to-[#0ea5e9]/80
                     flex items-center justify-center text-white text-3xl md:text-4xl font-bold"
        >
          {getInitials(member.fullName)}
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
            {member.fullName}
          </h3>
          <p className="text-[#0ea5e9] font-medium mb-2">
            {member.team?.title}
          </p>
          {member.expertProfile?.experienceYears && (
            <p className="text-sm text-slate-600">
              {member.expertProfile.experienceYears}+ лет опыта
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
