import React, { useState } from "react";
import { 
  Calendar, 
  MapPin, 
  Plus, 
  Trash2, 
  Edit3, 
  Film, 
  CheckCircle2, 
  Circle, 
  Star, 
  Sparkles, 
  Compass,
  X,
  Maximize2,
  Coffee,
  Building,
  Music,
  ShieldCheck,
  FileText,
  Clock,
  ExternalLink,
  Users,
  Plane,
  ChevronRight
} from "lucide-react";
import { TimelineEvent, MediaItem } from "../../types";

interface ScheduleTabProps {
  events: TimelineEvent[];
  onAddEvent: (event: TimelineEvent) => void;
  onUpdateEvent: (event: TimelineEvent) => void;
  onDeleteEvent: (id: string) => void;
  onOpenMediaModal: (title: string, mediaList: MediaItem[], onUpdate: (items: MediaItem[]) => void) => void;
  onOpenFlightGuide?: () => void;
}

const DATES = [
  { date: "all", label: "전체", sub: "6일간" },
  { date: "2026-09-13", label: "9/13", sub: "출국" },
  { date: "2026-09-14", label: "9/14", sub: "사전등록/나잇" },
  { date: "2026-09-15", label: "9/15", sub: "오프닝키노트" },
  { date: "2026-09-16", label: "9/16", sub: "오하나/드림페스트" },
  { date: "2026-09-17", label: "9/17", sub: "한국랩업/폐막" },
  { date: "2026-09-18", label: "9/18", sub: "귀국" }
];

// 16개 캠퍼스 핵심 구역 상세 리스트 (제공된 Dreamforce 2026 Map Detail 매핑)
const CAMPUS_ZONES = [
  { id: 2, name: "City View (International Lounge)", tag: "한국 전용 프라이빗 존", desc: "한국(KR)+일본(JP)+대만(TW) 전용 라운지. 무료 바리스타 커피, 음료, 미팅룸", highlight: true },
  { id: 1, name: "AMC / Metreon", tag: "Breakout & F&B", desc: "브레이크아웃 세션장 및 식음료 구역" },
  { id: 3, name: "Howard St. (Dreampark)", tag: "드림파크", desc: "야외 이벤트, 밴드 공연, 잔디 쉼터" },
  { id: 4, name: "InterContinental Hotel", tag: "Invite Only", desc: "초청 라운드테이블 및 브레이크아웃 세션" },
  { id: 5, name: "Marriott Marquis", tag: "Partner & Certs", desc: "파트너 라운지, 무료 자격증 시험(HOTs & Certs), 고객 성공 센터" },
  { id: 6, name: "Moscone North", tag: "Store & Campground", desc: "1층 공식 드림스토어(굿즈샵), LL층 에이전틱 엔터프라이즈 부스" },
  { id: 7, name: "Moscone South", tag: "Main Keynote", desc: "LL층 메인 오프닝 키노트 홀, L2층 Executive Summit" },
  { id: 8, name: "Moscone West", tag: "Registration & Forest", desc: "1층 사전 배지 수령 데스크, 트레일블레이저 포레스트, 개발자 랩" },
  { id: 9, name: "SF MoMA", tag: "Sponsor Events", desc: "샌프란시스코 현대미술관 스폰서 활성화 공간" },
  { id: 10, name: "St. Regis Hotel", tag: "CXO Program", desc: "CXO VIP 최고경영진 프로그램" },
  { id: 11, name: "W San Francisco", tag: "Public / ANZ Lounge", desc: "공공 부문 라운지 및 ANZ 지역 라운지" },
  { id: 12, name: "Yerba Buena Forum", tag: "Mindfulness Meadow", desc: "마인드풀니스 명상 및 힐링 정원" },
  { id: 13, name: "Yerba Buena Gardens", tag: "F&B & Networking", desc: "야외 점심 배부처 및 네트워킹 가든" },
  { id: 14, name: "Blue Shield Theater (YBCA)", tag: "Keynote Sessions", desc: "시어터 키노트 세션장" },
  { id: 15, name: "Contemporary Jewish Museum", tag: "Lounges", desc: "드림포스 스페셜 라운지" },
  { id: 16, name: "Jessie Square", tag: "Plaza", desc: "야외 휴식 광장" }
];

export const ScheduleTab: React.FC<ScheduleTabProps> = ({
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  onOpenMediaModal,
  onOpenFlightGuide
}) => {
  const [selectedDate, setSelectedDate] = useState("all");
  const [showMosconeGuide, setShowMosconeGuide] = useState(false);
  const [guideSubTab, setGuideSubTab] = useState<"map" | "agenda" | "ohana">("map");
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formDate, setFormDate] = useState("2026-09-14");
  const [formTime, setFormTime] = useState("10:00 - 11:30");
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<TimelineEvent["category"]>("session");
  const [formLocation, setFormLocation] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formProTip, setFormProTip] = useState("");
  const [formIsImportant, setFormIsImportant] = useState(false);

  const filteredEvents = events.filter((e) => {
    if (selectedDate === "all") return true;
    return e.date === selectedDate;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormDate(selectedDate === "all" ? "2026-09-14" : selectedDate);
    setFormTime("10:00 - 11:00");
    setFormTitle("");
    setFormCategory("session");
    setFormLocation("Moscone Center");
    setFormDescription("");
    setFormProTip("");
    setFormIsImportant(false);
    setIsEditing(true);
  };

  const handleOpenEdit = (evt: TimelineEvent) => {
    setEditingId(evt.id);
    setFormDate(evt.date);
    setFormTime(evt.time);
    setFormTitle(evt.title);
    setFormCategory(evt.category);
    setFormLocation(evt.location);
    setFormDescription(evt.description);
    setFormProTip(evt.proTip || "");
    setFormIsImportant(!!evt.isImportant);
    setIsEditing(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingId) {
      const existing = events.find((e) => e.id === editingId);
      if (existing) {
        onUpdateEvent({
          ...existing,
          date: formDate,
          time: formTime,
          title: formTitle.trim(),
          category: formCategory,
          location: formLocation.trim(),
          description: formDescription.trim(),
          proTip: formProTip.trim(),
          isImportant: formIsImportant
        });
      }
    } else {
      const newEvent: TimelineEvent = {
        id: `ev-${Date.now()}`,
        date: formDate,
        time: formTime,
        title: formTitle.trim(),
        category: formCategory,
        location: formLocation.trim(),
        description: formDescription.trim(),
        proTip: formProTip.trim(),
        isImportant: formIsImportant,
        completed: false,
        media: []
      };
      onAddEvent(newEvent);
    }
    setIsEditing(false);
  };

  const toggleComplete = (evt: TimelineEvent) => {
    onUpdateEvent({ ...evt, completed: !evt.completed });
  };

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto">
      {/* 3절 헤더 컨트롤 */}
      <div className="flex items-center justify-between px-1">
        <div>
          <p className="notion-kicker">SCHEDULE & CAMPUS</p>
          <h2 className="text-[18px] font-bold text-[var(--color-foreground)] tracking-tight">타임라인 & 캠퍼스</h2>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowMosconeGuide(!showMosconeGuide)}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer ${
              showMosconeGuide
                ? "border-blue-200 bg-blue-50 text-[var(--color-blue)] ring-2 ring-blue-500/10"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
            }`}
            title="모스콘 맵 & 공식 아젠다"
          >
            <Compass className="h-4 w-4" />
            <span className="hidden sm:inline font-bold">캠퍼스 맵/아젠다</span>
          </button>

          {onOpenFlightGuide && (
            <button
              onClick={onOpenFlightGuide}
              className="p-2 rounded-xl border border-blue-200 bg-blue-50/70 dark:bg-blue-950/40 text-[var(--color-blue)] text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer hover:bg-blue-100"
              title="비행기 탑승 ~ SFO 호텔 체크인 20단계 가이드"
            >
              <Plane className="h-4 w-4" />
              <span className="hidden sm:inline font-bold">20단계 입국 가이드</span>
            </button>
          )}

          <button
            onClick={handleOpenAdd}
            className="notion-button-primary py-2 px-3 text-xs flex items-center gap-1 active:scale-[0.97] cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>일정 추가</span>
          </button>
        </div>
      </div>

      {/* 스마트 캠퍼스 & 아젠다 가이드 확장 패널 */}
      {showMosconeGuide && (
        <div className="rounded-2xl border border-blue-200/80 dark:border-blue-800/60 bg-blue-50/70 dark:bg-blue-950/30 p-3.5 space-y-3 shadow-sm text-xs">
          {/* 가이드 상단 탭 (맵 / 아젠다 / 오하나) */}
          <div className="flex items-center justify-between gap-1 pb-1 border-b border-blue-200/60 dark:border-blue-800/40">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setGuideSubTab("map")}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
                  guideSubTab === "map"
                    ? "bg-[var(--color-blue)] text-white shadow-xs"
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300"
                }`}
              >
                🗺️ 캠퍼스 맵 (16개 구역)
              </button>
              <button
                onClick={() => setGuideSubTab("agenda")}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
                  guideSubTab === "agenda"
                    ? "bg-[var(--color-blue)] text-white shadow-xs"
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300"
                }`}
              >
                📅 공식 일정표 (KR)
              </button>
              <button
                onClick={() => setGuideSubTab("ohana")}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
                  guideSubTab === "ohana"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300"
                }`}
              >
                🏢 오하나 투어
              </button>
            </div>

            <button
              onClick={() => setShowMosconeGuide(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* 1. 캠퍼스 맵 탭 */}
          {guideSubTab === "map" && (
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden border border-blue-200/60 group shadow-xs">
                <img
                  src="/df2026_campus_map.png"
                  alt="Dreamforce 2026 Campus Map"
                  className="w-full h-44 object-cover object-center cursor-pointer group-hover:scale-105 transition-transform duration-300"
                  onClick={() => setFullscreenImage("/df2026_campus_map.png")}
                />
                <button
                  onClick={() => setFullscreenImage("/df2026_campus_map.png")}
                  className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 text-white font-bold text-[11px] flex items-center gap-1 backdrop-blur-xs"
                >
                  <Maximize2 className="h-3 w-3" />
                  <span>지도 크게보기</span>
                </button>
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber-500 text-white font-extrabold text-[10px] shadow-xs">
                  ★ 2번 City View 한국 전용 라운지
                </div>
              </div>

              {/* 16개 구역 퀵 가이드 */}
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {CAMPUS_ZONES.map((zone) => (
                  <div
                    key={zone.id}
                    className={`p-2 rounded-xl border transition-all ${
                      zone.highlight
                        ? "bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/60 ring-1 ring-amber-400/30"
                        : "bg-white/90 dark:bg-slate-800/90 border-blue-100 dark:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-100">
                        <span
                          className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] text-white font-extrabold shrink-0 ${
                            zone.highlight ? "bg-amber-500" : "bg-blue-600"
                          }`}
                        >
                          {zone.id}
                        </span>
                        <span className="truncate">{zone.name}</span>
                      </div>
                      <span
                        className={`text-[9.5px] font-extrabold px-1.5 py-0.2 rounded shrink-0 ${
                          zone.highlight
                            ? "bg-amber-200/80 text-amber-900"
                            : "bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300"
                        }`}
                      >
                        {zone.tag}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                      {zone.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. 공식 아젠다 탭 */}
          {guideSubTab === "agenda" && (
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden border border-blue-200/60 group shadow-xs">
                <img
                  src="/df2026_agenda_kr.png"
                  alt="Dreamforce 2026 KR Agenda"
                  className="w-full h-44 object-cover object-top cursor-pointer group-hover:scale-105 transition-transform duration-300"
                  onClick={() => setFullscreenImage("/df2026_agenda_kr.png")}
                />
                <button
                  onClick={() => setFullscreenImage("/df2026_agenda_kr.png")}
                  className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 text-white font-bold text-[11px] flex items-center gap-1 backdrop-blur-xs"
                >
                  <Maximize2 className="h-3 w-3" />
                  <span>일정표 크게보기</span>
                </button>
              </div>

              {/* 한국 특별 프로그램 요약 */}
              <div className="space-y-1.5">
                <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-blue-100 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--color-blue)] flex items-center gap-1">
                      <span>🌉 9/14(월) 18:00 Korea Night</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">BIX SF (차이나타운)</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-600 dark:text-slate-300">
                    공식 한국 참가자 디너 리셉션. 핑거푸드 & 주류 무제한. 우버/택시 이동 권장
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-50/90 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1">
                      <span>🏢 9/16(수) 14:00 오하나 플로어 투어 (Group A)</span>
                    </span>
                    <span className="text-[10px] text-purple-600 font-bold">Salesforce Tower 61F</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-purple-900 dark:text-purple-200">
                    DKBMC 2명 배정! 13:40 타워 1층 플라자 텐트 집결. 실물 여권 + QR코드 필수
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                      <span>🎸 9/16(수) 18:00 Dreamfest 2026</span>
                    </span>
                    <span className="text-[10px] text-amber-700 font-bold">Oracle Park</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-amber-900 dark:text-amber-200">
                    Usher & Gwen Stefani 라이브 콘서트. 백팩 반입 절대 불가 (소형 힙색만 가능)
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-blue-100 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--color-blue)] flex items-center gap-1">
                      <span>👨‍💻 9/17(목) 15:00 Korea Wrap-up Session</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">Tower West 3F</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-600 dark:text-slate-300">
                    한국 SE 분들의 3일간 핵심 키노트 및 Agentforce 전략 한국어 요약 총정리
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. 오하나 플로어 투어 탭 */}
          {guideSubTab === "ohana" && (
            <div className="space-y-2.5 bg-white/95 dark:bg-slate-800/95 p-3 rounded-xl border border-purple-200 dark:border-purple-800/60">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-purple-700 dark:text-purple-300 text-[13px]">
                  Ohana Floor Tour [Group A 확정]
                </span>
                <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold text-[10px]">
                  총 11명 (DKBMC 2명)
                </span>
              </div>

              <div className="space-y-1.5 text-[11.5px] text-slate-700 dark:text-slate-200">
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-purple-600 shrink-0">1.</span>
                  <span><strong>9/16(수) 13:40까지</strong> Salesforce Plaza (타워 1층 야외 광장) 도착</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-purple-600 shrink-0">2.</span>
                  <span><strong>Tent(텐트) 체크인 데스크</strong>에서 QR코드와 <strong>실물 여권</strong> 제시 (스마트폰 사진 불인정!)</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-purple-600 shrink-0">3.</span>
                  <span>체크인 완료 후 <strong>주황색 뱃지 또는 손목밴드</strong> 수령 및 착용</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-purple-600 shrink-0">4.</span>
                  <span>Tent에서 <strong>세일즈포스 코리아 직원(전선아 님, 조영보 상무님)</strong>과 조인</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-purple-600 shrink-0">5.</span>
                  <span>전용 줄을 서서 세일즈포스 코리아 직원 동행 하에 <strong>61층 오하나 플로어</strong>로 입장</span>
                </div>
              </div>

              <div className="p-2 bg-purple-50 dark:bg-purple-950/50 rounded-lg border border-purple-200 dark:border-purple-800 text-[10.5px] text-purple-800 dark:text-purple-200">
                ⚠️ 투어 24~48시간 전 발송되는 <strong>'Guest Pre-registration' 이메일</strong>을 꼭 확인하여 NDA 서명 후 사전 QR코드를 받아두셔야 합니다 (스팸함 확인 필수).
              </div>
            </div>
          )}
        </div>
      )}

      {/* 날짜 필터 탭 (4절 Stat Tab 미니 버전) */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {DATES.map((d) => {
          const isActive = selectedDate === d.date;
          return (
            <button
              key={d.date}
              onClick={() => setSelectedDate(d.date)}
              className={`px-3 py-2 rounded-xl shrink-0 text-center transition-all cursor-pointer border active:scale-95 ${
                isActive
                  ? "border-blue-200 bg-blue-50 text-[var(--color-blue)] ring-2 ring-blue-500/10 font-bold shadow-sm"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)]"
              }`}
            >
              <div className="text-[13px] font-bold leading-tight">{d.label}</div>
              <div className="text-[10px] opacity-75 font-normal">{d.sub}</div>
            </button>
          );
        })}
      </div>

      {/* 6절 리스트 아이템 카드 목록 */}
      <div className="space-y-3">
        {/* 9/13 출국일 전용 20단계 가이드 배너 */}
        {(selectedDate === "2026-09-13" || selectedDate === "all") && onOpenFlightGuide && (
          <div
            onClick={onOpenFlightGuide}
            className="p-3.5 rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50/80 dark:bg-blue-950/30 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all hover:border-blue-300 shadow-xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--color-blue)] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Plane className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-blue-200 text-blue-900 dark:bg-blue-900 dark:text-blue-200">
                    9/13 출국 필수
                  </span>
                  <h4 className="text-[13px] font-bold text-blue-950 dark:text-blue-200">
                    비행기 탑승 ~ SFO 호텔 체크인 20단계
                  </h4>
                </div>
                <p className="text-[11.5px] font-medium text-blue-800/90 dark:text-blue-300">
                  기내 폰충전 · CBP 3문답 · "San Francisco" 출구 · Uber 탑승 확인
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-blue-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </div>
        )}

        {filteredEvents.length === 0 ? (
          <div className="rounded-[16px] border border-dashed border-slate-200 bg-slate-50/50 px-4 py-12 text-center text-sm text-slate-400">
            해당 날짜에 등록된 일정이 없습니다.
          </div>
        ) : (
          filteredEvents.map((evt) => {
            const hasMedia = evt.media && evt.media.length > 0;

            return (
              <article
                key={evt.id}
                className={`os-virtualized-card w-full overflow-hidden rounded-[16px] border transition-all duration-200 shadow-sm p-4 ${
                  evt.completed
                    ? "border-[var(--color-border)] bg-[var(--color-surface-alt)] opacity-60"
                    : evt.isImportant
                    ? "border-[#b9b9f9] bg-[var(--color-surface)] ring-1 ring-[#b9b9f9]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => toggleComplete(evt)}
                      className="text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                    >
                      {evt.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-slate-300" />
                      )}
                    </button>

                    <span className="shrink-0 rounded-[4px] border border-slate-100 bg-slate-50 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-500">
                      {evt.date.slice(5)} {evt.time}
                    </span>

                    {evt.isImportant && (
                      <span className="shrink-0 rounded-[4px] border border-purple-100 bg-purple-50 px-1.5 py-0.5 text-[10px] font-bold text-purple-600">
                        MUST VISIT
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        onOpenMediaModal(
                          evt.title,
                          evt.media || [],
                          (updatedList) => onUpdateEvent({ ...evt, media: updatedList })
                        )
                      }
                      className={`px-2 py-1 rounded-lg text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer font-bold ${
                        hasMedia
                          ? "bg-blue-50 text-[var(--color-blue)] border border-blue-200"
                          : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                      }`}
                    >
                      <Film className="h-3.5 w-3.5" />
                      <span>{hasMedia ? `사진 (${evt.media?.length})` : "+ 사진"}</span>
                    </button>

                    <button
                      onClick={() => handleOpenEdit(evt)}
                      className="p-1 text-slate-400 hover:text-[var(--color-blue)] rounded-lg transition-colors cursor-pointer"
                      title="수정"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteEvent(evt.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                      title="삭제"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <h4
                  className={`text-[15px] font-bold tracking-tight mb-1 text-[var(--color-foreground)] ${
                    evt.completed ? "line-through text-slate-400" : ""
                  }`}
                >
                  {evt.title}
                </h4>

                <p className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1 mb-2 font-medium">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <span>{evt.location}</span>
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                  {evt.description}
                </p>

                {evt.proTip && (
                  <div className="mt-3 rounded-xl border border-amber-200/80 bg-amber-50/50 p-2.5 text-xs text-amber-900 font-medium">
                    <p className="font-bold flex items-center gap-1 text-amber-800 mb-0.5">
                      <Sparkles className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      <span>선배의 실전 팁</span>
                    </p>
                    <p className="text-[11.5px] leading-relaxed whitespace-pre-line text-amber-950/90">{evt.proTip}</p>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>

      {/* 일정 추가/수정 모달 */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[var(--color-foreground)]">
                {editingId ? "일정 수정" : "새 일정 추가"}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--color-text-secondary)] mb-1">날짜</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-2 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[var(--color-text-secondary)] mb-1">시간</label>
                  <input
                    type="text"
                    placeholder="예: 10:00 - 11:30"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-2 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--color-text-secondary)] mb-1">일정 제목</label>
                <input
                  type="text"
                  placeholder="예: Agentforce 심층 세션"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-2 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--color-text-secondary)] mb-1">장소</label>
                <input
                  type="text"
                  placeholder="예: Moscone South Main Keynote"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-2 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--color-text-secondary)] mb-1">상세 설명</label>
                <textarea
                  rows={2}
                  placeholder="세션 내용 또는 주요 메모"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--color-text-secondary)] mb-1">실전 팁 (선택)</label>
                <input
                  type="text"
                  placeholder="예: 30분 전 도착하여 앞자리 확보"
                  value={formProTip}
                  onChange={(e) => setFormProTip(e.target.value)}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-2 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="chk-important"
                  checked={formIsImportant}
                  onChange={(e) => setFormIsImportant(e.target.checked)}
                  className="rounded text-[var(--color-blue)]"
                />
                <label htmlFor="chk-important" className="text-xs font-bold text-purple-700">
                  MUST VISIT (핵심 일정으로 강조)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-2 rounded-xl border border-[var(--color-border)] text-slate-500 font-semibold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="notion-button-primary px-4 py-2 text-xs font-bold"
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 이미지 풀스크린 확대 모달 */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setFullscreenImage(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute -top-10 right-0 p-1.5 rounded-full bg-white/20 text-white hover:bg-white/40 cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={fullscreenImage}
              alt="Expanded Preview"
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};
