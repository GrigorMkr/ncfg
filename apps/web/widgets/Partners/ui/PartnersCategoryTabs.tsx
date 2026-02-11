"use client";

import { Building2 } from "lucide-react";
import { cn } from "@/shared/lib/cn";

interface Category {
  name: string;
}

interface PartnersCategoryTabsProps {
  categories: Category[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function PartnersCategoryTabs({
  categories,
  activeIndex,
  onSelect,
}: PartnersCategoryTabsProps) {
  return (
    <div className="mb-10 flex flex-wrap gap-3 justify-center">
      {categories.map((category, index) => (
        <button
          key={category.name}
          onClick={() => onSelect(index)}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200",
            activeIndex === index
              ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-lg shadow-slate-900/20 dark:shadow-slate-100/10"
              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-slate-300 dark:border-slate-600 hover:border-[#0ea5e9]/50 dark:hover:border-[#38bdf8]/50 hover:bg-slate-50 dark:hover:bg-slate-700"
          )}
        >
          <span className="icon-badge w-7 h-7 flex items-center justify-center">
            <Building2 className="w-3.5 h-3.5" strokeWidth={1.75} />
          </span>
          {category.name}
        </button>
      ))}
    </div>
  );
}
