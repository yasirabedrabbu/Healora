"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyCTA } from "./StickyCTA";
import { AssistantLauncher } from "@/components/ai/AssistantWidget/AssistantLauncher";

/** Marketing chrome. Portal layouts (route groups) omit this. */
export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <StickyCTA />
      <AssistantLauncher />
    </>
  );
}
