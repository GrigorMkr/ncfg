"use client";

import { useState, useCallback } from "react";
import { ServiceTab } from "@/shared/constants";

export function useServicesTab(initialTab: ServiceTab = ServiceTab.BUSINESS) {
  const [activeTab, setActiveTab] = useState<ServiceTab>(initialTab);
  const onTabChange = useCallback((tab: ServiceTab) => setActiveTab(tab), []);
  return { activeTab, onTabChange };
}
