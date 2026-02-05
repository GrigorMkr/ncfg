import { Container } from "@/shared/ui/Container";
import { Logo } from "@/shared/ui/Logo";
import { FooterContacts, FooterNav, FooterSocialLinks, FooterDocuments } from "./ui";
import { MapWithAddress } from "@/shared/ui/MapWithAddress";
import { MapHoverProvider } from "@/shared/context/MapHoverContext";
import { FOOTER_NAV, ROUTES } from "@/shared/config";

interface LegalDocument {
  label: string;
  href: string;
  type: string;
}

interface FooterData {
  organization: { fullName: string; shortName: string };
  contacts: { phone: string; email: string; legalAddress: string };
  social: Array<{ id?: string; label: string; href: string }>;
  legalLinks: Array<{ label: string; href: string }>;
  legalDocuments?: { title: string; items: LegalDocument[] };
  copyright: { years: string; text: string; notice: string };
}

interface FooterProps {
  data: FooterData;
}

export function Footer({ data }: FooterProps) {
  return (
    <footer
      id="contacts"
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0ea5e9]/8 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#0ea5e9]/15 blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-[#38bdf8]/10 blur-3xl animate-float" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0ea5e9]/40 to-transparent" />
      </div>

      <Container>
        <MapHoverProvider>
        <div className="py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            <div className="animate-fade-in-up">
              <Logo href={ROUTES.HOME} showWordmark variant="light" size="md" className="mb-6 transition-transform hover:scale-[1.02]" />
              <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">
                {data.organization.fullName}
              </p>
              <FooterContacts
                phone={data.contacts.phone}
                email={data.contacts.email}
                legalAddress={data.contacts.legalAddress}
              />
            </div>

            <div className="animate-fade-in-up animate-delay-100">
              <h3 className="font-semibold mb-5 text-white/95">Навигация</h3>
              <FooterNav items={FOOTER_NAV} />
            </div>

            <div className="animate-fade-in-up animate-delay-200">
              <FooterSocialLinks social={data.social} legalLinks={data.legalLinks} />
            </div>

            {data.legalDocuments && data.legalDocuments.items.length > 0 && (
              <div className="animate-fade-in-up animate-delay-300">
                <FooterDocuments
                  title={data.legalDocuments.title}
                  items={data.legalDocuments.items}
                />
              </div>
            )}
          </div>

          <MapWithAddress />
        </div>
        </MapHoverProvider>

        <div className="py-8 border-t border-white/10 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <div className="text-center md:text-left">
              <p className="transition-colors hover:text-white/70">{data.copyright.text}</p>
              <p className="mt-1 text-white/40 text-xs">{data.copyright.notice}</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
