import { Section } from "@/shared/ui/Section";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface HowWeWorkProps {
  title: string;
  steps: Step[];
}

export function HowWeWork({ title, steps }: HowWeWorkProps) {
  return (
    <Section id="how-we-work" title={title} background="gray">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white rounded-xl border border-[#F1F5F9] p-6
                       hover:border-[#3B82F6]/30 hover:shadow-lg hover:-translate-y-0.5
                       transition-all duration-200"
          >
            <div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#58A8E0] to-[#3B82F6]
                         flex items-center justify-center text-white text-xl font-bold mb-4"
            >
              {step.id}
            </div>
            <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2">
              {step.title}
            </h3>
            <p className="text-[#475569] text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
