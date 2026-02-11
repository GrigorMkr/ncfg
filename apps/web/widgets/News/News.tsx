"use client";

import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { Button } from "@/shared/ui/Button";
import { NewsCard } from "./ui";
import { useTranslation } from "@/shared/i18n";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  href: string;
  image?: string | null;
}

interface NewsProps {
  title?: string;
  items: NewsItem[];
  archiveHref?: string;
}

export function News({ title, items, archiveHref = "/blog" }: NewsProps) {
  const { t } = useTranslation();

  const translatedItems = useMemo(
    () =>
      items.map((item, i) => ({
        ...item,
        title: t.news[i]?.title ?? item.title,
        excerpt: t.news[i]?.excerpt ?? item.excerpt,
      })),
    [items, t]
  );

  return (
    <Section id="news" title={title || t.sections.news} background="gray">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {translatedItems.map((item) => (
          <NewsCard key={item.id} {...item} />
        ))}
      </div>
      <div className="text-center mt-12">
        <Button href={archiveHref} variant="secondary" className="gap-2">
          {t.btn.allNews}
          <ArrowRight size={18} strokeWidth={1.75} />
        </Button>
      </div>
    </Section>
  );
}
