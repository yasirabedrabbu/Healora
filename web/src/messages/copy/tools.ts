/**
 * UI copy for the tool dashboard pages (assistant, map, lab, pharmacy).
 * Seeded data (hospital/medicine/patient names) lives in the components -
 * only interface copy is translated here.
 */
export type ToolsCopy = {
  assistant: { headerTitle: string; headerDesc: string; capabilitiesTitle: string; capabilities: string[]; footnote: string; heroAlt: string };
  map: { headerTitle: string; headerDesc: string; erButton: string; mapAria: string; mapPlaceholder: string; layers: { hospital: string; lab: string; pharmacy: string; blood: string }; photoAlt: string };
  labBooking: { headerTitle: string; headerDesc: string; homeCollectionBadge: string; selectedCount: (n: number) => string; bookButton: string; homeSampleCheckbox: string; bookedToast: string };
  labReports: { headerTitle: string; headerDesc: string; uploadTitle: string; uploadDesc: string; chooseFile: string; emptyTitle: string; emptyText: string; aiSummaryBadge: string; processingBadge: string; footnote: string };
  pharmacyOrders: { headerTitle: string; headerDesc: string; statusNew: string; statusReady: string; detailButton: string; acceptButton: string; dgdaFootnote: string };
  pharmacyDispense: { headerTitle: string; headerDesc: string; tokenLabel: string; verifyButton: string; resultHeading: string; statusExpired: string; statusDispensed: string; statusValid: string; blockedMsg: string; dispenseButton: string; dispensedToast: string };
};

export const copy: { bn: ToolsCopy; en: ToolsCopy } = {
  bn: {
    assistant: {
      headerTitle: "স্বাস্থ্য সহকারী",
      headerDesc: "বাংলায় কথা বলুন; সব উত্তরে ডিসক্লেইমার - চূড়ান্ত সিদ্ধান্ত ডাক্তারের (Handoff §8)।",
      capabilitiesTitle: "যা যা করতে পারে",
      capabilities: [
        "লক্ষণ শুনে কোন স্পেশালিটির ডাক্তার দেখা উচিত, বলে দেয়",
        "রোগ নির্ণয় বা ওষুধের ডোজ দেয় না - নিয়ম অক্ষত রাখে",
        "জরুরি লক্ষণ বুঝলে আগে ৯৯৯/ইমার্জেন্সি বলে",
      ],
      footnote:
        "প্রতিটি কথোপকথন লগ হয় (নিরাপত্তা নিয়ম ৪); আপনার নাম-ফোন কখনো বাইরের API-তে যায় না (নিয়ম ৩)।",
      heroAlt: "স্বাস্থ্য সহকারীর হিরো ছবি",
    },
    map: {
      headerTitle: "নিকটতম সেবা ম্যাপ",
      headerDesc: "হসপিটাল, ল্যাব, ফার্মেসি ও ব্লাড ব্যাংক লেয়ার - নিকটতম ইমার্জেন্সি এক ট্যাপে।",
      erButton: "নিকটতম ER",
      mapAria: "নিকটবর্তী স্বাস্থ্যসেবা কেন্দ্রের ম্যাপ (স্ট্যাটিক প্রিভিউ)",
      mapPlaceholder: "MapLibre + OpenStreetMap টাইল (§7) - ডেমোতে স্ট্যাটিক",
      layers: { hospital: "হসপিটাল", lab: "ল্যাব", pharmacy: "ফার্মেসি", blood: "ব্লাড ব্যাংক" },
      photoAlt: "হসপিটালের সামনের ছবি",
    },
    labBooking: {
      headerTitle: "টেস্ট বুকিং",
      headerDesc: "দাম তুলনা করে বুক করুন; হোম স্যাম্পল কালেকশন অপশনসহ।",
      homeCollectionBadge: "হোম কালেকশন",
      selectedCount: (n) => `নির্বাচিত ${n}টি টেস্ট`,
      bookButton: "বুকিং করুন",
      homeSampleCheckbox: "বাসায় স্যাম্পল কালেকশন চাই",
      bookedToast: "টেস্ট বুকিং সম্পন্ন - স্যাম্পল কালেকশনের সময় SMS-এ আসবে।",
    },
    labReports: {
      headerTitle: "রিপোর্ট আপলোড ও সামারি",
      headerDesc: "রিপোর্ট আপলোড করুন; AI সামারি শুধু ব্যাখ্যা করে - ডাক্তার-বিকল্প নয় (§8)।",
      uploadTitle: "রিপোর্ট (PDF/ছবি) আপলোড করুন",
      uploadDesc: "ফাইল এনক্রিপ্টেড থাকে; শুধু আপনি আর শেয়ার করা ডাক্তার দেখেন।",
      chooseFile: "ফাইল বাছুন",
      emptyTitle: "কোনো রিপোর্ট নেই",
      emptyText: "আপলোড করলে এখানে দেখা যাবে।",
      aiSummaryBadge: "AI সামারি রেডি",
      processingBadge: "প্রসেসিং",
      footnote: "AI সামারি চিকিৎসা ব্যাখ্যা মাত্র; সিদ্ধান্ত হবে ডাক্তারের রিভিউয়ের পর।",
    },
    pharmacyOrders: {
      headerTitle: "অর্ডার",
      headerDesc: "প্রেসক্রিপশনের ওষুধের তালিকা মাত্র - রোগীর পূর্ণ রেকর্ড দেখা যায় না।",
      statusNew: "নতুন",
      statusReady: "প্রস্তুত",
      detailButton: "বিস্তারিত",
      acceptButton: "গ্রহণ করুন",
      dgdaFootnote: "DGDA নিয়ম: অনলাইন বিক্রি শুধু রেজিস্টার্ড ফিজিক্যাল ফার্মেসির মাধ্যমে (§9)।",
    },
    pharmacyDispense: {
      headerTitle: "QR ডিসপেন্স",
      headerDesc: "স্ক্যান → যাচাই → একবারই ডিসপেন্স (Handoff §10)।",
      tokenLabel: "QR টোকেন (স্ক্যানার লাগলে অটো-ফিল হবে)",
      verifyButton: "যাচাই",
      resultHeading: "যাচাই ফল",
      statusExpired: "মেয়াদ শেষ",
      statusDispensed: "আগেই ডিসপেন্সড",
      statusValid: "বৈধ",
      blockedMsg: "ডিসপেন্স করা যাবে না - রোগীকে ডাক্তারের কাছে ফিরিয়ে পাঠান।",
      dispenseButton: "ডিসপেন্স মার্ক করুন",
      dispensedToast: "ডিসপেন্স মার্ক হয়েছে - প্রেসক্রিপশন এখন পুনরায় ব্যবহারযোগ্য নয়।",
    },
  },
  en: {
    assistant: {
      headerTitle: "Health Assistant",
      headerDesc: "Chat in Bangla; every answer carries a disclaimer - the final decision is your doctor's (Handoff §8).",
      capabilitiesTitle: "What it can do",
      capabilities: [
        "Listens to your symptoms and suggests which specialist to see",
        "Never diagnoses or suggests medicine doses - rules stay intact",
        "Calls 999/emergency first when it spots urgent symptoms",
      ],
      footnote:
        "Every conversation is logged (safety rule 4); your name and phone never leave to a third-party API (rule 3).",
      heroAlt: "Health assistant hero image",
    },
    map: {
      headerTitle: "Nearby Care Map",
      headerDesc: "Hospital, lab, pharmacy and blood bank layers - the nearest emergency care in one tap.",
      erButton: "Nearest ER",
      mapAria: "Map of nearby healthcare facilities (static preview)",
      mapPlaceholder: "MapLibre + OpenStreetMap tiles (§7) - static in the demo",
      layers: { hospital: "Hospital", lab: "Lab", pharmacy: "Pharmacy", blood: "Blood bank" },
      photoAlt: "Hospital front photo",
    },
    labBooking: {
      headerTitle: "Test Booking",
      headerDesc: "Compare prices before booking; home sample collection available.",
      homeCollectionBadge: "Home collection",
      selectedCount: (n) => `${n} ${n === 1 ? "test" : "tests"} selected`,
      bookButton: "Book tests",
      homeSampleCheckbox: "Collect sample at my home",
      bookedToast: "Test booking complete - the sample collection time will arrive by SMS.",
    },
    labReports: {
      headerTitle: "Report Upload & Summary",
      headerDesc: "Upload your reports; the AI summary only explains - it is not a doctor substitute (§8).",
      uploadTitle: "Upload a report (PDF/image)",
      uploadDesc: "Files stay encrypted; only you and doctors you share with can view them.",
      chooseFile: "Choose file",
      emptyTitle: "No reports yet",
      emptyText: "Uploaded reports will appear here.",
      aiSummaryBadge: "AI summary ready",
      processingBadge: "Processing",
      footnote: "The AI summary is explanation only; decisions follow your doctor's review.",
    },
    pharmacyOrders: {
      headerTitle: "Orders",
      headerDesc: "Only the prescription medicine list - no full patient record is visible.",
      statusNew: "New",
      statusReady: "Ready",
      detailButton: "Details",
      acceptButton: "Accept",
      dgdaFootnote: "DGDA rule: online sales only through registered physical pharmacies (§9).",
    },
    pharmacyDispense: {
      headerTitle: "QR Dispense",
      headerDesc: "Scan → verify → dispense exactly once (Handoff §10).",
      tokenLabel: "QR token (auto-filled when a scanner is attached)",
      verifyButton: "Verify",
      resultHeading: "Verification result",
      statusExpired: "Expired",
      statusDispensed: "Already dispensed",
      statusValid: "Valid",
      blockedMsg: "Cannot dispense - send the patient back to their doctor.",
      dispenseButton: "Mark as dispensed",
      dispensedToast: "Marked as dispensed - this prescription can no longer be reused.",
    },
  },
};
