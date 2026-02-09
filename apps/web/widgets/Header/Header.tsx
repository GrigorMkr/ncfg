"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Send, User, Building2, Heart, MoreHorizontal } from "lucide-react";
import { Container } from "@/shared/ui/Container";
import { Logo } from "@/shared/ui/Logo";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";
import { LanguageSwitcher } from "@/shared/ui/LanguageSwitcher";
import { MoscowTimeWidget } from "@/shared/ui/MoscowTimeWidget";
import { HeaderNav, HeaderMobileMenu } from "./ui";
import { ROUTES } from "@/shared/config";
import type { NavItem } from "@/shared/config";
import { SPACING } from "@/shared/constants";
import { useTranslation } from "@/shared/i18n";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t, locale } = useTranslation();
  const ctaHref = pathname?.startsWith("/blog") ? `/${ROUTES.HOME}${ROUTES.LEAD_FORM}` : ROUTES.LEAD_FORM;

  const navItems: NavItem[] = useMemo(() => [
    { label: t.nav.individuals, href: ROUTES.INDIVIDUALS, Icon: User },
    { label: t.nav.companies, href: ROUTES.COMPANIES, Icon: Building2 },
    { label: t.nav.tvoriDobro, href: ROUTES.TVORI_DOBRO, Icon: Heart },
    {
      label: t.nav.more,
      href: ROUTES.ABOUT,
      Icon: MoreHorizontal,
      children: [
        { label: t.nav.about, href: ROUTES.ABOUT },
        { label: t.nav.blog, href: ROUTES.BLOG },
      ],
    },
  ], [t]);

  const toggleMenu = useCallback(() => setMobileMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SPACING.SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 transition-all duration-500 ease-out
        ${scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-[0_4px_30px_-8px_rgba(14,165,233,0.12)] dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.3)] border-b border-slate-200/50 dark:border-slate-700/50"
          : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200/30 dark:border-slate-700/30"
        }
      `}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0ea5e9]/30 to-transparent opacity-60" />
      <Container>
        <nav className="flex items-center h-16 md:h-20 animate-slide-down">
          <Logo href={ROUTES.HOME} showWordmark size="md" className="shrink-0 transition-transform hover:scale-[1.02]" />
          <HeaderNav items={navItems} />

          <div className="flex items-center gap-1.5 md:gap-2 ml-auto">
            <LanguageSwitcher />
            <ThemeToggle />

            <a
              href={ctaHref}
              className="hidden sm:inline-flex items-center gap-2 h-10 px-5 md:h-11 md:px-6 text-sm md:text-base font-semibold rounded-xl
                bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-white
                shadow-lg shadow-[#0ea5e9]/25 hover:shadow-xl hover:shadow-[#0ea5e9]/35
                hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              <Send size={16} strokeWidth={2} />
              {t.btn.submitRequest}
            </a>

            <MoscowTimeWidget locale={locale} />

            <button
              type="button"
              className="md:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10 dark:hover:text-[#38bdf8] dark:hover:bg-[#38bdf8]/10 transition-all duration-300"
              onClick={toggleMenu}
              aria-label={mobileMenuOpen ? t.misc.closeMenu : t.misc.openMenu}
            >
              <span className={`block transition-transform duration-300 ${mobileMenuOpen ? "rotate-90" : ""}`}>
                {mobileMenuOpen ? (
                  <X size={24} strokeWidth={1.75} />
                ) : (
                  <Menu size={24} strokeWidth={1.75} />
                )}
              </span>
            </button>
          </div>
        </nav>
      </Container>

      <Container>
        <HeaderMobileMenu
          items={navItems}
          ctaHref={ctaHref}
          isOpen={mobileMenuOpen}
          onClose={closeMenu}
        />
      </Container>
    </header>
  );
}
