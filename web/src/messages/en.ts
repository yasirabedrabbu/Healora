import type { Dictionary } from "./bn";

/** English mirror — keys must stay 1:1 with bn (type-enforced). */
export const en: Dictionary = {
  common: {
    login: "Log in",
    signup: "Get started",
    findDoctor: "Find a doctor",
    howItWorks: "How it works",
    trust: "Trust",
    faq: "FAQ",
    menu: "Menu",
    verified: "Verified",
    booking: "Book now",
    seeAll: "See all",
    search: "Search",
    close: "Close",
    loading: "Loading…",
    error: "Something went wrong. Please try again.",
    empty: "Nothing here yet.",
  },
  home: {
    badge: "Verified doctors · QR prescription · Your own record",
    heroTitle: "Healthcare you can trust, in one place",
    heroText:
      "Find verified doctors, book online, and verify prescriptions with a QR code. Your medical record stays in your hands.",
    ctaJoin: "Join as a doctor",
    heroFallback: "Healora — trust-first digital healthcare",
  },
  nav: {
    dashboard: "Dashboard",
    records: "Medical record",
    prescriptions: "Prescription",
    blood: "Blood",
    family: "Family",
  },
};
