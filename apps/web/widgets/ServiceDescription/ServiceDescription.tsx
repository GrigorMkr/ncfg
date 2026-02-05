import { Section } from "@/shared/ui/Section";
import { CheckCircle } from "lucide-react";
import { ICON_SIZE, STROKE_WIDTH, COLORS } from "@/shared/constants";

interface ServiceDescriptionProps {
  fullDescription?: string;
  benefits?: string[];
}

export function ServiceDescription({ fullDescription, benefits }: ServiceDescriptionProps) {
  return (
    <Section title="Описание услуги">
      {fullDescription && (
        <div className="max-w-3xl mx-auto mb-10">
          <p className="text-lg text-slate-600 leading-relaxed">{fullDescription}</p>
        </div>
      )}
      {benefits && benefits.length > 0 && (
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">Преимущества</h3>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle 
                  size={ICON_SIZE.DEFAULT} 
                  strokeWidth={STROKE_WIDTH.DEFAULT} 
                  className={`text-[${COLORS.SUCCESS}] shrink-0 mt-0.5`} 
                />
                <span className="text-slate-600">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
