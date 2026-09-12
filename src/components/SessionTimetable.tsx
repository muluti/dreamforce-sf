import React, { useState, useMemo } from "react";
import { 
  DF_EVENTS, 
  DF_RECOMMENDATIONS, 
  DF_HOURLY_TIMES, 
  DF_DAY_INFOS, 
  DF_SESSION_CATALOG_URL,
  SessionItem, 
  timeToMinutes, 
  checkSessionsOverlap 
} from "../data/dreamforceSessions";
import { TimelineEvent } from "../types";
import { 
  ExternalLink, 
  Plus, 
  Check, 
  Search, 
  AlertTriangle, 
  Sparkles, 
  Clock, 
  MapPin, 
  Tag,
  Flame,
  Info
} from "lucide-react";

interface SessionTimetableProps {
  timelineEvents: TimelineEvent[];
  onAddEventToTimeline: (event: TimelineEvent) => void;
}

export const SessionTimetable: React.FC<SessionTimetableProps> = ({
  timelineEvents,
  onAddEventToTimeline
}) => {
  const [currentDay, setCurrentDay] = useState<string>("all");
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Check which sessions are already in user's personal timeline
  const addedSessionTitles = useMemo(() => {
    return new Set(
      (timelineEvents || []).map((e) => e.title.trim().toLowerCase())
    );
  }, [timelineEvents]);

  const isSessionAdded = (title: string) => {
    const norm = title.trim().toLowerCase();
    return addedSessionTitles.has(norm) || Array.from(addedSessionTitles).some((t) => t.includes(norm) || norm.includes(t));
  };

  const handleAddToTimeline = (session: SessionItem) => {
    const newEvent: TimelineEvent = {
      id: `session-${session.id}-${Date.now()}`,
      date: session.d,
      time: `${session.s} - ${session.e}`,
      title: session.title,
      category: session.type === "personal" ? "party" : session.type === "korea" ? "meeting" : "session",
      location: session.place,
      description: session.desc,
      proTip: session.why ? `★ [추천 이유] ${session.why}` : undefined,
      isImportant: session.type === "personal" || session.type === "korea" || !!session.topRank,
      completed: false,
      media: []
    };
    onAddEventToTimeline(newEvent);
  };

  // Filtered events
  const q = searchQuery.toLowerCase().trim();
  const visibleDays = Object.keys(DF_DAY_INFOS).filter(
    (d) => currentDay === "all" || d === currentDay
  );

  return (
    <div className="space-y-4 w-full">
      {/* 1. 세션 헤더 배너 */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-[#071f67] via-[#0b5cff] to-[#7c3aed] text-white shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-black uppercase tracking-wider text-blue-100">
            Official Catalog Based
          </span>
          <span className="text-white/70 text-xs font-semibold">JS Timetable</span>
        </div>

        <div>
          <h2 className="text-[21px] sm:text-[23px] font-black tracking-tight leading-snug">
            Dreamforce 2026 — JS Timetable
          </h2>
          <p className="text-[12.5px] text-blue-100/90 font-medium mt-1">
            2026.09.14–09.17 · San Francisco · 한국 파트너 관점으로 재구성
          </p>
        </div>

        {/* 3대 핵심 요약 배지 */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-xs px-3 py-1.5 rounded-xl text-[11.5px] font-bold text-white border border-white/10">
            <span>📋</span>
            <span>공식 카탈로그: 1,421 sessions</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-xs px-3 py-1.5 rounded-xl text-[11.5px] font-bold text-white border border-white/10">
            <span>🎯</span>
            <span>내 일정: 한국 프로그램 + Ohana + Dreamfest</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-xs px-3 py-1.5 rounded-xl text-[11.5px] font-bold text-white border border-white/10">
            <span>💡</span>
            <span>추천: Agentforce · Data 360 · MuleSoft · Claude Code</span>
          </span>
        </div>
      </div>

      {/* 2. 보는 법 안내 & 범례 */}
      <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 space-y-2">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-[var(--color-blue)] shrink-0 mt-0.5" />
          <p className="text-[12.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            <strong className="text-[var(--color-blue)]">보는 법</strong> — 주황색은 개인 필수 일정, 초록색은 한국 프로그램, 보라색은 공식 카탈로그에서 선별한 추천 세션입니다. 이동·동선 및 충돌 여부를 한눈에 확인할 수 있습니다.
          </p>
        </div>

        {/* 범례 */}
        <div className="flex items-center gap-3 pt-1 text-[11.5px] font-bold text-slate-600 dark:text-slate-300 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-200 dark:ring-amber-900" />
            <span>내 일정 (개인 필수)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-900" />
            <span>한국 프로그램</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 ring-2 ring-purple-200 dark:ring-purple-900" />
            <span>추천 세션</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-rose-200 dark:ring-rose-900" />
            <span className="text-rose-600 dark:text-rose-400">동시간 충돌 감지</span>
          </div>
        </div>
      </div>

      {/* 3. 상단 툴바 (일자 선택 + 카테고리 필터 + 검색창) */}
      <div className="space-y-2.5 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        {/* 일자 탭 */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { id: "all", label: "전체" },
            { id: "2026-09-14", label: "9/14 월" },
            { id: "2026-09-15", label: "9/15 화" },
            { id: "2026-09-16", label: "9/16 수" },
            { id: "2026-09-17", label: "9/17 목" }
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setCurrentDay(d.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                currentDay === d.id
                  ? "bg-[var(--color-blue)] text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* 카테고리 필터 & 검색창 */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { id: "all", label: "전체" },
              { id: "personal", label: "🟠 내 일정" },
              { id: "korea", label: "🟢 한국 프로그램" },
              { id: "reco", label: "🟣 추천 세션" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setCurrentFilter(f.id)}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
                  currentFilter === f.id
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="세션명 / 장소 / 키워드 검색…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[var(--color-blue)]"
            />
          </div>
        </div>
      </div>

      {/* 4. 시간대별 비주얼 타임라인 (08:00 ~ 21:00) */}
      <div className="space-y-4">
        {visibleDays.map((d) => {
          const dayEvents = DF_EVENTS.filter((x) => {
            const okDay = x.d === d;
            const okFilter = currentFilter === "all" || x.type === currentFilter;
            const hay = (x.title + " " + x.place + " " + x.tags.join(" ") + " " + x.desc).toLowerCase();
            return okDay && okFilter && (!q || hay.includes(q));
          });

          if (!dayEvents.length && q) return null;

          const dayInfo = DF_DAY_INFOS[d] || [d, ""];

          return (
            <div key={d} className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
              {/* Day Header */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-850 border-b border-slate-200/80 dark:border-slate-800">
                <div>
                  <h3 className="text-[15px] font-black text-slate-900 dark:text-white leading-tight">
                    {dayInfo[0]}
                  </h3>
                  <p className="text-[11.5px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                    {dayInfo[1]}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[var(--color-blue)] font-black text-[11px] border border-blue-200/60">
                  {dayEvents.length}개 세션
                </span>
              </div>

              {/* Hourly Timeline Grid */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {DF_HOURLY_TIMES.map((hour) => {
                  const hourMins = timeToMinutes(hour);
                  const itemsInHour = dayEvents.filter((x) => {
                    const start = timeToMinutes(x.s);
                    return start >= hourMins && start < hourMins + 60;
                  });

                  return (
                    <div key={hour} className="grid grid-cols-[64px_1fr] sm:grid-cols-[76px_1fr] min-h-[58px]">
                      {/* 시간 라벨 */}
                      <div className="py-2.5 px-2 bg-slate-50/60 dark:bg-slate-850/40 text-right pr-3 border-r border-slate-100 dark:border-slate-800">
                        <span className="text-[12px] font-black text-slate-500 dark:text-slate-400 font-mono">
                          {hour}
                        </span>
                      </div>

                      {/* 세션 슬롯 */}
                      <div className="p-2 space-y-2">
                        {itemsInHour.length === 0 ? (
                          <div className="text-[11.5px] text-slate-300 dark:text-slate-650 font-medium py-1 pl-1">
                            —
                          </div>
                        ) : (
                          itemsInHour.map((item) => {
                            const isConflict = dayEvents.some((other) => checkSessionsOverlap(item, other));
                            const added = isSessionAdded(item.title);

                            const typeBg =
                              item.type === "personal"
                                ? "bg-amber-50/90 dark:bg-amber-950/30 border-l-4 border-l-amber-500 border-amber-200 dark:border-amber-900/60"
                                : item.type === "korea"
                                ? "bg-emerald-50/90 dark:bg-emerald-950/30 border-l-4 border-l-emerald-500 border-emerald-200 dark:border-emerald-900/60"
                                : "bg-purple-50/90 dark:bg-purple-950/30 border-l-4 border-l-purple-600 border-purple-200 dark:border-purple-900/60";

                            const typeBadge =
                              item.type === "personal"
                                ? "bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200"
                                : item.type === "korea"
                                ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200"
                                : "bg-purple-100 text-purple-900 dark:bg-purple-900/60 dark:text-purple-200";

                            return (
                              <div
                                key={item.id}
                                className={`rounded-2xl p-3 border space-y-2 transition-all ${typeBg} ${
                                  isConflict ? "ring-2 ring-rose-500" : ""
                                }`}
                              >
                                {/* 상단 메타 바 */}
                                <div className="flex items-center justify-between gap-1 flex-wrap">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-[11px] font-black text-slate-800 dark:text-slate-100 shadow-2xs">
                                      {item.s}–{item.e}
                                    </span>

                                    <span className={`px-2 py-0.5 rounded-md text-[10.5px] font-black ${typeBadge}`}>
                                      {item.type === "personal" ? "MY" : item.type === "korea" ? "KR" : "RECO"}
                                    </span>

                                    {item.tags.map((t) => (
                                      <span
                                        key={t}
                                        className="px-1.5 py-0.5 rounded bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 text-[10px] font-semibold"
                                      >
                                        #{t}
                                      </span>
                                    ))}

                                    {isConflict && (
                                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-black text-[9.5px]">
                                        <AlertTriangle className="w-2.5 h-2.5" />
                                        <span>충돌 감지</span>
                                      </span>
                                    )}
                                  </div>

                                  {/* 내 일정 추가 버튼 */}
                                  <button
                                    onClick={() => handleAddToTimeline(item)}
                                    disabled={added}
                                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                      added
                                        ? "bg-emerald-600 text-white shadow-2xs"
                                        : "bg-white dark:bg-slate-800 text-[var(--color-blue)] hover:bg-blue-50 border border-blue-200 dark:border-blue-900 shadow-2xs active:scale-95"
                                    }`}
                                  >
                                    {added ? (
                                      <>
                                        <Check className="w-3 h-3" />
                                        <span>일정에 반영됨</span>
                                      </>
                                    ) : (
                                      <>
                                        <Plus className="w-3 h-3" />
                                        <span>내 일정에 추가</span>
                                      </>
                                    )}
                                  </button>
                                </div>

                                {/* 세션 제목 */}
                                <h4 className="text-[14px] font-black text-slate-900 dark:text-white leading-snug">
                                  {item.title}
                                </h4>

                                {/* 장소 */}
                                <div className="text-[12px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span>{item.place}</span>
                                </div>

                                {/* 상세 설명 */}
                                <p className="text-[12.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                                  {item.desc}
                                </p>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. 추천 세션 — 우선순위 (TOP 8 카드 그리드) */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[16px] font-black text-slate-900 dark:text-white tracking-tight">
                추천 세션 — 우선순위 (TOP 8)
              </h3>
              <p className="text-[11.5px] text-slate-500 dark:text-slate-400 font-medium">
                한국 파트너 및 AI 엔터프라이즈 관점 핵심 선별
              </p>
            </div>
          </div>
          <a
            href={DF_SESSION_CATALOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11.5px] font-bold text-[var(--color-blue)] flex items-center gap-1 hover:underline"
          >
            <span>전체 1,421개 카탈로그</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DF_RECOMMENDATIONS.map((reco) => {
            const added = isSessionAdded(reco.title);

            return (
              <div
                key={reco.rank}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-black text-[11px]">
                      TOP {reco.rank}
                    </span>
                    <span className="text-[11.5px] font-bold text-slate-500 dark:text-slate-400">
                      {reco.timeText}
                    </span>
                  </div>

                  <h4 className="text-[14.5px] font-black text-slate-900 dark:text-white leading-snug">
                    {reco.title}
                  </h4>

                  <p className="text-[11.5px] font-bold text-purple-600 dark:text-purple-400">
                    {reco.tags}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 text-[12px] text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    <span className="font-bold text-[var(--color-blue)] mr-1">💡 추천 이유:</span>
                    <span>{reco.why}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={reco.catalogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11.5px] font-bold text-[var(--color-blue)] flex items-center gap-1 hover:underline"
                  >
                    <span>공식 카탈로그에서 확인</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {/* 세션 추가 */}
                  {(() => {
                    const matchItem = DF_EVENTS.find((e) => e.title === reco.title);
                    if (!matchItem) return null;
                    return (
                      <button
                        onClick={() => handleAddToTimeline(matchItem)}
                        disabled={added}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          added
                            ? "bg-emerald-600 text-white shadow-2xs"
                            : "bg-[var(--color-blue)] text-white hover:bg-blue-600 shadow-2xs active:scale-95"
                        }`}
                      >
                        {added ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>일정에 반영됨</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>내 일정에 추가</span>
                          </>
                        )}
                      </button>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 푸터 안내문 */}
      <footer className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed space-y-1">
        <p>
          <strong>기준 자료:</strong> Salesforce Dreamforce 2026 공식 Session Catalog 및 한국 파트너 프로그램(Korea Partner Enablement) 자료.
        </p>
        <p>
          세션 시간·장소는 공식 카탈로그 기준이며, 현장 상황에 따라 변경될 수 있습니다.
        </p>
        <a
          href={DF_SESSION_CATALOG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[var(--color-blue)] font-bold hover:underline mt-1"
        >
          <span>공식 Dreamforce 2026 Session Catalog 바로가기</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </footer>
    </div>
  );
};
