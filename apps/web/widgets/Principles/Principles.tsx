import { Section } from "@/shared/ui/Section";
import { PrincipleCard } from "./ui";

interface Principle {
  id: string;
  order?: number;
  title: string;
  description: string;
}

interface PrinciplesProps {
  title: string;
  principles: Principle[];
}

export function Principles({ title, principles }: PrinciplesProps) {
  const sortedPrinciples = [...principles].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <Section id="principles" title={title} background="gray">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {sortedPrinciples.map((principle, index) => {
          const isLast = index === sortedPrinciples.length - 1;
          const isOddTotal = sortedPrinciples.length % 2 === 1;

          return (
            <PrincipleCard
              key={principle.id}
              principle={principle}
              isLastAndOdd={isLast && isOddTotal}
            />
          );
        })}
      </div>
    </Section>
  );
}
