/** UI copy for the contact page. */
export const copy = {
  bn: {
    title: "যোগাযোগ করুন",
    description: "প্রশ্ন, রিপোর্ট বা পার্টনারশিপ - সব ইনবক্সে পৌঁছে দিন।",
    channels: {
      email: "ইমেইল",
      phone: "ফোন",
      support: "সাপোর্ট",
      supportValue: "২৪/৭ চ্যাট সাপোর্ট",
    },
    form: {
      nameLabel: "নাম",
      namePlaceholder: "আপনার নাম",
      emailLabel: "ইমেইল",
      messageLabel: "বার্তা",
      messagePlaceholder: "আপনার প্রশ্ন লিখুন…",
      submit: "পাঠিয়ে দিন",
      toastSuccess: "বার্তা পাঠানো হয়েছে। ধন্যবাদ!",
    },
    emergencyNote: "জরুরি অবস্থায় ৯৯৯-এ কল করুন। হেলোরা জরুরি সেবার বিকল্প নয়।",
  },
  en: {
    title: "Contact us",
    description: "Questions, reports or partnerships - we'll get your message to the right inbox.",
    channels: {
      email: "Email",
      phone: "Phone",
      support: "Support",
      supportValue: "24/7 chat support",
    },
    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      messageLabel: "Message",
      messagePlaceholder: "Write your question…",
      submit: "Send message",
      toastSuccess: "Message sent. Thank you!",
    },
    emergencyNote: "In an emergency call 999. Healora is not a substitute for emergency services.",
  },
};

export type ContactCopy = (typeof copy)["bn"];
