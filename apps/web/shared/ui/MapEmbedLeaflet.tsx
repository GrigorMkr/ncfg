"use client";

import { useEffect, useRef, useState } from "react";
import type { Map } from "leaflet";
import { MAP } from "@/shared/config/design-tokens";

const ORANGE_MARKER_SVG = (w: number, h: number) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 24 36" fill="#f97316">
  <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12zm0 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
</svg>`;

interface MapEmbedLeafletProps {
  isHovered?: boolean;
}

export function MapEmbedLeaflet({ isHovered = false }: MapEmbedLeafletProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      const { LAT, LNG, ZOOM } = MAP;

      if (mapRef.current) return;

      mapRef.current = L.map(containerRef.current!).setView([LAT, LNG], ZOOM);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);

      const { MARKER_WIDTH, MARKER_HEIGHT, MARKER_ANCHOR_X, MARKER_ANCHOR_Y } = MAP;
      const orangeIcon = L.divIcon({
        html: ORANGE_MARKER_SVG(MARKER_WIDTH, MARKER_HEIGHT),
        className: "map-marker-orange",
        iconSize: [MARKER_WIDTH, MARKER_HEIGHT],
        iconAnchor: [MARKER_ANCHOR_X, MARKER_ANCHOR_Y],
      });

      L.marker([LAT, LNG], { icon: orangeIcon })
        .addTo(mapRef.current)
        .bindPopup(MAP.ADDRESS);
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mounted]);

  useEffect(() => {
    if (!mapRef.current || !isHovered) return;
    const { LAT, LNG, ZOOM, ZOOM_HOVER } = MAP;
    mapRef.current.setView([LAT, LNG], ZOOM_HOVER, { animate: true, duration: MAP.ZOOM_ANIMATION_DURATION });
  }, [isHovered]);

  useEffect(() => {
    if (!mapRef.current || isHovered) return;
    const { LAT, LNG, ZOOM } = MAP;
    mapRef.current.setView([LAT, LNG], ZOOM, { animate: true, duration: MAP.ZOOM_ANIMATION_DURATION });
  }, [isHovered]);

  return (
    <div
      className={`map-embed-wrapper rounded-2xl overflow-hidden border border-white/10 shadow-xl relative ${isHovered ? "map-address-hovered" : ""}`}
      style={{ aspectRatio: MAP.ASPECT_RATIO, minHeight: MAP.MIN_HEIGHT_PX }}
    >
      <div
        ref={containerRef}
        className="w-full h-full bg-slate-800"
        style={{ minHeight: MAP.MIN_HEIGHT_PX }}
      />
    </div>
  );
}
