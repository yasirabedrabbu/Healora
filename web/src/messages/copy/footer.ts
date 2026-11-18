/** Footer copy - 4 dark columns + trust line. */
export type FooterCopy = {
  brand: string;
  trustBadge: string;
  copyrightSuffix: string;
  emergencyNote: string;
  columns: { title: string; links: { label: string; href: string }[] }[];
};

const bn: FooterCopy = {
  brand: "বিশ্বাসের সাথে সুস্থতা",
  trustBadge: "ভেরিফায়েড ডাক্তার ও প্রেসক্রিপশন",
  copyrightSuffix: "বিশ্বাসের সাথে সুস্থতা",
  emergencyNote: "হিলোরা ইমার্জেন্সি সেবা নয়; জরুরিতে ৯৯৯ ডায়াল করুন।",
  columns: [
    {
      title: "সেবা",
      links: [
        { label: "ডাক্তার খুঁজুন", href: "/doctors" },
        { label: "রক্তদান", href: "/blood" },
        { label: "প্রেসক্রিপশন", href: "/prescriptions" },
        { label: "ম্যাপ", href: "/map" },
        { label: "অ্যাম্বুলেন্স", href: "/ambulance" },
      ],
    },
    {
      title: "কোম্পানি",
      links: [
        { label: "আমাদের সম্পর্কে", href: "/about" },
        { label: "যোগাযোগ", href: "/contact" },
        { label: "প্রাইসিং", href: "/pricing" },
        { label: "ডাক্তার হিসেবে যোগ দিন", href: "/doctor/register" },
      ],
    },
    {
      title: "সহায়তা",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "স্বাস্থ্য সহকারী", href: "/assistant" },
        { label: "ল্যাব টেস্ট বুকিং", href: "/lab/booking" },
        { label: "শিডিউল", href: "/doctor/schedule" },
      ],
    },
    {
      title: "আইনি",
      links: [
        { label: "প্রাইভেসি পলিসি", href: "/privacy" },
        { label: "শর্তাবলি", href: "/terms" },
        { label: "সিকিউরিটি", href: "/contact" },
      ],
    },
  ],
};

const en: FooterCopy = {
  brand: "Healing, built on trust",
  trustBadge: "Verified doctors & prescriptions",
  copyrightSuffix: "Healing, built on trust",
  emergencyNote: "Healora is not an emergency service; dial 999 in emergencies.",
  columns: [
    {
      title: "Services",
      links: [
        { label: "Find doctors", href: "/doctors" },
        { label: "Blood donation", href: "/blood" },
        { label: "Prescriptions", href: "/prescriptions" },
        { label: "Map", href: "/map" },
        { label: "Ambulance", href: "/ambulance" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Pricing", href: "/pricing" },
        { label: "Join as a doctor", href: "/doctor/register" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Health assistant", href: "/assistant" },
        { label: "Lab test booking", href: "/lab/booking" },
        { label: "Schedule", href: "/doctor/schedule" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy policy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Security", href: "/contact" },
      ],
    },
  ],
};

export const footerCopy = { bn, en };
