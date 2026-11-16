import { PageHeader } from "@/components/dashboard/PageHeader";
import { Container } from "@/components/shared/Container";
import { Card } from "@/components/ui/Card";

export const metadata = { title: "শর্তাবলি" };

const terms = [
  { title: "সেবার পরিসর", body: "হিলোরা ভেরিফায়েড ডাক্তারের সাথে কনসালটেশন, e-প্রেসক্রিপশন ও রেকর্ড ব্যবস্থাপনার প্ল্যাটফর্ম। ইমার্জেন্সিতে ৯৯৯ ডায়াল করুন।" },
  { title: "পেমেন্ট ও রিফান্ড", body: "পেমেন্ট বিকাশ/নগদ/কার্ডে গেটওয়ের মাধ্যমে হয়। কনসালটেশন শেষ না হলে (no-show) স্বয়ংক্রিয় রিফান্ড।" },
  { title: "প্রেসক্রিপশন", body: "প্রেসক্রিপশন ইউনিক ID, হ্যাশ ও মেয়াদসহ QR-যুক্ত। ডিসপেন্স হওয়ার পর পুনরায় ব্যবহার করা যাবে না।" },
  { title: "দায়সীমা", body: "প্ল্যাটফর্ম ডাক্তারের চিকিৎসীয় সিদ্ধান্তের বিকল্প নয়; AI-উত্তরে disclaimer থাকে।" },
] as const;

export default function TermsPage() {
  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <PageHeader title="শর্তাবলি" description="শেষ হালনাগাদ: নভেম্বর ২০২৬" />
        <div className="space-y-4">
          {terms.map((s, i) => (
            <Card key={s.title} className="p-6">
              <h2 className="flex items-baseline gap-3 font-semibold text-gray-900 dark:text-gray-50">
                <span className="font-heading text-brand-500 dark:text-brand-300">০{i + 1}</span>
                {s.title}
              </h2>
              <p className="mt-2 pl-8 text-sm text-gray-500 dark:text-gray-400">{s.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
