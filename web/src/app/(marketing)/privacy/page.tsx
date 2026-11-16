import { PageHeader } from "@/components/dashboard/PageHeader";
import { Container } from "@/components/shared/Container";
import { Card } from "@/components/ui/Card";

export const metadata = { title: "প্রাইভেসি পলিসি" };

const sections = [
  { title: "আমরা কী সংগ্রহ করি", body: "অ্যাকাউন্ট তৈরিতে ফোন/ইমেইল, প্রোফাইলে নাম-রক্তের গ্রুপ, আর আপনার আপলোড করা মেডিকেল রেকর্ড।" },
  { title: "ডেটা কোথায় থাকে", body: "স্বাস্থ্য ডেটা বাংলাদেশের ভেতরে সংরক্ষিত হয় (National Data Governance Ordinance 2025 অনুযায়ী)।" },
  { title: "কে দেখতে পায়", body: "ডাক্তার শুধু আপনার শেয়ার করা, সময়সীমাযুক্ত রেকর্ড; ফার্মেসি শুধু ওষুধের তালিকা; অ্যাডমিন কখনোই মেডিকেল কনটেন্ট নয়।" },
  { title: "আপনার নিয়ন্ত্রণ", body: "প্রতিটি শেয়ার revoke করা যায়; প্রতিটি অ্যাক্সেস লগে সংরক্ষিত থাকে। অ্যাকাউন্ট মুছে ফেলার অনুরোধ করা যায়।" },
] as const;

export default function PrivacyPage() {
  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <PageHeader title="প্রাইভেসি পলিসি" description="শেষ হালনাগাদ: নভেম্বর ২০২৬" />
        <div className="space-y-4">
          {sections.map((s, i) => (
            <Card key={s.title} className="p-6">
              <h2 className="flex items-baseline gap-3 font-semibold text-gray-900 dark:text-gray-50">
                <span className="font-heading text-brand-500 dark:text-brand-300">০{i + 1}</span>
                {s.title}
              </h2>
              <p className="mt-2 pl-8 text-sm text-gray-500 dark:text-gray-400">{s.body}</p>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-xs text-gray-400 dark:text-gray-500">
          এই সারসংক্ষেপ আইনি পরামর্শ নয়; চূড়ান্ত পলিসি আইনজীবী রিভিউয়ের পর প্রকাশ হবে।
        </p>
      </Container>
    </section>
  );
}
