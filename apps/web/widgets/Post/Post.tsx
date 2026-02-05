import { Container } from "@/shared/ui/Container";
import { PostQuestionForm } from "./PostQuestionForm";
import { OtherPosts } from "./OtherPosts";
import { PostFigure } from "./ui";
import type { PostCardPost } from "@/entities/Post";
import { HERO_IMAGES } from "@/shared/config";

interface PostProps {
  post: {
    id: string;
    title: string;
    tags: string[];
    body: string;
    anonsImage?: string | null;
    createdAt: string;
  };
  allPosts?: PostCardPost[];
}

export function Post({ post, allPosts = [] }: PostProps) {
  const otherPosts = allPosts
    .filter((p) => p.id !== post.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  const heroBg = post.anonsImage ?? HERO_IMAGES.blogPost;

  return (
    <>
      <section className="relative min-h-[280px] md:min-h-[340px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg-animated"
          style={{ backgroundImage: `url('${heroBg}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/80 to-transparent hero-overlay-animated" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0ea5e9]/10 to-transparent pointer-events-none" />
        <Container className="relative z-10">
          <div className="max-w-3xl py-12 md:py-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/80">
              {post.tags[0] && (
                <span className="font-medium uppercase">{post.tags[0]}</span>
              )}
              <time>{new Date(post.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}</time>
            </div>
          </div>
        </Container>
      </section>
      <article className="py-12 md:py-16">
        <Container className="px-5 md:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[760px]">
            <PostFigure
              title={post.title}
              anonsImage={post.anonsImage}
            />
            <div className="mx-auto max-w-[624px]">
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            </div>
          </div>
        </Container>
      </article>

      <PostQuestionForm postTitle={post.title} />

      {otherPosts.length > 0 && <OtherPosts posts={otherPosts} />}
    </>
  );
}
