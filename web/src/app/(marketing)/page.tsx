import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { SpecialtyGrid } from "@/components/sections/SpecialtyGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AppPreview } from "@/components/sections/AppPreview";
import { Features } from "@/components/sections/Features";
import { DoctorsSpotlight } from "@/components/sections/DoctorsSpotlight";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { EmergencyStrip } from "@/components/sections/EmergencyStrip";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <SpecialtyGrid />
      <HowItWorks />
      <AppPreview />
      <Features />
      <DoctorsSpotlight />
      <EmergencyStrip />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
