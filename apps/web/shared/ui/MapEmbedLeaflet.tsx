"use client";

import { useEffect, useRef, useState } from "react";
import type { Map, Marker } from "leaflet";
import { MAP } from "@/shared/config/design-tokens";
import { useTranslation } from "@/shared/i18n";

declare global {
  interface Window {
    L: typeof import("leaflet");
  }
}

const ORANGE_MARKER_SVG = (w: number, h: number, animated: boolean) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 24 36" fill="${animated ? '#ea580c' : '#f97316'}" style="filter: drop-shadow(0 4px 12px rgba(249, 115, 22, ${animated ? '0.8' : '0.4'}));">
  <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12zm0 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
  ${animated ? '<circle cx="12" cy="12" r="3" fill="white"/>' : ''}
</svg>`;

interface MapEmbedLeafletProps {
  isHovered?: boolean;
}

export function MapEmbedLeaflet({ isHovered = false }: MapEmbedLeafletProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      window.L = L;
      // @ts-expect-error CSS import for leaflet styles
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
        html: ORANGE_MARKER_SVG(MARKER_WIDTH, MARKER_HEIGHT, false),
        className: "map-marker-orange",
        iconSize: [MARKER_WIDTH, MARKER_HEIGHT],
        iconAnchor: [MARKER_ANCHOR_X, MARKER_ANCHOR_Y],
      });

      markerRef.current = L.marker([LAT, LNG], { icon: orangeIcon })
        .addTo(mapRef.current)
        .bindPopup(MAP.ADDRESS);
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [mounted]);

  useEffect(() => {
    if (!mapRef.current) return;
    const { LAT, LNG, ZOOM_HOVER, ZOOM, MARKER_WIDTH, MARKER_HEIGHT, MARKER_ANCHOR_X, MARKER_ANCHOR_Y } = MAP;
    
    const L = window.L;
    if (!L || !markerRef.current) return;

    if (isHovered) {
      mapRef.current.setView([LAT, LNG], ZOOM_HOVER, { animate: true, duration: MAP.ZOOM_ANIMATION_DURATION });
      const animatedIcon = L.divIcon({
        html: ORANGE_MARKER_SVG(MARKER_WIDTH * 1.3, MARKER_HEIGHT * 1.3, true),
        className: "map-marker-orange map-marker-bounce",
        iconSize: [MARKER_WIDTH * 1.3, MARKER_HEIGHT * 1.3],
        iconAnchor: [MARKER_ANCHOR_X * 1.3, MARKER_ANCHOR_Y * 1.3],
      });
      markerRef.current.setIcon(animatedIcon);
      markerRef.current.openPopup();
    } else {
      mapRef.current.setView([LAT, LNG], ZOOM, { animate: true, duration: MAP.ZOOM_ANIMATION_DURATION });
      const normalIcon = L.divIcon({
        html: ORANGE_MARKER_SVG(MARKER_WIDTH, MARKER_HEIGHT, false),
        className: "map-marker-orange",
        iconSize: [MARKER_WIDTH, MARKER_HEIGHT],
        iconAnchor: [MARKER_ANCHOR_X, MARKER_ANCHOR_Y],
      });
      markerRef.current.setIcon(normalIcon);
      markerRef.current.closePopup();
    }
  }, [isHovered]);

  return (
    <div
      className={`map-embed-wrapper rounded-2xl overflow-hidden shadow-xl relative transition-all duration-500 ${isHovered ? "ring-2 ring-orange-500 ring-offset-2 ring-offset-slate-900 shadow-orange-500/20" : "border border-white/10"}`}
      style={{ aspectRatio: MAP.ASPECT_RATIO, minHeight: MAP.MIN_HEIGHT_PX }}
    >
      <style jsx global>{`
        .map-marker-bounce {
          animation: marker-bounce 0.6s ease-out infinite;
        }
        @keyframes marker-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .map-marker-orange {
          transition: all 0.3s ease-out;
        }
      `}</style>
      {isHovered && (
        <div className="absolute top-3 left-3 z-[1000] bg-orange-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg animate-pulse">
          {t.misc.weAreHere}
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full h-full bg-slate-800"
        style={{ minHeight: MAP.MIN_HEIGHT_PX }}
      />
    </div>
  );
}
