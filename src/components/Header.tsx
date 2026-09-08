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
    <header className="border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-4 rounded-3xl space-y-3.5">
      {/* Top Utility Bar: Guaranteed Zero Clipping on all phone widths */}
      <div className="flex items-center justify-between gap-2 w-full">
        {/* Brand Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shrink-0">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-[12px] font-black tracking-wide text-slate-800 dark:text-slate-200 uppercase">
            DF 2026
          </span>
          <span className="text-slate-400 text-xs">•</span>
          <span className="text-[12px] font-black text-[var(--color-blue)]">SF</span>
        </div>

        {/* Action Icons: Perfect 32px standard, zero overflow */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onOpenEmergencySos && (
            <button
              onClick={onOpenEmergencySos}
              className="h-8 px-2.5 rounded-xl flex items-center justify-center gap-1 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-xs active:scale-95 cursor-pointer"
              title="1초 긴급 SOS"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>SOS</span>
            </button>
          )}

          <button
            onClick={onOpenTips}
            className="h-8 w-8 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-all active:scale-95 cursor-pointer"
            title="실전 꿀팁"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
          </button>

          <button
            onClick={toggleTheme}
            className="h-8 w-8 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-all active:scale-95 cursor-pointer"
            title="테마 전환"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          <button
            onClick={onOpenSettings}
            className="h-8 w-8 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-all active:scale-95 cursor-pointer"
            title="설정"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={onLock}
            className="h-8 w-8 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-700 dark:text-slate-200 hover:text-rose-600 border border-slate-200/80 dark:border-slate-700 transition-all active:scale-95 cursor-pointer"
            title="잠금"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Title Section */}
      <div>
        <h1 className="text-[21px] sm:text-[23px] font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          드림포스 출장 비서
        </h1>
        <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
          샌프란시스코 현지 출장 & 세션 통합 어시스턴트
        </p>
      </div>

      {/* Balanced 2-Row Briefing Widget: Absolutely Zero Truncation */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-3.5 space-y-2.5">
        {/* Row 1: D-Day & SF Live Time */}
        <div className="flex items-center justify-between gap-2">
          {/* D-Day badge */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-rose-100 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center shrink-0">
              <Flame className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 block leading-none">출장 카운트다운</span>
              <span className="text-[16px] font-black text-slate-900 dark:text-white stripe-number leading-tight">
                {dDayText} <span className="text-[12px] text-rose-600 dark:text-rose-400 font-bold ml-1">({dDaySub})</span>
              </span>
            </div>
          </div>

          {/* SF Time */}
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5">
              <CloudFog className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[11px] font-bold text-slate-400 leading-none">SF 현지시각</span>
              <span className="text-[10.5px] font-extrabold text-blue-600 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-950/70 px-1.5 py-0.2 rounded">
                14°~21°C
              </span>
            </div>
            <p className="text-[17px] font-black text-slate-900 dark:text-white stripe-number leading-tight mt-0.5">
              {sfTime || "--:--"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-slate-200/80 dark:bg-slate-700/60" />

        {/* Row 2: Seoul Time & Real-time FX Rate */}
        <div className="flex items-center justify-between text-[12px] font-semibold text-slate-600 dark:text-slate-300 px-0.5">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>서울 본사시각:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">{seoulTime || "--:--"}</span>
          </div>
          <div className="flex items-center gap-1 font-mono">
            <span className="text-slate-400 font-sans">환율:</span>
            <span className="font-bold text-slate-900 dark:text-white">1$ = {formattedExchangeRate}원</span>
          </div>
        </div>
      </div>
    </header>
  );
};
