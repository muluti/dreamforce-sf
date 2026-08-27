import React, { useState } from "react";
import { X, Sparkles, AlertTriangle, Plus, Search, Trash2 } from "lucide-react";
import { ProTip } from "../types";

interface ProTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tips: ProTip[];
  onAddTip: (tip: ProTip) => void;
  onDeleteTip: (id: string) => void;
}

const STAGE_LABELS: Record<string, { label: string; icon: string }> = {
  all: { label: "전체 팁", icon: "✨" },
  safety_sf: { label: "SF 치안", icon: "🛡️" },
  conference: { label: "모스콘 행사", icon: "🎪" },
  immigration: { label: "입국/공항", icon: "🛃" },
  wellness_jetlag: { label: "시차/수면", icon: "🌙" },
  dining_tip: { label: "식당/팁", icon: "💵" },
  pre_trip: { label: "사전 준비", icon: "🧳" }
};

export const ProTipsModal: React.FC<ProTipsModalProps> = ({
  isOpen,
  onClose,
  tips = [],
  onAddTip,
  onDeleteTip
}) => {
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // New Tip Form State
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newStage, setNewStage] = useState<ProTip["stage"]>("conference");
  const [newUrgency, setNewUrgency] = useState<ProTip["urgency"]>("gold");

  if (!isOpen) return null;

  const filteredTips = tips.filter((tip) => {
    const stageMatch = selectedStage === "all" || tip.stage === selectedStage;
    const searchMatch =
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.content.toLowerCase().includes(searchQuery.toLowerCase());
    return stageMatch && searchMatch;
  });

  const handleCreateTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newTip: ProTip = {
      id: `tip-${Date.now()}`,
      stage: newStage,
      title: newTitle.trim(),
      content: newContent.trim(),
      urgency: newUrgency
    };
    onAddTip(newTip);
    setNewTitle("");
    setNewContent("");
    setIsAdding(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-[10px] p-0 md:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl max-h-[90vh] flex flex-col rounded-t-[32px] md:rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* 드래그 핸들 */}
        <div className="pt-3 pb-1">
          <div className="h-1.5 w-12 rounded-full bg-[#d7e3f1] dark:bg-slate-700 mx-auto" />
        </div>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--color-border)]">
          <div>
            <p className="notion-kicker">PRO TIPS</p>
            <h3 className="text-lg font-bold tracking-[-0.03em] text-[var(--color-foreground)]">
              실전 출장 노하우
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 검색 & 필터 */}
        <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface-alt)] space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="팁 검색 (텐더로인, 와이파이, 팁, 시차)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-blue)]"
              />
            </div>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="notion-button-primary py-2 px-3 text-xs active:scale-[0.97] cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{isAdding ? "취소" : "팁 추가"}</span>
            </button>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {Object.entries(STAGE_LABELS).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setSelectedStage(key)}
                className={`px-2.5 py-1 rounded-lg shrink-0 font-bold transition-all cursor-pointer border active:scale-95 ${
                  selectedStage === key
                    ? "border-blue-200 bg-blue-50 text-[var(--color-blue)] shadow-sm"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
                }`}
              >
                <span>{item.icon} {item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {isAdding && (
            <form onSubmit={handleCreateTip} className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2.5 text-xs shadow-md">
              <h4 className="font-bold text-[var(--color-foreground)]">새 꿀팁 등록</h4>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value as ProTip["stage"])}
                  className="w-full p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]"
                >
                  <option value="safety_sf">SF 치안 & 안전</option>
                  <option value="conference">모스콘 행사</option>
                  <option value="immigration">입국 & 공항</option>
                  <option value="wellness_jetlag">시차 & 수면</option>
                  <option value="dining_tip">식당 & 팁</option>
                  <option value="pre_trip">사전 준비</option>
                </select>
                <select
                  value={newUrgency}
                  onChange={(e) => setNewUrgency(e.target.value as ProTip["urgency"])}
                  className="w-full p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]"
                >
                  <option value="gold">🌟 황금 노하우</option>
                  <option value="warning">⚠️ 안전/주의</option>
                  <option value="info">ℹ️ 일반 유용 팁</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="제목"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] font-bold text-[var(--color-foreground)]"
              />

              <textarea
                rows={3}
                placeholder="상세 내용을 적어주세요..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="notion-button-secondary py-1.5 px-3"
                >
                  취소
                </button>
                <button type="submit" className="notion-button-primary py-1.5 px-4">
                  저장
                </button>
              </div>
            </form>
          )}

          {filteredTips.map((tip) => {
            const isWarning = tip.urgency === "warning";
            const isGold = tip.urgency === "gold";

            return (
              <article
                key={tip.id}
                className={`os-virtualized-card w-full rounded-[16px] border p-4 shadow-sm space-y-2 ${
                  isWarning
                    ? "border-red-200 bg-red-50/40"
                    : isGold
                    ? "border-amber-200 bg-amber-50/40"
                    : "border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`shrink-0 rounded-[4px] border px-1.5 py-0.5 text-[10px] font-bold ${
                        isWarning
                          ? "border-red-200 bg-red-100 text-red-700"
                          : isGold
                          ? "border-amber-200 bg-amber-100 text-amber-800"
                          : "border-blue-200 bg-blue-100 text-blue-700"
                      }`}
                    >
                      {STAGE_LABELS[tip.stage]?.label || "꿀팁"}
                    </span>
                    <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">{tip.title}</h4>
                  </div>
                  <button
                    onClick={() => onDeleteTip(tip.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-[12px] text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium">
                  {tip.content}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
