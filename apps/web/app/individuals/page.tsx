import type { Metadata } from "next";
import {
  Header,
  HeroIndividuals,
  ProductShowcase,
  LeadForm,
  FAQ,
  Footer,
} from "@/widgets";
import homeData from "@/public/content/home.json";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Для частных лиц — Программы финансовой грамотности | НЦФГ",
  description:
    "Программы финансовой грамотности для частных лиц: клуб «ФинЗдоровье», финансовое воспитание детей, онлайн-курсы.",
  openGraph: {
    title: "Для частных лиц — НЦФГ",
    description:
      "Программы финансовой грамотности для частных лиц от Национального центра финансовой грамотности.",
    type: "website",
  },
};

const products = [
  {
    title: "Клуб «ФинЗдоровье»",
    description: "Сообщество для взрослых: управление личными финансами, бюджет, цели. Регулярные вебинары и мастер-классы от экспертов.",
    href: "/individuals/finzdorov",
    icon: "graduation-cap" as const,
  },
  {
    title: "Финансовое воспитание детей",
    description: "Программы и материалы для обучения детей основам финансов. Игровые методики для разных возрастов.",
    href: "/individuals/kids",
    icon: "trending-up" as const,
  },
  {
    title: "Онлайн-курсы",
    description: "Онлайн-обучение финансовой грамотности для всех возрастов. Учитесь в удобное время и темпе.",
    href: "/individuals/courses",
    icon: "zap" as const,
  },
];

const faqItems = [
  {
    question: "Как вступить в клуб «ФинЗдоровье»?",
    answer: "Оставьте заявку на сайте, и мы свяжемся с вами для оформления членства. Участие бесплатное.",
  },
  {
    question: "Подходят ли программы для начинающих?",
    answer: "Да, наши программы рассчитаны на разный уровень подготовки — от новичков до продвинутых пользователей.",
  },
  {
    question: "Есть ли программы для детей?",
    answer: "Да, мы разработали специальные игровые методики для детей разных возрастов — от дошкольников до подростков.",
  },
];

export default function IndividualsPage() {
  const { sections } = homeData;

  return (
    <>
      <Header />
      <main className="min-h-screen animate-page-in">
        <HeroIndividuals
          headline="Программы для частных лиц"
          lead="Научитесь управлять личными финансами и достигать финансовых целей"
          primaryCta={{ label: "Оставить заявку", href: "#lead-form" }}
        />
        <ProductShowcase
          title="Наши программы"
          lead="Выберите подходящий формат обучения финансовой грамотности"
          products={products}
        />
        <LeadForm />
        <FAQ title="Частые вопросы" items={faqItems} />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
