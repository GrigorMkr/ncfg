import { Section } from "@/shared/ui/Section";
import { StepCard } from "./ui";

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
          <StepCard key={step.id} step={step} />
        ))}
      </div>
    </Section>
  );
}
