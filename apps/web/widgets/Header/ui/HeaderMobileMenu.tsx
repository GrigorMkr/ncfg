import Link from "next/link";
import { Send } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { NavItem } from "@/shared/config";

interface HeaderMobileMenuProps {
  items: NavItem[];
  ctaHref: string;
  isOpen: boolean;
  onClose: () => void;
}

export function HeaderMobileMenu({ items, ctaHref, isOpen, onClose }: HeaderMobileMenuProps) {
  return (
    <div
      className={cn(
        "md:hidden overflow-hidden transition-all duration-500 ease-out",
        isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className="py-6 border-t border-slate-200/60 space-y-1">
        {items.map((item, index) => (
          <div key={item.href + index}>
            <Link
              href={item.href}
              className="flex items-center gap-3 px-4 py-3.5 text-slate-600 font-medium rounded-xl hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10 transition-all duration-300"
              onClick={onClose}
            >
              {item.Icon && (
                <span className="icon-badge w-9 h-9 flex items-center justify-center">
                  <item.Icon className="w-5 h-5" strokeWidth={1.75} />
                </span>
              )}
              {item.label}
            </Link>
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="flex items-center gap-3 pl-14 pr-4 py-2.5 text-slate-500 font-medium rounded-xl hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/5 transition-all duration-300 text-sm"
                onClick={onClose}
              >
                {child.label}
              </Link>
            ))}
          </div>
        ))}
        <div className="mt-6 px-4 sm:hidden">
          <a
            href={ctaHref}
            className="flex items-center justify-center gap-2 w-full h-12 rounded-xl font-semibold
              bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-white
              shadow-lg shadow-[#0ea5e9]/25 hover:shadow-xl active:scale-[0.98] transition-all duration-300"
          >
            <Send className="w-4 h-4" strokeWidth={2} />
            Оставить заявку
          </a>
        </div>
      </div>
    </div>
  );
}
