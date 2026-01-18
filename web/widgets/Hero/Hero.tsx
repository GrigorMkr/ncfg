import Image from "next/image";
import { Container } from "@/shared/ui/Container";
import { Button } from "@/shared/ui/Button";

interface HeroProps {
  headline: string;
  lead: string;
  primaryCta?: {
    label: string;
    href: string;
  };
}

export function Hero({ headline, lead, primaryCta }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F8FAFC] to-white py-12 md:py-20 lg:py-28">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-xl lg:max-w-none">
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-[#1E3A5F] leading-[1.1] tracking-tight">
              {headline}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[#475569] leading-relaxed max-w-2xl">
              {lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#lead-form" size="lg">
                Оставить заявку
              </Button>
              {primaryCta && (
                <Button href={primaryCta.href} variant="secondary" size="lg">
                  {primaryCta.label}
                </Button>
              )}
            </div>
          </div>

          <div className="relative lg:order-last order-first">
            <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/hero.png"
                alt="Национальный центр финансовой грамотности"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-2xl bg-[#00D9FF]/10" />
          </div>
        </div>
      </Container>

      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-[#00D9FF]/5 to-transparent" />
    </section>
  );
}
