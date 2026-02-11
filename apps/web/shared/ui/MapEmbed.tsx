"use client";

import dynamic from "next/dynamic";

const MapEmbedLeaflet = dynamic(() => import("./MapEmbedLeaflet").then((m) => m.MapEmbedLeaflet), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl aspect-[16/10] min-h-[240px] bg-slate-800 animate-pulse flex items-center justify-center">
      <span className="text-white/40 text-sm">Loading…</span>
    </div>
  ),
});

export function MapEmbed() {
  return <MapEmbedLeaflet />;
}
