"use client";

import { useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { Button } from "@/shared/ui/Button";
import { LogoCard, PartnersCategoryTabs, TestimonialCard } from "./ui";
import { useTranslation } from "@/shared/i18n";

interface Logo {
  title: string;
  href: string | null;
  img?: string;
}

interface Category {
  id?: string;
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

const CATEGORY_IDS = ["business", "finance", "government", "education", "media"] as const;

export function Partners({ clientsCarousel, testimonials }: PartnersProps) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Translate category names
  const translatedCategories = useMemo(() =>
    clientsCarousel.categories.map((cat, i) => {
      const catId = (cat as { id?: string }).id ?? CATEGORY_IDS[i];
      const catKey = catId as keyof typeof t.partnersSection.categories;
      return {
        ...cat,
        name: t.partnersSection.categories[catKey] ?? cat.name,
      };
    }),
    [clientsCarousel.categories, t]
  );

  // Translate testimonials
  const translatedTestimonials = useMemo(() =>
    testimonials.items.map((item, i) => ({
      ...item,
      company: t.partnersSection.testimonials[i]?.company ?? item.company,
      quote: t.partnersSection.testimonials[i]?.quote ?? item.quote,
    })),
    [testimonials.items, t]
  );

  const currentCategory = translatedCategories[activeCategory];
  const currentTestimonial = translatedTestimonials[activeTestimonial];

  return (
    <Section id="partners" title={t.partnersSection.title}>
      <PartnersCategoryTabs
        categories={translatedCategories}
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
          {t.btn.allClients}
          <ArrowRight size={18} strokeWidth={1.75} className="group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>

      <div className="border-t border-slate-200/80 dark:border-slate-700/80 pt-14">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 text-center mb-10">
          {t.partnersSection.testimonialsTitle}
        </h3>

        {translatedTestimonials.length > 0 && (
          <TestimonialCard
            testimonial={currentTestimonial}
            totalCount={translatedTestimonials.length}
            currentIndex={activeTestimonial}
            onPrev={() =>
              setActiveTestimonial(
                (prev) => (prev - 1 + translatedTestimonials.length) % translatedTestimonials.length
              )
            }
            onNext={() =>
              setActiveTestimonial((prev) => (prev + 1) % translatedTestimonials.length)
            }
            moreHref={testimonials.more.href}
          />
        )}
      </div>
    </Section>
  );
}
