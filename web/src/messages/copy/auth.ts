/**
 * UI copy for the auth + verification pages, per locale.
 * Seeded data (names, dates, medicine strings) is NOT translated - UI copy only.
 */

type LoginCopy = {
  title: string;
  subtitle: string;
  inputLabel: string;
  sendOtp: string;
  toastSent: string;
  termsNote: string;
};

type LoginOtpCopy = {
  title: string;
  subtitle: string;
  otpGroupLabel: string;
  digitLabel: (n: number) => string;
  verify: string;
  toastSuccess: string;
  resendPrompt: string;
  resend: string;
  changeNumber: string;
};

type DoctorRegisterCopy = {
  title: string;
  subtitle: string;
  fullName: string;
  fullNamePlaceholder: string;
  bmdcLabel: string;
  nidLabel: string;
  nidPlaceholder: string;
  uploadTitle: string;
  chooseFile: string;
  reviewNote: string;
  submit: string;
  toastSubmitted: string;
};

type OnboardingRoleCopy = {
  title: string;
  subtitle: string;
  patient: { title: string; text: string };
  doctor: { title: string; text: string };
  continue: string;
};

type OnboardingProfileCopy = {
  title: string;
  subtitle: string;
  fullName: string;
  fullNamePlaceholder: string;
  bloodGroup: string;
  area: string;
  areaPlaceholder: string;
  finish: string;
  toastCreated: string;
};

export type AuthCopy = {
  login: LoginCopy;
  loginOtp: LoginOtpCopy;
  doctorRegister: DoctorRegisterCopy;
  onboardingRole: OnboardingRoleCopy;
  onboardingProfile: OnboardingProfileCopy;
  verify: import("./auth-verify").VerifyCopy;
};

/** Per-page pair shape consumed by usePageCopy(): copy.loginOtp → { bn, en }. */
type AuthPageCopy = { [K in keyof AuthCopy]: { bn: AuthCopy[K]; en: AuthCopy[K] } };

import { copy as verifyCopy } from "./auth-verify";

type AuthCoreCopy = Omit<AuthCopy, "verify">;

const bn: AuthCoreCopy = {
  login: {
    title: "লগইন করুন",
    subtitle: "ফোন নম্বর বা ইমেইল দিয়ে শুরু করুন। ওটিপি দিয়েই লগইন - পাসওয়ার্ড লাগবে না।",
    inputLabel: "ফোন / ইমেইল",
    sendOtp: "ওটিপি পাঠান",
    toastSent: "ওটিপি পাঠানো হয়েছে (মক)।",
    termsNote: "লগইন করলে আপনি আমাদের শর্তাবলি ও প্রাইভেসি পলিসিতে সম্মত হচ্ছেন।",
  },
  loginOtp: {
    title: "ওটিপি দিন",
    subtitle: "৬ ডিজিটের কোড এসএমএস-এ পাঠানো হয়েছে।",
    otpGroupLabel: "৬ ডিজিটের ওটিপি",
    digitLabel: (n) => `ডিজিট ${n}`,
    verify: "যাচাই করুন",
    toastSuccess: "লগইন সফল!",
    resendPrompt: "কোড আসেনি?",
    resend: "আবার পাঠান",
    changeNumber: "নম্বর বদলান",
  },
  doctorRegister: {
    title: "ডাক্তার হিসেবে যোগ দিন",
    subtitle: "BMDC + NID + সেলফি যাচাইয়ের পরেই ভেরিফায়েড ব্যাজ।",
    fullName: "পুরো নাম",
    fullNamePlaceholder: "ডা. মাহমুদ রহমান",
    bmdcLabel: "BMDC নম্বর",
    nidLabel: "NID নম্বর",
    nidPlaceholder: "১৯৯...",
    uploadTitle: "সেলফি আর সার্টিফিকেট আপলোড",
    chooseFile: "ফাইল বাছুন",
    reviewNote: "অ্যাডমিন ম্যানুয়ালি যাচাই করে অ্যাপ্রুভ করলে তবেই প্রোফাইল লাইভ হবে।",
    submit: "আবেদন জমা দিন",
    toastSubmitted: "আবেদন জমা হয়েছে! ভেরিফিকেশনের পর ইমেইল পাবেন।",
  },
  onboardingRole: {
    title: "আপনি কে?",
    subtitle: "ভূমিকা বেছে নিন - পরে সেটিংস থেকে বদলানো যাবে।",
    patient: { title: "রোগী হিসেবে", text: "ডাক্তার খুঁজব, বুকিং দেব, রেকর্ড রাখব।" },
    doctor: { title: "ডাক্তার হিসেবে", text: "ভেরিফিকেশনের পর প্র্যাকটিস শুরু করব।" },
    continue: "এগিয়ে যান",
  },
  onboardingProfile: {
    title: "প্রোফাইল সেটআপ",
    subtitle: "ইমার্জেন্সি কার্ডে কাজে লাগবে - রক্তের গ্রুপ আর এলাকা জানা জরুরি।",
    fullName: "পুরো নাম",
    fullNamePlaceholder: "রহিম উদ্দিন",
    bloodGroup: "রক্তের গ্রুপ",
    area: "এলাকা",
    areaPlaceholder: "ধানমন্ডি, ঢাকা",
    finish: "শেষ করুন",
    toastCreated: "প্রোফাইল তৈরি হয়েছে!",
  },
};

const en: AuthCoreCopy = {
  login: {
    title: "Log in",
    subtitle: "Start with your phone number or email. Log in with an OTP - no password needed.",
    inputLabel: "Phone / email",
    sendOtp: "Send OTP",
    toastSent: "OTP sent (mock).",
    termsNote: "By logging in you agree to our Terms of Service and Privacy Policy.",
  },
  loginOtp: {
    title: "Enter OTP",
    subtitle: "A 6-digit code has been sent via SMS.",
    otpGroupLabel: "6-digit OTP",
    digitLabel: (n) => `Digit ${n}`,
    verify: "Verify",
    toastSuccess: "Logged in successfully!",
    resendPrompt: "Didn't get the code?",
    resend: "Resend",
    changeNumber: "Change number",
  },
  doctorRegister: {
    title: "Join as a doctor",
    subtitle: "Get your verified badge after BMDC + NID + selfie verification.",
    fullName: "Full name",
    fullNamePlaceholder: "Dr. Mahmud Rahman",
    bmdcLabel: "BMDC number",
    nidLabel: "NID number",
    nidPlaceholder: "199...",
    uploadTitle: "Upload selfie & certificate",
    chooseFile: "Choose file",
    reviewNote: "Your profile goes live only after an admin manually verifies and approves it.",
    submit: "Submit application",
    toastSubmitted: "Application submitted! You'll get an email after verification.",
  },
  onboardingRole: {
    title: "Who are you?",
    subtitle: "Pick your role - you can change it later in settings.",
    patient: { title: "I'm a patient", text: "Find doctors, book visits, keep records." },
    doctor: { title: "I'm a doctor", text: "Start practising after verification." },
    continue: "Continue",
  },
  onboardingProfile: {
    title: "Profile setup",
    subtitle: "This feeds your emergency card - blood group and area are essential.",
    fullName: "Full name",
    fullNamePlaceholder: "Rahim Uddin",
    bloodGroup: "Blood group",
    area: "Area",
    areaPlaceholder: "Dhanmondi, Dhaka",
    finish: "Finish",
    toastCreated: "Profile created!",
  },
};

export const copy: AuthPageCopy = {
  login: { bn: bn.login, en: en.login },
  loginOtp: { bn: bn.loginOtp, en: en.loginOtp },
  doctorRegister: { bn: bn.doctorRegister, en: en.doctorRegister },
  onboardingRole: { bn: bn.onboardingRole, en: en.onboardingRole },
  onboardingProfile: { bn: bn.onboardingProfile, en: en.onboardingProfile },
  verify: { bn: verifyCopy.bn, en: verifyCopy.en },
};
