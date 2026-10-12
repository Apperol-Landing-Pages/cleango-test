"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import styles from "@/app/quiz/browsing-habits/page.module.css";

const answers = [
  {
    id: "local-history",
    label: "Your browsing history on this device",
  },
  {
    id: "websites-and-provider",
    label: "Your activity from websites and internet providers",
  },
  {
    id: "everything-online",
    label: "Everything I do online",
  },
  {
    id: "not-sure",
    label: "I’m not sure",
  },
] as const;

const followUpRoutes = {
  "local-history": "/quiz/network-privacy",
  "websites-and-provider": "/quiz/shared-website-data",
  "everything-online": "/quiz/private-mode-sign-in",
  "not-sure": "/quiz/private-mode-sign-in",
} as const;

const privacyPolicyUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL?.trim();
const termsOfUseUrl = process.env.NEXT_PUBLIC_TERMS_OF_USE_URL?.trim();

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
      className={`${styles.questionForm} ${styles.questionFormPinned}`}
      action="/quiz/network-privacy"
      data-amplitude-submit-event="quiz_screen1_continue_clicked"
      onSubmit={handleSubmit}
    >
      <fieldset className={`${styles.options} ${styles.optionsPinned}`}>
        <legend className={styles.visuallyHidden}>Choose one answer</legend>
        {answers.map((answer, index) => (
          <label className={styles.option} key={answer.id}>
            <span>{answer.label}</span>
            <input
              data-amplitude-change-event={`quiz_screen1_option${index + 1}_clicked`}
              type="radio"
              name="browsing-habits"
              value={answer.id}
              required
            />
          </label>
        ))}
      </fieldset>

      <footer className={`${styles.footer} ${styles.footerPinned}`}>
        <button className={styles.continueButton} type="submit">
          Continue
        </button>
        <p className={styles.legalLinks}>
          {privacyPolicyUrl ? (
            <a href={privacyPolicyUrl}>Privacy Policy</a>
          ) : (
            <span>Privacy Policy</span>
          )}
          {" & "}
          {termsOfUseUrl ? (
            <a href={termsOfUseUrl}>Terms of Use</a>
          ) : (
            <span>Terms of Use</span>
          )}
        </p>
        <p className={styles.copyright}>
          © Veylo, Inc. 2026 - All rights reserved.
        </p>
      </footer>
    </form>
  );
}
