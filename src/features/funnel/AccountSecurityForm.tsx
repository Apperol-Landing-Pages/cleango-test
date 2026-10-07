"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import styles from "@/app/quiz/browsing-habits/page.module.css";

const answers = [
  {
    id: "reuse-often",
    label: "Yes, I reuse passwords quite often",
  },
  {
    id: "some-shared",
    label: "A few accounts share a password",
  },
  {
    id: "all-unique",
    label: "No, every account has a unique password",
  },
] as const;

export function AccountSecurityForm() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const selectedAnswer = new FormData(event.currentTarget).get(
      "account-security",
    );

    if (typeof selectedAnswer !== "string") {
      return;
    }

    try {
      sessionStorage.setItem(
        "security-white.answers.account-security",
        selectedAnswer,
      );
    } catch {
      // The funnel still works when browser storage is unavailable.
    }

    router.push("/quiz/two-factor-auth");
  }

  return (
    <form
      className={styles.questionForm}
      action="/quiz/two-factor-auth"
      data-amplitude-submit-event="quiz_screen3_continue_clicked"
      onSubmit={handleSubmit}
    >
      <fieldset className={styles.options}>
        <legend className={styles.visuallyHidden}>Choose one answer</legend>
        {answers.map((answer, index) => (
          <label className={styles.option} key={answer.id}>
            <span>{answer.label}</span>
            <input
              data-amplitude-change-event={`quiz_screen3_option${index + 1}_clicked`}
              type="radio"
              name="account-security"
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
