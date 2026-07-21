import axios from "axios";

import { getApiUrlDomain } from "@/api/config";
import { DATA_STORAGE } from "@/utils/constants";

export type WalletOffer = {
  slug: string;
  price_usd: string;
};

export type TopupIntent = {
  payment_intent_id: string;
  client_secret: string;
};

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem(DATA_STORAGE.TOKEN)}`,
});

const errorMessage = (error: unknown, fallback: string) => {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : fallback;
  }

  const data = error.response?.data as { message?: string } | undefined;
  return data?.message || error.message || fallback;
};

export const getPaywallOffers = async (): Promise<WalletOffer[]> => {
  const response = await axios.get(
    `${getApiUrlDomain()}/wallets/packages`,
    { headers: authHeaders() },
  );
  return response.data;
};

export const createTopupIntent = async ({
  package_slug,
}: {
  package_slug: string;
}): Promise<TopupIntent> => {
  try {
    const response = await axios.post(
      `${getApiUrlDomain()}/wallets/me/topup/create-intent`,
      { package_slug },
      { headers: authHeaders() },
    );
    const data = response.data ?? {};
    const clientSecret =
      data.client_secret ??
      data.clientSecret ??
      data.payment_intent_client_secret ??
      "";
    const paymentIntentId =
      data.payment_intent_id ?? data.paymentIntentId ?? data.id ?? "";

    if (!clientSecret) {
      throw new Error("Backend response does not include Stripe client_secret.");
    }

    return {
      payment_intent_id: String(paymentIntentId),
      client_secret: String(clientSecret),
    };
  } catch (error) {
    throw new Error(errorMessage(error, "Payment request failed."));
  }
};

export const topupWallet = async (
  payment_intent_id: string,
  package_slug: string,
) => {
  try {
    const response = await axios.post(
      `${getApiUrlDomain()}/wallets/me/topup`,
      { payment_intent_id, package_slug },
      { headers: authHeaders() },
    );
    return response.data;
  } catch (error) {
    throw new Error(errorMessage(error, "Topup failed."));
  }
};
