import React, { useState } from "react";
import { 
  FileText, 
  CheckSquare, 
  Users, 
  ShieldAlert, 
  Plus, 
  Trash2, 
  Film, 
  Phone, 
  Mail, 
  ExternalLink, 
  MapPin, 
  Sparkles, 
  Tag, 
  AlertTriangle,
  Copy,
  Check,
  X,
  Plane,
  DollarSign,
  Receipt,
  FileCheck
} from "lucide-react";
import { 
  TravelDocument, 
  ChecklistItem, 
  ColleagueContact, 
  BusinessCardRecord, 
  SafetyZone, 
  MediaItem,
  ExpenseRecord,
  TimelineEvent
} from "../../types";

interface TripHubTabProps {
  documents: TravelDocument[];
  checklist: ChecklistItem[];
  colleagues: ColleagueContact[];
  businessCards: BusinessCardRecord[];
  safetyZones: SafetyZone[];
  expenses: ExpenseRecord[];
  exchangeRate: number;
  userName: string;
  timelineEvents: TimelineEvent[];
  onUpdateDocument: (doc: TravelDocument) => void;
  onAddDocument: (doc: TravelDocument) => void;
  onDeleteDocument: (id: string) => void;
  onToggleChecklist: (id: string) => void;
  onAddChecklistItem: (item: ChecklistItem) => void;
  onDeleteChecklistItem: (id: string) => void;
  onAddColleague: (col: ColleagueContact) => void;
  onUpdateColleague: (col: ColleagueContact) => void;
  onDeleteColleague: (id: string) => void;
  onAddBusinessCard: (card: BusinessCardRecord) => void;
  onDeleteBusinessCard: (id: string) => void;
  onAddExpense: (expense: ExpenseRecord) => void;
  onDeleteExpense: (id: string) => void;
  onOpenMediaModal: (title: string, mediaList: MediaItem[], onUpdate: (items: MediaItem[]) => void) => void;
  onOpenFlightGuide?: () => void;
  onOpenCalculator?: () => void;
}

export const TripHubTab: React.FC<TripHubTabProps> = ({
  documents,
  checklist,
  colleagues,
  businessCards,
  safetyZones,
  expenses,
  exchangeRate,
  userName,
  timelineEvents,
  onUpdateDocument,
  onAddDocument,
  onDeleteDocument,
  onToggleChecklist,
  onAddChecklistItem,
  onDeleteChecklistItem,
  onAddColleague,
  onUpdateColleague,
  onDeleteColleague,
  onAddBusinessCard,
  onDeleteBusinessCard,
  onAddExpense,
  onDeleteExpense,
  onOpenMediaModal,
  onOpenFlightGuide,
  onOpenCalculator
}) => {
  const [subTab, setSubTab] = useState<"docs" | "checklist" | "team" | "expenses" | "safety">("docs");

  // Expense Form
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [expDate, setExpDate] = useState("2026-09-14");
  const [expCat, setExpCat] = useState<ExpenseRecord["category"]>("meals");
  const [expUSD, setExpUSD] = useState<number>(30);
  const [expDesc, setExpDesc] = useState("");
  const [expMethod, setExpMethod] = useState<ExpenseRecord["paymentMethod"]>("법인카드");
  const [copiedReport, setCopiedReport] = useState(false);

  // Checklist Form
  const [newCheckText, setNewCheckText] = useState("");
  const [newCheckCat, setNewCheckCat] = useState<ChecklistItem["category"]>("business");

  // Colleague Form
  const [isAddingColleague, setIsAddingColleague] = useState(false);
  const [colName, setColName] = useState("");
  const [colRole, setColRole] = useState("");
  const [colPhone, setColPhone] = useState("");
  const [colRoom, setColRoom] = useState("");
  const [colKakao, setColKakao] = useState("");

  // Business Card Form
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [bcName, setBcName] = useState("");
  const [bcCompany, setBcCompany] = useState("");
  const [bcRole, setBcRole] = useState("");
  const [bcEmail, setBcEmail] = useState("");
  const [bcLinkedin, setBcLinkedin] = useState("");
  const [bcTags, setBcTags] = useState("");
  const [bcNotes, setBcNotes] = useState("");
  const [bcFollowUp, setBcFollowUp] = useState("");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} 복사되었습니다: ${text}`);
  };

  const handleAddChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCheckText.trim()) return;
    const newItem: ChecklistItem = {
      id: `chk-${Date.now()}`,
      category: newCheckCat,
      text: newCheckText.trim(),
      checked: false
    };
    onAddChecklistItem(newItem);
    setNewCheckText("");
  };

  const handleSaveColleague = (e: React.FormEvent) => {
    e.preventDefault();
    if (!colName.trim()) return;
    const newCol: ColleagueContact = {
      id: `col-${Date.now()}`,
      name: colName.trim(),
      role: colRole.trim(),
      phone: colPhone.trim(),
      roomNumber: colRoom.trim(),
      kakaoOrSlack: colKakao.trim(),
      status: "세션 참석 중"
    };
    onAddColleague(newCol);
    setIsAddingColleague(false);
    setColName("");
    setColRole("");
    setColPhone("");
    setColRoom("");
    setColKakao("");
  };

  const handleSaveBusinessCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bcName.trim() || !bcCompany.trim()) return;
    const newCard: BusinessCardRecord = {
      id: `bc-${Date.now()}`,
      name: bcName.trim(),
      company: bcCompany.trim(),
      role: bcRole.trim(),
      email: bcEmail.trim(),
      linkedin: bcLinkedin.trim(),
      tags: bcTags.split(",").map((t) => t.trim()).filter(Boolean),
      keyDiscussion: bcNotes.trim(),
      followUpTodo: bcFollowUp.trim(),
      createdAt: new Date().toLocaleString("ko-KR")
    };
    onAddBusinessCard(newCard);
    setIsAddingCard(false);
    setBcName("");
    setBcCompany("");
    setBcRole("");
    setBcEmail("");
    setBcLinkedin("");
    setBcTags("");
    setBcNotes("");
    setBcFollowUp("");
  };

  const totalUSD = (expenses || []).reduce((acc, cur) => acc + cur.amountUSD, 0);
  const totalKRW = (expenses || []).reduce((acc, cur) => acc + cur.amountKRW, 0);

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expDesc.trim() || expUSD <= 0) return;

    const newExp: ExpenseRecord = {
      id: `exp-${Date.now()}`,
      date: expDate,
      category: expCat,
      amountUSD: expUSD,
      amountKRW: Math.round(expUSD * exchangeRate),
      description: expDesc.trim(),
      paymentMethod: expMethod
    };
    onAddExpense(newExp);
    setIsAddingExpense(false);
    setExpDesc("");
    setExpUSD(30);
  };

  const generateReportText = () => {
    const importantSessions = (timelineEvents || [])
      .filter((e) => e.isImportant)
      .map((e) => `- [${e.date}] ${e.title} (${e.location})`)
      .join("\n");

    const partners = (businessCards || [])
      .map((c) => `- ${c.name} (${c.company} / ${c.role}) - ${c.keyDiscussion}`)
      .join("\n");

    return `# 📄 [출장 결과 보고서] Salesforce Dreamforce 2026 참관 결과

- **출장자**: ${userName}
- **출장 기간**: 2026.09.13 ~ 2026.09.18
- **출장지**: 미국 샌프란시스코 (Moscone Center)

## 주요 참석 세션
${importantSessions || "- 세션 참관 완료"}

## 네트워킹 성과
${partners || "- 파트너 미팅 완료"}

## 총 소요 경비 요약
- **총 사용액**: $${totalUSD.toFixed(2)} (약 ₩${totalKRW.toLocaleString()}원 / 환율 1 USD = ${exchangeRate}원 기준)
`;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateReportText());
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <div className="space-y-4 w-full">
      {/* 헤더 타이틀 */}
      <div className="px-1">
        <h2 className="text-[19px] sm:text-[20px] font-black text-slate-900 dark:text-white tracking-tight">출장 허브</h2>
        <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium">출장 필수 서류, 준비물, 명함 및 경비 정산</p>
      </div>

      {/* 5개 서브 탭 네비게이션: 완벽한 5분할 */}
      <div className="grid grid-cols-5 gap-1 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        {(["docs", "checklist", "team", "expenses", "safety"] as const).map((tab) => {
          const isActive = subTab === tab;
          const labels = { docs: "서류", checklist: "패킹", team: "팀/명함", expenses: "경비정산", safety: "치안" };
          const icons = { docs: FileText, checklist: CheckSquare, team: Users, expenses: Receipt, safety: ShieldAlert };
          const Icon = icons[tab];

          return (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              className={`py-2 px-0.5 text-center rounded-xl text-[12px] font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 ${
                isActive
                  ? "bg-[var(--color-blue)] text-white shadow-xs font-black"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="whitespace-nowrap leading-none">{labels[tab]}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Docs SubTab */}
      {subTab === "docs" && (
        <div className="space-y-3">
          {documents.map((doc) => {
            const hasMedia = doc.media && doc.media.length > 0;

            return (
              <article
                key={doc.id}
                className="w-full overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/50 px-2 py-0.5 text-[11px] font-black text-blue-700 dark:text-blue-300 mb-1.5 inline-block">
                      {doc.subtitle}
                    </span>
                    <h4 className="text-[16px] sm:text-[17px] font-black text-slate-900 dark:text-white tracking-tight">{doc.title}</h4>
                  </div>

                  <button
                    onClick={() =>
                      onOpenMediaModal(
                        doc.title,
                        doc.media || [],
                        (updatedList) => onUpdateDocument({ ...doc, media: updatedList })
                      )
                    }
                    className={`h-8 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all border ${
                      hasMedia
                        ? "bg-blue-50 text-[var(--color-blue)] border-blue-200 dark:bg-blue-950/50"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <Film className="h-3.5 w-3.5" />
                    <span>{hasMedia ? `첨부 (${doc.media?.length})` : "사진/PDF"}</span>
                  </button>
                </div>

                {doc.notes && (
                  <p className="text-[14px] text-slate-700 dark:text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                    {doc.notes}
                  </p>
                )}

                {doc.id === "doc-icn-sfo-guide" && onOpenFlightGuide && (
                  <button
                    onClick={onOpenFlightGuide}
                    className="w-full py-2.5 px-3 rounded-xl bg-[var(--color-blue)] hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-xs transition-colors"
                  >
                    <Plane className="h-4 w-4" />
                    <span>📖 20단계 전체 가이드북 및 7단계 요약 열기</span>
                  </button>
                )}

                <div className="space-y-1.5 text-xs">
                  {doc.fields.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] flex items-center justify-between gap-2"
                    >
                      <span className="text-[var(--color-text-secondary)] font-medium shrink-0">{f.label}</span>
                      <div className="flex items-center gap-1 overflow-hidden">
                        <span className="text-[var(--color-foreground)] font-mono font-bold truncate">
                          {f.value}
                        </span>
                        <button
                          onClick={() => copyToClipboard(f.value, f.label)}
                          className="text-slate-400 hover:text-[var(--color-blue)] p-1 shrink-0 cursor-pointer"
                          title="복사"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {doc.notes && (
                  <div className="text-[11.5px] text-[var(--color-text-warning)] bg-[var(--color-background-warning)] border border-[var(--color-border-warning)]/40 p-3 rounded-xl font-medium whitespace-pre-line leading-relaxed">
                    💡 {doc.notes}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* 2. Checklist SubTab */}
      {subTab === "checklist" && (
        <div className="space-y-3">
          <form onSubmit={handleAddChecklist} className="flex gap-2">
            <select
              value={newCheckCat}
              onChange={(e) => setNewCheckCat(e.target.value as ChecklistItem["category"])}
              className="text-xs px-2.5 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none"
            >
              <option value="business">업무</option>
              <option value="electronics">기기</option>
              <option value="clothing">의류</option>
              <option value="medicine">약품</option>
              <option value="documents">서류</option>
            </select>
            <input
              type="text"
              placeholder="준비물 입력..."
              value={newCheckText}
              onChange={(e) => setNewCheckText(e.target.value)}
              className="flex-1 text-xs px-3 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-blue)]"
            />
            <button
              type="submit"
              className="notion-button-primary py-2 px-3.5 text-xs active:scale-[0.97] cursor-pointer shrink-0"
            >
              추가
            </button>
          </form>

          <div className="space-y-2">
            {checklist.map((item) => (
              <article
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  item.checked
                    ? "border-[var(--color-border)] bg-[var(--color-surface-alt)] opacity-60"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm"
                }`}
              >
                <div
                  onClick={() => onToggleChecklist(item.id)}
                  className="flex items-start gap-2.5 flex-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => {}}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[var(--color-blue)] focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className={`text-xs font-semibold ${item.checked ? "line-through text-slate-400" : "text-[var(--color-foreground)]"}`}>
                      {item.text}
                    </span>
                    {item.proTip && (
                      <p className="text-[11px] text-[var(--color-text-warning)] mt-1 font-medium">
                        ✨ {item.proTip}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onDeleteChecklistItem(item.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer active:scale-95"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* 3. Team & Business Cards */}
      {subTab === "team" && (
        <div className="space-y-5">
          {/* 동료 섹션 */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[13px] font-bold text-[var(--color-foreground)]">동료 연락망 ({colleagues.length})</h3>
              <button
                onClick={() => setIsAddingColleague(true)}
                className="text-xs font-bold text-[var(--color-blue)] hover:underline cursor-pointer"
              >
                + 팀원 추가
              </button>
            </div>

            {isAddingColleague && (
              <form onSubmit={handleSaveColleague} className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2.5 text-xs shadow-md">
                <input
                  type="text"
                  placeholder="이름 (예: 박부장)"
                  value={colName}
                  onChange={(e) => setColName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                />
                <input
                  type="text"
                  placeholder="역할"
                  value={colRole}
                  onChange={(e) => setColRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                />
                <input
                  type="text"
                  placeholder="전화번호"
                  value={colPhone}
                  onChange={(e) => setColPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                />
                <input
                  type="text"
                  placeholder="호텔 룸 넘버"
                  value={colRoom}
                  onChange={(e) => setColRoom(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingColleague(false)}
                    className="notion-button-secondary py-1.5 px-3 text-xs"
                  >
                    취소
                  </button>
                  <button type="submit" className="notion-button-primary py-1.5 px-4 text-xs">
                    저장
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {colleagues.map((col) => (
                <article
                  key={col.id}
                  className="os-virtualized-card w-full overflow-hidden rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-sm space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">{col.name}</h4>
                      <p className="text-[11px] text-[var(--color-text-secondary)]">{col.role}</p>
                    </div>
                    <span className="shrink-0 rounded-[4px] border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">
                      {col.status}
                    </span>
                  </div>

                  <div className="text-xs space-y-1 text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] p-2.5 rounded-xl border border-[var(--color-border)]">
                    <div className="flex items-center justify-between">
                      <span>전화번호</span>
                      <a href={`tel:${col.phone}`} className="font-mono text-[var(--color-blue)] font-bold hover:underline">
                        {col.phone}
                      </a>
                    </div>
                    {col.roomNumber && (
                      <div className="flex items-center justify-between">
                        <span>호텔 룸</span>
                        <span className="font-bold text-[var(--color-foreground)]">{col.roomNumber}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => onDeleteColleague(col.id)}
                      className="text-slate-400 hover:text-rose-600 text-[11px] cursor-pointer"
                    >
                      삭제
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* 명함 레코드 */}
          <div className="space-y-2.5 pt-2 border-t border-[var(--color-border)]">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[13px] font-bold text-[var(--color-foreground)]">현장 명함 & 미팅 ({businessCards.length})</h3>
              <button
                onClick={() => setIsAddingCard(true)}
                className="text-xs font-bold text-[var(--color-blue)] hover:underline cursor-pointer"
              >
                + 명함 등록
              </button>
            </div>

            {isAddingCard && (
              <form onSubmit={handleSaveBusinessCard} className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2.5 text-xs shadow-md">
                <input
                  type="text"
                  placeholder="이름 *"
                  value={bcName}
                  onChange={(e) => setBcName(e.target.value)}
                  className="w-full p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                />
                <input
                  type="text"
                  placeholder="회사명 *"
                  value={bcCompany}
                  onChange={(e) => setBcCompany(e.target.value)}
                  className="w-full p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                />
                <input
                  type="text"
                  placeholder="직책"
                  value={bcRole}
                  onChange={(e) => setBcRole(e.target.value)}
                  className="w-full p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                />
                <input
                  type="email"
                  placeholder="이메일"
                  value={bcEmail}
                  onChange={(e) => setBcEmail(e.target.value)}
                  className="w-full p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                />
                <textarea
                  rows={2}
                  placeholder="나눈 대화 요약..."
                  value={bcNotes}
                  onChange={(e) => setBcNotes(e.target.value)}
                  className="w-full p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingCard(false)}
                    className="notion-button-secondary py-1.5 px-3 text-xs"
                  >
                    취소
                  </button>
                  <button type="submit" className="notion-button-primary py-1.5 px-4 text-xs">
                    저장
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {businessCards.map((card) => (
                <article
                  key={card.id}
                  className="os-virtualized-card w-full overflow-hidden rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-sm space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">{card.name}</h4>
                      <p className="text-[11px] text-[var(--color-blue)] font-semibold">{card.company} · {card.role}</p>
                    </div>
                    <button
                      onClick={() => onDeleteBusinessCard(card.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {card.keyDiscussion && (
                    <p className="text-xs text-slate-600 bg-[var(--color-surface-alt)] p-2.5 rounded-xl border border-[var(--color-border)]">
                      💬 {card.keyDiscussion}
                    </p>
                  )}

                  {card.email && (
                    <a href={`mailto:${card.email}`} className="text-xs text-[var(--color-blue)] hover:underline flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span>{card.email}</span>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Expenses & Report SubTab */}
      {subTab === "expenses" && (
        <div className="space-y-4">
          {/* Summary Card */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[13px] font-bold text-slate-500 dark:text-slate-400">총 누적 경비 ({(expenses || []).length}건)</span>
              <div className="text-[24px] font-black text-slate-900 dark:text-white stripe-number mt-0.5">
                ${totalUSD.toFixed(2)}
              </div>
            </div>
            <div className="text-right border-l border-slate-200 dark:border-slate-800 pl-4">
              <span className="text-[13px] font-bold text-slate-500 dark:text-slate-400">원화 환산 합계</span>
              <div className="text-[17px] font-black text-emerald-600 dark:text-emerald-400 stripe-number mt-0.5">
                ₩{totalKRW.toLocaleString()}원
              </div>
            </div>
          </div>

          {/* Quick Tip Calculator Button */}
          {onOpenCalculator && (
            <button
              onClick={onOpenCalculator}
              className="w-full min-h-[48px] px-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-800 dark:text-slate-200 font-bold text-[14px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer shadow-xs"
            >
              <DollarSign className="w-4.5 h-4.5 text-emerald-600" />
              <span>미국 식당 팁(15/18/20%) & 더치페이 계산기</span>
            </button>
          )}

          {/* Add Expense Button & Form */}
          <div className="flex justify-between items-center px-1">
            <h3 className="text-[15px] font-black text-slate-900 dark:text-white">지출 내역</h3>
            <button
              onClick={() => setIsAddingExpense(!isAddingExpense)}
              className="px-3.5 py-2 rounded-xl bg-[var(--color-blue)] hover:bg-[var(--color-blue-hover)] text-white font-bold text-[13px] flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              <Plus className="h-4 w-4" />
              <span>{isAddingExpense ? "닫기" : "지출 등록"}</span>
            </button>
          </div>

          {isAddingExpense && (
            <form onSubmit={handleSaveExpense} className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-sm shadow-md">
              <h4 className="text-[15px] font-black text-slate-900 dark:text-white">새 지출 등록</h4>
              <div className="grid grid-cols-2 gap-2.5">
                <input
                  type="date"
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                  className="min-h-[44px] px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                />
                <select
                  value={expCat}
                  onChange={(e) => setExpCat(e.target.value as ExpenseRecord["category"])}
                  className="min-h-[44px] px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="meals">식비</option>
                  <option value="transport">교통비</option>
                  <option value="drinks">음료/카페</option>
                  <option value="hotel">호텔</option>
                  <option value="shopping">선물/기타</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="금액"
                    value={expUSD}
                    onChange={(e) => setExpUSD(Number(e.target.value))}
                    className="w-full min-h-[44px] pl-7 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>
                <select
                  value={expMethod}
                  onChange={(e) => setExpMethod(e.target.value as ExpenseRecord["paymentMethod"])}
                  className="min-h-[44px] px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="법인카드">법인카드</option>
                  <option value="개인카드">개인카드</option>
                  <option value="현금">현금</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="지출 내역 상세 메모 (예: 팀 디너 식사)"
                value={expDesc}
                onChange={(e) => setExpDesc(e.target.value)}
                className="w-full min-h-[44px] px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              />

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingExpense(false)}
                  className="min-h-[42px] px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="min-h-[42px] px-5 rounded-xl bg-[var(--color-blue)] text-white font-bold shadow-xs active:scale-95"
                >
                  저장
                </button>
              </div>
            </form>
          )}

          {/* Expense Item List */}
          <div className="space-y-2.5">
            {(expenses || []).length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6 text-center text-sm text-slate-400 font-medium">
                등록된 지출 내역이 없습니다.
              </div>
            ) : (
              (expenses || []).map((exp) => (
                <article
                  key={exp.id}
                  className="os-virtualized-card w-full rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11.5px] font-bold">
                        {exp.paymentMethod}
                      </span>
                      <span className="text-[12px] text-slate-400 font-mono">{exp.date}</span>
                    </div>
                    <p className="text-[15px] font-black text-slate-900 dark:text-white truncate">
                      {exp.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-[16px] font-black text-slate-900 dark:text-white stripe-number">
                        ${exp.amountUSD.toFixed(2)}
                      </p>
                      <p className="text-[12px] text-slate-400 font-medium stripe-number">
                        약 ₩{exp.amountKRW.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => onDeleteExpense(exp.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Travel Summary Report Card */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-[var(--color-blue)]" />
                <h4 className="text-[15px] font-black text-slate-900 dark:text-white">
                  출장 결과 보고서 원클릭 생성
                </h4>
              </div>
              <button
                onClick={handleCopyReport}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-[12px] flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedReport ? "복사됨!" : "전체 복사"}</span>
              </button>
            </div>
            <textarea
              readOnly
              rows={8}
              value={generateReportText()}
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono text-xs leading-relaxed focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* 5. Safety */}
      {subTab === "safety" && (
        <div className="space-y-3">
          <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4 space-y-2 text-xs">
            <h3 className="font-bold text-red-600 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              <span>샌프란시스코 치안 수칙</span>
            </h3>
            <p className="text-slate-700 leading-relaxed font-medium">
              1. <strong>Tenderloin 구역 절대 도보 진입 금지</strong> (우버 탑승)<br />
              2. 길거리 보행 시 휴대폰 보며 걷지 않기<br />
              3. 가방은 몸 앞쪽으로 메고 다닐 것
            </p>
          </div>

          <div className="space-y-2">
            {safetyZones.map((zone) => (
              <article
                key={zone.id}
                className="os-virtualized-card w-full rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-sm space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-[var(--color-foreground)]">{zone.name}</h5>
                  <span
                    className={`shrink-0 rounded-[4px] border px-1.5 py-0.5 text-[10px] font-bold ${
                      zone.status === "danger"
                        ? "border-red-100 bg-red-50 text-red-600"
                        : "border-emerald-100 bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {zone.status === "danger" ? "진입 금지" : "안전 구역"}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--color-text-secondary)]">{zone.description}</p>
                <p className="text-[11px] text-[var(--color-blue)] font-bold bg-blue-50/50 p-2 rounded-lg">
                  🛡️ {zone.safetyRule}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
