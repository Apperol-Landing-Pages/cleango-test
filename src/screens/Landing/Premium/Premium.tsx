"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import cx from "clsx";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  loadStripe,
  type StripeCardCvcElementChangeEvent,
  type StripeCardExpiryElementChangeEvent,
  type StripeCardNumberElementChangeEvent,
  type StripeCardCvcElement,
  type StripeCardExpiryElement,
  type StripeCardNumberElement,
} from "@stripe/stripe-js";

import { createTopupIntent } from "@/api/wallet";
import { useApplePayRequest } from "@/utils/useApplePayRequest";
import { ROUTER_ENDPOINTS } from "@/utils/constants";
import LandingHeader from "../shared/LandingHeader/LandingHeader";
import LandingFooter from "../shared/LandingFooter/LandingFooter";
import s from "./Premium.module.scss";

type Plan = {
  id: string;
  price: string;
  period: string;
  cents: number;
  packageSlug: string;
};

const PLANS: Plan[] = [
  {
    id: "trial",
    price: "$0.99",
    period: "week",
    cents: 99,
    packageSlug: "trial",
  },
  {
    id: "week",
    price: "$4.99",
    period: "7 days",
    cents: 499,
    packageSlug: "week",
  },
  {
    id: "month",
    price: "$19.99",
    period: "1 month",
    cents: 1999,
    packageSlug: "month",
  },
  {
    id: "quarter",
    price: "$49.99",
    period: "3 months",
    cents: 4999,
    packageSlug: "3-months",
  },
  {
    id: "half-year",
    price: "$99.99",
    period: "6 months",
    cents: 9999,
    packageSlug: "6-months",
  },
];
const PRICE = "$0.99/week";
const PRICE_SUB = "then $39.99/month";
const FEATURES = [
  "Real-Time Threat Detection",
  "Advanced Privacy Protection",
  "Premium Security Tools",
  "Complete phone security",
] as const;

const cardElementOptions = {
  style: {
    base: {
      color: "#FFFFFF",
      fontSize: "16px",
      fontWeight: "400",
      "::placeholder": {
        color: "#7c879e",
      },
    },
    invalid: {
      color: "#FF7979",
    },
  },
};

const TrustBadge = () => (
  <Image
    src="/landing/trust-badge.svg"
    alt="Trusted by 100,000+"
    width={147}
    height={61}
    className={s.trustBadge}
    priority
  />
);

const AvatarGroup = () => (
  <Image
    src="/landing/avatars.png"
    alt=""
    width={72}
    height={36}
    className={s.avatars}
    aria-hidden
  />
);

const FeatureCheck = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="10" r="9" stroke="#4c6bff" strokeWidth="1.5" />
    <path
      d="M6 10.2l2.6 2.6L14 7.4"
      stroke="#4c6bff"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SecureBadge = () => (
  <p className={s.secureBadge}>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 1.5l6 2.2v4.6c0 4-2.6 6.9-6 8.2-3.4-1.3-6-4.2-6-8.2V3.7L9 1.5z"
        fill="#22c55e"
      />
      <path
        d="M6.2 9l2 2L12 7"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    100% Private &amp; Secure
  </p>
);

const SuccessModal = () => (
  <div
    className={s.modalOverlay}
    role="dialog"
    aria-modal="true"
    aria-label="Payment successful"
  >
    <div className={s.modalCard}>
      <span className={s.modalBadge} aria-hidden>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12.5l4 4L19 7"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h2 className={s.modalTitle}>Payment successful!</h2>
      <p className={s.modalText}>
        Welcome to SafeHub Premium. Your device is now protected to the fullest.
      </p>
      <Link href={ROUTER_ENDPOINTS.LANDING_DOWNLOAD} className={s.modalBtn}>
        Continue
      </Link>
    </div>
  </div>
);

const GetPremiumSection = ({
  plan,
  showAllPlans,
  onToggleShowAllPlans,
  onSelectPlan,
}: {
  plan: Plan;
  showAllPlans: boolean;
  onToggleShowAllPlans: () => void;
  onSelectPlan: (id: string) => void;
}) => (
  <section className={s.premiumSection}>
    <TrustBadge />

    <h1 className={s.premiumTitle}>
      Get Premium
      <AvatarGroup />
    </h1>
    <p className={s.premiumSubtitle}>
      Unlock all the features of the premium plan and
      <br />
      protect your device to the fullest!
    </p>

    <div
      className={s.priceCard}
      role="button"
      tabIndex={0}
      onClick={() => onSelectPlan(PLANS[0].id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectPlan(PLANS[0].id);
        }
      }}
    >
      <span
        className={cx(s.radio, plan.id === PLANS[0].id && s.radioChecked)}
        aria-hidden
      />
      <div>
        <p className={s.price}>{PRICE}</p>
        <p className={s.priceSub}>{PRICE_SUB}</p>
      </div>
      <div className={s.priceDivider} />
      <p className={s.featuredLabel}>Featured:</p>
      <ul className={s.featureList}>
        {FEATURES.map((feature) => (
          <li key={feature} className={s.featureItem}>
            <FeatureCheck />
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={s.showPlansBtn}
        onClick={(e) => {
          e.stopPropagation();
          onToggleShowAllPlans();
        }}
      >
        {showAllPlans ? "Hide plans" : "Show one-time plans"}
      </button>

      {showAllPlans && (
        <ul className={s.plansList}>
          {PLANS.filter((p) => p.id !== PLANS[0].id).map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className={s.planOption}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPlan(p.id);
                }}
              >
                <span className={s.planOptionPrice}>
                  <span
                    className={cx(s.radio, p.id === plan.id && s.radioChecked)}
                    aria-hidden
                  />
                  {p.price}
                </span>
                <span>{p.period}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>

    <a href="#checkout" className={s.primaryBtn}>
      Continue
    </a>
    <SecureBadge />
  </section>
);

const CheckoutForm = ({ plan }: { plan: Plan }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isApplePayLoading, setIsApplePayLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });
  const [isComplete, setIsComplete] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });
  const [fields, setFields] = useState<{
    number: StripeCardNumberElement | null;
    expiry: StripeCardExpiryElement | null;
    cvc: StripeCardCvcElement | null;
  }>({ number: null, expiry: null, cvc: null });

  const applePay = useApplePayRequest({
    stripe,
    label: "",
    amountCents: plan.cents,
  });

  const runApplePay = useCallback(() => {
    if (isApplePayLoading) return;
    if (!applePay.isAvailable) {
      setErrorMessage("Apple Pay is not available on this device.");
      return;
    }
    setIsApplePayLoading(true);
    setErrorMessage("");

    applePay
      .present(async () => {
        const intent = await createTopupIntent({
          package_slug: plan.packageSlug,
        });
        return { clientSecret: intent.client_secret };
      })
      .then((result) => {
        if (result.status === "unavailable") {
          setErrorMessage("Apple Pay is not available on this device.");
          setIsApplePayLoading(false);
          return;
        }
        if (result.status === "cancelled") {
          setIsApplePayLoading(false);
          return;
        }
        if (result.status === "failed") {
          setErrorMessage(result.message);
          setIsApplePayLoading(false);
          return;
        }

        setIsPaid(true);
        setIsApplePayLoading(false);
      })
      .catch((err) => {
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "Apple Pay failed. Please try again.",
        );
        setIsApplePayLoading(false);
      });
  }, [applePay, isApplePayLoading, plan.packageSlug]);

  const clearError = () => {
    if (errorMessage) setErrorMessage("");
  };

  const onNumberChange = (e: StripeCardNumberElementChangeEvent) => {
    setFieldErrors((prev) => ({ ...prev, number: e.error?.message || "" }));
    setIsComplete((prev) => ({ ...prev, number: e.complete }));
    if (e.error?.message) setErrorMessage(e.error.message);
    else clearError();
  };

  const onExpiryChange = (e: StripeCardExpiryElementChangeEvent) => {
    setFieldErrors((prev) => ({ ...prev, expiry: e.error?.message || "" }));
    setIsComplete((prev) => ({ ...prev, expiry: e.complete }));
    if (e.error?.message) setErrorMessage(e.error.message);
    else clearError();
  };

  const onCvcChange = (e: StripeCardCvcElementChangeEvent) => {
    setFieldErrors((prev) => ({ ...prev, cvc: e.error?.message || "" }));
    setIsComplete((prev) => ({ ...prev, cvc: e.complete }));
    if (e.error?.message) setErrorMessage(e.error.message);
    else clearError();
  };

  const handleConfirm = async () => {
    if (!stripe || !elements || isProcessing) return;

    const nextErrors = {
      number: isComplete.number ? "" : "Card number is incomplete.",
      expiry: isComplete.expiry ? "" : "Expiry date is incomplete.",
      cvc: isComplete.cvc ? "" : "CVC is incomplete.",
    };

    if (nextErrors.number || nextErrors.expiry || nextErrors.cvc) {
      setFieldErrors(nextErrors);
      if (nextErrors.number) fields.number?.focus();
      else if (nextErrors.expiry) fields.expiry?.focus();
      else if (nextErrors.cvc) fields.cvc?.focus();
      setErrorMessage("Please complete all card fields.");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      setErrorMessage("Card field is not ready.");
      return;
    }

    setErrorMessage("");
    setIsProcessing(true);

    try {
      const intent = await createTopupIntent({
        package_slug: plan.packageSlug,
      });

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        intent.client_secret,
        { payment_method: { card: cardNumberElement } },
      );

      if (error) {
        setErrorMessage(error.message || "Payment failed. Please try again.");
        return;
      }

      if (
        !paymentIntent ||
        (paymentIntent.status !== "succeeded" &&
          paymentIntent.status !== "requires_capture")
      ) {
        setErrorMessage("Payment is not completed yet.");
        return;
      }

      setIsPaid(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to process payment. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className={s.checkout} id="checkout">
      <h2 className={s.checkoutTitle}>Payment Checkout</h2>

      <div className={s.checkoutCard}>
        {applePay.isAvailable && (
          <>
            <button
              type="button"
              className={s.applePayBtn}
              onClick={runApplePay}
              disabled={isApplePayLoading || isProcessing}
            >
              {isApplePayLoading ? (
                "Processing..."
              ) : (
                <>
                  <svg
                    width="18"
                    height="22"
                    viewBox="0 0 18 22"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M14.97 11.388c-.02-2.376 1.94-3.522 2.027-3.578-1.106-1.617-2.824-1.838-3.435-1.862-1.464-.148-2.868.864-3.613.864-.744 0-1.887-.845-3.103-.822-1.593.023-3.066.928-3.884 2.355C1.113 10.97 2.27 15.5 4.09 18.04c.906 1.293 1.98 2.745 3.393 2.693 1.366-.054 1.882-.876 3.534-.876 1.651 0 2.12.876 3.563.848 1.467-.024 2.4-1.318 3.298-2.617.044-.063 1.043-1.5 1.621-3.7h-.002c-1.436-.555-2.51-1.98-2.527-3.999ZM12.51 4.207C13.274 3.28 13.8 2.003 13.65.7c-1.113.047-2.46.742-3.253 1.67-.714.822-1.34 2.135-1.172 3.392 1.24.096 2.51-.63 3.285-1.556Z"
                      fill="white"
                    />
                  </svg>
                  Pay
                </>
              )}
            </button>
            <div className={s.divider}>
              <span>or pay with card</span>
            </div>
          </>
        )}

        <div className={s.fieldGroup}>
          <label className={s.label}>Card Number</label>
          <div
            className={cx(s.field, fieldErrors.number && s.fieldInvalid)}
            role="button"
            tabIndex={0}
            onClick={() => fields.number?.focus()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fields.number?.focus();
              }
            }}
          >
            <CardNumberElement
              options={{
                ...cardElementOptions,
                placeholder: "1234 5678 1234 5678",
              }}
              onChange={onNumberChange}
              onReady={(el) => setFields((prev) => ({ ...prev, number: el }))}
            />
          </div>
        </div>

        <div className={s.fieldGroup}>
          <label className={s.label}>Expiry date</label>
          <div
            className={cx(s.field, fieldErrors.expiry && s.fieldInvalid)}
            role="button"
            tabIndex={0}
            onClick={() => fields.expiry?.focus()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fields.expiry?.focus();
              }
            }}
          >
            <CardExpiryElement
              options={{ ...cardElementOptions, placeholder: "MM/YY" }}
              onChange={onExpiryChange}
              onReady={(el) => setFields((prev) => ({ ...prev, expiry: el }))}
            />
          </div>
        </div>

        <div className={s.fieldGroup}>
          <label className={s.label}>CVC</label>
          <div
            className={cx(s.field, fieldErrors.cvc && s.fieldInvalid)}
            role="button"
            tabIndex={0}
            onClick={() => fields.cvc?.focus()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fields.cvc?.focus();
              }
            }}
          >
            <CardCvcElement
              options={{ ...cardElementOptions, placeholder: "CVC" }}
              onChange={onCvcChange}
              onReady={(el) => setFields((prev) => ({ ...prev, cvc: el }))}
            />
          </div>
        </div>

        {errorMessage ? <p className={s.error}>{errorMessage}</p> : null}

        <button
          type="button"
          className={s.confirmBtn}
          onClick={handleConfirm}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Confirm"}
        </button>

        <SecureBadge />
      </div>

      {isPaid && <SuccessModal />}
    </section>
  );
};

const MoneyBackSection = () => (
  <section className={s.moneyBack}>
    <h3 className={s.moneyBackTitle}>100% Money-Back Guarantee</h3>
    <p className={s.moneyBackText}>
      SafeHub is trusted by thousands of users worldwide to protect their
      devices and personal data — every single day. If you run into any
      technical issues that prevent the app from working as expected,
      we&rsquo;ll make it right. That includes a full refund, no questions
      asked.
    </p>
  </section>
);

const Premium = () => {
  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  const [planId, setPlanId] = useState(PLANS[0].id);
  const [showAllPlans, setShowAllPlans] = useState(false);
  const plan = useMemo(
    () => PLANS.find((p) => p.id === planId) ?? PLANS[0],
    [planId],
  );

  const options = useMemo(
    () => ({ appearance: { theme: "night" as const }, locale: "en" as const }),
    [],
  );
  const stripePromise = useMemo(
    () =>
      stripePublishableKey
        ? loadStripe(stripePublishableKey, { locale: "en" })
        : null,
    [stripePublishableKey],
  );

  return (
    <div className={s.page}>
      <LandingHeader logoHref={ROUTER_ENDPOINTS.LANDING} />

      <main className={s.main}>
        <GetPremiumSection
          plan={plan}
          showAllPlans={showAllPlans}
          onToggleShowAllPlans={() => setShowAllPlans((v) => !v)}
          onSelectPlan={setPlanId}
        />

        {stripePromise ? (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm plan={plan} />
          </Elements>
        ) : (
          <section className={s.checkout} id="checkout">
            <h2 className={s.checkoutTitle}>Payment Checkout</h2>
            <p className={s.error}>
              Payment is temporarily unavailable. Please try again later.
            </p>
          </section>
        )}

        <MoneyBackSection />
      </main>

      <LandingFooter />
    </div>
  );
};

export default Premium;
