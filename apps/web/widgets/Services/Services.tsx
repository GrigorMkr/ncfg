"use client";

import { memo, useMemo } from "react";
import { Section } from "@/shared/ui/Section";
import { ServiceCard, OtherServicesCard, ServiceTabs } from "./ui";
import { ServiceTab } from "@/shared/constants";
import { OTHER_SERVICES_HREF } from "@/shared/config";
import { useServicesTab } from "@/shared/slices/services";
import { useTranslation } from "@/shared/i18n";

interface Service {
  id?: string;
  title: string;
  description: string;
  href: string;
  image: string | null;
}

interface ServicesProps {
  title?: string;
  servicesIndividuals: Service[];
  servicesBusiness: Service[];
}

function ServicesInner({
  title,
  servicesIndividuals = [],
  servicesBusiness = [],
}: ServicesProps) {
  const { t } = useTranslation();
  const { activeTab, onTabChange } = useServicesTab(ServiceTab.BUSINESS);

  // Map translated titles/descriptions onto services
  const translatedIndividuals = useMemo(() =>
    servicesIndividuals.map((s, i) => ({
      ...s,
      title: t.servicesData.individuals[i]?.title ?? s.title,
      description: t.servicesData.individuals[i]?.description ?? s.description,
    })),
    [servicesIndividuals, t]
  );

  const translatedBusiness = useMemo(() =>
    servicesBusiness.map((s, i) => ({
      ...s,
      title: t.servicesData.business[i]?.title ?? s.title,
      description: t.servicesData.business[i]?.description ?? s.description,
    })),
    [servicesBusiness, t]
  );

  const list = activeTab === ServiceTab.INDIVIDUALS ? translatedIndividuals : translatedBusiness;
  if (!list || list.length === 0) return null;
  const otherHref = OTHER_SERVICES_HREF[activeTab];

  return (
    <Section id="services" title={title || t.sections.services} background="gray">
      <ServiceTabs activeTab={activeTab} onTabChange={onTabChange} />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {list.map((service, index) => (
          <ServiceCard key={service.id ?? service.title} service={service} index={index} />
        ))}
        <OtherServicesCard href={otherHref} />
      </div>
    </Section>
  );
}

export const Services = memo(ServicesInner);
