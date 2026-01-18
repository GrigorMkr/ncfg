import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, FileText } from "lucide-react";
import { Container } from "@/shared/ui/Container";

interface LegalDocument {
  label: string;
  href: string;
  type: string;
}

interface FooterProps {
  legalDocuments?: {
    title: string;
    items: LegalDocument[];
  };
}

const navigation = [
  { label: "О нас", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Партнёры", href: "#partners" },
  { label: "Новости", href: "#news" },
  { label: "FAQ", href: "#faq" },
];

const contacts = [
  {
    icon: Mail,
    label: "info@ncfg.ru",
    href: "mailto:info@ncfg.ru",
  },
  {
    icon: Phone,
    label: "+7 (495) 123-45-67",
    href: "tel:+74951234567",
  },
  {
    icon: MapPin,
    label: "Москва, Россия",
    href: null,
  },
];

export function Footer({ legalDocuments }: FooterProps) {
  const currentYear = new Date().getFullYear();

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
                <span className="font-semibold text-lg">НЦФГ</span>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed">
                Национальный центр финансовой грамотности — лидер в реализации образовательных проектов по финансовой грамотности в России.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Навигация</h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.href}>
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
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-3">
                {contacts.map((contact) => (
                  <li key={contact.label} className="flex items-center gap-3">
                    <contact.icon size={16} className="text-[#00D9FF] shrink-0" />
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="text-white/70 hover:text-white transition-colors text-sm"
                      >
                        {contact.label}
                      </a>
                    ) : (
                      <span className="text-white/70 text-sm">{contact.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {legalDocuments && legalDocuments.items.length > 0 && (
              <div>
                <h3 className="font-semibold mb-4">{legalDocuments.title}</h3>
                <ul className="space-y-3">
                  {legalDocuments.items.map((doc) => (
                    <li key={doc.label} className="flex items-start gap-3">
                      <FileText size={16} className="text-[#00D9FF] shrink-0 mt-0.5" />
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
            <p>© {currentYear} АНО «Национальный центр финансовой грамотности». Все права защищены.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
