/**
 * UI copy for the admin pages, per locale.
 * Seeded data (doctor names, transaction IDs, dates, amounts) is NOT translated.
 */

type AdminVerificationCopy = {
  title: string;
  description: string;
  nidLabel: string;
  selfieLabel: string;
  statusMatched: string;
  statusPending: string;
  submittedLabel: string;
  reject: string;
  approve: string;
  footnote: string;
};

type AdminPaymentsCopy = {
  title: string;
  description: string;
  monthGross: string;
  monthGrossHint: string;
  refunds: string;
  refundsHint: string;
  settlementPending: string;
  settlementHint: string;
  recentTxns: string;
  statusSettled: string;
  statusRefund: string;
  methods: Record<"bkash" | "nagad" | "card", string>;
};

export type StaffAdminCopy = {
  adminVerification: AdminVerificationCopy;
  adminPayments: AdminPaymentsCopy;
};

const bn: StaffAdminCopy = {
  adminVerification: {
    title: "ভেরিফিকেশন কিউ",
    description: "BMDC + NID + সেলফি ম্যানুয়াল যাচাই - অ্যাপ্রুভ হলে ভেরিফায়েড ব্যাজ।",
    nidLabel: "NID",
    selfieLabel: "সেলফি",
    statusMatched: "✓ মিলেছে",
    statusPending: "… পেন্ডিং",
    submittedLabel: "জমা",
    reject: "রিজেক্ট",
    approve: "অ্যাপ্রুভ",
    footnote: "অ্যাডমিন কখনোই মেডিকেল কনটেন্ট দেখেন না - শুধু আইডেন্টিটি ডকুমেন্ট।",
  },
  adminPayments: {
    title: "পেমেন্ট ও অ্যানালিটিক্স",
    description: "গেটওয়ে সেটেলমেন্ট ও রিফান্ড মনিটরিং।",
    monthGross: "এই মাসের গ্রস",
    monthGrossHint: "১৮৬ কনসালটেশন",
    refunds: "রিফান্ড (no-show)",
    refundsHint: "৯টি অটো-রিফান্ড",
    settlementPending: "সেটেলমেন্ট পেন্ডিং",
    settlementHint: "সব ক্লিয়ার",
    recentTxns: "সাম্প্রতিক লেনদেন",
    statusSettled: "সেটেলড",
    statusRefund: "রিফান্ডড",
    methods: { bkash: "বিকাশ", nagad: "নগদ", card: "কার্ড" },
  },
};

const en: StaffAdminCopy = {
  adminVerification: {
    title: "Verification queue",
    description: "Manual BMDC + NID + selfie checks - approval grants the verified badge.",
    nidLabel: "NID",
    selfieLabel: "Selfie",
    statusMatched: "✓ Matched",
    statusPending: "… Pending",
    submittedLabel: "Submitted",
    reject: "Reject",
    approve: "Approve",
    footnote: "Admins never view medical content - identity documents only.",
  },
  adminPayments: {
    title: "Payments & analytics",
    description: "Gateway settlement and refund monitoring.",
    monthGross: "Gross this month",
    monthGrossHint: "186 consultations",
    refunds: "Refunds (no-show)",
    refundsHint: "9 auto-refunds",
    settlementPending: "Settlement pending",
    settlementHint: "All clear",
    recentTxns: "Recent transactions",
    statusSettled: "Settled",
    statusRefund: "Refunded",
    methods: { bkash: "bKash", nagad: "Nagad", card: "Card" },
  },
};

export const staffAdminCopy: { bn: StaffAdminCopy; en: StaffAdminCopy } = { bn, en };
