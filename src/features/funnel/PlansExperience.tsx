"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "@/app/plans/page.module.css";
import { trackAmplitudeEvent } from "@/lib/analytics/amplitude";
import { paymentsMode } from "@/lib/payments/client";
import { getSnapshotRoute, readSavedQuizResult } from "@/lib/funnel/quiz-result";
import {
  getPrivacyPlan,
  privacyPlans,
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
  const digits = value.replace(/\D/g, "").slice(0, 19);

  if (getCardBrand(digits) === "amex") {
    return [digits.slice(0, 4), digits.slice(4, 10), digits.slice(10, 15)]
      .filter(Boolean)
      .join(" ");
  }

  return digits.match(/.{1,4}/g)?.join(" ") ?? "";
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
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
    (brand === "discover" && digits.length >= 16 && digits.length <= 19) ||
    (brand === "visa" && [13, 16, 19].includes(digits.length));

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
  const [selectedPlanId, setSelectedPlanId] = useState<PrivacyPlanId>("plus");
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

  function completeCheckout() {
    try {
      saveSelectedPlan(sessionStorage, selectedPlanId);
    } catch {
      // The confirmation screen falls back to Plus when storage is unavailable.
    }

    router.push("/confirmation");
  }

  return (
    <div className={styles.plansPage}>
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
          <h1 id="plans-title">Make your next step a simple one.</h1>
          <p className={styles.introDescription}>
            Choose the guidance you need to turn better privacy habits into everyday
            actions.
          </p>
        </div>

        <ul className={styles.benefits}>
          <li>
            <span className={styles.benefitCheck} aria-hidden="true">✓</span>
            <span>A personal plan: know where to start</span>
          </li>
          <li>
            <span className={styles.benefitCheck} aria-hidden="true">✓</span>
            <span>Clear guidance, without the jargon</span>
          </li>
          <li>
            <span className={styles.benefitCheck} aria-hidden="true">✓</span>
            <span>Choose more support as you need it</span>
          </li>
        </ul>
      </section>

      <section className={styles.planPicker} aria-label="Choose your privacy plan">
        <div className={styles.planOptions} role="radiogroup" aria-label="Privacy plans">
          {privacyPlans.map((plan) => {
            const isSelected = selectedPlanId === plan.id;

            return (
              <label
                className={`${styles.planOption} ${
                  isSelected ? styles.planOptionSelected : ""
                }`}
                key={plan.id}
              >
                <input
                  checked={isSelected}
                  className={styles.planRadio}
                  data-amplitude-change-event={planSelectionEvents[plan.id]}
                  name="privacy-plan"
                  onChange={() => setSelectedPlanId(plan.id)}
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

        <p className={styles.billingNote}>
          All plans billed monthly. Cancel anytime.
          <br />
          Example prices for this design - final pricing to be confirmed.
        </p>
      </section>

      <section className={styles.guaranteeCard} aria-labelledby="guarantee-title">
        <Image
          alt="Money-back guarantee badge"
          className={styles.guaranteeBadge}
          height={173}
          src="/images/money-back-guarantee.svg"
          width={173}
        />
        <h2 id="guarantee-title">Money-back guarantee.</h2>
        <p>
          Choose your plan with confidence.
          <br />
          If it isn&apos;t the right fit, request a refund under our refund policy.
        </p>
        <a className={styles.textLink} href="#refund-policy">
          See how refunds work →
        </a>
      </section>

      <section className={styles.trustGrid} aria-label="Payment benefits">
        {trustItems.map((item) => (
          <div className={styles.trustItem} key={item.icon}>
            <Image alt="" height={42} src={item.icon} width={42} />
            <p>
              {item.lines[0]}
              <br />
              {item.lines[1]}
            </p>
          </div>
        ))}
      </section>

      <section className={styles.paymentSection} aria-labelledby="payment-title">
        <header className={styles.paymentHeader}>
          <h2 id="payment-title">Payment method</h2>
          <p>{paymentsMode === "stripe" ? "Secure checkout" : "Checkout preview"}</p>
        </header>

        {paymentsMode === "stripe" ? (
          <StripeSubscriptionCheckout plan={selectedPlan} />
        ) : (
          <>
            <button
              aria-label="Pay with Apple Pay — checkout preview"
              className={styles.applePayButton}
              data-amplitude-event="paywall_applepay_clicked"
              data-amplitude-plan-type={selectedPlanId}
              onClick={completeCheckout}
              type="button"
            >
              Pay with Apple Pay
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
                  completeCheckout();
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
                  maxLength={23}
                  name="card-number"
                  onBlur={() => markFieldAsTouched("cardNumber")}
                  onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
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
              <span>CVC</span>
              <input
                aria-describedby="cvc-error"
                aria-invalid={Boolean(showFieldError("cvc"))}
                autoComplete="cc-csc"
                inputMode="numeric"
                maxLength={4}
                name="cvc"
                onBlur={() => markFieldAsTouched("cvc")}
                onChange={(event) =>
                  setCvc(event.target.value.replace(/\D/g, "").slice(0, 4))
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

          <div className={styles.total} aria-live="polite">
            <p>Due today</p>
            <p>{price}</p>
          </div>

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
              {price} charged today, then monthly until cancelled.
              <br />
              Cancel before your next renewal in your account.
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
        <a className={styles.refundLink} href="#refund-policy">
          <span>Explore the refund policy</span>
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className={styles.footer}>
        <p>© VEIL, Inc. 2026 - All rights reserved.</p>
      </footer>
    </div>
  );
}
