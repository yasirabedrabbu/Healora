#!/usr/bin/env node
/**
 * Smoke test: hit every route on the running server, expect 200 (or the
 * documented non-200), and verify a key selector appears in the HTML.
 * Usage: node scripts/smoke.mjs [baseUrl]   (default http://localhost:3000)
 */
const BASE = process.argv[2] ?? "http://localhost:3000";

const ROUTES = [
  ["/", "Healora"],
  ["/doctors", "ডাক্তার"],
  ["/doctors/dr-rahman-01", "BMDC"],
  ["/pricing", "প্রাইসিং"],
  ["/about", "মূলনীতি"],
  ["/contact", "যোগাযোগ"],
  ["/faq", "সাধারণ প্রশ্ন"],
  ["/privacy", "প্রাইভেসি"],
  ["/terms", "শর্তাবলি"],
  ["/ambulance", "অ্যাম্বুলেন্স"],
  ["/login", "লগইন"],
  ["/login/otp", "ওটিপি"],
  ["/onboarding/role", "আপনি কে"],
  ["/onboarding/profile", "প্রোফাইল"],
  ["/doctor/register", "BMDC"],
  ["/dashboard", "ড্যাশবোর্ড"],
  ["/records", "রেকর্ড"],
  ["/prescriptions", "প্রেসক্রিপশন"],
  ["/prescriptions/p1", "QR"],
  ["/blood", "রক্ত"],
  ["/family", "পরিবার"],
  ["/emergency-card", "ইমার্জেন্সি কার্ড"],
  ["/map", "ম্যাপ"],
  ["/assistant", "সহকারী"],
  ["/doctor/dashboard", "কিউ"],
  ["/doctor/prescribe", "প্রেসক্রাইব"],
  ["/doctor/patients", "রোগীর"],
  ["/doctor/schedule", "শিডিউল"],
  ["/doctor/earnings", "আয়"],
  ["/hospital/dashboard", "হসপিটাল"],
  ["/hospital/queue", "সিরিয়াল"],
  ["/hospital/beds", "বেড"],
  ["/hospital/roster", "রোস্টার"],
  ["/lab/booking", "টেস্ট"],
  ["/lab/reports", "রিপোর্ট"],
  ["/pharmacy/orders", "অর্ডার"],
  ["/pharmacy/dispense", "ডিসপেন্স"],
  ["/admin/verification", "ভেরিফিকেশন"],
  ["/admin/payments", "পেমেন্ট"],
];

let pass = 0;
const fails = [];

for (const [route, needle] of ROUTES) {
  try {
    const res = await fetch(`${BASE}${route}`);
    const html = await res.text();
    const ok = res.status === 200 && html.includes(needle);
    if (ok) pass += 1;
    else fails.push(`${route} → ${res.status} (selector ${ok ? "ok" : "missing"})`);
  } catch (e) {
    fails.push(`${route} → ERR ${e.cause?.code ?? e.message}`);
  }
}

console.log(`Smoke: ${pass}/${ROUTES.length} passed`);
if (fails.length) {
  console.error(fails.join("\n"));
  process.exit(1);
}
