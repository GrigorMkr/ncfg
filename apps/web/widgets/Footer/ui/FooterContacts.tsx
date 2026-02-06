"use client";

import { useState, useCallback } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useMapHover } from "@/shared/context/MapHoverContext";

interface FooterContactsProps {
  phone: string;
  email: string;
  legalAddress: string;
}

export function FooterContacts({ phone, email, legalAddress }: FooterContactsProps) {
  const { setHovered } = useMapHover();
  const [isActive, setIsActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleAddressClick = useCallback(() => {
    const newState = !isActive;
    setIsActive(newState);
    setHovered(newState);
  }, [isActive, setHovered]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    setHovered(true);
  }, [setHovered]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (!isActive) {
      setHovered(false);
    }
  }, [isActive, setHovered]);

  const isHighlighted = isActive || isHovering;

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
      <button
        type="button"
        className={`flex items-start gap-3 py-2 cursor-pointer text-left w-full transition-all duration-300 rounded-xl ${isHighlighted ? 'text-[#38bdf8] bg-white/5' : 'text-white/70 hover:bg-white/5'}`}
        onClick={handleAddressClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${isHighlighted ? 'bg-orange-500 text-white scale-110 shadow-lg shadow-orange-500/40' : 'bg-white/10 text-[#38bdf8]'}`}>
          <MapPin className="w-4 h-4" strokeWidth={1.75} />
        </span>
        <span className={`transition-all duration-300 pt-2 ${isHighlighted ? 'translate-x-1' : ''}`}>
          {legalAddress}
          {isHighlighted && (
            <span className="block text-xs text-orange-400 mt-1 animate-pulse">
              {isActive ? 'Нажмите еще раз, чтобы скрыть' : 'Смотрите на карте'}
            </span>
          )}
        </span>
      </button>
    </div>
  );
}
