"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { cn } from "@/shared/lib/cn";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title: string;
  items: FAQItem[];
}

const placeholderFAQ: FAQItem[] = [
  {
    question: "Что такое финансовая грамотность и зачем она нужна?",
    answer: "Финансовая грамотность — это набор знаний и навыков, которые помогают принимать взвешенные решения о личных финансах: планировать бюджет, управлять долгами, инвестировать и защищаться от финансового мошенничества.",
  },
  {
    question: "Какие программы вы предлагаете для компаний?",
    answer: "Мы разрабатываем комплексные программы финансового well-being для сотрудников: онлайн-курсы, вебинары, индивидуальные консультации, марафоны и офлайн-мероприятия. Программы адаптируются под потребности конкретной компании.",
  },
  {
    question: "Как начать сотрудничество с НЦФГ?",
    answer: "Оставьте заявку на сайте или свяжитесь с нами напрямую. Наши специалисты проведут бесплатную консультацию, определят потребности и предложат оптимальное решение для вашей организации.",
  },
  {
    question: "Есть ли бесплатные материалы для самостоятельного изучения?",
    answer: "Да, мы предоставляем бесплатные материалы: статьи, чек-листы, памятки и видеоуроки по основам финансовой грамотности. Они доступны в разделе «Наработки» на нашем сайте.",
  },
  {
    question: "Работаете ли вы с государственными организациями?",
    answer: "Да, мы активно сотрудничаем с Минфином России, Центральным банком, региональными министерствами финансов и другими государственными структурами в рамках национальных проектов по повышению финансовой грамотности населения.",
  },
];

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#F1F5F9] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-start justify-between gap-4 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-[#1E3A5F] group-hover:text-[#3B82F6] transition-colors">
          {item.question}
        </span>
        <ChevronDown
          size={20}
          className={cn(
            "shrink-0 mt-1 text-[#94A3B8] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        )}
      >
        <p className="text-[#475569] leading-relaxed pr-8">{item.answer}</p>
      </div>
    </div>
  );
}

export function FAQ({ title, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayItems = items.length > 0 ? items : placeholderFAQ;

  return (
    <Section id="faq" title={title}>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#F1F5F9] px-6 md:px-8">
        {displayItems.map((item, index) => (
          <AccordionItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </Section>
  );
}
