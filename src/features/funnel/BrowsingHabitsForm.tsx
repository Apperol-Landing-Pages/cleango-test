"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import styles from "@/app/quiz/browsing-habits/page.module.css";
import { QuestionFooter } from "@/features/funnel/QuestionFooter";
import { getSecondQuestion } from "@/lib/funnel/second-question";

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
      const previousAnswer = sessionStorage.getItem(
        "security-white.answers.browsing-habits",
      );

      if (previousAnswer !== selectedAnswer) {
        sessionStorage.removeItem("security-white.answers.network-privacy");
        sessionStorage.removeItem("security-white.answers.private-mode-sign-in");
      }

      sessionStorage.setItem(
        "security-white.answers.browsing-habits",
        selectedAnswer,
      );
    } catch {
      // The funnel still works when browser storage is unavailable.
    }

    const nextRoute = getSecondQuestion(selectedAnswer)?.pathname;

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

      <QuestionFooter />
    </form>
  );
}
