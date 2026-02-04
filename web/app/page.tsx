import { Header } from "@/widgets/Header";
import { Hero } from "@/widgets/Hero";
import { Products } from "@/widgets/Products";
import { Services } from "@/widgets/Services";
import { Partners } from "@/widgets/Partners";
import { News } from "@/widgets/News";
import { FAQ } from "@/widgets/FAQ";
import { LeadForm } from "@/widgets/LeadForm";
import { Footer } from "@/widgets/Footer";
import homeData from "@/public/content/home.json";
import { fetchLatestNewsArticles } from "@/shared/api/data-provider";
import { REVALIDATE, SPACING } from "@/shared/config/design-tokens";

export const revalidate = REVALIDATE.DEFAULT;

export default async function Home() {
  const { sections } = homeData;
  let newsItems: { id: string; title: string; date: string; excerpt: string; href: string; image?: string | null }[] = [];
  try {
    const articles = await fetchLatestNewsArticles(SPACING.NEWS_ITEMS_LIMIT);
    newsItems = articles.map((a) => ({
      id: a.id,
      title: a.title,
      date: new Date(a.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }),
      excerpt: (a.body ? a.body.replace(/<[^>]+>/g, "").slice(0, SPACING.NEWS_EXCERPT_LENGTH) + "…" : "Читать далее"),
      href: `/blog/${a.slug}`,
      image: a.anonsImage,
    }));
  } catch {
    newsItems = [];
  }

  return (
    <>
      <Header />
      <main className="min-h-screen animate-page-in">
        <Hero
          headline="Более 20 лет помогаем клиентам разбираться в финансах — от программ для детей до федеральных инициатив"
          primaryCta={sections.Hero.data.primaryCta}
        />
        <Products />
        <Services
          title={sections.Services.data.title}
          servicesIndividuals={sections.Services.data.servicesIndividuals}
          servicesBusiness={sections.Services.data.servicesBusiness}
        />
        <Partners
          clientsCarousel={sections.Partners.data.clientsCarousel}
          testimonials={sections.Partners.data.testimonials}
        />
        <LeadForm />
        <FAQ title={sections.FAQ.data.title} items={[]} />
        <News
          title={sections.News.data.title}
          items={newsItems}
          archiveHref={sections.News.data.links[0]?.href}
        />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
