"use client";

import { useMemo } from "react";
import { Building2, User } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { ServiceTab } from "@/shared/constants";
import { useTranslation } from "@/shared/i18n";

interface ServiceTabsProps {
  activeTab: ServiceTab;
  onTabChange: (tab: ServiceTab) => void;
}

export function ServiceTabs({ activeTab, onTabChange }: ServiceTabsProps) {
  const { t } = useTranslation();

  const tabs = useMemo(() => [
    { id: ServiceTab.BUSINESS, label: t.serviceTabs.business, Icon: Building2 },
    { id: ServiceTab.INDIVIDUALS, label: t.serviceTabs.individuals, Icon: User },
  ], [t]);

  return (
    <div className="mb-10 flex flex-wrap gap-3 justify-center">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200",
            activeTab === tab.id
              ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-lg shadow-slate-900/20 dark:shadow-slate-100/10"
              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-slate-300 dark:border-slate-600 hover:border-[#0ea5e9]/50 dark:hover:border-[#38bdf8]/50 hover:bg-slate-50 dark:hover:bg-slate-700"
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
