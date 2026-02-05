import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { ICON_SIZE, STROKE_WIDTH } from "@/shared/constants";

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
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <Section id="services" title={title} lead={lead} background="gray">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link
            key={service.id}
            href={service.href}
            className="group bg-white rounded-2xl border border-slate-200/80 p-6 hover:border-[#0ea5e9]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#0ea5e9] transition-colors mb-2">
              {service.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {service.description}
            </p>
            <span className="inline-flex items-center gap-1 text-[#0ea5e9] text-sm font-medium">
              Подробнее
              <ArrowRight size={ICON_SIZE.SM} strokeWidth={STROKE_WIDTH.DEFAULT} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
