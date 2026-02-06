"use client";

import { memo, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import { getAssetPath } from "@/shared/lib/getAssetPath";

interface PartnerLogo {
  title: string;
  href: string | null;
  img?: string;
}

interface LogoCardProps {
  logo: PartnerLogo;
}

export const LogoCard = memo(function LogoCard({ logo }: LogoCardProps) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = getAssetPath(logo.img);
  const showImage = Boolean(imgSrc && !imgError);
  const handleError = useCallback(() => setImgError(true), []);

  const cardClassName = cn(
    "aspect-[3/2] bg-white rounded-xl border border-slate-200/80 p-4 flex items-center justify-center",
    "hover:border-[#0ea5e9]/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200",
    logo.href && "group"
  );

  const content = showImage ? (
    <div className="relative w-full h-full min-h-[48px]">
      <Image
        src={imgSrc}
        alt={logo.title}
        fill
        className="object-contain p-1"
        sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
        unoptimized={imgSrc.startsWith("http")}
        onError={handleError}
      />
    </div>
  ) : (
    <span className="text-slate-500 text-xs text-center font-medium line-clamp-2">
      {logo.title}
    </span>
  );

  if (logo.href) {
    return (
      <Link href={logo.href} className={cardClassName} title={logo.title}>
        {content}
      </Link>
    );
  }

  return (
    <div className={cardClassName} title={logo.title}>
      {content}
    </div>
  );
});
