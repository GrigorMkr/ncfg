"use client";

import dynamic from "next/dynamic";
import { useMapHover } from "@/shared/context/MapHoverContext";
import { MAP, SECTION } from "@/shared/config/design-tokens";

const MapEmbedLeaflet = dynamic(
  () => import("./MapEmbedLeaflet").then((m) => m.MapEmbedLeaflet),
  {
    ssr: false,
    loading: () => (
      <div
        className="rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-slate-800 animate-pulse flex items-center justify-center"
        style={{ aspectRatio: MAP.ASPECT_RATIO, minHeight: MAP.MIN_HEIGHT_PX }}
      >
        <span className="text-white/40 text-sm">Загрузка карты…</span>
      </div>
    ),
  }
);

export function MapWithAddress() {
  const { isHovered } = useMapHover();

  return (
    <div className={`${SECTION.MAP_MT} animate-fade-in-up`}>
      <h3 className={`font-semibold ${SECTION.MAP_TITLE_MB} text-white/95`}>Как нас найти</h3>
      <MapEmbedLeaflet isHovered={isHovered} />
    </div>
  );
}
