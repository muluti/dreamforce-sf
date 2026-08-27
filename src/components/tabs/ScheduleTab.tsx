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
  X
} from "lucide-react";
import { TimelineEvent, MediaItem } from "../../types";

interface ScheduleTabProps {
  events: TimelineEvent[];
  onAddEvent: (event: TimelineEvent) => void;
  onUpdateEvent: (event: TimelineEvent) => void;
  onDeleteEvent: (id: string) => void;
  onOpenMediaModal: (title: string, mediaList: MediaItem[], onUpdate: (items: MediaItem[]) => void) => void;
}

const DATES = [
  { date: "all", label: "전체", sub: "6일간" },
  { date: "2026-09-13", label: "9/13", sub: "출국" },
  { date: "2026-09-14", label: "9/14", sub: "키노트" },
  { date: "2026-09-15", label: "9/15", sub: "세션" },
  { date: "2026-09-16", label: "9/16", sub: "축제" },
  { date: "2026-09-17", label: "9/17", sub: "폐막" },
  { date: "2026-09-18", label: "9/18", sub: "귀국" }
];

export const ScheduleTab: React.FC<ScheduleTabProps> = ({
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  onOpenMediaModal
}) => {
  const [selectedDate, setSelectedDate] = useState("all");
  const [showMosconeGuide, setShowMosconeGuide] = useState(false);
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
          <p className="notion-kicker">SCHEDULE</p>
          <h2 className="text-[18px] font-bold text-[var(--color-foreground)] tracking-tight">타임라인</h2>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowMosconeGuide(!showMosconeGuide)}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer ${
              showMosconeGuide
                ? "border-blue-200 bg-blue-50 text-[var(--color-blue)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
            }`}
            title="모스콘 맵"
          >
            <Compass className="h-4 w-4" />
            <span className="hidden sm:inline">캠퍼스 맵</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="notion-button-primary py-2 px-3 text-xs flex items-center gap-1 active:scale-[0.97] cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>일정 추가</span>
          </button>
        </div>
      </div>

      {/* 모스콘 캠퍼스 구조 가이드 */}
      {showMosconeGuide && (
        <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 space-y-3 shadow-sm text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[var(--color-blue)] flex items-center gap-1.5">
              <Compass className="h-4 w-4" />
              <span>모스콘 센터 (Moscone Center) 구조 안내</span>
            </h3>
          </div>
          <div className="space-y-2 text-slate-700 font-medium">
            <div className="p-2.5 bg-white rounded-xl border border-blue-100/80">
              <span className="font-bold text-[var(--color-blue)]">🏢 Moscone South</span>
              <p className="mt-0.5 text-slate-600">메인 키노트 홀, Campground 전시 부스, 점심 배부처</p>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-blue-100/80">
              <span className="font-bold text-[var(--color-blue)]">🏢 Moscone West</span>
              <p className="mt-0.5 text-slate-600">배지 등록 센터, 개발자 포레스트, 실습 랩</p>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-blue-100/80">
              <span className="font-bold text-emerald-700">🌳 Yerba Buena & Park</span>
              <p className="mt-0.5 text-slate-600">야외 네트워킹 정원, 휴게존</p>
            </div>
          </div>
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
                      className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer ${
                        hasMedia
                          ? "bg-blue-50 text-[var(--color-blue)] border border-blue-200 font-bold"
                          : "text-slate-400 hover:text-[var(--color-foreground)] hover:bg-slate-100"
                      }`}
                      title="사진/영상"
                    >
                      <Film className="h-3.5 w-3.5" />
                      {hasMedia && <span className="text-[10px]">{evt.media?.length}</span>}
                    </button>

                    <button
                      onClick={() => handleOpenEdit(evt)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[var(--color-foreground)] hover:bg-slate-100 transition-all active:scale-95 cursor-pointer"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteEvent(evt.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-all active:scale-95 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <h3
                  className={`text-[15px] font-semibold tracking-tight leading-snug mb-1.5 ${
                    evt.completed ? "line-through text-slate-400" : "text-[var(--color-foreground)]"
                  }`}
                >
                  {evt.title}
                </h3>

                <div className="text-[12px] text-[var(--color-text-secondary)] flex items-center gap-1 mb-2">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{evt.location}</span>
                </div>

                {evt.description && (
                  <p className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-line mb-2 bg-[var(--color-surface-alt)] p-2.5 rounded-xl border border-[var(--color-border)]">
                    {evt.description}
                  </p>
                )}

                {evt.proTip && (
                  <div className="flex items-start gap-1.5 text-[11px] text-[var(--color-text-warning)] bg-[var(--color-background-warning)] border border-[var(--color-border-warning)]/40 p-2 rounded-xl font-medium">
                    <Sparkles className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#EF9F27]" />
                    <span>{evt.proTip}</span>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>

      {/* 13절 BottomSheet 모달 형태의 일정 추가/수정 */}
      {isEditing && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-[10px] p-0 md:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-t-[32px] md:rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-300">
            <div className="h-1.5 w-12 rounded-full bg-[#d7e3f1] dark:bg-slate-700 mx-auto" />

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold tracking-[-0.03em] text-[var(--color-foreground)]">
                {editingId ? "일정 수정" : "새 일정 등록"}
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
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-[var(--color-text-secondary)]">날짜</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-blue)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-[var(--color-text-secondary)]">시간대</label>
                  <input
                    type="text"
                    placeholder="예: 09:00 - 11:30"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-blue)]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-[var(--color-text-secondary)]">일정 제목 *</label>
                <input
                  type="text"
                  placeholder="일정 제목 입력"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] font-semibold focus:outline-none focus:border-[var(--color-blue)]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-[var(--color-text-secondary)]">장소</label>
                <input
                  type="text"
                  placeholder="예: Moscone South Main Hall"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-blue)]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-[var(--color-text-secondary)]">상세 설명</label>
                <textarea
                  rows={2}
                  placeholder="상세 내용을 적어주세요..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-blue)]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-[var(--color-text-secondary)]">실전 팁 (선택)</label>
                <input
                  type="text"
                  placeholder="예: 30분 전 앞자리 착석 필수"
                  value={formProTip}
                  onChange={(e) => setFormProTip(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-blue)]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={formIsImportant}
                    onChange={(e) => setFormIsImportant(e.target.checked)}
                    className="rounded border-slate-300 text-[var(--color-blue)] focus:ring-0"
                  />
                  <span>중요 일정(MUST VISIT)으로 표시</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="notion-button-secondary py-2 px-4 active:scale-[0.97] cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="notion-button-primary py-2 px-5 active:scale-[0.97] cursor-pointer"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
