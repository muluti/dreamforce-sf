import React, { useState } from "react";
import { 
  Compass, 
  LayoutGrid, 
  List as ListIcon, 
  CheckCircle2, 
  Circle, 
  MapPin, 
  Navigation, 
  ShoppingCart, 
  BookOpen, 
  Film, 
  Sparkles, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Clock, 
  Phone, 
  Star, 
  Building2, 
  Home, 
  Eye, 
  X, 
  ChevronDown, 
  ChevronUp, 
  CalendarDays,
  Tag
} from "lucide-react";
import { PlaceItem } from "../../types";

interface PlacesTabProps {
  places: PlaceItem[];
  onToggleVisited: (id: string) => void;
  onAddPlace: (place: PlaceItem) => void;
  onUpdatePlace: (place: PlaceItem) => void;
  onDeletePlace: (id: string) => void;
}

const CATEGORY_MAP: Record<string, { label: string; icon: any; color: string }> = {
  all: { label: "전체", icon: Compass, color: "text-[var(--color-blue)]" },
  mart_shopping: { label: "🛒 마트 & 쇼핑", icon: ShoppingCart, color: "text-amber-600 dark:text-amber-400" },
  bookstore: { label: "📚 서점 & 문화", icon: BookOpen, color: "text-indigo-600 dark:text-indigo-400" },
  near_lodging: { label: "🏡 숙소 근처 (Glen Park)", icon: Home, color: "text-emerald-600 dark:text-emerald-400" },
  near_moscone: { label: "🏢 행사장 근처 (Moscone)", icon: Building2, color: "text-blue-600 dark:text-blue-400" },
  mission: { label: "🌮 미션 (Mission)", icon: Tag, color: "text-orange-600 dark:text-orange-400" },
  viewpoint: { label: "🌉 전망 & 뷰포인트", icon: Eye, color: "text-cyan-600 dark:text-cyan-400" },
  landmark: { label: "🏛️ SF 랜드마크", icon: Compass, color: "text-violet-600 dark:text-violet-400" },
  cinema_tour: { label: "🎬 영화 성지순례", icon: Film, color: "text-rose-600 dark:text-rose-400" },
  custom: { label: "⭐ 직접 추가한 곳", icon: Sparkles, color: "text-purple-600 dark:text-purple-400" }
};

export const PlacesTab: React.FC<PlacesTabProps> = ({
  places,
  onToggleVisited,
  onAddPlace,
  onUpdatePlace,
  onDeletePlace
}) => {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visitedFilter, setVisitedFilter] = useState<"all" | "unvisited" | "visited">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showItineraryGuide, setShowItineraryGuide] = useState(false);
  const [selectedPlaceDetail, setSelectedPlaceDetail] = useState<PlaceItem | null>(null);

  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formNameEn, setFormNameEn] = useState("");
  const [formCategory, setFormCategory] = useState<PlaceItem["category"]>("mart_shopping");
  const [formRating, setFormRating] = useState<string>("4.5");
  const [formAddress, setFormAddress] = useState("");
  const [formLocationTag, setFormLocationTag] = useState("");
  const [formHours, setFormHours] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formShoppingTips, setFormShoppingTips] = useState("");
  const [formThemeTags, setFormThemeTags] = useState("");
  const [formPriority, setFormPriority] = useState<PlaceItem["priority"]>("recommended");

  // Stats
  const totalCount = places.length;
  const visitedCount = places.filter((p) => p.visited).length;
  const visitPercentage = totalCount > 0 ? Math.round((visitedCount / totalCount) * 100) : 0;

  // Filtered Places
  const filteredPlaces = places.filter((place) => {
    // 1. Category Filter
    if (selectedCategory !== "all" && place.category !== selectedCategory) {
      return false;
    }

    // 2. Visited Filter
    if (visitedFilter === "visited" && !place.visited) return false;
    if (visitedFilter === "unvisited" && place.visited) return false;

    // 3. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = place.name.toLowerCase().includes(q);
      const matchNameEn = place.nameEn.toLowerCase().includes(q);
      const matchAddress = place.address.toLowerCase().includes(q);
      const matchLocTag = place.locationTag.toLowerCase().includes(q);
      const matchDesc = place.description.toLowerCase().includes(q);
      const matchTags = place.themeTags.some((t) => t.toLowerCase().includes(q));
      const matchTips = place.shoppingTips?.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchNameEn && !matchAddress && !matchLocTag && !matchDesc && !matchTags && !matchTips) {
        return false;
      }
    }

    return true;
  });

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormName("");
    setFormNameEn("");
    setFormCategory("mart_shopping");
    setFormRating("4.5");
    setFormAddress("");
    setFormLocationTag("Moscone 도보 5분");
    setFormHours("매일 09:00 - 21:00");
    setFormPhone("");
    setFormDescription("");
    setFormShoppingTips("");
    setFormThemeTags("쇼핑, 추천스팟");
    setFormPriority("recommended");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: PlaceItem) => {
    setEditingId(p.id);
    setFormName(p.name);
    setFormNameEn(p.nameEn);
    setFormCategory(p.category);
    setFormRating(p.rating ? String(p.rating) : "4.5");
    setFormAddress(p.address);
    setFormLocationTag(p.locationTag);
    setFormHours(p.hours || "");
    setFormPhone(p.phone || "");
    setFormDescription(p.description);
    setFormShoppingTips(p.shoppingTips ? p.shoppingTips.join("\n") : "");
    setFormThemeTags(p.themeTags.join(", "));
    setFormPriority(p.priority || "recommended");
    setIsModalOpen(true);
  };

  const handleSavePlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const tipsArray = formShoppingTips
      .split("\n")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const tagsArray = formThemeTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const placeData: PlaceItem = {
      id: editingId || `place-${Date.now()}`,
      name: formName.trim(),
      nameEn: formNameEn.trim() || formName.trim(),
      category: formCategory,
      rating: parseFloat(formRating) || 4.5,
      ratingText: `${formRating || "4.5"} · ${CATEGORY_MAP[formCategory]?.label || "추천 명소"}`,
      address: formAddress.trim() || "San Francisco, CA",
      locationTag: formLocationTag.trim() || "San Francisco",
      hours: formHours.trim(),
      phone: formPhone.trim(),
      googleMapsQuery: `${formName.trim()} ${formAddress.trim()}`,
      themeTags: tagsArray.length > 0 ? tagsArray : ["추천명소"],
      description: formDescription.trim(),
      shoppingTips: tipsArray.length > 0 ? tipsArray : undefined,
      priority: formPriority,
      visited: editingId ? (places.find((x) => x.id === editingId)?.visited || false) : false
    };

    if (editingId) {
      onUpdatePlace(placeData);
    } else {
      onAddPlace(placeData);
    }

    setIsModalOpen(false);
  };

  const openGoogleMaps = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-4 pb-28 max-w-md mx-auto">
      {/* 1. Header Title & Top Controls */}
      <div className="flex items-center justify-between px-1">
        <div>
          <p className="notion-kicker flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-[var(--color-blue)]" />
            <span>SAN FRANCISCO SPOTS</span>
          </p>
          <h2 className="text-[18px] font-bold text-[var(--color-foreground)] tracking-tight">
            가볼만한 곳 & 쇼핑
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          {/* View Toggle Button */}
          <div className="flex items-center p-0.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] shadow-2xs">
            <button
              onClick={() => setViewMode("card")}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "card"
                  ? "bg-[var(--color-surface)] text-[var(--color-blue)] shadow-xs font-bold"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)]"
              }`}
              title="카드 뷰"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-[var(--color-surface)] text-[var(--color-blue)] shadow-xs font-bold"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)]"
              }`}
              title="리스트 뷰"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Add Spot Button */}
          <button
            onClick={handleOpenAddModal}
            className="notion-button-primary py-1.5 px-3 text-xs flex items-center gap-1 active:scale-[0.97] cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>장소 추가</span>
          </button>
        </div>
      </div>

      {/* 2. Visited Progress Metric Card */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800/50">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[var(--color-text-secondary)]">탐방 달성률</p>
              <h4 className="text-[14px] font-extrabold text-[var(--color-foreground)] tracking-tight">
                {visitedCount}곳 방문 완료 <span className="text-[12px] font-medium text-[var(--color-text-muted)]">/ 전체 {totalCount}곳</span>
              </h4>
            </div>
          </div>
          <div className="text-right">
            <span className="text-base font-mono font-black text-emerald-600 dark:text-emerald-400">
              {visitPercentage}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[var(--color-surface-alt)] rounded-full h-2 overflow-hidden border border-[var(--color-border)]">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.max(visitPercentage, 3)}%` }}
          />
        </div>

        {/* Filter Tabs: All / Unvisited / Visited */}
        <div className="flex items-center justify-between pt-1 border-t border-[var(--color-border)] text-xs">
          <div className="flex gap-1">
            {[
              { id: "all", label: `전체 (${totalCount})` },
              { id: "unvisited", label: `미방문 (${totalCount - visitedCount})` },
              { id: "visited", label: `방문완료 (${visitedCount})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setVisitedFilter(tab.id as any)}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                  visitedFilter === tab.id
                    ? "bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 shadow-2xs"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowItineraryGuide(!showItineraryGuide)}
            className="text-[11px] font-bold text-[var(--color-blue)] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>추천 일정표 {showItineraryGuide ? "닫기" : "보기"}</span>
            {showItineraryGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* 3. Collapsible 9/13~9/18 Itinerary Summary Guide */}
      {showItineraryGuide && (
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/30 p-3.5 space-y-2.5 shadow-xs text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-[var(--color-blue)]">
              <CalendarDays className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-bold text-[var(--color-foreground)]">
                9/13 ~ 9/18 SF 최적 추천 동선 가이드
              </h4>
              <p className="text-[11px] text-[var(--color-text-secondary)]">
                Neighborhood → Cinema → Technology → City
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <div className="p-2.5 rounded-xl bg-[var(--color-surface)] border border-blue-100 dark:border-blue-900/40">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-[var(--color-blue)]">9/13(일) 내가 사는 로컬 SF</span>
                <span className="text-[10.5px] px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">도착일</span>
              </div>
              <p className="text-[11.5px] text-[var(--color-foreground)] leading-relaxed">
                SFO 도착 → 137 Milton St 숙소 체크인 → <strong className="text-amber-700 dark:text-amber-300">Safeway(장보기)</strong> → Glen Canyon Park → Mission District & <strong className="text-amber-700 dark:text-amber-300">Rainbow Grocery(로컬 유기농 마트)</strong> → Dolores Park 일몰
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-[var(--color-surface)] border border-blue-100 dark:border-blue-900/40">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-[var(--color-blue)]">9/14(월) 영화 속 SF & 사전 배지</span>
                <span className="text-[10.5px] px-1.5 py-0.2 rounded bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold">영화 성지</span>
              </div>
              <p className="text-[11.5px] text-[var(--color-foreground)] leading-relaxed">
                <strong className="text-rose-600">Mrs. Doubtfire 힐리어드 집(2640 Steiner St)</strong> → Pacific Heights → 15:30 Moscone 사전 배지 수령 & 캠퍼스 탐방 → Salesforce Park 옥상 정원
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-[var(--color-surface)] border border-blue-100 dark:border-blue-900/40">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-[var(--color-blue)]">9/15(화) Dreamforce Day 1 & 대형 마트</span>
                <span className="text-[10.5px] px-1.5 py-0.2 rounded bg-blue-50 dark:bg-blue-950 text-[var(--color-blue)] font-bold">DF 집중</span>
              </div>
              <p className="text-[11.5px] text-[var(--color-foreground)] leading-relaxed">
                오프닝 키노트 & 부스 탐방 → 17:30 행사장 바로 옆 <strong className="text-amber-700 dark:text-amber-300">Target(789 Mission)</strong> 미국 과자/생활용품/가방 쇼핑 → Yerba Buena Gardens
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-[var(--color-surface)] border border-blue-100 dark:border-blue-900/40">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-[var(--color-blue)]">9/16(수) 문화와 서점의 밤</span>
                <span className="text-[10.5px] px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">서점 탐방</span>
              </div>
              <p className="text-[11.5px] text-[var(--color-foreground)] leading-relaxed">
                Dreamforce AI 세션 → 17:30 Chinatown 드래곤 게이트 → <strong className="text-indigo-600 dark:text-indigo-400">City Lights 역사 서점(261 Columbus)</strong> & <strong className="text-amber-700 dark:text-amber-300">Trader Joe's</strong> → Mrs. Doubtfire 다니엘 아파트(520 Green St) → Coit Tower / Lombard 꽃길
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-[var(--color-surface)] border border-blue-100 dark:border-blue-900/40">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-[var(--color-blue)]">9/17(목) 마지막 SF & 해안 산책</span>
                <span className="text-[10.5px] px-1.5 py-0.2 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-bold">해안 뷰</span>
              </div>
              <p className="text-[11.5px] text-[var(--color-foreground)] leading-relaxed">
                Dreamforce 클로징 & 한국 참가자 랩업 세션(Salesforce Tower) → 17:00 Ferry Building 시계탑 & Embarcadero 해안 산책로 (Bay Bridge 야경) → 마지막 밤 정리
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Search & Category Chips */}
      <div className="space-y-2.5">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="장소명, 주소, 마트 쇼핑 아이템, 태그 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9.5 pr-8 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-foreground)] placeholder-[var(--color-text-muted)] shadow-2xs focus:outline-none focus:border-[var(--color-blue)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Horizontal Scrolling Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {Object.entries(CATEGORY_MAP).map(([key, cat]) => {
            const isSelected = selectedCategory === key;
            const count = key === "all" ? places.length : places.filter((p) => p.category === key).length;
            if (count === 0 && key !== "all") return null;

            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-3 py-1.5 rounded-xl shrink-0 font-bold transition-all cursor-pointer border active:scale-95 flex items-center gap-1.5 ${
                  isSelected
                    ? "border-[var(--color-blue-border)] bg-[var(--color-blue-soft)] text-[var(--color-blue)] shadow-2xs scale-[1.02]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)]"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? "bg-[var(--color-blue)] text-white" : "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Main Places View: Card View OR List View */}
      {filteredPlaces.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-12 text-center text-xs text-[var(--color-text-muted)] space-y-2">
          <Compass className="w-8 h-8 mx-auto text-slate-400 opacity-60" />
          <p className="font-bold text-[var(--color-foreground)]">해당 조건에 맞는 장소가 없습니다.</p>
          <p className="text-[11px]">검색어나 필터 조건을 변경해 보세요.</p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setVisitedFilter("all");
              setSearchQuery("");
            }}
            className="notion-button-secondary text-xs px-3 py-1 mt-2 inline-block cursor-pointer"
          >
            필터 초기화
          </button>
        </div>
      ) : viewMode === "card" ? (
        /* CARD VIEW */
        <div className="space-y-3.5">
          {filteredPlaces.map((place) => {
            const isVisited = place.visited;
            const isMustVisit = place.priority === "must_visit";

            return (
              <article
                key={place.id}
                className={`os-virtualized-card w-full overflow-hidden rounded-2xl border transition-all duration-200 shadow-xs space-y-3 p-4 bg-[var(--color-surface)] relative ${
                  isVisited
                    ? "border-emerald-300/80 dark:border-emerald-800/70 bg-emerald-50/20 dark:bg-emerald-950/10"
                    : "border-[var(--color-border)] hover:border-[var(--color-blue-border)]"
                }`}
              >
                {/* Card Top: Badges & Visited Checkbox */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {/* Category Badge */}
                    <span className="shrink-0 px-2 py-0.5 rounded-md text-[10.5px] font-extrabold bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
                      {CATEGORY_MAP[place.category]?.label || place.category}
                    </span>

                    {/* Must Visit Badge */}
                    {isMustVisit && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-violet-100 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                        ⭐ MUST VISIT
                      </span>
                    )}

                    {/* Rating Badge */}
                    {place.rating && (
                      <span className="shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800">
                        <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                        <span>{place.rating}</span>
                      </span>
                    )}

                    {/* Location Tag */}
                    <span className="shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800">
                      <MapPin className="w-2.5 h-2.5" />
                      <span>{place.locationTag}</span>
                    </span>
                  </div>

                  {/* Visited Toggle Button */}
                  <button
                    onClick={() => onToggleVisited(place.id)}
                    className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-90 border ${
                      isVisited
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-2xs"
                        : "bg-[var(--color-surface-alt)] hover:bg-emerald-50 text-[var(--color-text-secondary)] hover:text-emerald-700 border-[var(--color-border)]"
                    }`}
                  >
                    {isVisited ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                        <span>다녀옴</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5" />
                        <span>체크</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Place Name & English Name */}
                <div 
                  onClick={() => setSelectedPlaceDetail(place)}
                  className="cursor-pointer group"
                >
                  <h3 className={`text-[15px] font-bold tracking-tight text-[var(--color-foreground)] group-hover:text-[var(--color-blue)] transition-colors ${
                    isVisited ? "line-through opacity-80" : ""
                  }`}>
                    {place.name}
                  </h3>
                  <p className="text-[11.5px] font-medium text-[var(--color-text-muted)] font-mono mt-0.5">
                    {place.nameEn}
                  </p>
                </div>

                {/* Description */}
                <p className="text-[12.5px] text-[var(--color-foreground)] leading-relaxed font-normal">
                  {place.description}
                </p>

                {/* Shopping Tips Box (for Marts & Bookstores) */}
                {place.shoppingTips && place.shoppingTips.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/50 space-y-1 text-xs">
                    <p className="font-extrabold text-amber-900 dark:text-amber-200 flex items-center gap-1 text-[11px]">
                      <ShoppingCart className="w-3.5 h-3.5 text-amber-600" />
                      <span>추천 쇼핑 & 기념품 아이템:</span>
                    </p>
                    <ul className="grid grid-cols-1 gap-1 text-[11.5px] text-amber-950/90 dark:text-amber-200/90 font-medium pl-1">
                      {place.shoppingTips.map((tip, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommended Course Box */}
                {place.recommendedCourse && (
                  <div className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-[11.5px] text-blue-950 dark:text-blue-200">
                    <span className="font-bold text-[var(--color-blue)]">🚶 추천 코스: </span>
                    <span>{place.recommendedCourse}</span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {place.themeTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[10.5px] font-medium text-[var(--color-text-secondary)]"
                    >
                      #{tag}
                    </span>
                  ))}
                  {place.hours && (
                    <span className="px-2 py-0.5 rounded-md bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[10.5px] font-mono text-[var(--color-text-muted)] flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{place.hours}</span>
                    </span>
                  )}
                </div>

                {/* Bottom Action Row: Google Maps Navigation & Details */}
                <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {/* Google Maps Button */}
                    <button
                      onClick={() => openGoogleMaps(place.googleMapsQuery)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[var(--color-blue-soft)] hover:bg-blue-100 text-[var(--color-blue)] font-bold text-xs border border-[var(--color-blue-border)] shadow-2xs transition-all active:scale-95 cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5 fill-current" />
                      <span>길찾기 (Google Maps)</span>
                    </button>

                    {/* Call Button */}
                    {place.phone && (
                      <a
                        href={`tel:${place.phone}`}
                        className="inline-flex items-center gap-1 p-1.5 rounded-xl bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)] border border-[var(--color-border)] text-xs transition-all active:scale-95 cursor-pointer"
                        title={place.phone}
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(place)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all cursor-pointer"
                      title="수정"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeletePlace(place.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-all cursor-pointer"
                      title="삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-xs divide-y divide-[var(--color-border)]">
          {filteredPlaces.map((place) => {
            const isVisited = place.visited;

            return (
              <div
                key={place.id}
                className={`p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-colors hover:bg-[var(--color-surface-alt)]/60 ${
                  isVisited ? "bg-emerald-50/20 dark:bg-emerald-950/10" : ""
                }`}
              >
                {/* Left: Checkbox */}
                <button
                  onClick={() => onToggleVisited(place.id)}
                  className={`shrink-0 p-1.5 rounded-xl transition-all cursor-pointer active:scale-90 ${
                    isVisited
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-slate-300 dark:text-slate-600 hover:text-slate-500"
                  }`}
                >
                  {isVisited ? (
                    <CheckCircle2 className="w-5 h-5 fill-emerald-100 dark:fill-emerald-950" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                {/* Middle: Content Info */}
                <div 
                  onClick={() => setSelectedPlaceDetail(place)}
                  className="min-w-0 flex-1 cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="shrink-0 px-1.5 py-0.2 rounded text-[9.5px] font-bold bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                      {CATEGORY_MAP[place.category]?.label.slice(0, 8) || place.category}
                    </span>
                    {place.rating && (
                      <span className="shrink-0 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        {place.rating}
                      </span>
                    )}
                    <span className="shrink-0 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                      {place.locationTag}
                    </span>
                  </div>

                  <h4 className={`text-[13px] font-bold tracking-tight text-[var(--color-foreground)] truncate ${
                    isVisited ? "line-through opacity-70" : ""
                  }`}>
                    {place.name}
                  </h4>
                  <p className="text-[11px] text-[var(--color-text-muted)] truncate font-medium">
                    {place.address}
                  </p>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openGoogleMaps(place.googleMapsQuery)}
                    className="p-2 rounded-xl bg-[var(--color-blue-soft)] text-[var(--color-blue)] hover:bg-blue-100 transition-all active:scale-95 cursor-pointer"
                    title="Google Maps 길찾기"
                  >
                    <Navigation className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <button
                    onClick={() => setSelectedPlaceDetail(place)}
                    className="p-2 rounded-xl bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)] transition-all active:scale-95 cursor-pointer border border-[var(--color-border)]"
                    title="상세 보기"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 6. Place Detail Modal */}
      {selectedPlaceDetail && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                  {CATEGORY_MAP[selectedPlaceDetail.category]?.label || selectedPlaceDetail.category}
                </span>
                <h3 className="text-lg font-bold text-[var(--color-foreground)] mt-1 tracking-tight">
                  {selectedPlaceDetail.name}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] font-mono">
                  {selectedPlaceDetail.nameEn}
                </p>
              </div>

              <button
                onClick={() => setSelectedPlaceDetail(null)}
                className="p-1.5 rounded-full bg-[var(--color-surface-alt)] text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Info Grid */}
            <div className="space-y-2 text-xs bg-[var(--color-surface-alt)] p-3 rounded-2xl border border-[var(--color-border)]">
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-secondary)] font-medium">위치 / 거리</span>
                <span className="font-bold text-[var(--color-foreground)]">{selectedPlaceDetail.locationTag}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-secondary)] font-medium">주소</span>
                <span className="font-bold text-[var(--color-foreground)] text-right truncate max-w-[200px]">{selectedPlaceDetail.address}</span>
              </div>
              {selectedPlaceDetail.hours && (
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-secondary)] font-medium">영업시간</span>
                  <span className="font-mono font-bold text-[var(--color-foreground)]">{selectedPlaceDetail.hours}</span>
                </div>
              )}
              {selectedPlaceDetail.recommendedTime && (
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-secondary)] font-medium">추천 방문 시간</span>
                  <span className="font-bold text-[var(--color-blue)]">{selectedPlaceDetail.recommendedTime}</span>
                </div>
              )}
            </div>

            {/* Detailed Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">소개 및 특징</h4>
              <p className="text-[13px] text-[var(--color-foreground)] leading-relaxed">
                {selectedPlaceDetail.description}
              </p>
            </div>

            {/* Shopping Tips */}
            {selectedPlaceDetail.shoppingTips && selectedPlaceDetail.shoppingTips.length > 0 && (
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1.5 text-xs">
                <h4 className="font-extrabold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <ShoppingCart className="w-4 h-4 text-amber-600" />
                  <span>추천 쇼핑 & 기념품 리스트</span>
                </h4>
                <ul className="space-y-1 text-amber-950 dark:text-amber-200 pl-1 font-medium">
                  {selectedPlaceDetail.shoppingTips.map((tip, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Course */}
            {selectedPlaceDetail.recommendedCourse && (
              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs space-y-1">
                <span className="font-bold text-[var(--color-blue)] block">🚶 추천 코스</span>
                <p className="text-blue-950 dark:text-blue-200">{selectedPlaceDetail.recommendedCourse}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  onToggleVisited(selectedPlaceDetail.id);
                  setSelectedPlaceDetail((prev) => prev ? { ...prev, visited: !prev.visited } : null);
                }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  selectedPlaceDetail.visited
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{selectedPlaceDetail.visited ? "방문 완료됨" : "방문 체크하기"}</span>
              </button>

              <button
                onClick={() => openGoogleMaps(selectedPlaceDetail.googleMapsQuery)}
                className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-[var(--color-blue)] text-white flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Navigation className="w-4 h-4 fill-current" />
                <span>구글 맵 길찾기</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Add/Edit Custom Place Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <form
            onSubmit={handleSavePlace}
            className="w-full max-w-md bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] p-5 shadow-2xl space-y-3.5 max-h-[85vh] overflow-y-auto text-xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[var(--color-foreground)]">
                {editingId ? "장소 수정" : "새 장소 등록"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-[var(--color-text-secondary)] block mb-1">한글 이름 *</label>
                <input
                  type="text"
                  placeholder="예: 트레이더 조 9번가점"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] font-bold text-[var(--color-foreground)]"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-[var(--color-text-secondary)] block mb-1">영문 이름</label>
                <input
                  type="text"
                  placeholder="Trader Joe's 9th St"
                  value={formNameEn}
                  onChange={(e) => setFormNameEn(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-[var(--color-text-secondary)] block mb-1">카테고리</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] font-bold"
                >
                  <option value="mart_shopping">🛒 마트 & 쇼핑</option>
                  <option value="bookstore">📚 서점 & 문화</option>
                  <option value="near_lodging">🏡 숙소 근처 (Glen Park)</option>
                  <option value="near_moscone">🏢 행사장 근처 (Moscone)</option>
                  <option value="mission">🌮 미션 (Mission)</option>
                  <option value="viewpoint">🌉 전망 & 뷰포인트</option>
                  <option value="landmark">🏛️ SF 랜드마크</option>
                  <option value="cinema_tour">🎬 영화 성지순례</option>
                  <option value="custom">⭐ 기타 커스텀</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-[var(--color-text-secondary)] block mb-1">위치 태그</label>
                <input
                  type="text"
                  placeholder="예: Moscone 도보 5분"
                  value={formLocationTag}
                  onChange={(e) => setFormLocationTag(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[var(--color-text-secondary)] block mb-1">주소</label>
              <input
                type="text"
                placeholder="555 9th St, San Francisco, CA"
                value={formAddress}
                onChange={(e) => setFormAddress(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-[var(--color-text-secondary)] block mb-1">영업시간</label>
                <input
                  type="text"
                  placeholder="매일 08:00 - 21:00"
                  value={formHours}
                  onChange={(e) => setFormHours(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-[var(--color-text-secondary)] block mb-1">평점 (1.0~5.0)</label>
                <input
                  type="text"
                  placeholder="4.7"
                  value={formRating}
                  onChange={(e) => setFormRating(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[var(--color-text-secondary)] block mb-1">상세 설명 / 꿀팁</label>
              <textarea
                rows={2}
                placeholder="장소에 대한 특징 및 메모..."
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[var(--color-text-secondary)] block mb-1">쇼핑 추천 품목 (한 줄에 하나씩)</label>
              <textarea
                rows={2}
                placeholder="에코백&#10;베이글 시즈닝&#10;초콜릿"
                value={formShoppingTips}
                onChange={(e) => setFormShoppingTips(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[var(--color-text-secondary)] block mb-1">태그 (쉼표로 구분)</label>
              <input
                type="text"
                placeholder="대형마트, 에코백, 선물쇼핑"
                value={formThemeTags}
                onChange={(e) => setFormThemeTags(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="notion-button-secondary py-2 px-4"
              >
                취소
              </button>
              <button type="submit" className="notion-button-primary py-2 px-5">
                저장하기
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
