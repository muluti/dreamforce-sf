import React from "react";
import { LayoutDashboard, CalendarDays, StickyNote, Briefcase, Compass, MoonStar } from "lucide-react";

export type TabType = "dashboard" | "schedule" | "memos" | "hub" | "places" | "wellness";

interface NavbarProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: "dashboard", label: "홈", icon: LayoutDashboard },
    { id: "schedule", label: "일정", icon: CalendarDays },
    { id: "memos", label: "메모", icon: StickyNote },
    { id: "hub", label: "허브", icon: Briefcase },
    { id: "places", label: "명소", icon: Compass },
    { id: "wellness", label: "웰니스", icon: MoonStar }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-surface)]/95 backdrop-blur-xl border-t border-[var(--color-border)] px-1.5 sm:px-3 pt-1.5 pb-[max(6px,env(safe-area-inset-bottom,6px))] shadow-deep">
      <div className="max-w-md mx-auto flex items-center justify-between gap-0.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id as TabType)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-150 cursor-pointer active:scale-90 relative ${
                isActive ? "text-[var(--color-blue)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)]"
              }`}
            >
              <div
                className={`p-1 sm:p-1.5 rounded-xl transition-all duration-150 ${
                  isActive
                    ? "bg-[var(--color-blue-soft)] text-[var(--color-blue)] shadow-2xs scale-105"
                    : "bg-transparent"
                }`}
              >
                <Icon className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
              </div>
              <span
                className={`text-[9.5px] sm:text-[10.5px] mt-0.5 tracking-tight transition-all whitespace-nowrap leading-none ${
                  isActive ? "text-[var(--color-blue)] font-extrabold" : "text-[var(--color-text-secondary)] font-semibold"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

