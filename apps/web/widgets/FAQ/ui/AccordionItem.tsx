"use client";

import { memo } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { FAQItem } from "@/shared/content";
import { ANIMATION } from "@/shared/constants";

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: (index: number) => void;
  index: number;
}

export const AccordionItem = memo(function AccordionItem({ item, isOpen, onToggle, index }: AccordionItemProps) {
  return (
    <div
      className={cn(
        "border border-slate-200/80 dark:border-slate-700/80 rounded-xl overflow-hidden transition-all duration-300 dark:bg-slate-800/50",
        isOpen && "border-[#0ea5e9]/40 dark:border-[#38bdf8]/40 bg-[#0ea5e9]/5 dark:bg-[#38bdf8]/10 shadow-md"
      )}
      style={{ animationDelay: `${index * (ANIMATION.DURATION_FAST / 2.5)}ms` }}
    >
      <button
        onClick={() => onToggle(index)}
        className="w-full py-5 px-5 flex items-start justify-between gap-4 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-slate-900 group-hover:text-[#0ea5e9] transition-colors">
          {item.question}
        </span>
        <ChevronDown
          size={20}
          strokeWidth={1.75}
          className={cn(
            "shrink-0 mt-1 text-slate-400 transition-transform duration-300",
            isOpen && "rotate-180 text-[#0ea5e9]"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        )}
      >
        <p className="text-slate-600 dark:text-white/90 leading-relaxed px-5 pr-12">{item.answer}</p>
      </div>
    </div>
  );
});
