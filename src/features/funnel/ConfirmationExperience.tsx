"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import styles from "@/app/confirmation/page.module.css";
import { trackAmplitudeEvent } from "@/lib/analytics/amplitude";
import { getPrivacyPlan, getPrivacyPlanAnalyticsType, readSelectedPlan, type PrivacyPlanId } from "@/lib/funnel/privacy-plan";
import { trackMetaPurchase } from "@/lib/marketing/meta-pixel";
import { getSubscriptionStatus, paymentsMode, type PaymentStatus } from "@/lib/payments/client";

const privacyPolicyUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL?.trim();
const termsOfUseUrl = process.env.NEXT_PUBLIC_TERMS_OF_USE_URL?.trim();
const appDownloadUrl = process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL?.trim();
const usesLiveStripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_live_");

const benefits = [
  { icon: "shield", text: "Discover more ways to protect your personal information." },
  { icon: "list", text: "Follow simple steps to improve your account security." },
  { icon: "check", text: "Build safer online habits with easy-to-use guidance." },
] as const;

function subscribeToPlan() {
  return () => undefined;
}

function readPlanFromBrowser(): PrivacyPlanId {
  try {
    return readSelectedPlan(sessionStorage);
  } catch {
    return "plus";
  }
}

function readPreviewStatus(): PaymentStatus {
  const scenario = new URLSearchParams(window.location.search).get("preview_status");
  return scenario === "failed" || scenario === "canceled" ? scenario : "active";
}

function readPaymentErrorHint() {
  return new URLSearchParams(window.location.search).get("payment_error") === "failed";
}

function BenefitIcon({ name }: Readonly<{ name: (typeof benefits)[number]["icon"] }>) {
  return (
    <span className={styles.benefitIcon} aria-hidden="true">
      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
        {name === "shield" ? (
          <><path d="m12 2 8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>
        ) : name === "list" ? (
          <><path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6h.01M4 12h.01M4 18h.01" /></>
        ) : (
          <path d="m4 12 5 5L20 6" />
        )}
      </svg>
    </span>
  );
}

export function ConfirmationExperience() {
  const router = useRouter();
  const hasTrackedPaymentOutcome = useRef(false);
  const retryButtonRef = useRef<HTMLButtonElement>(null);
  const [confirmedPlanId, setConfirmedPlanId] = useState<PrivacyPlanId | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("pending");
  const [outcomeConfirmed, setOutcomeConfirmed] = useState(false);
  const [verificationUnavailable, setVerificationUnavailable] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState("");
  const [paymentDetails, setPaymentDetails] = useState<{
    amount?: number;
    currency?: string;
    paymentId: string;
  } | null>(null);
  const selectedPlanId = useSyncExternalStore<PrivacyPlanId>(
    subscribeToPlan,
    readPlanFromBrowser,
    () => "plus",
  );
  const previewStatus = useSyncExternalStore(subscribeToPlan, readPreviewStatus, () => "active");
  const paymentErrorFromUrl = useSyncExternalStore(subscribeToPlan, readPaymentErrorHint, () => false);
  const currentPlanId = confirmedPlanId ?? selectedPlanId;
  const effectiveStatus = paymentsMode === "preview" ? previewStatus : paymentStatus;
  const isActive = effectiveStatus === "active";
  const paymentFailed = effectiveStatus === "failed" || effectiveStatus === "canceled";
  const paymentErrorHint = paymentsMode === "stripe" && paymentErrorFromUrl && !outcomeConfirmed;
  const showFailureDialog = paymentFailed || paymentErrorHint;
  const simpleFailureDialog = effectiveStatus === "canceled";

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (paymentsMode === "preview") return;

    const paymentId = query.get("payment_id") ?? sessionStorage.getItem("security-white.payment-id");
    let canceled = false;
    let timeoutId = 0;

    if (!paymentId) {
      timeoutId = window.setTimeout(() => setVerificationUnavailable(true), 0);
      return () => window.clearTimeout(timeoutId);
    }

    let attempts = 0;

    async function checkStatus() {
      attempts += 1;

      try {
        const result = await getSubscriptionStatus(paymentId as string);
        if (canceled) return;

        setPaymentStatus(result.status);
        setPaymentDetails({
          amount: result.amount,
          currency: result.currency,
          paymentId: paymentId as string,
        });

        if (result.planId) setConfirmedPlanId(result.planId);
        if (result.status !== "pending") setOutcomeConfirmed(true);

        if (result.status === "pending" && attempts < 20) {
          timeoutId = window.setTimeout(checkStatus, 1500);
        }
      } catch {
        if (canceled) return;
        if (attempts < 20) {
          timeoutId = window.setTimeout(checkStatus, 1500);
        } else {
          setVerificationUnavailable(true);
        }
      }
    }

    void checkStatus();

    return () => {
      canceled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (paymentsMode === "preview" || hasTrackedPaymentOutcome.current) return;

    if (paymentStatus === "active" && paymentDetails) {
      hasTrackedPaymentOutcome.current = true;
      trackAmplitudeEvent("payment_succeded", {
        plan_type: getPrivacyPlanAnalyticsType(currentPlanId),
      });

      // Sandbox transactions must not be reported as real Meta purchases.
      if (usesLiveStripeKey) {
        trackMetaPurchase({
          currency: paymentDetails.currency ?? "usd",
          eventId: paymentDetails.paymentId,
          planId: currentPlanId,
          value: (paymentDetails.amount ?? Math.round(getPrivacyPlan(currentPlanId).price * 100)) / 100,
        });
      }
    } else if (paymentFailed && paymentDetails) {
      hasTrackedPaymentOutcome.current = true;
      trackAmplitudeEvent("payment_failed");
    }
  }, [currentPlanId, paymentDetails, paymentFailed, paymentStatus]);

  useEffect(() => {
    if (showFailureDialog) retryButtonRef.current?.focus();
  }, [showFailureDialog]);

  function returnToCheckout() {
    router.push("/plans?checkout=1");
  }

  function openAppDownload() {
    if (!appDownloadUrl) {
      setDownloadNotice("The app download link isn’t configured yet.");
      return;
    }

    window.location.assign(appDownloadUrl);
  }

  return (
    <div className={styles.confirmationPage}>
      <div className={styles.content} aria-hidden={showFailureDialog}>
        <header className={styles.hero}>
          <div className={styles.confirmedLabel}>
            <span className={styles.confirmedIcon} aria-hidden="true">
              <svg fill="none" viewBox="0 0 24 24"><path d="m5 12 4.5 4.5L19 7" /></svg>
            </span>
            <span>{isActive ? "Payment confirmed" : paymentFailed ? "Payment not completed" : "Confirming payment"}</span>
          </div>

          <div className={styles.statusLine}>
            <span><i aria-hidden="true" />{isActive ? "Your plan is active." : paymentFailed ? "Your plan isn’t active yet." : verificationUnavailable ? "Payment status unavailable." : "We’re checking your payment."}</span>
            <span>Get started in the app.</span>
          </div>

          <h1>Take control of your <span>online security.</span></h1>
          <p className={styles.intro}>
            Your privacy check was just the beginning. Download the Veylo app to explore more
            security tools, follow your personalized recommendations, and take practical steps
            to reduce everyday online risks.
          </p>
          {verificationUnavailable ? (
            <p className={styles.verificationNotice} role="status">
              We couldn’t verify your payment yet. Please refresh this page before trying to pay again, to avoid a duplicate charge.
            </p>
          ) : null}
        </header>

        <section className={styles.benefitsCard} aria-labelledby="benefits-title">
          <h2 id="benefits-title">Benefits:</h2>
          <ul>
            {benefits.map((benefit) => (
              <li key={benefit.text}>
                <BenefitIcon name={benefit.icon} />
                <span>{benefit.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className={styles.footer} aria-hidden={showFailureDialog}>
        <button
          className={styles.downloadButton}
          data-amplitude-event={appDownloadUrl && isActive ? "download_button_clicked" : undefined}
          disabled={!isActive}
          onClick={openAppDownload}
          type="button"
        >
          Download Veylo App
        </button>
        {downloadNotice ? <p className={styles.downloadNotice} role="status">{downloadNotice}</p> : null}
        <p className={styles.footerLinks}>
          {privacyPolicyUrl ? <a href={privacyPolicyUrl}>Privacy Policy</a> : <span>Privacy Policy</span>}
          {" & "}
          {termsOfUseUrl ? <a href={termsOfUseUrl}>Terms of Use</a> : <span>Terms of Use</span>}
        </p>
        <p>© Veylo, Inc. 2026 - All rights reserved.</p>
      </footer>

      {showFailureDialog ? (
        <div className={styles.failureOverlay}>
          <section aria-labelledby="payment-failure-title" aria-modal="true" className={styles.failureDialog} role="alertdialog">
            <span className={styles.failureIcon} aria-hidden="true">
              <svg fill="none" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /></svg>
            </span>
            <h2 id="payment-failure-title">{simpleFailureDialog ? "Payment Failed" : "Payment didn’t go through"}</h2>
            <p>{simpleFailureDialog ? "Payment attempt failed. Please try again." : "Please try again or choose another payment method."}</p>
            <button className={styles.retryButton} onClick={returnToCheckout} ref={retryButtonRef} type="button">Try again</button>
            {!simpleFailureDialog ? (
              <button className={styles.changeMethodButton} onClick={returnToCheckout} type="button">Change payment method</button>
            ) : null}
          </section>
        </div>
      ) : null}
    </div>
  );
}
