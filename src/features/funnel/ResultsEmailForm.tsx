"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useRef, useState } from "react";

import styles from "@/app/results/page.module.css";
import { trackAmplitudeEvent } from "@/lib/analytics/amplitude";
import { trackMetaLead } from "@/lib/marketing/meta-pixel";
import { createLead } from "@/lib/payments/client";

type ResultsEmailFormProps = Readonly<{
  action?: string;
  buttonLabel?: string;
  greenLayout?: boolean;
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
  greenLayout = false,
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
    trackAmplitudeEvent("quiz_email_field_clicked");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailTouched(true);
    setSubmissionError("");
    trackAmplitudeEvent("quiz_email_button_clicked");

    if (emailError || isSubmitting) {
      return;
    }

    const normalizedEmail = email.trim();
    setIsSubmitting(true);

    try {
      const leadId = await createLead(normalizedEmail);

      sessionStorage.setItem("security-white.email", normalizedEmail);
      sessionStorage.setItem("security-white.lead-id", leadId);
      trackMetaLead(leadId);

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
      className={`${styles.form} ${greenLayout ? styles.greenForm : ""}`}
      action={action}
      onSubmit={handleSubmit}
      noValidate
    >
      <div
        className={`${styles.field} ${showEmailError ? styles.fieldInvalid : ""}`}
      >
        <label
          className={greenLayout ? styles.visuallyHidden : undefined}
          htmlFor="results-email"
        >
          Email <span className={styles.required}>*</span>
        </label>
        <div className={greenLayout ? styles.greenInputWrap : undefined}>
          <input
            className="amp-mask"
            id="results-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={greenLayout ? "Enter your email address" : "you@example.com"}
            value={email}
            aria-describedby={showEmailError ? "results-email-error" : undefined}
            aria-invalid={showEmailError}
            onBlur={() => setEmailTouched(true)}
            onChange={(event) => setEmail(event.target.value)}
            onFocus={handleFocus}
            required
          />
          {greenLayout ? (
            <svg aria-hidden="true" className={styles.emailIcon} fill="none" viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
              <path d="m4 7 8 6 8-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
            </svg>
          ) : null}
        </div>
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
        {greenLayout ? null : (
          <p className={styles.privacyNote}>
            View your results free. No card required.
            <br />
            Based on your answers, not a device scan.
          </p>
        )}
      </div>
    </form>
  );
}
