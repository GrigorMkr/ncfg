"use client";

import { Section } from "@/shared/ui/Section";
import { useTranslation } from "@/shared/i18n";

export function TvoriDobroContent() {
  const { t } = useTranslation();

  return (
    <Section
      title={t.pages.tvoridobroTitle}
      lead={t.pages.tvoridobroLead}
      background="gray"
    >
      <div className="max-w-2xl mx-auto text-center space-y-6 animate-fade-in-up">
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          {t.pages.tvoridobroP1}
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          {t.pages.tvoridobroP2}
        </p>
      </div>
    </Section>
  );
}
