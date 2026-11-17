"use client";

import { useState } from "react";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { HugeiconsIcon, AddIcon, DeleteIcon, QrCode01Icon, PillIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { usePageCopy } from "@/lib/i18n";
import { copy } from "@/messages/copy/staff";

type Med = { id: number; name: string; dose: string; duration: string };

export function PrescribeView() {
  const c = usePageCopy(copy.doctorPrescribe);
  const [patient, setPatient] = useState("রাহিম উদ্দিন");
  const [diagnosis, setDiagnosis] = useState("");
  const [meds, setMeds] = useState<Med[]>([{ id: 1, name: "", dose: "", duration: "" }]);
  const [saving, setSaving] = useState(false);

  const update = (id: number, field: keyof Med, value: string) =>
    setMeds((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));

  const remove = (id: number) =>
    setMeds((prev) => (prev.length > 1 ? prev.filter((m) => m.id !== id) : prev));

  const complete = meds.every((m) => m.name.trim() && m.dose.trim());

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Mock: POST /prescriptions issues the signed, QR-linked prescription.
    setTimeout(() => {
      setSaving(false);
      toast.success(c.toastIssued);
    }, 700);
  };

  return (
    <>
      <PageHeader title={c.title} description={c.description} />

      <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <Card className="space-y-5 p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label={c.patientName} value={patient} onChange={(e) => setPatient(e.target.value)} required />
              <Input label={c.diagnosis} placeholder={c.diagnosisPlaceholder} value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50">
              <HugeiconsIcon icon={PillIcon} size={18} aria-hidden />
              {c.medListTitle}
            </h2>
            <div className="space-y-4">
              {meds.map((m, i) => (
                <div key={m.id} className="grid items-end gap-3 sm:grid-cols-[1.4fr_1fr_1fr_auto]">
                  <Input label={i === 0 ? c.medName : undefined} placeholder={c.medNamePlaceholder} value={m.name} onChange={(e) => update(m.id, "name", e.target.value)} required />
                  <Input label={i === 0 ? c.dose : undefined} placeholder={c.dosePlaceholder} value={m.dose} onChange={(e) => update(m.id, "dose", e.target.value)} required />
                  <Input label={i === 0 ? c.duration : undefined} placeholder={c.durationPlaceholder} value={m.duration} onChange={(e) => update(m.id, "duration", e.target.value)} />
                  <Button
                    type="button"
                    variant="tertiary"
                    size="md"
                    onClick={() => remove(m.id)}
                    aria-label={c.deleteMed(m.name)}
                    disabled={meds.length === 1}
                    className={cn("mb-0.5", meds.length === 1 && "opacity-40")}
                  >
                    <HugeiconsIcon icon={DeleteIcon} size={16} aria-hidden />
                  </Button>
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" className="mt-5" onClick={() => setMeds((p) => [...p, { id: Date.now(), name: "", dose: "", duration: "" }])}>
              <HugeiconsIcon icon={AddIcon} size={16} aria-hidden />
              {c.addMed}
            </Button>
          </Card>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-6">
            <h2 className="mb-3 flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50">
              <HugeiconsIcon icon={QrCode01Icon} size={18} aria-hidden />
              {c.rulesTitle}
            </h2>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li>{c.rule1}</li>
              <li>{c.rule2}</li>
              <li>{c.rule3}</li>
            </ul>
            <Button type="submit" loading={saving} disabled={!complete} block className="mt-6">
              {c.issue}
            </Button>
          </Card>
        </div>
      </form>
    </>
  );
}
