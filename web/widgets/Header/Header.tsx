"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Container } from "@/shared/ui/Container";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/cn";

const navigation = [
  { label: "О нас", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Партнёры", href: "#partners" },
  { label: "Новости", href: "#news" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#F1F5F9]">
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo.svg"
              alt="НЦФГ"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="hidden sm:block font-semibold text-[#1E3A5F] text-lg">
              НЦФГ
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-[#475569] font-medium text-sm rounded-md hover:text-[#1E3A5F] hover:bg-[rgba(30,58,95,0.05)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button href="#lead-form" size="sm" className="hidden sm:inline-flex">
              Оставить заявку
            </Button>

            <button
              type="button"
              className="lg:hidden p-2 text-[#475569] hover:text-[#1E3A5F] transition-colors"
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
          "lg:hidden overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <Container>
          <div className="py-4 border-t border-[#F1F5F9]">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-[#475569] font-medium hover:text-[#1E3A5F] hover:bg-[rgba(30,58,95,0.05)] rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 px-4 sm:hidden">
              <Button href="#lead-form" className="w-full">
                Оставить заявку
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
