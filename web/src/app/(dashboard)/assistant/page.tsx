import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { AssistantChat } from "@/components/ai/AssistantChat";
import { HugeiconsIcon, AiBrainIcon, Shield01Icon, AlertCircleIcon } from "@/components/icons";

export const metadata = {
  title: "স্বাস্থ্য সহকারী",
  description: "বাংলা-ফার্স্ট AI সহকারী — ট্রায়াজ ও পথনির্দেশ, কখনো রোগ নির্ণয় নয়।",
};

const capabilities = [
  { icon: AiBrainIcon, text: "লক্ষণ শুনে কোন স্পেশালিটির ডাক্তার দেখা উচিত, বলে দেয়" },
  { icon: Shield01Icon, text: "রোগ নির্ণয় বা ওষুধের ডোজ দেয় না — নিয়ম অক্ষত রাখে" },
  { icon: AlertCircleIcon, text: "জরুরি লক্ষণ বুঝলে আগে ৯৯৯/ইমার্জেন্সি বলে" },
] as const;

export default function AssistantPage() {
  return (
    <>
      <PageHeader
        title="স্বাস্থ্য সহকারী"
        description="বাংলায় কথা বলুন; সব উত্তরে ডিসক্লেইমার — চূড়ান্ত সিদ্ধান্ত ডাক্তারের (Handoff §8)।"
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card className="flex h-[560px] flex-col overflow-hidden">
          <AssistantChat />
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="mb-3 font-semibold text-gray-900 dark:text-gray-50">যা যা করতে পারে</h2>
            <ul className="space-y-3">
              {capabilities.map((c) => (
                <li key={c.text} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <HugeiconsIcon icon={c.icon} size={16} aria-hidden className="mt-0.5 shrink-0 text-brand-500 dark:text-brand-300" />
                  {c.text}
                </li>
              ))}
            </ul>
          </Card>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            প্রতিটি কথোপকথন লগ হয় (নিরাপত্তা নিয়ম ৪); আপনার নাম-ফোন কখনো বাইরের API-তে যায় না (নিয়ম ৩)।
          </p>
        </div>
      </div>
    </>
  );
}
