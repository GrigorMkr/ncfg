import {
  Header,
  Hero,
  Services,
  Stats,
  Partners,
  News,
  FAQ,
  LeadForm,
  Footer,
} from "@/widgets";
import homeData from "@/public/content/home.json";

export default function Home() {
  const { sections } = homeData;

  return (
    <>
      <Header />
      <main>
        <Hero
          headline={sections.Hero.data.headline}
          lead={sections.Hero.data.lead}
          primaryCta={sections.Hero.data.primaryCta}
        />
        <Stats items={sections.Stats.data.items} />
        <Services
          title={sections.Services.data.title}
          audiences={sections.Services.data.audiences}
        />
        <Partners
          clientsCarousel={sections.Partners.data.clientsCarousel}
          testimonials={sections.Partners.data.testimonials}
        />
        <News
          title={sections.News.data.title}
          items={[]}
          archiveHref={sections.News.data.links[0]?.href}
        />
        <FAQ title={sections.FAQ.data.title} items={[]} />
        <LeadForm />
      </main>
      <Footer legalDocuments={sections.Footer.data.legalDocuments} />
    </>
  );
}
