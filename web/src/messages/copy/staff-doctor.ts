/**
 * UI copy for the patient dashboard home + doctor overview pages,
 * per locale. Seeded data (patient names, dates, amounts) is NOT translated.
 */

type DashboardHomeCopy = {
  greeting: (firstName: string) => string;
  description: string;
  findDoctor: string;
  nextAppointment: string;
  activePrescriptions: string;
  medicalRecords: string;
  recordsHint: string;
  recordsTitle: string;
  prescriptionsTitle: string;
  viewAll: string;
};

type DoctorDashboardCopy = {
  title: string;
  description: string;
  newPrescription: string;
  consultsLabel: string;
  consultsHint: string;
  monthEarnings: string;
  monthEarningsHint: string;
  verification: string;
  verificationValue: string;
  verificationHint: string;
  queueTitle: string;
  emptyTitle: string;
  emptyText: string;
  firstVisit: string;
  followUp: string;
  modes: Record<"video" | "audio" | "chamber", string>;
};

type DoctorPatientsCopy = {
  title: string;
  description: string;
  emptyTitle: string;
  emptyText: string;
  ageLabel: string;
  bloodLabel: string;
  lastVisitLabel: string;
  footnote: string;
};

export type StaffDoctorCopy = {
  dashboardHome: DashboardHomeCopy;
  doctorDashboard: DoctorDashboardCopy;
  doctorPatients: DoctorPatientsCopy;
};

const bn: StaffDoctorCopy = {
  dashboardHome: {
    greeting: (first) => `স্বাগতম, ${first}`,
    description: "আপনার অ্যাপয়েন্টমেন্ট, প্রেসক্রিপশন আর রেকর্ড এখানে।",
    findDoctor: "ডাক্তার খুঁজুন",
    nextAppointment: "পরের অ্যাপয়েন্টমেন্ট",
    activePrescriptions: "অ্যাক্টিভ প্রেসক্রিপশন",
    medicalRecords: "মেডিকেল রেকর্ড",
    recordsHint: "আপনার হাতেই",
    recordsTitle: "সাজানো রেকর্ড",
    prescriptionsTitle: "সাজানো প্রেসক্রিপশন",
    viewAll: "সব দেখুন",
  },
  doctorDashboard: {
    title: "ডাক্তার ড্যাশবোর্ড",
    description: "আজকের কিউ, শিডিউল ও আয় — এক নজরে।",
    newPrescription: "নতুন প্রেসক্রিপশন",
    consultsLabel: "আজকের কনসালটেশন",
    consultsHint: "ভিডিও ১ · অডিও ১ · চেম্বার ১",
    monthEarnings: "এই মাসের আয়",
    monthEarningsHint: "২৩টি কনসালটেশন",
    verification: "ভেরিফিকেশন",
    verificationValue: "সম্পন্ন",
    verificationHint: "BMDC A-00000 যাচাইকৃত",
    queueTitle: "আজকের কিউ",
    emptyTitle: "কোনো অ্যাপয়েন্টমেন্ট নেই",
    emptyText: "নতুন বুকিং এলে এখানে দেখা যাবে।",
    firstVisit: "প্রথম ভিজিট",
    followUp: "ফলো-আপ",
    modes: { video: "ভিডিও", audio: "অডিও", chamber: "চেম্বার" },
  },
  doctorPatients: {
    title: "রোগীর তালিকা",
    description: "শুধু আপনার সাথে শেয়ার করা রেকর্ড — সময়সীমাসহ।",
    emptyTitle: "তালিকা খালি",
    emptyText: "রোগীরা রেকর্ড শেয়ার করলে এখানে দেখা যাবে।",
    ageLabel: "বয়স",
    bloodLabel: "রক্ত",
    lastVisitLabel: "শেষ ভিজিট",
    footnote: "প্রতিটি রেকর্ড-অ্যাক্সেস লগে সংরক্ষিত; শেয়ার-সময়সীমা শেষ হলে ভিউ আটকে যায়।",
  },
};

const en: StaffDoctorCopy = {
  dashboardHome: {
    greeting: (first) => `Welcome, ${first}`,
    description: "Your appointments, prescriptions and records — all in one place.",
    findDoctor: "Find a doctor",
    nextAppointment: "Next appointment",
    activePrescriptions: "Active prescriptions",
    medicalRecords: "Medical records",
    recordsHint: "Always yours",
    recordsTitle: "Recent records",
    prescriptionsTitle: "Recent prescriptions",
    viewAll: "View all",
  },
  doctorDashboard: {
    title: "Doctor dashboard",
    description: "Today's queue, schedule and earnings — at a glance.",
    newPrescription: "New prescription",
    consultsLabel: "Today's consultations",
    consultsHint: "1 video · 1 audio · 1 chamber",
    monthEarnings: "Earnings this month",
    monthEarningsHint: "23 consultations",
    verification: "Verification",
    verificationValue: "Done",
    verificationHint: "BMDC A-00000 verified",
    queueTitle: "Today's queue",
    emptyTitle: "No appointments yet",
    emptyText: "New bookings will appear here.",
    firstVisit: "First visit",
    followUp: "Follow-up",
    modes: { video: "Video", audio: "Audio", chamber: "Chamber" },
  },
  doctorPatients: {
    title: "Patient list",
    description: "Only records shared with you — with expiry windows.",
    emptyTitle: "List is empty",
    emptyText: "Patients will appear here once they share records.",
    ageLabel: "Age",
    bloodLabel: "Blood",
    lastVisitLabel: "Last visit",
    footnote: "Every record access is logged; views lock once the share window expires.",
  },
};

export const staffDoctorCopy: { bn: StaffDoctorCopy; en: StaffDoctorCopy } = { bn, en };
