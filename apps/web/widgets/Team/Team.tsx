import { Section } from "@/shared/ui/Section";

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

interface TeamProps {
  title: string;
  members: TeamMember[];
}

function getInitials(fullName: string): string {
  const parts = fullName.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return fullName.substring(0, 2).toUpperCase();
}

function FeaturedCard({ member }: { member: TeamMember }) {
  return (
    <div
      className="bg-white rounded-xl border border-[#F1F5F9] p-6 md:p-8
                 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div
          className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full
                     bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6]
                     flex items-center justify-center text-white text-3xl md:text-4xl font-bold"
        >
          {getInitials(member.fullName)}
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-[#1E3A5F] mb-2">
            {member.fullName}
          </h3>
          <p className="text-[#3B82F6] font-medium mb-2">
            {member.team?.title}
          </p>
          {member.expertProfile?.experienceYears && (
            <p className="text-sm text-[#475569]">
              {member.expertProfile.experienceYears}+ лет опыта
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function CompactCard({ member }: { member: TeamMember }) {
  return (
    <div
      className="bg-white rounded-xl border border-[#F1F5F9] p-5 text-center
                 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <div
        className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6]
                   flex items-center justify-center text-white text-xl font-bold mb-3"
      >
        {getInitials(member.fullName)}
      </div>
      <h4 className="font-semibold text-[#1E3A5F] mb-1">{member.fullName}</h4>
      <p className="text-sm text-[#475569] line-clamp-2">{member.team?.title}</p>
    </div>
  );
}

export function Team({ title, members }: TeamProps) {
  const teamMembers = members.filter((m) => m.isTeam && m.team);

  // Featured: Основатель and Руководитель НЦФГ
  const featured = teamMembers.filter(
    (m) =>
      m.team?.title?.includes("Основатель") ||
      m.team?.title === "Руководитель НЦФГ"
  );

  // Rest of the team
  const rest = teamMembers.filter(
    (m) =>
      !m.team?.title?.includes("Основатель") &&
      m.team?.title !== "Руководитель НЦФГ"
  );

  return (
    <Section id="team" title={title} background="gray">
      {featured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {featured.map((member) => (
            <FeaturedCard key={member.id} member={member} />
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rest.map((member) => (
            <CompactCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </Section>
  );
}
