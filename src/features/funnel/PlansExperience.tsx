"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

import styles from "@/app/plans/page.module.css";
import { trackAmplitudeEvent } from "@/lib/analytics/amplitude";
import { paymentsMode } from "@/lib/payments/client";
import { getSnapshotRoute, readSavedQuizResult } from "@/lib/funnel/quiz-result";
import {
  getPrivacyPlan,
  getPrivacyPlanAnalyticsType,
  privacyPlans,
  readSelectedPlan,
  type PrivacyPlanId,
  saveSelectedPlan,
} from "@/lib/funnel/privacy-plan";

import { StripeSubscriptionCheckout } from "./StripeSubscriptionCheckout";

type CardBrand = "amex" | "discover" | "mastercard" | "visa" | "unknown";
type CardField = "cardNumber" | "cardholderName" | "cvc" | "expiry";

const initialTouchedFields: Record<CardField, boolean> = {
  cardNumber: false,
  cardholderName: false,
  cvc: false,
  expiry: false,
};

function subscribeToBrowserState() {
  return () => undefined;
}

function readCheckoutRequested() {
  return new URLSearchParams(window.location.search).get("checkout") === "1";
}

function readSavedPlanFromBrowser(): PrivacyPlanId {
  try {
    return readSelectedPlan(sessionStorage);
  } catch {
    return "plus";
  }
}

const planSelectionEvents: Record<PrivacyPlanId, string> = {
  essential: "paywall_plan1_clicked",
  plus: "paywall_plan2_clicked",
  complete: "paywall_plan3_clicked",
};

const trustItems = [
  {
    icon: "/icons/secure-payment.svg",
    lines: ["Secure", "payment"],
  },
  {
    icon: "/icons/guarantee-shield.svg",
    lines: ["14-Day", "Guarantee"],
  },
  {
    icon: "/icons/cancel-anytime.svg",
    lines: ["Cancel", "anytime"],
  },
] as const;

const protectionItems = [
  {
    icon: "browser",
    title: "Recognise dangerous websites in time",
    description: "Receive warnings about suspicious pages before entering personal information.",
  },
  {
    icon: "shield",
    title: "Don’t let scammers trick you into giving away your data",
    description: "Spot fake websites designed to steal passwords and card information.",
  },
  {
    icon: "wifi",
    title: "More privacy on public Wi-Fi",
    description: "Protect your connection with a VPN — in cafes, hotels, or airports.",
  },
  {
    icon: "bell",
    title: "Find out if your data has been compromised",
    description: "Receive notifications to take timely action to protect your accounts.",
  },
  {
    icon: "privacy",
    title: "Less tracking of your activities",
    description: "Block trackers that collect information about your online activity.",
  },
  {
    icon: "link",
    title: "Check suspicious links",
    description: "Learn about potential threats before visiting an unfamiliar website.",
  },
] as const;

const availablePlans = privacyPlans.filter((plan) => plan.id !== "essential");

// The preview checkout never charges a card. These Stripe test numbers only
// reproduce the declined-payment UI until the real sandbox is connected.
const previewDeclinedCards = new Set([
  "4000000000000002",
  "4000000000009995",
  "4000000000009987",
  "4000000000009979",
  "4000000000000127",
  "4000000000000069",
  "4000000000000119",
  "4000000000000341",
]);

const privacyPolicyUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL?.trim();
const termsOfUseUrl = process.env.NEXT_PUBLIC_TERMS_OF_USE_URL?.trim();
const refundPolicyUrl = process.env.NEXT_PUBLIC_REFUND_POLICY_URL?.trim();

function PolicyLabel({ href, children }: Readonly<{ href?: string; children: ReactNode }>) {
  return href ? <a href={href}>{children}</a> : <span>{children}</span>;
}

function PlansFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerLinks}>
        <PolicyLabel href={privacyPolicyUrl}>Privacy Policy</PolicyLabel>
        {" & "}
        <PolicyLabel href={termsOfUseUrl}>Terms of Use</PolicyLabel>
      </p>
      <p>© Veylo, Inc. 2026 - All rights reserved.</p>
    </footer>
  );
}

function ProtectionIcon({ name }: Readonly<{ name: (typeof protectionItems)[number]["icon"] }>) {
  const paths = {
    browser: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 13h8M8 16h5" /></>,
    shield: <><path d="m12 2 8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
    wifi: <><path d="M2 8a16 16 0 0 1 20 0M5 11a11 11 0 0 1 14 0M8 14a6 6 0 0 1 8 0" /><circle cx="12" cy="18" r="1" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></>,
    privacy: <><path d="M3 3 21 21M10.5 5.2c.5-.1 1-.2 1.5-.2 5 0 9 4 10 7-1 1.7-2.5 3.3-4.3 4.5M6.5 6.5C4.5 7.7 3 9.6 2 12c1 3 5 7 10 7 1.2 0 2.3-.2 3.3-.6" /><path d="M9.2 9.2a4 4 0 0 0 5.6 5.6" /></>,
    link: <><path d="m10 13 4-4M8 16H6a4 4 0 0 1 0-8h4M14 8h4a4 4 0 0 1 0 8h-4" /></>,
  } as const;

  return (
    <span className={styles.protectionIcon} aria-hidden="true">
      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
        {paths[name]}
      </svg>
    </span>
  );
}

function getCardBrand(digits: string): CardBrand {
  if (/^3[47]/.test(digits)) {
    return "amex";
  }

  if (/^4/.test(digits)) {
    return "visa";
  }

  const firstFour = Number(digits.slice(0, 4));
  const firstSix = Number(digits.slice(0, 6));

  if (
    /^5[1-5]/.test(digits) ||
    (digits.length >= 4 && firstFour >= 2221 && firstFour <= 2720)
  ) {
    return "mastercard";
  }

  if (
    /^6011/.test(digits) ||
    /^65/.test(digits) ||
    /^64[4-9]/.test(digits) ||
    (digits.length >= 6 && firstSix >= 622126 && firstSix <= 622925)
  ) {
    return "discover";
  }

  return "unknown";
}

function formatCardNumber(value: string) {
  const enteredDigits = value.replace(/\D/g, "");
  const digits = enteredDigits.slice(0, getCardBrand(enteredDigits) === "amex" ? 15 : 16);

  if (getCardBrand(digits) === "amex") {
    return [digits.slice(0, 4), digits.slice(4, 10), digits.slice(10, 15)]
      .filter(Boolean)
      .join(" ");
  }

  return digits.match(/.{1,4}/g)?.join(" ") ?? "";
}

function formatExpiry(value: string) {
  const enteredDigits = value.replace(/\D/g, "");
  const digits = enteredDigits.length === 6 && /^(19|20)/.test(enteredDigits.slice(2))
    ? `${enteredDigits.slice(0, 2)}${enteredDigits.slice(-2)}`
    : enteredDigits.slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

function passesLuhnCheck(digits: string) {
  let sum = 0;
  let shouldDouble = false;

  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

function validateCardNumber(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "Enter your card number";
  }

  const brand = getCardBrand(digits);
  const validLength =
    (brand === "amex" && digits.length === 15) ||
    (brand === "mastercard" && digits.length === 16) ||
    (brand === "discover" && digits.length === 16) ||
    (brand === "visa" && digits.length === 16);

  if (brand === "unknown") {
    return "Use Visa, Mastercard, Discover or Amex";
  }

  if (!validLength || !passesLuhnCheck(digits)) {
    return "Enter a valid card number";
  }

  return "";
}

function validateExpiry(value: string) {
  if (!value) {
    return "Enter the expiry date";
  }

  const match = /^(\d{2})\/(\d{2})$/.exec(value);

  if (!match) {
    return "Use MM/YY format";
  }

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  if (month < 1 || month > 12) {
    return "Enter a valid month";
  }

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return "This card has expired";
  }

  if (year > currentYear + 20) {
    return "Check the expiry year";
  }

  return "";
}

function validateCvc(value: string, brand: CardBrand) {
  if (!value) {
    return "Enter the security code";
  }

  const requiredLength = brand === "amex" ? 4 : 3;

  if (value.length !== requiredLength) {
    return brand === "amex" ? "Use the 4-digit code" : "Use the 3-digit code";
  }

  return "";
}

function validateCardholderName(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "Enter the cardholder name";
  }

  if (!/^[\p{L} .'-]+$/u.test(trimmedValue) || trimmedValue.replace(/[^\p{L}]/gu, "").length < 2) {
    return "Use the name shown on the card";
  }

  return "";
}

function getPreviousSnapshotRoute() {
  try {
    const result = readSavedQuizResult(sessionStorage);
    return getSnapshotRoute(result?.severity ?? "green");
  } catch {
    return "/results/snapshot";
  }
}

export function PlansExperience() {
  const router = useRouter();
  const checkoutRequested = useSyncExternalStore(subscribeToBrowserState, readCheckoutRequested, () => false);
  const savedPlanId = useSyncExternalStore<PrivacyPlanId>(subscribeToBrowserState, readSavedPlanFromBrowser, () => "plus");
  const [selectedPlanOverride, setSelectedPlanOverride] = useState<PrivacyPlanId | null>(null);
  const [checkoutOverride, setCheckoutOverride] = useState<boolean | null>(null);
  const selectedPlanId = selectedPlanOverride ?? (checkoutRequested ? savedPlanId : "plus");
  const checkoutOpen = checkoutOverride ?? checkoutRequested;
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [touchedFields, setTouchedFields] = useState(initialTouchedFields);
  const hasTrackedCompletedCardForm = useRef(false);

  const selectedPlan = useMemo(
    () => getPrivacyPlan(selectedPlanId),
    [selectedPlanId],
  );
  const price = `$${selectedPlan.price.toFixed(2)}`;
  const cardBrand = getCardBrand(cardNumber.replace(/\D/g, ""));
  const fieldErrors = {
    cardNumber: validateCardNumber(cardNumber),
    cardholderName: validateCardholderName(cardholderName),
    cvc: validateCvc(cvc, cardBrand),
    expiry: validateExpiry(expiry),
  };
  const formIsComplete = Object.values(fieldErrors).every((error) => !error);

  useEffect(() => {
    if (
      paymentsMode === "preview" &&
      formIsComplete &&
      !hasTrackedCompletedCardForm.current
    ) {
      hasTrackedCompletedCardForm.current = true;
      trackAmplitudeEvent("checkout_form_completed");
    }
  }, [formIsComplete]);

  function markFieldAsTouched(field: CardField) {
    setTouchedFields((currentFields) => ({ ...currentFields, [field]: true }));
  }

  function showFieldError(field: CardField) {
    return touchedFields[field] && fieldErrors[field];
  }

  function handleBack() {
    router.push(getPreviousSnapshotRoute());
  }

  function openCheckout() {
    setCheckoutOverride(true);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function closeCheckout() {
    setCheckoutOverride(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function renderPlanPicker(group: "top" | "bottom") {
    return (
      <div
        className={styles.planOptions}
        role="radiogroup"
        aria-label={`${group === "top" ? "Top" : "Bottom"} privacy plans`}
      >
        {availablePlans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;

          return (
            <label
              className={`${styles.planOption} ${isSelected ? styles.planOptionSelected : ""}`}
              key={plan.id}
            >
              <input
                checked={isSelected}
                className={styles.planRadio}
                data-amplitude-change-event={planSelectionEvents[plan.id]}
                name={`privacy-plan-${group}`}
                onChange={() => setSelectedPlanOverride(plan.id)}
                type="radio"
                value={plan.id}
              />
              <span className={styles.radioMark} aria-hidden="true" />
              <span className={styles.planCopy}>
                <span className={styles.planTitleLine}>
                  <span className={styles.planName}>{plan.name}</span>
                  {"recommended" in plan ? (
                    <span className={styles.recommended}>Recommended</span>
                  ) : null}
                </span>
                <span className={styles.planDescription}>{plan.description}</span>
              </span>
              <span className={styles.planPrice}>
                ${plan.price.toFixed(2)} <span>/mo</span>
              </span>
            </label>
          );
        })}
      </div>
    );
  }

  function renderContinueAction() {
    return (
      <div className={styles.continueAction}>
        <button className={styles.continueButton} onClick={openCheckout} type="button">
          Continue with {price}
        </button>
        <p>Billed monthly. Renews automatically until cancelled.</p>
      </div>
    );
  }

  function completeCheckout(previewStatus: "active" | "failed" = "active") {
    try {
      saveSelectedPlan(sessionStorage, selectedPlanId);
    } catch {
      // The confirmation screen falls back to Plus when storage is unavailable.
    }

    router.push(
      previewStatus === "failed" ? "/confirmation?preview_status=failed" : "/confirmation",
    );
  }

  return (
    <div className={styles.plansPage}>
      {!checkoutOpen ? (
        <>
          <button
            className={styles.backButton}
            data-amplitude-event="quiz_back_button_clicked"
            data-amplitude-screen-name="paywall"
            onClick={handleBack}
            type="button"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
              <path
                d="m9.75 3.5-4.5 4.5 4.5 4.5M5.5 8h7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
            Back
          </button>

          <section className={styles.intro} aria-labelledby="plans-title">
            <div className={styles.introCopy}>
              <p className={styles.eyebrow}>From knowing to doing</p>
              <h1 id="plans-title">Your next step to better privacy</h1>
              <p className={styles.introDescription}>
                Your results show where to start. Choose the guidance that helps you take action.
              </p>
            </div>

            <ul className={styles.benefits}>
              <li><span className={styles.benefitCheck} aria-hidden="true">✓</span>Focus on the habits that may expose you</li>
              <li><span className={styles.benefitCheck} aria-hidden="true">✓</span>Follow simple steps to reduce avoidable risks</li>
              <li><span className={styles.benefitCheck} aria-hidden="true">✓</span>Make progress without technical jargon</li>
            </ul>
          </section>

          <section className={styles.planPicker} aria-label="Choose your privacy plan">
            {renderPlanPicker("top")}
            {renderContinueAction()}
          </section>

          <section className={styles.guaranteeCard} aria-labelledby="guarantee-title">
            <Image
              alt="Money-back guarantee badge"
              className={styles.guaranteeBadge}
              height={173}
              src="/images/money-back-guarantee.svg"
              width={173}
            />
            <h2 id="guarantee-title">14-day money-back guarantee</h2>
            <p>
              If the plan isn&apos;t right for you, you can request a refund within 14 days
              of purchase, subject to our refund policy.
            </p>
            {refundPolicyUrl ? (
              <a className={styles.textLink} href={refundPolicyUrl}>View refund policy →</a>
            ) : (
              <span className={styles.textLink}>View refund policy →</span>
            )}
          </section>

          <section className={styles.trustGrid} aria-label="Payment benefits">
            {trustItems.map((item) => (
              <div className={styles.trustItem} key={item.icon}>
                <Image alt="" height={42} src={item.icon} width={42} />
                <p>{item.lines[0]}<br />{item.lines[1]}</p>
              </div>
            ))}
          </section>

          <section className={styles.protectionSection} aria-labelledby="protection-title">
            <h2 id="protection-title">Your privacy is under additional protection</h2>
            <p>Find out what needs attention based on the test results and how the app can help protect your data.</p>
            <ul>
              {protectionItems.map((item) => (
                <li key={item.title}>
                  <ProtectionIcon name={item.icon} />
                  <span><strong>{item.title}</strong><span>{item.description}</span></span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.planPicker} aria-label="Choose your privacy plan again">
            {renderPlanPicker("bottom")}
            {renderContinueAction()}
          </section>
        </>
      ) : (
        <>
      <section className={styles.paymentSection} aria-labelledby="payment-title">
        <header className={styles.paymentHeader}>
          <h2 id="payment-title">Payment method</h2>
          <button aria-label="Close payment method" className={styles.closeButton} onClick={closeCheckout} type="button">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>
          </button>
        </header>

        <div className={styles.dueCard} aria-live="polite">
          <div><span>Due today:</span><strong>{price}</strong></div>
          <p>{price} — Monthly subscription.</p>
        </div>

        {paymentsMode === "stripe" ? (
          <StripeSubscriptionCheckout plan={selectedPlan} />
        ) : (
          <>
            <button
              aria-label="Pay with Apple Pay — checkout preview"
              className={styles.applePayButton}
              data-amplitude-event="paywall_applepay_clicked"
              data-amplitude-plan-type={getPrivacyPlanAnalyticsType(selectedPlanId)}
              onClick={() => completeCheckout()}
              type="button"
            >
              <svg aria-hidden="true" className={styles.appleLogo} viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 12.6c0-2.1 1.7-3.1 1.8-3.2-.9-1.4-2.3-1.6-2.8-1.6-1.2-.1-2.3.7-2.9.7-.6 0-1.5-.7-2.5-.7-1.3 0-2.6.8-3.3 1.9-1.4 2.5-.4 6.1 1 8 .7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.6-.7 1.1 0 1.5.7 2.6.7 1.1 0 1.8-1 2.5-2  .7-1 1-1.9 1-2-.1 0-2.6-1-2.6-3.2ZM15.9 6.4c.6-.7 1-1.6.9-2.5-.9 0-1.9.6-2.5 1.2-.6.7-1 1.5-.9 2.4.9.1 1.9-.5 2.5-1.1Z" /></svg>
              Pay with Apple Pay
            </button>

            <button
              aria-label="Pay with PayPal — checkout preview"
              className={styles.paypalButton}
              onClick={() => completeCheckout()}
              type="button"
            >
              <strong>PayPal</strong>
            </button>

            <div className={styles.divider}>
              <span>or pay with card</span>
            </div>

            <Image
              alt="Accepted cards: Visa, Mastercard, Discover and American Express"
              className={styles.paymentMethods}
              height={35}
              src="/images/payment-methods.svg"
              width={269}
            />

            <form
              className={styles.paymentForm}
              onSubmit={(event) => {
                event.preventDefault();

                if (formIsComplete) {
                  const digits = cardNumber.replace(/\D/g, "");
                  completeCheckout(previewDeclinedCards.has(digits) ? "failed" : "active");
                }
              }}
            >
          <div className={`${styles.cardFields} amp-block`}>
            <label
              className={`${styles.field} ${styles.fieldFull} ${
                showFieldError("cardNumber") ? styles.fieldInvalid : ""
              }`}
            >
              <span>Card number</span>
              <span className={styles.cardNumberWrap}>
                <input
                  aria-describedby="card-number-error"
                  aria-invalid={Boolean(showFieldError("cardNumber"))}
                  autoComplete="cc-number"
                  inputMode="numeric"
                  maxLength={cardBrand === "amex" ? 17 : 19}
                  name="card-number"
                  onBlur={() => markFieldAsTouched("cardNumber")}
                  onChange={(event) => {
                    const formattedNumber = formatCardNumber(event.target.value);
                    setCardNumber(formattedNumber);
                    if (getCardBrand(formattedNumber.replace(/\D/g, "")) !== "amex") {
                      setCvc((current) => current.slice(0, 3));
                    }
                  }}
                  placeholder="4232 4232 4321 4323"
                  required
                  value={cardNumber}
                />
                <span className={styles.cardGlyph} aria-hidden="true" />
              </span>
              {showFieldError("cardNumber") ? (
                <span className={styles.fieldError} id="card-number-error" role="alert">
                  {fieldErrors.cardNumber}
                </span>
              ) : null}
            </label>

            <label
              className={`${styles.field} ${
                showFieldError("expiry") ? styles.fieldInvalid : ""
              }`}
            >
              <span>Expiry date</span>
              <input
                aria-describedby="expiry-error"
                aria-invalid={Boolean(showFieldError("expiry"))}
                autoComplete="cc-exp"
                inputMode="numeric"
                maxLength={5}
                name="expiry"
                onBlur={() => markFieldAsTouched("expiry")}
                onChange={(event) => setExpiry(formatExpiry(event.target.value))}
                placeholder="MM/YY"
                required
                value={expiry}
              />
              {showFieldError("expiry") ? (
                <span className={styles.fieldError} id="expiry-error" role="alert">
                  {fieldErrors.expiry}
                </span>
              ) : null}
            </label>

            <label
              className={`${styles.field} ${
                showFieldError("cvc") ? styles.fieldInvalid : ""
              }`}
            >
              <span>Security code</span>
              <input
                aria-describedby="cvc-error"
                aria-invalid={Boolean(showFieldError("cvc"))}
                autoComplete="cc-csc"
                inputMode="numeric"
                maxLength={cardBrand === "amex" ? 4 : 3}
                name="cvc"
                onBlur={() => markFieldAsTouched("cvc")}
                onChange={(event) =>
                  setCvc(event.target.value.replace(/\D/g, "").slice(0, cardBrand === "amex" ? 4 : 3))
                }
                placeholder="CVC"
                required
                value={cvc}
              />
              {showFieldError("cvc") ? (
                <span className={styles.fieldError} id="cvc-error" role="alert">
                  {fieldErrors.cvc}
                </span>
              ) : null}
            </label>

            <label
              className={`${styles.field} ${styles.fieldFull} ${
                showFieldError("cardholderName") ? styles.fieldInvalid : ""
              }`}
            >
              <span>Cardholder name</span>
              <input
                aria-describedby="cardholder-name-error"
                aria-invalid={Boolean(showFieldError("cardholderName"))}
                autoComplete="cc-name"
                name="cardholder-name"
                onBlur={() => markFieldAsTouched("cardholderName")}
                onChange={(event) => setCardholderName(event.target.value)}
                placeholder="Cardholder name*"
                required
                value={cardholderName}
              />
              {showFieldError("cardholderName") ? (
                <span
                  className={styles.fieldError}
                  id="cardholder-name-error"
                  role="alert"
                >
                  {fieldErrors.cardholderName}
                </span>
              ) : null}
            </label>
          </div>

          <p className={styles.paymentLegal}>
            By continuing, you agree to our <PolicyLabel href={termsOfUseUrl}>Terms of Service</PolicyLabel>,
            {" "}<PolicyLabel href={privacyPolicyUrl}>Privacy Policy</PolicyLabel> and{" "}
            <PolicyLabel href={refundPolicyUrl}>Refund Policy</PolicyLabel>.
          </p>
          <div className={styles.checkoutAction}>
            <button
              className={styles.subscribeButton}
              data-amplitude-event="payment_button_clicked"
              disabled={!formIsComplete}
              type="submit"
            >
              Subscribe for {price} / month
            </button>
            <p>
              You&apos;ll be charged {price} today and {price} each month until you cancel.
              You can cancel future renewals according to the subscription terms.
            </p>
          </div>
            </form>
          </>
        )}
      </section>

      <section className={styles.reassuranceCard} id="refund-policy">
        <div className={styles.reassuranceHeader}>
          <Image alt="" height={24} src="/icons/shield-check-light.svg" width={24} />
          <div>
            <p className={styles.reassuranceEyebrow}>A little extra reassurance</p>
            <h3>Money-back guarantee</h3>
          </div>
        </div>
        <p>
          Your plan should feel right for you. If it doesn&apos;t, you can request a
          refund under our refund policy.
        </p>
        {refundPolicyUrl ? (
          <a className={styles.refundLink} href={refundPolicyUrl}>
            <span>Explore the refund policy</span><span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className={styles.refundLink}>
            <span>Explore the refund policy</span><span aria-hidden="true">↗</span>
          </span>
        )}
      </section>
        </>
      )}

      <PlansFooter />
    </div>
  );
}
