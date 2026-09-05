import React, { useState } from "react";
import {
  X,
  Plane,
  ShieldCheck,
  Car,
  Hotel,
  Copy,
  Check,
  AlertTriangle,
  Sparkles,
  Smartphone,
  Luggage,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Clock,
  Compass,
  FileText
} from "lucide-react";

interface FlightArrivalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type StepSection = "plane" | "immigration" | "transit" | "hotel" | "summary";

export const FlightArrivalGuideModal: React.FC<FlightArrivalGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeSection, setActiveSection] = useState<StepSection>("summary");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-[8px] p-0 md:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[92vh] flex flex-col rounded-t-[32px] md:rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* 드래그 핸들 */}
        <div className="pt-3 pb-1">
          <div className="h-1.5 w-12 rounded-full bg-[#d7e3f1] dark:bg-slate-700 mx-auto" />
        </div>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[var(--color-blue)] flex items-center justify-center border border-blue-200 dark:border-blue-800">
              <Plane className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                  초보자 실전 매뉴얼
                </span>
                <span className="text-[11px] text-[var(--color-text-secondary)] font-medium">
                  환승 없는 직항(UA892)
                </span>
              </div>
              <h3 className="text-[16px] font-extrabold tracking-tight text-[var(--color-foreground)]">
                비행기 탑승 ~ SFO 호텔 체크인 20단계
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

        {/* 섹션 탭 (5개) */}
        <div className="p-2 border-b border-[var(--color-border)] bg-[var(--color-surface-alt)] flex gap-1.5 overflow-x-auto no-scrollbar text-xs">
          {[
            { id: "summary", label: "7단계 요약/치트키", icon: Sparkles, count: "핵심" },
            { id: "plane", label: "1~5. 탑승 & 기내", icon: Plane, count: "5단계" },
            { id: "immigration", label: "6~13. SFO 입국/수하물", icon: ShieldCheck, count: "8단계" },
            { id: "transit", label: "14~17. Uber/숙소이동", icon: Car, count: "4단계" },
            { id: "hotel", label: "18~20. 체크인 & 점검", icon: Hotel, count: "3단계" }
          ].map((sec) => {
            const isActive = activeSection === sec.id;
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id as StepSection)}
                className={`px-3 py-2 rounded-xl shrink-0 font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isActive
                    ? "border-[var(--color-blue)] bg-[var(--color-blue)] text-white shadow-xs"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)]"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* 바디 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* SECTION: SUMMARY & CHEATSHEET */}
          {activeSection === "summary" && (
            <div className="space-y-4 text-xs">
              {/* 안심 배너 */}
              <div className="p-3.5 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 space-y-1">
                <div className="flex items-center gap-2 font-extrabold text-[13px]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>"이번 여행은 SFO가 최종 목적지라 환승이 없어 생각보다 단순합니다!"</span>
                </div>
                <p className="text-[11.5px] leading-relaxed">
                  비행기에서 내린 뒤에는 국내선 환승객(Connecting Flights)을 따라가지 않고, 오직 <strong className="underline decoration-emerald-500 underline-offset-2">"San Francisco"</strong> 출구만 찾아 나오시면 됩니다.
                </p>
              </div>

              {/* 캡처용 7단계 핵심 흐름도 */}
              <div className="rounded-2xl border border-blue-200 dark:border-blue-800/80 bg-blue-50/50 dark:bg-slate-900/50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-[13px] text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                    <span>📸 비행기 하차 후 이것만 기억하세요 (핵심 7단계)</span>
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                    캡처 추천
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
                  {[
                    { step: "①", title: "Immigration (입국심사)", desc: "CBP 심사관에게 여권 제시, 'For conference and tourism' 단문 답변" },
                    { step: "②", title: "Baggage Claim (수하물)", desc: "전광판 UA892 컨베이어에서 23kg 캐리어 태그 번호 대조 후 수령" },
                    { step: "③", title: "Customs (세관)", desc: "신고 물품 없으면 표지판 따라 직진 통과" },
                    { step: "④", title: "★ 'San Francisco' 출구", desc: "환승길(Connecting Flights) 절대 X! 오직 'San Francisco' 출구로 진출" },
                    { step: "⑤", title: "Uber / Lyft / Taxi", desc: "차량 모델·번호판·기사 확인 ('Are you here for JS?')" },
                    { step: "⑥", title: "Hotel 도착", desc: "프런트에 'Hi, I have a reservation under Jinsoo Kim' 제시" },
                    { step: "⑦", title: "Check-in & 객실 5대 점검", desc: "여권/지갑/폰충전/캐리어잠금/호텔키 즉시 확인!" }
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 space-y-0.5"
                    >
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                        <span className="w-5 h-5 rounded-full bg-[var(--color-blue)] text-white text-[10px] flex items-center justify-center font-black">
                          {s.step}
                        </span>
                        <span>{s.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 pl-6 leading-normal">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 원터치 영어 치트키 박스 */}
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-[13px] text-[var(--color-foreground)] flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>이번 출장 가장 중요한 영어 6문장 (원터치 복사)</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">터치 시 복사</span>
                </div>

                <div className="space-y-2">
                  {[
                    {
                      key: "c-1",
                      situation: "🛃 입국심사 목적",
                      question: "What's the purpose of your trip?",
                      answer: "I'm here for a conference and tourism.",
                      korean: "컨퍼런스(드림포스) 참석 및 관광 목적입니다."
                    },
                    {
                      key: "c-2",
                      situation: "🛃 입국심사 체류기간",
                      question: "How long will you stay?",
                      answer: "Five days.",
                      korean: "5일 머뭅니다. (길게 말하지 말고 딱 Five days)"
                    },
                    {
                      key: "c-3",
                      situation: "🛃 입국심사 숙소위치",
                      question: "Where are you staying?",
                      answer: "I'm staying at 137 Milton St, San Francisco.",
                      korean: "숙소는 137 Milton St 입니다. (주소 화면 제시)"
                    },
                    {
                      key: "c-4",
                      situation: "👂 말이 너무 빠를 때 만능 치트키",
                      question: "상대방 영어가 빠르거나 못 알아들었을 때",
                      answer: "Could you speak a little more slowly, please?",
                      korean: "조금만 천천히 말씀해 주실 수 있나요? (초특급 유용)"
                    },
                    {
                      key: "c-5",
                      situation: "🏨 호텔 프런트 체크인",
                      question: "프런트 데스크 직원에게",
                      answer: "Hi, I have a reservation. It's under Jinsoo Kim.",
                      korean: "안녕하세요, 예약했습니다. 김진수 이름으로 되어 있습니다."
                    },
                    {
                      key: "c-6",
                      situation: "🚗 Uber/Lyft 기사 확인",
                      question: "도착한 우버 기사에게 본인 확인 시",
                      answer: "Are you here for JS?",
                      korean: "JS(진수) 승객 태우러 오신 것 맞나요?"
                    }
                  ].map((phrase) => {
                    const isCopied = copiedKey === phrase.key;
                    return (
                      <div
                        key={phrase.key}
                        onClick={() => handleCopy(phrase.answer, phrase.key)}
                        className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[11px] text-[var(--color-blue)]">
                            {phrase.situation}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400 group-hover:text-[var(--color-blue)]">
                            {isCopied ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-500" />
                                <span className="text-emerald-600 font-bold">복사됨!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>복사</span>
                              </>
                            )}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-0.5">Q. {phrase.question}</p>
                        <p className="font-mono font-bold text-[13px] text-[var(--color-foreground)] tracking-tight">
                          "{phrase.answer}"
                        </p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                          👉 {phrase.korean}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* SECTION: 1~5. PLANE */}
          {activeSection === "plane" && (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 flex items-center gap-2">
                <Plane className="h-4 w-4 shrink-0 text-blue-600" />
                <span><strong>인천공항 탑승구 ~ 기내 생활 (1~5단계)</strong>: Gate에서 47K 좌석 찾기 및 기내 폰 충전</span>
              </div>

              {/* 1단계 */}
              <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-black text-[11px]">1단계</span>
                  <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">비행기에 탑승하는 순간 (16:20 Gate 대기)</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  탑승구 화면에 <strong className="text-[var(--color-blue)]">UA892 — San Francisco</strong>가 표시되어 있는지 확인하고 탑승이 시작되면 줄을 섭니다.
                </p>
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200">
                  <strong className="block mb-1 font-bold">손에 바로 꺼낼 수 있게 준비할 3가지:</strong>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11.5px]">
                    <li><strong>실물 여권</strong></li>
                    <li><strong>모바일 탑승권</strong> (휴대폰 화면 켜두기)</li>
                    <li><strong>휴대폰</strong></li>
                  </ul>
                  <span className="block mt-1 text-[11px] text-amber-800 dark:text-amber-300">
                    직원이 탑승권을 스캔하고 여권을 확인하면 브릿지를 통해 비행기로 들어갑니다.
                  </span>
                </div>
              </div>

              {/* 2단계 */}
              <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-black text-[11px]">2단계</span>
                  <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">비행기에 들어가서 좌석(47K) 찾기 & 짐 정리</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  천장이나 좌석 위쪽에 좌석번호가 표시되어 있습니다. <strong className="text-blue-600">47K</strong>를 찾으시면 됩니다. (45 → 46 → 47 열의 K 창가석)
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11.5px]">
                  <div className="p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
                    <strong className="block text-[var(--color-foreground)] mb-0.5 font-bold">📦 기내 캐리어:</strong>
                    <span>좌석 위 선반(Overhead Bin)에 넣기</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
                    <strong className="block text-[var(--color-foreground)] mb-0.5 font-bold">🎒 작은 가방:</strong>
                    <span>앞 좌석 밑 공간에 넣기</span>
                  </div>
                </div>
                <p className="text-[11.5px] text-slate-600 dark:text-slate-400">
                  착석 후: 휴대폰 비행기 탑승 모드 전환 → 안전벨트 착용 → 좌석 주변 정리
                </p>
              </div>

              {/* 3단계 */}
              <div className="p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-black text-[11px]">3단계</span>
                  <h4 className="text-[14px] font-bold text-rose-950 dark:text-rose-200">★ 출발 전 핵심: 기내에서 휴대폰 충전하기!</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  승무원의 안전 안내를 듣고 화장실 위치를 미리 확인해 둡니다. 그리고 <strong>반드시 기내 좌석의 USB 포트나 충전기를 연결해 휴대폰을 충전하세요.</strong>
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-800 text-[11.5px] text-rose-800 dark:text-rose-300">
                  💡 <strong>이유:</strong> 11시간 장거리 비행 후 SFO에 도착하자마자 지도(Google Maps), Uber 호출, 입국 서류 확인, 팀원 연락 등에 휴대폰 배터리를 집중적으로 써야 하기 때문입니다!
                </div>
              </div>

              {/* 4단계 */}
              <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-black text-[11px]">4단계</span>
                  <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">이륙 & 필수 서류 손 닿는 곳에 꺼내두기</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  비행기가 이륙하면 먹고 → 보고 → 자고 → 쉬는 시간입니다. 단, 착륙 후 입국심사를 위해 다음 서류들은 작은 가방 안 손이 바로 닿는 곳에 두세요:
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  <span className="px-2 py-1 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)]">① 실물 여권</span>
                  <span className="px-2 py-1 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)]">② 숙소 예약 정보 (137 Milton St)</span>
                  <span className="px-2 py-1 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)]">③ 미국 체류 일정표</span>
                  <span className="px-2 py-1 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)]">④ 귀국 항공권 정보 (UA893)</span>
                  <span className="px-2 py-1 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)]">⑤ ESTA 승인 번호</span>
                </div>
              </div>

              {/* 5단계 */}
              <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-black text-[11px]">5단계</span>
                  <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">기내식 & 기내 간단 영어</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  승무원이 식사를 가져오면 음료를 고르고 식사하면 됩니다. 물이나 음료가 더 필요할 때는 영어를 거창하게 할 필요가 없습니다:
                </p>
                <div className="p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-[13px] text-[var(--color-blue)]">"Could I have some water, please?"</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">물 한 잔 부탁드립니다.</p>
                  </div>
                  <button
                    onClick={() => handleCopy("Could I have some water, please?", "water")}
                    className="p-1.5 rounded-lg border border-[var(--color-border)] text-slate-500 hover:text-[var(--color-blue)] cursor-pointer"
                  >
                    {copiedKey === "water" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: 6~13. IMMIGRATION */}
          {activeSection === "immigration" && (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-amber-600" />
                <span><strong>SFO 도착 & 미국 입국 8단계</strong>: 입국심사(CBP), 수하물(23kg), 'San Francisco' 출구</span>
              </div>

              {/* 6단계 */}
              <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white font-black text-[11px]">6단계</span>
                  <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">미국 도착 약 1시간 전 (준비 모드 전환)</h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11.5px]">
                  <div className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">① 여권 손에 꺼내기</div>
                  <div className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">② 휴대폰 배터리 완충 확인</div>
                  <div className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">③ 숙소 주소(137 Milton St) 확인</div>
                  <div className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">④ 입국심사 3문장 머릿속 연습</div>
                </div>
              </div>

              {/* 7단계 */}
              <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white font-black text-[11px]">7단계</span>
                  <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">SFO 착륙 (11:40) & 표지판 확인 이동</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  비행기가 착륙하면 아직 공항 밖으로 나가는 것이 아닙니다. 사람들을 따라 이동하면서 머리 위 표지판을 봅니다:
                </p>
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 text-blue-900 dark:text-blue-200 font-extrabold text-[12.5px] text-center">
                  👉 찾을 표지판: "Arrivals / Immigration / Passport Control"
                </div>
              </div>

              {/* 8단계 (가장 중요) */}
              <div className="p-4 rounded-2xl border-2 border-[var(--color-blue)] bg-blue-50/40 dark:bg-blue-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[var(--color-blue)] text-white font-black text-[11px]">8단계</span>
                    <h4 className="text-[14px] font-extrabold text-[var(--color-foreground)]">★ 가장 중요한 단계: 미국 입국심사 (CBP)</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">단문 답변 필수</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  미국 세관국경보호국(CBP) 심사관 앞에 서면 여권을 보여줍니다. <strong className="text-rose-600">절대로 길게 설명하지 마세요.</strong> 짧고 명확하게 대답하면 30초 만에 통과합니다.
                </p>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-bold">질문 1: 방문 목적 (What is the purpose of your trip?)</span>
                    <p className="font-mono font-bold text-[13px] text-[var(--color-blue)]">"I'm here for a conference and tourism."</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">컨퍼런스(Dreamforce) 참석 및 관광 목적입니다.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-bold">질문 2: 체류 기간 (How long will you stay?)</span>
                    <p className="font-mono font-bold text-[13px] text-[var(--color-blue)]">"Five days."</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">5일 머뭅니다. (단 한마디로 대답)</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-bold">질문 3: 숙소 위치 (Where are you staying?)</span>
                    <p className="font-mono font-bold text-[13px] text-[var(--color-blue)]">"I'm staying at 137 Milton St."</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">숙소 주소이며 필요시 휴대폰 예약 바우처 화면을 보여주면 끝납니다.</p>
                  </div>
                </div>
              </div>

              {/* 9단계 */}
              <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white font-black text-[11px]">9단계</span>
                  <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">입국심사 통과 후 표지판 찾기</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  심사관이 여권을 돌려주면 미국 입국심사는 성공적으로 끝난 것입니다! 이제 수하물을 찾기 위해 다음 표지판을 따라 이동합니다:
                </p>
                <div className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-center font-bold text-[12.5px]">
                  👉 표지판: <span className="text-[var(--color-blue)] font-extrabold">"Baggage Claim"</span>
                </div>
              </div>

              {/* 10단계 */}
              <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white font-black text-[11px]">10단계</span>
                  <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">수하물(캐리어) 찾기 (전광판 UA892 확인)</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  수하물 수취 구역 전광판에서 <strong className="text-[var(--color-blue)]">UA892</strong>를 찾습니다. 그러면 <strong className="font-mono">Baggage Claim 6</strong> 같은 컨베이어 벨트 번호가 뜹니다. 해당 벨트로 가서 23kg 캐리어가 나올 때까지 대기합니다.
                </p>
              </div>

              {/* 11단계 */}
              <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white font-black text-[11px]">11단계</span>
                  <h4 className="text-[14px] font-bold text-amber-950 dark:text-amber-200">★ 내 가방 확인 (수하물 태그 번호 대조 필수!)</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  가방이 나오면 바로 끌고 가지 마세요! 미국 공항에는 디자인이 똑같은 검은색/은색 캐리어가 수백 개씩 지나갑니다.
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 text-[11.5px] text-amber-900 dark:text-amber-200">
                  🔍 <strong>확인법:</strong> 인천공항 United 카운터에서 가방을 맡길 때 여권 뒤나 탑승권에 붙여준 <strong className="text-blue-600">수하물 태그(Baggage Tag) 바코드 번호</strong>와 캐리어 손잡이에 달린 태그 번호가 일치하는지 반드시 확인하세요!
                </div>
              </div>

              {/* 12단계 */}
              <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white font-black text-[11px]">12단계</span>
                  <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">세관 (Customs) 통과</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  수하물을 찾았으면 머리 위 <strong className="font-bold">Customs</strong> 표지판을 따라갑니다. 육류나 농산물 등 신고할 물품이 없다면 직원의 안내에 따라 직진하여 통과합니다.
                </p>
              </div>

              {/* 13단계 (초특급 주의 출구) */}
              <div className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[11px]">13단계</span>
                    <h4 className="text-[14px] font-extrabold text-emerald-950 dark:text-emerald-200">★ 드디어 공항 밖! 출구 선택 주의</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 text-[10px] font-extrabold">길 잃음 방지 1순위</span>
                </div>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium text-[12px]">
                  세관을 통과하면 연방검사구역(Federal Inspection Area) 출구가 나옵니다. 이때 표지판이 두 갈래로 나뉩니다:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11.5px]">
                  <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 font-bold text-emerald-950 dark:text-emerald-100">
                    ✅ <strong>"San Francisco" 출구 (O)</strong>
                    <p className="font-normal text-[11px] text-emerald-900 dark:text-emerald-200 mt-0.5">
                      SFO가 최종 목적지인 승객 전용! 이 문으로 나가면 International Arrivals Meeting Area(공항 로비)로 나옵니다.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 border border-rose-300 font-bold text-rose-950 dark:text-rose-100">
                    ❌ <strong>"Connecting Flights" (X 절대 금지)</strong>
                    <p className="font-normal text-[11px] text-rose-900 dark:text-rose-200 mt-0.5">
                      다른 미국 도시로 비행기를 갈아타는 환승객 전용 통로입니다. 절대 따라가지 마세요!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: 14~17. TRANSIT */}
          {activeSection === "transit" && (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
                <Car className="h-4 w-4 shrink-0 text-indigo-600" />
                <span><strong>공항에서 숙소로 이동 (14~17단계)</strong>: Uber/Lyft 호출 팁 및 택시 승차법</span>
              </div>

              {/* 14단계 */}
              <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-black text-[11px]">14단계</span>
                  <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">숙소 이동 수단 선택: Uber/Lyft 강력 추천 이유</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  첫 미국 출장이라면 일반 택시보다 <strong>Uber 또는 Lyft 앱</strong>을 이용하는 것이 압도적으로 편하고 안전합니다.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] font-bold text-center">
                    📍 목적지 앱에 미리 입력
                  </div>
                  <div className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] font-bold text-center">
                    💵 예상 요금 사전 확정
                  </div>
                  <div className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] font-bold text-center">
                    💳 등록 카드로 자동 결제 (팁 실랑이 X)
                  </div>
                </div>
              </div>

              {/* 15단계 */}
              <div className="p-4 rounded-2xl border-2 border-indigo-400 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-black text-[11px]">15단계</span>
                  <h4 className="text-[14px] font-bold text-indigo-950 dark:text-indigo-200">★ Uber/Lyft 탑승 시 3대 확인법 ("아무 차나 타지 마세요")</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  공항 내 <strong className="text-indigo-600">Ride App Pickup</strong> 구역으로 이동 후 앱으로 차량을 부릅니다. 차가 도착했을 때 반드시 3가지를 확인하세요:
                </p>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 space-y-1.5 text-[11.5px]">
                  <div>① <strong>차량 종류/색상</strong> (예: White Toyota Camry)</div>
                  <div>② <strong>차량 번호판 (License Plate)</strong> (앱에 적힌 번호와 일치하는지)</div>
                  <div>③ <strong>기사 이름 및 본인 확인:</strong> 차에 타기 전 창문 너머로 기사에게 묻습니다.</div>
                  <div className="pt-1 flex items-center justify-between p-2 rounded-lg bg-indigo-50 dark:bg-slate-700 border border-indigo-200">
                    <span className="font-mono font-bold text-indigo-700 dark:text-indigo-300">"Are you here for JS?"</span>
                    <button
                      onClick={() => handleCopy("Are you here for JS?", "uber_js")}
                      className="text-xs text-indigo-600 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === "uber_js" ? "복사됨!" : "복사"}
                    </button>
                  </div>
                </div>
              </div>

              {/* 16단계 */}
              <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-black text-[11px]">16단계</span>
                  <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">만약 Uber가 어려우면: 공항 택시(Taxi) 이용법</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  공항 표지판에서 <strong className="font-bold">Taxi</strong>를 따라가면 정식 택시 승강장이 나옵니다.
                </p>
                <div className="p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] space-y-1 text-[11.5px]">
                  <p><strong>동선:</strong> Taxi 표지판 → 줄 서기 → 안내원 배정 택시 탑승 → 휴대폰으로 호텔 주소 보여주기</p>
                  <div className="pt-1.5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-bold">기사에게 보여줄 영문 주소:</span>
                      <span className="font-mono font-bold text-[12px] text-[var(--color-foreground)]">137 Milton St, San Francisco, CA 94112</span>
                    </div>
                    <button
                      onClick={() => handleCopy("137 Milton St, San Francisco, CA 94112", "addr_milton")}
                      className="px-2 py-1 rounded bg-blue-50 text-[var(--color-blue)] font-bold text-[10px] border border-blue-200 cursor-pointer"
                    >
                      {copiedKey === "addr_milton" ? "복사됨!" : "주소 복사"}
                    </button>
                  </div>
                </div>
              </div>

              {/* 17단계 */}
              <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-black text-[11px]">17단계</span>
                  <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">공항에서 숙소로 이동 중 행동 요령</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11.5px]">
                  <div className="p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
                    <strong className="block text-[var(--color-blue)] mb-0.5 font-bold">🗺️ Google Maps 켜기</strong>
                    <span>목적지를 켜두고 차량이 경로대로 잘 가고 있는지 실시간으로 확인</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
                    <strong className="block text-emerald-600 mb-0.5 font-bold">💵 현금 보관</strong>
                    <span>차량 안에서 굳이 지갑이나 많은 현금을 꺼내지 마세요</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
                    <strong className="block text-amber-600 mb-0.5 font-bold">🌆 창밖 풍경 구경</strong>
                    <span>샌프란시스코의 맑은 하늘과 고속도로 풍경을 감상하며 긴장 풀기</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: 18~20. HOTEL */}
          {activeSection === "hotel" && (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200 flex items-center gap-2">
                <Hotel className="h-4 w-4 shrink-0 text-purple-600" />
                <span><strong>호텔 도착 & 체크인 3단계</strong>: 프런트 영어 및 객실 5대 즉시 점검</span>
              </div>

              {/* 18단계 */}
              <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white font-black text-[11px]">18단계</span>
                  <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">호텔 도착 & 프런트 데스크</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  호텔에 도착하면 짐을 가지고 로비로 들어갑니다. 프런트 데스크 직원에게 다가가서 이렇게 말합니다:
                </p>
                <div className="p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[13px] text-[var(--color-blue)]">"Hi, I have a reservation. It's under Jinsoo Kim."</span>
                    <button
                      onClick={() => handleCopy("Hi, I have a reservation. It's under Jinsoo Kim.", "hotel_hi")}
                      className="text-xs text-slate-500 hover:text-[var(--color-blue)] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === "hotel_hi" ? "복사됨!" : "복사"}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">안녕하세요, 예약했습니다. 김진수 이름으로 되어 있습니다.</p>
                </div>
              </div>

              {/* 19단계 */}
              <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white font-black text-[11px]">19단계</span>
                  <h4 className="text-[14px] font-bold text-[var(--color-foreground)]">체크인 실전 & 만능 문장</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  직원이 실물 여권과 보증금(디포짓) 승인을 위한 신용카드를 요청합니다. 숙박 기간, Wi-Fi 비밀번호, 조식 위치 등을 안내해 줍니다.
                </p>
                <div className="p-3 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1.5">
                  <span className="text-[11px] font-extrabold text-purple-900 dark:text-purple-200 block">
                    👂 직원의 말이 너무 빠르거나 못 알아들었을 때 만능 치트키:
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[13px] text-purple-700 dark:text-purple-300">
                      "Could you speak a little more slowly, please?"
                    </span>
                    <button
                      onClick={() => handleCopy("Could you speak a little more slowly, please?", "slow_please")}
                      className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-purple-300 text-purple-700 dark:text-purple-300 text-[10px] font-bold cursor-pointer"
                    >
                      {copiedKey === "slow_please" ? "복사됨!" : "복사"}
                    </button>
                  </div>
                  <p className="text-[11px] text-purple-800 dark:text-purple-300">
                    "조금만 천천히 말씀해 주실 수 있나요?" (미국 호텔 직원들은 이 말을 들으면 매우 친절하고 천천히 다시 설명해 줍니다.)
                  </p>
                </div>
              </div>

              {/* 20단계 (절대 원칙) */}
              <div className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[11px]">20단계</span>
                    <h4 className="text-[14px] font-extrabold text-emerald-950 dark:text-emerald-200">★ 방에 들어간 후 즉시 5대 점검!</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 text-[10px] font-extrabold">짐 풀기 전 필수</span>
                </div>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-bold text-[12px]">
                  방에 들어가자마자 피곤하다고 침대에 눕거나 짐부터 풀지 마세요! 먼저 이 5가지를 확인하세요:
                </p>
                <div className="space-y-1.5">
                  {[
                    { title: "① 여권", desc: "실물 여권이 작은 가방이나 품 안에 안전하게 있는지 확인" },
                    { title: "② 지갑 & 카드", desc: "신용카드와 달러 현금이 그대로 있는지 확인" },
                    { title: "③ 휴대폰 충전", desc: "침대 옆 콘센트에 즉시 충전기 연결 (110V 어댑터 사용)" },
                    { title: "④ 캐리어 잠금", desc: "캐리어 비밀번호/지퍼 잠금 상태 유지" },
                    { title: "⑤ 호텔 키 카드", desc: "문 밖으로 나갈 때 잃어버리지 않도록 휴대폰 케이스나 지갑 근처에 보관" }
                  ].map((chk, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-[11.5px]"
                    >
                      <span className="font-extrabold text-emerald-900 dark:text-emerald-200">{chk.title}</span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">{chk.desc}</span>
                    </div>
                  ))}
                </div>
                <div className="p-2 rounded-xl bg-emerald-200/60 dark:bg-emerald-900/60 text-emerald-950 dark:text-emerald-100 text-center font-extrabold text-[12px]">
                  🎉 여기까지 완료하시면 샌프란시스코 안전 도착 완료입니다!
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-secondary)]">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>오프라인에서도 언제든 열람 가능합니다</span>
          </div>
          <button
            onClick={onClose}
            className="notion-button-primary px-4 py-2 text-xs active:scale-95 cursor-pointer font-bold"
          >
            확인 완료
          </button>
        </div>
      </div>
    </div>
  );
};
