"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useRef, useState } from "react";

import styles from "@/app/results/page.module.css";
import { trackAmplitudeEvent } from "@/lib/analytics/amplitude";
import { createLead } from "@/lib/payments/client";

type ResultsEmailFormProps = Readonly<{
  action?: string;
  buttonLabel?: string;
}>;

function validateEmail(value: string) {
  const email = value.trim();

  if (!email) {
    return "Enter your email address";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Enter a valid email address";
  }

  return "";
}

export function ResultsEmailForm({
  action = "/results/snapshot",
  buttonLabel = "Show my results",
}: ResultsEmailFormProps) {
  const router = useRouter();
  const hasTrackedFocus = useRef(false);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const emailError = validateEmail(email);
  const showEmailError = emailTouched && Boolean(emailError);

  function handleFocus() {
    if (hasTrackedFocus.current) {
      return;
    }

    hasTrackedFocus.current = true;
    trackAmplitudeEvent("quiz_results_email_started");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailTouched(true);
    setSubmissionError("");

    if (emailError || isSubmitting) {
      trackAmplitudeEvent("quiz_results_email_validation_failed");
      return;
    }

    const normalizedEmail = email.trim();
    setIsSubmitting(true);

    try {
      const leadId = await createLead(normalizedEmail);

      sessionStorage.setItem("security-white.email", normalizedEmail);
      sessionStorage.setItem("security-white.lead-id", leadId);

      trackAmplitudeEvent("quiz_results_email_submitted");
      router.push(action);
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "We couldn’t save your email. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className={styles.form}
      action={action}
      onSubmit={handleSubmit}
      noValidate
    >
      <div
        className={`${styles.field} ${showEmailError ? styles.fieldInvalid : ""}`}
      >
        <label htmlFor="results-email">
          Email <span className={styles.required}>*</span>
        </label>
        <input
          className="amp-mask"
          id="results-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          aria-describedby={showEmailError ? "results-email-error" : undefined}
          aria-invalid={showEmailError}
          onBlur={() => setEmailTouched(true)}
          onChange={(event) => setEmail(event.target.value)}
          onFocus={handleFocus}
          required
        />
        {showEmailError ? (
          <span
            className={styles.fieldError}
            id="results-email-error"
            role="alert"
          >
            {emailError}
          </span>
        ) : null}
      </div>

      {submissionError ? (
        <p className={styles.formError} role="alert">
          {submissionError}
        </p>
      ) : null}

      <div className={styles.submitGroup}>
        <button
          className={styles.submitButton}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Saving securely…" : buttonLabel}
        </button>
        <p className={styles.privacyNote}>
          View your results free. No card required.
          <br />
          Based on your answers, not a device scan.
        </p>
      </div>
    </form>
  );
}
