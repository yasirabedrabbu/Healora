import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Button } from "@/components/ui/Button";
import { HugeiconsIcon, StarIcon, ClockIcon, LanguageSquareIcon, Video01Icon, BubbleChatIcon, Hospital01Icon } from "@/components/icons";
import { doctors } from "@/lib/data/doctors";

export const metadata = { title: "ডাক্তার প্রোফাইল" };

export function generateStaticParams() {
  return doctors.map((d) => ({ id: d.id }));
}

const modeIcons = { video: Video01Icon, audio: null, chat: BubbleChatIcon, chamber: Hospital01Icon } as const;
const slots = ["সকাল ১০:০০", "দুপুর ১২:৩০", "বিকেল ৪:০০", "সন্ধ্যা ৬:৩০", "রাত ৮:০০"] as const;

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctor = doctors.find((d) => d.id === id);
  if (!doctor) notFound();

  return (
    <>
      <PageHeader
        title={doctor.name}
        description={`${doctor.specialty} · ${doctor.degrees}`}
        action={
          <Badge color={doctor.verified ? "success" : "gray"} dot>
            {doctor.verified ? "ভেরিফায়েড" : "ভেরিফিকেশন চলছে"}
          </Badge>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <Image
              src="/images/doctor-male.jpg"
              alt={`${doctor.name} — প্রোফাইল ছবি`}
              width={120}
              height={120}
              className="h-28 w-28 shrink-0 rounded-2xl border border-gray-200 object-cover dark:border-gray-800"
            />
            <div className="min-w-0 flex-1 space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex flex-wrap items-center gap-2">
                <Badge color="brand" size="sm">
                  <HugeiconsIcon icon={StarIcon} size={12} aria-hidden />
                  {doctor.rating} রেটিং
                </Badge>
                <Badge color="gray" size="sm">৳{doctor.fee} ফি</Badge>
                <Badge color="gray" size="sm">BMDC {doctor.bmdcNo}</Badge>
              </div>
              <p className="flex items-center gap-2">
                <HugeiconsIcon icon={LanguageSquareIcon} size={16} aria-hidden />
                {doctor.languages.join(", ")}
              </p>
              <div className="flex flex-wrap gap-2">
                {doctor.modes.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gray-25 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-800"
                  >
                    {modeIcons[m] && <HugeiconsIcon icon={modeIcons[m]} size={14} aria-hidden />}
                    {m === "video" ? "ভিডিও" : m === "audio" ? "অডিও" : m === "chat" ? "চ্যাট" : "চেম্বার"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50">
            <HugeiconsIcon icon={ClockIcon} size={18} aria-hidden />
            স্লট বেছে নিন
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {slots.map((s) => (
              <Button key={s} variant="outline" size="sm">
                {s}
              </Button>
            ))}
          </div>
          <div className="mt-5 space-y-2 border-t border-gray-200 pt-5 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
            <p className="flex justify-between">
              <span>ফি</span>
              <span className="font-semibold text-gray-900 dark:text-gray-50">৳{doctor.fee}</span>
            </p>
            <p className="flex justify-between">
              <span>পেমেন্ট</span>
              <span>বিকাশ · নগদ · কার্ড</span>
            </p>
          </div>
          <ButtonLink href="/login" block className="mt-5">
            বুকিং করুন
          </ButtonLink>
          <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
            কনসালটেশন শেষ না হলে স্বয়ংক্রিয় রিফান্ড।
          </p>
        </Card>
      </div>
    </>
  );
}
