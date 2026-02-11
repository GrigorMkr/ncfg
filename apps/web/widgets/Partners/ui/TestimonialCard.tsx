"use client";

import { Quote, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "@/shared/i18n";

interface Testimonial {
  company: string;
  quote: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  totalCount: number;
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  moreHref: string;
}

export function TestimonialCard({
  testimonial,
  totalCount,
  currentIndex: _currentIndex,
  onPrev,
  onNext,
  moreHref,
}: TestimonialCardProps) {
  const { t } = useTranslation();
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-lg shadow-slate-200/50 dark:shadow-black/20 p-6 md:p-10 hover:shadow-xl hover:border-[#0ea5e9]/20 dark:hover:border-[#38bdf8]/20 transition-all duration-300">
        <div className="icon-badge w-12 h-12 flex items-center justify-center mb-6">
          <Quote className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <blockquote className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
          {testimonial.quote}
        </blockquote>
        <div className="font-bold text-slate-900 dark:text-slate-100">{testimonial.company}</div>
      </div>

      {totalCount > 1 && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={onPrev}
            className="p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 hover:border-[#0ea5e9] dark:hover:border-[#38bdf8] hover:text-[#0ea5e9] dark:hover:text-[#38bdf8] transition-all duration-200"
            aria-label={t.misc.prevReview}
          >
            <ChevronLeft size={20} strokeWidth={1.75} />
          </button>
          <button
            onClick={onNext}
            className="p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 hover:border-[#0ea5e9] dark:hover:border-[#38bdf8] hover:text-[#0ea5e9] dark:hover:text-[#38bdf8] transition-all duration-200"
            aria-label={t.misc.nextReview}
          >
            <ChevronRight size={20} strokeWidth={1.75} />
          </button>
        </div>
      )}

      <div className="text-center mt-8">
        <Button href={moreHref} variant="secondary" className="gap-2">
          {t.btn.allReviews}
          <ArrowRight size={18} strokeWidth={1.75} />
        </Button>
      </div>
    </div>
  );
}
