import React, { useState, useEffect } from "react";
import { Clock, CloudFog, Lock, Settings, Sparkles, Moon, Sun, Flame, MapPin, ShieldAlert } from "lucide-react";

interface HeaderProps {
  userName: string;
  exchangeRate: number;
  onLock: () => void;
  onOpenSettings: () => void;
  onOpenTips: () => void;
  onOpenEmergencySos?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  exchangeRate,
  onLock,
  onOpenSettings,
  onOpenTips,
  onOpenEmergencySos
}) => {
  const [sfTime, setSfTime] = useState("");
  const [seoulTime, setSeoulTime] = useState("");
  const [dDayText, setDDayText] = useState("");
  const [dDaySub, setDDaySub] = useState("");
  const [activeStatTab, setActiveStatTab] = useState<"dday" | "sf" | "seoul">("dday");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    setIsDarkMode(isDark);

    const updateTimes = () => {
      const now = new Date();

      // SF Time
      const sfFormatter = new Intl.DateTimeFormat("ko-KR", {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      setSfTime(sfFormatter.format(now));

      // Seoul Time
      const seoulFormatter = new Intl.DateTimeFormat("ko-KR", {
        timeZone: "Asia/Seoul",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      setSeoulTime(seoulFormatter.format(now));

      const targetDate = new Date("2026-09-13T00:00:00+09:00");
      const diffTime = targetDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setDDayText(`D-${diffDays}`);
        setDDaySub("9/13 출국");
      } else if (diffDays === 0) {
        setDDayText("D-DAY");
        setDDaySub("출국 당일 ✈️");
      } else if (diffDays >= -5) {
        setDDayText(`Day ${Math.abs(diffDays) + 1}`);
        setDDaySub("행사 진행 중");
      } else {
        setDDayText("완료");
        setDDaySub("출장 종료");
      }
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("dreampass_theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dreampass_theme", "light");
    }
  };

  const formattedExchangeRate = exchangeRate ? exchangeRate.toLocaleString() : "1,385";

  return (
    <header className="border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl space-y-3">
      {/* Top Utility Bar: Zero Clipping guaranteed */}
      <div className="flex items-center justify-between gap-2 w-full">
        {/* Brand Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shrink-0">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-[11.5px] font-black tracking-wide text-slate-800 dark:text-slate-200 uppercase whitespace-nowrap">
            DF 2026
          </span>
          <span className="text-slate-400 text-xs">•</span>
          <span className="text-[11.5px] font-black text-[var(--color-blue)]">SF</span>
        </div>

        {/* Action Icons: Compact & Perfectly Fitted */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onOpenEmergencySos && (
            <button
              onClick={onOpenEmergencySos}
              className="h-8 px-2.5 rounded-lg flex items-center justify-center gap-1 bg-rose-600 hover:bg-rose-700 text-white font-black text-[11px] shadow-xs active:scale-95 cursor-pointer"
              title="1초 긴급 SOS"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>SOS</span>
            </button>
          )}

          <button
            onClick={onOpenTips}
            className="h-8 w-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-all active:scale-95 cursor-pointer"
            title="실전 꿀팁"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
          </button>

          <button
            onClick={toggleTheme}
            className="h-8 w-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-all active:scale-95 cursor-pointer"
            title="테마 전환"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          <button
            onClick={onOpenSettings}
            className="h-8 w-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-all active:scale-95 cursor-pointer"
            title="설정"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={onLock}
            className="h-8 w-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-700 dark:text-slate-200 hover:text-rose-600 border border-slate-200/80 dark:border-slate-700 transition-all active:scale-95 cursor-pointer"
            title="잠금"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Title Section */}
      <div>
        <h1 className="text-[20px] sm:text-[22px] font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          드림포스 출장 비서
        </h1>
        <p className="text-[12.5px] sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
          샌프란시스코 현지 출장 & 세션 통합 어시스턴트
        </p>
      </div>

      {/* Unified Live Briefing Widget: No Truncation, 100% Readable */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 p-3 flex items-center justify-between gap-3">
        {/* Left: D-Day Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-10 w-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center shrink-0 border border-rose-200/80 dark:border-rose-900/40 shadow-2xs">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">출장 디데이</span>
            </div>
            <p className="text-[17px] font-black leading-tight tracking-tight text-slate-900 dark:text-white stripe-number">
              {dDayText}
            </p>
            <p className="text-[11px] text-rose-600 dark:text-rose-400 font-bold mt-0.5">
              {dDaySub}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700 shrink-0" />

        {/* Right: SF Time & Seoul / FX */}
        <div className="flex-1 min-w-0 pl-1">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1 min-w-0">
              <CloudFog className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">SF 현지시각</span>
            </div>
            <span className="text-[10.5px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.2 rounded shrink-0">
              14°~21°C
            </span>
          </div>
          <p className="text-[17px] font-black leading-tight text-slate-900 dark:text-white stripe-number mt-0.5">
            {sfTime || "--:--"}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
            서울 {seoulTime || "--:--"} · <span className="font-mono font-semibold">1$={formattedExchangeRate}원</span>
          </p>
        </div>
      </div>
    </header>
  );
};
