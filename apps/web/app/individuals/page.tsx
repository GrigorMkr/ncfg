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
  title: "For Individuals — Financial Literacy Programs | NCFL",
  description:
    "Financial literacy programs for individuals: FinHealth club, children's financial education, online courses.",
  openGraph: {
    title: "For Individuals — NCFL",
    description:
      "Financial literacy programs for individuals from the National Center for Financial Literacy.",
    type: "website",
  },
};

const products = [
  {
    title: "",
    description: "",
    href: "/individuals/finzdorov",
    icon: "graduation-cap" as const,
  },
  {
    title: "",
    description: "",
    href: "/individuals/kids",
    icon: "trending-up" as const,
  },
  {
    title: "",
    description: "",
    href: "/individuals/courses",
    icon: "zap" as const,
  },
];

export default function IndividualsPage() {
  const { sections } = homeData;

  return (
    <>
      <Header />
      <main className="min-h-screen animate-page-in">
        <HeroIndividuals
          primaryCta={{ href: "#lead-form" }}
        />
        <ProductShowcase
          products={products}
        />
        <LeadForm />
        <FAQ translationKey="individualsFaq" />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
