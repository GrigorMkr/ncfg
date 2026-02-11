import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

export interface PostCardPost {
  id: string;
  title: string;
  tags: string[];
  slug: string;
  anonsImage: string;
  createdAt: string;
}

interface PostCardProps {
  post: PostCardPost;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const PostCard = memo(function PostCard({ post }: PostCardProps) {
  const hasImage = post.anonsImage && post.anonsImage.length > 0;

  return (
    <article className="group w-full bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 hover:border-[#0ea5e9]/40 dark:hover:border-[#38bdf8]/40 hover:shadow-[0_20px_40px_-12px_rgba(14,165,233,0.2)] hover:-translate-y-2 transition-all duration-300 shadow-sm">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
            {post.tags[0] && (
              <span className="text-[#0ea5e9] font-medium uppercase">{post.tags[0]}</span>
            )}
            {post.tags[0] && <span className="text-slate-400 dark:text-slate-500">•</span>}
            <time className="text-slate-500 dark:text-slate-400">{formatDate(post.createdAt)}</time>
          </div>
          <h3 className="text-[28px] leading-tight font-semibold text-slate-900 dark:text-white group-hover:text-[#0ea5e9] dark:group-hover:text-[#38bdf8] transition-colors line-clamp-2">
            {post.title}
          </h3>
        </div>
        <div className="aspect-[16/9] relative">
          {hasImage ? (
            <Image
              src={post.anonsImage}
              alt={post.title}
              fill
              className="object-cover rounded-b-2xl transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 624px"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-[#0ea5e9]/80 rounded-b-2xl flex items-center justify-center">
              <span className="text-white/20 text-5xl font-bold">NCFL</span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
});
