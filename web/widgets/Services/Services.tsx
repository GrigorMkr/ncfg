"use client";

import { memo } from "react";
import { Section } from "@/shared/ui/Section";
import { ServiceCard, OtherServicesCard, ServiceTabs } from "./ui";
import { ServiceTab } from "@/shared/constants";
import { OTHER_SERVICES_HREF } from "@/shared/config";
import { useServicesTab } from "@/shared/slices/services";

interface Service {
  id?: string;
  title: string;
  description: string;
  href: string;
  image: string | null;
}

interface ServicesProps {
  title: string;
  servicesIndividuals: Service[];
  servicesBusiness: Service[];
}

function ServicesInner({
  title,
  servicesIndividuals,
  servicesBusiness,
}: ServicesProps) {
  const { activeTab, onTabChange } = useServicesTab(ServiceTab.BUSINESS);
  const list = activeTab === ServiceTab.INDIVIDUALS ? servicesIndividuals : servicesBusiness;
  const otherHref = OTHER_SERVICES_HREF[activeTab];

  return (
    <Section id="services" title={title} background="gray">
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
