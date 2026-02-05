import { ArrowRight } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { Button } from "@/shared/ui/Button";
import { NewsCard } from "./ui";
import { PLACEHOLDER_NEWS } from "@/shared/content";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  href: string;
  image?: string | null;
}

interface NewsProps {
  title: string;
  items: NewsItem[];
  archiveHref?: string;
}

export function News({ title, items, archiveHref = "/news" }: NewsProps) {
  const displayItems = items.length > 0 ? items : PLACEHOLDER_NEWS;

  return (
    <Section id="news" title={title} background="gray">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayItems.map((item) => (
          <NewsCard key={item.id} {...item} />
        ))}
      </div>
      <div className="text-center mt-12">
        <Button href={archiveHref} variant="secondary" className="gap-2">
          Все новости
          <ArrowRight size={18} strokeWidth={1.75} />
        </Button>
      </div>
    </Section>
  );
}
