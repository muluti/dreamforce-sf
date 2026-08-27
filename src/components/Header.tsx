import React, { useState, useEffect } from "react";
import { Clock, CloudFog, Lock, Settings, Sparkles, Moon, Sun, Flame, MapPin } from "lucide-react";

interface HeaderProps {
  userName: string;
  exchangeRate: number;
  onLock: () => void;
  onOpenSettings: () => void;
  onOpenTips: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  exchangeRate,
  onLock,
  onOpenSettings,
  onOpenTips
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
      localStorage.setItem("dreampass_theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
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
      icon: <Flame className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
    },
    {
      key: "sf" as const,
      label: "SF 현지시각",
      value: sfTime || "--:--",
      sub: "14°~21°C",
      icon: <CloudFog className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
    },
    {
      key: "seoul" as const,
      label: "서울 본사",
      value: seoulTime || "--:--",
      sub: `1$ = ${formattedExchangeRate}원`,
      icon: <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
    }
  ];

  return (
    <header className="notion-hero">
      {/* Top Utility Bar: Badge + Action Buttons */}
      <div className="flex items-center justify-between gap-2">
        {/* Brand Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10.5px] font-extrabold tracking-wider text-[var(--color-text-secondary)] uppercase">
            DF 2026
          </span>
          <span className="text-[10px] text-[var(--color-text-muted)]">•</span>
          <span className="text-[10.5px] font-bold text-[var(--color-blue)]">San Francisco</span>
        </div>

        {/* 4 Action Icons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onOpenTips}
            className="h-8 w-8 rounded-xl flex items-center justify-center bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 transition-all active:scale-90 cursor-pointer"
            title="실전 꿀팁"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={toggleTheme}
            className="h-8 w-8 rounded-xl flex items-center justify-center bg-[var(--color-surface-alt)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] border border-[var(--color-border)] transition-all active:scale-90 cursor-pointer"
            title="테마 전환"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenSettings}
            className="h-8 w-8 rounded-xl flex items-center justify-center bg-[var(--color-surface-alt)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] border border-[var(--color-border)] transition-all active:scale-90 cursor-pointer"
            title="설정"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={onLock}
            className="h-8 w-8 rounded-xl flex items-center justify-center bg-[var(--color-surface-alt)] hover:bg-rose-500/10 text-[var(--color-text-secondary)] hover:text-rose-600 border border-[var(--color-border)] transition-all active:scale-90 cursor-pointer"
            title="잠금"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="flex flex-col">
        <h1 className="text-[22px] sm:text-[24px] font-black tracking-tight text-[var(--color-foreground)] leading-snug">
          드림포스 출장 비서
        </h1>
        <p className="text-[12px] text-[var(--color-text-secondary)] font-medium mt-0.5">
          샌프란시스코 현지 출장 & 세션 통합 어시스턴트
        </p>
      </div>

      {/* 3 Stat Tabs: Zero Truncation, Pixel Perfect Spacing */}
      <div className="grid grid-cols-3 gap-2 w-full">
        {statTabs.map((stat) => {
          const isActive = activeStatTab === stat.key;
          return (
            <button
              key={stat.key}
              onClick={() => setActiveStatTab(stat.key)}
              className={`flex flex-col items-start rounded-2xl p-2.5 sm:p-3 transition-all duration-200 active:scale-[0.96] cursor-pointer text-left relative overflow-hidden border ${
                isActive
                  ? "border-[var(--color-blue)] bg-[var(--color-blue-soft)] ring-1 ring-[var(--color-blue)]/30 shadow-xs"
                  : "border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              {/* Top Row: Icon + Label */}
              <div className="flex items-center gap-1.5 w-full">
                <div
                  className={`rounded-lg p-1 transition-colors shrink-0 ${
                    isActive
                      ? "bg-white dark:bg-slate-800 shadow-2xs"
                      : "bg-[var(--color-surface)] dark:bg-slate-800/60"
                  }`}
                >
                  {stat.icon}
                </div>
                <span
                  className={`text-[11px] font-bold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis ${
                    isActive ? "text-[var(--color-blue)]" : "text-[var(--color-text-secondary)]"
                  }`}
                >
                  {stat.label}
                </span>
              </div>

              {/* Value Row */}
              <div className="mt-2 w-full">
                <p className="text-[16px] sm:text-[18px] font-extrabold leading-none tracking-tight text-[var(--color-foreground)] stripe-number tabular-nums">
                  {stat.value}
                </p>
                <p className="text-[10px] text-[var(--color-text-muted)] font-medium mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
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
