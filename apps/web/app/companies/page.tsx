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
  title: "Для компаний — Корпоративные программы | НЦФГ",
  description:
    "Программы финансовой грамотности для компаний: well-being, мероприятия для клиентов, разработка материалов.",
  openGraph: {
    title: "Для компаний — НЦФГ",
    description:
      "Корпоративные программы финансовой грамотности от Национального центра финансовой грамотности.",
    type: "website",
  },
};

const faqItems = [
  {
    question: "Как начать сотрудничество?",
    answer: "Оставьте заявку на сайте или позвоните нам. Мы проведём бесплатную консультацию и предложим оптимальное решение.",
  },
  {
    question: "Работаете ли вы с компаниями из регионов?",
    answer: "Да, мы работаем по всей России. Онлайн-форматы доступны для любого региона.",
  },
  {
    question: "Можно ли адаптировать программу под нашу компанию?",
    answer: "Да, мы адаптируем контент и форматы под специфику вашей отрасли и потребности сотрудников.",
  },
];

export default function CompaniesPage() {
  const { sections } = homeData;
  const businessServices = servicesData.serviceCategories?.find(c => c.id === "business")?.services ?? [];

  return (
    <>
      <Header />
      <main className="min-h-screen animate-page-in">
        <HeroCompanies
          headline="Программы для компаний"
          lead="Комплексные решения по финансовой грамотности для вашего бизнеса"
          primaryCta={{ label: "Оставить заявку", href: "#lead-form" }}
        />
        <ServiceCatalog
          title="Наши услуги"
          lead="Выберите подходящее решение для вашей компании"
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
        <FAQ title="Частые вопросы" items={faqItems} />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
