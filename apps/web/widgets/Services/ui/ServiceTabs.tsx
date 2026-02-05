"use client";

import { cn } from "@/shared/lib/cn";
import { SERVICE_TABS } from "@/shared/config";
import { ServiceTab } from "@/shared/constants";

interface ServiceTabsProps {
  activeTab: ServiceTab;
  onTabChange: (tab: ServiceTab) => void;
}

export function ServiceTabs({ activeTab, onTabChange }: ServiceTabsProps) {
  return (
    <div className="mb-10 flex flex-wrap gap-3 justify-center">
      {SERVICE_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200",
            activeTab === tab.id
              ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
              : "bg-white text-slate-700 border-2 border-slate-300 hover:border-[#0ea5e9]/50 hover:bg-slate-50"
          )}
        >
          <span className="icon-badge w-8 h-8 flex items-center justify-center">
            <tab.Icon className="w-4 h-4" strokeWidth={1.75} />
          </span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
