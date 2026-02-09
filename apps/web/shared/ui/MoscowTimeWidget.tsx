"use client";

import { useState, useEffect, useCallback } from "react";

interface WeatherData {
  temperature: number | null;
}

function getMoscowTime() {
  const now = new Date();
  const moscowOffset = 3 * 60;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + moscowOffset * 60000);
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(date: Date, locale: string) {
  return date.toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
    day: "numeric",
    month: "short",
  });
}

export function MoscowTimeWidget({ locale = "ru" }: { locale?: string }) {
  const [time, setTime] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData>({ temperature: null });
  const [mounted, setMounted] = useState(false);

  const updateTime = useCallback(() => {
    const moscow = getMoscowTime();
    setTime(formatTime(moscow));
    setDateStr(formatDate(moscow, locale));
  }, [locale]);

  useEffect(() => {
    setMounted(true);
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, [updateTime]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=55.7558&longitude=37.6173&current_weather=true"
        );
        const data = await res.json();
        if (data.current_weather) {
          setWeather({ temperature: Math.round(data.current_weather.temperature) });
        }
      } catch {
        /* ignore */
      }
    }
    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/60 text-[11px] text-slate-400 font-medium tabular-nums">
        <span>--:--</span>
      </div>
    );
  }

  const tempStr = weather.temperature !== null
    ? `${weather.temperature > 0 ? "+" : ""}${weather.temperature}°`
    : null;

  return (
    <div
      className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg
        bg-slate-100/80 dark:bg-slate-800/60
        text-[11px] font-medium tabular-nums select-none
        border border-slate-200/60 dark:border-slate-700/40
        transition-colors duration-200"
    >
      <span className="text-slate-700 dark:text-slate-200 font-semibold">{time}</span>
      <span className="text-slate-300 dark:text-slate-600">&middot;</span>
      <span className="text-slate-500 dark:text-slate-400">{dateStr}</span>
      {tempStr && (
        <>
          <span className="text-slate-300 dark:text-slate-600">&middot;</span>
          <span className="text-[#0ea5e9] dark:text-[#38bdf8] font-semibold">{tempStr}</span>
        </>
      )}
    </div>
  );
}
