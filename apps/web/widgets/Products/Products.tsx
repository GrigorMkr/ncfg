import { Section } from "@/shared/ui/Section";
import { ProductCard } from "./ui";
import { PRODUCTS } from "@/shared/content";

export function Products() {
  return (
    <Section
      id="products"
      title="Продукты"
      lead="Готовые решения для повышения финансовой грамотности — от детских программ до корпоративных инструментов"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product, index) => (
          <ProductCard key={product.title} product={product} index={index} />
        ))}
      </div>
    </Section>
  );
}
