import React, { useState } from "react";
import {
  X,
  DollarSign,
  Users,
  Receipt,
  Sparkles,
  Percent,
  ArrowRight,
  HelpCircle,
  CreditCard,
  Check
} from "lucide-react";

interface QuickCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  exchangeRate?: number;
}

export const QuickCalculatorModal: React.FC<QuickCalculatorModalProps> = ({
  isOpen,
  onClose,
  exchangeRate = 1385
}) => {
  const [calcTab, setCalcTab] = useState<"tip" | "exchange">("tip");

  // Tip Calculator State
  const [billInput, setBillInput] = useState<string>("45");
  const [tipRate, setTipRate] = useState<number>(18);
  const [peopleCount, setPeopleCount] = useState<number>(2);

  // Exchange Calculator State
  const [usdInput, setUsdInput] = useState<string>("50");
  const [krwInput, setKrwInput] = useState<string>("70000");

  if (!isOpen) return null;

  const billAmount = parseFloat(billInput) || 0;
  const tipAmount = (billAmount * tipRate) / 100;
  const totalAmount = billAmount + tipAmount;
  const perPersonAmount = peopleCount > 0 ? totalAmount / peopleCount : totalAmount;
  const totalKRW = Math.round(totalAmount * exchangeRate);
  const perPersonKRW = Math.round(perPersonAmount * exchangeRate);

  // Exchange calculation
  const calculatedKrw = Math.round((parseFloat(usdInput) || 0) * exchangeRate);
  const calculatedUsd = (parseFloat(krwInput) || 0) / exchangeRate;

  return (
    <div className="fixed inset-0 z-[75] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-[8px] p-0 md:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[92vh] flex flex-col rounded-t-[32px] md:rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* 드래그 핸들 */}
        <div className="pt-3 pb-1">
          <div className="h-1.5 w-12 rounded-full bg-[#d7e3f1] dark:bg-slate-700 mx-auto" />
        </div>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800 shadow-xs">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                  미국 팁 & 환율
                </span>
                <span className="text-[11px] text-[var(--color-text-secondary)] font-medium">
                  1$ = {exchangeRate.toLocaleString()}원 기준
                </span>
              </div>
              <h3 className="text-[16px] font-extrabold tracking-tight text-[var(--color-foreground)]">
                스마트 팁 & 환율 간이 계산기
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

        {/* 탭 버튼 */}
        <div className="p-2 border-b border-[var(--color-border)] bg-[var(--color-surface-alt)] flex gap-2 text-xs">
          <button
            onClick={() => setCalcTab("tip")}
            className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
              calcTab === "tip"
                ? "border-[var(--color-blue)] bg-[var(--color-blue)] text-white shadow-xs"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
            }`}
          >
            <Receipt className="h-3.5 w-3.5" />
            <span>식당 팁 & 더치페이 계산기</span>
          </button>
          <button
            onClick={() => setCalcTab("exchange")}
            className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
              calcTab === "exchange"
                ? "border-[var(--color-blue)] bg-[var(--color-blue)] text-white shadow-xs"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
            }`}
          >
            <DollarSign className="h-3.5 w-3.5" />
            <span>원화/달러 환율 계산기</span>
          </button>
        </div>

        {/* 바디 스크롤 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* TAB 1: TIP & SPLIT BILL */}
          {calcTab === "tip" && (
            <div className="space-y-4">
              {/* 1. 식사 금액 입력 */}
              <div className="p-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <label className="block text-[11.5px] font-bold text-[var(--color-foreground)]">
                  음식값 (영수증 Subtotal 금액)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-base font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={billInput}
                    onChange={(e) => setBillInput(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-3 py-2 text-lg font-mono font-bold rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-blue)]"
                  />
                </div>

                {/* 퀵 프리셋 버튼 */}
                <div className="flex gap-1.5 pt-1">
                  {[20, 35, 50, 80, 120].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setBillInput(amt.toString())}
                      className="px-2.5 py-1 rounded-lg bg-[var(--color-surface-alt)] hover:bg-slate-200 dark:hover:bg-slate-700 border border-[var(--color-border)] text-[10.5px] font-mono font-bold text-slate-600 dark:text-slate-300 active:scale-95"
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. 팁 비율 선택 */}
              <div className="p-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11.5px] font-bold text-[var(--color-foreground)]">
                    팁(Tip) 비율 선택
                  </label>
                  <span className="text-[10.5px] text-[var(--color-blue)] font-bold">
                    💡 미국 일반 식당은 18%가 표준입니다
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { rate: 15, label: "15%", sub: "보통" },
                    { rate: 18, label: "18%", sub: "만족 (추천)" },
                    { rate: 20, label: "20%", sub: "매우 훌륭" },
                    { rate: 0, label: "0%", sub: "테이크아웃" }
                  ].map((t) => {
                    const isSelected = tipRate === t.rate;
                    return (
                      <button
                        key={t.rate}
                        onClick={() => setTipRate(t.rate)}
                        className={`p-2 rounded-xl text-center border transition-all cursor-pointer active:scale-95 ${
                          isSelected
                            ? "border-[var(--color-blue)] bg-blue-50/80 dark:bg-blue-950/60 text-[var(--color-blue)] ring-2 ring-blue-500/20 font-black shadow-xs"
                            : "border-[var(--color-border)] bg-[var(--color-surface-alt)] text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        <div className="text-[13px] font-mono">{t.label}</div>
                        <div className="text-[9.5px] opacity-80">{t.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. 더치페이 인원 선택 */}
              <div className="p-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[var(--color-blue)]" />
                  <div>
                    <span className="font-bold text-[12px] block text-[var(--color-foreground)]">
                      함께 계산할 인원 (더치페이)
                    </span>
                    <span className="text-[10px] text-slate-400">1인당 분할 계산</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                    className="w-7 h-7 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-bold text-sm flex items-center justify-center active:scale-90"
                  >
                    -
                  </button>
                  <span className="font-mono font-black text-sm w-6 text-center text-[var(--color-foreground)]">
                    {peopleCount}명
                  </span>
                  <button
                    onClick={() => setPeopleCount(Math.min(10, peopleCount + 1))}
                    className="w-7 h-7 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] font-bold text-sm flex items-center justify-center active:scale-90"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 4. 계산 결과 하이라이트 카드 */}
              <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-center pb-2 border-b border-emerald-200 dark:border-emerald-800">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200">
                    <span className="text-[10px] text-slate-500 font-bold block">팁 금액 ({tipRate}%)</span>
                    <p className="font-mono font-extrabold text-[15px] text-emerald-700 dark:text-emerald-300">
                      ${tipAmount.toFixed(2)}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      약 {Math.round(tipAmount * exchangeRate).toLocaleString()}원
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200">
                    <span className="text-[10px] text-slate-500 font-bold block">총 결제액 (음식값+팁)</span>
                    <p className="font-mono font-black text-[16px] text-[var(--color-blue)]">
                      ${totalAmount.toFixed(2)}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      약 {totalKRW.toLocaleString()}원
                    </span>
                  </div>
                </div>

                {/* 1인당 금액 (2명 이상일 때) */}
                {peopleCount > 1 && (
                  <div className="p-2.5 rounded-xl bg-emerald-100/70 dark:bg-emerald-900/40 border border-emerald-300 flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-emerald-900 dark:text-emerald-200 text-[11.5px] block">
                        👥 1인당 부담 금액 ({peopleCount}인 기준):
                      </span>
                      <span className="text-[10px] text-emerald-800 dark:text-emerald-300">
                        약 {perPersonKRW.toLocaleString()}원
                      </span>
                    </div>
                    <p className="font-mono font-black text-[17px] text-emerald-900 dark:text-emerald-100">
                      ${perPersonAmount.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>

              {/* 5. 미국 영수증 작성법 시각 가이드 */}
              <div className="p-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-[12px] text-[var(--color-foreground)]">
                  <Receipt className="h-4 w-4 text-slate-500" />
                  <span>미국 식당 영수증(Merchant Copy) 작성법 예시</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 font-mono text-[11.5px] space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span>${billAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Tax (약 8.6%):</span>
                    <span>${(billAmount * 0.086).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-300 dark:border-slate-700 pt-1 flex justify-between font-bold text-emerald-600">
                    <span>Tip (직접 기재):</span>
                    <span className="bg-emerald-100 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded">
                      ${tipAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between font-extrabold text-[13px] text-[var(--color-blue)]">
                    <span>Total (합산 기재):</span>
                    <span className="bg-blue-100 dark:bg-blue-900/60 px-1.5 py-0.5 rounded">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-2 text-right text-[10px] text-slate-400 font-sans">
                    * Signature: 자필 서명 후 영수증과 카드 폴더를 테이블에 두고 퇴장하시면 됩니다.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GENERAL EXCHANGE CONVERTER */}
          {calcTab === "exchange" && (
            <div className="space-y-4">
              {/* USD -> KRW */}
              <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <label className="block text-[11.5px] font-bold text-[var(--color-foreground)]">
                  미국 달러(USD) ➡️ 대한민국 원화(KRW)
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 font-bold text-slate-400">$</span>
                    <input
                      type="number"
                      value={usdInput}
                      onChange={(e) => setUsdInput(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 font-mono font-bold rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                    />
                  </div>
                  <span className="font-bold text-slate-400">➡️</span>
                  <div className="flex-1 p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 text-center">
                    <span className="font-mono font-black text-sm text-[var(--color-blue)]">
                      {calculatedKrw.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>

              {/* KRW -> USD */}
              <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
                <label className="block text-[11.5px] font-bold text-[var(--color-foreground)]">
                  대한민국 원화(KRW) ➡️ 미국 달러(USD)
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      step="1000"
                      value={krwInput}
                      onChange={(e) => setKrwInput(e.target.value)}
                      className="w-full px-3 py-2 font-mono font-bold rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)]"
                    />
                  </div>
                  <span className="font-bold text-slate-400">➡️</span>
                  <div className="flex-1 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-center">
                    <span className="font-mono font-black text-sm text-emerald-700 dark:text-emerald-300">
                      ${calculatedUsd.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
                💡 <strong>토스뱅크 외화통장 팁:</strong> 해외 결제 시 카드 결제 수수료가 0원이므로, 현지 식당/상점에서 카드 리더기에 'USD(현지통화)'로 결제하시는 것이 이중 환전 수수료가 없어 가장 유리합니다!
              </div>
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex justify-end">
          <button
            onClick={onClose}
            className="notion-button-primary px-4 py-1.5 text-xs active:scale-95 cursor-pointer font-bold"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
