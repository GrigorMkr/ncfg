import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Post, Footer } from "@/widgets";
import homeData from "@/public/content/home.json";
import blogData from "@/public/content/blog.json";
import { fetchNewsArticle, fetchNewsArticles } from "@/shared/api/data-provider";
import { REVALIDATE, SPACING } from "@/shared/config/design-tokens";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = REVALIDATE.DEFAULT;

export async function generateStaticParams() {
  return blogData.posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  let post;
  try {
    post = await fetchNewsArticle(slug);
  } catch {
    post = blogData.posts.find((p) => p.slug === slug);
  }

  if (!post) {
    return {
      title: "Статья не найдена — НЦФГ",
    };
  }

  const description = (post.body ?? "")
    .replace(/<[^>]*>/g, "")
    .slice(0, SPACING.META_DESCRIPTION_LENGTH)
    .trim();

  return {
    title: `${post.title} — НЦФГ`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.createdAt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  let post;
  let allPosts;
  try {
    post = await fetchNewsArticle(slug);
    allPosts = await fetchNewsArticles();
  } catch {
    post = blogData.posts.find((p) => p.slug === slug);
    allPosts = blogData.posts;
  }

  if (!post) {
    notFound();
  }

  const { sections } = homeData;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Post post={post} allPosts={allPosts} />
      </main>
      <Footer data={sections.Footer.data} />
    </div>
  );
}
