import { PostCard, type PostCardPost } from "@/entities/Post";
import { Button } from "@/shared/ui/Button";
import { OTHER_POSTS, ROUTES } from "@/shared/config";

interface OtherPostsProps {
  posts: PostCardPost[];
}

export function OtherPosts({ posts }: OtherPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-[#F8FAFC]">
      <div className="mx-auto max-w-[760px] px-5 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] text-center mb-8">
          {OTHER_POSTS.title}
        </h2>
        <div className="flex flex-col items-center gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="mt-8">
          <Button href={ROUTES.BLOG} variant="secondary" className="w-full">
            {OTHER_POSTS.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
