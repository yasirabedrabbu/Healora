import { PageHeader } from "@/components/dashboard/PageHeader";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/shared/Container";

export const metadata = { title: "প্রাইসিং" };

export default function PricingPage() {
  return (
    <>
      <Container>
        <PageHeader
          title="সোজাসাপ্টা প্রাইসিং"
          description="রক্তদান সবসময় ফ্রি — ট্রাস্টের জন্য। প্রিমিয়াম ফিচারের দামও স্পষ্ট।"
        />
      </Container>
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
