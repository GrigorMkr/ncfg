import { Section } from "@/shared/ui/Section";

interface StatItem {
  key: string;
  label: string;
  displayValue: string;
}

interface StatsProps {
  items: StatItem[];
}

export function Stats({ items }: StatsProps) {
  return (
    <Section id="about" className="bg-[#1E3A5F] py-16 md:py-20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
        {items.map((stat) => (
          <div key={stat.key} className="text-center">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#00D9FF] mb-2">
              {stat.displayValue}
            </div>
            <div className="text-sm md:text-base text-white/80">{stat.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
