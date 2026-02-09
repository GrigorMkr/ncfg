"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { NavItem } from "@/shared/config";
import { useTranslation } from "@/shared/i18n";

interface FooterNavProps {
  items: NavItem[];
  title?: string;
}

export function FooterNav({ items, title }: FooterNavProps) {
  const { t } = useTranslation();
  const displayTitle = title || t.footer.navigation;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="md:hidden flex items-center justify-between w-full text-white hover:text-white transition-colors py-3 border-b border-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-white">{displayTitle}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <h3 className="hidden md:block font-semibold mb-5 text-white">{displayTitle}</h3>
      <ul className={`space-y-2 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'}`}>
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="group flex items-center gap-2 text-white hover:text-[#38bdf8] transition-all duration-300 text-sm py-1.5"
            >
              <span className="group-hover:translate-x-0.5 transition-transform duration-300">{item.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -ml-1 group-hover:opacity-100 transition-all duration-300" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
