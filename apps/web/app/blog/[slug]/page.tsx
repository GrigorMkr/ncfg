import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Post, Footer } from "@/widgets";
import homeData from "@/public/content/home.json";
import blogData from "@/public/content/blog.json";
import { fetchNewsArticle, fetchNewsArticles } from "@/shared/api/data-provider";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  // Use static data for build time
  return blogData.posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Try to fetch from Strapi, fallback to static
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

  const description = post.body
    .replace(/<[^>]*>/g, "")
    .slice(0, 160)
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
  
  // Try to fetch from Strapi, fallback to static
  let post;
  let allPosts;
  try {
    post = await fetchNewsArticle(slug);
    allPosts = await fetchNewsArticles();
  } catch {
    post = blogData.posts.find((p) => p.slug === slug);
    allPosts = blogData.posts;
  }

  console.log(post);

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
