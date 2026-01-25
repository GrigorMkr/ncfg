"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/cn";

interface Logo {
  title: string;
  href: string | null;
  img: string;
}

interface Category {
  name: string;
  logos: Logo[];
  more: {
    display: string;
    value: number;
    unit: string;
  };
}

interface Testimonial {
  company: string;
  logoImg: string;
  quote: string;
}

interface PartnersProps {
  clientsCarousel: {
    title: string;
    categories: Category[];
    archiveCta: {
      label: string;
      href: string;
    };
  };
  testimonials: {
    title: string;
    items: Testimonial[];
    more: {
      labelTop: string;
      labelBottom: string;
      href: string;
    };
  };
}

export function Partners({ clientsCarousel, testimonials }: PartnersProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const currentCategory = clientsCarousel.categories[activeCategory];
  const currentTestimonial = testimonials.items[activeTestimonial];

  return (
    <Section id="partners" title={clientsCarousel.title}>
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {clientsCarousel.categories.map((category, index) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(index)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-colors",
              activeCategory === index
                ? "bg-[#1E3A5F] text-white"
                : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F1F5F9]"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mb-6">
        {currentCategory.logos.slice(0, 12).map((logo) => (
          <div
            key={logo.title}
            className="aspect-[3/2] bg-white rounded-lg border border-[#F1F5F9] p-4 flex items-center justify-center hover:border-[#E2E8F0] hover:shadow-sm transition-all"
            title={logo.title}
          >
            <div className="text-[#94A3B8] text-xs text-center font-medium">
              {logo.title}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mb-12">
        <Button href={clientsCarousel.archiveCta.href} variant="secondary">
          Все клиенты
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>

      <div className="border-t border-[#F1F5F9] pt-12">
        <h3 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] text-center mb-8">
          {testimonials.title}
        </h3>

        {testimonials.items.length > 0 && (
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-[#F8FAFC] rounded-2xl p-6 md:p-8">
              <Quote className="w-10 h-10 text-[#58A8E0] mb-4" />
              <blockquote className="text-[#475569] text-lg leading-relaxed mb-6">
                {currentTestimonial.quote}
              </blockquote>
              <div className="font-semibold text-[#1E3A5F]">
                {currentTestimonial.company}
              </div>
            </div>

            {testimonials.items.length > 1 && (
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() =>
                    setActiveTestimonial(
                      (prev) => (prev - 1 + testimonials.items.length) % testimonials.items.length
                    )
                  }
                  className="p-2 rounded-full bg-white border border-[#E2E8F0] hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors"
                  aria-label="Предыдущая рекомендация"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() =>
                    setActiveTestimonial((prev) => (prev + 1) % testimonials.items.length)
                  }
                  className="p-2 rounded-full bg-white border border-[#E2E8F0] hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors"
                  aria-label="Следующая рекомендация"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            <div className="text-center mt-6">
              <Button href={testimonials.more.href} variant="secondary">
                Все рекомендации
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
