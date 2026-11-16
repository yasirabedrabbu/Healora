"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { HugeiconsIcon, SmartphoneIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Mock OTP request: POST /auth/otp/request lands with the API integration.
    setTimeout(() => {
      setSending(false);
      toast.success("ওটিপি পাঠানো হয়েছে (মক)।");
      router.push("/login/otp");
    }, 500);
  };

  return (
    <Card className="p-8">
      <div className="mb-6 text-center">
        <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-brand-25 text-brand-500 dark:bg-brand-900 dark:text-brand-300">
          <HugeiconsIcon icon={SmartphoneIcon} size={24} aria-hidden />
        </span>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">লগইন করুন</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          ফোন নম্বর বা ইমেইল দিয়ে শুরু করুন। ওটিপি দিয়েই লগইন — পাসওয়ার্ড লাগবে না।
        </p>
      </div>

      <form onSubmit={onSubmit} className={cn("space-y-5")}>
        <Input
          label="ফোন / ইমেইল"
          type="tel"
          inputMode="tel"
          placeholder="01XXXXXXXXX"
          required
        />
        <Button type="submit" loading={sending} block>
          ওটিপি পাঠান
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
        লগইন করলে আপনি আমাদের শর্তাবলি ও প্রাইভেসি পলিসিতে সম্মত হচ্ছেন।
      </p>
    </Card>
  );
}
