import React, { useState } from "react";
import { 
  Languages, 
  Volume2, 
  Copy, 
  Maximize2, 
  Plus, 
  Trash2, 
  Calculator, 
  Sparkles, 
  Check, 
  X
} from "lucide-react";
import { EnglishPhrase } from "../../types";
import { speakText } from "../../utils/sound";

interface EnglishTabProps {
  phrases: EnglishPhrase[];
  onAddPhrase: (phrase: EnglishPhrase) => void;
  onDeletePhrase: (id: string) => void;
}

const CATEGORIES: Record<string, string> = {
  all: "전체",
  immigration: "🛃 입국",
  booth: "🤝 부스",
  smalltalk: "☕ 대화",
  restaurant_tip: "🍔 식당/팁",
  emergency: "🚨 비상"
};

export const EnglishTab: React.FC<EnglishTabProps> = ({
  phrases,
  onAddPhrase,
  onDeletePhrase
}) => {
  const [selectedCat, setSelectedCat] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [fullScreenText, setFullScreenText] = useState<EnglishPhrase | null>(null);
  const [showTipCalculator, setShowTipCalculator] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Tip Calculator
  const [billAmount, setBillAmount] = useState<number>(50);
  const [tipRate, setTipRate] = useState<number>(18);
  const [splitCount, setSplitCount] = useState<number>(1);

  // New Phrase
  const [newCat, setNewCat] = useState<EnglishPhrase["category"]>("booth");
  const [newSit, setNewSit] = useState("");
  const [newEn, setNewEn] = useState("");
  const [newKo, setNewKo] = useState("");
  const [newPron, setNewPron] = useState("");
  const [newTip, setNewTip] = useState("");

  const filteredPhrases = phrases.filter((p) => {
    if (selectedCat === "all") return true;
    return p.category === selectedCat;
  });

  const handleCopy = (phrase: EnglishPhrase) => {
    navigator.clipboard.writeText(phrase.en);
    setCopiedId(phrase.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleCreatePhrase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEn.trim() || !newKo.trim()) return;

    const item: EnglishPhrase = {
      id: `en-${Date.now()}`,
      category: newCat,
      situation: newSit.trim() || "실전 상황",
      en: newEn.trim(),
      ko: newKo.trim(),
      pronunciationGuide: newPron.trim(),
      proTip: newTip.trim()
    };
    onAddPhrase(item);
    setIsAdding(false);
    setNewEn("");
    setNewKo("");
    setNewSit("");
    setNewPron("");
    setNewTip("");
  };

  const tipAmount = (billAmount * tipRate) / 100;
  const totalAmount = billAmount + tipAmount;
  const perPerson = totalAmount / (splitCount > 0 ? splitCount : 1);

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto">
      {/* 3절 헤더 레이블 */}
      <div className="flex items-center justify-between px-1">
        <div>
          <p className="notion-kicker">ENGLISH SOS</p>
          <h2 className="text-[18px] font-bold text-[var(--color-foreground)] tracking-tight">영어 회화 & 팁</h2>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowTipCalculator(!showTipCalculator)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border transition-all active:scale-95 cursor-pointer ${
              showTipCalculator
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
            }`}
          >
            <Calculator className="h-3.5 w-3.5" />
            <span>팁 계산기</span>
          </button>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="notion-button-primary py-1.5 px-3 text-xs active:scale-[0.97] cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>표현 추가</span>
          </button>
        </div>
      </div>

      {/* 팁 계산기 카드 */}
      {showTipCalculator && (
        <div className="rounded-2xl border border-emerald-200 bg-[var(--color-surface)] p-4 space-y-3 shadow-sm text-xs">
          <h3 className="font-bold text-emerald-800 flex items-center gap-1.5">
            <Calculator className="h-4 w-4 text-emerald-600" />
            <span>미국 식당 & 우버 팁(Tip) 계산기</span>
          </h3>

          <div className="space-y-2.5">
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">식사 금액 ($)</label>
              <input
                type="number"
                min={1}
                value={billAmount}
                onChange={(e) => setBillAmount(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] font-mono font-bold text-base focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">팁 비율</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[15, 18, 20].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setTipRate(rate)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      tipRate === rate
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-[var(--color-surface-alt)] text-slate-500 border border-[var(--color-border)]"
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">인원수 (N분의 1)</label>
              <input
                type="number"
                min={1}
                value={splitCount}
                onChange={(e) => setSplitCount(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] font-mono font-bold"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between text-xs font-bold">
            <div>
              <span className="text-slate-400 block text-[10px]">팁 금액</span>
              <span className="text-emerald-700 font-mono">${tipAmount.toFixed(2)}</span>
            </div>
            <div className="text-center border-x border-emerald-200 px-3">
              <span className="text-slate-400 block text-[10px]">총 결제액</span>
              <span className="text-slate-900 font-mono">${totalAmount.toFixed(2)}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px]">1인당 부담</span>
              <span className="text-amber-800 font-mono font-extrabold text-sm">${perPerson.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* 새 표현 등록 폼 */}
      {isAdding && (
        <form onSubmit={handleCreatePhrase} className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2.5 text-xs shadow-md">
          <h4 className="font-bold text-[var(--color-foreground)]">새 표현 등록</h4>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={newCat}
              onChange={(e) => setNewCat(e.target.value as EnglishPhrase["category"])}
              className="w-full p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]"
            >
              <option value="immigration">입국 심사</option>
              <option value="booth">부스 질문</option>
              <option value="smalltalk">네트워킹</option>
              <option value="restaurant_tip">식당 & 팁</option>
              <option value="emergency">비상 상황</option>
            </select>
            <input
              type="text"
              placeholder="대화 상황"
              value={newSit}
              onChange={(e) => setNewSit(e.target.value)}
              className="w-full p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]"
            />
          </div>
          <input
            type="text"
            placeholder="영어 문장 *"
            value={newEn}
            onChange={(e) => setNewEn(e.target.value)}
            className="w-full p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] font-semibold"
          />
          <input
            type="text"
            placeholder="한국어 뜻 *"
            value={newKo}
            onChange={(e) => setNewKo(e.target.value)}
            className="w-full p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]"
          />
          <input
            type="text"
            placeholder="발음 가이드"
            value={newPron}
            onChange={(e) => setNewPron(e.target.value)}
            className="w-full p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]"
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

      {/* 카테고리 칩 */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {Object.entries(CATEGORIES).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCat(key)}
            className={`px-3 py-1.5 rounded-xl shrink-0 font-bold transition-all cursor-pointer border active:scale-95 ${
              selectedCat === key
                ? "border-blue-200 bg-blue-50 text-[var(--color-blue)] shadow-sm"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 표현 목록 (6절 리스트 아이템 카드) */}
      <div className="space-y-3">
        {filteredPhrases.map((phrase) => (
          <article
            key={phrase.id}
            className="os-virtualized-card w-full overflow-hidden rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="shrink-0 rounded-[4px] border border-blue-100 bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-600">
                {phrase.situation}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => speakText(phrase.en)}
                  className="p-2 rounded-lg bg-blue-50 text-[var(--color-blue)] hover:bg-blue-100 transition-all active:scale-95 cursor-pointer"
                  title="발음 듣기"
                >
                  <Volume2 className="h-4 w-4" />
                </button>

                <button
                  onClick={() => handleCopy(phrase)}
                  className="p-2 rounded-lg bg-[var(--color-surface-alt)] text-slate-500 hover:text-[var(--color-foreground)] transition-all active:scale-95 cursor-pointer border border-[var(--color-border)]"
                  title="복사"
                >
                  {copiedId === phrase.id ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>

                <button
                  onClick={() => setFullScreenText(phrase)}
                  className="p-2 rounded-lg bg-[var(--color-surface-alt)] text-slate-500 hover:text-[var(--color-foreground)] transition-all active:scale-95 cursor-pointer border border-[var(--color-border)]"
                  title="풀스크린"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>

                <button
                  onClick={() => onDeletePhrase(phrase.id)}
                  className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all active:scale-95 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="text-[15px] font-semibold tracking-tight text-[var(--color-foreground)] leading-snug">
              "{phrase.en}"
            </div>

            <div className="text-xs text-[var(--color-blue)] font-bold">
              👉 {phrase.ko}
            </div>

            {phrase.pronunciationGuide && (
              <div className="text-[11px] text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] p-2 rounded-xl border border-[var(--color-border)] font-mono">
                🗣️ {phrase.pronunciationGuide}
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Fullscreen Overlay */}
      {fullScreenText && (
        <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[var(--color-surface)] p-6 text-center animate-in fade-in duration-200">
          <button
            onClick={() => setFullScreenText(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-[var(--color-surface-alt)] text-slate-600 hover:bg-slate-200 cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="max-w-md space-y-6">
            <span className="notion-kicker">
              {fullScreenText.situation}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[var(--color-foreground)] leading-snug px-2">
              "{fullScreenText.en}"
            </h2>
            <p className="text-base text-[var(--color-blue)] font-bold">
              {fullScreenText.ko}
            </p>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => speakText(fullScreenText.en)}
                className="notion-button-primary py-3 px-6 text-sm flex items-center gap-2 active:scale-[0.97] cursor-pointer"
              >
                <Volume2 className="h-5 w-5" />
                <span>발음 재생</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
