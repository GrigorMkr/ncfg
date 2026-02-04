import { Section } from "@/shared/ui/Section";
import { ServiceBlock } from "./ServiceBlock";
import { SERVICE_CATALOG } from "@/shared/config";

interface ServiceItem {
  title: string;
  description: string;
  href: string;
  icon: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  items: ServiceItem[];
}

interface ServiceCatalogProps {
  services: Service[];
}

export function ServiceCatalog({ services }: ServiceCatalogProps) {
  return (
    <Section
      id="services"
      title={SERVICE_CATALOG.title}
      lead={SERVICE_CATALOG.lead}
      background="gray"
    >
      {services.map((service) => (
        <ServiceBlock
          key={service.id}
          title={service.title}
          description={service.description}
          items={service.items}
        />
      ))}
    </Section>
  );
}
