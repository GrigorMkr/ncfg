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
  const Icon = iconMap[icon] || Target;

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col rounded-2xl border transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        featured
          ? "bg-[#F0F7FF] border-[#E2E8F0] p-6 md:p-8"
          : "bg-white border-[#F1F5F9] p-5 md:p-6 hover:border-[#E2E8F0]",
        className
      )}
    >
      <div
        className={cn(
          "rounded-xl flex items-center justify-center",
          featured
            ? "w-14 h-14 rounded-2xl bg-[#3B82F6]/10 mb-6"
            : "w-11 h-11 bg-[#1E3A5F]/10 mb-4"
        )}
      >
        <Icon
          className={cn(
            featured ? "w-7 h-7 text-[#3B82F6]" : "w-5 h-5 text-[#1E3A5F]"
          )}
        />
      </div>

      <h3
        className={cn(
          "font-semibold text-[#1E3A5F] group-hover:text-[#3B82F6] transition-colors",
          featured ? "text-xl md:text-2xl mb-3" : "text-lg mb-2"
        )}
      >
        {title}
      </h3>

      <p
        className={cn(
          "text-[#475569] leading-relaxed flex-grow",
          featured ? "text-base md:text-lg" : "text-sm"
        )}
      >
        {description}
      </p>

      <div
        className={cn(
          "flex items-center gap-2 text-[#3B82F6] transition-opacity mt-4",
          "md:opacity-0 md:group-hover:opacity-100"
        )}
      >
        <span className={cn("font-medium", featured ? "text-base" : "text-sm")}>
          Подробнее
        </span>
        <ArrowRight className={cn(featured ? "w-5 h-5" : "w-4 h-4")} />
      </div>
    </Link>
  );
}
