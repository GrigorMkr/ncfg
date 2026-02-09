import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Header,
  HowWeWork,
  LeadForm,
  FAQ,
  Footer,
} from "@/widgets";
import { ServiceHero } from "@/widgets/ServiceHero";
import { ServiceDescription } from "@/widgets/ServiceDescription";
import { ServiceFacts } from "@/widgets/ServiceFacts";
import { ServiceExamples } from "@/widgets/ServiceExamples";
import servicesData from "@/public/content/ncfg_services.json";
import homeData from "@/public/content/home.json";
import type { Service, ServicesData } from "@/shared/api/types/service";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function findServiceById(data: ServicesData, id: string): Service | null {
  for (const category of data.serviceCategories) {
    const service = category.services.find((s) => s.id === id);
    if (service) {
      return service;
    }
  }
  return null;
}

function getAllServiceIds(data: ServicesData): string[] {
  const ids: string[] = [];
  for (const category of data.serviceCategories) {
    for (const service of category.services) {
      if (service.status === "published") {
        ids.push(service.id);
      }
    }
  }
  return ids;
}

export async function generateStaticParams() {
  const ids = getAllServiceIds(servicesData as ServicesData);
  return ids.map((id) => ({ slug: id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = findServiceById(servicesData as ServicesData, slug);

  if (!service) {
    return {
      title: "Not Found — NCFL",
    };
  }

  return {
    title: `${service.title} — NCFL`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} — NCFL`,
      description: service.shortDescription,
      type: "website",
    },
  };
}


export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = findServiceById(servicesData as ServicesData, slug);

  if (!service) {
    notFound();
  }

  const howWeWorkSteps = service.howWeWork?.map((step, index) => ({
    id: index + 1,
    title: `Step ${index + 1}`,
    description: step,
  }));

  const { sections } = homeData;

  return (
    <>
      <Header />
      <main>
        <ServiceHero
          serviceId={slug}
          title={service.title}
          shortDescription={service.shortDescription}
          ctaLabel={service.cta?.label}
        />
        <ServiceDescription
          fullDescription={service.fullDescription}
          benefits={service.benefits}
        />
        {service.facts && <ServiceFacts facts={service.facts} />}
        {howWeWorkSteps && howWeWorkSteps.length > 0 && (
          <HowWeWork steps={howWeWorkSteps} />
        )}
        {service.examples && service.examples.length > 0 && (
          <ServiceExamples examples={service.examples} />
        )}
        <LeadForm />
        <FAQ translationKey="serviceFaq" />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
