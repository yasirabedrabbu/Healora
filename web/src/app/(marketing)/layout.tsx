import { MarketingLayout } from "@/components/layout/MarketingLayout";

/** Marketing chrome (Header/Footer/StickyCTA) for all public pages. */
export default function MarketingGroupLayout({ children }: { children: React.ReactNode }) {
  return <MarketingLayout>{children}</MarketingLayout>;
}
