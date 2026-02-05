"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { useMapHover } from "@/shared/context/MapHoverContext";

interface FooterContactsProps {
  phone: string;
  email: string;
  legalAddress: string;
}

export function FooterContacts({ phone, email, legalAddress }: FooterContactsProps) {
  const { setHovered } = useMapHover();

  return (
    <div className="space-y-3 text-sm">
      <a
        href={`tel:${phone.replace(/\s/g, "")}`}
        className="group flex items-center gap-3 text-white/70 hover:text-[#38bdf8] transition-all duration-300 py-1"
      >
        <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#38bdf8] group-hover:bg-[#38bdf8]/20 group-hover:scale-110 transition-all duration-300">
          <Phone className="w-4 h-4" strokeWidth={1.75} />
        </span>
        <span className="group-hover:translate-x-0.5 transition-transform duration-300">{phone}</span>
      </a>
      <a
        href={`mailto:${email}`}
        className="group flex items-center gap-3 text-white/70 hover:text-[#38bdf8] transition-all duration-300 py-1"
      >
        <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#38bdf8] group-hover:bg-[#38bdf8]/20 group-hover:scale-110 transition-all duration-300">
          <Mail className="w-4 h-4" strokeWidth={1.75} />
        </span>
        <span className="group-hover:translate-x-0.5 transition-transform duration-300">{email}</span>
      </a>
      <div
        className="flex items-start gap-3 text-white/70 py-1 cursor-default"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#38bdf8]">
          <MapPin className="w-4 h-4" strokeWidth={1.75} />
        </span>
        <span className="transition-colors hover:text-white/90">{legalAddress}</span>
      </div>
    </div>
  );
}
