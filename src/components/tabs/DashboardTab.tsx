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
    <div className="space-y-4 w-full">
      {/* 1. 초보자 안심 4대 핵심 도구 (2x2 시원한 터치 카드) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[15px] font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>초보자 안심 4대 편의 도구</span>
          </h2>
          <span className="text-[12px] text-slate-400 font-semibold">원터치 팝업</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* 1. 영어 SOS */}
          <button
            onClick={onOpenEnglishSos}
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 active:scale-[0.98] transition-all cursor-pointer shadow-xs text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-black text-slate-900 dark:text-white leading-tight">영어 SOS</p>
              <p className="text-[12px] text-amber-600 dark:text-amber-400 font-bold mt-0.5">화면 보여주기</p>
            </div>
          </button>

          {/* 2. 팁 & 환율 */}
          <button
            onClick={onOpenCalculator}
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 active:scale-[0.98] transition-all cursor-pointer shadow-xs text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-black text-slate-900 dark:text-white leading-tight">팁 & 환율</p>
              <p className="text-[12px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">간편 계산기</p>
            </div>
          </button>

          {/* 3. 입국 가이드 20단계 */}
          <button
            onClick={onOpenFlightGuide}
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 active:scale-[0.98] transition-all cursor-pointer shadow-xs text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-[var(--color-blue)] text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <Plane className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-black text-slate-900 dark:text-white leading-tight">입국 가이드</p>
              <p className="text-[12px] text-[var(--color-blue)] font-bold mt-0.5">20단계 실전</p>
            </div>
          </button>

          {/* 4. 긴급 SOS */}
          <button
            onClick={onOpenEmergencySos}
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-rose-300 dark:hover:border-rose-900/50 active:scale-[0.98] transition-all cursor-pointer shadow-xs text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform animate-pulse">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-black text-slate-900 dark:text-white leading-tight">긴급 SOS</p>
              <p className="text-[12px] text-rose-600 dark:text-rose-400 font-bold mt-0.5">911 · 영사관</p>
            </div>
          </button>
        </div>
      </div>

      {/* 2. 출장 코칭 & 행동 브리핑 카드 */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🧭</span>
            <h3 className="text-[16px] font-black text-slate-900 dark:text-white">
              투어가이드 출장 코칭 나침반
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[12px] font-extrabold border border-slate-200/80 dark:border-slate-700">
            D-8 준비기
          </span>
        </div>
        <p className="text-[14px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          "지금은 출국 전 최종 점검 주간입니다! <strong className="text-slate-900 dark:text-white font-bold underline decoration-[var(--color-blue)] decoration-2">110V 돼지코 어댑터, 필수 상비약, ESTA 승인 번호</strong>를 패킹 탭에서 체크하고, 9/13 비행기 탑승 준비를 미리 눈에 익혀두세요."
        </p>
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => onChangeTab("hub")}
            className="flex-1 min-h-[46px] px-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold text-[13.5px] flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <span>패킹 체크리스트 ({checkedCount}/{totalChecks})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          {onOpenFlightGuide && (
            <button
              onClick={onOpenFlightGuide}
              className="flex-1 min-h-[46px] px-3 rounded-xl bg-[var(--color-blue)] hover:bg-[var(--color-blue-hover)] text-white font-bold text-[13.5px] flex items-center justify-center gap-1.5 active:scale-95 shadow-xs transition-all"
            >
              <span>20단계 가이드</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3. 현장 메모 & 치안 알림 배너 */}
      <div className="grid grid-cols-1 gap-2.5">
        {/* 현장 메모 퀵 카드 */}
        <div 
          onClick={() => onChangeTab("memos")}
          className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center justify-between transition-all duration-200 active:scale-[0.98] shadow-xs hover:border-slate-300 cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-blue)] text-white shadow-2xs group-hover:scale-105 transition-transform">
              <StickyNote className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--color-blue)]">
                  FIELD MEMO & PHOTO
                </span>
                {(data.memos?.length || 0) > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[var(--color-blue)] text-[11px] font-black">
                    {data.memos?.length}건
                  </span>
                )}
              </div>
              <h4 className="text-[15px] font-black text-slate-900 dark:text-white mt-0.5">
                현장 메모 & 사진 보관함
              </h4>
              <p className="text-[12.5px] text-slate-500 dark:text-slate-400 font-medium">
                세션 발표, 부스 데모, 영수증 사진을 남겨보세요
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </div>

        {/* 치안 경보 배너 */}
        <div
          onClick={onOpenTips}
          className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center justify-between transition-all duration-200 active:scale-[0.98] shadow-xs hover:border-slate-300 cursor-pointer group"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500 text-white shadow-xs">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded text-[11px] font-black bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                  치안 경보
                </span>
                <h4 className="text-[14.5px] font-black text-slate-900 dark:text-white truncate">
                  SF 텐더로인(Tenderloin) 도보 금지
                </h4>
              </div>
              <p className="text-[12.5px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                현지 선배들의 실전 꿀팁 {data.proTips.length}개 확인하기
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </div>
      </div>

      {/* 4. 2x2 핵심 출장 메트릭 그리드 */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Box 1: Checklist */}
        <div 
          onClick={() => onChangeTab("hub")}
          className="flex items-center justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 sm:p-4 shadow-xs hover:border-slate-300 cursor-pointer active:scale-95 transition-all group"
        >
          <div>
            <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400">패킹 준비</p>
            <p className="text-[20px] font-black leading-tight tracking-tight text-slate-900 dark:text-white stripe-number mt-1">
              {checkedCount} <span className="text-[13px] text-slate-400 font-normal">/ {totalChecks}</span>
            </p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800/40 group-hover:scale-105 transition-transform shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        {/* Box 2: Registered Schedules */}
        <div 
          onClick={() => onChangeTab("schedule")}
          className="flex items-center justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 sm:p-4 shadow-xs hover:border-slate-300 cursor-pointer active:scale-95 transition-all group"
        >
          <div>
            <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400">등록 일정</p>
            <p className="text-[20px] font-black leading-tight tracking-tight text-[var(--color-blue)] stripe-number mt-1">
              {data.timelineEvents.length}개
            </p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[var(--color-blue)] flex items-center justify-center border border-blue-200/60 dark:border-blue-800/40 group-hover:scale-105 transition-transform shrink-0">
            <Calendar className="h-5 w-5" />
          </div>
        </div>

        {/* Box 3: Expenses (Now routes to Hub) */}
        <div 
          onClick={() => onChangeTab("hub")}
          className="flex items-center justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 sm:p-4 shadow-xs hover:border-slate-300 cursor-pointer active:scale-95 transition-all group"
        >
          <div>
            <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400">경비 정산</p>
            <p className="text-[20px] font-black leading-tight tracking-tight text-slate-900 dark:text-white stripe-number mt-1">
              ${totalUSD.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform shrink-0">
            <CreditCard className="h-5 w-5" />
          </div>
        </div>

        {/* Box 4: SF Places & Shopping */}
        <div 
          onClick={() => onChangeTab("places")}
          className="flex items-center justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 sm:p-4 shadow-xs hover:border-slate-300 cursor-pointer active:scale-95 transition-all group"
        >
          <div>
            <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400">명소 탐방</p>
            <p className="text-[20px] font-black leading-tight tracking-tight text-slate-900 dark:text-white stripe-number mt-1">
              {visitedPlacesCount} <span className="text-[13px] text-slate-400 font-normal">/ {totalPlaces}곳</span>
            </p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform shrink-0">
            <Compass className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* 5. Emergency SOS Card */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-11 w-11 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200/80 dark:border-rose-800/50">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              <p className="text-[11px] font-extrabold uppercase text-rose-600 tracking-wider">
                EMERGENCY
              </p>
            </div>
            <h4 className="text-[14.5px] font-black text-slate-900 dark:text-white truncate mt-0.5">
              911 긴급 / SF 총영사관
            </h4>
          </div>
        </div>

        {/* Quick Call Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:911"
            className="inline-flex items-center gap-1.5 px-3.5 min-h-[42px] rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-[13px] font-black shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span>911</span>
          </a>
          <a
            href="tel:+14159212251"
            className="inline-flex items-center px-3 min-h-[42px] rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-[13px] font-bold border border-slate-200 dark:border-slate-700 shadow-xs transition-all hover:bg-slate-200 active:scale-95 cursor-pointer"
          >
            영사관
          </a>
        </div>
      </div>

      {/* 6. Upcoming Schedules Section */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[16px] font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>다음 출장 일정</span>
            <span className="text-[12px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {upcomingEvents.length}
            </span>
          </h3>
          <button
            onClick={() => onChangeTab("schedule")}
            className="text-[13.5px] font-bold text-[var(--color-blue)] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>전체 타임라인</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-2.5">
          {upcomingEvents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-8 text-center text-sm text-slate-400 font-medium">
              등록된 다음 일정이 없습니다.
            </div>
          ) : (
            upcomingEvents.map((evt) => (
              <article
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="os-virtualized-card w-full overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 transition-all duration-200 active:scale-[0.98] shadow-xs cursor-pointer hover:border-slate-300 group"
              >
                <div className="flex items-start gap-3.5">
                  {/* Indicator Dot */}
                  <span
                    className={`mt-2 w-2.5 h-2.5 rounded-full shrink-0 ${
                      evt.isImportant
                        ? "bg-rose-500 shadow-[0_0_0_3px_rgba(244,63,94,0.2)]"
                        : "bg-[var(--color-blue)] shadow-[0_0_0_3px_rgba(37,99,235,0.2)]"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="shrink-0 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11.5px] font-mono font-bold text-slate-700 dark:text-slate-300">
                        {evt.date.slice(5)} {evt.time}
                      </span>
                      {evt.isImportant && (
                        <span className="shrink-0 rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 text-[11px] font-black text-rose-600 dark:text-rose-400">
                          MUST VISIT
                        </span>
                      )}
                    </div>
                    <p className="text-[15px] font-black leading-snug tracking-tight text-slate-900 dark:text-white group-hover:text-[var(--color-blue)] transition-colors truncate">
                      {evt.title}
                    </p>
                    <p className="mt-1 text-[13px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate font-medium">
                      <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                      <span>{evt.location}</span>
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 mt-2 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

