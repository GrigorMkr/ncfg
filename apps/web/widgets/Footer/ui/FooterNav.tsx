import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { NavItem } from "@/shared/config";

interface FooterNavProps {
  items: NavItem[];
}

export function FooterNav({ items }: FooterNavProps) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className="group flex items-center gap-2 text-white/70 hover:text-[#38bdf8] transition-all duration-300 text-sm py-1.5"
          >
            <span className="group-hover:translate-x-0.5 transition-transform duration-300">{item.label}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -ml-1 group-hover:opacity-100 transition-all duration-300" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
