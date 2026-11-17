import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HugeiconsIcon, QrCode01Icon, BloodTypeIcon, AlertCircleIcon, UserIcon } from "@/components/icons";

export const metadata = { title: "ইমার্জেন্সি কার্ড" };

/** Emergency card (§5 P3): blood group, allergy, QR lock-screen. */
export default function EmergencyCardPage() {
  return (
    <>
      <PageHeader
        title="ইমার্জেন্সি কার্ড"
        description="লক-স্ক্রিনে QR — অচেতন অবস্থাতেও সাধারণ তথ্য সাথে থাকবে।"
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-blood/10 text-blood">
                <HugeiconsIcon icon={BloodTypeIcon} size={22} aria-hidden />
              </span>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">রাহিম উদ্দিন</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">৩৪ বছর · পুরুষ</p>
              </div>
            </div>
            <Badge color="error" size="md">ইমার্জেন্সি</Badge>
          </div>

          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-gray-500 dark:text-gray-400">রক্তের গ্রুপ</dt>
              <dd className="font-heading text-2xl font-bold text-blood">O+</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500 dark:text-gray-400">অ্যালার্জি</dt>
              <dd className="font-semibold text-gray-900 dark:text-gray-50">পেনিসিলিন</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500 dark:text-gray-400">দীর্ঘমেয়াদি রোগ</dt>
              <dd className="font-semibold text-gray-900 dark:text-gray-50">ডায়াবেটিস (টাইপ ২)</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500 dark:text-gray-400">জরুরি যোগাযোগ</dt>
              <dd className="font-semibold text-gray-900 dark:text-gray-50">পরিবার · ০১৭১১-১১১১১১</dd>
            </div>
          </dl>

          <p className="mt-8 flex items-start gap-2 rounded-xl bg-warning-25 p-3 text-xs text-warning-700 dark:bg-warning-700/10 dark:text-warning-300">
            <HugeiconsIcon icon={AlertCircleIcon} size={16} aria-hidden className="mt-0.5 shrink-0" />
            কার্ডে শুধু জরুরি প্রয়োজনীয় তথ্য থাকে; পূর্ণ রেকর্ড শুধু আপনার অনুমতিতে খোলে।
          </p>
        </Card>

        <Card className="flex flex-col items-center justify-center gap-4 p-8 text-center">
          <span className="grid h-32 w-32 place-items-center rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <HugeiconsIcon icon={QrCode01Icon} size={72} aria-hidden className="text-gray-900 dark:text-gray-50" />
          </span>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            এই QR লক-স্ক্রিনে সেট করুন — উদ্ধারকারী স্ক্যান করলে রক্তের গ্রুপ ও অ্যালার্জি দেখবে।
          </p>
          <ButtonLink href="/dashboard" variant="outline" size="sm">
            <HugeiconsIcon icon={UserIcon} size={16} aria-hidden />
            ড্যাশবোর্ডে ফিরুন
          </ButtonLink>
        </Card>
      </div>
    </>
  );
}
