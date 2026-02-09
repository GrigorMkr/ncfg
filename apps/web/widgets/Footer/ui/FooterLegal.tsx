"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, ExternalLink, ChevronDown } from "lucide-react";
import { SocialIcon } from "@/shared/ui/SocialIcon";
import { useTranslation } from "@/shared/i18n";

interface FooterSocialLinksProps {
  social: Array<{ id?: string; label: string; href: string }>;
  legalLinks: Array<{ label: string; href: string }>;
  socialTitle?: string;
  legalTitle?: string;
}

export function FooterSocialLinks({ social, legalLinks, socialTitle, legalTitle }: FooterSocialLinksProps) {
  const { t } = useTranslation();
  const displaySocialTitle = socialTitle || t.footerContacts.socialNetworks;
  const displayLegalTitle = legalTitle || t.footerContacts.legalInfo;
  const [legalOpen, setLegalOpen] = useState(false);

  return (
    <div>
      <h3 className="font-semibold mb-5 text-white">{displaySocialTitle}</h3>
      <ul className="space-y-3">
        {social.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-white hover:text-[#38bdf8] transition-all duration-300 py-2"
            >
              {item.id && (
                <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#38bdf8] group-hover:bg-[#38bdf8]/20 transition-all duration-300">
                  <SocialIcon id={item.id} size={20} />
                </span>
              )}
              <span className="group-hover:translate-x-0.5 transition-transform duration-300">{item.label}</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-6 md:mt-8">
        <button
          type="button"
          className="md:hidden flex items-center justify-between w-full text-white hover:text-white transition-colors py-3 border-b border-white/10"
          onClick={() => setLegalOpen(!legalOpen)}
        >
          <span className="font-semibold text-white">{displayLegalTitle}</span>
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${legalOpen ? 'rotate-180' : ''}`} />
        </button>
        <h4 className="hidden md:block font-semibold mb-4 text-sm text-white">{displayLegalTitle}</h4>
        <ul className={`space-y-2 overflow-hidden transition-all duration-300 ${legalOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'}`}>
          {legalLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="group flex items-center gap-2 text-white hover:text-[#38bdf8] transition-all duration-300 text-sm py-1"
              >
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface FooterDocumentsProps {
  title: string;
  items: Array<{ label: string; href: string }>;
}

export function FooterDocuments({ title, items }: FooterDocumentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="md:hidden flex items-center justify-between w-full text-white hover:text-white transition-colors py-3 border-b border-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-white">{title}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <h3 className="hidden md:block font-semibold mb-5 text-white">{title}</h3>
      <ul className={`space-y-2 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'}`}>
        {items.map((doc) => (
          <li key={doc.label} className="group flex items-start gap-3">
            <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#38bdf8] group-hover:bg-[#38bdf8]/20 group-hover:scale-105 transition-all duration-300">
              <FileText className="w-4 h-4" strokeWidth={1.75} />
            </span>
            <a
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#38bdf8] transition-all duration-300 text-sm pt-1.5 group-hover:translate-x-0.5"
            >
              {doc.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
