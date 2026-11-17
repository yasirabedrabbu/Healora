import { PageHeader } from "@/components/dashboard/PageHeader";
import { Container } from "@/components/shared/Container";
import { FAQ } from "@/components/sections/FAQ";

export const metadata = {
  title: "FAQ",
  description: "হিলোরা সম্পর্কে সাধারণ প্রশ্ন — ভেরিফিকেশন, প্রেসক্রিপশন, পেমেন্ট, রক্তদান।",
};

export default function FaqPage() {
  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <PageHeader
          title="সাধারণ প্রশ্ন"
          description="ভেরিফিকেশন, QR প্রেসক্রিপশন, পেমেন্ট ও নিরাপত্তা নিয়ে যা জানা দরকার।"
        />
      </Container>
      <FAQ />
    </section>
  );
}
