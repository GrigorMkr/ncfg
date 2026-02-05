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
    <div className="hidden md:flex items-center gap-1 ml-10">
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
                "nav-link-underline flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-600 font-medium text-sm",
                "hover:text-[#0ea5e9] transition-all duration-300"
              )}
            >
              {item.Icon && (
                <span className="icon-badge w-8 h-8 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#0ea5e9]/20">
                  <item.Icon className="w-4 h-4" strokeWidth={1.75} />
                </span>
              )}
              {item.label}
              <ChevronDown
                className={cn("w-4 h-4 opacity-60 transition-transform duration-300", openDropdown === index && "rotate-180")}
                strokeWidth={1.75}
              />
            </Link>
            {openDropdown === index && (
              <div className="absolute top-full left-0 mt-2 py-2 w-52 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 animate-scale-in origin-top">
                <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#0ea5e9]/40 to-transparent" />
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-4 py-2.5 mx-2 rounded-xl text-slate-600 hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/5 text-sm font-medium transition-all duration-200"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            key={item.href + index}
            href={item.href}
            className={cn(
              "nav-link-underline flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-slate-600 font-medium text-sm",
              "hover:text-[#0ea5e9] transition-all duration-300"
            )}
          >
            {item.Icon && (
              <span className="icon-badge w-8 h-8 flex items-center justify-center">
                <item.Icon className="w-4 h-4" strokeWidth={1.75} />
              </span>
            )}
            {item.label}
          </Link>
        )
      )}
    </div>
  );
}
