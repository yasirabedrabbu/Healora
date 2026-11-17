"use client";

import { useState } from "react";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { HugeiconsIcon, AmbulanceIcon, CallIcon, Location01Icon, ClockIcon } from "@/components/icons";

// Mock nearby ambulances (Phase 4: booking + live status).
const fleet = [
  { id: "AMB-01", area: "ধানমন্ডি", eta: "৮ মিনিট", type: "BLS", status: "available" },
  { id: "AMB-02", area: "গুলশান", eta: "১৫ মিনিট", type: "ICU", status: "available" },
  { id: "AMB-03", area: "মিরপুর", eta: "—", type: "BLS", status: "on-duty" },
] as const;

export default function AmbulancePage() {
  const [booking, setBooking] = useState<string | null>(null);

  const book = (id: string) => {
    setBooking(id);
    // Mock: POST /ambulance/bookings (Phase 4 API).
    setTimeout(() => {
      setBooking(null);
      toast.success(`${id} বুক হয়েছে — ড্রাইভার কল করবে। জরুরিতে ৯৯৯ ডায়াল করুন।`);
    }, 600);
  };

  return (
    <section className="py-10">
      <Container className="max-w-4xl">
        <PageHeader
          title="অ্যাম্বুলেন্স"
          description="নিকটতম অ্যাম্বুলেন্স বুকিং + লাইভ স্ট্যাটাস (Handoff §5 P4)।"
          action={
            <Button variant="outline" className="border-error-300 text-error-700 dark:text-error-300">
              <HugeiconsIcon icon={CallIcon} size={18} aria-hidden />
              জরুরি: ৯৯৯
            </Button>
          }
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {fleet.map((a) => (
            <Card key={a.id} className="flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-error-50 text-error-600 dark:bg-error-700/10 dark:text-error-300">
                  <HugeiconsIcon icon={AmbulanceIcon} size={22} aria-hidden />
                </span>
                <Badge color={a.status === "available" ? "success" : "gray"} size="sm" dot>
                  {a.status === "available" ? "খালি আছে" : "ডিউটিতে"}
                </Badge>
              </div>
              <h2 className="mt-4 font-semibold text-gray-900 dark:text-gray-50">{a.id}</h2>
              <p className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <HugeiconsIcon icon={Location01Icon} size={12} aria-hidden />
                {a.area}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <HugeiconsIcon icon={ClockIcon} size={12} aria-hidden />
                ETA {a.eta} · {a.type}
              </p>
              <Button
                size="sm"
                className="mt-4"
                disabled={a.status !== "available"}
                loading={booking === a.id}
                onClick={() => book(a.id)}
              >
                বুক করুন
              </Button>
            </Card>
          ))}
        </div>

        <Input
          className="mt-6"
          label="পিকআপ ঠিকানা"
          placeholder="বাসা/রোড, এলাকা"
          required
        />
        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
          লাইফ-থ্রেটেনিং ইমার্জেন্সিতে অ্যাপের অপেক্ষা নয় — সরাসরি ৯৯৯।
        </p>
      </Container>
    </section>
  );
}
