import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Post, Footer } from "@/widgets";
import homeData from "@/public/content/home.json";
import blogData from "@/public/content/blog.json";

interface BlogPost {
  id: string;
  title: string;
  tags: string[];
  slug: string;
  body: string;
  anonsImage: string;
  createdAt: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogData.posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogData.posts.find((p) => p.slug === slug);

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
  const post = blogData.posts.find((p) => p.slug === slug) as BlogPost | undefined;

  if (!post) {
    notFound();
  }

  const { sections } = homeData;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Post post={post} allPosts={blogData.posts as BlogPost[]} />
      </main>
      <Footer data={sections.Footer.data} />
    </div>
  );
}
