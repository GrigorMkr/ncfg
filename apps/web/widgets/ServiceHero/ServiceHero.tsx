"use client";

import { Container } from "@/shared/ui/Container";
import { Button } from "@/shared/ui/Button";
import { HERO_IMAGES, SERVICE_HERO_IMAGES } from "@/shared/config";
import { useTranslation } from "@/shared/i18n";

interface ServiceHeroProps {
  title: string;
  shortDescription: string;
  ctaLabel?: string;
  serviceId?: string;
}

export function ServiceHero({
  title,
  shortDescription,
  ctaLabel,
  serviceId,
}: ServiceHeroProps) {
  const { t } = useTranslation();

  const catKey = serviceId as keyof typeof t.serviceCatalog | undefined;
  const catData = catKey ? t.serviceCatalog[catKey] : undefined;
  const displayTitle = catData?.title ?? title;
  const displayDescription = catData?.description ?? shortDescription;

  const bgImage = serviceId && SERVICE_HERO_IMAGES[serviceId]
    ? SERVICE_HERO_IMAGES[serviceId]
    : HERO_IMAGES.service;
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg-animated dark:brightness-[0.3]"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/90 via-[#1E3A5F]/70 to-transparent dark:from-slate-950/98 dark:via-slate-900/90 dark:to-slate-900/40 hero-overlay-animated" />

      <Container className="relative z-10">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl py-16 md:py-24">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight tracking-tight">
            {displayTitle}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
            {displayDescription}
          </p>
          <div className="mt-8">
            <Button href="#lead-form" size="lg">
              {ctaLabel || t.btn.submitRequest}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
