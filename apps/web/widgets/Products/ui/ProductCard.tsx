"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "@/shared/i18n";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/cn";
import { getAssetPath } from "@/shared/lib/getAssetPath";
import type { ProductItem } from "@/shared/content";
import { ANIMATION } from "@/shared/constants";

interface ProductCardProps {
  product: ProductItem;
  index: number;
}

export const ProductCard = memo(function ProductCard({ product, index }: ProductCardProps) {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const imageSrc = getAssetPath(product.image);
  const isComingSoon = !!product.badge;
  const delay = Math.min(index * ANIMATION.DELAY_STEP, ANIMATION.DELAY_MAX);

  return (
    <article
      className={cn(
        "group relative bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80",
        "hover:border-[#0ea5e9]/40 dark:hover:border-[#38bdf8]/40 hover:shadow-[0_20px_40px_-12px_rgba(14,165,233,0.25)] dark:hover:shadow-[0_20px_40px_-12px_rgba(56,189,248,0.15)] hover:-translate-y-2",
        "transition-all duration-300 ease-out flex flex-col shadow-sm hover:shadow-lg",
        "animate-fade-in-up opacity-0"
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="aspect-[16/9] relative overflow-hidden bg-slate-100 dark:bg-slate-700">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            "object-cover transition-all duration-500",
            "group-hover:scale-110",
            loaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setLoaded(true)}
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        {product.badge && (
          <span className="absolute top-3 right-3 px-3 py-1.5 bg-white/95 dark:bg-slate-800/95 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-full shadow-sm">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1 relative">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-[#0ea5e9] dark:group-hover:text-[#38bdf8] transition-colors">
          {product.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5 flex-1">
          {product.description}
        </p>
        <Button
          href={product.href}
          size="sm"
          target="_blank"
          rel="noopener noreferrer"
          className={cn("gap-2 w-fit group/btn", isComingSoon && "opacity-50 pointer-events-none")}
        >
          {t.btn.more}
          <ExternalLink
            size={14}
            strokeWidth={1.75}
            className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
          />
        </Button>
      </div>
    </article>
  );
});
