"use client";

import { Section } from "@/shared/ui/Section";
import { ProductCard } from "./ui";
import { PRODUCTS } from "@/shared/content";
import { useTranslation } from "@/shared/i18n";

export function Products() {
  const { t } = useTranslation();

  const translatedProducts = PRODUCTS.map((product, i) => ({
    ...product,
    title: t.products[i]?.title ?? product.title,
    description: t.products[i]?.description ?? product.description,
  }));

  return (
    <Section
      id="products"
      title={t.sections.products}
      lead={t.sections.productsLead}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {translatedProducts.map((product, index) => (
          <ProductCard key={product.title} product={product} index={index} />
        ))}
      </div>
    </Section>
  );
}
