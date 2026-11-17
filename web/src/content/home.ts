/** Typed, language-neutral homepage content: data + ids only.
 * All user-visible copy lives in src/messages/copy/home-*.ts per locale. */
export type StepCopy = { n: string; title: string; text: string };
export type FaqCopy = { question: string; answer: string };
export type PlanCopy = { name: string; price: string; period: string; features: string[] };
export type TestimonialCopy = { quote: string; role: string };
export type SpecialtiesCopy = string[];

/** Plan structure: copy per locale is positional (same order). */
export const planMeta = [
  { id: "free", featured: false },
  { id: "plus", featured: true },
  { id: "family", featured: false },
] as const;

/** Testimonial identities: names/cities stay data, quotes/roles are copy. */
export const testimonialMeta = [
  { name: "রাহিম উদ্দিন", img: "/images/patient.jpg" },
  { name: "শারমিন আক্তার", img: "/images/doctor-female.jpg" },
  { name: "ডা. মাহমুদ রহমান", img: "/images/doctor-male.jpg" },
] as const;

/** FAQ ids: copy per locale is positional. */
export const faqIds = ["verified", "verify", "payment", "ai"] as const;

/** Specialty icons by grid position (labels are per-locale copy). */
export const specialtyIcons = [
  "stethoscope", "doctor", "heart", "hospital", "blood", "health", "stethoscope2", "doctor2",
] as const;
