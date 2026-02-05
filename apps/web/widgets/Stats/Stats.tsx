import { Section } from "@/shared/ui/Section";
import { STATS } from "@/shared/content";
import { StatCard } from "./ui";

export function Stats() {
  return (
    <Section id="about" className="py-12 md:py-14" background="gray">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </Section>
  );
}
