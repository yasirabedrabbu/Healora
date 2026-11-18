/**
 * UI copy for the hospital pages, per locale.
 * Seeded data (patient/doctor names, tokens, dates) is NOT translated.
 */

type HospitalDashboardCopy = {
  title: string;
  description: string;
  liveQueue: string;
  liveQueueHint: string;
  icuFree: string;
  icuHint: string;
  todayRoster: string;
  rosterHint: string;
  rosterValue: string;
  serialsTitle: string;
  statusWaiting: string;
  statusInProgress: string;
  bedsTitle: string;
  bedsText: string;
  rosterCardTitle: string;
  rosterCardText: string;
};

type HospitalQueueCopy = {
  title: string;
  description: string;
  statusDone: string;
  statusNow: string;
  etaRemaining: (eta: string) => string;
  footnote: string;
};

type HospitalBedsCopy = {
  title: string;
  description: string;
  types: Record<"general" | "icu" | "oxygen", string>;
  statusFree: string;
  statusLow: string;
  statusNone: string;
  updatedNote: string;
};

type HospitalRosterCopy = {
  title: string;
  description: string;
  shifts: Record<"morning" | "afternoon" | "night", string>;
  footnote: string;
};

export type StaffHospitalCopy = {
  hospitalDashboard: HospitalDashboardCopy;
  hospitalQueue: HospitalQueueCopy;
  hospitalBeds: HospitalBedsCopy;
  hospitalRoster: HospitalRosterCopy;
};

const bn: StaffHospitalCopy = {
  hospitalDashboard: {
    title: "হসপিটাল ড্যাশবোর্ড",
    description: "সিরিয়াল, বেড ও রোস্টার - এক নজরে।",
    liveQueue: "লাইভ কিউ",
    liveQueueHint: "গড় অপেক্ষা ২৫ মিনিট",
    icuFree: "ICU খালি",
    icuHint: "সর্বশেষ আপডেট: ৫ মিনিট আগে",
    todayRoster: "আজকের রোস্টার",
    rosterHint: "৩টি শিফট",
    rosterValue: "৮ ডাক্তার",
    serialsTitle: "লাইভ সিরিয়াল",
    statusWaiting: "অপেক্ষমাণ",
    statusInProgress: "চলছে",
    bedsTitle: "বেড স্ট্যাটাস",
    bedsText: "জেনারেল · ICU · অক্সিজেন আপডেট",
    rosterCardTitle: "ডাক্তার রোস্টার",
    rosterCardText: "শিফট ও ডিউটি ব্যবস্থাপনা",
  },
  hospitalQueue: {
    title: "লাইভ সিরিয়াল কিউ",
    description: "অনলাইন সিরিয়াল নিলে রোগী ঘরে বসে অপেক্ষা করতে পারেন।",
    statusDone: "সম্পন্ন",
    statusNow: "এখন",
    etaRemaining: (eta) => `${eta} বাকি`,
    footnote: "কিউ আপডেট WebSocket দিয়ে লাইভ যায় (Handoff §14) - ডেমোতে স্ট্যাটিক।",
  },
  hospitalBeds: {
    title: "বেড ও ICU স্ট্যাটাস",
    description: "রিয়েল-টাইম হালনাগাদ - সাথে সর্বশেষ আপডেটের সময় (Handoff §5 P2)।",
    types: { general: "জেনারেল", icu: "ICU", oxygen: "অক্সিজেন" },
    statusFree: "খালি আছে",
    statusLow: "কম আছে",
    statusNone: "খালি নেই",
    updatedNote: "সর্বশেষ আপডেট: ৫ মিনিট আগে · ডেমো ডেটা",
  },
  hospitalRoster: {
    title: "ডাক্তার রোস্টার",
    description: "শিফট ও ডিউটি ব্যবস্থাপনা - রোগীরা কে কখন দেখা, জানতে পারবে।",
    shifts: { morning: "সকাল (৮টা-২টা)", afternoon: "বিকেল (২টা-৮টা)", night: "রাত (৮টা-৮টা)" },
    footnote: "অন-কল ডাক্তারের নামের পাশে ব্যাজ দেখানো হয়; ইমার্জেন্সি সবসময় ৯৯৯।",
  },
};

const en: StaffHospitalCopy = {
  hospitalDashboard: {
    title: "Hospital dashboard",
    description: "Serials, beds and roster - at a glance.",
    liveQueue: "Live queue",
    liveQueueHint: "Average wait 25 minutes",
    icuFree: "ICU free",
    icuHint: "Last updated: 5 minutes ago",
    todayRoster: "Today's roster",
    rosterHint: "3 shifts",
    rosterValue: "8 doctors",
    serialsTitle: "Live serials",
    statusWaiting: "Waiting",
    statusInProgress: "In progress",
    bedsTitle: "Bed status",
    bedsText: "General · ICU · oxygen updates",
    rosterCardTitle: "Doctor roster",
    rosterCardText: "Shift and duty management",
  },
  hospitalQueue: {
    title: "Live serial queue",
    description: "With an online serial, patients can wait at home.",
    statusDone: "Done",
    statusNow: "Now",
    etaRemaining: (eta) => `${eta} left`,
    footnote: "Queue updates stream live over WebSocket (Handoff §14) - static in the demo.",
  },
  hospitalBeds: {
    title: "Bed & ICU status",
    description: "Real-time updates - with the time of the last update (Handoff §5 P2).",
    types: { general: "General", icu: "ICU", oxygen: "Oxygen" },
    statusFree: "Available",
    statusLow: "Running low",
    statusNone: "Full",
    updatedNote: "Last updated: 5 minutes ago · demo data",
  },
  hospitalRoster: {
    title: "Doctor roster",
    description: "Shift and duty management - patients know who sees them and when.",
    shifts: { morning: "Morning (8am-2pm)", afternoon: "Afternoon (2pm-8pm)", night: "Night (8pm-8am)" },
    footnote: "An on-call badge shows next to the doctor's name; for emergencies always dial 999.",
  },
};

export const staffHospitalCopy: { bn: StaffHospitalCopy; en: StaffHospitalCopy } = { bn, en };
