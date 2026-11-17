/** Patient-side dashboard page copy (records, family, blood, prescriptions, emergency card). */

type RecordsCopy = {
  title: string;
  description: string;
  emptyTitle: string;
  emptyText: string;
  headers: { name: string; type: string; date: string; share: string };
  shared: string;
  private: string;
};

type FamilyCopy = {
  title: string;
  description: string;
  bloodLabel: string;
};

type BloodCopy = {
  title: string;
  description: string;
  requestButton: string;
  contactAsDonor: string;
};

type PrescriptionsCopy = {
  title: string;
  description: string;
  emptyTitle: string;
  emptyText: string;
  tabs: { all: string; active: string; paused: string; completed: string };
  newButton: string;
  statusLabels: { active: string; paused: string; completed: string };
  syncedFrom: string;
  nextDose: string;
  tabletsLabel: string;
  daysLeftLabel: string;
};

type PrescriptionDetailCopy = {
  title: string;
  verifyQr: string;
  bmdcRegNo: string;
  validUntil: string;
  verified: string;
  medicinesHeading: string;
  doseLabel: string;
  durationLabel: string;
};

type EmergencyCardCopy = {
  title: string;
  description: string;
  emergencyBadge: string;
  fields: { bloodGroup: string; allergy: string; chronic: string; emergencyContact: string };
  disclaimer: string;
  qrHint: string;
  backToDashboard: string;
};

export type PatientCopy = {
  records: RecordsCopy;
  family: FamilyCopy;
  blood: BloodCopy;
  prescriptions: PrescriptionsCopy;
  prescriptionDetail: PrescriptionDetailCopy;
  emergencyCard: EmergencyCardCopy;
};

export const copy: { bn: PatientCopy; en: PatientCopy } = {
  bn: {
    records: {
      title: "মেডিকেল রেকর্ড",
      description: "আপনার রিপোর্ট আর X-ray। কাকে শেয়ার করবেন, সেটা আপনি ঠিক করবেন।",
      emptyTitle: "এখনও কোনো রেকর্ড নেই",
      emptyText: "রিপোর্ট আপলোড করলে এখানে দেখাবে।",
      headers: { name: "নাম", type: "ধরন", date: "তারিখ", share: "শেয়ার" },
      shared: "শেয়ারড",
      private: "প্রাইভেট",
    },
    family: {
      title: "ফ্যামিলি প্রোফাইল",
      description: "পরিবারের সদস্যদের রেকর্ড আলাদা করে ম্যানেজ করুন।",
      bloodLabel: "রক্ত:",
    },
    blood: {
      title: "রক্তদান",
      description: "জরুরি রক্তের অনুরোধ দেখুন বা নিজের ডোনার প্রোফাইল যোগ করুন।",
      requestButton: "রক্তের অনুরোধ দিন",
      contactAsDonor: "ডোনার হিসেবে যোগাযোগ",
    },
    prescriptions: {
      title: "প্রেসক্রিপশন",
      description: "সব প্রেসক্রিপশন এখানে। ফার্মেসিতে QR দেখালেই যাচাই হবে।",
      emptyTitle: "এখনও প্রেসক্রিপশন নেই",
      emptyText: "ডাক্তার কনসালটেশনের পর প্রেসক্রিপশন এখানে আসবে।",
      tabs: { all: "সব", active: "চলমান", paused: "বিরতি", completed: "সম্পন্ন" },
      newButton: "নতুন প্রেসক্রিপশন",
      statusLabels: { active: "চলমান", paused: "বিরতি", completed: "সম্পন্ন" },
      syncedFrom: "ডাক্তার",
      nextDose: "পরবর্তী ডোজ",
      tabletsLabel: "ট্যাবলেট",
      daysLeftLabel: "দিন বাকি",
    },
    prescriptionDetail: {
      title: "প্রেসক্রিপশন ডিটেইল",
      verifyQr: "QR যাচাই পেজ",
      bmdcRegNo: "BMDC রেজ নম্বর",
      validUntil: "ভ্যালিড পর্যন্ত",
      verified: "ভেরিফায়েড",
      medicinesHeading: "ওষুধ",
      doseLabel: "ডোজ:",
      durationLabel: "সময়:",
    },
    emergencyCard: {
      title: "ইমার্জেন্সি কার্ড",
      description: "লক-স্ক্রিনে QR - অচেতন অবস্থাতেও সাধারণ তথ্য সাথে থাকবে।",
      emergencyBadge: "ইমার্জেন্সি",
      fields: {
        bloodGroup: "রক্তের গ্রুপ",
        allergy: "অ্যালার্জি",
        chronic: "দীর্ঘমেয়াদি রোগ",
        emergencyContact: "জরুরি যোগাযোগ",
      },
      disclaimer:
        "কার্ডে শুধু জরুরি প্রয়োজনীয় তথ্য থাকে; পূর্ণ রেকর্ড শুধু আপনার অনুমতিতে খোলে।",
      qrHint: "এই QR লক-স্ক্রিনে সেট করুন - উদ্ধারকারী স্ক্যান করলে রক্তের গ্রুপ ও অ্যালার্জি দেখবে।",
      backToDashboard: "ড্যাশবোর্ডে ফিরুন",
    },
  },
  en: {
    records: {
      title: "Medical Records",
      description: "Your reports and X-rays. You decide who gets to see them.",
      emptyTitle: "No records yet",
      emptyText: "Uploaded reports will appear here.",
      headers: { name: "Name", type: "Type", date: "Date", share: "Sharing" },
      shared: "Shared",
      private: "Private",
    },
    family: {
      title: "Family Profiles",
      description: "Manage each family member's records separately.",
      bloodLabel: "Blood:",
    },
    blood: {
      title: "Blood Donation",
      description: "View urgent blood requests or add your own donor profile.",
      requestButton: "Request blood",
      contactAsDonor: "Contact as donor",
    },
    prescriptions: {
      title: "Prescriptions",
      description: "All your prescriptions in one place. Pharmacies verify with the QR code.",
      emptyTitle: "No prescriptions yet",
      emptyText: "Prescriptions from doctor consultations will appear here.",
      tabs: { all: "All", active: "Active", paused: "Paused", completed: "Completed" },
      newButton: "New prescription",
      statusLabels: { active: "Active", paused: "Paused", completed: "Completed" },
      syncedFrom: "Synced from",
      nextDose: "Next dose",
      tabletsLabel: "tablets",
      daysLeftLabel: "days left",
    },
    prescriptionDetail: {
      title: "Prescription Details",
      verifyQr: "Verify QR page",
      bmdcRegNo: "BMDC Reg. No.",
      validUntil: "Valid until",
      verified: "Verified",
      medicinesHeading: "Medicines",
      doseLabel: "Dose:",
      durationLabel: "Duration:",
    },
    emergencyCard: {
      title: "Emergency Card",
      description: "QR on your lock screen - key info stays with you even when you can't speak.",
      emergencyBadge: "Emergency",
      fields: {
        bloodGroup: "Blood group",
        allergy: "Allergies",
        chronic: "Chronic conditions",
        emergencyContact: "Emergency contact",
      },
      disclaimer:
        "This card only holds essential emergency info; full records open only with your permission.",
      qrHint:
        "Set this QR as your lock screen - a rescuer who scans it will see your blood group and allergies.",
      backToDashboard: "Back to dashboard",
    },
  },
};
