import type { Metadata } from "next";
import { Header, BlogPosts, Footer } from "@/widgets";
import homeData from "@/public/content/home.json";
import { fetchLatestNewsArticles } from "@/shared/api/data-provider";
import { REVALIDATE } from "@/shared/config/design-tokens";

export const revalidate = REVALIDATE.DEFAULT;

export const metadata: Metadata = {
  title: "Новости и статьи — НЦФГ",
  description:
    "Новости, статьи и публикации о финансовой грамотности от Национального центра финансовой грамотности.",
  openGraph: {
    title: "Новости и статьи — НЦФГ",
    description: "Актуальные новости и полезные статьи о финансовой грамотности.",
    type: "website",
  },
};

export default async function BlogPage() {
  const { sections } = homeData;
  
  let articles = [];
  try {
    articles = await fetchLatestNewsArticles(20);
  } catch {
    articles = [];
  }

  const posts = articles.map((a) => ({
    id: a.id,
    title: a.title,
    date: new Date(a.createdAt).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    excerpt: a.body ? a.body.replace(/<[^>]+>/g, "").slice(0, 150) + "…" : "",
    href: `/blog/${a.slug}`,
    image: a.anonsImage,
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen animate-page-in">
        <BlogPosts
          title="Новости и статьи"
          subtitle="Актуальные материалы о финансовой грамотности"
          posts={posts}
        />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
