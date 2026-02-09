"use client";

import { useMemo } from "react";
import { Section } from "@/shared/ui/Section";
import { STATS } from "@/shared/content";
import { StatCard } from "./ui";
import { useTranslation } from "@/shared/i18n";

export function Stats() {
  const { t } = useTranslation();

  const translatedStats = useMemo(() =>
    STATS.map((stat) => {
      const dataKey = stat.id as keyof typeof t.statsData;
      const data = t.statsData[dataKey];
      if (data) {
        return {
          ...stat,
          label: data.label,
          value: data.value,
        };
      }
      return stat;
    }),
    [t]
  );

  return (
    <Section id="about" className="py-12 md:py-14" background="gray">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {translatedStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </Section>
  );
}
