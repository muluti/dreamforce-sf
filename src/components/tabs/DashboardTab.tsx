import { 
  ShieldAlert, 
  Calendar, 
  CheckCircle2, 
  MapPin, 
  ArrowRight, 
  Compass, 
  CreditCard,
  AlertTriangle,
  Phone,
  Clock,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { AppData, TimelineEvent } from "../../types";
import { TabType } from "../Navbar";

interface DashboardTabProps {
  data: AppData;
  onChangeTab: (tab: TabType) => void;
  onOpenTips: () => void;
  onSelectEvent: (event: TimelineEvent) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  data,
  onChangeTab,
  onOpenTips,
  onSelectEvent
}) => {
  const upcomingEvents = data.timelineEvents
    .filter((e) => !e.completed)
    .slice(0, 3);

  const totalChecks = data.checklist.length;
  const checkedCount = data.checklist.filter((c) => c.checked).length;
  const totalUSD = data.expenses.reduce((acc, cur) => acc + cur.amountUSD, 0);
  const totalPlaces = data.places?.length || 0;
  const visitedPlacesCount = data.places?.filter((p) => p.visited).length || 0;

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto">
      {/* 1. Safety Alert Banner (Pixel Perfect Warning Card) */}
      <div
        onClick={onOpenTips}
        className="overflow-hidden rounded-2xl border border-amber-300/80 dark:border-amber-700/60 bg-amber-50/80 dark:bg-amber-950/30 p-3.5 transition-all duration-200 active:scale-[0.98] shadow-xs hover:border-amber-400 dark:hover:border-amber-600 cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs">
            <AlertTriangle className="h-4.5 w-4.5" />
          </div>
          
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="shrink-0 whitespace-nowrap px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                치안 경보
              </span>
              <h4 className="truncate text-[13px] font-bold text-amber-950 dark:text-amber-200">
                SF 텐더로인(Tenderloin) 도보 진입 금지
              </h4>
            </div>
            <p className="truncate text-[11.5px] font-medium text-amber-800/90 dark:text-amber-300/80">
              터치하여 현지 선배들의 실전 꿀팁 {data.proTips.length}개 확인
            </p>
          </div>

          <ChevronRight className="h-4 w-4 shrink-0 text-amber-600/80 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* 2. 2x2 Quick Metric Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Box 1: Checklist */}
        <div 
          onClick={() => onChangeTab("hub")}
          className="flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-xs transition-all hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer active:scale-[0.96] group"
        >
          <div>
            <p className="text-[11px] font-bold text-[var(--color-text-secondary)]">패킹 준비</p>
            <p className="text-[18px] font-extrabold leading-tight tracking-tight text-[var(--color-foreground)] stripe-number mt-1">
              {checkedCount} <span className="text-[12px] text-[var(--color-text-muted)] font-normal">/ {totalChecks}</span>
            </p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800/50 group-hover:scale-105 transition-transform">
            <CheckCircle2 className="h-4.5 w-4.5" />
          </div>
        </div>

        {/* Box 2: Registered Schedules */}
        <div 
          onClick={() => onChangeTab("schedule")}
          className="flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-xs transition-all hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer active:scale-[0.96] group"
        >
          <div>
            <p className="text-[11px] font-bold text-[var(--color-text-secondary)]">등록 일정</p>
            <p className="text-[18px] font-extrabold leading-tight tracking-tight text-[var(--color-blue)] stripe-number mt-1">
              {data.timelineEvents.length}개
            </p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-[var(--color-blue-soft)] text-[var(--color-blue)] flex items-center justify-center border border-[var(--color-blue-border)] group-hover:scale-105 transition-transform">
            <Calendar className="h-4.5 w-4.5" />
          </div>
        </div>

        {/* Box 3: Expenses (Corrected icon from Moon to CreditCard) */}
        <div 
          onClick={() => onChangeTab("wellness")}
          className="flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-xs transition-all hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer active:scale-[0.96] group"
        >
          <div>
            <p className="text-[11px] font-bold text-[var(--color-text-secondary)]">경비 정산</p>
            <p className="text-[18px] font-extrabold leading-tight tracking-tight text-[var(--color-foreground)] stripe-number mt-1">
              ${totalUSD.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 flex items-center justify-center border border-violet-200/60 dark:border-violet-800/50 group-hover:scale-105 transition-transform">
            <CreditCard className="h-4.5 w-4.5" />
          </div>
        </div>

        {/* Box 4: SF Places & Shopping */}
        <div 
          onClick={() => onChangeTab("places")}
          className="flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-xs transition-all hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer active:scale-[0.96] group"
        >
          <div>
            <p className="text-[11px] font-bold text-[var(--color-text-secondary)]">명소 & 쇼핑</p>
            <p className="text-[18px] font-extrabold leading-tight tracking-tight text-sky-600 dark:text-sky-400 stripe-number mt-1">
              {visitedPlacesCount} <span className="text-[12px] text-[var(--color-text-muted)] font-normal">/ {totalPlaces}곳</span>
            </p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-200/60 dark:border-sky-800/50 group-hover:scale-105 transition-transform">
            <Compass className="h-4.5 w-4.5" />
          </div>
        </div>
      </div>

      {/* 3. Emergency SOS Card */}
      <div className="rounded-2xl border border-rose-200/80 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/20 p-3.5 shadow-xs flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-9 w-9 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-200 dark:border-rose-800/50">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
              <p className="text-[10px] font-extrabold uppercase text-rose-600 dark:text-rose-400 tracking-wider">
                EMERGENCY SOS
              </p>
            </div>
            <h4 className="text-[12.5px] font-bold text-[var(--color-foreground)] truncate mt-0.5">
              911 응급 / SF 총영사관
            </h4>
          </div>
        </div>

        {/* Quick Call Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href="tel:911"
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-[11.5px] font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Phone className="w-3 h-3 fill-current" />
            <span>911 통화</span>
          </a>
          <a
            href="tel:+14159212251"
            className="inline-flex items-center px-2.5 py-2 rounded-xl bg-[var(--color-surface)] text-[var(--color-foreground)] text-[11.5px] font-bold border border-[var(--color-border)] shadow-xs transition-all hover:bg-[var(--color-surface-alt)] active:scale-95 cursor-pointer"
          >
            총영사관
          </a>
        </div>
      </div>

      {/* 4. Upcoming Schedules Section */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[14px] font-bold text-[var(--color-foreground)] tracking-tight flex items-center gap-1.5">
            <span>다음 출장 일정</span>
            <span className="text-[11px] font-bold px-1.5 py-0.2 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
              {upcomingEvents.length}
            </span>
          </h3>
          <button
            onClick={() => onChangeTab("schedule")}
            className="text-[12px] font-bold text-[var(--color-blue)] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>전체 타임라인</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {upcomingEvents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-8 text-center text-xs text-[var(--color-text-muted)]">
              등록된 다음 일정이 없습니다.
            </div>
          ) : (
            upcomingEvents.map((evt) => (
              <article
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="os-virtualized-card w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 sm:p-4 transition-all duration-200 active:scale-[0.98] shadow-xs cursor-pointer hover:border-[var(--color-blue-border)] group"
              >
                <div className="flex items-start gap-3">
                  {/* Indicator Dot */}
                  <span
                    className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                      evt.isImportant
                        ? "bg-violet-500 shadow-[0_0_0_3px_rgba(139,92,246,0.25)]"
                        : "bg-[var(--color-blue)] shadow-[0_0_0_2px_rgba(79,70,229,0.2)]"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="shrink-0 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-1.5 py-0.5 text-[10px] font-mono font-bold text-[var(--color-text-secondary)]">
                        {evt.date.slice(5)} {evt.time}
                      </span>
                      {evt.isImportant && (
                        <span className="shrink-0 rounded-md border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/50 px-1.5 py-0.5 text-[10px] font-bold text-violet-700 dark:text-violet-300">
                          MUST VISIT
                        </span>
                      )}
                    </div>
                    <p className="text-[14px] font-bold leading-snug tracking-tight text-[var(--color-foreground)] group-hover:text-[var(--color-blue)] transition-colors truncate">
                      {evt.title}
                    </p>
                    <p className="mt-1 text-[11.5px] text-[var(--color-text-secondary)] flex items-center gap-1 truncate font-medium">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>{evt.location}</span>
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 mt-2 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

