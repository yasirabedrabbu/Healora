"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { HugeiconsIcon, Stethoscope02Icon, CameraIcon, Shield01Icon } from "@/components/icons";

export default function DoctorRegisterPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Mock submit: POST /doctors/register lands with the API integration.
    setTimeout(() => {
      setSubmitting(false);
      toast.success("আবেদন জমা হয়েছে! ভেরিফিকেশনের পর ইমেইল পাবেন।");
      router.push("/login");
    }, 700);
  };

  return (
    <Card className="p-8">
      <div className="mb-6 text-center">
        <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-brand-25 text-brand-500 dark:bg-brand-900 dark:text-brand-300">
          <HugeiconsIcon icon={Stethoscope02Icon} size={24} aria-hidden />
        </span>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">ডাক্তার হিসেবে যোগ দিন</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          BMDC + NID + সেলফি যাচাইয়ের পরেই ভেরিফায়েড ব্যাজ।
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <Input label="পুরো নাম" placeholder="ডা. মাহমুদ রহমান" required />
        <Input label="BMDC নম্বর" placeholder="A-12345" required />
        <Input label="NID নম্বর" placeholder="১৯৯..." required />
        <div className="rounded-xl border border-dashed border-gray-300 p-5 text-center dark:border-gray-700">
          <HugeiconsIcon icon={CameraIcon} size={22} aria-hidden className="mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500 dark:text-gray-400">সেলফি আর সার্টিফিকেট আপলোড</p>
          <button type="button" className="mt-2 text-xs font-medium text-brand-600 underline underline-offset-2 dark:text-brand-300">
            ফাইল বাছুন
          </button>
        </div>
        <div className="flex items-start gap-2 rounded-lg bg-brand-25 p-3 text-xs text-brand-700 dark:bg-brand-900 dark:text-brand-200">
          <HugeiconsIcon icon={Shield01Icon} size={16} aria-hidden className="mt-0.5 shrink-0" />
          অ্যাডমিন ম্যানুয়ালি যাচাই করে অ্যাপ্রুভ করলে তবেই প্রোফাইল লাইভ হবে।
        </div>
        <Button type="submit" loading={submitting} block>
          আবেদন জমা দিন
        </Button>
      </form>
    </Card>
  );
}
