import Image from "next/image";
import { Container } from "@/shared/ui/Container";
import { Button } from "@/shared/ui/Button";

interface HeroProps {
  headline: string;
  primaryCta?: {
    label: string;
    href: string;
  };
}

export function Hero({ headline, primaryCta }: HeroProps) {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/90 via-[#1E3A5F]/70 to-transparent" />

      <Container className="relative z-10">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl py-16 md:py-24">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight tracking-tight">
            {headline}
          </h1>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="#lead-form" size="lg">
              Оставить заявку
            </Button>
            {primaryCta && (
              <Button href={primaryCta.href} variant="secondary" size="lg" className="!bg-transparent border-2 border-white text-white hover:bg-white/10">
                {primaryCta.label.replace(/\.{2,}$/, "")}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
