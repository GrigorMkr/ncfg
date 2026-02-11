"use client";

import { useMemo } from "react";
import { Container } from "@/shared/ui/Container";
import { PostQuestionForm } from "./PostQuestionForm";
import { OtherPosts } from "./OtherPosts";
import { PostFigure } from "./ui";
import type { PostCardPost } from "@/entities/Post";
import { HERO_IMAGES } from "@/shared/config";
import { useTranslation } from "@/shared/i18n";

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
  const { t } = useTranslation();

  const idx = parseInt(post.id, 10) - 1;
  const translatedTitle = t.news[idx]?.title ?? post.title;
  const translatedTags = useMemo(
    () => post.tags.map((tag) => (t.blogTags as Record<string, string>)[tag] ?? tag),
    [post.tags, t]
  );

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
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg-animated dark:brightness-[0.3]"
          style={{ backgroundImage: `url('${heroBg}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/80 to-transparent dark:from-slate-950/98 dark:via-slate-900/90 dark:to-slate-900/40 hero-overlay-animated" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0ea5e9]/10 to-transparent pointer-events-none" />
        <Container className="relative z-10">
          <div className="max-w-3xl py-12 md:py-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
              {translatedTitle}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/80">
              {translatedTags[0] && (
                <span className="font-medium uppercase">{translatedTags[0]}</span>
              )}
              <time>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
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
