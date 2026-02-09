import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Post, Footer } from "@/widgets";
import homeData from "@/public/content/home.json";
import { fetchNewsArticle, fetchLatestNewsArticles, fetchNewsArticles } from "@/shared/api/data-provider";

export const revalidate = 60;

export async function generateStaticParams() {
  const articles = await fetchNewsArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const article = await fetchNewsArticle(slug);
    if (!article) {
      return { title: "Not Found — NCFL" };
    }
    return {
      title: `${article.title} — NCFL`,
      description: article.body?.replace(/<[^>]+>/g, "").slice(0, 160),
      openGraph: {
        title: article.title,
        description: article.body?.replace(/<[^>]+>/g, "").slice(0, 160),
        type: "article",
      },
    };
  } catch {
    return { title: "Not Found — NCFL" };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const { sections } = homeData;

  let article;
  let allPosts: { id: string; slug: string; title: string; tags: string[]; anonsImage?: string | null; createdAt: string }[] = [];

  try {
    article = await fetchNewsArticle(slug);
    allPosts = await fetchLatestNewsArticles(10);
  } catch {
    notFound();
  }

  if (!article) {
    notFound();
  }

  const post = {
    id: article.id,
    title: article.title,
    tags: article.tags ?? [],
    body: article.body ?? "",
    anonsImage: article.anonsImage,
    createdAt: article.createdAt,
  };

  const allPostsFormatted = allPosts.map((a) => ({
    id: a.id,
    title: a.title,
    tags: a.tags ?? [],
    slug: a.slug,
    anonsImage: a.anonsImage ?? "",
    createdAt: a.createdAt,
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen animate-page-in">
        <Post post={post} allPosts={allPostsFormatted} />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
