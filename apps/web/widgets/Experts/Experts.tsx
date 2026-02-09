"use client";

import { Section } from "@/shared/ui/Section";
import { ExpertCard } from "./ui";
import { useTranslation } from "@/shared/i18n";

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
  title?: string;
  experts: Expert[];
}

export function Experts({ title, experts }: ExpertsProps) {
  const { t } = useTranslation();
  const displayExperts = experts.filter(
    (e) =>
      e.isExpert &&
      !e.isTeam &&
      e.expertProfile?.headline
  );

  if (displayExperts.length === 0) return null;

  return (
    <Section id="experts" title={title || t.pages.aboutExperts} background="gray">
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
