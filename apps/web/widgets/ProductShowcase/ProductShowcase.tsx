"use client";

import { Section } from "@/shared/ui/Section";
import { ProductShowcaseItem } from "./ProductShowcaseItem";
import { useTranslation } from "@/shared/i18n";

interface Product {
  title: string;
  description: string;
  href: string;
  image?: string;
  icon?: "graduation-cap" | "trending-up" | "zap";
}

interface ProductShowcaseProps {
  title?: string;
  lead?: string;
  products: Product[];
}

export function ProductShowcase({ title, lead, products }: ProductShowcaseProps) {
  const { t } = useTranslation();
  const displayTitle = title || t.pages.individualsProductsTitle;
  const displayLead = lead || t.pages.individualsProductsLead;

  const translatedProducts = products.map((p, i) => ({
    ...p,
    title: t.individualsProducts[i]?.title ?? p.title,
    description: t.individualsProducts[i]?.description ?? p.description,
  }));
  return (
    <Section id="products" title={displayTitle} lead={displayLead}>
      <div className="space-y-12 md:space-y-16">
        {translatedProducts.map((product, index) => (
          <div
            key={product.title}
            className="animate-fade-in-up opacity-0"
            style={{
              animationDelay: `${index * 120}ms`,
              animationFillMode: "forwards",
            }}
          >
            {index > 0 && (
              <hr className="border-t border-[#E2E8F0] mb-12 md:mb-16" />
            )}
            <ProductShowcaseItem
              title={product.title}
              description={product.description}
              href={product.href}
              image={product.image}
              icon={product.icon}
              reversed={index % 2 === 1}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
