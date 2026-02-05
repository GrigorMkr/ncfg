import { Section } from "@/shared/ui/Section";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ICON_SIZE, STROKE_WIDTH } from "@/shared/constants";

interface Example {
  title: string;
  description?: string;
  href?: string;
}

interface ServiceExamplesProps {
  examples: Example[];
}

export function ServiceExamples({ examples }: ServiceExamplesProps) {
  if (!examples || examples.length === 0) return null;

  return (
    <Section title="Примеры проектов" background="gray">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-[#0ea5e9]/40 hover:shadow-lg transition-all duration-300"
          >
            <h3 className="font-semibold text-slate-900 mb-2">{example.title}</h3>
            {example.description && (
              <p className="text-sm text-slate-600 mb-4">{example.description}</p>
            )}
            {example.href && (
              <Link
                href={example.href}
                className="inline-flex items-center gap-2 text-sm text-[#0ea5e9] hover:underline"
              >
                Подробнее
                <ArrowRight size={ICON_SIZE.SM} strokeWidth={STROKE_WIDTH.DEFAULT} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
