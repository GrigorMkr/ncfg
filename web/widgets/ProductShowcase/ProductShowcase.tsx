import { Section } from "@/shared/ui/Section";
import { ProductShowcaseItem } from "./ProductShowcaseItem";

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
  return (
    <Section id="products" title={title} lead={lead}>
      <div className="space-y-16 md:space-y-24">
        {products.map((product, index) => (
          <ProductShowcaseItem
            key={product.title}
            title={product.title}
            description={product.description}
            href={product.href}
            image={product.image}
            icon={product.icon}
            reversed={index % 2 === 1}
          />
        ))}
      </div>
    </Section>
  );
}
