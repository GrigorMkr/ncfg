import { Header, BlogPosts, Footer } from "@/widgets";
import homeData from "@/public/content/home.json";
import blogData from "@/public/content/blog.json";
import { fetchNewsArticles } from "@/shared/api/data-provider";
import { REVALIDATE } from "@/shared/config/design-tokens";

export const metadata = {
  title: "Блог — НЦФГ",
  description: "Полезные материалы о финансовой грамотности от Национального центра финансовой грамотности",
};

export const revalidate = REVALIDATE.DEFAULT;

export default async function BlogPage() {
  const { sections } = homeData;
  const { meta } = blogData;
  let posts;
  try {
    posts = await fetchNewsArticles();
  } catch {
    posts = blogData.posts;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen animate-page-in">
        <BlogPosts title={meta.title} lead={meta.lead} posts={posts} />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
