"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import styles from "@/app/quiz/browsing-habits/page.module.css";

const answers = [
  {
    id: "automatic",
    label: "I connect automatically to available networks",
  },
  {
    id: "check-network-name",
    label: "I check the network name before connecting",
  },
  {
    id: "mobile-connection",
    label: "I use my own mobile connection instead",
  },
] as const;

export function NetworkPrivacyForm() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const selectedAnswer = new FormData(event.currentTarget).get(
      "network-privacy",
    );

    if (typeof selectedAnswer !== "string") {
      return;
    }

    try {
      sessionStorage.setItem(
        "security-white.answers.network-privacy",
        selectedAnswer,
      );
    } catch {
      // The funnel still works when browser storage is unavailable.
    }

    router.push("/quiz/account-security");
  }

  return (
    <form
      className={styles.questionForm}
      action="/quiz/account-security"
      data-amplitude-submit-event="quiz_screen21_continue_clicked"
      onSubmit={handleSubmit}
    >
      <fieldset className={styles.options}>
        <legend className={styles.visuallyHidden}>Choose one answer</legend>
        {answers.map((answer, index) => (
          <label className={styles.option} key={answer.id}>
            <span>{answer.label}</span>
            <input
              data-amplitude-change-event={`quiz_screen21_option${index + 1}_clicked`}
              type="radio"
              name="network-privacy"
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
