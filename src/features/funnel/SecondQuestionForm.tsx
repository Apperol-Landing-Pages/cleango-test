"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import styles from "@/app/quiz/browsing-habits/page.module.css";
import { QuestionFooter } from "@/features/funnel/QuestionFooter";

type Answer = Readonly<{ id: string; label: string }>;

type SecondQuestionFormProps = Readonly<{
  analyticsScreenName: string;
  answers: readonly Answer[];
  formName: string;
  storageKey: string;
}>;

export function SecondQuestionForm({
  analyticsScreenName,
  answers,
  formName,
  storageKey,
}: SecondQuestionFormProps) {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const selectedAnswer = new FormData(event.currentTarget).get(formName);

    if (typeof selectedAnswer !== "string") {
      return;
    }

    try {
      sessionStorage.setItem(storageKey, selectedAnswer);
    } catch {
      // The funnel still works when browser storage is unavailable.
    }

    router.push("/quiz/account-security");
  }

  return (
    <form
      className={`${styles.questionForm} ${styles.questionFormPinned}`}
      action="/quiz/account-security"
      data-amplitude-submit-event={`${analyticsScreenName}_continue_clicked`}
      onSubmit={handleSubmit}
    >
      <fieldset className={`${styles.options} ${styles.optionsPinned}`}>
        <legend className={styles.visuallyHidden}>Choose one answer</legend>
        {answers.map((answer, index) => (
          <label className={styles.option} key={answer.id}>
            <span>{answer.label}</span>
            <input
              data-amplitude-change-event={`${analyticsScreenName}_option${index + 1}_clicked`}
              type="radio"
              name={formName}
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
