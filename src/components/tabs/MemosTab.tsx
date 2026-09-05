import React, { useState, useRef } from "react";
import { 
  StickyNote, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Pin, 
  PinOff, 
  Image as ImageIcon, 
  Camera, 
  X, 
  MapPin, 
  Tag, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Loader2
} from "lucide-react";
import { MemoItem, MemoCategory } from "../../types";
import { compressImage } from "../../utils/imageCompressor";

interface MemosTabProps {
  memos: MemoItem[];
  onAddMemo: (memo: MemoItem) => void;
  onUpdateMemo: (memo: MemoItem) => void;
  onDeleteMemo: (id: string) => void;
  onTogglePinMemo: (id: string) => void;
}

const CATEGORY_META: Record<
  MemoCategory, 
  { label: string; icon: string; bg: string; text: string; border: string }
> = {
  session: { 
    label: "세션/학습", 
    icon: "🏢", 
    bg: "bg-blue-50 dark:bg-blue-950/40", 
    text: "text-blue-700 dark:text-blue-300", 
    border: "border-blue-200 dark:border-blue-800" 
  },
  idea: { 
    label: "아이디어", 
    icon: "💡", 
    bg: "bg-amber-50 dark:bg-amber-950/40", 
    text: "text-amber-700 dark:text-amber-300", 
    border: "border-amber-200 dark:border-amber-800" 
  },
  dining: { 
    label: "맛집/카페", 
    icon: "🍽️", 
    bg: "bg-emerald-50 dark:bg-emerald-950/40", 
    text: "text-emerald-700 dark:text-emerald-300", 
    border: "border-emerald-200 dark:border-emerald-800" 
  },
  shopping: { 
    label: "쇼핑/영수증", 
    icon: "🛍️", 
    bg: "bg-purple-50 dark:bg-purple-950/40", 
    text: "text-purple-700 dark:text-purple-300", 
    border: "border-purple-200 dark:border-purple-800" 
  },
  sightseeing: { 
    label: "명소/풍경", 
    icon: "📍", 
    bg: "bg-rose-50 dark:bg-rose-950/40", 
    text: "text-rose-700 dark:text-rose-300", 
    border: "border-rose-200 dark:border-rose-800" 
  },
  general: { 
    label: "일상/기타", 
    icon: "💬", 
    bg: "bg-slate-50 dark:bg-slate-800/60", 
    text: "text-slate-700 dark:text-slate-300", 
    border: "border-slate-200 dark:border-slate-700" 
  }
};

const QUICK_LOCATIONS = [
  "Moscone West",
  "Moscone South",
  "Salesforce Tower",
  "City View 라운지",
  "블루보틀 민트플라자",
  "Milton St 숙소"
];

export const MemosTab: React.FC<MemosTabProps> = ({
  memos,
  onAddMemo,
  onUpdateMemo,
  onDeleteMemo,
  onTogglePinMemo
}) => {
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);

  // Form State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingMemoId, setEditingMemoId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<MemoCategory>("session");
  const [formContent, setFormContent] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formPhotos, setFormPhotos] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);

  // Lightbox Viewer State
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    photos: string[];
    currentIndex: number;
    title: string;
  }>({
    isOpen: false,
    photos: [],
    currentIndex: 0,
    title: ""
  });

  // Copy Feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Open Create Form
  const handleOpenCreate = () => {
    setEditingMemoId(null);
    setFormTitle("");
    setFormCategory("session");
    setFormContent("");
    setFormLocation("");
    setFormTags("");
    setFormPhotos([]);
    setIsEditorOpen(true);
  };

  // Open Edit Form
  const handleOpenEdit = (memo: MemoItem) => {
    setEditingMemoId(memo.id);
    setFormTitle(memo.title);
    setFormCategory(memo.category);
    setFormContent(memo.content);
    setFormLocation(memo.location || "");
    setFormTags(memo.tags ? memo.tags.join(", ") : "");
    setFormPhotos([...memo.photos]);
    setIsEditorOpen(true);
  };

  // Handle Image Files with Compression
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressing(true);
    try {
      const newPhotos: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) continue;
        const compressed = await compressImage(file, 1280, 1280, 0.82);
        newPhotos.push(compressed);
      }
      setFormPhotos((prev) => [...prev, ...newPhotos]);
    } catch (err) {
      console.error(err);
      alert("이미지 처리 중 오류가 발생했습니다.");
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Remove Photo from Form
  const handleRemovePhoto = (index: number) => {
    setFormPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Save Memo
  const handleSaveMemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() && !formContent.trim() && formPhotos.length === 0) {
      alert("제목이나 내용, 또는 사진 중 하나 이상을 입력해주세요.");
      return;
    }

    const tagList = formTags
      .split(/[,#\s]+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const nowStr = new Date().toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });

    if (editingMemoId) {
      const existing = memos.find((m) => m.id === editingMemoId);
      if (!existing) return;
      const updated: MemoItem = {
        ...existing,
        title: formTitle.trim() || "무제 메모",
        content: formContent.trim(),
        category: formCategory,
        location: formLocation.trim() || undefined,
        tags: tagList,
        photos: formPhotos,
        updatedAt: nowStr
      };
      onUpdateMemo(updated);
    } else {
      const newMemo: MemoItem = {
        id: `memo-${Date.now()}`,
        title: formTitle.trim() || "현장 메모",
        content: formContent.trim(),
        category: formCategory,
        location: formLocation.trim() || undefined,
        tags: tagList,
        photos: formPhotos,
        createdAt: nowStr,
        isPinned: false
      };
      onAddMemo(newMemo);
    }

    setIsEditorOpen(false);
  };

  // Delete Memo with Confirmation
  const handleDeleteClick = (id: string, title: string) => {
    if (confirm(`'${title}' 메모를 삭제하시겠습니까?`)) {
      onDeleteMemo(id);
    }
  };

  // Copy Memo text to clipboard
  const handleCopyMemo = (memo: MemoItem) => {
    const text = `[${CATEGORY_META[memo.category].label}] ${memo.title}\n📍 ${memo.location || "위치 미지정"}\n⏱️ ${memo.createdAt}\n\n${memo.content}`;
    navigator.clipboard.writeText(text);
    setCopiedId(memo.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Open Lightbox
  const handleOpenLightbox = (photos: string[], index: number, title: string) => {
    setLightboxState({
      isOpen: true,
      photos,
      currentIndex: index,
      title
    });
  };

  // Filtered & Sorted Memos
  const filteredMemos = memos
    .filter((memo) => {
      // Category filter
      if (selectedCategory !== "all" && memo.category !== selectedCategory) {
        return false;
      }
      // Pinned filter
      if (showPinnedOnly && !memo.isPinned) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = memo.title.toLowerCase().includes(query);
        const matchContent = memo.content.toLowerCase().includes(query);
        const matchLoc = memo.location?.toLowerCase().includes(query);
        const matchTags = memo.tags?.some((t) => t.toLowerCase().includes(query));
        return matchTitle || matchContent || matchLoc || matchTags;
      }
      return true;
    })
    .sort((a, b) => {
      // Pinned first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      // Then newest first
      return b.id.localeCompare(a.id);
    });

  const totalPhotosCount = memos.reduce((acc, m) => acc + m.photos.length, 0);

  return (
    <div className="space-y-5 pb-24 animate-in fade-in duration-200 max-w-2xl mx-auto">
      {/* 1. Header Banner */}
      <section className="notion-card bg-gradient-to-br from-[#1d4ed8]/10 via-[#3b82f6]/5 to-transparent border-[var(--color-border)] p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FIELD NOTES & PHOTO LOG</span>
            </div>
            <h1 className="text-xl font-black tracking-tight text-[var(--color-foreground)]">
              현장 메모 & 사진 보관
            </h1>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 leading-relaxed">
              세션 발표 슬라이드, 현장 부스, 맛집, 영수증 등 사진과 텍스트를 자유롭게 남겨보세요.
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="notion-button-primary shrink-0 flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold shadow-md cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>메모 작성</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[var(--color-border)]/60 text-center">
          <div className="bg-[var(--color-surface)]/80 rounded-xl p-2 border border-[var(--color-border)]/50">
            <span className="text-[10px] text-[var(--color-text-secondary)] block font-medium">총 메모</span>
            <span className="text-base font-extrabold text-[var(--color-foreground)]">{memos.length}건</span>
          </div>
          <div className="bg-[var(--color-surface)]/80 rounded-xl p-2 border border-[var(--color-border)]/50">
            <span className="text-[10px] text-[var(--color-text-secondary)] block font-medium">첨부 사진</span>
            <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">{totalPhotosCount}장</span>
          </div>
          <div className="bg-[var(--color-surface)]/80 rounded-xl p-2 border border-[var(--color-border)]/50">
            <span className="text-[10px] text-[var(--color-text-secondary)] block font-medium">상단 고정</span>
            <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">
              {memos.filter((m) => m.isPinned).length}건
            </span>
          </div>
        </div>
      </section>

      {/* 2. Search & Filter Bar */}
      <section className="space-y-2.5">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="메모 제목, 내용, 태그, 위치 검색..."
            className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-foreground)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-blue-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[var(--color-foreground)] text-[var(--color-surface)] shadow-2xs"
                : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-slate-400"
            }`}
          >
            전체 ({memos.length})
          </button>

          {(Object.keys(CATEGORY_META) as MemoCategory[]).map((catKey) => {
            const meta = CATEGORY_META[catKey];
            const isSelected = selectedCategory === catKey;
            const count = memos.filter((m) => m.category === catKey).length;
            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-2.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-slate-400"
                }`}
              >
                <span>{meta.icon}</span>
                <span>{meta.label}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}

          <button
            onClick={() => setShowPinnedOnly(!showPinnedOnly)}
            className={`px-2.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ml-auto ${
              showPinnedOnly
                ? "bg-amber-500 text-white shadow-2xs"
                : "bg-[var(--color-surface)] text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60"
            }`}
          >
            <Pin className="w-3 h-3" />
            <span>고정만</span>
          </button>
        </div>
      </section>

      {/* 3. Memo List */}
      <section className="space-y-3.5">
        {filteredMemos.length === 0 ? (
          <div className="notion-card p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-500 flex items-center justify-center mx-auto">
              <StickyNote className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-[var(--color-foreground)]">
              {searchQuery ? "검색 결과와 일치하는 메모가 없습니다" : "작성된 메모가 없습니다"}
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] max-w-xs mx-auto">
              {searchQuery
                ? "다른 검색어나 카테고리 필터를 선택해 보세요."
                : "세션 요약이나 현장 사진, 맛집 메모를 첫 번째로 남겨보세요!"}
            </p>
            {!searchQuery && (
              <button
                onClick={handleOpenCreate}
                className="notion-button-primary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold mt-2"
              >
                <Plus className="w-4 h-4" />
                <span>첫 메모 남기기</span>
              </button>
            )}
          </div>
        ) : (
          filteredMemos.map((memo) => {
            const cat = CATEGORY_META[memo.category] || CATEGORY_META.general;
            const isCopied = copiedId === memo.id;

            return (
              <div
                key={memo.id}
                className={`notion-card p-4 space-y-3 transition-all relative ${
                  memo.isPinned
                    ? "border-amber-300 dark:border-amber-700/60 bg-gradient-to-b from-amber-500/[0.04] to-transparent shadow-sm"
                    : "border-[var(--color-border)]"
                }`}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {/* Category Badge */}
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold border ${cat.bg} ${cat.text} ${cat.border}`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </span>

                    {/* Location Badge */}
                    {memo.location && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-[11px] font-medium bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                        <MapPin className="w-3 h-3 text-red-500" />
                        <span>{memo.location}</span>
                      </span>
                    )}

                    {/* Date */}
                    <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
                      {memo.createdAt}
                      {memo.updatedAt && " (수정됨)"}
                    </span>
                  </div>

                  {/* Pin Toggle */}
                  <button
                    onClick={() => onTogglePinMemo(memo.id)}
                    title={memo.isPinned ? "고정 해제" : "상단 고정"}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      memo.isPinned
                        ? "text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-950/60"
                        : "text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {memo.isPinned ? <Pin className="w-4 h-4 fill-amber-500" /> : <PinOff className="w-4 h-4" />}
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[var(--color-foreground)] tracking-tight">
                  {memo.title}
                </h3>

                {/* Content */}
                {memo.content && (
                  <p className="text-xs leading-relaxed text-[var(--color-foreground)]/90 whitespace-pre-wrap font-normal">
                    {memo.content}
                  </p>
                )}

                {/* Photo Gallery Grid */}
                {memo.photos && memo.photos.length > 0 && (
                  <div className="pt-1">
                    {memo.photos.length === 1 ? (
                      <div
                        onClick={() => handleOpenLightbox(memo.photos, 0, memo.title)}
                        className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] bg-black/5 dark:bg-black/20 max-h-72 cursor-pointer group"
                      >
                        <img
                          src={memo.photos[0]}
                          alt={memo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 bg-black/70 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs transition-opacity">
                            클릭하여 확대
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-1.5 rounded-2xl overflow-hidden">
                        {memo.photos.map((photo, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleOpenLightbox(memo.photos, idx, memo.title)}
                            className="aspect-square relative rounded-xl overflow-hidden border border-[var(--color-border)] bg-black/5 dark:bg-black/20 cursor-pointer group"
                          >
                            <img
                              src={photo}
                              alt={`${memo.title} - ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tags Row */}
                {memo.tags && memo.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {memo.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-0.5 text-[10px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md"
                      >
                        <Tag className="w-2.5 h-2.5" />
                        <span>#{t}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]/60 text-xs">
                  <button
                    onClick={() => handleCopyMemo(memo)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--color-text-secondary)] hover:text-blue-600 py-1 px-2 rounded-lg hover:bg-[var(--color-surface-alt)] transition-colors cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">복사됨!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>내용 복사</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(memo)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--color-text-secondary)] hover:text-blue-600 py-1 px-2 rounded-lg hover:bg-[var(--color-surface-alt)] transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>수정</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(memo.id, memo.title)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--color-text-secondary)] hover:text-red-600 py-1 px-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>삭제</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* 4. Memo Editor Modal (Create & Edit) */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-xs p-0 md:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl max-h-[92vh] flex flex-col rounded-t-[32px] md:rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
              <div>
                <span className="notion-kicker">
                  {editingMemoId ? "EDIT NOTE" : "NEW FIELD NOTE"}
                </span>
                <h2 className="text-lg font-black tracking-tight text-[var(--color-foreground)]">
                  {editingMemoId ? "현장 메모 수정" : "새 현장 메모 & 사진 등록"}
                </h2>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveMemo} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              {/* Category Selection */}
              <div>
                <label className="block font-bold text-[var(--color-foreground)] mb-1.5">
                  카테고리 선택
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(Object.keys(CATEGORY_META) as MemoCategory[]).map((catKey) => {
                    const meta = CATEGORY_META[catKey];
                    const isSelected = formCategory === catKey;
                    return (
                      <button
                        type="button"
                        key={catKey}
                        onClick={() => setFormCategory(catKey)}
                        className={`p-2 rounded-xl text-left border flex items-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? `${meta.bg} ${meta.text} ${meta.border} font-bold ring-2 ring-blue-500/20 shadow-2xs`
                            : "bg-[var(--color-surface-alt)] border-[var(--color-border)] text-[var(--color-text-secondary)]"
                        }`}
                      >
                        <span className="text-base">{meta.icon}</span>
                        <span className="text-xs truncate">{meta.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block font-bold text-[var(--color-foreground)] mb-1">
                  메모 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="예: Agentforce 키노트 핵심 발표 요약"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-xs text-[var(--color-foreground)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block font-bold text-[var(--color-foreground)] mb-1">
                  위치 / 장소 (선택)
                </label>
                <input
                  type="text"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="예: Moscone West 3F Keynote Hall"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-xs text-[var(--color-foreground)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-blue-500"
                />
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {QUICK_LOCATIONS.map((loc) => (
                    <button
                      type="button"
                      key={loc}
                      onClick={() => setFormLocation(loc)}
                      className="text-[10px] text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] hover:text-blue-600 px-2 py-0.5 rounded border border-[var(--color-border)] cursor-pointer"
                    >
                      + {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Textarea */}
              <div>
                <label className="block font-bold text-[var(--color-foreground)] mb-1">
                  상세 메모 내용
                </label>
                <textarea
                  rows={6}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="현장에서 들은 발표 내용, 질문 사항, 부스 데모 후기 등을 자유롭게 적어보세요..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-xs text-[var(--color-foreground)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-blue-500 leading-relaxed font-normal"
                />
              </div>

              {/* Photo Upload Area */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-[var(--color-foreground)]">
                    현장 사진 첨부 ({formPhotos.length}장)
                  </label>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    ⚡ 고화질 자동 압축 저장
                  </span>
                </div>

                {/* Upload Buttons */}
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isCompressing}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-blue-400/60 bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    {isCompressing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>사진 최적화 압축 중...</span>
                      </>
                    ) : (
                      <>
                        <Camera className="w-4 h-4" />
                        <span>카메라 촬영 / 갤러리 사진 추가</span>
                      </>
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>

                {/* Photo Previews */}
                {formPhotos.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 pt-1">
                    {formPhotos.map((photo, idx) => (
                      <div key={idx} className="aspect-square relative rounded-xl overflow-hidden border border-[var(--color-border)] group">
                        <img src={photo} alt={`첨부 ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(idx)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition-colors cursor-pointer"
                          title="사진 삭제"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block font-bold text-[var(--color-foreground)] mb-1">
                  태그 입력 (쉼표로 구분)
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="예: AI, 키노트, 데모, 쇼핑"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-xs text-[var(--color-foreground)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2 pt-3 border-t border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="notion-button-secondary flex-1 py-3 text-xs font-bold cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isCompressing}
                  className="notion-button-primary flex-1 py-3 text-xs font-bold cursor-pointer disabled:opacity-50"
                >
                  {editingMemoId ? "수정 완료" : "메모 저장"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Lightbox Fullscreen Photo Viewer */}
      {lightboxState.isOpen && (
        <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 animate-in fade-in duration-200">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white py-2 px-2 max-w-4xl mx-auto w-full">
            <div>
              <p className="text-xs font-bold truncate max-w-xs">{lightboxState.title}</p>
              <p className="text-[11px] text-slate-400">
                {lightboxState.currentIndex + 1} / {lightboxState.photos.length}
              </p>
            </div>
            <button
              onClick={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image Stage */}
          <div className="flex-1 flex items-center justify-center relative max-w-4xl mx-auto w-full">
            <img
              src={lightboxState.photos[lightboxState.currentIndex]}
              alt={lightboxState.title}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            {/* Navigation buttons for multiple photos */}
            {lightboxState.photos.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setLightboxState((prev) => ({
                      ...prev,
                      currentIndex:
                        prev.currentIndex === 0 ? prev.photos.length - 1 : prev.currentIndex - 1
                    }))
                  }
                  className="absolute left-2 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setLightboxState((prev) => ({
                      ...prev,
                      currentIndex:
                        prev.currentIndex === prev.photos.length - 1 ? 0 : prev.currentIndex + 1
                    }))
                  }
                  className="absolute right-2 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          {lightboxState.photos.length > 1 && (
            <div className="flex justify-center gap-2 py-2 overflow-x-auto">
              {lightboxState.photos.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxState((prev) => ({ ...prev, currentIndex: idx }))}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    lightboxState.currentIndex === idx
                      ? "border-blue-500 scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={p} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
