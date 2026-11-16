/** Typed homepage content. Copy uses message dictionaries at render; this
 * file holds only structure/labels that are language-neutral or tagged. */
export type StatItem = { value: string; label: string };
export type FeatureItem = { icon: "shield" | "qr" | "record" | "language" | "alert" | "hospital"; title: string; text: string };
export type StepItem = { n: string; title: string; text: string };
export type FaqItem = { id: string; question: string; answer: string };
export type TestimonialItem = { name: string; role: string; quote: string; img: string };
export type PlanItem = { id: string; name: string; price: string; period: string; features: string[]; featured?: boolean };

export const stats: StatItem[] = [
  { value: "২০+", label: "ভেরিফায়েড ডাক্তার" },
  { value: "৫০০+", label: "QR প্রেসক্রিপশন" },
  { value: "১০০%", label: "যাচাইযোগ্য প্রেসক্রিপশন" },
  { value: "২৪/৭", label: "সাপোর্ট" },
];

export const steps: StepItem[] = [
  { n: "০১", title: "ডাক্তার খুঁজুন", text: "স্পেশালিটি, ফি আর ভাষা দিয়ে ফিল্টার করুন।" },
  { n: "০২", title: "বুকিং ও পেমেন্ট", text: "ভিডিও, অডিও, চ্যাট বা চেম্বার — সাথে সাথে কনফার্ম।" },
  { n: "০৩", title: "কনসালটেশন", text: "ডাক্তারের সাথে কথা বলুন, প্রেসক্রিপশন পেয়ে যান।" },
  { n: "০৪", title: "QR দিয়ে যাচাই", text: "যেকোনো ফার্মেসি QR স্ক্যান করে প্রেসক্রিপশন চেক করতে পারবে।" },
];

export const faqs: FaqItem[] = [
  { id: "verified", question: "ডাক্তার কি সত্যিই ভেরিফায়েড?", answer: "হ্যাঁ। BMDC নম্বর, NID আর সেলফি চেক করে অ্যাডমিন অ্যাপ্রুভ করলে তখনই ভেরিফায়েড ব্যাজ পাবেন।" },
  { id: "verify", question: "প্রেসক্রিপশন কি যাচাই করা যায়?", answer: "হ্যাঁ। প্রেসক্রিপশনের QR স্ক্যান করলে ডাক্তার, রেজ নম্বর, তারিখ আর ওষুধ দেখা যাবে।" },
  { id: "payment", question: "পেমেন্ট কীভাবে হয়?", answer: "বিকাশ, নগদ বা কার্ড দিয়ে। কনসালটেশন শেষ হলে ডাক্তারের কাছে টাকা যাবে।" },
  { id: "ai", question: "AI কি ডায়াগনোসিস দেবে?", answer: "না। AI শুধু কোন স্পেশালিটির ডাক্তার দেখবেন সেটা বলবে। ডায়াগনোসিস ডাক্তার-ই করবেন।" },
];

export const testimonials: TestimonialItem[] = [
  { name: "রাহিম উদ্দিন", role: "ঢাকা", img: "/images/patient.jpg", quote: "রাত ১১টায় জরুরি প্রেসক্রিপশন লাগল। QR দেখিয়ে ফার্মেসি থেকে ওষুধ নিয়েছি — কোনো ঝামেলা ছাড়াই।" },
  { name: "শারমিন আক্তার", role: "চট্টগ্রাম", img: "/images/doctor-female.jpg", quote: "আমার মায়ের সব রিপোর্ট এখন এক জায়গায়। কে কখন দেখেছে, সেটাও লগে থাকে। মনে দাগ নেই।" },
  { name: "ডা. মাহমুদ রহমান", role: "ভেরিফায়েড ডাক্তার", img: "/images/doctor-male.jpg", quote: "রোগীর রেকর্ড আগে থেকেই দেখে নিতে পারছি। ফলো-আপ অনেক সহজ হয়েছে।" },
];

export const plans: PlanItem[] = [
  {
    id: "free",
    name: "ফ্রি",
    price: "৳০",
    period: "চিরকাল",
    features: ["ডাক্তার খোঁজা", "প্রেসক্রিপশন ভেরিফাই", "মেডিকেল রেকর্ড আপলোড", "রক্তের অনুরোধ"],
  },
  {
    id: "plus",
    name: "প্লাস",
    price: "৳৯৯",
    period: "মাসিক",
    featured: true,
    features: ["ফ্রি-র সব", "পরিবার প্রোফাইল (৫ জন)", "মেডিসিন রিমাইন্ডার", "রিপোর্ট শেয়ার + অ্যাক্সেস লগ"],
  },
  {
    id: "family",
    name: "ফ্যামিলি",
    price: "৳১৯৯",
    period: "মাসিক",
    features: ["প্লাস-এর সব", "পরিবার প্রোফাইল আনলিমিটেড", "ক্রনিক কেয়ার ট্র্যাকার", "প্রায়োরিটি সাপোর্ট"],
  },
];
