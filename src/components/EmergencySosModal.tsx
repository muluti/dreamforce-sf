import React from "react";
import {
  X,
  Phone,
  ShieldAlert,
  AlertTriangle,
  MapPin,
  CreditCard,
  Building,
  ExternalLink,
  Lock,
  Smartphone,
  EyeOff
} from "lucide-react";

interface EmergencySosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencySosModal: React.FC<EmergencySosModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-[8px] p-0 md:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl max-h-[92vh] flex flex-col rounded-t-[32px] md:rounded-[32px] border-2 border-rose-300 dark:border-rose-800 bg-[var(--color-surface)] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* 드래그 핸들 */}
        <div className="pt-3 pb-1">
          <div className="h-1.5 w-12 rounded-full bg-rose-200 dark:bg-rose-900 mx-auto" />
        </div>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-rose-100 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/30">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs animate-pulse">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-rose-600 text-white">
                  EMERGENCY SOS
                </span>
                <span className="text-[11px] text-rose-700 dark:text-rose-300 font-bold">
                  24시간 긴급 지원망
                </span>
              </div>
              <h3 className="text-[16px] font-black tracking-tight text-rose-950 dark:text-rose-200">
                1초 긴급 SOS & SF 치안 안심 센터
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

        {/* 바디 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* 1. 최우선 긴급 전화 원터치 다이얼 (빨간색 3대 직통) */}
          <div className="space-y-2">
            <span className="font-extrabold text-[12px] text-rose-950 dark:text-rose-200 block">
              🚨 즉시 터치하여 전화 걸기 (Emergency Hotlines)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* 911 */}
              <a
                href="tel:911"
                className="p-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center justify-between shadow-sm active:scale-95 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <span className="text-[11px] opacity-90 block">미국 경찰/소방/구급</span>
                    <span className="text-[16px] font-black tracking-wider">911 긴급전화</span>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-lg bg-white/20 text-[11px] font-extrabold">통화</span>
              </a>

              {/* SF 총영사관 야간당직 */}
              <a
                href="tel:+14152652636"
                className="p-3.5 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold flex items-center justify-between shadow-sm active:scale-95 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Building className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10.5px] text-slate-300 block">SF 대한민국 총영사관</span>
                    <span className="text-[13.5px] font-black">사건사고 24h 긴급</span>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-lg bg-white/10 text-[11px] font-mono font-bold">+1 415-265-2636</span>
              </a>
            </div>

            {/* 영사관 일반 및 외교부 콜센터 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11.5px]">
              <a
                href="tel:+14159212251"
                className="p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] flex items-center justify-between hover:border-blue-300 active:scale-95"
              >
                <div>
                  <span className="text-slate-500 block text-[10px]">총영사관 주간 대표전화</span>
                  <span className="font-bold text-[var(--color-foreground)]">+1 415-921-2251</span>
                </div>
                <Phone className="h-3.5 w-3.5 text-blue-600" />
              </a>

              <a
                href="tel:+82232100404"
                className="p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] flex items-center justify-between hover:border-blue-300 active:scale-95"
              >
                <div>
                  <span className="text-slate-500 block text-[10px]">외교부 24시간 영사콜센터</span>
                  <span className="font-bold text-[var(--color-foreground)]">+82 2-3210-0404</span>
                </div>
                <Phone className="h-3.5 w-3.5 text-blue-600" />
              </a>
            </div>
          </div>

          {/* 2. SF 2대 위험 지역 경고 및 회피 지도 */}
          <div className="p-4 rounded-2xl border border-rose-300 dark:border-rose-900 bg-rose-50/70 dark:bg-rose-950/30 space-y-2.5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4.5 w-4.5 text-rose-600" />
              <h4 className="text-[13px] font-extrabold text-rose-950 dark:text-rose-200">
                ⚠️ [절대 주의] SF 텐더로인(Tenderloin) 도보 진입 금지
              </h4>
            </div>

            <p className="text-[11.5px] text-rose-900 dark:text-rose-200 leading-relaxed">
              모스콘 센터에서 불과 10~15분 거리인 <strong>텐더로인(Tenderloin)</strong> 지역은 마약, 노숙인 텐트촌, 총기/폭력 사고가 빈번하여 <strong>낮에도 절대로 걸어서 들어가면 안 됩니다!</strong>
            </p>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 text-[11px] space-y-1">
              <strong className="text-rose-700 dark:text-rose-400 block font-extrabold">🚫 회피해야 할 구역 경계:</strong>
              <p className="text-slate-700 dark:text-slate-300">
                • <strong>북쪽:</strong> Geary St / <strong>남쪽:</strong> Market St / <strong>서쪽:</strong> Van Ness Ave
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                • <strong>SOMA 남쪽 일부 골목 (6th St, 7th St 교차로):</strong> 야간 도보 절대 금지! 이동 시 반드시 <strong>Uber/Lyft</strong> 호출하세요.
              </p>
            </div>
          </div>

          {/* 3. 스마트폰 날치기(Bipping) 예방 3대 수칙 */}
          <div className="p-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[12.5px] text-[var(--color-foreground)]">
              <Smartphone className="h-4 w-4 text-amber-500" />
              <span>샌프란시스코 여행자 도난 방지 3대 수칙</span>
            </div>

            <div className="space-y-1.5 text-[11.5px]">
              <div className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
                <strong>① 길거리에서 스마트폰 보며 걷지 않기:</strong> 인도 차도 경계에서 자전거/스쿠터 날치기가 발생합니다. 폰은 건물 안이나 매장 안에서 확인하세요.
              </div>
              <div className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
                <strong>② 차량 내 물건 절대 방치 금지:</strong> 렌터카나 우버 하차 시 가방, 겉옷, 동전 하나라도 창밖에 보이면 30초 만에 유리창을 깨고 훔쳐갑니다(Bipping).
              </div>
              <div className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
                <strong>③ 여권 분실 대비:</strong> 여권 원본은 기내 작은 가방 또는 안전한 몸 안쪽에 보관하고, 사진/사본을 스마트폰에 저장해 두세요.
              </div>
            </div>
          </div>

          {/* 4. 한국 카드사 24시간 해외 분실신고 센터 */}
          <div className="p-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[12px] text-[var(--color-foreground)]">
              <CreditCard className="h-4 w-4 text-[var(--color-blue)]" />
              <span>신용/체크카드 분실 시 즉시 정지 연락처</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
              <a
                href="tel:+82220600000"
                className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] flex items-center justify-between"
              >
                <span>토스뱅크</span>
                <span className="font-bold text-blue-600">+82 2-2060-0000</span>
              </a>
              <a
                href="tel:+82230159200"
                className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] flex items-center justify-between"
              >
                <span>현대카드</span>
                <span className="font-bold text-blue-600">+82 2-3015-9200</span>
              </a>
              <a
                href="tel:+82263007300"
                className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] flex items-center justify-between"
              >
                <span>KB국민</span>
                <span className="font-bold text-blue-600">+82 2-6300-7300</span>
              </a>
              <a
                href="tel:+82234207000"
                className="p-2 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] flex items-center justify-between"
              >
                <span>신한카드</span>
                <span className="font-bold text-blue-600">+82 2-3420-7000</span>
              </a>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex justify-end">
          <button
            onClick={onClose}
            className="notion-button-primary px-4 py-1.5 text-xs active:scale-95 cursor-pointer font-bold"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
