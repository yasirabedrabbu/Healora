/**
 * UI copy for the doctor clinical-workflow pages (prescribe / schedule /
 * earnings), per locale. Seeded data (dates, amounts) is NOT translated.
 */

type DoctorPrescribeCopy = {
  title: string;
  description: string;
  patientName: string;
  diagnosis: string;
  diagnosisPlaceholder: string;
  medListTitle: string;
  medName: string;
  medNamePlaceholder: string;
  dose: string;
  dosePlaceholder: string;
  duration: string;
  durationPlaceholder: string;
  deleteMed: (name: string) => string;
  addMed: string;
  rulesTitle: string;
  rule1: string;
  rule2: string;
  rule3: string;
  issue: string;
  toastIssued: string;
};

type DoctorScheduleCopy = {
  title: string;
  description: string;
  save: string;
  weekTitle: string;
  weekdays: string[];
  deleteSlot: string;
  delete: string;
  addSlot: string;
  newSlot: { day: number; start: string; end: string; mode: "video" | "audio" | "chamber" };
  toastSaved: string;
  modes: Record<"video" | "audio" | "chamber", string>;
  footnote: string;
};

type DoctorEarningsCopy = {
  title: string;
  description: string;
  releasableBalance: string;
  releasableHint: string;
  monthCommission: string;
  commissionHint: string;
  totalConsults: string;
  consultsHint: string;
  releaseHistory: string;
  consultsCount: (n: number) => string;
  statusReleased: string;
  statusHold: string;
  footnote: string;
};

export type StaffClinicalCopy = {
  doctorPrescribe: DoctorPrescribeCopy;
  doctorSchedule: DoctorScheduleCopy;
  doctorEarnings: DoctorEarningsCopy;
};

const bn: StaffClinicalCopy = {
  doctorPrescribe: {
    title: "প্রেসক্রাইব করুন",
    description: "ইস্যু হলেই ইউনিক ID + QR তৈরি হবে · ফার্মেসি স্ক্যানে যাচাইযোগ্য।",
    patientName: "রোগীর নাম",
    diagnosis: "রোগ নির্ণয়",
    diagnosisPlaceholder: "যেমন: ভাইরাল ফিভার",
    medListTitle: "ওষুধের তালিকা",
    medName: "ওষুধ",
    medNamePlaceholder: "নাম",
    dose: "ডোজ",
    dosePlaceholder: "১+০+১",
    duration: "মেয়াদ",
    durationPlaceholder: "৭ দিন",
    deleteMed: (name) => `${name || "ওষুধ"} মুছুন`,
    addMed: "ওষুধ যোগ করুন",
    rulesTitle: "ইস্যুর নিয়ম",
    rule1: "· প্রতিটি প্রেসক্রিপশনে ইউনিক ID ও হ্যাশ-সাইন্ড QR তৈরি হয়।",
    rule2: "· ফার্মেসি ডিসপেন্স করলেই স্ট্যাটাস 'dispensed' · পুনরায় ব্যবহার অসম্ভব।",
    rule3: "· মেয়াদ শেষ হলে QR লাল ব্যানার দেখায়।",
    issue: "ইস্যু করুন",
    toastIssued: "প্রেসক্রিপশন ইস্যু হয়েছে · QR তৈরি।",
  },
  doctorSchedule: {
    title: "শিডিউল",
    description: "সাপ্তাহিক স্লট · মোডসহ (ভিডিও/অডিও/চ্যাট/চেম্বার)।",
    save: "সেভ করুন",
    weekTitle: "সাপ্তাহিক স্লট",
    weekdays: ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"],
    deleteSlot: "স্লট মুছুন",
    delete: "মুছুন",
    addSlot: "নতুন স্লট",
    newSlot: { day: 4, start: "10:00", end: "12:00", mode: "video" },
    toastSaved: "শিডিউল সেভ হয়েছে · রোগীরা এখন এই স্লটে বুক করতে পারবে।",
    modes: { video: "ভিডিও", audio: "অডিও", chamber: "চেম্বার" },
    footnote: "BMDC টেলিমেডিসিন গাইডলাইন অনুযায়ী টেলিফোনে যে ওষুধ দেওয়া যাবে না, সেই সীমা সিস্টেম মেনে চলে (§9)।",
  },
  doctorEarnings: {
    title: "আয়",
    description: "কমিশন কাটার পরের ব্যালেন্স ও রিলিজ হিস্ট্রি (§11)।",
    releasableBalance: "রিলিজযোগ্য ব্যালেন্স",
    releasableHint: "হোল্ড থেকে ছাড়া হয়েছে",
    monthCommission: "এই মাসের কমিশন",
    commissionHint: "১৫% প্ল্যাটফর্ম কমিশন",
    totalConsults: "মোট কনসালটেশন",
    consultsHint: "no-show রিফান্ড: ২",
    releaseHistory: "রিলিজ হিস্ট্রি",
    consultsCount: (n) => `${n} কনসালটেশন`,
    statusReleased: "রিলিজড",
    statusHold: "হোল্ডে",
    footnote: "no-show হলে রোগীর টাকা অটো-রিফান্ড হয় (§11); সেটা আপনার ব্যালেন্স থেকে কাটা হয় না।",
  },
};

const en: StaffClinicalCopy = {
  doctorPrescribe: {
    title: "Prescribe",
    description: "Issuing generates a unique ID + QR · verifiable at pharmacy scan.",
    patientName: "Patient name",
    diagnosis: "Diagnosis",
    diagnosisPlaceholder: "e.g. Viral fever",
    medListTitle: "Medicine list",
    medName: "Medicine",
    medNamePlaceholder: "Name",
    dose: "Dose",
    dosePlaceholder: "1+0+1",
    duration: "Duration",
    durationPlaceholder: "7 days",
    deleteMed: (name) => `Delete ${name || "medicine"}`,
    addMed: "Add medicine",
    rulesTitle: "Issuing rules",
    rule1: "· Every prescription gets a unique ID and hash-signed QR.",
    rule2: "· Once a pharmacy dispenses, status becomes 'dispensed' · no reuse.",
    rule3: "· An expired QR shows a red banner.",
    issue: "Issue",
    toastIssued: "Prescription issued · QR generated.",
  },
  doctorSchedule: {
    title: "Schedule",
    description: "Weekly slots · with mode (video/audio/chat/chamber).",
    save: "Save",
    weekTitle: "Weekly slots",
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    deleteSlot: "Delete slot",
    delete: "Delete",
    addSlot: "New slot",
    newSlot: { day: 4, start: "10:00", end: "12:00", mode: "video" },
    toastSaved: "Schedule saved · patients can now book these slots.",
    modes: { video: "Video", audio: "Audio", chamber: "Chamber" },
    footnote: "The system enforces the BMDC telemedicine guideline (§9) limit on medicines that cannot be prescribed by phone.",
  },
  doctorEarnings: {
    title: "Earnings",
    description: "Balance after commission and release history (§11).",
    releasableBalance: "Releasable balance",
    releasableHint: "Released from hold",
    monthCommission: "Commission this month",
    commissionHint: "15% platform commission",
    totalConsults: "Total consultations",
    consultsHint: "no-show refunds: 2",
    releaseHistory: "Release history",
    consultsCount: (n) => `${n} consultations`,
    statusReleased: "Released",
    statusHold: "On hold",
    footnote: "On a no-show, the patient is auto-refunded (§11); it is never deducted from your balance.",
  },
};

export const staffClinicalCopy: { bn: StaffClinicalCopy; en: StaffClinicalCopy } = { bn, en };
