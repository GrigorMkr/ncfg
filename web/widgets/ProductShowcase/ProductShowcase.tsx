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
      <div className="space-y-12 md:space-y-16">
        {products.map((product, index) => (
          <div key={product.title}>
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
