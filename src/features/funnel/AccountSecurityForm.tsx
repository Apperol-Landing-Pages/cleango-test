"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import styles from "@/app/quiz/browsing-habits/page.module.css";
import { QuestionFooter } from "@/features/funnel/QuestionFooter";

const answers = [
  {
    id: "reuse-often",
    label: "I reuse passwords across several accounts",
  },
  {
    id: "all-unique",
    label: "I use a unique password for every account",
  },
  {
    id: "some-shared",
    label: "I use the same password for a few accounts",
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
      className={`${styles.questionForm} ${styles.questionFormPinned}`}
      action="/quiz/two-factor-auth"
      data-amplitude-submit-event="quiz_screen3_continue_clicked"
      onSubmit={handleSubmit}
    >
      <fieldset className={`${styles.options} ${styles.optionsPinned}`}>
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

      <QuestionFooter />
    </form>
  );
}
