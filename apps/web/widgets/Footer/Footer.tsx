"use client";

import { useMemo } from "react";
import { Container } from "@/shared/ui/Container";
import { Logo } from "@/shared/ui/Logo";
import { FooterContacts, FooterNav, FooterSocialLinks, FooterDocuments } from "./ui";
import { MapWithAddress } from "@/shared/ui/MapWithAddress";
import { MapHoverProvider } from "@/shared/context/MapHoverContext";
import { ROUTES } from "@/shared/config";
import type { NavItem } from "@/shared/config";
import { useTranslation } from "@/shared/i18n";

interface LegalDocument {
  label: string;
  href: string;
  type: string;
}

interface FooterData {
  organization: { fullName: string; shortName: string };
  contacts: { phone: string; email: string; legalAddress: string };
  social: Array<{ id?: string; label: string; href: string }>;
  legalLinks: Array<{ id?: string; label: string; href: string }>;
  legalDocuments?: { title: string; items: LegalDocument[] };
  copyright: { years: string; text: string; notice: string };
}

interface FooterProps {
  data: FooterData;
}

export function Footer({ data }: FooterProps) {
  const { t } = useTranslation();

  const footerNavItems: NavItem[] = useMemo(() => [
    { label: t.nav.individuals, href: ROUTES.INDIVIDUALS },
    { label: t.nav.companies, href: ROUTES.COMPANIES },
    { label: t.nav.tvoriDobro, href: ROUTES.TVORI_DOBRO },
    { label: t.nav.about, href: ROUTES.ABOUT },
    { label: t.nav.blog, href: ROUTES.BLOG },
  ], [t]);

  // Translate social links
  const translatedSocial = useMemo(() =>
    data.social.map((s) => {
      const key = s.id as keyof typeof t.footerData.social | undefined;
      return {
        ...s,
        label: key && t.footerData.social[key] ? t.footerData.social[key] : s.label,
      };
    }),
    [data.social, t]
  );

  // Translate legal links
  const translatedLegalLinks = useMemo(() =>
    data.legalLinks.map((l) => {
      const key = (l as { id?: string }).id as keyof typeof t.footerData.legalLinks | undefined;
      return {
        ...l,
        label: key && t.footerData.legalLinks[key] ? t.footerData.legalLinks[key] : l.label,
      };
    }),
    [data.legalLinks, t]
  );

  // Translate legal documents
  const translatedLegalDocs = useMemo(() => {
    if (!data.legalDocuments) return undefined;
    return {
      title: t.footerData.legalDocsTitle,
      items: data.legalDocuments.items.map((doc, i) => ({
        ...doc,
        label: t.footerData.legalDocs[i] ?? doc.label,
      })),
    };
  }, [data.legalDocuments, t]);

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
              <p className="text-white text-sm leading-relaxed mb-6 max-w-xs">
                {t.footerData.orgName}
              </p>
              <FooterContacts
                phone={data.contacts.phone}
                email={data.contacts.email}
                legalAddress={t.footerData.address}
              />
              <div className="md:hidden mt-6">
                <MapWithAddress />
              </div>
            </div>

            <div className="animate-fade-in-up animate-delay-100">
              <FooterNav items={footerNavItems} title={t.footer.navigation} />
            </div>

            <div className="animate-fade-in-up animate-delay-200">
              <FooterSocialLinks
                social={translatedSocial}
                legalLinks={translatedLegalLinks}
                socialTitle={t.footerContacts.socialNetworks}
                legalTitle={t.footerContacts.legalInfo}
              />
            </div>

            {translatedLegalDocs && translatedLegalDocs.items.length > 0 && (
              <div className="animate-fade-in-up animate-delay-300">
                <FooterDocuments
                  title={translatedLegalDocs.title}
                  items={translatedLegalDocs.items}
                />
              </div>
            )}
          </div>

          <div className="hidden md:block">
            <MapWithAddress />
          </div>
        </div>
        </MapHoverProvider>

        <div className="py-8 border-t border-white/10 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white">
            <div className="text-center md:text-left">
              <p className="transition-colors hover:text-white">{t.footerData.copyright}</p>
              <p className="mt-1 text-white text-xs">{t.footerData.copyrightNotice}</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
