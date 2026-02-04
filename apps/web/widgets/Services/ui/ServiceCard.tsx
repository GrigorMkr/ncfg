import { memo } from "react";
import Image from "next/image";
import { ArrowRight, Layers } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/cn";

interface Service {
  id?: string;
  title: string;
  description: string;
  href: string;
  image: string | null;
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

export const ServiceCard = memo(function ServiceCard({ service }: ServiceCardProps) {
  const hasImage = Boolean(service.image);
  return (
    <article
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80",
        "hover:border-[#0ea5e9]/40 hover:shadow-[0_20px_40px_-12px_rgba(14,165,233,0.2)] hover:-translate-y-2",
        "transition-all duration-300 flex flex-col"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="aspect-[16/9] relative overflow-hidden bg-slate-800">
        {hasImage ? (
          <Image
            src={service.image!}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-[#0ea5e9]/70 flex items-center justify-center">
            <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 icon-badge border-0">
              <Layers className="w-8 h-8 text-white/90" strokeWidth={1.5} />
            </div>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1 relative">
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#0ea5e9] transition-colors">
          {service.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
          {service.description}
        </p>
        <Button href={service.href} size="sm" className="gap-2 w-fit group/btn">
          Подробнее
          <ArrowRight
            size={14}
            strokeWidth={1.75}
            className="group-hover/btn:translate-x-0.5 transition-transform"
          />
        </Button>
      </div>
    </article>
  );
});
