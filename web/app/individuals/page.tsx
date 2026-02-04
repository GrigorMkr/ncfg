import type { Metadata } from "next";
import {
  Header,
  HeroIndividuals,
  ProductShowcase,
  FAQ,
  LeadForm,
  Footer,
} from "@/widgets";
import homeData from "@/public/content/home.json";
import individualsData from "@/public/content/individuals.json";
import { REVALIDATE } from "@/shared/config/design-tokens";

export const revalidate = REVALIDATE.DEFAULT;

type IconType = "graduation-cap" | "trending-up" | "zap";

interface Product {
  title: string;
  description: string;
  href: string;
  icon?: IconType;
}

export const metadata: Metadata = {
  title: "Частным лицам — Финансовая грамотность для вас и вашей семьи | НЦФГ",
  description:
    "Программы финансовой грамотности для частных лиц: клуб ФинЗдоровье, финансовое воспитание детей, онлайн-курсы. Научитесь управлять личными финансами.",
  openGraph: {
    title: "Частным лицам — Финансовая грамотность | НЦФГ",
    description:
      "Программы финансовой грамотности для частных лиц: клуб ФинЗдоровье, финансовое воспитание детей, онлайн-курсы.",
    type: "website",
  },
};

export default function IndividualsPage() {
  const { sections } = homeData;
  const { hero, products, faq } = individualsData;

  return (
    <>
      <Header />
      <main className="min-h-screen animate-page-in">
        <HeroIndividuals
          headline={hero.headline}
          lead={hero.lead}
          primaryCta={hero.primaryCta}
        />
        <ProductShowcase
          title="Наши продукты"
          lead="Выберите подходящий формат обучения финансовой грамотности"
          products={products as Product[]}
        />
        <LeadForm />
        <FAQ title="Частые вопросы" items={faq} />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
