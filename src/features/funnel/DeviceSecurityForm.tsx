"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import styles from "@/app/quiz/browsing-habits/page.module.css";
import { QuestionFooter } from "@/features/funnel/QuestionFooter";

const answers = [
  {
    id: "promptly",
    label: "I use automatic updates or install them promptly",
  },
  {
    id: "put-off",
    label: "I often delay updates for weeks",
  },
  {
    id: "when-remembered",
    label: "Sometimes, I install updates when I remember",
  },
] as const;

export function DeviceSecurityForm() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const selectedAnswer = new FormData(event.currentTarget).get(
      "device-security",
    );

    if (typeof selectedAnswer !== "string") {
      return;
    }

    try {
      sessionStorage.setItem(
        "security-white.answers.device-security",
        selectedAnswer,
      );
    } catch {
      // The funnel still works when browser storage is unavailable.
    }

    router.push("/quiz/progress");
  }

  return (
    <form
      className={`${styles.questionForm} ${styles.questionFormPinned}`}
      action="/quiz/progress"
      data-amplitude-submit-event="quiz_screen6_continue_clicked"
      onSubmit={handleSubmit}
    >
      <fieldset className={`${styles.options} ${styles.optionsPinned}`}>
        <legend className={styles.visuallyHidden}>Choose one answer</legend>
        {answers.map((answer, index) => (
          <label className={styles.option} key={answer.id}>
            <span>{answer.label}</span>
            <input
              data-amplitude-change-event={`quiz_screen6_option${index + 1}_clicked`}
              type="radio"
              name="device-security"
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
