import type { Metadata } from "next";
import { Header, BlogPosts, Footer } from "@/widgets";
import homeData from "@/public/content/home.json";
import { fetchLatestNewsArticles } from "@/shared/api/data-provider";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "News & Articles — NCFL",
  description:
    "News, articles and publications on financial literacy from the National Center for Financial Literacy.",
  openGraph: {
    title: "News & Articles — NCFL",
    description: "Latest news and useful articles on financial literacy.",
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
    slug: a.slug,
    tags: a.tags ?? [],
    anonsImage: a.anonsImage ?? "",
    createdAt: a.createdAt,
    body: a.body ?? "",
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen animate-page-in">
        <BlogPosts
          posts={posts}
        />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
