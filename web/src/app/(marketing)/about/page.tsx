import Image from "next/image";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Container } from "@/components/shared/Container";
import { Card } from "@/components/ui/Card";
import { HugeiconsIcon, TargetIcon, HandshakeIcon, Shield01Icon, GlobeIcon } from "@/components/icons";

export const metadata = { title: "আমাদের সম্পর্কে" };

const principles = [
  { icon: Shield01Icon, title: "ট্রাস্ট ফার্স্ট", text: "ভেরিফায়েড ডাক্তার, ভেরিফায়েড প্রেসক্রিপশন, ভেরিফায়েড হাসপাতাল।" },
  { icon: TargetIcon, title: "রোগীর ডেটা রোগীর", text: "কে কী দেখবে তা রোগীই ঠিক করেন; প্রতিটি অ্যাক্সেস লগে থাকে।" },
  { icon: GlobeIcon, title: "বাংলা-ফার্স্ট", text: "কম ইন্টারনেটেও কাজ করে; ভিডিও না চললে অডিও/চ্যাট ফলব্যাক।" },
  { icon: HandshakeIcon, title: "AI ডায়াগনোসিস নয়", text: "AI শুধু পথ দেখায় — চূড়ান্ত সিদ্ধান্ত ডাক্তারের।" },
] as const;

export default function AboutPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">
              আমাদের সম্পর্কে
            </p>
            <h1 className="mt-3 text-display-sm font-bold text-gray-900 sm:text-display-md dark:text-gray-50">
              বিশ্বাসের সাথে সুস্থতা
            </h1>
            <p className="mt-5 text-lg text-gray-500 dark:text-gray-400">
              হিলোরা বাংলাদেশের ট্রাস্ট-ফার্স্ট ডিজিটাল স্বাস্থ্যসেবা প্ল্যাটফর্ম। ভুয়া ডাক্তার, প্রেসক্রিপশন জালিয়াতি আর অতিরিক্ত অপেক্ষা — এই তিনটি সমস্যা থেকেই আমাদের যাত্রা শুরু।
            </p>
            <Image
              src="/images/about-team.jpg"
              alt="আধুনিক ক্লিনিকে হিলোরা মেডিকেল টিমের কাজ করার দৃশ্য"
              width={960}
              height={640}
              className="mt-8 w-full rounded-2xl border border-gray-200 object-cover dark:border-gray-800"
            />
          </div>

          <div>
            <h2 className="text-display-xs font-bold text-gray-900 dark:text-gray-50">
              আমাদের মূলনীতি
            </h2>
            <div className="mt-8 grid gap-4">
              {principles.map((p) => (
                <Card key={p.title} interactive className="flex gap-4 p-6">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-25 text-brand-500 dark:border-brand-800 dark:bg-brand-900 dark:text-brand-300">
                    <HugeiconsIcon icon={p.icon} size={22} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-50">{p.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{p.text}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
