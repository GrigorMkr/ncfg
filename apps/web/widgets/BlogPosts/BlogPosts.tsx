import { Section } from "@/shared/ui/Section";
import { PostCard, type PostCardPost } from "@/entities/Post";
import { ANIMATION } from "@/shared/config/design-tokens";
import { Container } from "@/shared/ui/Container";
import { HERO_IMAGES } from "@/shared/config";

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
    <>
      <section className="relative min-h-[320px] md:min-h-[400px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg-animated"
          style={{ backgroundImage: `url('${HERO_IMAGES.blog}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/80 to-transparent hero-overlay-animated" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0ea5e9]/10 to-transparent pointer-events-none" />
        <Container className="relative z-10">
          <div className="max-w-2xl md:max-w-3xl py-14 md:py-20">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
              {title}
            </h1>
            {lead && (
              <p className="mt-4 text-lg text-white/90 leading-relaxed">
                {lead}
              </p>
            )}
          </div>
        </Container>
      </section>
      <Section id="blog" title="" lead="" background="gray">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {posts.map((post, i) => (
          <div
            key={post.id}
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: `${Math.min(i * ANIMATION.DELAY_STEP, ANIMATION.DELAY_MAX)}ms`, animationFillMode: "forwards" }}
          >
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </Section>
    </>
  );
}
