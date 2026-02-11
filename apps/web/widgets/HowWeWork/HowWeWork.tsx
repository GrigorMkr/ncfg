"use client";

import { useMemo } from "react";
import { Section } from "@/shared/ui/Section";
import { StepCard } from "./ui";
import { useTranslation } from "@/shared/i18n";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface HowWeWorkProps {
  title?: string;
  steps: Step[];
  serviceId?: string;
}

export function HowWeWork({ title, steps, serviceId }: HowWeWorkProps) {
  const { t } = useTranslation();

  const translatedSteps = useMemo(
    () =>
      steps.map((step) => {
        const idx = step.id - 1;
        const serviceSteps = serviceId
          ? (t.serviceHowWeWork as Record<string, string[]>)[serviceId]
          : undefined;
        if (serviceSteps && serviceSteps[idx]) {
          return {
            ...step,
            title: `${t.misc.step} ${step.id}`,
            description: serviceSteps[idx],
          };
        }
        return {
          ...step,
          title: t.howWeWorkSteps[idx]?.title ?? step.title,
          description: t.howWeWorkSteps[idx]?.description ?? step.description,
        };
      }),
    [steps, t, serviceId]
  );

  return (
    <Section id="how-we-work" title={title || t.sections.howWeWork} background="gray">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {translatedSteps.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
      </div>
    </Section>
  );
}
