"use client";

import { Section } from "@/shared/ui/Section";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ICON_SIZE, STROKE_WIDTH } from "@/shared/constants";
import { useTranslation } from "@/shared/i18n";

interface Example {
  title: string;
  description?: string;
  href?: string;
}

interface ServiceExamplesProps {
  examples: Example[];
}

export function ServiceExamples({ examples }: ServiceExamplesProps) {
  const { t } = useTranslation();
  if (!examples || examples.length === 0) return null;

  return (
    <Section title={t.sections.examples} background="gray">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 hover:border-[#0ea5e9]/40 dark:hover:border-[#38bdf8]/40 hover:shadow-lg transition-all duration-300"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{example.title}</h3>
            {example.description && (
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{example.description}</p>
            )}
            {example.href && (
              <Link
                href={example.href}
                className="inline-flex items-center gap-2 text-sm text-[#0ea5e9] hover:underline"
              >
                {t.btn.more}
                <ArrowRight size={ICON_SIZE.SM} strokeWidth={STROKE_WIDTH.DEFAULT} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
