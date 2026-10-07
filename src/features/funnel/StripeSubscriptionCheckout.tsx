"use client";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, type Appearance, type StripeElementsOptions } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";

import styles from "@/app/plans/page.module.css";
import { trackAmplitudeEvent } from "@/lib/analytics/amplitude";
import {
  createSubscriptionSession,
  type PlanId,
} from "@/lib/payments/client";
import { saveSelectedPlan } from "@/lib/funnel/privacy-plan";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

const appearance: Appearance = {
  labels: "above",
  theme: "stripe",
  variables: {
    borderRadius: "12px",
    colorBackground: "#ffffff",
    colorDanger: "#c9362b",
    colorPrimary: "#3478e5",
    colorText: "#202124",
    colorTextPlaceholder: "#b5b7bb",
    fontFamily:
      'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSizeBase: "16px",
    spacingGridRow: "16px",
  },
  rules: {
    ".Input": {
      border: "1px solid #cfd3d1",
      boxShadow: "none",
      minHeight: "52px",
      padding: "14px 16px",
    },
    ".Input:focus": {
      borderColor: "#3478e5",
      boxShadow: "0 0 0 3px rgba(52, 120, 229, 0.18)",
    },
    ".Input--invalid": {
      backgroundColor: "#fffafa",
      borderColor: "#df4d43",
      boxShadow: "0 0 0 3px rgba(223, 77, 67, 0.12)",
    },
    ".Label": {
      color: "#5f6267",
      fontSize: "12px",
      fontWeight: "500",
    },
  },
};

type StripeSubscriptionCheckoutProps = Readonly<{
  plan: {
    id: PlanId;
    name: string;
    price: number;
  };
}>;

function CheckoutForm({ plan }: StripeSubscriptionCheckoutProps) {
  const elements = useElements();
  const router = useRouter();
  const stripe = useStripe();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasTrackedCompletedCardForm = useRef(false);
  const price = `$${plan.price.toFixed(2)}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!elements || !stripe || isSubmitting) {
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const { error: validationError } = await elements.submit();

      if (validationError) {
        setErrorMessage(validationError.message ?? "Check your payment details.");
        return;
      }

      if (!hasTrackedCompletedCardForm.current) {
        hasTrackedCompletedCardForm.current = true;
        trackAmplitudeEvent("checkout_form_completed");
      }

      const leadId = sessionStorage.getItem("security-white.lead-id");

      if (!leadId) {
        throw new Error("Your checkout session expired. Enter your email again.");
      }

      const session = await createSubscriptionSession({
        leadId,
        planId: plan.id,
      });

      saveSelectedPlan(sessionStorage, plan.id);
      sessionStorage.setItem("security-white.payment-id", session.paymentId);

      const returnUrl = new URL("/confirmation", window.location.origin);
      returnUrl.searchParams.set("payment_id", session.paymentId);

      const { error } = await stripe.confirmPayment({
        clientSecret: session.clientSecret,
        confirmParams: { return_url: returnUrl.toString() },
        elements,
        redirect: "if_required",
      });

      if (error) {
        trackAmplitudeEvent("payment_failed");
        setErrorMessage(error.message ?? "Payment could not be completed.");
        return;
      }

      router.push(`/confirmation?payment_id=${encodeURIComponent(session.paymentId)}`);
    } catch (error) {
      trackAmplitudeEvent("payment_failed");
      setErrorMessage(
        error instanceof Error ? error.message : "Payment could not be completed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.paymentForm} onSubmit={handleSubmit}>
      <div className={`${styles.stripeElement} amp-block`}>
        <PaymentElement
          options={{
            business: { name: "VEIL" },
            layout: "tabs",
          }}
        />
      </div>

      {errorMessage ? (
        <p className={styles.checkoutError} role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className={styles.total} aria-live="polite">
        <p>Due today</p>
        <p>{price}</p>
      </div>

      <div className={styles.checkoutAction}>
        <button
          className={styles.subscribeButton}
          data-amplitude-event="payment_button_clicked"
          disabled={!elements || !stripe || isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Processing securely…" : `Subscribe for ${price} / month`}
        </button>
        <p>
          {price} charged today, then monthly until cancelled.
          <br />
          Cancel before your next renewal in your account.
        </p>
      </div>
    </form>
  );
}

export function StripeSubscriptionCheckout({
  plan,
}: StripeSubscriptionCheckoutProps) {
  const options = useMemo<StripeElementsOptions>(
    () => ({
      amount: Math.round(plan.price * 100),
      appearance,
      currency: "usd",
      mode: "subscription",
    }),
    [plan.price],
  );

  if (!stripePromise) {
    return (
      <p className={styles.checkoutError} role="alert">
        Stripe publishable key is not configured.
      </p>
    );
  }

  return (
    <Elements key={plan.id} options={options} stripe={stripePromise}>
      <CheckoutForm plan={plan} />
    </Elements>
  );
}
