import { memo } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { getAssetPath } from "@/shared/lib/getAssetPath";

interface NewsCardProps {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  href: string;
  image?: string | null;
}

export const NewsCard = memo(function NewsCard({ title, date, excerpt, href, image }: NewsCardProps) {
  const imageSrc = getAssetPath(image);
  return (
    <article className="group bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 hover:border-[#0ea5e9]/40 dark:hover:border-[#38bdf8]/40 hover:shadow-[0_20px_40px_-12px_rgba(14,165,233,0.2)] dark:hover:shadow-[0_20px_40px_-12px_rgba(56,189,248,0.15)] hover:-translate-y-2 transition-all duration-300">
      <div className="aspect-[16/9] relative overflow-hidden bg-slate-800">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-[#0ea5e9]/80 flex items-center justify-center">
            <span className="text-white/15 text-5xl font-bold">NCFL</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
          <span className="icon-badge w-8 h-8 flex items-center justify-center">
            <Calendar size={16} strokeWidth={1.75} />
          </span>
          <time>{date}</time>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-[#0ea5e9] dark:group-hover:text-[#38bdf8] transition-colors line-clamp-2">
          <Link href={href}>{title}</Link>
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">{excerpt}</p>
      </div>
    </article>
  );
});
