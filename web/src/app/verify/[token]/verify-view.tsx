"use client";

import { Badge } from "@/components/ui/Badge";
import { HugeiconsIcon, QrCode01Icon, BadgeCheckIcon, Doctor02Icon, MedicalFileIcon } from "@/components/icons";
import { cardBase, cardVariants } from "@/components/ui/Card/variants";
import { cn } from "@/lib/utils";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/auth";

// Mock: backend ashle ekhane API call hobe (GET /verify/{qr_token})
const prescription = {
  doctor: "ডা. মাহমুদ রহমান",
  regNo: "A-00000",
  date: "১৬ নভে ২০২৬",
  medicines: ["প্যারাসিটামল ৫০০মিগ্রা · ১+১+১ · ৫ দিন"],
  validUntil: "১৬ ডিসে ২০২৬",
  status: "valid" as const,
};

export function VerifyView({ token }: { token: string }) {
  const c = usePageCopy(copy.verify);
  const isValid = prescription.status === "valid";

  return (
    <div className={cn(cardBase, cardVariants.outlined, "p-8")}>
      {/* Verdict banner · icon + text + colour (colour-blind-safe) */}
      <div
        className={cn(
          "mb-6 flex items-center gap-3 rounded-lg border p-4",
          isValid
            ? "border-success-200 bg-success-50 text-success-700 dark:bg-success-700/10 dark:text-success-300"
            : "border-error-200 bg-error-50 text-error-700 dark:bg-error-700/10 dark:text-error-300"
        )}
      >
        <HugeiconsIcon icon={BadgeCheckIcon} size={24} aria-hidden />
        <div>
          <p className="font-semibold">{isValid ? c.verdictValid : c.verdictInvalid}</p>
          <p className="text-xs opacity-80">{c.verdictNote}</p>
        </div>
      </div>

      <p className="mb-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <HugeiconsIcon icon={QrCode01Icon} size={16} aria-hidden />
        {c.tokenLabel} <span className="font-mono text-gray-900 dark:text-gray-100">{token}</span>
      </p>

      <h1 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-50">
        <HugeiconsIcon icon={MedicalFileIcon} size={20} aria-hidden />
        {c.prescriptionTitle}
      </h1>

      <dl className="space-y-4 text-sm">
        <div className="flex justify-between border-b border-gray-200 pb-3 dark:border-gray-800">
          <dt className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
            <HugeiconsIcon icon={Doctor02Icon} size={16} aria-hidden /> {c.doctorLabel}
          </dt>
          <dd className="font-medium text-gray-900 dark:text-gray-100">{prescription.doctor}</dd>
        </div>
        <div className="flex justify-between border-b border-gray-200 pb-3 dark:border-gray-800">
          <dt className="text-gray-500 dark:text-gray-400">{c.bmdcLabel}</dt>
          <dd className="font-medium text-gray-900 dark:text-gray-100">{prescription.regNo}</dd>
        </div>
        <div className="flex justify-between border-b border-gray-200 pb-3 dark:border-gray-800">
          <dt className="text-gray-500 dark:text-gray-400">{c.dateLabel}</dt>
          <dd className="font-medium text-gray-900 dark:text-gray-100">{prescription.date}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500 dark:text-gray-400">{c.validUntilLabel}</dt>
          <dd className="font-medium text-gray-900 dark:text-gray-100">{prescription.validUntil}</dd>
        </div>
      </dl>

      <div className="mt-6 rounded-xl bg-gray-25 p-4 dark:bg-gray-900">
        <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-50">{c.medicinesLabel}</p>
        <ul className="list-inside list-disc text-sm text-gray-500 dark:text-gray-400">
          {prescription.medicines.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Badge color={isValid ? "success" : "error"} dot>
          {isValid ? c.badgeVerified : c.badgeInvalid}
        </Badge>
      </div>
    </div>
  );
}
