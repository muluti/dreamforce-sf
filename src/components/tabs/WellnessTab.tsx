import React, { useState } from "react";
import { 
  MoonStar, 
  Sun, 
  Coffee, 
  Music, 
  VolumeX, 
  DollarSign, 
  FileText, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Sparkles, 
  Layers,
  Download,
  Upload,
  RotateCcw,
  FolderPlus
} from "lucide-react";
import { AppData, ExpenseRecord, CustomSection, CustomSectionItem, MediaItem } from "../../types";
import { playSleepSound, stopSleepSound } from "../../utils/sound";
import { exportAppDataJSON, resetAppData } from "../../utils/storage";

interface WellnessTabProps {
  data: AppData;
  onAddExpense: (expense: ExpenseRecord) => void;
  onDeleteExpense: (id: string) => void;
  onAddSection: (section: CustomSection) => void;
  onDeleteSection: (id: string) => void;
  onAddItemToSection: (sectionId: string, item: CustomSectionItem) => void;
  onDeleteItemFromSection: (sectionId: string, itemId: string) => void;
  onRestoreData: (data: AppData) => void;
  onOpenMediaModal: (title: string, mediaList: MediaItem[], onUpdate: (items: MediaItem[]) => void) => void;
  onOpenCalculator?: () => void;
}

export const WellnessTab: React.FC<WellnessTabProps> = ({
  data,
  onAddExpense,
  onDeleteExpense,
  onAddSection,
  onDeleteSection,
  onAddItemToSection,
  onDeleteItemFromSection,
  onRestoreData,
  onOpenMediaModal,
  onOpenCalculator
}) => {
  const [activeSound, setActiveSound] = useState<"rain" | "cabin" | "waves" | null>(null);
  const [subSection, setSubSection] = useState<"jetlag" | "expenses" | "report" | "custom">("jetlag");
  const [copiedReport, setCopiedReport] = useState(false);

  // Expense Form
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [expDate, setExpDate] = useState("2026-09-14");
  const [expCat, setExpCat] = useState<ExpenseRecord["category"]>("meals");
  const [expUSD, setExpUSD] = useState<number>(30);
  const [expDesc, setExpDesc] = useState("");
  const [expMethod, setExpMethod] = useState<ExpenseRecord["paymentMethod"]>("법인카드");

  // Custom Section Form
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [secTitle, setSecTitle] = useState("");
  const [secDesc, setSecDesc] = useState("");

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [itemTitle, setItemTitle] = useState("");
  const [itemContent, setItemContent] = useState("");
  const [itemTag, setItemTag] = useState("");

  const handleToggleSound = (type: "rain" | "cabin" | "waves") => {
    if (activeSound === type) {
      stopSleepSound();
      setActiveSound(null);
    } else {
      playSleepSound(type);
      setActiveSound(type);
    }
  };

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expDesc.trim() || expUSD <= 0) return;

    const newExp: ExpenseRecord = {
      id: `exp-${Date.now()}`,
      date: expDate,
      category: expCat,
      amountUSD: expUSD,
      amountKRW: Math.round(expUSD * data.exchangeRate),
      description: expDesc.trim(),
      paymentMethod: expMethod
    };
    onAddExpense(newExp);
    setIsAddingExpense(false);
    setExpDesc("");
    setExpUSD(30);
  };

  const handleSaveSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secTitle.trim()) return;

    const newSec: CustomSection = {
      id: `sec-${Date.now()}`,
      title: secTitle.trim(),
      icon: "Layers",
      description: secDesc.trim(),
      items: []
    };
    onAddSection(newSec);
    setIsAddingSection(false);
    setSecTitle("");
    setSecDesc("");
  };

  const handleSaveItem = (sectionId: string) => {
    if (!itemTitle.trim() || !itemContent.trim()) return;

    const newItem: CustomSectionItem = {
      id: `item-${Date.now()}`,
      title: itemTitle.trim(),
      content: itemContent.trim(),
      tag: itemTag.trim() || undefined,
      media: []
    };
    onAddItemToSection(sectionId, newItem);
    setActiveSectionId(null);
    setItemTitle("");
    setItemContent("");
    setItemTag("");
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.timelineEvents && parsed.checklist) {
          onRestoreData(parsed);
          alert("데이터 백업이 성공적으로 복원되었습니다!");
        } else {
          alert("유효하지 않은 백업 파일입니다.");
        }
      } catch {
        alert("JSON 파싱 오류가 발생했습니다.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("모든 데이터를 초기화하시겠습니까? 기본 드림포스 데이터로 복원됩니다.")) {
      const reset = resetAppData();
      onRestoreData(reset);
      alert("데이터가 초기화되었습니다.");
    }
  };

  const totalUSD = data.expenses.reduce((acc, cur) => acc + cur.amountUSD, 0);
  const totalKRW = data.expenses.reduce((acc, cur) => acc + cur.amountKRW, 0);

  const generateReportText = () => {
    const importantSessions = data.timelineEvents
      .filter((e) => e.isImportant)
      .map((e) => `- [${e.date}] ${e.title} (${e.location})`)
      .join("\n");

    const partners = data.businessCards
      .map((c) => `- ${c.name} (${c.company} / ${c.role}) - ${c.keyDiscussion}`)
      .join("\n");

    return `# 📄 [출장 결과 보고서] Salesforce Dreamforce 2026 참관 결과

- **출장자**: ${data.userName}
- **출장 기간**: 2026.09.13 ~ 2026.09.18
- **출장지**: 미국 샌프란시스코 (Moscone Center)

## 주요 참석 세션
${importantSessions || "- 세션 참관"}

## 네트워킹 성과
${partners || "- 파트너 미팅 완료"}

## 총 소요 경비 요약
- **총 사용액**: $${totalUSD.toFixed(2)} (약 ₩${totalKRW.toLocaleString()}원 / 환율 1 USD = ${data.exchangeRate}원 기준)
`;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateReportText());
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto">
      {/* 3절 헤더 레이블 */}
      <div className="px-1">
        <p className="notion-kicker">WELLNESS & MORE</p>
        <h2 className="text-[18px] font-bold text-[var(--color-foreground)] tracking-tight">웰니스 & 정산</h2>
      </div>

      {/* 4절 Stat Tab (서브 네비게이션 4개) */}
      <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm text-xs font-bold">
        <button
          onClick={() => setSubSection("jetlag")}
          className={`py-2 text-center rounded-xl transition-all cursor-pointer active:scale-95 ${
            subSection === "jetlag" ? "bg-[var(--color-blue)] text-white shadow-sm" : "text-[#64748d]"
          }`}
        >
          시차/수면
        </button>

        <button
          onClick={() => setSubSection("expenses")}
          className={`py-2 text-center rounded-xl transition-all cursor-pointer active:scale-95 ${
            subSection === "expenses" ? "bg-[var(--color-blue)] text-white shadow-sm" : "text-[#64748d]"
          }`}
        >
          경비 정산
        </button>

        <button
          onClick={() => setSubSection("report")}
          className={`py-2 text-center rounded-xl transition-all cursor-pointer active:scale-95 ${
            subSection === "report" ? "bg-[var(--color-blue)] text-white shadow-sm" : "text-[#64748d]"
          }`}
        >
          보고서
        </button>

        <button
          onClick={() => setSubSection("custom")}
          className={`py-2 text-center rounded-xl transition-all cursor-pointer active:scale-95 ${
            subSection === "custom" ? "bg-[var(--color-blue)] text-white shadow-sm" : "text-[#64748d]"
          }`}
        >
          메뉴/백업
        </button>
      </div>

      {/* 1. Jetlag & Sleep */}
      {subSection === "jetlag" && (
        <div className="space-y-3.5">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 space-y-3 shadow-sm text-xs">
            <h3 className="font-bold text-[var(--color-foreground)] flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[var(--color-blue)]" />
              <span>16시간 시차 극복 생체 리듬</span>
            </h3>

            <div className="space-y-2">
              <div className="p-3 rounded-xl border border-amber-100 bg-amber-50/50 space-y-1">
                <span className="font-bold text-amber-700 flex items-center gap-1">
                  <Sun className="h-3.5 w-3.5" />
                  <span>아침 8시: 20분 햇볕 샤워</span>
                </span>
                <p className="text-slate-600 leading-relaxed font-medium">
                  야외 햇볕을 20분간 쬐어 생체 시계를 미국 시간에 맞춥니다.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-rose-100 bg-rose-50/50 space-y-1">
                <span className="font-bold text-rose-700 flex items-center gap-1">
                  <Coffee className="h-3.5 w-3.5" />
                  <span>오후 2시: 카페인 컷오프(Cut-off)</span>
                </span>
                <p className="text-slate-600 leading-relaxed font-medium">
                  오후 2시 이후에는 커피를 중단해야 밤 10시에 정상 숙면이 가능합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 백색소음 카드 */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 space-y-3 shadow-sm text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[var(--color-foreground)] flex items-center gap-1.5">
                <Music className="h-4 w-4 text-[var(--color-blue)]" />
                <span>오프라인 수면 백색소음</span>
              </h3>

              {activeSound && (
                <button
                  onClick={() => {
                    stopSleepSound();
                    setActiveSound(null);
                  }}
                  className="px-2.5 py-1 bg-red-600 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 active:scale-95 cursor-pointer"
                >
                  <VolumeX className="h-3 w-3" />
                  <span>정지</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleToggleSound("rain")}
                className={`py-3 rounded-xl border text-center transition-all cursor-pointer active:scale-95 ${
                  activeSound === "rain"
                    ? "border-blue-200 bg-blue-50 text-[var(--color-blue)] font-bold shadow-sm"
                    : "border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[#64748d]"
                }`}
              >
                <div className="text-lg mb-0.5">🌧️</div>
                <span className="text-xs font-bold block">빗소리</span>
              </button>

              <button
                onClick={() => handleToggleSound("cabin")}
                className={`py-3 rounded-xl border text-center transition-all cursor-pointer active:scale-95 ${
                  activeSound === "cabin"
                    ? "border-blue-200 bg-blue-50 text-[var(--color-blue)] font-bold shadow-sm"
                    : "border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[#64748d]"
                }`}
              >
                <div className="text-lg mb-0.5">✈️</div>
                <span className="text-xs font-bold block">기내음</span>
              </button>

              <button
                onClick={() => handleToggleSound("waves")}
                className={`py-3 rounded-xl border text-center transition-all cursor-pointer active:scale-95 ${
                  activeSound === "waves"
                    ? "border-blue-200 bg-blue-50 text-[var(--color-blue)] font-bold shadow-sm"
                    : "border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[#64748d]"
                }`}
              >
                <div className="text-lg mb-0.5">🌊</div>
                <span className="text-xs font-bold block">파도음</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Expenses */}
      {subSection === "expenses" && (
        <div className="space-y-3.5">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[11px] font-bold text-[var(--color-text-secondary)]">총 누적 경비 ({data.expenses.length}건)</span>
              <div className="text-[22px] font-bold text-[var(--color-foreground)] stripe-number mt-0.5">
                ${totalUSD.toFixed(2)}
              </div>
            </div>
            <div className="text-right border-l border-[var(--color-border)] pl-4">
              <span className="text-[11px] font-bold text-[var(--color-text-secondary)]">원화 환산 합계</span>
              <div className="text-sm font-bold text-emerald-600 stripe-number mt-0.5">
                ₩{totalKRW.toLocaleString()}원
              </div>
            </div>
          </div>

          {onOpenCalculator && (
            <button
              onClick={onOpenCalculator}
              className="w-full py-2.5 px-3 rounded-xl border border-emerald-200/80 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-xs hover:bg-emerald-100"
            >
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>💵 미국 식당 팁(15/18/20%) & 더치페이 계산기 열기</span>
            </button>
          )}

          <div className="flex justify-end">
            <button
              onClick={() => setIsAddingExpense(!isAddingExpense)}
              className="notion-button-primary py-1.5 px-3 text-xs active:scale-[0.97] cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{isAddingExpense ? "취소" : "지출 등록"}</span>
            </button>
          </div>

          {isAddingExpense && (
            <form onSubmit={handleSaveExpense} className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2.5 text-xs shadow-md">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                  className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                />
                <select
                  value={expCat}
                  onChange={(e) => setExpCat(e.target.value as ExpenseRecord["category"])}
                  className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                >
                  <option value="meals">식비</option>
                  <option value="transport">교통비</option>
                  <option value="drinks">음료/카페</option>
                  <option value="hotel">호텔</option>
                  <option value="shopping">선물/기타</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  step="0.01"
                  placeholder="달러 금액 ($)"
                  value={expUSD}
                  onChange={(e) => setExpUSD(Number(e.target.value))}
                  className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] font-mono font-bold"
                />
                <select
                  value={expMethod}
                  onChange={(e) => setExpMethod(e.target.value as ExpenseRecord["paymentMethod"])}
                  className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                >
                  <option value="법인카드">법인카드</option>
                  <option value="개인카드">개인카드</option>
                  <option value="현금">현금</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="지출 내역 상세 메모"
                value={expDesc}
                onChange={(e) => setExpDesc(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingExpense(false)}
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

          <div className="space-y-2">
            {data.expenses.map((exp) => (
              <article
                key={exp.id}
                className="os-virtualized-card w-full rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 flex items-center justify-between gap-3 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="shrink-0 rounded-[4px] border border-blue-100 bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-600">
                      {exp.paymentMethod}
                    </span>
                    <span className="text-xs font-semibold text-[var(--color-foreground)]">{exp.description}</span>
                  </div>
                  <span className="text-[10px] text-[var(--color-text-muted)] font-mono mt-0.5 block">{exp.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-xs font-bold text-[var(--color-foreground)] font-mono">
                      ${exp.amountUSD.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-secondary)] block font-mono">
                      ₩{exp.amountKRW.toLocaleString()}원
                    </span>
                  </div>

                  <button
                    onClick={() => onDeleteExpense(exp.id)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 rounded active:scale-95 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* 3. Report Builder */}
      {subSection === "report" && (
        <div className="space-y-3.5">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 space-y-3 shadow-sm text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[var(--color-foreground)] flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-[var(--color-blue)]" />
                <span>출장 결과 보고서 자동 빌더</span>
              </h3>

              <button
                onClick={handleCopyReport}
                className="notion-button-primary py-1.5 px-3 text-xs active:scale-[0.97] cursor-pointer flex items-center gap-1"
              >
                {copiedReport ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedReport ? "복사됨" : "복사"}</span>
              </button>
            </div>

            <textarea
              readOnly
              rows={12}
              value={generateReportText()}
              className="w-full p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] font-mono text-xs leading-relaxed focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* 4. Custom Sections & Backup */}
      {subSection === "custom" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2.5 shadow-sm text-xs">
            <span className="font-bold text-[var(--color-foreground)]">🗄️ 백업 및 복원 (JSON)</span>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => exportAppDataJSON(data)}
                className="notion-button-secondary py-1.5 px-3 text-xs flex items-center gap-1 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>백업 저장</span>
              </button>

              <label className="notion-button-secondary py-1.5 px-3 text-xs flex items-center gap-1 cursor-pointer">
                <Upload className="h-3.5 w-3.5" />
                <span>불러오기</span>
                <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
              </label>

              <button
                onClick={handleReset}
                className="py-1.5 px-3 rounded-xl border border-red-200 bg-red-50 text-red-600 text-xs font-bold flex items-center gap-1 active:scale-95 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>초기화</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <h3 className="text-[13px] font-bold text-[var(--color-foreground)]">나만의 커스텀 카드 메뉴</h3>
            <button
              onClick={() => setIsAddingSection(true)}
              className="text-xs font-bold text-[var(--color-blue)] hover:underline cursor-pointer"
            >
              + 메뉴 생성
            </button>
          </div>

          {isAddingSection && (
            <form onSubmit={handleSaveSection} className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2 text-xs shadow-md">
              <input
                type="text"
                placeholder="카테고리 제목 (예: 🎁 쇼핑/선물)"
                value={secTitle}
                onChange={(e) => setSecTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] font-bold"
              />
              <input
                type="text"
                placeholder="설명"
                value={secDesc}
                onChange={(e) => setSecDesc(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingSection(false)}
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

          <div className="space-y-3">
            {data.customSections.map((sec) => (
              <article
                key={sec.id}
                className="os-virtualized-card w-full rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">{sec.title}</h4>
                    {sec.description && (
                      <p className="text-[11px] text-[var(--color-text-secondary)]">{sec.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveSectionId(sec.id)}
                      className="text-xs font-bold text-[var(--color-blue)] hover:underline cursor-pointer"
                    >
                      + 항목 추가
                    </button>
                    <button
                      onClick={() => onDeleteSection(sec.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {activeSectionId === sec.id && (
                  <div className="p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] space-y-2 text-xs">
                    <input
                      type="text"
                      placeholder="항목 제목"
                      value={itemTitle}
                      onChange={(e) => setItemTitle(e.target.value)}
                      className="w-full p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-foreground)] font-bold"
                    />
                    <textarea
                      rows={2}
                      placeholder="상세 내용"
                      value={itemContent}
                      onChange={(e) => setItemContent(e.target.value)}
                      className="w-full p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="태그"
                        value={itemTag}
                        onChange={(e) => setItemTag(e.target.value)}
                        className="flex-1 p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                      />
                      <button
                        type="button"
                        onClick={() => setActiveSectionId(null)}
                        className="notion-button-secondary py-1 px-2.5 text-xs"
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveItem(sec.id)}
                        className="notion-button-primary py-1 px-3 text-xs"
                      >
                        등록
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {sec.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] flex items-start justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          {item.tag && (
                            <span className="shrink-0 rounded-[4px] border border-blue-100 bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-600">
                              #{item.tag}
                            </span>
                          )}
                          <h5 className="text-xs font-bold text-[var(--color-foreground)]">{item.title}</h5>
                        </div>
                        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{item.content}</p>
                      </div>
                      <button
                        onClick={() => onDeleteItemFromSection(sec.id, item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
