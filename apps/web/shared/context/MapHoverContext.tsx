"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface MapHoverContextValue {
  isHovered: boolean;
  setHovered: (hovered: boolean) => void;
}

const MapHoverContext = createContext<MapHoverContextValue | null>(null);

export function MapHoverProvider({ children }: { children: ReactNode }) {
  const [isHovered, setHovered] = useState(false);
  return (
    <MapHoverContext.Provider value={{ isHovered, setHovered }}>
      {children}
    </MapHoverContext.Provider>
  );
}

export function useMapHover() {
  const ctx = useContext(MapHoverContext);
  if (!ctx) return { isHovered: false, setHovered: () => {} };
  return ctx;
}
