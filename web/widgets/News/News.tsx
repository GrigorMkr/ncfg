import { Calendar, ArrowRight } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { Button } from "@/shared/ui/Button";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  href: string;
}

interface NewsProps {
  title: string;
  items: NewsItem[];
  archiveHref?: string;
}

const placeholderNews: NewsItem[] = [
  {
    id: "1",
    title: "НЦФГ провёл серию вебинаров для сотрудников крупных компаний",
    date: "15 января 2025",
    excerpt: "Более 5000 участников присоединились к образовательным мероприятиям по финансовой грамотности.",
    href: "/news/1",
  },
  {
    id: "2",
    title: "Старт программы финансового well-being для HR-специалистов",
    date: "10 января 2025",
    excerpt: "Новая программа помогает компаниям заботиться о финансовом здоровье сотрудников.",
    href: "/news/2",
  },
  {
    id: "3",
    title: "Итоги Всероссийской недели финансовой грамотности 2024",
    date: "28 декабря 2024",
    excerpt: "Рекордное число участников — более 2 миллионов человек из 84 регионов России.",
    href: "/news/3",
  },
];

export function News({ title, items, archiveHref = "/news" }: NewsProps) {
  const displayItems = items.length > 0 ? items : placeholderNews;

  return (
    <Section id="news" title={title} background="gray">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((item) => (
          <article
            key={item.id}
            className="group bg-white rounded-xl overflow-hidden border border-[#F1F5F9] hover:border-[#E2E8F0] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6] flex items-center justify-center">
              <span className="text-white/20 text-6xl font-bold">НЦФГ</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm text-[#94A3B8] mb-3">
                <Calendar size={14} />
                <time>{item.date}</time>
              </div>
              <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2 group-hover:text-[#3B82F6] transition-colors line-clamp-2">
                <Link href={item.href}>{item.title}</Link>
              </h3>
              <p className="text-[#475569] text-sm line-clamp-2">{item.excerpt}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center mt-10">
        <Button href={archiveHref} variant="secondary">
          Все новости
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>
    </Section>
  );
}
