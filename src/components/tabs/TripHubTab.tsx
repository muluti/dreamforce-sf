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
  X
} from "lucide-react";
import { 
  TravelDocument, 
  ChecklistItem, 
  ColleagueContact, 
  BusinessCardRecord, 
  SafetyZone, 
  MediaItem 
} from "../../types";

interface TripHubTabProps {
  documents: TravelDocument[];
  checklist: ChecklistItem[];
  colleagues: ColleagueContact[];
  businessCards: BusinessCardRecord[];
  safetyZones: SafetyZone[];
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
  onOpenMediaModal: (title: string, mediaList: MediaItem[], onUpdate: (items: MediaItem[]) => void) => void;
}

export const TripHubTab: React.FC<TripHubTabProps> = ({
  documents,
  checklist,
  colleagues,
  businessCards,
  safetyZones,
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
  onOpenMediaModal
}) => {
  const [subTab, setSubTab] = useState<"docs" | "checklist" | "team" | "safety">("docs");

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

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto">
      {/* 3절 헤더 레이블 */}
      <div className="px-1">
        <p className="notion-kicker">TRIP HUB</p>
        <h2 className="text-[18px] font-bold text-[var(--color-foreground)] tracking-tight">출장 허브</h2>
      </div>

      {/* 4절 Stat Tab (서브 네비게이션 4개) */}
      <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
        {(["docs", "checklist", "team", "safety"] as const).map((tab) => {
          const isActive = subTab === tab;
          const labels = { docs: "서류", checklist: "패킹", team: "동료/명함", safety: "치안" };
          const icons = { docs: FileText, checklist: CheckSquare, team: Users, safety: ShieldAlert };
          const Icon = icons[tab];

          return (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              className={`py-2 px-1 text-center rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 ${
                isActive
                  ? "bg-[var(--color-blue)] text-white shadow-sm"
                  : "text-[#64748d] hover:text-[#061b31]"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{labels[tab]}</span>
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
                className="os-virtualized-card w-full overflow-hidden rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="shrink-0 rounded-[4px] border border-blue-100 bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-600 mb-1 inline-block">
                      {doc.subtitle}
                    </span>
                    <h4 className="text-[15px] font-semibold text-[var(--color-foreground)] tracking-tight">{doc.title}</h4>
                  </div>

                  <button
                    onClick={() =>
                      onOpenMediaModal(
                        doc.title,
                        doc.media || [],
                        (updatedList) => onUpdateDocument({ ...doc, media: updatedList })
                      )
                    }
                    className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer font-bold ${
                      hasMedia
                        ? "bg-blue-50 text-[var(--color-blue)] border border-blue-200"
                        : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                    }`}
                  >
                    <Film className="h-3.5 w-3.5" />
                    <span>{hasMedia ? `사진 (${doc.media?.length})` : "+ 사진"}</span>
                  </button>
                </div>

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

      {/* 4. Safety */}
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
