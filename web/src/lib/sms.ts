/**
 * SMS transport. Configure a generic HTTP gateway with:
 *   SMS_PROVIDER_URL, SMS_PROVIDER_KEY, SMS_SENDER_ID
 * Dev without config prints the code; production without config fails
 * closed (503) so OTP login can never silently break.
 */
export async function sendOtpSms(phone: string, code: string): Promise<void> {
  const url = process.env.SMS_PROVIDER_URL;
  const key = process.env.SMS_PROVIDER_KEY;

  if (url && key) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: key,
        senderid: process.env.SMS_SENDER_ID ?? "Healora",
        number: phone,
        message: `Healora যাচাইকরণ কোড: ${code}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      throw Object.assign(new Error("SMS গেটওয়ে সাড়া দিচ্ছে না"), { status: 502 });
    }
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(`[otp] ${phone} -> ${code}`);
    return;
  }

  throw Object.assign(new Error("SMS গেটওয়ে কনফিগার করা নেই"), { status: 503 });
}
