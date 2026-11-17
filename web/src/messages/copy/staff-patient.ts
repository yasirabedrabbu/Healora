/**
 * UI copy for the patient dashboard home, per locale.
 * Seed data (medicine names, doctor names, dates) is NOT translated.
 */

export type PatientHomeCopy = {
  greeting: (firstName: string) => string;
  description: string;
  cta: string;
  findDoctor: string;
  viewAll: string;
  stats: {
    dailyDoses: string;
    dailyDosesHint: string;
    appointments: string;
    appointmentsHint: string;
    refillAlerts: string;
    refillAlertsHint: string;
    recordsShared: string;
    recordsSharedHint: string;
  };
  dosesValue: string;
  dosesUnit: string;
  nextDose: (name: string, time: string) => string;
  adherenceTitle: string;
  adherenceAria: string;
  weekDays: readonly string[];
  apptsTitle: string;
  checkupTitle: string;
  followUpTitle: string;
  chatLabel: string;
  refillTitle: string;
  daysLeft: (n: string) => string;
  orderRefill: string;
  details: string;
  scheduleTitle: string;
  nowAria: string;
  taken: string;
  missed: string;
  inHours: (h: string) => string;
  nextAppointment: string;
  activePrescriptions: string;
  medicalRecords: string;
  recordsHint: string;
  recordsTitle: string;
  prescriptionsTitle: string;
};

const bn: PatientHomeCopy = {
  greeting: (first) => `শুভ সকাল, ${first}`,
  description: "আপনার ডোজ, অ্যাপয়েন্টমেন্ট আর রিফিল · এক নজরে।",
  cta: "প্রেসক্রিপশন/বুকিং করুন",
  findDoctor: "ডাক্তার খুঁজুন",
  viewAll: "সব দেখুন",
  stats: {
    dailyDoses: "ডেইলি ডোজ",
    dailyDosesHint: "২টি ডোজ বাকি",
    appointments: "অ্যাপয়েন্টমেন্ট",
    appointmentsHint: "পরেরটি আজ",
    refillAlerts: "রিফিল সতর্কতা",
    refillAlertsHint: "৩টি ওষুধ",
    recordsShared: "শেয়ার করা রেকর্ড",
    recordsSharedHint: "সময়সীমাসহ",
  },
  dosesValue: "২/৫",
  dosesUnit: "ডোজ",
  nextDose: (name, time) => `${time}-এ ${name}`,
  adherenceTitle: "সাপ্তাহিক অ্যাডহিরেন্স",
  adherenceAria: "সাপ্তাহিক অ্যাডহিরেন্স বার চার্ট",
  weekDays: ["রবি", "সোম", "মঙ্গ", "বুধ", "বৃহ", "শুক্র", "শনি"],
  apptsTitle: "অ্যাপয়েন্টমেন্ট",
  checkupTitle: "সাধারণ চেকআপ",
  followUpTitle: "ফলো-আপ ভিজিট",
  chatLabel: "চ্যাট",
  refillTitle: "রিফিল সতর্কতা",
  daysLeft: (n) => `${n} দিন বাকি`,
  orderRefill: "রিফিল অর্ডার",
  details: "বিস্তারিত",
  scheduleTitle: "দৈনিক শিডিউল",
  nowAria: "এখন",
  taken: "খাওয়া হয়েছে",
  missed: "মিসড",
  inHours: (h) => `${h} ঘণ্টা পরে`,
  nextAppointment: "পরবর্তী অ্যাপয়েন্টমেন্ট",
  activePrescriptions: "সক্রিয় প্রেসক্রিপশন",
  medicalRecords: "মেডিকেল রেকর্ড",
  recordsHint: "সব রেকর্ড নিরাপদে সংরক্ষিত",
  recordsTitle: "সাম্প্রতিক রেকর্ড",
  prescriptionsTitle: "সাম্প্রতিক প্রেসক্রিপশন",
};

const en: PatientHomeCopy = {
  greeting: (first) => `Good morning, ${first}`,
  description: "Your doses, appointments and refills · at a glance.",
  cta: "Get prescribed or book",
  findDoctor: "Find a doctor",
  viewAll: "View all",
  stats: {
    dailyDoses: "Daily doses",
    dailyDosesHint: "2 doses left",
    appointments: "Appointments",
    appointmentsHint: "Next one today",
    refillAlerts: "Refill alerts",
    refillAlertsHint: "3 medicines",
    recordsShared: "Records shared",
    recordsSharedHint: "With expiry windows",
  },
  dosesValue: "2/5",
  dosesUnit: "doses",
  nextDose: (name, time) => `${name} at ${time}`,
  adherenceTitle: "Weekly adherence",
  adherenceAria: "Weekly adherence bar chart",
  weekDays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  apptsTitle: "Appointments",
  checkupTitle: "General check-up",
  followUpTitle: "Follow-up visit",
  chatLabel: "Chat",
  refillTitle: "Refill alerts",
  daysLeft: (n) => `${n} days left`,
  orderRefill: "Order refill",
  details: "Details",
  scheduleTitle: "Daily schedule",
  nowAria: "Now",
  taken: "Taken",
  missed: "Missed",
  inHours: (h) => `in ${h}h`,
  nextAppointment: "Next appointment",
  activePrescriptions: "Active prescriptions",
  medicalRecords: "Medical records",
  recordsHint: "All records stored securely",
  recordsTitle: "Recent records",
  prescriptionsTitle: "Recent prescriptions",
};

export const patientHomeCopy: { bn: PatientHomeCopy; en: PatientHomeCopy } = { bn, en };