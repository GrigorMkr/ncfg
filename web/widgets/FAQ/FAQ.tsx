"use client";

import { useState, useCallback } from "react";
import { HelpCircle } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { AccordionItem } from "./ui";
import { DEFAULT_FAQ, type FAQItem } from "@/shared/content";

interface FAQProps {
  title: string;
  items: FAQItem[];
}

export function FAQ({ title, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayItems = items.length > 0 ? items : DEFAULT_FAQ;
  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <Section id="faq" title={title}>
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-2 mb-8">
        <HelpCircle className="w-10 h-10 text-[#0ea5e9]/80" aria-hidden />
        <p className="text-slate-600 text-center text-sm max-w-xl">
          Ответы на частые вопросы о программах и сотрудничестве
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
