import { Header, BlogPosts, Footer } from "@/widgets";
import homeData from "@/public/content/home.json";
import blogData from "@/public/content/blog.json";

export const metadata = {
  title: "Блог — НЦФГ",
  description: "Полезные материалы о финансовой грамотности от Национального центра финансовой грамотности",
};

export default function BlogPage() {
  const { sections } = homeData;
  const { meta, posts } = blogData;

  return (
    <>
      <Header />
      <main>
        <BlogPosts title={meta.title} lead={meta.lead} posts={posts} />
      </main>
      <Footer data={sections.Footer.data} />
    </>
  );
}
