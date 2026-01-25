import Image from "next/image";
import { ArrowRight, ExternalLink, GraduationCap, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/cn";

const iconMap = {
  "graduation-cap": GraduationCap,
  "trending-up": TrendingUp,
  "zap": Zap,
};

type IconType = keyof typeof iconMap;

interface ProductShowcaseItemProps {
  title: string;
  description: string;
  href: string;
  image?: string;
  icon?: IconType;
  reversed?: boolean;
}

export function ProductShowcaseItem({
  title,
  description,
  href,
  image,
  icon,
  reversed = false,
}: ProductShowcaseItemProps) {
  const isExternal = href.startsWith("http");
  const Icon = icon ? iconMap[icon] : null;

  return (
    <div
      className={cn(
        "grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center",
        reversed && "md:[&>*:first-child]:order-2"
      )}
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6] flex items-center justify-center">
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full" />

            {/* Icon or fallback text */}
            {Icon ? (
              <Icon size={96} strokeWidth={1.5} className="text-white/30" />
            ) : (
              <span className="text-4xl font-bold text-white/20 tracking-wider">НЦФГ</span>
            )}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] leading-tight">
          {title}
        </h3>
        <p className="mt-4 text-lg text-[#475569] leading-relaxed">
          {description}
        </p>
        <div className="mt-6">
          <Button
            href={href}
            variant="primary"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            Подробнее
            {isExternal ? (
              <ExternalLink size={18} className="ml-2" />
            ) : (
              <ArrowRight size={18} className="ml-2" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
