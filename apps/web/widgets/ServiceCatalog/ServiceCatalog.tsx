import { Section } from "@/shared/ui/Section";
import { ServiceBlock } from "./ServiceBlock";

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
      title="Наши услуги"
      lead="Комплексные решения для развития финансовой культуры в компании"
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
