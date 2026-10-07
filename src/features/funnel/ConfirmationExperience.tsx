"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import styles from "@/app/confirmation/page.module.css";
import { trackAmplitudeEvent } from "@/lib/analytics/amplitude";
import { getSnapshotRoute, readSavedQuizResult } from "@/lib/funnel/quiz-result";
import {
  getPrivacyPlan,
  getPrivacyPlanAnalyticsType,
  readSelectedPlan,
  type PrivacyPlanId,
} from "@/lib/funnel/privacy-plan";
import { trackMetaPurchase } from "@/lib/marketing/meta-pixel";
import {
  getSubscriptionStatus,
  paymentsMode,
  type PaymentStatus,
} from "@/lib/payments/client";

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

function getOverviewRoute() {
  try {
    const result = readSavedQuizResult(sessionStorage);
    return getSnapshotRoute(result?.severity ?? "green");
  } catch {
    return "/results/snapshot";
  }
}

export function ConfirmationExperience() {
  const router = useRouter();
  const hasTrackedPaymentOutcome = useRef(false);
  const [confirmedPlanId, setConfirmedPlanId] = useState<PrivacyPlanId | null>(
    null,
  );
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
    paymentsMode === "preview" ? "active" : "pending",
  );
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
  const selectedPlan = getPrivacyPlan(confirmedPlanId ?? selectedPlanId);
  const price = `$${selectedPlan.price.toFixed(2)}`;
  const isActive = paymentStatus === "active";
  const paymentFailed = paymentStatus === "failed" || paymentStatus === "canceled";

  useEffect(() => {
    if (paymentsMode === "preview") {
      return;
    }

    const paymentId =
      new URLSearchParams(window.location.search).get("payment_id") ??
      sessionStorage.getItem("security-white.payment-id");

    let canceled = false;
    let timeoutId = 0;

    if (!paymentId) {
      timeoutId = window.setTimeout(() => setPaymentStatus("failed"), 0);
      return () => window.clearTimeout(timeoutId);
    }

    let attempts = 0;

    async function checkStatus() {
      attempts += 1;

      try {
        const result = await getSubscriptionStatus(paymentId as string);

        if (canceled) {
          return;
        }

        setPaymentStatus(result.status);
        setPaymentDetails({
          amount: result.amount,
          currency: result.currency,
          paymentId: paymentId as string,
        });

        if (result.planId) {
          setConfirmedPlanId(result.planId);
        }

        if (result.status === "pending" && attempts < 20) {
          timeoutId = window.setTimeout(checkStatus, 1500);
        }
      } catch {
        if (!canceled && attempts < 20) {
          timeoutId = window.setTimeout(checkStatus, 1500);
        } else if (!canceled) {
          setPaymentStatus("failed");
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
    if (hasTrackedPaymentOutcome.current) {
      return;
    }

    if (paymentStatus === "active") {
      if (paymentsMode === "stripe" && !paymentDetails) {
        return;
      }

      hasTrackedPaymentOutcome.current = true;
      trackAmplitudeEvent("payment_succeded", {
        plan_type: getPrivacyPlanAnalyticsType(selectedPlan.id),
      });

      if (paymentsMode === "stripe" && paymentDetails) {
        trackMetaPurchase({
          currency: paymentDetails.currency ?? "usd",
          eventId: paymentDetails.paymentId,
          planId: selectedPlan.id,
          value: (paymentDetails.amount ?? Math.round(selectedPlan.price * 100)) / 100,
        });
      }
    } else if (paymentFailed) {
      hasTrackedPaymentOutcome.current = true;
      trackAmplitudeEvent("payment_failed");
    }
  }, [paymentDetails, paymentFailed, paymentStatus, selectedPlan]);

  return (
    <div className={styles.confirmationPage}>
      <header className={styles.hero}>
        <div className={styles.confirmedLabel}>
          <span className={styles.confirmedIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="m7.5 12.1 3 3 6-6" />
            </svg>
          </span>
          <p>
            {isActive
              ? "Payment confirmed"
              : paymentFailed
                ? "Payment needs attention"
                : "Confirming payment…"}
          </p>
        </div>

        <div className={styles.heroCopy}>
          <h1>
            Your plan.
            <span>Your next move.</span>
          </h1>
          <p>
            {paymentFailed ? (
              "We couldn’t confirm this subscription. Please return to checkout."
            ) : (
              <>
                A clearer path to better privacy.
                <br />
                Made around your everyday habits.
              </>
            )}
          </p>
        </div>
      </header>

      <section className={styles.planCard} aria-label={`Active VEIL ${selectedPlan.name} plan`}>
        <div className={styles.planTopLine}>
          <p>
            VEIL <span>{selectedPlan.name}</span>
          </p>
          <span className={styles.activeBadge}>
            <span aria-hidden="true" />
            {isActive ? "Active" : paymentFailed ? "Not active" : "Pending"}
          </span>
        </div>

        <div className={styles.planMiddle}>
          <h2>
            Your personal
            <br />
            privacy plan
          </h2>
          <span className={styles.shieldIcon} aria-hidden="true">
            <svg viewBox="0 0 40 46" fill="none">
              <path d="M20 1.8 37 8v12.7c0 10.7-6.6 19.2-17 23.5C9.6 39.9 3 31.4 3 20.7V8l17-6.2Z" />
              <path d="m12.5 22.8 5.1 5.1 10-10" />
            </svg>
          </span>
        </div>

        <div className={styles.planBottomLine}>
          <p>
            {price} <span>/ month</span>
          </p>
          <p>Cancel anytime</p>
        </div>
      </section>

      <section className={styles.firstMoveCard} aria-labelledby="first-move-title">
        <p className={styles.eyebrow}>Your first move</p>
        <h2 id="first-move-title">
          Give every account its own
          <br />
          password
        </h2>
        <p className={styles.firstMoveDescription}>
          Start with your email and most important accounts. A password manager can help
          you create and store unique passwords, so a leak from one service is less likely
          to affect others.
        </p>
        <p className={styles.selectedNote}>Selected from your answers</p>
      </section>

      <div className={styles.actions}>
        <button
          className={styles.downloadButton}
          data-amplitude-event="download_button_clicked"
          disabled={!isActive}
          type="button"
        >
          Download app
        </button>
        <button
          className={styles.overviewButton}
          data-amplitude-event="back_to_overview_clicked"
          onClick={() => router.push(getOverviewRoute())}
          type="button"
        >
          Back to overview
        </button>
      </div>

      <footer className={styles.footer}>
        <p>© VEIL, Inc. 2026 - All rights reserved.</p>
      </footer>
    </div>
  );
}
