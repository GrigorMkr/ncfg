import Image from "next/image";
import { Container } from "@/shared/ui/Container";

interface PostProps {
  post: {
    title: string;
    tags: string[];
    body: string;
    anonsImage?: string;
    createdAt: string;
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function Post({ post }: PostProps) {
  const hasImage = Boolean(post.anonsImage);

  return (
    <article className="py-12 md:py-16">
      <Container className="px-5 md:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[760px]">
          <header className="text-center">
            {/* Meta: tag and date */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm mb-4">
              {post.tags[0] && (
                <span className="text-[#3B82F6] font-medium uppercase">
                  {post.tags[0]}
                </span>
              )}
              {post.tags[0] && <span className="text-[#94A3B8]">•</span>}
              <time className="text-[#94A3B8]">{formatDate(post.createdAt)}</time>
            </div>

            {/* Title */}
            <h1 className="text-[28px] md:text-[36px] lg:text-[42px] leading-tight font-bold text-[#1E3A5F]">
              {post.title}
            </h1>
          </header>

          <figure className="mt-8 mb-10">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
              {hasImage ? (
                <Image
                  src={post.anonsImage as string}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 760px, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6]">
                  <span className="text-white/30 text-4xl font-bold">НЦФГ</span>
                </div>
              )}
            </div>
          </figure>

          {/* Body content */}
          <div
            className="text-left prose prose-lg max-w-none
              prose-p:text-base prose-p:leading-relaxed prose-p:text-[#475569] prose-p:mb-4
              prose-headings:text-[#1E3A5F] prose-headings:font-semibold
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-a:text-[#3B82F6] prose-a:no-underline hover:prose-a:underline
              prose-ul:my-4 prose-ul:pl-6 prose-li:text-[#475569]
              prose-ol:my-4 prose-ol:pl-6
              prose-strong:text-[#1E3A5F]"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </div>
      </Container>
    </article>
  );
}
