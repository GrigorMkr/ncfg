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

export const metadata: Metadata = {
  title: "About — National Center for Financial Literacy | NCFL",
  description:
    "National Center for Financial Literacy has been implementing financial literacy projects since 2005. Learn about our team, principles and experts.",
  openGraph: {
    title: "About — NCFL",
    description:
      "National Center for Financial Literacy has been implementing financial literacy projects since 2005.",
    type: "website",
  },
};

export const revalidate = 60;


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
          primaryCta={{ href: "/companies" }}
        />
        <Stats />
        <HowWeWork steps={howWeWorkData.steps} />
        <Principles
          principles={principlesData.principles}
        />
        <Team members={people} />
        <Experts experts={people} />
        <LeadForm />
        <FAQ translationKey="aboutFaq" />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
