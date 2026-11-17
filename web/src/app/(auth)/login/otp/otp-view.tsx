"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { HugeiconsIcon, LockIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/auth";

const LENGTH = 6;

export function OtpView() {
  const router = useRouter();
  const c = usePageCopy(copy.loginOtp);
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [verifying, setVerifying] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = d;
      return next;
    });
    if (d && i < LENGTH - 1) refs.current[i + 1]?.focus();
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const onPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!text) return;
    setDigits(Array.from({ length: LENGTH }, (_, i) => text[i] ?? ""));
    refs.current[Math.min(text.length, LENGTH - 1)]?.focus();
  };

  const complete = digits.every(Boolean);

  const onVerify = () => {
    setVerifying(true);
    // Mock verify: POST /auth/otp/verify lands with the API integration.
    setTimeout(() => {
      setVerifying(false);
      toast.success(c.toastSuccess);
      router.push("/onboarding/role");
    }, 600);
  };

  return (
    <Card className="p-8">
      <div className="mb-6 text-center">
        <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-brand-25 text-brand-500 dark:bg-brand-900 dark:text-brand-300">
          <HugeiconsIcon icon={LockIcon} size={24} aria-hidden />
        </span>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">{c.title}</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{c.subtitle}</p>
      </div>

      <div className="mb-6 flex justify-center gap-2" onPaste={onPaste} aria-label={c.otpGroupLabel}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={d}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            inputMode="numeric"
            autoComplete="one-time-code"
            aria-label={c.digitLabel(i + 1)}
            className={cn(
              "h-12 w-11 rounded-lg border bg-white text-center text-lg font-semibold text-gray-900 transition-colors duration-150",
              "border-gray-300 focus-visible:border-brand-300 focus-visible:outline-2 focus-visible:outline-brand-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
            )}
          />
        ))}
      </div>

      <Button onClick={onVerify} disabled={!complete} loading={verifying} block>
        {c.verify}
      </Button>

      <p className="mt-5 text-center text-xs text-gray-500 dark:text-gray-400">
        {c.resendPrompt} <span className="font-medium text-brand-600 dark:text-brand-300">{c.resend}</span> ·{" "}
        <button type="button" onClick={() => router.push("/login")} className="underline underline-offset-2">
          {c.changeNumber}
        </button>
      </p>
    </Card>
  );
}
