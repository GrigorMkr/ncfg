"use client";

import { memo, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";

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
  const showImage = Boolean(logo.img && !imgError);
  const handleError = useCallback(() => setImgError(true), []);
  const Wrapper = logo.href ? Link : "div";
  const wrapperProps = logo.href ? { href: logo.href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "aspect-[3/2] bg-white rounded-xl border border-slate-200/80 p-4 flex items-center justify-center",
        "hover:border-[#0ea5e9]/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200",
        logo.href && "group"
      )}
      title={logo.title}
    >
      {showImage ? (
        <div className="relative w-full h-full min-h-[48px]">
          <Image
            src={logo.img!}
            alt={logo.title}
            fill
            className="object-contain p-1"
            sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
            unoptimized={logo.img?.startsWith("http") === true}
            onError={handleError}
          />
        </div>
      ) : (
        <span className="text-slate-500 text-xs text-center font-medium line-clamp-2">
          {logo.title}
        </span>
      )}
    </Wrapper>
  );
});
