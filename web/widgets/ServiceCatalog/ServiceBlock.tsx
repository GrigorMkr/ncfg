import { BentoCard } from "./BentoCard";

interface ServiceItem {
  title: string;
  description: string;
  href: string;
  icon: string;
}

interface ServiceBlockProps {
  title: string;
  description: string;
  items: ServiceItem[];
}

export function ServiceBlock({ title, description, items }: ServiceBlockProps) {
  return (
    <div className="mb-12 last:mb-0">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-2">
          {title}
        </h2>
        <p className="text-[#475569] text-lg">{description}</p>
      </div>

      {renderGrid(items)}
    </div>
  );
}

function renderGrid(items: ServiceItem[]) {
  // 5 items: top row (featured spanning 2 cols + 1), bottom row (3 equal)
  if (items.length === 5) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BentoCard {...items[0]} featured className="md:col-span-2" />
        <BentoCard {...items[1]} />
        <BentoCard {...items[2]} />
        <BentoCard {...items[3]} />
        <BentoCard {...items[4]} />
      </div>
    );
  }

  // 3 items: featured left (2 cols, 2 rows), stacked right
  if (items.length === 3) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
        <BentoCard
          {...items[0]}
          featured
          className="md:col-span-2 md:row-span-2"
        />
        <BentoCard {...items[1]} />
        <BentoCard {...items[2]} />
      </div>
    );
  }

  // 2 items: 60/40 split
  if (items.length === 2) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <BentoCard {...items[0]} featured className="md:col-span-3" />
        <BentoCard {...items[1]} className="md:col-span-2" />
      </div>
    );
  }

  // Default: responsive grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, idx) => (
        <BentoCard key={idx} {...item} />
      ))}
    </div>
  );
}
