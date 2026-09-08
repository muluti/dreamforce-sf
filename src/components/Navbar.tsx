import React from "react";
import { LayoutDashboard, CalendarDays, StickyNote, Compass, Briefcase } from "lucide-react";

export type TabType = "dashboard" | "schedule" | "memos" | "places" | "hub";

interface NavbarProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: "dashboard", label: "홈", icon: LayoutDashboard },
    { id: "schedule", label: "일정", icon: CalendarDays },
    { id: "memos", label: "메모", icon: StickyNote },
    { id: "places", label: "명소", icon: Compass },
    { id: "hub", label: "허브", icon: Briefcase }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-surface)]/95 backdrop-blur-xl border-t border-[var(--color-border)] px-2 pt-2 pb-[max(8px,env(safe-area-inset-bottom,8px))] shadow-deep">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id as TabType)}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-150 cursor-pointer active:scale-95 relative ${
                isActive ? "text-[var(--color-blue)] font-black" : "text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)] font-semibold"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all duration-150 ${
                  isActive
                    ? "bg-[var(--color-blue-soft)] text-[var(--color-blue)] shadow-2xs scale-105"
                    : "bg-transparent"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
              </div>
              <span className="text-[12px] mt-1 tracking-tight whitespace-nowrap leading-none">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};


