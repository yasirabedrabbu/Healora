/** Settings page copy: profile, notifications, privacy, security. */

export type SettingsCopy = {
  title: string;
  description: string;
  tabs: { profile: string; notifications: string; privacy: string; security: string };
  save: string;
  saved: string;
  profile: {
    title: string;
    description: string;
    fullName: string;
    phone: string;
    bloodGroup: string;
    language: string;
    languageHint: string;
    bangla: string;
    english: string;
    accountType: string;
    accountTypeValue: string;
  };
  notifications: {
    title: string;
    description: string;
    appointments: string;
    appointmentsHint: string;
    refills: string;
    refillsHint: string;
    reports: string;
    reportsHint: string;
    emergency: string;
    emergencyHint: string;
    sms: string;
    smsHint: string;
  };
  privacy: {
    title: string;
    description: string;
    shareRecords: string;
    shareRecordsHint: string;
    sharePrescriptions: string;
    sharePrescriptionsHint: string;
    download: string;
    downloadHint: string;
    deleteTitle: string;
    deleteHint: string;
    delete: string;
  };
  security: {
    title: string;
    description: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    update: string;
    sessionsTitle: string;
    sessionsHint: string;
    thisDevice: string;
    lastActive: string;
    signOutOthers: string;
    passwordHint: string;
  };
  disclaimer: string;
};

const bn: SettingsCopy = {
  title: "সেটিংস",
  description: "প্রোফাইল, নোটিফিকেশন, প্রাইভেসি আর অ্যাকাউন্ট সিকিউরিটি এক জায়গায়।",
  tabs: { profile: "প্রোফাইল", notifications: "নোটিফিকেশন", privacy: "প্রাইভেসি", security: "সিকিউরিটি" },
  save: "সেভ করুন",
  saved: "সেটিংস সেভ হয়েছে।",
  profile: {
    title: "প্রোফাইল তথ্য",
    description: "এই তথ্য ডাক্তার ও ল্যাব দেখতে পায়, তাই সঠিক রাখুন।",
    fullName: "পুরো নাম",
    phone: "মোবাইল নম্বর",
    bloodGroup: "রক্তের গ্রুপ",
    language: "ভাষা",
    languageHint: "পুরো সাইট এই ভাষায় দেখাবে।",
    bangla: "বাংলা",
    english: "English",
    accountType: "অ্যাকাউন্টের ধরন",
    accountTypeValue: "রোগী",
  },
  notifications: {
    title: "নোটিফিকেশন",
    description: "কোন খবর কোথায় পাবেন তা বেছে নিন।",
    appointments: "অ্যাপয়েন্টমেন্ট রিমাইন্ডার",
    appointmentsHint: "২৪ ঘণ্টা ও ১ ঘণ্টা আগে জানানো হবে।",
    refills: "রিফিল সতর্কতা",
    refillsHint: "ওষুধ শেষ হওয়ার ৫ দিন আগে।",
    reports: "ল্যাব রিপোর্ট প্রস্তুত",
    reportsHint: "রিপোর্ট আপলোড হলে সাথে সাথে।",
    emergency: "জরুরি সতর্কতা",
    emergencyHint: "রক্তের অনুরোধ ও অ্যাম্বুলেন্স আপডেট।",
    sms: "SMS-এ পাঠান",
    smsHint: "ইন্টারনেট না থাকলেও নোটিফিকেশন পাবেন।",
  },
  privacy: {
    title: "প্রাইভেসি ও ডেটা",
    description: "আপনার রেকর্ড কে দেখবে, তা আপনি ঠিক করবেন।",
    shareRecords: "ডাক্তারের সাথে রেকর্ড শেয়ার",
    shareRecordsHint: "শুধু আপনার অনুমোদিত ডাক্তার দেখতে পারবেন।",
    sharePrescriptions: "ফার্মেসির সাথে প্রেসক্রিপশন শেয়ার",
    sharePrescriptionsHint: "QR স্ক্যান করলেই যাচাই হবে।",
    download: "আমার ডেটা ডাউনলোড",
    downloadHint: "সব রেকর্ড ও প্রেসক্রিপশন একটি ফাইলে।",
    deleteTitle: "অ্যাকাউন্ট মুছে ফেলুন",
    deleteHint: "মুছে ফেললে রেকর্ড ফেরানো যাবে না। আগে ডাউনলোড করে নিন।",
    delete: "মুছে ফেলুন",
  },
  security: {
    title: "সিকিউরিটি",
    description: "পাসওয়ার্ড বদলান আর সক্রিয় ডিভাইস দেখুন।",
    currentPassword: "বর্তমান পাসওয়ার্ড",
    newPassword: "নতুন পাসওয়ার্ড",
    confirmPassword: "নতুন পাসওয়ার্ড আবার",
    update: "পাসওয়ার্ড আপডেট",
    sessionsTitle: "সক্রিয় সেশন",
    sessionsHint: "অচেনা কিছু দেখলে সাথে সাথে সাইন আউট করুন।",
    thisDevice: "এই ডিভাইস",
    lastActive: "সর্বশেষ সক্রিয়",
    signOutOthers: "অন্য ডিভাইস থেকে সাইন আউট",
    passwordHint: "কমপক্ষে ৮ অক্ষর, একটি সংখ্যা ও একটি বড় হাতের অক্ষর।",
  },
  disclaimer: "Healora কখনো ফোন বা SMS-এ পাসওয়ার্ড চায় না। জরুরিতে ৯৯৯-এ কল করুন।",
};

const en: SettingsCopy = {
  title: "Settings",
  description: "Profile, notifications, privacy, and account security in one place.",
  tabs: { profile: "Profile", notifications: "Notifications", privacy: "Privacy", security: "Security" },
  save: "Save changes",
  saved: "Settings saved.",
  profile: {
    title: "Profile details",
    description: "Doctors and labs see this, so keep it accurate.",
    fullName: "Full name",
    phone: "Mobile number",
    bloodGroup: "Blood group",
    language: "Language",
    languageHint: "The whole site switches to this language.",
    bangla: "বাংলা",
    english: "English",
    accountType: "Account type",
    accountTypeValue: "Patient",
  },
  notifications: {
    title: "Notifications",
    description: "Choose what reaches you and where.",
    appointments: "Appointment reminders",
    appointmentsHint: "Sent 24 hours and 1 hour before.",
    refills: "Refill alerts",
    refillsHint: "Five days before a medicine runs out.",
    reports: "Lab report ready",
    reportsHint: "As soon as the report is uploaded.",
    emergency: "Emergency alerts",
    emergencyHint: "Blood requests and ambulance updates.",
    sms: "Also send by SMS",
    smsHint: "Works even without mobile data.",
  },
  privacy: {
    title: "Privacy and data",
    description: "You decide who sees your record.",
    shareRecords: "Share records with doctors",
    shareRecordsHint: "Only doctors you approve can open them.",
    sharePrescriptions: "Share prescriptions with pharmacies",
    sharePrescriptionsHint: "Verified when the QR code is scanned.",
    download: "Download my data",
    downloadHint: "All records and prescriptions in one file.",
    deleteTitle: "Delete account",
    deleteHint: "Deletion is permanent. Download your data first.",
    delete: "Delete account",
  },
  security: {
    title: "Security",
    description: "Change your password and review active devices.",
    currentPassword: "Current password",
    newPassword: "New password",
    confirmPassword: "Confirm new password",
    update: "Update password",
    sessionsTitle: "Active sessions",
    sessionsHint: "Sign out immediately if you see a device you do not know.",
    thisDevice: "This device",
    lastActive: "Last active",
    signOutOthers: "Sign out other devices",
    passwordHint: "At least 8 characters with one number and one uppercase letter.",
  },
  disclaimer: "Healora never asks for your password by phone or SMS. In an emergency call 999.",
};

export const copy: { bn: SettingsCopy; en: SettingsCopy } = { bn, en };
