import { Users, Star, UsersRound, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface StatItem {
  value: string;
  label: string;
  Icon: LucideIcon;
}

export const STATS: StatItem[] = [
  { value: "3 502", label: "довольных корпоративных клиента", Icon: Users },
  { value: "9,63", label: "NPS программ", Icon: Star },
  { value: "30,2 млн", label: "участников мероприятий", Icon: UsersRound },
  { value: "84", label: "региона участвуют в проектах", Icon: MapPin },
];
