"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTranslation } from "@/shared/i18n";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="p-2.5 rounded-xl text-slate-400 transition-all duration-300"
        aria-label={t.misc.switchTheme}
      >
        <Sun size={20} strokeWidth={1.75} />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300
        hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10
        dark:hover:text-[#38bdf8] dark:hover:bg-[#38bdf8]/10
        transition-all duration-300"
      aria-label={isDark ? t.misc.lightTheme : t.misc.darkTheme}
    >
      <span className="block transition-transform duration-300">
        {isDark ? (
          <Sun size={20} strokeWidth={1.75} />
        ) : (
          <Moon size={20} strokeWidth={1.75} />
        )}
      </span>
    </button>
  );
}
