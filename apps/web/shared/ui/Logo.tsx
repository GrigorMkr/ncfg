"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/shared/lib/cn";

interface LogoProps {
  href?: string;
  showWordmark?: boolean;
  variant?: "default" | "light";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { icon: 32, text: "text-lg" },
  md: { icon: 40, text: "text-xl" },
  lg: { icon: 48, text: "text-2xl" },
};

export function Logo({
  href = "/",
  showWordmark = true,
  variant = "default",
  className,
  size = "md",
}: LogoProps) {
  const s = sizes[size];
  const content = (
    <>
      <Image
        src="/logo.svg"
        alt="НЦФГ"
        width={s.icon}
        height={s.icon}
        className={cn(
          "shrink-0 transition-transform duration-300",
          variant === "light" && "brightness-0 invert"
        )}
      />
      {showWordmark && (
        <span
          className={cn(
            "font-bold tracking-tight",
            s.text,
            variant === "default" && "text-slate-900",
            variant === "light" && "text-white"
          )}
        >
          НЦФГ
        </span>
      )}
    </>
  );

  const wrapperClass = cn(
    "inline-flex items-center gap-2.5",
    href && "group hover:opacity-90 transition-opacity",
    className
  );

  if (href) {
    return (
      <Link href={href} className={wrapperClass}>
        {content}
      </Link>
    );
  }
  return <div className={wrapperClass}>{content}</div>;
}
