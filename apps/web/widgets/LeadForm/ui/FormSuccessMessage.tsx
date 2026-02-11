"use client";

import { memo } from "react";
import { CheckCircle } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { useTranslation } from "@/shared/i18n";

function FormSuccessMessageInner() {
  const { t } = useTranslation();
  return (
    <Section id="lead-form" background="gray">
      <div className="max-w-xl mx-auto text-center py-14">
        <div className="w-20 h-20 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-6 animate-fade-in text-emerald-600 dark:text-emerald-400">
          <CheckCircle className="w-10 h-10" strokeWidth={1.75} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
          {t.form.successTitle}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-lg">{t.form.successMessage}</p>
      </div>
    </Section>
  );
}

export const FormSuccessMessage = memo(FormSuccessMessageInner);
