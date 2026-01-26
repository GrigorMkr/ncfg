import type { Metadata } from "next";
import {
  Header,
  HeroCompanies,
  ServiceCatalog,
  FAQ,
  LeadForm,
  Footer,
} from "@/widgets";
import homeData from "@/public/content/home.json";
import companiesData from "@/public/content/companies.json";

export const metadata: Metadata = {
  title: "Компаниям — Программы финансового благополучия для сотрудников | НЦФГ",
  description:
    "Комплексные программы финансовой грамотности для бизнеса: консалтинг, обучение, поддержка сотрудников. Повысьте финансовое благополучие вашей команды.",
  openGraph: {
    title: "Компаниям — Финансовая грамотность для бизнеса | НЦФГ",
    description:
      "Комплексные программы финансовой грамотности для бизнеса: консалтинг, обучение, поддержка сотрудников.",
    type: "website",
  },
};

export default function CompaniesPage() {
  const { sections } = homeData;
  const { hero, services, faq } = companiesData;

  return (
    <>
      <Header />
      <main>
        <HeroCompanies
          headline={hero.headline}
          lead={hero.lead}
          primaryCta={hero.primaryCta}
        />
        <ServiceCatalog services={services} />
        <LeadForm />
        <FAQ title="Частые вопросы" items={faq} />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
