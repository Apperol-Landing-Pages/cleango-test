import { useCallback, useEffect, useRef, useState } from "react";
import type { PaymentRequest, Stripe } from "@stripe/stripe-js";

export type ApplePayIntent = {
  clientSecret: string;
};

export type ApplePayResult =
  | { status: "succeeded"; paymentIntentId: string | null }
  | { status: "unavailable" }
  | { status: "cancelled" }
  | { status: "failed"; message: string };

type UseApplePayRequestArgs = {
  stripe: Stripe | null;
  label: string;
  amountCents: number;
  country?: string;
  currency?: string;
};

type Pending = {
  fetchIntent: () => Promise<ApplePayIntent>;
  resolve: (result: ApplePayResult) => void;
  settled: boolean;
};

const MIN_AMOUNT_CENTS = 100;

export const useApplePayRequest = ({
  stripe,
  label,
  amountCents,
  country = "US",
  currency = "usd",
}: UseApplePayRequestArgs) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const prRef = useRef<PaymentRequest | null>(null);
  const pendingRef = useRef<Pending | null>(null);

  const labelRef = useRef(label);
  const amountRef = useRef(amountCents);

  useEffect(() => {
    labelRef.current = label;
    amountRef.current = amountCents;
  }, [label, amountCents]);

  useEffect(() => {
    if (!stripe) return;

    let active = true;
    const pr = stripe.paymentRequest({
      country,
      currency,
      total: {
        label: labelRef.current,
        amount: amountRef.current > 0 ? amountRef.current : MIN_AMOUNT_CENTS,
      },
      requestPayerName: true,
    });

    const finalize = (result: ApplePayResult) => {
      const pending = pendingRef.current;
      if (!pending || pending.settled) return;
      pending.settled = true;
      pendingRef.current = null;
      pending.resolve(result);
    };

    pr.on("paymentmethod", async (event) => {
      const pending = pendingRef.current;
      if (!pending) {
        event.complete("fail");
        return;
      }

      let intent: ApplePayIntent;
      try {
        intent = await pending.fetchIntent();
      } catch (error) {
        event.complete("fail");
        finalize({
          status: "failed",
          message:
            error instanceof Error
              ? error.message
              : "Unable to start Apple Pay payment.",
        });
        return;
      }

      const { clientSecret } = intent;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        { payment_method: event.paymentMethod.id },
        { handleActions: false },
      );

      if (error) {
        event.complete("fail");
        finalize({
          status: "failed",
          message: error.message || "Apple Pay payment failed.",
        });
        return;
      }

      event.complete("success");

      if (paymentIntent?.status === "requires_action") {
        const { error: actionError, paymentIntent: confirmed } =
          await stripe.confirmCardPayment(clientSecret);
        if (actionError) {
          finalize({
            status: "failed",
            message: actionError.message || "Authentication failed.",
          });
          return;
        }
        finalize({
          status: "succeeded",
          paymentIntentId: confirmed?.id ?? null,
        });
        return;
      }

      finalize({
        status: "succeeded",
        paymentIntentId: paymentIntent?.id ?? null,
      });
    });

    pr.on("cancel", () => {
      finalize({ status: "cancelled" });
    });

    pr.canMakePayment().then((result) => {
      if (!active) return;
      if (result && result.applePay) {
        prRef.current = pr;
        setIsAvailable(true);
      }
    });

    return () => {
      active = false;
      prRef.current = null;
      setIsAvailable(false);
    };
  }, [stripe, country, currency]);

  const present = useCallback(
    (fetchIntent: () => Promise<ApplePayIntent>): Promise<ApplePayResult> =>
      new Promise<ApplePayResult>((resolve) => {
        const pr = prRef.current;
        if (!pr) {
          resolve({ status: "unavailable" });
          return;
        }
        pendingRef.current = { fetchIntent, resolve, settled: false };
        try {
          pr.update({
            total: {
              label: labelRef.current,
              amount:
                amountRef.current > 0 ? amountRef.current : MIN_AMOUNT_CENTS,
            },
          });
        } catch {
          /* empty */
        }
        pr.show();
      }),
    [],
  );

  return { isAvailable, present };
};
