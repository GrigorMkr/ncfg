"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { ICON_SIZE, STROKE_WIDTH } from "@/shared/constants";
import { useTranslation } from "@/shared/i18n";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  href: string;
}

interface ServiceCatalogProps {
  title?: string;
  lead?: string;
  services: ServiceItem[];
}

export function ServiceCatalog({ title, lead, services }: ServiceCatalogProps) {
  const { t } = useTranslation();

  // Translate service titles/descriptions from catalog
  const translatedServices = useMemo(() =>
    services.map((s) => {
      const catKey = s.id as keyof typeof t.serviceCatalog;
      const catData = t.serviceCatalog[catKey];
      if (catData) {
        return { ...s, title: catData.title, description: catData.description };
      }
      return s;
    }),
    [services, t]
  );

  if (!translatedServices || translatedServices.length === 0) {
    return null;
  }

  return (
    <Section id="services" title={title || t.sections.servicesTitle} lead={lead || t.sections.servicesLead} background="gray">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {translatedServices.map((service) => (
          <Link
            key={service.id}
            href={service.href}
            className="group bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 hover:border-[#0ea5e9]/40 dark:hover:border-[#38bdf8]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-[#0ea5e9] dark:group-hover:text-[#38bdf8] transition-colors mb-2">
              {service.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
              {service.description}
            </p>
            <span className="inline-flex items-center gap-1 text-[#0ea5e9] text-sm font-medium">
              {t.btn.more}
              <ArrowRight size={ICON_SIZE.SM} strokeWidth={STROKE_WIDTH.DEFAULT} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
