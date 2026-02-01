import { Container } from "@/shared/ui/Container";
import { Button } from "@/shared/ui/Button";

interface HeroCompaniesProps {
  headline: string;
  lead?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
}

export function HeroCompanies({ headline, lead, primaryCta }: HeroCompaniesProps) {
  return (
    <section
      className="relative min-h-[400px] md:min-h-[500px] flex items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/company.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/90 via-[#1E3A5F]/70 to-transparent" />

      <Container className="relative z-10">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl py-16 md:py-24">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight tracking-tight">
            {headline}
          </h1>
          {lead && (
            <p className="mt-4 md:mt-6 text-lg text-white/90 leading-relaxed max-w-2xl">
              {lead}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            {primaryCta && (
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
              </Button>
            )}
            <Button href="#services" variant="secondary" size="lg" className="!bg-transparent border-2 border-white text-white hover:bg-white/10">
              Подробнее
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
