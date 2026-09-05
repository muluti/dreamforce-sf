import { 
  ShieldAlert, 
  Calendar, 
  CheckCircle2, 
  MapPin, 
  ArrowRight, 
  Compass, 
  CreditCard,
  AlertTriangle,
  Clock,
  Sparkles,
  ChevronRight,
  Plane,
  Phone,
  MessageSquare,
  DollarSign,
  Compass as CompassIcon,
  HelpCircle,
  Receipt,
  StickyNote
} from "lucide-react";
import { AppData, TimelineEvent } from "../../types";
import { TabType } from "../Navbar";

interface DashboardTabProps {
  data: AppData;
  onChangeTab: (tab: TabType) => void;
  onOpenTips: () => void;
  onOpenFlightGuide?: () => void;
  onOpenEnglishSos?: () => void;
  onOpenCalculator?: () => void;
  onOpenEmergencySos?: () => void;
  onSelectEvent: (event: TimelineEvent) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  data,
  onChangeTab,
  onOpenTips,
  onOpenFlightGuide,
  onOpenEnglishSos,
  onOpenCalculator,
  onOpenEmergencySos,
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
      {/* 0. 초보자 안심 4대 서바이벌 퀵 액션 그리드 */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11.5px] font-extrabold text-[var(--color-foreground)] tracking-tight flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>초보자 안심 4대 편의 도구</span>
          </span>
          <span className="text-[10px] text-slate-400 font-medium">원터치 팝업</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {/* 1. 영어 SOS */}
          <button
            onClick={onOpenEnglishSos}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-amber-200/80 dark:border-amber-800/60 bg-amber-50/80 dark:bg-amber-950/30 hover:border-amber-400 active:scale-95 transition-all cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-1 shadow-2xs group-hover:scale-105 transition-transform">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-extrabold text-amber-950 dark:text-amber-200">영어 SOS</span>
            <span className="text-[9.5px] text-amber-700/80 dark:text-amber-400 font-medium">보여주기</span>
          </button>

          {/* 2. 팁 & 환율 */}
          <button
            onClick={onOpenCalculator}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 bg-emerald-50/80 dark:bg-emerald-950/30 hover:border-emerald-400 active:scale-95 transition-all cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-1 shadow-2xs group-hover:scale-105 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-extrabold text-emerald-950 dark:text-emerald-200">팁 & 환율</span>
            <span className="text-[9.5px] text-emerald-700/80 dark:text-emerald-400 font-medium">더치페이</span>
          </button>

          {/* 3. 20단계 가이드 */}
          <button
            onClick={onOpenFlightGuide}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-blue-200/80 dark:border-blue-800/60 bg-blue-50/80 dark:bg-blue-950/30 hover:border-blue-400 active:scale-95 transition-all cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-xl bg-[var(--color-blue)] text-white flex items-center justify-center mb-1 shadow-2xs group-hover:scale-105 transition-transform">
              <Plane className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-extrabold text-blue-950 dark:text-blue-200">입국 가이드</span>
            <span className="text-[9.5px] text-blue-700/80 dark:text-blue-400 font-medium">20단계</span>
          </button>

          {/* 4. 긴급 SOS */}
          <button
            onClick={onOpenEmergencySos}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-rose-200/80 dark:border-rose-800/60 bg-rose-50/80 dark:bg-rose-950/30 hover:border-rose-400 active:scale-95 transition-all cursor-pointer shadow-xs group"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-1 shadow-2xs group-hover:scale-105 transition-transform animate-pulse">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-extrabold text-rose-950 dark:text-rose-200">긴급 SOS</span>
            <span className="text-[9.5px] text-rose-700/80 dark:text-rose-400 font-medium">911·영사관</span>
          </button>
        </div>
      </div>

      {/* 투어가이드 오늘의 행동 나침반 */}
      <div className="rounded-2xl border border-indigo-200/80 dark:border-indigo-800/60 bg-indigo-50/70 dark:bg-indigo-950/30 p-3.5 space-y-2 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">🧭</span>
            <h4 className="text-[13px] font-black text-indigo-950 dark:text-indigo-200">
              투어가이드의 출장 코칭 나침반
            </h4>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-indigo-200/80 text-indigo-900 text-[10px] font-extrabold">
            D-8 준비기
          </span>
        </div>
        <p className="text-[11.5px] text-indigo-900/90 dark:text-indigo-300/90 leading-relaxed font-medium">
          "지금은 출국 전 최종 점검 주간입니다! <strong>110V 돼지코 어댑터, 필수 상비약, ESTA 승인 번호</strong>를 패킹 탭에서 확인하고, 9/13 비행기 탑승 준비를 미리 눈에 익혀두세요."
        </p>
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => onChangeTab("hub")}
            className="flex-1 py-1.5 px-2.5 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 text-indigo-700 dark:text-indigo-300 font-bold text-[11px] flex items-center justify-center gap-1 active:scale-95"
          >
            <span>패킹 체크리스트 ({checkedCount}/{totalChecks})</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          {onOpenFlightGuide && (
            <button
              onClick={onOpenFlightGuide}
              className="flex-1 py-1.5 px-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 active:scale-95 shadow-2xs"
            >
              <span>20단계 가이드</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* 현장 메모 & 사진 퀵 액션 카드 */}
      <div 
        onClick={() => onChangeTab("memos")}
        className="rounded-2xl border border-blue-200/80 dark:border-blue-800/60 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent p-3.5 flex items-center justify-between transition-all duration-200 active:scale-[0.98] shadow-xs hover:border-blue-400 cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-2xs group-hover:scale-105 transition-transform">
            <StickyNote className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                FIELD MEMO & PHOTO
              </span>
              {(data.memos?.length || 0) > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                  {data.memos?.length}건
                </span>
              )}
            </div>
            <h4 className="text-[13px] font-black text-[var(--color-foreground)]">
              현장 메모 & 사진 보관함
            </h4>
            <p className="text-[11px] text-[var(--color-text-secondary)]">
              세션 발표, 부스 데모, 맛집 영수증 사진을 즉시 남겨보세요
            </p>
          </div>
        </div>
        <div className="flex items-center text-blue-600 dark:text-blue-400 pl-2">
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

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

      {/* 20단계 출국/입국 실전 가이드 배너 */}
      {onOpenFlightGuide && (
        <div
          onClick={onOpenFlightGuide}
          className="overflow-hidden rounded-2xl border border-blue-200/90 dark:border-blue-800/80 bg-blue-50/80 dark:bg-blue-950/30 p-3.5 transition-all duration-200 active:scale-[0.98] shadow-xs hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-blue)] text-white shadow-xs">
              <Plane className="h-4.5 w-4.5" />
            </div>
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="shrink-0 whitespace-nowrap px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-blue-200/80 dark:bg-blue-900/60 text-blue-900 dark:text-blue-200">
                  초보자 필독
                </span>
                <h4 className="truncate text-[13px] font-bold text-blue-950 dark:text-blue-200">
                  비행기 탑승 ~ SFO 호텔 체크인 20단계
                </h4>
              </div>
              <p className="truncate text-[11.5px] font-medium text-blue-800/90 dark:text-blue-300/80">
                기내 폰충전 · CBP 3문답 · "San Francisco" 출구 · Uber 탑승 확인
              </p>
            </div>

            <ChevronRight className="h-4 w-4 shrink-0 text-blue-600/80 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      )}

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

