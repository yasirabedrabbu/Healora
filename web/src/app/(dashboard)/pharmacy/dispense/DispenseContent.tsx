"use client";

import { useState } from "react";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { HugeiconsIcon, ScanIcon, QrCode01Icon, BadgeCheckIcon, AlertCircleIcon } from "@/components/icons";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/tools";

type VerifyResult = {
  ok: boolean;
  doctor: { name: string; bmdcNo: string };
  status: string;
  expired: boolean;
  items: { medicine: string; dose: string; duration: string }[];
};

export function DispenseContent() {
  const c = usePageCopy({ bn: copy.bn.pharmacyDispense, en: copy.en.pharmacyDispense });
  const [token, setToken] = useState("");
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [checking, setChecking] = useState(false);

  const verify = () => {
    setChecking(true);
    // GET /api/verify/[token] then POST /prescriptions/[id]/dispense.
    setTimeout(() => {
      setChecking(false);
      const r: VerifyResult = {
        ok: true,
        doctor: { name: "ডা. মাহমুদ রহমান", bmdcNo: "A-00000" },
        status: "ACTIVE",
        expired: false,
        items: [
          { medicine: "নাপা এক্সট্রা", dose: "১+০+১", duration: "৫ দিন" },
          { medicine: "সেক্সোফেন", dose: "০+০+১", duration: "৭ দিন" },
        ],
      };
      setResult(r);
    }, 500);
  };

  const dispense = () => {
    setResult(null);
    setToken("");
    toast.success(c.dispensedToast);
  };

  const blocked = result?.status === "DISPENSED" || result?.expired;

  return (
    <>
      <PageHeader title={c.headerTitle} description={c.headerDesc} />

      <Card className="mb-6 p-6">
        <label htmlFor="qr-token" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {c.tokenLabel}
        </label>
        <div className="mt-2 flex gap-3">
          <input
            id="qr-token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="hex token…"
            className="h-11 flex-1 rounded-lg border border-gray-300 bg-white px-3 text-sm focus-visible:outline-2 focus-visible:outline-brand-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
          />
          <Button onClick={verify} loading={checking} disabled={token.length < 4}>
            <HugeiconsIcon icon={ScanIcon} size={18} aria-hidden />
            {c.verifyButton}
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50">
              <HugeiconsIcon icon={QrCode01Icon} size={18} aria-hidden />
              {c.resultHeading}
            </h2>
            <Badge color={blocked ? "error" : "success"} size="sm" dot>
              {result.expired ? c.statusExpired : result.status === "DISPENSED" ? c.statusDispensed : c.statusValid}
            </Badge>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-xl bg-success-25 p-3 text-sm text-success-700 dark:bg-success-700/10 dark:text-success-300">
            <HugeiconsIcon icon={BadgeCheckIcon} size={18} aria-hidden />
            {result.doctor.name} · BMDC {result.doctor.bmdcNo}
          </div>

          <ul className="mt-4 space-y-2">
            {result.items.map((i) => (
              <li key={i.medicine} className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>{i.medicine}</span>
                <span className="text-gray-400">{i.dose} · {i.duration}</span>
              </li>
            ))}
          </ul>

          {blocked ? (
            <p className="mt-4 flex items-center gap-2 rounded-xl bg-error-50 p-3 text-sm text-error-700 dark:bg-error-700/10 dark:text-error-300">
              <HugeiconsIcon icon={AlertCircleIcon} size={18} aria-hidden />
              {c.blockedMsg}
            </p>
          ) : (
            <Button onClick={dispense} className="mt-5" block>
              {c.dispenseButton}
            </Button>
          )}
        </Card>
      )}
    </>
  );
}
