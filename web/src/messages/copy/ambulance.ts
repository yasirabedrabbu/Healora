/** Ambulance page copy - all page-level strings, bn/en 1:1. */
export const copy = {
  bn: {
    title: "অ্যাম্বুলেন্স",
    description: "নিকটতম অ্যাম্বুলেন্স বুকিং + লাইভ স্ট্যাটাস (Handoff §5 P4)।",
    emergencyButton: "জরুরি: ৯৯৯",
    bannerAlt: "হিলোরা অ্যাম্বুলেন্স পরিষেবা - জরুরি পরিবহন",
    fleet: [
      { id: "AMB-01", area: "ধানমন্ডি", eta: "৮ মিনিট", type: "BLS", status: "available" },
      { id: "AMB-02", area: "গুলশান", eta: "১৫ মিনিট", type: "ICU", status: "available" },
      { id: "AMB-03", area: "মিরপুর", eta: "-", type: "BLS", status: "on-duty" },
    ],
    statusAvailable: "খালি আছে",
    statusOnDuty: "ডিউটিতে",
    bookButton: "বুক করুন",
    bookToast: (id: string) =>
      `${id} বুক হয়েছে - ড্রাইভার কল করবে। জরুরিতে ৯৯৯ ডায়াল করুন।`,
    pickupLabel: "পিকআপ ঠিকানা",
    pickupPlaceholder: "বাসা/রোড, এলাকা",
    disclaimer: "লাইফ-থ্রেটেনিং ইমার্জেন্সিতে অ্যাপের অপেক্ষা নয় - সরাসরি ৯৯৯।",
  },
  en: {
    title: "Ambulance",
    description: "Book the nearest ambulance with live status (Handoff §5 P4).",
    emergencyButton: "Emergency: 999",
    bannerAlt: "Healora ambulance service - emergency transport",
    fleet: [
      { id: "AMB-01", area: "Dhanmondi", eta: "8 minutes", type: "BLS", status: "available" },
      { id: "AMB-02", area: "Gulshan", eta: "15 minutes", type: "ICU", status: "available" },
      { id: "AMB-03", area: "Mirpur", eta: "-", type: "BLS", status: "on-duty" },
    ],
    statusAvailable: "Available",
    statusOnDuty: "On duty",
    bookButton: "Book",
    bookToast: (id: string) =>
      `${id} booked - the driver will call you. In an emergency, dial 999.`,
    pickupLabel: "Pickup address",
    pickupPlaceholder: "House/Road, area",
    disclaimer:
      "In a life-threatening emergency, don't wait for the app - dial 999 directly.",
  },
};
