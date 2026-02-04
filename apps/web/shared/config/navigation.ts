import { User, Building2, Heart, MoreHorizontal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ROUTES } from "./routes";

export interface NavItem {
  label: string;
  href: string;
  Icon?: LucideIcon;
  children?: { label: string; href: string }[];
}

export const HEADER_NAV: NavItem[] = [
  { label: "Частным лицам", href: ROUTES.INDIVIDUALS, Icon: User },
  { label: "Компаниям", href: ROUTES.COMPANIES, Icon: Building2 },
  { label: "Твори добро", href: ROUTES.TVORI_DOBRO, Icon: Heart },
  {
    label: "Еще",
    href: ROUTES.ABOUT,
    Icon: MoreHorizontal,
    children: [
      { label: "О центре", href: ROUTES.ABOUT },
      { label: "Блог", href: ROUTES.BLOG },
    ],
  },
];

export const FOOTER_NAV: NavItem[] = [
  { label: "Частным лицам", href: ROUTES.INDIVIDUALS },
  { label: "Компаниям", href: ROUTES.COMPANIES },
  { label: "Твори добро", href: ROUTES.TVORI_DOBRO },
  { label: "О центре", href: ROUTES.ABOUT },
  { label: "Блог", href: ROUTES.BLOG },
];
