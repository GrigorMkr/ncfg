import { Section } from "@/shared/ui/Section";
import { PostCard, type PostCardPost } from "@/entities/Post";

interface BlogPost extends PostCardPost {
  body: string;
}

interface BlogPostsProps {
  title: string;
  lead?: string;
  posts: BlogPost[];
}

export function BlogPosts({ title, lead, posts }: BlogPostsProps) {
  return (
    <Section id="blog" title={title} lead={lead} background="gray">
      <div className="flex flex-col items-center gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Section>
  );
}
