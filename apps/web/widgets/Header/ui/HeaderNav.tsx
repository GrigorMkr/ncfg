"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { NavItem } from "@/shared/config";

interface HeaderNavProps {
  items: NavItem[];
}

export function HeaderNav({ items }: HeaderNavProps) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  return (
    <div className="hidden md:flex items-center gap-0.5 ml-6">
      {items.map((item, index) =>
        item.children?.length ? (
          <div
            key={item.href + index}
            className="relative"
            onMouseEnter={() => setOpenDropdown(index)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link
              href={item.href}
              className={cn(
                "nav-link-underline flex items-center gap-1 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-300 font-medium text-sm",
                "hover:text-[#0ea5e9] dark:hover:text-[#38bdf8] transition-all duration-300"
              )}
            >
              {item.label}
              <ChevronDown
                className={cn("w-3.5 h-3.5 opacity-60 transition-transform duration-300", openDropdown === index && "rotate-180")}
                strokeWidth={1.75}
              />
            </Link>
            {openDropdown === index && (
              <div className="absolute top-full left-0 pt-2 w-52">
                <div className="py-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-200/60 dark:border-slate-700/60 animate-scale-in origin-top">
                  <div className="absolute top-2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#0ea5e9]/40 to-transparent" />
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2.5 mx-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-[#0ea5e9] dark:hover:text-[#38bdf8] hover:bg-[#0ea5e9]/5 dark:hover:bg-[#38bdf8]/10 text-sm font-medium transition-all duration-200"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            key={item.href + index}
            href={item.href}
            className={cn(
              "nav-link-underline flex items-center gap-1 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-300 font-medium text-sm whitespace-nowrap",
              "hover:text-[#0ea5e9] dark:hover:text-[#38bdf8] transition-all duration-300"
            )}
          >
            {item.label}
          </Link>
        )
      )}
    </div>
  );
}
