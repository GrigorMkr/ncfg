import type { Metadata } from "next";
import {
  Header,
  Hero,
  Stats,
  HowWeWork,
  Principles,
  Team,
  Experts,
  LeadForm,
  FAQ,
  Footer,
} from "@/widgets";
import homeData from "@/public/content/home.json";
import howWeWorkData from "@/public/content/ncfg_how_we_work.json";
import principlesData from "@/public/content/ncfg_principles.json";
import peopleData from "@/public/content/ncfg_finzdorov_people.json";
import { fetchPeopleData } from "@/shared/api/data-provider";
import { REVALIDATE } from "@/shared/config/design-tokens";

export const metadata: Metadata = {
  title: "О центре — Национальный центр финансовой грамотности | НЦФГ",
  description:
    "Национальный центр финансовой грамотности с 2005 года реализует проекты по повышению финансовой грамотности. Узнайте о нашей команде, принципах работы и экспертах.",
  openGraph: {
    title: "О центре — НЦФГ",
    description:
      "Национальный центр финансовой грамотности с 2005 года реализует проекты по повышению финансовой грамотности населения России.",
    type: "website",
  },
};

export const revalidate = REVALIDATE.DEFAULT;

const faqItems = [
  {
    question: "Как давно существует НЦФГ?",
    answer:
      "Национальный центр финансовой грамотности работает с 2005 года. За это время мы реализовали сотни проектов по повышению финансовой грамотности для государственных структур, бизнеса и частных лиц.",
  },
  {
    question: "Какие специалисты работают в НЦФГ?",
    answer:
      "В нашей команде работают сертифицированные финансовые консультанты, методологи образовательных программ, эксперты по инвестициям, налогам и недвижимости. Многие из них имеют более 20 лет опыта на финансовом рынке.",
  },
  {
    question: "Можно ли сотрудничать с НЦФГ как эксперт?",
    answer:
      "Да, мы всегда открыты для сотрудничества с профессионалами в области финансов. Оставьте заявку на сайте, и мы свяжемся с вами для обсуждения возможных форматов взаимодействия.",
  },
  {
    question: "В каких регионах работает НЦФГ?",
    answer:
      "НЦФГ реализует проекты по всей России — в 84 регионах. Мы работаем как онлайн, так и офлайн, что позволяет охватить максимально широкую аудиторию.",
  },
];

export default async function AboutPage() {
  const { sections } = homeData;
  let people;
  try {
    const data = await fetchPeopleData();
    people = data.people;
  } catch {
    people = peopleData.people;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen animate-page-in">
        <Hero
          variant="about"
          headline="Национальный центр финансовой грамотности — лидер в сфере финансового просвещения с 2005 года"
          primaryCta={{ label: "Наши проекты", href: "/companies" }}
        />
        <Stats />
        <HowWeWork title={howWeWorkData.title} steps={howWeWorkData.steps} />
        <Principles
          title={principlesData.title}
          principles={principlesData.principles}
        />
        <Team title="Наша команда" members={people} />
        <Experts title="Наши эксперты" experts={people} />
        <LeadForm />
        <FAQ title="Частые вопросы" items={faqItems} />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
