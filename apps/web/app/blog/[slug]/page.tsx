import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Post, Footer } from "@/widgets";
import homeData from "@/public/content/home.json";
import { fetchNewsArticle, fetchLatestNewsArticles } from "@/shared/api/data-provider";
import { REVALIDATE } from "@/shared/config/design-tokens";

export const revalidate = REVALIDATE.DEFAULT;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const article = await fetchNewsArticle(slug);
    if (!article) {
      return { title: "Статья не найдена — НЦФГ" };
    }
    return {
      title: `${article.title} — НЦФГ`,
      description: article.body?.replace(/<[^>]+>/g, "").slice(0, 160),
      openGraph: {
        title: article.title,
        description: article.body?.replace(/<[^>]+>/g, "").slice(0, 160),
        type: "article",
      },
    };
  } catch {
    return { title: "Статья не найдена — НЦФГ" };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const { sections } = homeData;

  let article;
  let otherPosts = [];

  try {
    article = await fetchNewsArticle(slug);
    const allArticles = await fetchLatestNewsArticles(4);
    otherPosts = allArticles
      .filter((a) => a.slug !== slug)
      .slice(0, 3)
      .map((a) => ({
        id: a.id,
        title: a.title,
        date: new Date(a.createdAt).toLocaleDateString("ru-RU"),
        href: `/blog/${a.slug}`,
        image: a.anonsImage,
      }));
  } catch {
    notFound();
  }

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen animate-page-in">
        <Post
          title={article.title}
          date={new Date(article.createdAt).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          content={article.body ?? ""}
          image={article.anonsImage}
          otherPosts={otherPosts}
        />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
