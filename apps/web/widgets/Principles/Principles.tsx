import { Section } from "@/shared/ui/Section";
import { BookOpen, FlaskConical, Users, Award, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Principle {
  id: string;
  order: number;
  title: string;
  description: string;
}

interface PrinciplesProps {
  title: string;
  principles: Principle[];
}

const iconMap: Record<string, LucideIcon> = {
  methodology: BookOpen,
  scientific_approach: FlaskConical,
  individual_approach: Users,
  experience: Award,
  team: Heart,
};

export function Principles({ title, principles }: PrinciplesProps) {
  const sortedPrinciples = [...principles].sort((a, b) => a.order - b.order);

  return (
    <Section id="principles" title={title}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {sortedPrinciples.map((principle, index) => {
          const Icon = iconMap[principle.id] || BookOpen;
          const isLast = index === sortedPrinciples.length - 1;
          const isOddTotal = sortedPrinciples.length % 2 === 1;

          return (
            <div
              key={principle.id}
              className={`relative bg-white rounded-xl border border-[#F1F5F9] p-6 pl-8
                         overflow-hidden hover:shadow-md transition-all duration-200
                         ${isLast && isOddTotal ? "md:col-span-2 md:max-w-[calc(50%-0.75rem)] md:mx-auto" : ""}`}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#58A8E0] to-[#3B82F6]" />
              <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2">
                {principle.title}
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                {principle.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
