import Link from "next/link";
import Image from "next/image";

export interface PostCardPost {
  id: string | number;
  title: string;
  tags: string[];
  slug: string;
  anonsImage: string | null;
  createdAt: string;
}

interface PostCardProps {
  post: PostCardPost;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function PostCard({ post }: PostCardProps) {
  const hasImage = post.anonsImage && post.anonsImage.length > 0;

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/0e19e85a-50b5-4c87-aa61-382b8bbf87ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PostCard.tsx:28',message:'PostCard render',data:{postId:post.id,anonsImage:post.anonsImage,hasImage,startsWithSlash:post.anonsImage?.startsWith('/')},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1-H2'})}).catch(()=>{});
  // #endregion

  return (
    <article className="group w-full max-w-[624px] bg-white rounded-xl overflow-hidden border border-[#F1F5F9] hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
            {post.tags[0] && (
              <span className="text-[#3B82F6] font-medium uppercase">{post.tags[0]}</span>
            )}
            {post.tags[0] && <span className="text-[#94A3B8]">•</span>}
            <time className="text-[#94A3B8]">{formatDate(post.createdAt)}</time>
          </div>
          <h3 className="text-[28px] leading-tight font-semibold text-[#1E3A5F] group-hover:text-[#3B82F6] transition-colors line-clamp-2">
            {post.title}
          </h3>
        </div>
        <div className="aspect-[16/9] relative">
          {hasImage ? (
            <Image
              src={post.anonsImage}
              alt={post.title}
              fill
              className="object-cover rounded-b-xl"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6] rounded-b-xl flex items-center justify-center">
              <span className="text-white/20 text-5xl font-bold">НЦФГ</span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
