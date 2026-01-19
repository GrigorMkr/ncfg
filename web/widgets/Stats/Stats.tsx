import { Section } from "@/shared/ui/Section";
import { cn } from "@/shared/lib/cn";

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  {
    value: "3 502",
    label: "довольных корпоративных клиента",
  },
  {
    value: "9,63",
    label: "NPS программ",
  },
  {
    value: "30,2 млн",
    label: "участников мероприятий",
  },
  {
    value: "84",
    label: "региона участвуют в проектах",
  },
];

export function Stats() {
  return (
    <Section id="about" className="py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "relative rounded-2xl p-6 bg-white",
              "before:absolute before:inset-0 before:rounded-2xl before:p-[1px]",
              "before:bg-gradient-to-br before:from-[#58A8E0] before:via-[#3B82F6]/50 before:to-[#1E3A5F]/30",
              "before:-z-10 before:content-['']",
              "shadow-sm hover:shadow-md hover:-translate-y-0.5",
              "transition-all duration-200"
            )}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#58A8E0]/5 via-transparent to-[#3B82F6]/5 pointer-events-none" />

            <div className="relative">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 bg-gradient-to-r from-[#1E3A5F] to-[#3B82F6] bg-clip-text text-transparent">
                {stat.value}
              </div>

              <div className="text-sm font-medium text-[#475569]">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
