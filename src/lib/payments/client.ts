import { getLeadAttribution } from "@/lib/marketing/attribution";

export const paymentsMode =
  process.env.NEXT_PUBLIC_PAYMENTS_MODE === "stripe" ? "stripe" : "preview";

const apiBaseUrl = (process.env.NEXT_PUBLIC_PAYMENTS_API_BASE_URL ?? "").replace(
  /\/$/,
  "",
);

export type PlanId = "essential" | "plus" | "complete";

export type PaymentStatus =
  | "active"
  | "canceled"
  | "failed"
  | "pending";

type LeadApiResponse = {
  lead_id?: string;
  leadId?: string;
};

type SubscriptionApiResponse = {
  client_secret?: string;
  clientSecret?: string;
  payment_id?: string;
  paymentId?: string;
};

type PaymentStatusApiResponse = {
  amount?: number;
  currency?: string;
  plan_id?: PlanId;
  planId?: PlanId;
  status?: PaymentStatus;
};

export type SubscriptionSession = {
  clientSecret: string;
  paymentId: string;
};

export type SubscriptionStatus = {
  amount?: number;
  currency?: string;
  planId?: PlanId;
  status: PaymentStatus;
};

function buildApiUrl(path: string) {
  if (!apiBaseUrl) {
    throw new Error("Payment API URL is not configured.");
  }

  return `${apiBaseUrl}${path}`;
}

function createPreviewLeadId() {
  const browserCrypto = globalThis.crypto;

  if (typeof browserCrypto?.randomUUID === "function") {
    return browserCrypto.randomUUID();
  }

  if (typeof browserCrypto?.getRandomValues === "function") {
    const bytes = new Uint8Array(16);
    browserCrypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = Array.from(bytes, (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");

    return [
      hex.slice(0, 8),
      hex.slice(8, 12),
      hex.slice(12, 16),
      hex.slice(16, 20),
      hex.slice(20),
    ].join("-");
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

async function readJson<T>(response: Response): Promise<T> {
  const payload = (await response.json().catch(() => null)) as
    | ({ message?: string } & T)
    | null;

  if (!response.ok) {
    throw new Error(payload?.message || "The payment service is unavailable.");
  }

  if (!payload) {
    throw new Error("The payment service returned an empty response.");
  }

  return payload;
}

export async function createLead(email: string) {
  if (paymentsMode === "preview") {
    return `preview_${createPreviewLeadId()}`;
  }

  const attribution = getLeadAttribution();
  const response = await fetch(buildApiUrl("/leads"), {
    body: JSON.stringify({
      email,
      source: "security-white",
      ...(attribution ?? {}),
    }),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  const payload = await readJson<LeadApiResponse>(response);
  const leadId = payload.lead_id ?? payload.leadId;

  if (!leadId) {
    throw new Error("The payment service did not return a lead ID.");
  }

  return leadId;
}

export async function createSubscriptionSession({
  leadId,
  planId,
}: {
  leadId: string;
  planId: PlanId;
}): Promise<SubscriptionSession> {
  const response = await fetch(buildApiUrl("/payments/subscriptions"), {
    body: JSON.stringify({
      lead_id: leadId,
      plan_id: planId,
    }),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  const payload = await readJson<SubscriptionApiResponse>(response);
  const clientSecret = payload.client_secret ?? payload.clientSecret;
  const paymentId = payload.payment_id ?? payload.paymentId;

  if (!clientSecret || !paymentId) {
    throw new Error("The payment session response is incomplete.");
  }

  return { clientSecret, paymentId };
}

export async function getSubscriptionStatus(
  paymentId: string,
): Promise<SubscriptionStatus> {
  const response = await fetch(
    buildApiUrl(`/payments/subscriptions/${encodeURIComponent(paymentId)}`),
    {
      cache: "no-store",
      credentials: "include",
      headers: { Accept: "application/json" },
    },
  );
  const payload = await readJson<PaymentStatusApiResponse>(response);

  return {
    amount: payload.amount,
    currency: payload.currency,
    planId: payload.plan_id ?? payload.planId,
    status: payload.status ?? "pending",
  };
}
