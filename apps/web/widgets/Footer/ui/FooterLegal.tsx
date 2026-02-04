import Link from "next/link";
import { FileText, ExternalLink } from "lucide-react";
import { SocialIcon } from "@/shared/ui/SocialIcon";

interface FooterSocialLinksProps {
  social: Array<{ id?: string; label: string; href: string }>;
  legalLinks: Array<{ label: string; href: string }>;
}

export function FooterSocialLinks({ social, legalLinks }: FooterSocialLinksProps) {
  return (
    <div>
      <h3 className="font-semibold mb-5 text-white/95">Социальные сети</h3>
      <ul className="space-y-3">
        {social.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-white/70 hover:text-[#38bdf8] transition-all duration-300 py-2"
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
      <div className="mt-8">
        <h4 className="font-semibold mb-4 text-sm text-white/90">Юридическая информация</h4>
        <ul className="space-y-2">
          {legalLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="group flex items-center gap-2 text-white/70 hover:text-[#38bdf8] transition-all duration-300 text-sm py-1"
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
  return (
    <div>
      <h3 className="font-semibold mb-5 text-white/95">{title}</h3>
      <ul className="space-y-2">
        {items.map((doc) => (
          <li key={doc.label} className="group flex items-start gap-3">
            <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#38bdf8] group-hover:bg-[#38bdf8]/20 group-hover:scale-105 transition-all duration-300">
              <FileText className="w-4 h-4" strokeWidth={1.75} />
            </span>
            <a
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[#38bdf8] transition-all duration-300 text-sm pt-1.5 group-hover:translate-x-0.5"
            >
              {doc.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
