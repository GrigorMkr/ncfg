"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { Button } from "@/shared/ui/Button";
import { LogoCard, PartnersCategoryTabs, TestimonialCard } from "./ui";

interface Logo {
  title: string;
  href: string | null;
  img?: string;
}

interface Category {
  name: string;
  logos: Logo[];
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
    archiveCta: { label: string; href: string };
  };
  testimonials: {
    title: string;
    items: Testimonial[];
    more: { labelTop: string; labelBottom: string; href: string };
  };
}

export function Partners({ clientsCarousel, testimonials }: PartnersProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const currentCategory = clientsCarousel.categories[activeCategory];
  const currentTestimonial = testimonials.items[activeTestimonial];

  return (
    <Section id="partners" title={clientsCarousel.title}>
      <PartnersCategoryTabs
        categories={clientsCarousel.categories}
        activeIndex={activeCategory}
        onSelect={setActiveCategory}
      />

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mb-10">
        {currentCategory.logos.slice(0, 12).map((logo) => (
          <LogoCard key={logo.title + (logo.href ?? "")} logo={logo} />
        ))}
      </div>

      <div className="text-center mb-14">
        <Button href={clientsCarousel.archiveCta.href} variant="secondary" className="gap-2">
          Все клиенты
          <ArrowRight size={18} strokeWidth={1.75} className="group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>

      <div className="border-t border-slate-200/80 pt-14">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">
          {testimonials.title}
        </h3>

        {testimonials.items.length > 0 && (
          <TestimonialCard
            testimonial={currentTestimonial}
            totalCount={testimonials.items.length}
            currentIndex={activeTestimonial}
            onPrev={() =>
              setActiveTestimonial(
                (prev) => (prev - 1 + testimonials.items.length) % testimonials.items.length
              )
            }
            onNext={() =>
              setActiveTestimonial((prev) => (prev + 1) % testimonials.items.length)
            }
            moreHref={testimonials.more.href}
          />
        )}
      </div>
    </Section>
  );
}
