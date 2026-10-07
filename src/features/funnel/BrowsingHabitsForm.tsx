"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import styles from "@/app/quiz/browsing-habits/page.module.css";

const answers = [
  {
    id: "local-history",
    label: "Just the history saved on this device",
  },
  {
    id: "websites-and-provider",
    label: "My activity from websites and my internet provider",
  },
  {
    id: "not-sure",
    label: "I’m not sure what it hides",
  },
] as const;

const followUpRoutes = {
  "local-history": "/quiz/network-privacy",
  "websites-and-provider": "/quiz/shared-website-data",
  "not-sure": "/quiz/private-mode-sign-in",
} as const;

export function BrowsingHabitsForm() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const selectedAnswer = new FormData(event.currentTarget).get(
      "browsing-habits",
    );

    if (typeof selectedAnswer !== "string") {
      return;
    }

    try {
      sessionStorage.setItem(
        "security-white.answers.browsing-habits",
        selectedAnswer,
      );
    } catch {
      // The funnel still works when browser storage is unavailable.
    }

    const nextRoute =
      followUpRoutes[selectedAnswer as keyof typeof followUpRoutes];

    if (!nextRoute) {
      return;
    }

    router.push(nextRoute);
  }

  return (
    <form
      className={styles.questionForm}
      action="/quiz/network-privacy"
      data-amplitude-submit-event="quiz_browsing_habits_continue_clicked"
      onSubmit={handleSubmit}
    >
      <fieldset className={styles.options}>
        <legend className={styles.visuallyHidden}>Choose one answer</legend>
        {answers.map((answer, index) => (
          <label className={styles.option} key={answer.id}>
            <span>{answer.label}</span>
            <input
              data-amplitude-change-event={`quiz_browsing_habits_option_${index + 1}_selected`}
              type="radio"
              name="browsing-habits"
              value={answer.id}
              required
            />
          </label>
        ))}
      </fieldset>

      <div className={styles.formBottom}>
        <div className={styles.formActions}>
          <button
            className={styles.continueButton}
            type="submit"
          >
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
