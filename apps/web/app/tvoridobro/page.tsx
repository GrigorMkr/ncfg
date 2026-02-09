import type { Metadata } from "next";
import {
  Header,
  Hero,
  LeadForm,
  Footer,
} from "@/widgets";
import { TvoriDobroContent } from "@/widgets/TvoriDobroContent";
import homeData from "@/public/content/home.json";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Do Good — Social & Charitable Projects | NCFL",
  description:
    "NCFL implements social projects on financial literacy: programs for children, women, libraries. Join the good deeds.",
  openGraph: {
    title: "Do Good — NCFL Social Projects",
    description:
      "NCFL implements social projects on financial literacy for various population groups.",
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
        />
        <TvoriDobroContent />
        <LeadForm />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
