import { Container } from "@/shared/ui/Container";
import { Button } from "@/shared/ui/Button";
import { HERO_IMAGES, SERVICE_HERO_IMAGES } from "@/shared/config";

interface ServiceHeroProps {
  title: string;
  shortDescription: string;
  ctaLabel?: string;
  serviceId?: string;
}

export function ServiceHero({
  title,
  shortDescription,
  ctaLabel = "Оставить заявку",
  serviceId,
}: ServiceHeroProps) {
  const bgImage = serviceId && SERVICE_HERO_IMAGES[serviceId]
    ? SERVICE_HERO_IMAGES[serviceId]
    : HERO_IMAGES.service;
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg-animated"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/90 via-[#1E3A5F]/70 to-transparent hero-overlay-animated" />

      <Container className="relative z-10">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl py-16 md:py-24">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight tracking-tight">
            {title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
            {shortDescription}
          </p>
          <div className="mt-8">
            <Button href="#lead-form" size="lg">
              {ctaLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
