"use client";

import { Quote, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui/Button";

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
  currentIndex,
  onPrev,
  onNext,
  moreHref,
}: TestimonialCardProps) {
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/50 p-6 md:p-10 hover:shadow-xl hover:border-[#0ea5e9]/20 transition-all duration-300">
        <div className="icon-badge w-12 h-12 flex items-center justify-center mb-6">
          <Quote className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <blockquote className="text-slate-600 text-lg leading-relaxed mb-6">
          {testimonial.quote}
        </blockquote>
        <div className="font-bold text-slate-900">{testimonial.company}</div>
      </div>

      {totalCount > 1 && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={onPrev}
            className="p-3 rounded-xl bg-white border-2 border-slate-200 hover:border-[#0ea5e9] hover:text-[#0ea5e9] transition-all duration-200"
            aria-label="Предыдущая рекомендация"
          >
            <ChevronLeft size={20} strokeWidth={1.75} />
          </button>
          <button
            onClick={onNext}
            className="p-3 rounded-xl bg-white border-2 border-slate-200 hover:border-[#0ea5e9] hover:text-[#0ea5e9] transition-all duration-200"
            aria-label="Следующая рекомендация"
          >
            <ChevronRight size={20} strokeWidth={1.75} />
          </button>
        </div>
      )}

      <div className="text-center mt-8">
        <Button href={moreHref} variant="secondary" className="gap-2">
          Все отзывы
          <ArrowRight size={18} strokeWidth={1.75} />
        </Button>
      </div>
    </div>
  );
}
