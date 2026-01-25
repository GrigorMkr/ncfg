import { ExternalLink } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { Button } from "@/shared/ui/Button";

interface Product {
  title: string;
  description: string;
  href: string;
  badge?: string;
}

const products: Product[] = [
  {
    title: "Школа «Деньгин's» и клуб «Дети в Деле»",
    description:
      "Финансовое воспитание для детей и подростков. Интерактивные программы, которые учат ребёнка управлять деньгами с ранних лет.",
    href: "https://dengins.ru/",
  },
  {
    title: "Клуб «ФинЗдоровье»",
    description:
      "Сообщество для взрослых, где участники учатся управлять личными финансами, планировать бюджет и достигать финансовых целей.",
    href: "https://fgrm.ncfg.ru/wellf_club",
  },
  {
    title: "День «ФинПривычки»",
    description:
      "Однодневная интенсивная программа для формирования здоровых финансовых привычек. Практические инструменты и техники.",
    href: "https://fgrm.ncfg.ru/FinHabit",
  },
];

function ProductCard({ product }: { product: Product }) {
  const isComingSoon = !!product.badge;

  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-[#F1F5F9] hover:border-[#E2E8F0] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Stub image like News/Services section */}
      <div className="aspect-[16/9] bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6] flex items-center justify-center relative">
        <span className="text-white/20 text-5xl font-bold">НЦФГ</span>
        {product.badge && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-white/90 text-[#1E3A5F] text-xs font-semibold rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2">
          {product.title}
        </h3>
        <p className="text-[#475569] text-sm leading-relaxed mb-4 flex-1">
          {product.description}
        </p>
        <Button
          href={product.href}
          size="sm"
          target="_blank"
          rel="noopener noreferrer"
          className={isComingSoon ? "opacity-50 pointer-events-none" : ""}
        >
          Подробнее
          <ExternalLink size={14} className="ml-1.5" />
        </Button>
      </div>
    </article>
  );
}

export function Products() {
  return (
    <Section
      id="products"
      title="Продукты"
      lead="Готовые решения для повышения финансовой грамотности — от детских программ до корпоративных инструментов"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </div>
    </Section>
  );
}
