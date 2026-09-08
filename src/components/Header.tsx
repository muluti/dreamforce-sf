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

  const statTabs = [
    {
      key: "dday" as const,
      label: "출장 D-Day",
      value: dDayText,
      sub: dDaySub,
      icon: <Flame className="w-4 h-4 text-rose-500 shrink-0" />
    },
    {
      key: "sf" as const,
      label: "SF 현지",
      value: sfTime || "--:--",
      sub: "14°~21°C",
      icon: <CloudFog className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
    },
    {
      key: "seoul" as const,
      label: "서울 본사",
      value: seoulTime || "--:--",
      sub: `1$ = ${formattedExchangeRate}원`,
      icon: <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400 shrink-0" />
    }
  ];

  return (
    <header className="notion-hero border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-4 rounded-3xl space-y-4">
      {/* Top Utility Bar: Badge + Large Ergonomic Action Buttons */}
      <div className="flex items-center justify-between gap-2 w-full">
        {/* Brand Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shrink-0">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-[12px] font-black tracking-wide text-slate-800 dark:text-slate-200 uppercase whitespace-nowrap">
            DF 2026
          </span>
          <span className="text-slate-400 text-xs">•</span>
          <span className="text-[12px] font-black text-[var(--color-blue)]">SF</span>
        </div>

        {/* 5 Action Icons with Standard 40px Touch Targets */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onOpenEmergencySos && (
            <button
              onClick={onOpenEmergencySos}
              className="h-9.5 px-3 rounded-xl flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-xs active:scale-95 cursor-pointer"
              title="1초 긴급 SOS"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>SOS</span>
            </button>
          )}

          <button
            onClick={onOpenTips}
            className="h-9.5 w-9.5 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-all active:scale-95 cursor-pointer"
            title="실전 꿀팁"
          >
            <Sparkles className="w-4.5 h-4.5 text-amber-500" />
          </button>

          <button
            onClick={toggleTheme}
            className="h-9.5 w-9.5 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-all active:scale-95 cursor-pointer"
            title="테마 전환"
          >
            {isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-600" />}
          </button>

          <button
            onClick={onOpenSettings}
            className="h-9.5 w-9.5 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-all active:scale-95 cursor-pointer"
            title="설정"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={onLock}
            className="h-9.5 w-9.5 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-700 dark:text-slate-200 hover:text-rose-600 border border-slate-200/80 dark:border-slate-700 transition-all active:scale-95 cursor-pointer"
            title="잠금"
          >
            <Lock className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Main Title Section */}
      <div>
        <h1 className="text-[22px] sm:text-[24px] font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          드림포스 출장 비서
        </h1>
        <p className="text-[13px] sm:text-[14px] text-slate-500 dark:text-slate-400 font-semibold mt-1">
          샌프란시스코 현지 출장 & 세션 통합 어시스턴트
        </p>
      </div>

      {/* 3 Stat Cards: Large, Clean, Modern */}
      <div className="grid grid-cols-3 gap-2 w-full">
        {statTabs.map((stat) => {
          const isActive = activeStatTab === stat.key;
          return (
            <button
              key={stat.key}
              onClick={() => setActiveStatTab(stat.key)}
              className={`flex flex-col items-start rounded-2xl p-2.5 sm:p-3 transition-all duration-200 active:scale-95 cursor-pointer text-left relative overflow-hidden border ${
                isActive
                  ? "border-[var(--color-blue)] bg-[var(--color-blue-soft)] ring-1 ring-[var(--color-blue)]/30 shadow-xs"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:border-slate-300"
              }`}
            >
              {/* Top Row: Icon + Label */}
              <div className="flex items-center gap-1.5 w-full min-w-0">
                <div className="rounded-lg p-1 bg-white dark:bg-slate-800 shadow-2xs shrink-0">
                  {stat.icon}
                </div>
                <span className="text-[12px] sm:text-[12.5px] font-black tracking-tight text-slate-800 dark:text-slate-200 truncate">
                  {stat.label}
                </span>
              </div>

              {/* Value Row */}
              <div className="mt-2 w-full min-w-0">
                <p className="text-[17px] sm:text-[19px] font-black leading-none tracking-tight text-slate-900 dark:text-slate-100 stripe-number tabular-nums truncate">
                  {stat.value}
                </p>
                <p className="text-[11px] sm:text-[11.5px] text-slate-500 dark:text-slate-400 font-semibold mt-1 truncate">
                  {stat.sub}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </header>
  );
};
