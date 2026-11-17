/**
 * SMS transport stub (Handoff section 15: provider TBD).
 * Dev: prints the code in the server console.
 * Production: OTP login stays closed (503) until a real gateway is wired here.
 */
export async function sendOtpSms(phone: string, code: string): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.info(`[otp] ${phone} -> ${code}`);
    return;
  }
  throw Object.assign(new Error("SMS সার্ভিস এখনো চালু হয়নি"), { status: 503 });
}