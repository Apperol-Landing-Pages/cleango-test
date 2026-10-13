"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import styles from "@/app/quiz/browsing-habits/page.module.css";
import { QuestionFooter } from "@/features/funnel/QuestionFooter";

const answers = [
  {
    id: "allow-immediately",
    label: "I usually allow permissions without checking",
  },
  {
    id: "check-some",
    label: "I check some requests but not all",
  },
  {
    id: "only-necessary",
    label: "I only allow access when it's needed",
  },
] as const;

export function AppPermissionsForm() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const selectedAnswer = new FormData(event.currentTarget).get(
      "app-permissions",
    );

    if (typeof selectedAnswer !== "string") {
      return;
    }

    try {
      sessionStorage.setItem(
        "security-white.answers.app-permissions",
        selectedAnswer,
      );
    } catch {
      // The funnel still works when browser storage is unavailable.
    }

    router.push("/quiz/device-security");
  }

  return (
    <form
      className={`${styles.questionForm} ${styles.questionFormPinned}`}
      action="/quiz/device-security"
      data-amplitude-submit-event="quiz_screen5_continue_clicked"
      onSubmit={handleSubmit}
    >
      <fieldset className={`${styles.options} ${styles.optionsPinned}`}>
        <legend className={styles.visuallyHidden}>Choose one answer</legend>
        {answers.map((answer, index) => (
          <label className={styles.option} key={answer.id}>
            <span>{answer.label}</span>
            <input
              data-amplitude-change-event={`quiz_screen5_option${index + 1}_clicked`}
              type="radio"
              name="app-permissions"
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
