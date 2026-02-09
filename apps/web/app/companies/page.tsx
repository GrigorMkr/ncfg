import type { Metadata } from "next";
import {
  Header,
  HeroCompanies,
  ServiceCatalog,
  Partners,
  LeadForm,
  FAQ,
  Footer,
} from "@/widgets";
import homeData from "@/public/content/home.json";
import servicesData from "@/public/content/ncfg_services.json";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "For Companies — Corporate Programs | NCFL",
  description:
    "Financial literacy programs for companies: well-being, client events, content development.",
  openGraph: {
    title: "For Companies — NCFL",
    description:
      "Corporate financial literacy programs from the National Center for Financial Literacy.",
    type: "website",
  },
};

export default function CompaniesPage() {
  const { sections } = homeData;
  const businessServices = servicesData.serviceCategories?.find(c => c.id === "business")?.services ?? [];

  return (
    <>
      <Header />
      <main className="min-h-screen animate-page-in">
        <HeroCompanies
          primaryCta={{ href: "#lead-form" }}
        />
        <ServiceCatalog
          services={businessServices.map(s => ({
            id: s.id,
            title: s.title,
            description: s.shortDescription,
            href: `/companies/${s.id}`,
          }))}
        />
        <Partners
          clientsCarousel={sections.Partners.data.clientsCarousel}
          testimonials={sections.Partners.data.testimonials}
        />
        <LeadForm />
        <FAQ translationKey="companiesFaq" />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
