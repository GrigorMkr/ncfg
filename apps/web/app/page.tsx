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
import { SPACING } from "@/shared/config/design-tokens";

export const revalidate = 60;

export default async function Home() {
  const { sections } = homeData;
  let newsItems: { id: string; title: string; date: string; excerpt: string; href: string; image?: string | null }[] = [];
  try {
    const articles = await fetchLatestNewsArticles(SPACING.NEWS_ITEMS_LIMIT);
      newsItems = articles.map((a) => ({
      id: a.id,
      title: a.title,
      date: new Date(a.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      excerpt: (a.body ? a.body.replace(/<[^>]+>/g, "").slice(0, SPACING.NEWS_EXCERPT_LENGTH) + "…" : ""),
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
          primaryCta={{ href: sections.Hero.data.primaryCta.href }}
        />
        <Products />
        <Services
          servicesIndividuals={sections.Services.data.servicesIndividuals}
          servicesBusiness={sections.Services.data.servicesBusiness}
        />
        <Partners
          clientsCarousel={sections.Partners.data.clientsCarousel}
          testimonials={sections.Partners.data.testimonials}
        />
        <LeadForm />
        <FAQ />
        <News
          items={newsItems}
        />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
