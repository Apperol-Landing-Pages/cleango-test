"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import styles from "@/app/quiz/browsing-habits/page.module.css";

const answers = [
  {
    id: "password-only",
    label: "No, just a password",
  },
  {
    id: "some-accounts",
    label: "Some do, but not all",
  },
  {
    id: "important-accounts-covered",
    label: "Yes, my important accounts are covered",
  },
] as const;

export function TwoFactorAuthForm() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const selectedAnswer = new FormData(event.currentTarget).get(
      "two-factor-auth",
    );

    if (typeof selectedAnswer !== "string") {
      return;
    }

    try {
      sessionStorage.setItem(
        "security-white.answers.two-factor-auth",
        selectedAnswer,
      );
    } catch {
      // The funnel still works when browser storage is unavailable.
    }

    router.push("/quiz/app-permissions");
  }

  return (
    <form
      className={styles.questionForm}
      action="/quiz/app-permissions"
      data-amplitude-submit-event="quiz_two_factor_auth_continue_clicked"
      onSubmit={handleSubmit}
    >
      <fieldset className={styles.options}>
        <legend className={styles.visuallyHidden}>Choose one answer</legend>
        {answers.map((answer, index) => (
          <label className={styles.option} key={answer.id}>
            <span>{answer.label}</span>
            <input
              data-amplitude-change-event={`quiz_two_factor_auth_option_${index + 1}_selected`}
              type="radio"
              name="two-factor-auth"
              value={answer.id}
              required
            />
          </label>
        ))}
      </fieldset>

      <div className={styles.formBottom}>
        <div className={styles.formActions}>
          <button className={styles.continueButton} type="submit">
            Continue
          </button>
          <p className={styles.privacyNote}>
            No scans. No browsing history. Just the answers you choose.
          </p>
        </div>

        <footer className={styles.footer}>
          <p>© VEIL, Inc. 2026 – All rights reserved.</p>
        </footer>
      </div>
    </form>
  );
}
