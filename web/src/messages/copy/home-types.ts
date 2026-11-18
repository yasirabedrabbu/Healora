import { bn } from "./home-bn";
import { en } from "./home-en";
import { usePageCopy } from "@/lib/i18n";

export type SectionHead = { eyebrow: string; title: string; titleAccent: string; description: string };

export type HomeCopy = {
  headings: {
    specialties: SectionHead;
    howItWorks: SectionHead;
    features: SectionHead;
    spotlight: SectionHead;
    testimonials: SectionHead;
    pricing: SectionHead;
    faq: SectionHead;
  };
  stats: { value: string; label: string }[];
  marquee: string[];
  specialties: string[];
  steps: { n: string; title: string; text: string }[];
  howItWorks: { journeyLabel: string; verifiedLabel: string };
  features: {
    qr: { title: string; text: string };
    verified: { title: string; text: string };
    records: { title: string; text: string };
    bangla: { title: string; text: string };
    scam: { title: string; text: string };
    appAlt: string;
  };
  spotlight: { bookCta: string; fee: string };
  testimonials: { items: { quote: string; role: string }[]; disclaimer: string };
  plans: { popular: string; startCta: string; items: { name: string; price: string; period: string; features: string[] }[] };
  faq: { items: { question: string; answer: string }[] };
  emergency: { title: string; text: string; cta: string };
  hero: {
    imageAlt: string;
    chips: string[];
    bullets: string[];
    statCard: { specialtyLine: string; slot: string };
  };
  appPreview: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    alt: string;
    points: { title: string; text: string }[];
  };
  bento: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    verifyLabel: string;
    dispensedLabel: string;
    cards: {
      qr: { tag: string; title: string; text: string };
      booking: { tag: string; title: string; text: string };
      records: { tag: string; title: string; text: string };
      assistant: { tag: string; title: string; text: string };
      blood: { tag: string; title: string; text: string };
    };
  };
  finalCta: {
    badge: string;
    title: string;
    titleAccent: string;
    text: string;
    primary: string;
    secondary: string;
    footnote: string;
  };
};

export const homeCopy = { bn, en };

/** Locale-aware homepage copy hook. */
export function useHomeCopy(): HomeCopy {
  return usePageCopy(homeCopy);
}
