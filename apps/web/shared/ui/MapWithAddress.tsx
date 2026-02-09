"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import { useMapHover } from "@/shared/context/MapHoverContext";
import { MAP, SECTION } from "@/shared/config/design-tokens";
import { useTranslation } from "@/shared/i18n";

const MapEmbedLeaflet = dynamic(
  () => import("./MapEmbedLeaflet").then((m) => m.MapEmbedLeaflet),
  {
    ssr: false,
    loading: () => (
      <div
        className="rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-slate-800 animate-pulse flex items-center justify-center"
        style={{ aspectRatio: MAP.ASPECT_RATIO, minHeight: MAP.MIN_HEIGHT_PX }}
      >
        <span className="text-white text-sm">Loading map…</span>
      </div>
    ),
  }
);

export function MapWithAddress() {
  const { isHovered } = useMapHover();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${SECTION.MAP_MT} animate-fade-in-up`}>
      <button
        type="button"
        className="md:hidden flex items-center justify-between w-full text-white hover:text-white transition-colors py-3 border-b border-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-white">{t.misc.howToFindUs}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <h3 className={`hidden md:block font-semibold ${SECTION.MAP_TITLE_MB} text-white`}>{t.misc.howToFindUs}</h3>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100 md:mt-0'}`}>
        <MapEmbedLeaflet isHovered={isHovered} />
      </div>
    </div>
  );
}
