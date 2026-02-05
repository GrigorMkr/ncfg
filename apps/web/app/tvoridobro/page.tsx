import type { Metadata } from "next";
import {
  Header,
  Hero,
  LeadForm,
  Footer,
} from "@/widgets";
import { Section } from "@/shared/ui";
import homeData from "@/public/content/home.json";
import { REVALIDATE } from "@/shared/config/design-tokens";

export const revalidate = REVALIDATE.DEFAULT;

export const metadata: Metadata = {
  title: "Твори добро — Социальные и благотворительные проекты | НЦФГ",
  description:
    "НЦФГ реализует социальные проекты по финансовой грамотности: программы для детей, женщин, библиотек. Участвуйте в добрых делах.",
  openGraph: {
    title: "Твори добро — Социальные проекты НЦФГ",
    description:
      "НЦФГ реализует социальные проекты по финансовой грамотности для разных групп населения.",
    type: "website",
  },
};

export default function TvoridobroPage() {
  const { sections } = homeData;

  return (
    <>
      <Header />
      <main className="min-h-screen animate-page-in">
        <Hero
          variant="tvoridobro"
          headline="Твори добро — социальные проекты по финансовой грамотности"
        />
        <Section
          title="Финансовая грамотность для всех"
          lead="НЦФГ реализует благотворительные и социальные проекты, направленные на повышение финансовой грамотности уязвимых групп населения."
          background="gray"
        >
          <div className="max-w-2xl mx-auto text-center space-y-6 animate-fade-in-up">
            <p className="text-lg text-slate-600 leading-relaxed">
              Мы проводим бесплатные программы для детей и молодёжи, женщин, людей старшего возраста,
              а также реализуем проекты в библиотеках и на рабочих местах.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Узнайте, как принять участие или поддержать наши инициативы.
            </p>
          </div>
        </Section>
        <LeadForm />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
