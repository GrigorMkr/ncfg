import { Building2, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ROUTES } from "./routes";
import { ServiceTab } from "@/shared/constants";

export interface ServiceTabConfig {
  id: ServiceTab;
  label: string;
  Icon: LucideIcon;
}

export const SERVICE_TABS: ServiceTabConfig[] = [
  { id: ServiceTab.BUSINESS, label: "Компаниям", Icon: Building2 },
  { id: ServiceTab.INDIVIDUALS, label: "Частным лицам", Icon: User },
];

export const OTHER_SERVICES_HREF: Record<ServiceTab, string> = {
  [ServiceTab.BUSINESS]: ROUTES.COMPANIES,
  [ServiceTab.INDIVIDUALS]: ROUTES.INDIVIDUALS,
};
