"use client";

import { ArrowRight, User } from "lucide-react";
import { Container } from "@/shared/ui/Container";
import { Button } from "@/shared/ui/Button";
import { ROUTES, HERO_IMAGES } from "@/shared/config";
import { useTranslation } from "@/shared/i18n";

interface HeroIndividualsProps {
  headline?: string;
  lead?: string;
  primaryCta?: {
    label?: string;
    href: string;
  };
}

export function HeroIndividuals({ headline, lead, primaryCta }: HeroIndividualsProps) {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg-animated dark:brightness-[0.3]"
        style={{ backgroundImage: `url('${HERO_IMAGES.individuals}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/80 to-transparent dark:from-slate-950/98 dark:via-slate-900/90 dark:to-slate-900/40 hero-overlay-animated" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0ea5e9]/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#0ea5e9]/20 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl py-16 md:py-24">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium mb-6">
            <span className="w-7 h-7 rounded-lg bg-[#38bdf8]/20 flex items-center justify-center">
              <User className="w-3.5 h-3.5" strokeWidth={1.75} />
            </span>
            {t.hero.badgeIndividuals}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight tracking-tight">
            {headline || t.pages.individualsHeadline}
          </h1>
          <p className="mt-4 md:mt-6 text-lg text-white/90 leading-relaxed max-w-2xl">
            {lead || t.pages.individualsLead}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {primaryCta && (
              <Button href={primaryCta.href} size="lg" className="gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                {t.btn.submitRequest}
                <ArrowRight className="w-5 h-5" strokeWidth={1.75} />
              </Button>
            )}
            <Button href={ROUTES.PRODUCTS} variant="secondary" size="lg" className="!bg-transparent dark:!bg-transparent border-2 border-white/60 text-white dark:text-white hover:bg-white/20 dark:hover:bg-white/20 backdrop-blur-sm gap-2">
              {t.btn.more}
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
