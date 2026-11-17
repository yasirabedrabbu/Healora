/** UI copy for the public prescription verification page, per locale. */

export type VerifyCopy = {
  verdictValid: string;
  verdictInvalid: string;
  verdictNote: string;
  tokenLabel: string;
  prescriptionTitle: string;
  doctorLabel: string;
  bmdcLabel: string;
  dateLabel: string;
  validUntilLabel: string;
  medicinesLabel: string;
  badgeVerified: string;
  badgeInvalid: string;
};

type VerifyPageCopy = { bn: VerifyCopy; en: VerifyCopy };

const bn: VerifyCopy = {
  verdictValid: "প্রেসক্রিপশন ভ্যালিড",
  verdictInvalid: "যাচাই ব্যর্থ",
  verdictNote: "ফার্মেসি ওষুধ দেওয়ার আগে ডাক্তারের নাম ও মেয়াদ চেক করুন।",
  tokenLabel: "টোকেন:",
  prescriptionTitle: "প্রেসক্রিপশন",
  doctorLabel: "ডাক্তার",
  bmdcLabel: "BMDC রেজ নম্বর",
  dateLabel: "তারিখ",
  validUntilLabel: "ভ্যালিড পর্যন্ত",
  medicinesLabel: "ওষুধ",
  badgeVerified: "ভেরিফায়েড",
  badgeInvalid: "অবৈধ",
};

const en: VerifyCopy = {
  verdictValid: "Prescription valid",
  verdictInvalid: "Verification failed",
  verdictNote: "Pharmacies: check the doctor's name and expiry before dispensing.",
  tokenLabel: "Token:",
  prescriptionTitle: "Prescription",
  doctorLabel: "Doctor",
  bmdcLabel: "BMDC reg. number",
  dateLabel: "Date",
  validUntilLabel: "Valid until",
  medicinesLabel: "Medicines",
  badgeVerified: "Verified",
  badgeInvalid: "Invalid",
};

export const copy: VerifyPageCopy = { bn, en };
