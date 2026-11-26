/**
 * Payment gateway adapter.
 *
 * With SSLCommerz credentials set (SSLCOMMERZ_STORE_ID/PASS) this creates a
 * real hosted-checkout session. Without them it returns a sandbox session so
 * local development keeps working; production must configure credentials.
 * The webhook (/api/payments/webhook) remains the only source of truth for
 * settlement, signed with PAYMENT_WEBHOOK_SECRET.
 */
export type GatewayInitInput = {
  paymentId: string;
  amount: number;
  appointmentId: string;
};

export type GatewayInitResult = {
  gateway: string;
  redirectUrl: string | null;
  gatewayRef: string | null;
};

function appUrl(): string {
  return (
    process.env.APP_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

export function gatewayConfigured(): boolean {
  return Boolean(process.env.SSLCOMMERZ_STORE_ID && process.env.SSLCOMMERZ_STORE_PASS);
}

export async function createGatewaySession(input: GatewayInitInput): Promise<GatewayInitResult> {
  if (!gatewayConfigured()) {
    if (process.env.NODE_ENV === "production") {
      throw Object.assign(new Error("পেমেন্ট গেটওয়ে কনফিগার করা নেই"), { status: 503 });
    }
    return {
      gateway: "sandbox",
      redirectUrl: null,
      gatewayRef: `sandbox:${input.paymentId}`,
    };
  }

  const live = process.env.PAYMENT_GATEWAY === "live";
  const base = live
    ? "https://securepay.sslcommerz.com"
    : "https://sandbox.sslcommerz.com";

  const body = new URLSearchParams({
    store_id: process.env.SSLCOMMERZ_STORE_ID ?? "",
    store_passwd: process.env.SSLCOMMERZ_STORE_PASS ?? "",
    total_amount: String(input.amount),
    currency: "BDT",
    tran_id: input.paymentId,
    success_url: `${appUrl()}/payments/success`,
    fail_url: `${appUrl()}/payments/fail`,
    cancel_url: `${appUrl()}/payments/cancel`,
    ipn_url: `${appUrl()}/api/payments/webhook`,
    product_name: "Healora consultation",
    product_category: "healthcare",
    product_profile: "general",
    cus_name: "Healora patient",
    cus_email: "patient@healora.local",
    cus_phone: "01700000000",
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    shipping_method: "NO",
  });

  let json: {
    status?: string;
    GatewayPageURL?: string;
    sessionkey?: string;
    failedreason?: string;
  };
  try {
    const res = await fetch(`${base}/gwprocess/v4/api.php`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    json = (await res.json()) as typeof json;
  } catch {
    throw Object.assign(new Error("পেমেন্ট গেটওয়েতে সংযোগ ব্যর্থ"), { status: 502 });
  }

  if (json.status !== "SUCCESS" || !json.GatewayPageURL) {
    throw Object.assign(
      new Error(json.failedreason ?? "গেটওয়ে সেশন তৈরি হয়নি"),
      { status: 502 }
    );
  }

  return {
    gateway: live ? "sslcommerz" : "sslcommerz-sandbox",
    redirectUrl: json.GatewayPageURL,
    gatewayRef: json.sessionkey ?? null,
  };
}
