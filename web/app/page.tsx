import dynamic from "next/dynamic";
import { Header } from "@/widgets/Header";
import { Hero } from "@/widgets/Hero";
import homeData from "@/public/content/home.json";

const Products = dynamic(
  () => import("@/widgets/Products/Products").then((m) => ({ default: m.Products })),
  { ssr: true }
);
const Services = dynamic(
  () => import("@/widgets/Services/Services").then((m) => ({ default: m.Services })),
  { ssr: true }
);
const Partners = dynamic(
  () => import("@/widgets/Partners/Partners").then((m) => ({ default: m.Partners })),
  { ssr: true }
);
const News = dynamic(
  () => import("@/widgets/News/News").then((m) => ({ default: m.News })),
  { ssr: true }
);
const FAQ = dynamic(
  () => import("@/widgets/FAQ/FAQ").then((m) => ({ default: m.FAQ })),
  { ssr: true }
);
const LeadForm = dynamic(
  () => import("@/widgets/LeadForm/LeadForm").then((m) => ({ default: m.LeadForm })),
  { ssr: true }
);
const Footer = dynamic(
  () => import("@/widgets/Footer/Footer").then((m) => ({ default: m.Footer })),
  { ssr: true }
);

export default function Home() {
  const { sections } = homeData;

  return (
    <>
      <Header />
      <main>
        <Hero
          headline="Более 20 лет помогаем клиентам разбираться в финансах — от программ для детей до федеральных инициатив"
          primaryCta={sections.Hero.data.primaryCta}
        />
        <Products />
        <Services
          title={sections.Services.data.title}
          services={sections.Services.data.services}
        />
        <Partners
          clientsCarousel={sections.Partners.data.clientsCarousel}
          testimonials={sections.Partners.data.testimonials}
        />
        <LeadForm />
        <FAQ title={sections.FAQ.data.title} items={[]} />
        <News
          title={sections.News.data.title}
          items={[]}
          archiveHref={sections.News.data.links[0]?.href}
        />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
