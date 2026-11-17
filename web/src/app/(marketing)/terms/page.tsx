import type { Metadata } from "next";
import { TermsContent } from "./terms-content";

export const metadata: Metadata = { title: "শর্তাবলি" };

export default function TermsPage() {
  return <TermsContent />;
}
