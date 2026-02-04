import { getPrincipleIcon } from "@/shared/constants";

interface Principle {
  id: string;
  order: number;
  title: string;
  description: string;
}

interface PrincipleCardProps {
  principle: Principle;
  isLastAndOdd: boolean;
}

export function PrincipleCard({ principle, isLastAndOdd }: PrincipleCardProps) {
  const Icon = getPrincipleIcon(principle.id);

  return (
    <div
      className={`relative bg-white rounded-2xl border border-slate-200/80 p-6 pl-10
                 overflow-hidden hover:border-[#0ea5e9]/40 hover:shadow-[0_20px_40px_-12px_rgba(14,165,233,0.15)] transition-all duration-300
                 ${isLastAndOdd ? "md:col-span-2 md:max-w-[calc(50%-0.75rem)] md:mx-auto" : ""}`}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0ea5e9] to-[#38bdf8]" />
      <div className="icon-badge w-11 h-11 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-5 h-5" strokeWidth={1.75} />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        {principle.title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">
        {principle.description}
      </p>
    </div>
  );
}
