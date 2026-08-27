import React, { useState } from "react";
import { Lock, KeyRound, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";

interface AuthModalProps {
  correctPin: string;
  onSuccess: () => void;
  onChangePin: (newPin: string) => void;
  isChangingPin?: boolean;
  onCancelChangePin?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  correctPin,
  onSuccess,
  onChangePin,
  isChangingPin = false,
  onCancelChangePin
}) => {
  const [pinInput, setPinInput] = useState("");
  const [newPinInput, setNewPinInput] = useState("");
  const [confirmPinInput, setConfirmPinInput] = useState("");
  const [error, setError] = useState("");

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === correctPin) {
      setError("");
      onSuccess();
    } else {
      setError("PIN 번호가 일치하지 않습니다. (기본값: 1234)");
      setPinInput("");
    }
  };

  const handleSaveNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.length < 4) {
      setError("새 PIN은 최소 4자리 이상이어야 합니다.");
      return;
    }
    if (newPinInput !== confirmPinInput) {
      setError("새 PIN 번호 확인이 일치하지 않습니다.");
      return;
    }
    onChangePin(newPinInput);
    alert("PIN 번호가 성공적으로 변경되었습니다.");
    if (onCancelChangePin) onCancelChangePin();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-[10px] p-0 md:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-[32px] md:rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl space-y-5 animate-in slide-in-from-bottom duration-300">
        {/* 드래그 핸들 */}
        <div className="h-1.5 w-12 rounded-full bg-[#d7e3f1] dark:bg-slate-700 mx-auto" />

        {/* 헤더 */}
        <div className="text-center space-y-1">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-blue-soft)] text-[var(--color-blue)]">
            {isChangingPin ? <KeyRound className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
          </div>
          <h2 className="text-xl font-bold tracking-[-0.03em] text-[var(--color-foreground)]">
            {isChangingPin ? "보안 PIN 번호 변경" : "DreamPass 보안 잠금"}
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)]">
            {isChangingPin
              ? "새로운 마스터 PIN을 설정하세요."
              : "출장 서류와 동료 정보 보호를 위해 PIN을 입력하세요."}
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50/60 p-3 text-xs text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {!isChangingPin ? (
          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input
                type="password"
                inputMode="numeric"
                maxLength={8}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setError("");
                }}
                placeholder="PIN 번호 입력"
                autoFocus
                className="w-full text-center text-3xl tracking-[0.4em] font-mono py-3.5 rounded-2xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-blue)] focus:ring-4 focus:ring-[var(--color-blue-soft)]"
              />
            </div>

            <button
              type="submit"
              className="notion-button-primary w-full flex items-center justify-center gap-2 py-3.5 active:scale-[0.97] cursor-pointer"
            >
              <span>잠금 해제</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="pt-1 text-[11px] text-[var(--color-text-secondary)] flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>로컬 보안 보관 시스템 (기본 PIN: <span className="font-bold text-[var(--color-blue)]">1234</span>)</span>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSaveNewPin} className="space-y-3.5 text-left">
            <div className="space-y-1">
              <label className="block text-[12px] font-bold text-[var(--color-foreground)]">새 PIN 번호</label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={8}
                value={newPinInput}
                onChange={(e) => setNewPinInput(e.target.value)}
                placeholder="4~8자리 숫자"
                className="w-full text-center text-lg font-mono py-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-blue)]"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[12px] font-bold text-[var(--color-foreground)]">새 PIN 번호 확인</label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={8}
                value={confirmPinInput}
                onChange={(e) => setConfirmPinInput(e.target.value)}
                placeholder="한 번 더 입력"
                className="w-full text-center text-lg font-mono py-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-blue)]"
              />
            </div>

            <div className="flex gap-2 pt-2">
              {onCancelChangePin && (
                <button
                  type="button"
                  onClick={onCancelChangePin}
                  className="notion-button-secondary flex-1 py-2.5 text-xs active:scale-[0.97] cursor-pointer"
                >
                  취소
                </button>
              )}
              <button
                type="submit"
                className="notion-button-primary flex-1 py-2.5 text-xs active:scale-[0.97] cursor-pointer"
              >
                PIN 변경 완료
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
