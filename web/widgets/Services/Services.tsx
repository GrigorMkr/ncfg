import { Building2, Users, Landmark, GraduationCap, Heart } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { Button } from "@/shared/ui/Button";

interface Audience {
  title: string;
  valueProposition: string;
  cta: {
    label: string;
    href: string;
  };
}

interface ServicesProps {
  title: string;
  audiences: Audience[];
}

const icons = [Building2, Users, Landmark, GraduationCap, Heart];

export function Services({ title, audiences }: ServicesProps) {
  return (
    <Section id="services" title={title} background="gray">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {audiences.map((audience, index) => {
          const Icon = icons[index % icons.length];
          return (
            <article
              key={audience.title}
              className="group bg-white rounded-xl p-6 border border-[#F1F5F9] hover:border-[#E2E8F0] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-lg bg-[#00D9FF]/10 flex items-center justify-center mb-4 group-hover:bg-[#00D9FF]/20 transition-colors">
                <Icon className="w-6 h-6 text-[#1E3A5F]" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-3">
                {audience.title}
              </h3>
              <p className="text-[#475569] leading-relaxed mb-4">
                {audience.valueProposition}
              </p>
              <Button href={audience.cta.href} variant="ghost" size="sm" className="p-0 h-auto">
                {audience.cta.label} →
              </Button>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
