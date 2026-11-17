/**
 * UI copy for the doctors directory (list + detail pages).
 * DB values (doctor names, specialties, degrees) stay as data - never translated here.
 * Interpolation placeholders: {count} (result count), {name} (doctor name).
 */
export const copy = {
  bn: {
    // List page
    list: {
      eyebrow: "ভেরিফায়েড ডাক্তার",
      title: "ভেরিফায়েড ডাক্তার খুঁজুন",
      subtitle: "আপনার প্রয়োজন অনুযায়ী স্পেশালিটি, ফি আর ভাষা দিয়ে ডাক্তার বেছে নিন।",
      foundCount: "{count} জন ডাক্তার পাওয়া গেলো।",
      searchLabel: "ডাক্তার খুঁজুন",
      searchPlaceholder: "স্পেশালিটি বা নাম লিখুন…",
      searchHint: "স্পেশালিটি, ফি আর ভাষা দিয়ে ফিল্টার করুন।",
      emptyTitle: "কোনো ডাক্তার পাওয়া যায়নি",
      emptyDescription: "বানান পরীক্ষা করুন বা অন্য স্পেশালিটি দিয়ে খুঁজুন।",
      bannerAlt: "হেলোরা ভেরিফায়েড ডাক্তারদের ব্যানার ছবি",
    },
    // Detail page
    detail: {
      verified: "ভেরিফায়েড",
      verificationPending: "ভেরিফিকেশন চলছে",
      profileImageAlt: "{name} - প্রোফাইল ছবি",
      ratingSuffix: "রেটিং",
      feeSuffix: "ফি",
      bmdcLabel: "BMDC {value}",
      modeLabels: {
        video: "ভিডিও",
        audio: "অডিও",
        chat: "চ্যাট",
        chamber: "চেম্বার",
      } as Record<"video" | "audio" | "chat" | "chamber", string>,
      chooseSlot: "স্লট বেছে নিন",
      slots: ["সকাল ১০:০০", "দুপুর ১২:৩০", "বিকেল ৪:০০", "সন্ধ্যা ৬:৩০", "রাত ৮:০০"],
      feeRow: "ফি",
      paymentRow: "পেমেন্ট",
      paymentMethods: "বিকাশ · নগদ · কার্ড",
      bookCta: "বুকিং করুন",
      refundNote: "কনসালটেশন শেষ না হলে স্বয়ংক্রিয় রিফান্ড।",
      emergencyNote: "জরুরি অবস্থায় ৯৯৯-এ কল করুন। হেলোরা জরুরি সেবার বিকল্প নয়।",
    },
  },
  en: {
    list: {
      eyebrow: "Verified doctors",
      title: "Find a Verified Doctor",
      subtitle: "Choose the right doctor by specialty, fee and language - all verified for you.",
      foundCount: "{count} doctors found.",
      searchLabel: "Search doctors",
      searchPlaceholder: "Type a specialty or name…",
      searchHint: "Filter by specialty, fee and language.",
      emptyTitle: "No doctors found",
      emptyDescription: "Check the spelling or try searching a different specialty.",
      bannerAlt: "Healora verified doctors banner image",
    },
    detail: {
      verified: "Verified",
      verificationPending: "Verification in progress",
      profileImageAlt: "{name} - profile photo",
      ratingSuffix: "rating",
      feeSuffix: "fee",
      bmdcLabel: "BMDC {value}",
      modeLabels: {
        video: "Video",
        audio: "Audio",
        chat: "Chat",
        chamber: "Chamber",
      } as Record<"video" | "audio" | "chat" | "chamber", string>,
      chooseSlot: "Pick a slot",
      slots: ["Morning 10:00", "Noon 12:30", "Afternoon 4:00", "Evening 6:30", "Night 8:00"],
      feeRow: "Fee",
      paymentRow: "Payment",
      paymentMethods: "bKash · Nagad · Card",
      bookCta: "Book appointment",
      refundNote: "Automatic refund if the consultation isn't completed.",
      emergencyNote: "In an emergency call 999. Healora is not a substitute for emergency services.",
    },
  },
};

export type DoctorsCopy = (typeof copy)["bn"];
