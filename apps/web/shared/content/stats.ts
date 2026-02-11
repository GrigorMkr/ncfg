import { Users, Star, UsersRound, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface StatItem {
  id: string;
  value: string;
  displayValue?: string;
  label: string;
  Icon: LucideIcon;
  key?: string;
}

export const STATS: StatItem[] = [
  { id: "corporate_clients", value: "3 502", label: "довольных корпоративных клиента", Icon: Users },
  { id: "nps", value: "9,63", label: "NPS программ", Icon: Star },
  { id: "participants", value: "30,2 млн", label: "участников мероприятий", Icon: UsersRound },
  { id: "regions", value: "84", label: "региона участвуют в проектах", Icon: MapPin },
];
