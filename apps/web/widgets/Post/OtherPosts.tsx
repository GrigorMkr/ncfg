"use client";

import { PostCard, type PostCardPost } from "@/entities/Post";
import { Button } from "@/shared/ui/Button";
import { ROUTES } from "@/shared/config";
import { useTranslation } from "@/shared/i18n";

interface OtherPostsProps {
  posts: PostCardPost[];
}

export function OtherPosts({ posts }: OtherPostsProps) {
  const { t } = useTranslation();

  if (posts.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-[#F8FAFC] dark:bg-slate-900/50">
      <div className="mx-auto max-w-[760px] px-5 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] dark:text-white text-center mb-8">
          {t.sections.otherPosts}
        </h2>
        <div className="flex flex-col items-center gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="mt-8">
          <Button href={ROUTES.BLOG} variant="secondary" className="w-full">
            {t.btn.toBlog}
          </Button>
        </div>
      </div>
    </section>
  );
}
