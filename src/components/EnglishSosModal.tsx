import React, { useState } from "react";
import {
  X,
  Volume2,
  Copy,
  Check,
  Maximize2,
  Sparkles,
  Search,
  ArrowRight,
  ShieldAlert,
  Car,
  Hotel,
  Coffee,
  Plane,
  HelpCircle
} from "lucide-react";

interface EnglishSosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PhraseItem {
  id: string;
  category: "immigration" | "transit" | "hotel" | "dining" | "conference" | "emergency";
  korean: string;
  english: string;
  pronunciation: string;
  contextTip?: string;
  showScreenNote?: string;
}

const PHRASES: PhraseItem[] = [
  // 1. 입국심사 (Immigration)
  {
    id: "p-imm-1",
    category: "immigration",
    korean: "방문 목적: 컨퍼런스(드림포스) 참석 및 관광입니다.",
    english: "I'm here for a conference and tourism.",
    pronunciation: "아임 히어 포 어 컨퍼런스 앤 투어리즘.",
    contextTip: "★ CBP 질문에 길게 말하지 말고 딱 이 한 문장만 말하세요.",
    showScreenNote: "Purpose of Visit: Dreamforce Conference & Tourism"
  },
  {
    id: "p-imm-2",
    category: "immigration",
    korean: "체류 기간: 5일 머뭅니다.",
    english: "I will stay for five days.",
    pronunciation: "아이 윌 스테이 포 파이브 데이즈.",
    contextTip: "체류 기간 질문 시 손가락 5개를 펴며 말하면 확실합니다.",
    showScreenNote: "Length of Stay: 5 Days (Sep 13 ~ Sep 18)"
  },
  {
    id: "p-imm-3",
    category: "immigration",
    korean: "숙소 위치: 137 Milton St, San Francisco 입니다.",
    english: "I'm staying at 137 Milton St, San Francisco.",
    pronunciation: "아임 스테잉 앳 원 써티 세븐 밀턴 스트리트, 샌프란시스코.",
    contextTip: "주소를 묻거나 바우처를 요구할 때 이 화면을 직접 보여주세요.",
    showScreenNote: "Accommodation Address: 137 Milton St, San Francisco, CA 94112"
  },
  {
    id: "p-imm-4",
    category: "immigration",
    korean: "직업: IT 소프트웨어 회사 엔지니어/컨설턴트입니다.",
    english: "I am a software engineer for an IT consulting company.",
    pronunciation: "아이 엠 어 소프트웨어 엔지니어 포 언 아이티 컨설팅 컴퍼니.",
    contextTip: "소속사(DK BMC) 질문 시 답변용",
    showScreenNote: "Profession: Software Consultant / IT Professional (DK BMC)"
  },

  // 2. 교통 & 우버/택시 (Transit)
  {
    id: "p-tra-1",
    category: "transit",
    korean: "우버 기사 확인: 저(JS) 태우러 오신 것 맞나요?",
    english: "Are you here for JS?",
    pronunciation: "아 유 히어 포 제이에스?",
    contextTip: "★ 차 문 열기 전 창문 너머로 반드시 본인 이름을 먼저 확인하세요.",
    showScreenNote: "Rider Name: JS (Jinsoo Kim)"
  },
  {
    id: "p-tra-2",
    category: "transit",
    korean: "기사에게 목적지 주소 보여주기 (숙소)",
    english: "Please take me to: 137 Milton St, San Francisco, CA 94112",
    pronunciation: "플리즈 테이크 미 투: 원 써티 세븐 밀턴 스트리트, 샌프란시스코.",
    contextTip: "택시 기사에게 이 화면을 그대로 보여주면 영어 한마디 없이 출발합니다!",
    showScreenNote: "DESTINATION:\n137 Milton St, San Francisco, CA 94112\n(Glen Park Area)"
  },
  {
    id: "p-tra-3",
    category: "transit",
    korean: "트렁크(짐칸) 좀 열어주실 수 있나요?",
    english: "Could you please pop the trunk for my luggage?",
    pronunciation: "쿠쥬 플리즈 팝 더 트렁크 포 마이 러기지?",
    contextTip: "캐리어 실을 때 기사에게 요청",
    showScreenNote: "Could you open the trunk, please?"
  },
  {
    id: "p-tra-4",
    category: "transit",
    korean: "모스콘 센터(행사장) 서관으로 가주세요.",
    english: "Please drop me off at Moscone West.",
    pronunciation: "플리즈 드랍 미 오프 앳 모스콘 웨스트.",
    contextTip: "모스콘은 North, South, West가 있으므로 West를 정확히 지정",
    showScreenNote: "DESTINATION:\nMoscone West (747 Howard St, San Francisco)"
  },

  // 3. 호텔 & 체크인 (Hotel)
  {
    id: "p-hot-1",
    category: "hotel",
    korean: "예약 확인: 안녕하세요, 김진수 이름으로 예약했습니다.",
    english: "Hi, I have a reservation. It's under Jinsoo Kim.",
    pronunciation: "하이, 아이 해브 어 레저베이션. 잇츠 언더 진수 킴.",
    contextTip: "프런트 직원에게 여권과 함께 전달하세요.",
    showScreenNote: "Hotel Check-in:\nReservation Name: Jinsoo Kim"
  },
  {
    id: "p-hot-2",
    category: "hotel",
    korean: "★ 만능 치트키: 조금만 천천히 말씀해 주시겠어요?",
    english: "Could you speak a little more slowly, please?",
    pronunciation: "쿠쥬 스픽 어 리틀 모어 슬로울리, 플리즈?",
    contextTip: "영어가 너무 빠를 때 쓰면 미국 직원들은 100% 친절하게 천천히 말해줍니다.",
    showScreenNote: "Could you please speak a little more slowly? Thank you!"
  },
  {
    id: "p-hot-3",
    category: "hotel",
    korean: "체크인 전 짐 보관: 짐을 맡겨둘 수 있을까요?",
    english: "Can I leave my bags here before check-in?",
    pronunciation: "캔 아이 리브 마이 백스 히어 비포 체크인?",
    contextTip: "일찍 도착했을 때 짐 보관 후 모스콘 센터로 갈 때 사용",
    showScreenNote: "Luggage Storage:\nMay I store my luggage before check-in, please?"
  },
  {
    id: "p-hot-4",
    category: "hotel",
    korean: "와이파이 비밀번호가 무엇인가요?",
    english: "What is the Wi-Fi network and password?",
    pronunciation: "왓 이즈 더 와이파이 네트워크 앤 패스워드?",
    contextTip: "객실 키 카드 종이에 적혀있지 않을 때 질문",
    showScreenNote: "Could you please write down the Wi-Fi password?"
  },

  // 4. 식당 & 카페 (Dining)
  {
    id: "p-din-1",
    category: "dining",
    korean: "계산서 요청: 계산서 부탁드립니다.",
    english: "Could we get the check, please?",
    pronunciation: "쿠드 위 겟 더 체크, 플리즈?",
    contextTip: "식사 후 자리에서 손을 가볍게 들고 요청",
    showScreenNote: "Could we have the check, please?"
  },
  {
    id: "p-din-2",
    category: "dining",
    korean: "더치페이(분할 결제): 각자 따로 계산해 주실 수 있나요?",
    english: "Can we split the bill, please?",
    pronunciation: "캔 위 스플릿 더 빌, 플리즈?",
    contextTip: "동료들과 카드 각각 결제할 때 사용",
    showScreenNote: "Can we split the bill separately, please?"
  },
  {
    id: "p-din-3",
    category: "dining",
    korean: "물 요청: 시원한 물 한 잔만 부탁드립니다.",
    english: "Could I have a glass of tap water, please?",
    pronunciation: "쿠드 아이 해브 어 글래스 오브 탭 워터, 플리즈?",
    contextTip: "미국 식당에서 무료 일반 물은 'Tap water'라고 부릅니다.",
    showScreenNote: "A glass of water, please!"
  },
  {
    id: "p-din-4",
    category: "dining",
    korean: "고수 빼주세요 (타코/베트남 식당 필수)",
    english: "No cilantro, please.",
    pronunciation: "노 실란트로, 플리즈.",
    contextTip: "샌프란시스코 멕시칸/타코나 쌀국수 주문 시 필수!",
    showScreenNote: "NO CILANTRO (고수 빼주세요), please!"
  },

  // 5. 행사 & 비즈니스 (Conference)
  {
    id: "p-con-1",
    category: "conference",
    korean: "부스 시연 요청: 이 기능 2분만 데모 보여주실 수 있나요?",
    english: "Could you give me a quick 2-minute demo of this feature?",
    pronunciation: "쿠쥬 기브 미 어 퀵 투 미닛 데모 오브 디스 피처?",
    contextTip: "모스콘 센터 Campground 부스에서 제품 설명 들을 때",
    showScreenNote: "Could you give me a quick 2-minute demo, please?"
  },
  {
    id: "p-con-2",
    category: "conference",
    korean: "명함 교환 / 링크드인: 링크드인 연결할 수 있을까요?",
    english: "May I connect with you on LinkedIn?",
    pronunciation: "메이 아이 커넥트 위드 유 온 링크드인?",
    contextTip: "네트워킹 파티에서 스마트폰 링크드인 QR을 보여주며 말하세요.",
    showScreenNote: "Let's connect on LinkedIn!\n(Here is my QR code)"
  },
  {
    id: "p-con-3",
    category: "conference",
    korean: "한국 전용 라운지(City View) 위치가 어디인가요?",
    english: "Where is the City View Lounge for international guests?",
    pronunciation: "웨어 이즈 더 시티 뷰 라운지 포 인터내셔널 게스트?",
    contextTip: "한국/일본/대만 전용 무료 커피 라운지 찾을 때 안내데스크에 질문",
    showScreenNote: "Excuse me, where is City View (Metreon)?"
  },

  // 6. 긴급 & 안전 (Emergency)
  {
    id: "p-eme-1",
    category: "emergency",
    korean: "도와주세요! 경찰을 불러주세요.",
    english: "Please help me! Call the police (911).",
    pronunciation: "플리즈 헬프 미! 콜 더 폴리스.",
    contextTip: "위험 상황 발생 시 주변 상점이나 사람에게 긴급 요청",
    showScreenNote: "EMERGENCY:\nPlease call the police (911)!"
  },
  {
    id: "p-eme-2",
    category: "emergency",
    korean: "대한민국 총영사관으로 전화 연결 부탁드립니다.",
    english: "Please connect me to the Korean Consulate (+1-415-921-2251).",
    pronunciation: "플리즈 커넥트 미 투 더 코리안 컨설레이트.",
    contextTip: "여권 분실이나 사건 사고 발생 시 지원 요청",
    showScreenNote: "Emergency Contact:\nKorean Consulate in SF: +1-415-921-2251"
  },
  {
    id: "p-eme-3",
    category: "emergency",
    korean: "지갑/여권을 잃어버렸습니다. 분실물 센터가 어디인가요?",
    english: "I lost my passport and wallet. Where is the Lost & Found?",
    pronunciation: "아이 로스트 마이 패스포트 앤 월렛. 웨어 이즈 더 로스트 앤 파운드?",
    contextTip: "모스콘 센터나 공항에서 분실 시 사용",
    showScreenNote: "LOST & FOUND:\nI lost my passport and wallet. Please help."
  }
];

const CATEGORIES = [
  { id: "all", label: "전체", icon: Sparkles },
  { id: "immigration", label: "🛃 입국심사", icon: Plane },
  { id: "transit", label: "🚗 우버/택시", icon: Car },
  { id: "hotel", label: "🏨 호텔", icon: Hotel },
  { id: "dining", label: "🍽️ 식당/카페", icon: Coffee },
  { id: "conference", label: "🎪 행사/부스", icon: Sparkles },
  { id: "emergency", label: "🚨 긴급/안전", icon: ShieldAlert }
];

export const EnglishSosModal: React.FC<EnglishSosModalProps> = ({ isOpen, onClose }) => {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fullscreen Show-Screen Modal
  const [showScreenPhrase, setShowScreenPhrase] = useState<PhraseItem | null>(null);

  if (!isOpen) return null;

  const filtered = PHRASES.filter((item) => {
    const matchCat = selectedCat === "all" || item.category === selectedCat;
    const matchSearch =
      item.korean.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pronunciation.includes(searchQuery);
    return matchCat && matchSearch;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[75] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-[8px] p-0 md:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[92vh] flex flex-col rounded-t-[32px] md:rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* 드래그 핸들 */}
        <div className="pt-3 pb-1">
          <div className="h-1.5 w-12 rounded-full bg-[#d7e3f1] dark:bg-slate-700 mx-auto" />
        </div>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-800 shadow-xs">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                  영어 울렁증 해방
                </span>
                <span className="text-[11px] text-[var(--color-text-secondary)] font-medium">
                  큰 글씨 보여주기 지원
                </span>
              </div>
              <h3 className="text-[16px] font-extrabold tracking-tight text-[var(--color-foreground)]">
                초보자 실전 영어 SOS & 쇼스크린
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 안내 배너 */}
        <div className="px-4 pt-3 pb-1">
          <div className="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">💡</span>
              <span className="font-medium">
                영어가 입에서 안 나올 땐 각 카드의 <strong>[📱 상대방에게 보여주기]</strong>를 누르세요!
              </span>
            </div>
          </div>
        </div>

        {/* 검색창 & 카테고리 필터 */}
        <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface-alt)] space-y-2.5">
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="영어 문장, 한글 뜻, 발음 검색 (우버, 물, 체크인, 911)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-xs rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-blue)]"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-3 py-1.5 rounded-xl shrink-0 font-bold transition-all cursor-pointer border ${
                    isActive
                      ? "border-[var(--color-blue)] bg-[var(--color-blue)] text-white shadow-xs"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 문장 목록 스크롤 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              검색 결과가 없습니다. 다른 단어로 검색해 보세요.
            </div>
          ) : (
            filtered.map((item) => {
              const isCopied = copiedId === item.id;

              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-all space-y-2 group"
                >
                  {/* 상단: 한국어 뜻 + 액션 버튼 */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-1 inline-block">
                        {CATEGORIES.find((c) => c.id === item.category)?.label}
                      </span>
                      <h4 className="text-[13.5px] font-extrabold text-[var(--color-foreground)] leading-snug">
                        {item.korean}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => setShowScreenPhrase(item)}
                        className="px-2 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[var(--color-blue)] hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800 font-bold text-[10.5px] flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs"
                        title="외국인에게 큰 글씨로 보여주기"
                      >
                        <Maximize2 className="h-3 w-3" />
                        <span>보여주기</span>
                      </button>

                      <button
                        onClick={() => handleCopy(item.english, item.id)}
                        className="p-1.5 rounded-lg border border-[var(--color-border)] text-slate-400 hover:text-[var(--color-blue)] active:scale-90 cursor-pointer"
                        title="영문 복사"
                      >
                        {isCopied ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* 영문 원문 (눈에 띄는 큰 글씨) */}
                  <div className="p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] space-y-0.5">
                    <p className="font-mono font-extrabold text-[13.5px] text-[var(--color-foreground)] tracking-tight">
                      "{item.english}"
                    </p>
                    <p className="text-[11px] text-[var(--color-blue)] font-medium">
                      🗣️ {item.pronunciation}
                    </p>
                  </div>

                  {/* 가이드 팁 */}
                  {item.contextTip && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      💡 {item.contextTip}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 푸터 */}
        <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between">
          <span className="text-[11px] text-[var(--color-text-secondary)]">
            총 <strong>{PHRASES.length}개</strong> 실전 회화 수록
          </span>
          <button
            onClick={onClose}
            className="notion-button-primary px-4 py-1.5 text-xs active:scale-95 cursor-pointer font-bold"
          >
            닫기
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 📱 SHOW SCREEN OVERLAY (외국인에게 큰 화면으로 직접 보여주는 모드) */}
      {/* ============================================================ */}
      {showScreenPhrase && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95 p-4 animate-in zoom-in-95 duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 text-black shadow-2xl space-y-6 text-center border-4 border-amber-400">
            {/* 상단 뱃지 */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs">
              <span>👉 Please read this / 읽어주세요</span>
            </div>

            {/* 거대한 영문 텍스트 (누구나 한눈에 읽을 수 있는 크기) */}
            <div className="space-y-3 py-4">
              <p className="text-2xl sm:text-3xl font-black leading-snug tracking-tight text-slate-900 whitespace-pre-line font-mono">
                {showScreenPhrase.showScreenNote || showScreenPhrase.english}
              </p>
            </div>

            {/* 한국어 뜻 */}
            <div className="pt-2 border-t border-slate-200 text-slate-500 text-xs font-semibold">
              <p>{showScreenPhrase.korean}</p>
            </div>

            {/* 닫기 버튼 */}
            <button
              onClick={() => setShowScreenPhrase(null)}
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-sm shadow-md active:scale-95 cursor-pointer"
            >
              화면 닫기 (Back)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
