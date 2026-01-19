import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, FileText } from "lucide-react";
import { Container } from "@/shared/ui/Container";

interface LegalDocument {
  label: string;
  href: string;
  type: string;
}

interface FooterData {
  organization: {
    fullName: string;
    shortName: string;
  };
  contacts: {
    phone: string;
    email: string;
    legalAddress: string;
  };
  social: Array<{
    label: string;
    href: string;
  }>;
  legalLinks: Array<{
    label: string;
    href: string;
  }>;
  legalDocuments: {
    title: string;
    items: LegalDocument[];
  };
  copyright: {
    years: string;
    text: string;
    notice: string;
  };
}

interface FooterProps {
  data: FooterData;
}

const navigation = [
  { label: "Частным лицам", href: "#" },
  { label: "Компаниям", href: "#" },
  { label: "Волонтерам", href: "#" },
  { label: "Ещё", href: "#" },
];

export function Footer({ data }: FooterProps) {
  return (
    <footer id="contacts" className="bg-[#1E3A5F] text-white">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6">
                <Image
                  src="/logo.svg"
                  alt="НЦФГ"
                  width={40}
                  height={40}
                  className="h-10 w-10 brightness-0 invert"
                />
              </Link>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {data.organization.fullName}
              </p>
              <div className="space-y-2 text-sm">
                <a
                  href={`tel:${data.contacts.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-[#58A8E0]" />
                  {data.contacts.phone}
                </a>
                <a
                  href={`mailto:${data.contacts.email}`}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <Mail size={14} className="text-[#58A8E0]" />
                  {data.contacts.email}
                </a>
                <div className="flex items-start gap-2 text-white/70">
                  <MapPin size={14} className="text-[#58A8E0] shrink-0 mt-0.5" />
                  <span>{data.contacts.legalAddress}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Навигация</h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Социальные сети</h3>
              <ul className="space-y-3">
                {data.social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <h4 className="font-semibold mb-3 text-sm">Юридическая информация</h4>
                <ul className="space-y-2">
                  {data.legalLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-white/70 hover:text-white transition-colors text-sm"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {data.legalDocuments && data.legalDocuments.items.length > 0 && (
              <div>
                <h3 className="font-semibold mb-4">{data.legalDocuments.title}</h3>
                <ul className="space-y-3">
                  {data.legalDocuments.items.map((doc) => (
                    <li key={doc.label} className="flex items-start gap-3">
                      <FileText size={16} className="text-[#58A8E0] shrink-0 mt-0.5" />
                      <a
                        href={doc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-white transition-colors text-sm"
                      >
                        {doc.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <div>
              <p>{data.copyright.text}</p>
              <p className="mt-1">{data.copyright.notice}</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
