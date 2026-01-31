"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/shared/ui/Container";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/cn";

const navigation = [
  { label: "Частным лицам", href: "/individuals" },
  { label: "Компаниям", href: "/companies" },
  { label: "Блог", href: "/blog" },
  { label: "Ещё", href: "#" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // On blog pages there's no lead form — navigate to homepage
  const ctaHref = pathname?.startsWith("/blog") ? "/#lead-form" : "#lead-form";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#F1F5F9]">
      <Container>
        <nav className="flex items-center h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo.svg"
              alt="НЦФГ"
              width={40}
              height={40}
              className="h-10 w-10"
            />
          </Link>

          <div className="hidden md:flex items-center gap-1 ml-4">
            {navigation.map((item, index) => (
              <Link
                key={item.href + index}
                href={item.href}
                className="px-4 py-2 text-[#475569] font-medium text-base hover:text-[#1E3A5F] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <Button
              href={ctaHref}
              className="hidden sm:inline-flex h-10 px-6 text-sm md:h-11 md:px-7 md:text-base"
            >
              Оставить заявку
            </Button>

            <button
              type="button"
              className="md:hidden p-2 text-[#475569] hover:text-[#1E3A5F] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </Container>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <Container>
          <div className="py-4 border-t border-[#F1F5F9]">
            {navigation.map((item, index) => (
              <Link
                key={item.href + index}
                href={item.href}
                className="block px-4 py-3 text-[#475569] font-medium hover:text-[#1E3A5F] hover:bg-[rgba(30,58,95,0.05)] rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 px-4 sm:hidden">
              <Button href={ctaHref} className="w-full h-11 text-base">
                Оставить заявку
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
