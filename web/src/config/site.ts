export const siteConfig = {
  name: "Healora",
  url: "https://healora.example",
  tagline: "বিশ্বাসের সাথে সুস্থতা",
  description:
    "বাংলাদেশের ট্রাস্ট-ফার্স্ট ডিজিটাল স্বাস্থ্যসেবা প্ল্যাটফর্ম। ভেরিফায়েড ডাক্তার, QR যাচাইযোগ্য প্রেসক্রিপশন, নিজের মেডিকেল রেকর্ড নিজের হাতে।",
  nav: [
    { label: "ডাক্তার খুঁজুন", href: "/doctors" },
    { label: "কীভাবে কাজ করে", href: "/#how-it-works" },
    { label: "প্রাইসিং", href: "/pricing" },
    { label: "FAQ", href: "/#faq" },
  ],
  contact: {
    email: "hello@healora.example",
    phone: "+880 0000-000000",
  },
} as const;
