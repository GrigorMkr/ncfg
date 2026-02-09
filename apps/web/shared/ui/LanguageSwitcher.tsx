"use client";

import { useTranslation } from "@/shared/i18n";
import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, toggleLocale, t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-500 text-xs font-semibold"
        aria-label="Switch language"
      >
        <Globe size={15} strokeWidth={1.75} />
        <span>RU</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold
        text-slate-600 dark:text-slate-300
        hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10
        dark:hover:text-[#38bdf8] dark:hover:bg-[#38bdf8]/10
        transition-all duration-200 uppercase tracking-wide"
      aria-label={t.misc.switchLang}
    >
      <Globe size={15} strokeWidth={1.75} />
      <span>{locale === "ru" ? "EN" : "RU"}</span>
    </button>
  );
}
