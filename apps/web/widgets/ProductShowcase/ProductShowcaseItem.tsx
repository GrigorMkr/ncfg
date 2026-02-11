"use client";

import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/cn";
import { getProductShowcaseIcon, type ProductShowcaseIcon } from "@/shared/constants";
import { useTranslation } from "@/shared/i18n";

interface ProductShowcaseItemProps {
  title: string;
  description: string;
  href: string;
  image?: string;
  icon?: ProductShowcaseIcon;
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
  const { t } = useTranslation();
  const isExternal = href.startsWith("http");
  const Icon = getProductShowcaseIcon(icon);

  return (
    <div
      className={cn(
        "grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center",
        reversed && "md:[&>*:first-child]:order-2"
      )}
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group/img">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-[#0ea5e9]/80 flex items-center justify-center">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full" />
            {Icon ? (
              <div className="icon-badge w-24 h-24 rounded-2xl border-0 flex items-center justify-center bg-white/10">
                <Icon size={48} strokeWidth={1.5} className="text-white/90" />
              </div>
            ) : (
              <span className="text-4xl font-bold text-white/20 tracking-wider">{t.misc.ncfg}</span>
            )}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
          {title}
        </h3>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {description}
        </p>
        <div className="mt-6">
          <Button
            href={href}
            variant="primary"
            className="gap-2"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {t.btn.more}
            {isExternal ? (
              <ExternalLink size={18} strokeWidth={1.75} />
            ) : (
              <ArrowRight size={18} strokeWidth={1.75} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
