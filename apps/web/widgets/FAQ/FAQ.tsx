"use client";

import { useState, useCallback } from "react";
import { HelpCircle } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { AccordionItem } from "./ui";
import type { FAQItem } from "@/shared/content";
import { useTranslation } from "@/shared/i18n";

interface FAQProps {
  title?: string;
  items?: FAQItem[];
  translationKey?: "faq" | "companiesFaq" | "individualsFaq" | "aboutFaq" | "serviceFaq";
}

export function FAQ({ title, items, translationKey = "faq" }: FAQProps) {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayItems = (items && items.length > 0) ? items : t[translationKey] as FAQItem[];
  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <Section id="faq" title={title || t.sections.faq}>
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-2 mb-8">
        <HelpCircle className="w-10 h-10 text-[#0ea5e9]/80" aria-hidden />
        <p className="text-slate-600 dark:text-slate-400 text-center text-sm max-w-xl">
          {t.sections.faqLead}
        </p>
      </div>
      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {displayItems.map((item, index) => (
          <AccordionItem
            key={item.question}
            item={item}
            index={index}
            isOpen={openIndex === index}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </Section>
  );
}
