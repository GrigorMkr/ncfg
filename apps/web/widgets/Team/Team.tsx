import { Section } from "@/shared/ui/Section";
import { FeaturedCard, CompactCard } from "./ui";

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

const FEATURED_TITLES = ["Основатель", "Руководитель НЦФГ"];

function isFeatured(member: TeamMember): boolean {
  const title = member.team?.title ?? "";
  return FEATURED_TITLES.some((t) => title.includes(t));
}

export function Team({ title, members }: TeamProps) {
  const teamMembers = members.filter((m) => m.isTeam && m.team);
  const featured = teamMembers.filter(isFeatured);
  const rest = teamMembers.filter((m) => !isFeatured(m));

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
