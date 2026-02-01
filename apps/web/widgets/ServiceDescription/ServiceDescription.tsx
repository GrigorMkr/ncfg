import { Section } from "@/shared/ui/Section";
import { CheckCircle } from "lucide-react";

interface ServiceDescriptionProps {
  fullDescription: string;
  benefits?: string[];
}

export function ServiceDescription({
  fullDescription,
  benefits,
}: ServiceDescriptionProps) {
  const hasBenefits = benefits && benefits.length > 0;

  return (
    <Section id="description">
      <div
        className={
          hasBenefits
            ? "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            : "max-w-3xl"
        }
      >
        <div>
          <h2 className="text-[28px] md:text-4xl font-bold text-[#1E3A5F] mb-6">
            Описание услуги
          </h2>
          <p className="text-[#475569] text-base md:text-lg leading-relaxed">
            {fullDescription}
          </p>
        </div>

        {hasBenefits && (
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-[#1E3A5F] mb-6">
              Преимущества
            </h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                  <span className="text-[#475569] leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}
