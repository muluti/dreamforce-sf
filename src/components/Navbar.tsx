import React from "react";
import { LayoutDashboard, CalendarDays, Briefcase, MessageSquareText, MoonStar } from "lucide-react";

export type TabType = "dashboard" | "schedule" | "hub" | "english" | "wellness";

interface NavbarProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: "dashboard", label: "홈", icon: LayoutDashboard },
    { id: "schedule", label: "일정", icon: CalendarDays },
    { id: "hub", label: "허브", icon: Briefcase },
    { id: "english", label: "영어", icon: MessageSquareText },
    { id: "wellness", label: "웰니스", icon: MoonStar }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-surface)]/90 backdrop-blur-xl border-t border-[var(--color-border)] px-3 pt-2 pb-2.5 shadow-deep">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id as TabType)}
              className={`flex-1 flex flex-col items-center justify-center py-0.5 rounded-2xl transition-all duration-200 cursor-pointer active:scale-90 relative ${
                isActive ? "text-[var(--color-blue)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)]"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--color-blue-soft)] text-[var(--color-blue)] shadow-2xs scale-105"
                    : "bg-transparent"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
              </div>
              <span
                className={`text-[10.5px] mt-0.5 tracking-tight transition-all ${
                  isActive ? "text-[var(--color-blue)] font-extrabold" : "text-[var(--color-text-secondary)] font-medium"
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

