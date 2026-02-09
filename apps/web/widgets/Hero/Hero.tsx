"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/shared/ui/Container";
import { Button } from "@/shared/ui/Button";
import { ROUTES, HERO_IMAGES } from "@/shared/config";
import { useTranslation } from "@/shared/i18n";

interface HeroProps {
  headline?: string;
  primaryCta?: {
    label?: string;
    href: string;
  };
  variant?: keyof Pick<typeof HERO_IMAGES, "home" | "about" | "tvoridobro">;
}

export function Hero({ headline, primaryCta, variant = "home" }: HeroProps) {
  const { t } = useTranslation();
  const bgImage = HERO_IMAGES[variant];
  return (
    <section className="relative min-h-[420px] md:min-h-[520px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg-animated dark:brightness-[0.3]"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/80 to-transparent dark:from-slate-950/98 dark:via-slate-900/90 dark:to-slate-900/40 hero-overlay-animated" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0ea5e9]/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#0ea5e9]/20 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl py-14 md:py-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium mb-6 animate-fade-in-up">
            <span className="w-7 h-7 rounded-lg bg-[#38bdf8]/20 flex items-center justify-center">
              <Sparkles size={14} className="text-[#38bdf8]" strokeWidth={1.75} />
            </span>
            {t.hero.badgeMain}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-white leading-tight tracking-tight animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
            {headline || (variant === "about" ? t.pages.aboutHeadline : variant === "tvoridobro" ? t.pages.tvoridobroHeadline : t.pages.homeHeadline)}
          </h1>
          <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up [animation-delay:250ms] opacity-0 [animation-fill-mode:forwards]">
            <Button
              href={ROUTES.LEAD_FORM}
              size="lg"
              className="gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              {t.btn.submitRequest}
              <ArrowRight size={20} strokeWidth={1.75} />
            </Button>
            {primaryCta && (
              <Button
                href={primaryCta.href}
                variant="secondary"
                size="lg"
                className="!bg-white/10 dark:!bg-white/10 border-2 border-white/60 text-white dark:text-white hover:bg-white/20 dark:hover:bg-white/20 backdrop-blur-sm gap-2"
              >
                {primaryCta.label || (variant === "about" ? t.misc.ourProjects : t.btn.more)}
                <ArrowRight size={16} strokeWidth={1.75} />
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
