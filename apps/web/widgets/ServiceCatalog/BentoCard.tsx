"use client";

import Link from "next/link";
import {
  ClipboardCheck,
  Target,
  PlayCircle,
  Video,
  Users,
  Phone,
  UserCheck,
  ArrowRight,
  Layers,
  Trophy,
  BookOpen,
  FileText,
  PenTool,
  CalendarDays,
  Mic,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useTranslation } from "@/shared/i18n";

const iconMap: Record<string, LucideIcon> = {
  "clipboard-check": ClipboardCheck,
  target: Target,
  "play-circle": PlayCircle,
  video: Video,
  users: Users,
  phone: Phone,
  "user-check": UserCheck,
  layers: Layers,
  trophy: Trophy,
  "book-open": BookOpen,
  "file-text": FileText,
  "pen-tool": PenTool,
  "calendar-days": CalendarDays,
  mic: Mic,
};

interface BentoCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
  featured?: boolean;
  className?: string;
}

export function BentoCard({
  title,
  description,
  href,
  icon,
  featured = false,
  className,
}: BentoCardProps) {
  const { t } = useTranslation();
  const Icon = iconMap[icon] || Target;

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col rounded-2xl border border-slate-200/80 transition-all duration-300",
        "hover:shadow-[0_20px_40px_-12px_rgba(14,165,233,0.15)] dark:hover:shadow-[0_20px_40px_-12px_rgba(56,189,248,0.12)] hover:-translate-y-1 hover:border-[#0ea5e9]/40 dark:hover:border-[#38bdf8]/40",
        featured
          ? "bg-[#0ea5e9]/5 dark:bg-[#38bdf8]/10 border-[#0ea5e9]/20 dark:border-[#38bdf8]/20 p-6 md:p-8"
          : "bg-white dark:bg-slate-800/90 p-5 md:p-6",
        className
      )}
    >
      <div className={cn("icon-badge flex items-center justify-center mb-4", featured ? "w-14 h-14 rounded-2xl mb-6" : "w-11 h-11 rounded-xl")}>
        <Icon className={cn(featured ? "w-7 h-7" : "w-5 h-5")} strokeWidth={1.75} />
      </div>

      <h3 className={cn("font-semibold text-slate-900 dark:text-white group-hover:text-[#0ea5e9] dark:group-hover:text-[#38bdf8] transition-colors", featured ? "text-xl md:text-2xl mb-3" : "text-lg mb-2")}>
        {title}
      </h3>

      <p className={cn("text-slate-600 dark:text-slate-300 leading-relaxed flex-grow", featured ? "text-base md:text-lg" : "text-sm")}>
        {description}
      </p>

      <div className={cn("flex items-center gap-2 text-[#0ea5e9] transition-opacity mt-4", "md:opacity-0 md:group-hover:opacity-100")}>
        <span className={cn("font-medium", featured ? "text-base" : "text-sm")}>
          {t.btn.more}
        </span>
        <ArrowRight className={cn(featured ? "w-5 h-5" : "w-4 h-4")} strokeWidth={1.75} />
      </div>
    </Link>
  );
}
