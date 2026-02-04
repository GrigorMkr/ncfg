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
}

interface CompactCardProps {
  member: TeamMember;
}

export function CompactCard({ member }: CompactCardProps) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 p-5 text-center
                 hover:border-[#0ea5e9]/40 hover:shadow-[0_20px_40px_-12px_rgba(14,165,233,0.15)] hover:-translate-y-0.5 transition-all duration-300"
    >
      <div
        className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-slate-800 to-[#0ea5e9]/80
                   flex items-center justify-center text-white text-xl font-bold mb-3"
      >
        {getInitials(member.fullName)}
      </div>
      <h4 className="font-semibold text-slate-900 mb-1">{member.fullName}</h4>
      <p className="text-sm text-slate-600 line-clamp-2">{member.team?.title}</p>
    </div>
  );
}
